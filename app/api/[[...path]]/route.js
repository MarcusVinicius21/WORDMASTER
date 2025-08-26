import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'

// MongoDB connection
let client
let db

async function connectToMongo() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL)
    await client.connect()
    db = client.db(process.env.DB_NAME || 'wordmaster_buzios')
  }
  return db
}

// Helper function to handle CORS
function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}

// OPTIONS handler for CORS
export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

// Category type mapping
const CATEGORIES = {
  mansao: 'Mansão',
  iate: 'Iate',
  escuna: 'Escuna', 
  transfer: 'Transfer',
  buggy: 'Buggy'
}

// Route handler function
async function handleRoute(request, { params }) {
  const { path = [] } = params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    const db = await connectToMongo()

    // Root endpoint
    if (route === '/' && method === 'GET') {
      return handleCORS(NextResponse.json({ 
        message: "Wordmaster Beach Búzios API",
        version: "1.0.0"
      }))
    }

    // **LISTINGS ENDPOINTS**

    // Get all listings - GET /api/listings
    if (route === '/listings' && method === 'GET') {
      const url = new URL(request.url)
      const category = url.searchParams.get('category')
      const featured = url.searchParams.get('featured')
      const active = url.searchParams.get('active')
      const limit = parseInt(url.searchParams.get('limit')) || 50
      const skip = parseInt(url.searchParams.get('skip')) || 0

      let filter = {}
      if (category && CATEGORIES[category]) {
        filter.category = category
      }
      if (featured === 'true') {
        filter.is_featured = true
      }
      if (active !== 'false') {
        filter.is_active = true
      }

      const listings = await db.collection('listings')
        .find(filter)
        .sort({ created_at: -1 })
        .limit(limit)
        .skip(skip)
        .toArray()

      // Remove MongoDB _id and return
      const cleanListings = listings.map(({ _id, ...rest }) => rest)
      
      return handleCORS(NextResponse.json({
        listings: cleanListings,
        total: await db.collection('listings').countDocuments(filter)
      }))
    }

    // Get single listing - GET /api/listings/[id]
    if (route.startsWith('/listings/') && method === 'GET') {
      const listingId = route.split('/listings/')[1]
      
      const listing = await db.collection('listings').findOne({ 
        id: listingId,
        is_active: true 
      })

      if (!listing) {
        return handleCORS(NextResponse.json(
          { error: "Listing not found" }, 
          { status: 404 }
        ))
      }

      // Get listing media
      const media = await db.collection('listing_media')
        .find({ listing_id: listingId })
        .sort({ sort_order: 1 })
        .toArray()

      // Get amenities
      const amenities = await db.collection('listing_amenities')
        .aggregate([
          { $match: { listing_id: listingId } },
          { 
            $lookup: {
              from: 'amenities',
              localField: 'amenity_id',
              foreignField: 'id',
              as: 'amenity'
            }
          },
          { $unwind: '$amenity' }
        ])
        .toArray()

      // Get active promotion
      const promotion = await db.collection('promotions').findOne({
        listing_id: listingId,
        is_active: true,
        starts_at: { $lte: new Date() },
        ends_at: { $gte: new Date() }
      })

      // Get approved reviews
      const reviews = await db.collection('reviews')
        .find({ 
          listing_id: listingId,
          is_approved: true 
        })
        .sort({ created_at: -1 })
        .limit(10)
        .toArray()

      const { _id, ...cleanListing } = listing
      
      return handleCORS(NextResponse.json({
        ...cleanListing,
        media: media.map(({ _id, ...rest }) => rest),
        amenities: amenities.map(item => ({
          ...item.amenity,
          available: item.available
        })),
        promotion: promotion ? { ...promotion, _id: undefined } : null,
        reviews: reviews.map(({ _id, ...rest }) => rest)
      }))
    }

    // Update listing - PATCH /api/listings/[id]
    if (route.startsWith('/listings/') && method === 'PATCH') {
      const listingId = route.split('/listings/')[1]
      const body = await request.json()
      
      const result = await db.collection('listings').updateOne(
        { id: listingId },
        { 
          $set: {
            ...body,
            updated_at: new Date()
          }
        }
      )

      if (result.matchedCount === 0) {
        return handleCORS(NextResponse.json(
          { error: "Listing not found" }, 
          { status: 404 }
        ))
      }

      return handleCORS(NextResponse.json({ success: true }))
    }

    // Delete listing - DELETE /api/listings/[id]
    if (route.startsWith('/listings/') && method === 'DELETE') {
      const listingId = route.split('/listings/')[1]
      
      const result = await db.collection('listings').deleteOne({ id: listingId })

      if (result.deletedCount === 0) {
        return handleCORS(NextResponse.json(
          { error: "Listing not found" }, 
          { status: 404 }
        ))
      }

      return handleCORS(NextResponse.json({ success: true }))
    }

    // Get reviews - GET /api/reviews
    if (route === '/reviews' && method === 'GET') {
      const reviews = await db.collection('reviews')
        .find({})
        .sort({ created_at: -1 })
        .toArray()

      return handleCORS(NextResponse.json({
        reviews: reviews.map(({ _id, ...rest }) => rest)
      }))
    }
    if (route === '/listings' && method === 'POST') {
      const body = await request.json()
      
      // Validate required fields
      const required = ['category', 'title', 'city', 'whatsapp_e164']
      for (const field of required) {
        if (!body[field]) {
          return handleCORS(NextResponse.json(
            { error: `${field} is required` }, 
            { status: 400 }
          ))
        }
      }

      // Validate category
      if (!CATEGORIES[body.category]) {
        return handleCORS(NextResponse.json(
          { error: "Invalid category" }, 
          { status: 400 }
        ))
      }

      const listingId = uuidv4()
      const slug = body.title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-')

      const listing = {
        id: listingId,
        category: body.category,
        slug: `${slug}-${listingId.split('-')[0]}`,
        title: body.title,
        subtitle: body.subtitle || '',
        description: body.description || '',
        city: body.city || 'Búzios',
        neighborhood: body.neighborhood || '',
        guests: body.guests || null,
        bedrooms: body.bedrooms || null,
        bathrooms: body.bathrooms || null,
        area_m2: body.area_m2 || null,
        attributes: body.attributes || {},
        base_price: body.base_price || null,
        price_label: body.price_label || '',
        whatsapp_e164: body.whatsapp_e164,
        broker_name: body.broker_name || 'Adson Carlos dos Santos',
        is_featured: body.is_featured || false,
        is_active: body.is_active !== false,
        created_at: new Date(),
        updated_at: new Date()
      }

      await db.collection('listings').insertOne(listing)

      const { _id, ...cleanListing } = listing
      return handleCORS(NextResponse.json(cleanListing, { status: 201 }))
    }

    // **AMENITIES ENDPOINTS**

    // Get all amenities - GET /api/amenities  
    if (route === '/amenities' && method === 'GET') {
      const amenities = await db.collection('amenities')
        .find({})
        .sort({ name: 1 })
        .toArray()

      return handleCORS(NextResponse.json({
        amenities: amenities.map(({ _id, ...rest }) => rest)
      }))
    }

    // **CATEGORIES ENDPOINTS**

    // Get categories - GET /api/categories
    if (route === '/categories' && method === 'GET') {
      return handleCORS(NextResponse.json({
        categories: Object.entries(CATEGORIES).map(([key, name]) => ({
          key,
          name,
          slug: key
        }))
      }))
    }

    // **ANALYTICS ENDPOINTS**

    // Track WhatsApp click - POST /api/analytics/whatsapp-click
    if (route === '/analytics/whatsapp-click' && method === 'POST') {
      const body = await request.json()
      
      if (!body.listing_id) {
        return handleCORS(NextResponse.json(
          { error: "listing_id is required" }, 
          { status: 400 }
        ))
      }

      const event = {
        id: uuidv4(),
        listing_id: body.listing_id,
        type: 'click_whatsapp',
        meta: {
          user_agent: request.headers.get('user-agent'),
          referer: request.headers.get('referer'),
          ip: request.headers.get('x-forwarded-for') || 'unknown',
          ...body.meta
        },
        created_at: new Date()
      }

      await db.collection('events').insertOne(event)

      const { _id, ...cleanEvent } = event
      return handleCORS(NextResponse.json(cleanEvent, { status: 201 }))
    }

    // **MEDIA ENDPOINTS**

    // Create media - POST /api/media
    if (route === '/media' && method === 'POST') {
      const body = await request.json()
      
      // Validate required fields
      const required = ['listing_id', 'type', 'url']
      for (const field of required) {
        if (!body[field]) {
          return handleCORS(NextResponse.json(
            { error: `${field} is required` }, 
            { status: 400 }
          ))
        }
      }

      const media = {
        id: uuidv4(),
        listing_id: body.listing_id,
        type: body.type,
        url: body.url,
        alt_text: body.alt_text || '',
        sort_order: body.sort_order || 1,
        created_at: new Date()
      }

      await db.collection('listing_media').insertOne(media)

      const { _id, ...cleanMedia } = media
      return handleCORS(NextResponse.json(cleanMedia, { status: 201 }))
    }

    // Get media for listing - GET /api/media?listing_id=xxx
    if (route === '/media' && method === 'GET') {
      const url = new URL(request.url)
      const listingId = url.searchParams.get('listing_id')
      
      if (!listingId) {
        return handleCORS(NextResponse.json(
          { error: "listing_id is required" }, 
          { status: 400 }
        ))
      }

      const media = await db.collection('listing_media')
        .find({ listing_id: listingId })
        .sort({ sort_order: 1 })
        .toArray()

      return handleCORS(NextResponse.json({
        media: media.map(({ _id, ...rest }) => rest)
      }))
    }

    // **SEED DATA ENDPOINT**

    // Seed database - POST /api/seed
    if (route === '/seed' && method === 'POST') {
      // Sample amenities
      const amenities = [
        { id: 1, name: 'Piscina', icon: 'Pool' },
        { id: 2, name: 'Wi-Fi', icon: 'Wifi' },
        { id: 3, name: 'Estacionamento', icon: 'Car' },
        { id: 4, name: 'Vista para o Mar', icon: 'Camera' },
        { id: 5, name: 'Churrasqueira', icon: 'Flame' },
        { id: 6, name: 'Ar Condicionado', icon: 'Wind' },
        { id: 7, name: 'Cozinha Completa', icon: 'ChefHat' },
        { id: 8, name: 'TV a Cabo', icon: 'Tv' },
        { id: 9, name: 'Jacuzzi', icon: 'Bath' },
        { id: 10, name: 'Acesso à Praia', icon: 'Waves' }
      ]

      await db.collection('amenities').deleteMany({})
      await db.collection('amenities').insertMany(amenities)

      // Sample listings - 6 mansions, 3 yachts, 1 schooner, 2 transfers, 3 buggies
      const sampleListings = [
        // MANSIONS (6)
        {
          id: uuidv4(),
          category: 'mansao',
          slug: 'mansao-vista-mar-geriba',
          title: 'Mansão Vista Mar em Geribá',
          subtitle: 'Luxo e conforto à beira-mar',
          description: 'Magnífica mansão com vista deslumbrante para o mar, localizada na exclusiva Praia de Geribá. Propriedade de alto padrão com piscina privativa, jardim tropical e acesso direto à praia.',
          city: 'Búzios',
          neighborhood: 'Geribá',
          guests: 10,
          bedrooms: 5,
          bathrooms: 6,
          area_m2: 450,
          attributes: {
            pool: true,
            oceanfront: true,
            parking: 4,
            jacuzzi: true,
            garden: true
          },
          base_price: 2500.00,
          price_label: 'R$ 2.500/dia',
          whatsapp_e164: '5521976860759',
          broker_name: 'Adson Carlos dos Santos',
          is_featured: true,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),
          category: 'mansao',
          slug: 'casa-luxo-ferradura',
          title: 'Casa de Luxo na Ferradura',
          subtitle: 'Paraíso tropical exclusivo',
          description: 'Casa espetacular na Praia da Ferradura com arquitetura moderna e acabamentos de primeira. Piscina infinita com vista para o mar e área gourmet completa.',
          city: 'Búzios',
          neighborhood: 'Ferradura',
          guests: 8,
          bedrooms: 4,
          bathrooms: 5,
          area_m2: 350,
          attributes: {
            pool: true,
            oceanfront: true,
            parking: 3,
            jacuzzi: false,
            garden: true
          },
          base_price: 2000.00,
          price_label: 'R$ 2.000/dia',
          whatsapp_e164: '5521976860759',
          broker_name: 'Adson Carlos dos Santos',
          is_featured: true,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),
          category: 'mansao',
          slug: 'vila-joao-fernandes',
          title: 'Vila Exclusiva João Fernandes',
          subtitle: 'Sofisticação em cada detalhe',
          description: 'Vila de alto padrão localizada próxima à famosa Praia João Fernandes. Design contemporâneo com materiais nobres e vista panorâmica do mar.',
          city: 'Búzios',
          neighborhood: 'João Fernandes',
          guests: 12,
          bedrooms: 6,
          bathrooms: 7,
          area_m2: 500,
          attributes: {
            pool: true,
            oceanfront: true,
            parking: 5,
            jacuzzi: true,
            garden: true
          },
          base_price: 3200.00,
          price_label: 'R$ 3.200/dia',
          whatsapp_e164: '5521976860759',
          broker_name: 'Adson Carlos dos Santos',
          is_featured: false,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),
          category: 'mansao',
          slug: 'casa-praia-tartaruga',
          title: 'Casa de Praia Tartaruga',
          subtitle: 'Charme rústico sofisticado',
          description: 'Charmosa casa de praia com decoração rústica sofisticada, localizada a poucos metros da Praia da Tartaruga. Ideal para quem busca tranquilidade e contato com a natureza.',
          city: 'Búzios',
          neighborhood: 'Tartaruga',
          guests: 6,
          bedrooms: 3,
          bathrooms: 4,
          area_m2: 280,
          attributes: {
            pool: true,
            oceanfront: false,
            parking: 2,
            jacuzzi: false,
            garden: true
          },
          base_price: 1500.00,
          price_label: 'R$ 1.500/dia',
          whatsapp_e164: '5521976860759',
          broker_name: 'Adson Carlos dos Santos',
          is_featured: false,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),
          category: 'mansao',
          slug: 'mansao-centro-buzios',
          title: 'Mansão no Centro de Búzios',
          subtitle: 'Localização privilegiada',
          description: 'Mansão elegante localizada no coração de Búzios, próxima à Rua das Pedras e principais atrações. Combina comodidade urbana com luxo residencial.',
          city: 'Búzios',
          neighborhood: 'Centro',
          guests: 14,
          bedrooms: 7,
          bathrooms: 8,
          area_m2: 600,
          attributes: {
            pool: true,
            oceanfront: false,
            parking: 6,
            jacuzzi: true,
            garden: true
          },
          base_price: 2800.00,
          price_label: 'R$ 2.800/dia',
          whatsapp_e164: '5521976860759',
          broker_name: 'Adson Carlos dos Santos',
          is_featured: true,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),
          category: 'mansao',
          slug: 'casa-ossos-vista-mar',
          title: 'Casa dos Ossos com Vista Mar',
          subtitle: 'Exclusividade e privacidade',
          description: 'Casa exclusiva na Praia dos Ossos com vista espetacular da baía. Propriedade única com design arquitetônico diferenciado e total privacidade.',
          city: 'Búzios',
          neighborhood: 'Ossos',
          guests: 8,
          bedrooms: 4,
          bathrooms: 5,
          area_m2: 380,
          attributes: {
            pool: true,
            oceanfront: true,
            parking: 3,
            jacuzzi: true,
            garden: false
          },
          base_price: 2200.00,
          price_label: 'R$ 2.200/dia',
          whatsapp_e164: '5521976860759',
          broker_name: 'Adson Carlos dos Santos',
          is_featured: false,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        },

        // YACHTS (3)
        {
          id: uuidv4(),
          category: 'iate',
          slug: 'iate-luxo-45-pes',
          title: 'Iate de Luxo - 45 pés',
          subtitle: 'Experiência náutica premium',
          description: 'Iate moderno e luxuoso com capitão experiente incluso. Ideal para passeios, eventos e celebrações especiais. Equipado com som ambiente, bar e deck para banho de sol.',
          city: 'Búzios',
          neighborhood: 'Marina',
          guests: 12,
          bedrooms: 2,
          bathrooms: 2,
          area_m2: null,
          attributes: {
            length_ft: 45,
            cabins: 2,
            crew: 2,
            sound_system: true,
            bar: true,
            sun_deck: true
          },
          base_price: 3800.00,
          price_label: 'R$ 3.800/dia',
          whatsapp_e164: '5521976860759',
          broker_name: 'Adson Carlos dos Santos',
          is_featured: true,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),
          category: 'iate',
          slug: 'lancha-luxo-38-pes',
          title: 'Lancha de Luxo - 38 pés',
          subtitle: 'Aventura e conforto',
          description: 'Lancha esportiva de alto padrão, perfeita para passeios rápidos e aventuras náuticas. Com som de qualidade e comodidades para até 10 pessoas.',
          city: 'Búzios',
          neighborhood: 'Marina',
          guests: 10,
          bedrooms: 1,
          bathrooms: 1,
          area_m2: null,
          attributes: {
            length_ft: 38,
            cabins: 1,
            crew: 1,
            sound_system: true,
            bar: false,
            sun_deck: true
          },
          base_price: 2800.00,
          price_label: 'R$ 2.800/dia',
          whatsapp_e164: '5521976860759',
          broker_name: 'Adson Carlos dos Santos',
          is_featured: false,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),
          category: 'iate',
          slug: 'mega-iate-60-pes',
          title: 'Mega Iate - 60 pés',
          subtitle: 'Luxo absoluto no mar',
          description: 'Mega iate de luxo para experiências exclusivas. Com tripulação completa, chef a bordo e todas as comodidades para uma experiência inesquecível.',
          city: 'Búzios',
          neighborhood: 'Marina',
          guests: 20,
          bedrooms: 4,
          bathrooms: 4,
          area_m2: null,
          attributes: {
            length_ft: 60,
            cabins: 4,
            crew: 4,
            sound_system: true,
            bar: true,
            sun_deck: true
          },
          base_price: 6500.00,
          price_label: 'R$ 6.500/dia',
          whatsapp_e164: '5521976860759',
          broker_name: 'Adson Carlos dos Santos',
          is_featured: true,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        },

        // SCHOONER (1)
        {
          id: uuidv4(),
          category: 'escuna',
          slug: 'escuna-buzios-tradicional',
          title: 'Escuna Búzios Tradicional',
          subtitle: 'Passeio clássico pelas praias',
          description: 'Passeio tradicional de escuna pelas principais praias de Búzios. Inclui paradas para banho nas águas cristalinas e vista das famosas praias paradisíacas.',
          city: 'Búzios',
          neighborhood: 'Porto',
          guests: 60,
          bedrooms: null,
          bathrooms: 2,
          area_m2: null,
          attributes: {
            capacity: 60,
            route: 'Praia da Tartaruga, João Fernandes, Azeda',
            duration: '3 horas',
            includes_drinks: true
          },
          base_price: 120.00,
          price_label: 'R$ 120/pessoa',
          whatsapp_e164: '5521976860759',
          broker_name: 'Adson Carlos dos Santos',
          is_featured: true,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        },

        // TRANSFERS (2)
        {
          id: uuidv4(),
          category: 'transfer',
          slug: 'transfer-santos-dumont-buzios',
          title: 'Transfer Santos Dumont - Búzios',
          subtitle: 'Conforto e pontualidade',
          description: 'Transfer executivo do Aeroporto Santos Dumont para Búzios em veículo de luxo com ar condicionado. Motorista experiente e serviço de primeira classe.',
          city: 'Rio de Janeiro - Búzios',
          neighborhood: 'Santos Dumont',
          guests: 4,
          bedrooms: null,
          bathrooms: null,
          area_m2: null,
          attributes: {
            origin: 'Santos Dumont',
            destination: 'Búzios',
            type: 'executivo',
            duration: '2h30min'
          },
          base_price: 450.00,
          price_label: 'R$ 450/trecho',
          whatsapp_e164: '5521976860759',
          broker_name: 'Adson Carlos dos Santos',
          is_featured: false,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),
          category: 'transfer',
          slug: 'transfer-galeao-buzios',
          title: 'Transfer Galeão - Búzios',
          subtitle: 'Viagem confortável e segura',
          description: 'Transfer do Aeroporto do Galeão para Búzios com veículo executivo. Inclui acompanhamento do voo e ajuda com bagagens.',
          city: 'Rio de Janeiro - Búzios',
          neighborhood: 'Galeão',
          guests: 4,
          bedrooms: null,
          bathrooms: null,
          area_m2: null,
          attributes: {
            origin: 'Galeão',
            destination: 'Búzios',
            type: 'executivo',
            duration: '3h00min'
          },
          base_price: 520.00,
          price_label: 'R$ 520/trecho',
          whatsapp_e164: '5521976860759',
          broker_name: 'Adson Carlos dos Santos',
          is_featured: false,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        },

        // BUGGIES (3)
        {
          id: uuidv4(),
          category: 'buggy',
          slug: 'buggy-4x4-trilhas',
          title: 'Buggy 4x4 para Trilhas',
          subtitle: 'Aventura off-road em Búzios',
          description: 'Buggy 4x4 equipado para trilhas e aventuras off-road. Perfeito para explorar as praias mais selvagens e trilhas escondidas de Búzios.',
          city: 'Búzios',
          neighborhood: 'Centro',
          guests: 4,
          bedrooms: null,
          bathrooms: null,
          area_m2: null,
          attributes: {
            seats: 4,
            transmission: 'manual',
            type: '4x4',
            fuel: 'gasolina'
          },
          base_price: 350.00,
          price_label: 'R$ 350/dia',
          whatsapp_e164: '5521976860759',
          broker_name: 'Adson Carlos dos Santos',
          is_featured: false,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),
          category: 'buggy',
          slug: 'buggy-praias-tour',
          title: 'Buggy Tour das Praias',
          subtitle: 'Conheça todas as praias',
          description: 'Buggy confortável para tour pelas praias de Búzios. Inclui roteiro pelas principais praias com paradas para fotos e banho de mar.',
          city: 'Búzios',
          neighborhood: 'Centro',
          guests: 4,
          bedrooms: null,
          bathrooms: null,
          area_m2: null,
          attributes: {
            seats: 4,
            transmission: 'automático',
            type: 'tour',
            fuel: 'flex'
          },
          base_price: 280.00,
          price_label: 'R$ 280/dia',
          whatsapp_e164: '5521976860759',
          broker_name: 'Adson Carlos dos Santos',
          is_featured: true,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),
          category: 'buggy',
          slug: 'buggy-familia-conforto',
          title: 'Buggy Família Confort',
          subtitle: 'Ideal para família',
          description: 'Buggy confortável e seguro, ideal para passeios em família. Com cobertura e equipamentos de segurança para maior tranquilidade.',
          city: 'Búzios',
          neighborhood: 'Centro',
          guests: 6,
          bedrooms: null,
          bathrooms: null,
          area_m2: null,
          attributes: {
            seats: 6,
            transmission: 'automático',
            type: 'família',
            fuel: 'flex'
          },
          base_price: 320.00,
          price_label: 'R$ 320/dia',
          whatsapp_e164: '5521976860759',
          broker_name: 'Adson Carlos dos Santos',
          is_featured: false,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        }
      ]

      await db.collection('listings').deleteMany({})
      await db.collection('listings').insertMany(sampleListings)

      // Sample promotions
      const samplePromotions = [
        {
          id: uuidv4(),
          listing_id: sampleListings[0].id, // Mansão Vista Mar
          title: 'Oferta Especial - Vista Mar',
          description: 'Desconto especial para reservas de 3 dias ou mais',
          discount_percent: 15,
          fixed_price: null,
          starts_at: new Date('2024-12-01'),
          ends_at: new Date('2025-02-28'),
          is_active: true
        },
        {
          id: uuidv4(),
          listing_id: sampleListings[7].id, // Iate 45 pés
          title: 'Promoção Verão - Iate Luxo',
          description: 'Preço especial para temporada de verão',
          discount_percent: null,
          fixed_price: 3200.00,
          starts_at: new Date('2024-12-15'),
          ends_at: new Date('2025-03-15'),
          is_active: true
        }
      ]

      await db.collection('promotions').deleteMany({})
      await db.collection('promotions').insertMany(samplePromotions)

      // Sample reviews
      const sampleReviews = [
        {
          id: uuidv4(),
          listing_id: sampleListings[0].id,
          author_name: 'Marina Silva',
          content: 'Lugar incrível! A vista é de tirar o fôlego e a propriedade é exatamente como nas fotos. O Adson foi super atencioso.',
          rating: 5,
          created_at: new Date('2024-12-15'),
          is_approved: true
        },
        {
          id: uuidv4(),
          listing_id: sampleListings[0].id,
          author_name: 'Carlos Roberto',
          content: 'Experiência perfeita em Búzios. A localização é privilegiada e as comodidades são de primeiro mundo.',
          rating: 5,
          created_at: new Date('2024-12-10'),
          is_approved: true
        },
        {
          id: uuidv4(),
          listing_id: sampleListings[7].id,
          author_name: 'Ana Paula',
          content: 'Passeio incrível de iate! O capitão foi muito profissional e a experiência foi inesquecível.',
          rating: 5,
          created_at: new Date('2024-12-12'),
          is_approved: true
        },
        {
          id: uuidv4(),
          listing_id: sampleListings[1].id,
          author_name: 'João Santos',
          content: 'Casa maravilhosa na Ferradura. Tudo muito limpo e organizado. Recomendo!',
          rating: 4,
          created_at: new Date('2024-12-08'),
          is_approved: false
        }
      ]

      await db.collection('reviews').deleteMany({})
      await db.collection('reviews').insertMany(sampleReviews)

      return handleCORS(NextResponse.json({ 
        message: "Database seeded successfully",
        counts: {
          amenities: amenities.length,
          listings: sampleListings.length,
          promotions: samplePromotions.length,
          reviews: sampleReviews.length
        }
      }))
    }

    // Route not found
    return handleCORS(NextResponse.json(
      { error: `Route ${route} not found` }, 
      { status: 404 }
    ))

  } catch (error) {
    console.error('API Error:', error)
    return handleCORS(NextResponse.json(
      { error: "Internal server error", details: error.message }, 
      { status: 500 }
    ))
  }
}

// Export all HTTP methods
export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute
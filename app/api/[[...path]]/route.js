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

    // Create listing - POST /api/listings
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

      // Sample listings
      const sampleListings = [
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
        }
      ]

      await db.collection('listings').deleteMany({})
      await db.collection('listings').insertMany(sampleListings)

      return handleCORS(NextResponse.json({ 
        message: "Database seeded successfully",
        counts: {
          amenities: amenities.length,
          listings: sampleListings.length
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
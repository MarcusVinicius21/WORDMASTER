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
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
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
  mansoes: 'Mansão',
  iate: 'Iate',
  iates: 'Iate',
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
      if (category && (CATEGORIES[category] || CATEGORIES[`${category}s`])) {
        filter.category = category === 'mansoes' ? 'mansoes' : category
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
      
      const listingsWithImages = await Promise.all(listings.map(async (listing) => {
        const firstMedia = await db.collection('listing_media').findOne(
          { listing_id: listing.id },
          { sort: { sort_order: 1 } }
        );
        return {
          ...listing,
          featured_image: firstMedia ? firstMedia.url : null
        };
      }));

      const cleanListings = listingsWithImages.map(({ _id, ...rest }) => rest)
      
      return handleCORS(NextResponse.json({
        listings: cleanListings,
        total: await db.collection('listings').countDocuments(filter)
      }))
    }

    // Get single listing - GET /api/listings/[id] or [slug]
    if (route.startsWith('/listings/') && method === 'GET' && path.length === 2) {
      const identifier = path[1]

      const listing = await db.collection('listings').findOne({
        $or: [{ id: identifier }, { slug: identifier }]
      })

      if (!listing) {
        return handleCORS(NextResponse.json({ error: "Listing not found" }, { status: 404 }))
      }

      const media = await db.collection('listing_media').find({ listing_id: listing.id }).sort({ sort_order: 1 }).toArray()
      const amenities = await db.collection('listing_amenities').aggregate([ { $match: { listing_id: listing.id } }, { $lookup: { from: 'amenities', localField: 'amenity_id', foreignField: 'id', as: 'amenity'}}, { $unwind: '$amenity' }]).toArray()
      const reviews = await db.collection('reviews').find({ listing_id: listing.id, is_approved: true }).sort({ created_at: -1 }).limit(10).toArray()
      const { _id, ...cleanListing } = listing
      
      return handleCORS(NextResponse.json({
        ...cleanListing,
        media: media.map(({ _id, ...rest }) => rest),
        amenities: amenities.map(item => ({...item.amenity, available: item.available})),
        reviews: reviews.map(({ _id, ...rest }) => rest)
      }))
    }
    
    // Create Listing - POST /api/listings
    if (route === '/listings' && method === 'POST') {
      const body = await request.json()
      const required = ['category', 'title']
      for (const field of required) {
        if (!body[field]) {
          return handleCORS(NextResponse.json({ error: `${field} is required` }, { status: 400 }))
        }
      }
      if (!CATEGORIES[body.category]) {
        return handleCORS(NextResponse.json({ error: "Invalid category" }, { status: 400 }))
      }
      const listingId = uuidv4()
      const slugBase = body.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim('-')
      const listing = {
        id: listingId,
        category: body.category,
        slug: `${slugBase}-${listingId.substring(0, 8)}`,
        title: body.title,
        subtitle: body.subtitle || '',
        description: body.description || '',
        city: body.city || 'Búzios',
        neighborhood: body.neighborhood || '',
        guests: body.guests || null,
        bedrooms: body.bedrooms || null,
        bathrooms: body.bathrooms || null,
        area_m2: body.area_m2 || null,
        base_price: body.base_price || null,
        price_label: body.price_label || '',
        is_featured: body.is_featured || false,
        is_active: body.is_active !== false,
        created_at: new Date(),
        updated_at: new Date()
      }
      await db.collection('listings').insertOne(listing)
      const { _id, ...cleanListing } = listing
      return handleCORS(NextResponse.json(cleanListing, { status: 201 }))
    }

    // Update listing - PATCH /api/listings/[id]
    if (route.startsWith('/listings/') && method === 'PATCH') {
        const listingId = path[1]
        const body = await request.json();
        delete body.id;
        delete body.created_at;
        const result = await db.collection('listings').updateOne({ id: listingId }, { $set: { ...body, updated_at: new Date() } });
        if (result.matchedCount === 0) {
            return handleCORS(NextResponse.json({ error: "Listing not found" }, { status: 404 }));
        }
        const updatedListing = await db.collection('listings').findOne({ id: listingId });
        const { _id, ...cleanUpdatedListing } = updatedListing;
        return handleCORS(NextResponse.json(cleanUpdatedListing));
    }

    // Delete listing - DELETE /api/listings/[id]
    if (route.startsWith('/listings/') && method === 'DELETE') {
      const listingId = path[1]
      const result = await db.collection('listings').deleteOne({ id: listingId })
      if (result.deletedCount === 0) {
        return handleCORS(NextResponse.json({ error: "Listing not found" }, { status: 404 }))
      }
      await db.collection('listing_media').deleteMany({ listing_id: listingId });
      return handleCORS(NextResponse.json({ success: true }))
    }
    
    // Get reviews - GET /api/reviews
    if (route === '/reviews' && method === 'GET') {
      const url = new URL(request.url);
      const is_approved = url.searchParams.get('is_approved');
      let filter = {};
      if (is_approved === 'false') filter.is_approved = false;
      else if (is_approved === 'true') filter.is_approved = true;
      const reviews = await db.collection('reviews').find(filter).sort({ created_at: -1 }).toArray()
      return handleCORS(NextResponse.json({ reviews: reviews.map(({ _id, ...rest }) => rest) }))
    }
    
    // Create media - POST /api/media
    if (route === '/media' && method === 'POST') {
        const body = await request.json();
        const required = ['listing_id', 'type', 'url'];
        for (const field of required) {
            if (!body[field]) return handleCORS(NextResponse.json({ error: `${field} is required` }, { status: 400 }));
        }
        const media = {
            id: uuidv4(),
            listing_id: body.listing_id,
            type: body.type,
            url: body.url,
            alt_text: body.alt_text || '',
            sort_order: body.sort_order || 1,
            created_at: new Date()
        };
        await db.collection('listing_media').insertOne(media);
        const { _id, ...cleanMedia } = media;
        return handleCORS(NextResponse.json(cleanMedia, { status: 201 }));
    }

    // Get media for listing - GET /api/media
    if (route === '/media' && method === 'GET') {
        const url = new URL(request.url);
        const listingId = url.searchParams.get('listing_id');
        if (!listingId) return handleCORS(NextResponse.json({ error: "listing_id is required" }, { status: 400 }));
        const media = await db.collection('listing_media').find({ listing_id: listingId }).sort({ sort_order: 1 }).toArray();
        return handleCORS(NextResponse.json({ media: media.map(({ _id, ...rest }) => rest) }));
    }
    
    // Route not found
    return handleCORS(NextResponse.json({ error: `Route ${route} not found` }, { status: 404 }))

  } catch (error) {
    console.error('API Error:', error)
    return handleCORS(NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 }))
  }
}

// Export all HTTP methods
export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute
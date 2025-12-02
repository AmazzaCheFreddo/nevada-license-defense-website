import { NextResponse } from 'next/server'

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!apiKey || !placeId) {
    return NextResponse.json(
      { 
        error: 'Google Places API key or Place ID not configured',
        apiKey: apiKey ? 'Set' : 'Missing',
        placeId: placeId ? 'Set' : 'Missing'
      },
      { status: 500 }
    )
  }

  try {
    // Fetch place details including reviews
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`
    
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { 
          error: 'Failed to fetch from Google API',
          status: response.status,
          details: errorText
        },
        { status: 500 }
      )
    }

    const data = await response.json()

    if (data.status !== 'OK') {
      return NextResponse.json(
        { 
          error: 'Google API returned an error',
          status: data.status,
          message: data.error_message || 'Unknown error'
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      name: data.result.name,
      rating: data.result.rating,
      totalRatings: data.result.user_ratings_total,
      reviews: data.result.reviews || [],
    })
  } catch (error) {
    console.error('Error fetching Google reviews:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch reviews',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}


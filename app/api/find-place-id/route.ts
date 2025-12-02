import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const businessName = searchParams.get('name') || 'Nevada License Defense'
  const apiKey = searchParams.get('key') || process.env.GOOGLE_PLACES_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key required. Add ?key=YOUR_API_KEY to the URL' },
      { status: 400 }
    )
  }

  try {
    // Search for the business
    const searchResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(businessName)}&key=${apiKey}`
    )

    const searchData = await searchResponse.json()

    if (searchData.status !== 'OK') {
      return NextResponse.json(
        { error: searchData.error_message || 'Failed to search for business' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      results: searchData.results.map((place: any) => ({
        place_id: place.place_id,
        name: place.name,
        formatted_address: place.formatted_address,
        rating: place.rating,
      })),
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to search for place' },
      { status: 500 }
    )
  }
}


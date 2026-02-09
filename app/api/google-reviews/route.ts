import { NextResponse } from 'next/server'
import { getArchivedReviews, saveArchivedReviews, mergeReviews } from '@/lib/reviews'
import { ArchivedReviews } from '@/lib/reviews'
import type { Review } from '@/types/reviews'

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
    // Get archived reviews first
    const archived = getArchivedReviews()
    const archivedReviews = archived?.reviews || []

    // Check if archived reviews are stale (older than 30 minutes)
    const archiveAge = archived && archived.lastUpdated
      ? Date.now() - new Date(archived.lastUpdated).getTime()
      : Infinity
    const isArchiveStale = archiveAge > 30 * 60 * 1000 // 30 minutes

    // If we have archived reviews AND they're fresh, use them
    // Otherwise, fetch new reviews to update the archive
    if (archived && archivedReviews.length > 5 && !isArchiveStale) {
      // Filter to only show 5-star reviews
      const fiveStarReviews = archivedReviews.filter(review => review.rating === 5)
      console.log(`Returning ${fiveStarReviews.length} of ${archivedReviews.length} archived reviews (5-star only) - archive is fresh`)
      return NextResponse.json({
        name: archived.businessName,
        rating: archived.rating,
        totalRatings: archived.totalRatings,
        reviews: fiveStarReviews,
        fromArchive: true,
        archivedCount: fiveStarReviews.length,
        archiveAgeMinutes: Math.floor(archiveAge / 60000),
      })
    }

    // Archive is stale or doesn't exist - fetch fresh reviews
    if (isArchiveStale) {
      console.log(`Archive is stale (${Math.floor(archiveAge / 60000)} minutes old), fetching fresh reviews...`)
    }

    // Fetch new reviews from Google Places API
    // Note: Google Places API Details returns up to 5 reviews per request
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`
    
    const response = await fetch(url, {
      next: { revalidate: 60 }, // Cache for 1 minute - check for new reviews frequently
    })

    if (!response.ok) {
      // If API fails but we have archived reviews, return those
      if (archived) {
        // Filter to only show 5-star reviews
        const fiveStarReviews = archived.reviews.filter(review => review.rating === 5)
        console.warn('Google API failed, returning archived reviews (5-star only)')
        return NextResponse.json({
          name: archived.businessName,
          rating: archived.rating,
          totalRatings: archived.totalRatings,
          reviews: fiveStarReviews,
          fromArchive: true,
        })
      }

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
      // If API fails but we have archived reviews, return those
      if (archived) {
        // Filter to only show 5-star reviews
        const fiveStarReviews = archived.reviews.filter(review => review.rating === 5)
        console.warn('Google API returned error, returning archived reviews (5-star only)')
        return NextResponse.json({
          name: archived.businessName,
          rating: archived.rating,
          totalRatings: archived.totalRatings,
          reviews: fiveStarReviews,
          fromArchive: true,
        })
      }

      return NextResponse.json(
        { 
          error: 'Google API returned an error',
          status: data.status,
          message: data.error_message || 'Unknown error'
        },
        { status: 500 }
      )
    }

    // Get new reviews from API
    const newReviews = data.result.reviews || []
    const businessName = data.result.name
    const rating = data.result.rating
    const totalRatings = data.result.user_ratings_total

    // Merge new reviews with archived reviews
    const allReviews = mergeReviews(archivedReviews, newReviews)

    // Create/update archive
    const archiveData: ArchivedReviews = {
      lastUpdated: new Date().toISOString(),
      businessName,
      rating,
      totalRatings,
      reviews: allReviews,
    }

    // Save to archive
    try {
      saveArchivedReviews(archiveData)
      console.log(`Archived ${allReviews.length} reviews (${newReviews.length} new, ${archivedReviews.length} archived)`)
    } catch (archiveError) {
      console.error('Error saving to archive:', archiveError)
      // Continue even if archiving fails
    }

    // Filter to only show 5-star reviews
    const fiveStarReviews = allReviews.filter(review => review.rating === 5)

    // Return only 5-star reviews
    return NextResponse.json({
      name: businessName,
      rating,
      totalRatings,
      reviews: fiveStarReviews,
      fromArchive: false,
      archivedCount: fiveStarReviews.length,
      newCount: newReviews.filter((r: Review) => r.rating === 5).length,
    })
  } catch (error) {
    // If error but we have archived reviews, return those
    const archived = getArchivedReviews()
    if (archived) {
      // Filter to only show 5-star reviews
      const fiveStarReviews = archived.reviews.filter(review => review.rating === 5)
      console.warn('Error fetching from Google API, returning archived reviews (5-star only):', error)
      return NextResponse.json({
        name: archived.businessName,
        rating: archived.rating,
        totalRatings: archived.totalRatings,
        reviews: fiveStarReviews,
        fromArchive: true,
      })
    }

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

import { NextResponse } from 'next/server'
import { getArchivedReviews, saveArchivedReviews, mergeReviews } from '@/lib/reviews'
import { ArchivedReviews } from '@/lib/reviews'

/**
 * Refresh endpoint that bypasses cache and fetches fresh reviews
 * Can be called multiple times to accumulate more reviews
 * 
 * Usage: GET /api/google-reviews/refresh?count=5
 * - count: Number of times to call the API (default: 1, max: 10)
 */
export async function GET(request: Request) {
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

  // Get count parameter (how many times to fetch)
  const { searchParams } = new URL(request.url)
  const countParam = searchParams.get('count')
  const fetchCount = Math.min(Math.max(parseInt(countParam || '1', 10), 1), 10) // Between 1 and 10

  try {
    // Get archived reviews first
    const archived = getArchivedReviews()
    let archivedReviews = archived?.reviews || []
    let allNewReviews: any[] = []
    let businessName = archived?.businessName || ''
    let rating = archived?.rating || 0
    let totalRatings = archived?.totalRatings || 0

    // Make multiple API calls to get different sets of reviews
    // Google rotates which reviews it returns, so multiple calls can capture more
    for (let i = 0; i < fetchCount; i++) {
      try {
        // Add small delay between requests to avoid rate limiting
        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, 500)) // 500ms delay
        }

        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`
        
        const response = await fetch(url, {
          cache: 'no-store', // Bypass cache for fresh data
        })

        if (!response.ok) {
          console.warn(`API call ${i + 1} failed:`, response.status)
          continue
        }

        const data = await response.json()

        if (data.status !== 'OK') {
          console.warn(`API call ${i + 1} returned error:`, data.status)
          continue
        }

        // Update business info (use latest)
        businessName = data.result.name || businessName
        rating = data.result.rating || rating
        totalRatings = data.result.user_ratings_total || totalRatings

        // Get reviews from this call
        const reviews = data.result.reviews || []
        allNewReviews.push(...reviews)

        console.log(`Fetch ${i + 1}/${fetchCount}: Got ${reviews.length} reviews`)
      } catch (error) {
        console.error(`Error in fetch ${i + 1}:`, error)
        // Continue with next fetch
      }
    }

    // Calculate stats before merging
    const initialArchiveCount = archivedReviews.length
    const totalReviewsFetched = allNewReviews.length

    // Merge all new reviews with archived reviews
    const allReviews = mergeReviews(archivedReviews, allNewReviews)

    // Calculate how many were actually new (not duplicates)
    const actuallyNewCount = allReviews.length - initialArchiveCount

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
      console.log(`Archive updated: ${allReviews.length} total reviews (${actuallyNewCount} new unique reviews from ${fetchCount} API calls, ${initialArchiveCount} were already archived)`)
    } catch (archiveError) {
      console.error('Error saving to archive:', archiveError)
      return NextResponse.json(
        { 
          error: 'Failed to save archive',
          details: archiveError instanceof Error ? archiveError.message : 'Unknown error'
        },
        { status: 500 }
      )
    }

    // Return results
    return NextResponse.json({
      success: true,
      name: businessName,
      rating,
      totalRatings,
      reviews: allReviews,
      stats: {
        totalArchived: allReviews.length,
        reviewsFetchedFromAPI: totalReviewsFetched,
        uniqueNewReviewsAdded: actuallyNewCount,
        reviewsAlreadyInArchive: initialArchiveCount,
        apiCallsMade: fetchCount,
        duplicatesRemoved: totalReviewsFetched - actuallyNewCount,
      },
      message: `Successfully refreshed. Archive now contains ${allReviews.length} reviews (${actuallyNewCount} new reviews added from ${fetchCount} API calls).`,
    })
  } catch (error) {
    console.error('Error refreshing reviews:', error)
    return NextResponse.json(
      { 
        error: 'Failed to refresh reviews',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}


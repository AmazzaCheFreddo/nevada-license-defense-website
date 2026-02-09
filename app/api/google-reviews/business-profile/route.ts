import { NextRequest, NextResponse } from 'next/server'
import { getLocationReviews, convertBusinessProfileReview, getAuthenticatedClient } from '@/lib/google-business-profile'
import { getArchivedReviews } from '@/lib/reviews'

/**
 * Fetch reviews using Google Business Profile API
 * 
 * This requires an access token from the OAuth flow.
 * 
 * GET /api/google-reviews/business-profile?access_token=...
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const accessToken = searchParams.get('access_token')

  if (!accessToken) {
    return NextResponse.json(
      { 
        error: 'Access token required',
        hint: 'Complete OAuth flow at /api/auth/google first'
      },
      { status: 400 }
    )
  }

  // For now, we'll use the archived reviews
  // In production, you'd store account/location info and tokens in a database
  const archived = getArchivedReviews()

  if (!archived) {
    return NextResponse.json(
      { 
        error: 'No reviews found. Complete OAuth flow first to fetch reviews.',
        hint: 'Visit /api/auth/google to start OAuth flow'
      },
      { status: 404 }
    )
  }

  // Return archived reviews
  // In production, you'd fetch fresh reviews using the stored tokens
  return NextResponse.json({
    name: archived.businessName,
    rating: archived.rating,
    totalRatings: archived.totalRatings,
    reviews: archived.reviews,
    fromArchive: true,
    note: 'Using archived reviews. To fetch fresh reviews, complete OAuth flow again.',
  })
}


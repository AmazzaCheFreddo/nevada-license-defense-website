import { NextRequest, NextResponse } from 'next/server'
import { getArchivedReviews, saveArchivedReviews, mergeReviews } from '@/lib/reviews'
import { ArchivedReviews } from '@/lib/reviews'
import { Review } from '@/types/reviews'

/**
 * Manual import endpoint to add reviews from Google Business Profile
 * 
 * Usage: POST /api/google-reviews/manual-import
 * Body: { reviews: Review[] }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { reviews } = body

    if (!reviews || !Array.isArray(reviews)) {
      return NextResponse.json(
        { error: 'Reviews array is required' },
        { status: 400 }
      )
    }

    // Validate review structure
    const validReviews: Review[] = reviews.filter((review: any) => {
      return review.author_name && review.text && review.rating
    })

    if (validReviews.length === 0) {
      return NextResponse.json(
        { error: 'No valid reviews provided. Reviews must have author_name, text, and rating.' },
        { status: 400 }
      )
    }

    // Get archived reviews
    const archived = getArchivedReviews()
    const archivedReviews = archived?.reviews || []

    // Merge manually imported reviews with archived reviews
    const allReviews = mergeReviews(archivedReviews, validReviews)

    // Get business info from archive or use defaults
    const businessName = archived?.businessName || 'LV Nurse Attorney'
    const rating = archived?.rating || 0
    const totalRatings = archived?.totalRatings || allReviews.length

    // Create/update archive
    const archiveData: ArchivedReviews = {
      lastUpdated: new Date().toISOString(),
      businessName,
      rating,
      totalRatings,
      reviews: allReviews,
    }

    // Save to archive
    saveArchivedReviews(archiveData)

    const newCount = allReviews.length - archivedReviews.length

    return NextResponse.json({
      success: true,
      message: `Successfully imported ${validReviews.length} reviews. ${newCount} new reviews added to archive.`,
      stats: {
        imported: validReviews.length,
        newReviewsAdded: newCount,
        totalArchived: allReviews.length,
        alreadyExisted: validReviews.length - newCount,
      },
    })
  } catch (error) {
    console.error('Error importing reviews:', error)
    return NextResponse.json(
      { 
        error: 'Failed to import reviews',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}


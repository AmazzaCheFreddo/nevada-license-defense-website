import fs from 'fs'
import path from 'path'
import { Review } from '@/types/reviews'

const reviewsFilePath = path.join(process.cwd(), 'content', 'reviews.json')

export interface ArchivedReviews {
  lastUpdated: string
  businessName: string
  rating: number
  totalRatings: number
  reviews: Review[]
}

/**
 * Get all archived reviews
 */
export function getArchivedReviews(): ArchivedReviews | null {
  try {
    if (!fs.existsSync(reviewsFilePath)) {
      return null
    }

    const fileContents = fs.readFileSync(reviewsFilePath, 'utf8')
    return JSON.parse(fileContents) as ArchivedReviews
  } catch (error) {
    console.error('Error reading archived reviews:', error)
    return null
  }
}

/**
 * Save reviews to archive
 */
export function saveArchivedReviews(data: ArchivedReviews): void {
  try {
    // Ensure content directory exists
    const contentDir = path.dirname(reviewsFilePath)
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true })
    }

    // Write to file
    fs.writeFileSync(reviewsFilePath, JSON.stringify(data, null, 2), 'utf8')
  } catch (error) {
    console.error('Error saving archived reviews:', error)
    throw error
  }
}

/**
 * Create a unique identifier for a review
 */
function getReviewId(review: Review): string {
  // Use time + author_name as unique identifier
  return `${review.time || Date.now()}-${review.author_name || 'anonymous'}`
}

/**
 * Merge new reviews with archived reviews, avoiding duplicates
 */
export function mergeReviews(archived: Review[], newReviews: Review[]): Review[] {
  const reviewMap = new Map<string, Review>()

  // Add archived reviews first
  archived.forEach((review) => {
    const id = getReviewId(review)
    reviewMap.set(id, review)
  })

  // Add new reviews (will overwrite if duplicate, but that's okay - we want latest)
  newReviews.forEach((review) => {
    const id = getReviewId(review)
    reviewMap.set(id, review)
  })

  // Convert back to array and sort by time (newest first)
  const merged = Array.from(reviewMap.values())
  return merged.sort((a, b) => {
    const timeA = a.time || 0
    const timeB = b.time || 0
    return timeB - timeA // Newest first
  })
}


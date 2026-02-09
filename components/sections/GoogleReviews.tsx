'use client'

import { useState, useRef } from 'react'
import { Review } from '@/types/reviews'

interface GoogleReviewsProps {
  reviews: Review[]
  rating: number
  totalRatings: number
  businessName: string
}

const MAX_CHARACTERS = 250 // Consistent character limit for all reviews

export default function GoogleReviews({ reviews, rating, totalRatings, businessName }: GoogleReviewsProps) {
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set())
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nevadalicensedefense.com'
  
  // Create structured data for SEO (include all reviews)
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessName,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.toString(),
      reviewCount: totalRatings.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    review: reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author_name || 'Anonymous',
      },
      datePublished: review.time ? new Date(review.time * 1000).toISOString() : new Date().toISOString(),
      reviewBody: review.text,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
    })),
  }

  // Format date helper
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  // Truncate text helper
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength).trim() + '...'
  }

  // Toggle expand/collapse
  const toggleExpand = (reviewIndex: number) => {
    setExpandedReviews((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(reviewIndex)) {
        newSet.delete(reviewIndex)
      } else {
        newSet.add(reviewIndex)
      }
      return newSet
    })
  }

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 0
      const gap = 24 // gap-6 = 1.5rem = 24px
      const scrollAmount = (cardWidth + gap) * 3 // Scroll by 3 reviews
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 0
      const gap = 24 // gap-6 = 1.5rem = 24px
      const scrollAmount = (cardWidth + gap) * 3 // Scroll by 3 reviews
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  // Star rating component
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${star <= rating ? 'text-light-gold' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(reviewSchema),
          }}
        />
        <section className="section-padding bg-gray-50">
          <div className="section-container">
            <div className="text-center py-12">
              <p className="text-gray-600">No reviews available at this time.</p>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewSchema),
        }}
      />

      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-blue mb-4">
              Reviews from Our Clients
            </h2>
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="flex items-center gap-2">
                <StarRating rating={Math.round(rating)} />
                <span className="text-2xl font-bold text-dark-blue">{rating.toFixed(1)}</span>
              </div>
              <span className="text-gray-600">•</span>
              <span className="text-gray-700">
                {totalRatings} {totalRatings === 1 ? 'Review' : 'Reviews'}
              </span>
            </div>
            <a
              href="https://share.google.com/8HRvd6JJj1Aot9E1H"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-blue font-semibold hover:text-light-gold transition-all duration-300 ease-in-out inline-flex items-center mt-4"
            >
              View All Reviews on Google
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Carousel Container */}
          <div className="max-w-7xl mx-auto relative">
            {/* Scrollable Reviews Container */}
            <div className="relative">
              {/* Navigation Arrows - Always show if more than 3 reviews */}
              {reviews.length > 3 && (
                <>
                  <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-light-gold group z-20"
                    aria-label="Scroll left"
                  >
                    <svg
                      className="w-6 h-6 text-dark-blue group-hover:text-white transition-colors duration-300"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-light-gold group z-20"
                    aria-label="Scroll right"
                  >
                    <svg
                      className="w-6 h-6 text-dark-blue group-hover:text-white transition-colors duration-300"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Scrollable Container - All reviews visible, 3 at a time */}
              <div
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-2"
                style={{
                  scrollSnapType: 'x mandatory',
                  scrollBehavior: 'smooth',
                }}
              >
                {reviews.map((review, index) => {
                  const isExpanded = expandedReviews.has(index)
                  const reviewText = isExpanded 
                    ? review.text 
                    : truncateText(review.text, MAX_CHARACTERS)
                  const needsTruncation = review.text.length > MAX_CHARACTERS

                  return (
                    <article
                      key={review.time || index}
                      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 animate-fade-in flex flex-col flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] min-w-[280px] max-w-[380px]"
                      style={{ 
                        animationDelay: `${index * 50}ms`,
                        scrollSnapAlign: 'start',
                      }}
                      itemScope
                      itemType="https://schema.org/Review"
                    >
                      {/* Review Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            {review.profile_photo_url && (
                              <img
                                src={review.profile_photo_url}
                                alt={review.author_name || 'Reviewer'}
                                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                                itemProp="author"
                                itemScope
                                itemType="https://schema.org/Person"
                              />
                            )}
                            <div className="min-w-0 flex-1">
                              <h3 className="font-bold text-dark-blue text-sm truncate" itemProp="author" itemScope itemType="https://schema.org/Person">
                                <span itemProp="name">{review.author_name || 'Anonymous'}</span>
                              </h3>
                              {review.time && (
                                <time
                                  className="text-xs text-gray-600"
                                  dateTime={new Date(review.time * 1000).toISOString()}
                                  itemProp="datePublished"
                                >
                                  {formatDate(review.time)}
                                </time>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0 ml-2" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                          <meta itemProp="ratingValue" content={review.rating.toString()} />
                          <meta itemProp="bestRating" content="5" />
                          <meta itemProp="worstRating" content="1" />
                          <StarRating rating={review.rating} />
                        </div>
                      </div>

                      {/* Review Text */}
                      <div className="text-gray-700 leading-relaxed mb-4 flex-1 min-h-[100px]" itemProp="reviewBody">
                        <p className="text-sm">
                          {reviewText}
                        </p>
                        {needsTruncation && (
                          <button
                            onClick={() => toggleExpand(index)}
                            className="text-dark-blue font-semibold hover:text-light-gold transition-colors duration-300 mt-2 inline-flex items-center gap-1 text-xs"
                            aria-label={isExpanded ? 'Read less' : 'Read more'}
                          >
                            {isExpanded ? (
                              <>
                                Read less
                                <svg className="w-3 h-3" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                  <path d="M5 15l7-7 7 7" />
                                </svg>
                              </>
                            ) : (
                              <>
                                Read more
                                <svg className="w-3 h-3" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                  <path d="M19 9l-7 7-7-7" />
                                </svg>
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      {/* Google Badge */}
                      <div className="pt-4 border-t border-gray-200 mt-auto">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                          </svg>
                          <span>Google</span>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

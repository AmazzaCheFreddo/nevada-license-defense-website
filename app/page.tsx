import dynamic from 'next/dynamic'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import About from '@/components/sections/About'
import GoogleReviews from '@/components/sections/GoogleReviews'
import { GoogleReviewsResponse } from '@/types/reviews'

// Lazy load below-the-fold components
const CTA = dynamic(() => import('@/components/sections/CTA'), {
  loading: () => null,
})

const ContactForm = dynamic(() => import('@/components/sections/ContactForm'), {
  loading: () => <div className="section-padding bg-white"><div className="section-container"><div className="text-center py-12">Loading contact form...</div></div></div>,
})

async function getGoogleReviews(): Promise<GoogleReviewsResponse | null> {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3333'
    const response = await fetch(`${siteUrl}/api/google-reviews`, {
      next: { revalidate: 60 }, // Cache for 1 minute - check for new reviews frequently
    })

    if (!response.ok) {
      console.error('Failed to fetch Google reviews:', response.statusText)
      return null
    }

    const data = await response.json()
    
    if (data.error) {
      console.error('Google reviews API error:', data.error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching Google reviews:', error)
    return null
  }
}

export default async function Home() {
  // Fetch reviews server-side for SEO
  const reviewsData = await getGoogleReviews()

  return (
    <>
      <Hero />
      <Services />
      <About />
      {reviewsData ? (
        <GoogleReviews
          reviews={reviewsData.reviews}
          rating={reviewsData.rating}
          totalRatings={reviewsData.totalRatings}
          businessName={reviewsData.name}
        />
      ) : (
        // Fallback if reviews can't be loaded
        <section className="section-padding bg-gray-50">
          <div className="section-container">
            <div className="text-center py-12">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-blue mb-4">
                Reviews from Our Clients
              </h2>
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
          </div>
        </section>
      )}
      <CTA />
      <ContactForm />
    </>
  )
}






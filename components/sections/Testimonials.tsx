'use client'

import { useEffect, useState } from 'react'

export default function Testimonials() {
  const [shouldLoadWidget, setShouldLoadWidget] = useState(false)

  useEffect(() => {
    // Use Intersection Observer to load widget only when section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !shouldLoadWidget) {
          setShouldLoadWidget(true)
        }
      },
      { rootMargin: '100px' } // Start loading 100px before section is visible
    )

    const section = document.getElementById('testimonials-section')
    if (section) {
      observer.observe(section)
    }

    return () => {
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [shouldLoadWidget])

  useEffect(() => {
    if (!shouldLoadWidget) return

    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')
    if (existingScript) return

    // Load Elfsight widget script
    const script = document.createElement('script')
    script.src = 'https://elfsightcdn.com/platform.js'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    return () => {
      // Cleanup: remove script on unmount
      const scriptToRemove = document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [shouldLoadWidget])

  return (
    <section id="testimonials-section" className="section-padding bg-gray-50">
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold text-dark-blue mb-12 text-center animate-fade-in">
          Reviews from Our Clients
        </h2>
        
        <div className="max-w-6xl mx-auto">
          {/* Google Reviews Widget Container */}
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* 
              SETUP INSTRUCTIONS:
              
              Option 1: Elfsight (Recommended - Free tier, no billing required)
              1. Go to https://elfsight.com/google-reviews-widget/
              2. Sign up for free account
              3. Connect your Google Business profile using: https://share.google/8HRvd6JJj1Aot9E1H
              4. Customize the widget design
              5. Copy your widget ID
              6. Replace 'YOUR_WIDGET_ID' below with your actual widget ID
              
              Option 2: ReviewsOnMyWebsite (Free tier available)
              1. Go to https://reviewsonmywebsite.com/
              2. Sign up and connect Google Business
              3. Get embed code and paste below
            */}
            
            {/* Elfsight Google Reviews Widget */}
            <div 
              className="elfsight-app-2fcbbb89-6436-41df-966b-0c8ec9072c21" 
              data-elfsight-app-lazy
            />
            
            {/* Fallback link if widget doesn't load */}
            <div className="mt-8 text-center">
              <a
                href="https://share.google/8HRvd6JJj1Aot9E1H"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-blue font-bold hover:text-light-gold transition-all duration-300 ease-in-out inline-flex items-center"
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
        </div>
      </div>
    </section>
  )
}







'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Cloud Background - Static */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/mountain_background.png"
          alt="Cloud background"
          fill
          className="object-cover"
          style={{ objectPosition: 'center' }}
          quality={92}
          priority
          sizes="100vw"
        />
      </div>

      {/* Mountain Midground - Rises up */}
      <div className="absolute inset-0 z-10 animate-mountain-rise-mid" style={{ transform: 'translateY(100%)' }}>
        <Image
          src="/images/mountain_midground.png"
          alt="Mountain midground"
          fill
          className="object-cover"
          style={{ objectPosition: 'bottom' }}
          quality={92}
          priority
          sizes="100vw"
        />
      </div>

      {/* Mountain Foreground - Rises up and overlaps */}
      <div className="absolute inset-0 z-20 animate-mountain-rise-fore" style={{ transform: 'translateY(100%)' }}>
        <Image
          src="/images/mountain_foreground.png"
          alt="Mountain foreground"
          fill
          className="object-cover"
          style={{ objectPosition: 'bottom' }}
          quality={92}
          priority
          sizes="100vw"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-30 h-full flex items-center">
        <div className="section-container w-full">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up text-white drop-shadow-lg">
              Nevada License Defense
              <span className="block text-2xl md:text-3xl lg:text-4xl font-bold mt-2 text-white drop-shadow-lg">
                of Medical Professionals
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white animate-slide-up delay-100 drop-shadow-lg">
              Licensed Nevada Attorney Craig K. Perry will defend your professional license 
              with expertise and dedication before various Nevada State Boards.
            </p>

            <p className="text-lg mb-12 text-white animate-slide-up delay-200 drop-shadow-lg">
              To date, he has handled cases before the State Board of Nursing, the State Board 
              of Pharmacy, the Board of Medical Examiners, the Board of Veterinary Examiners, 
              and the American Registry of Radiologic Technologists (ARRT).
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in delay-300">
              <a
                href="tel:7028934777"
                className="btn-gold text-lg px-8 py-4 flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                702.893.4777
              </a>
              <Link
                href="/contact"
                className="bg-white text-dark-blue px-8 py-4 rounded-lg font-bold border-2 border-white hover:bg-light-gold hover:border-light-gold transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-lg"
              >
                Free Consultation
              </Link>
            </div>

            <p className="mt-8 text-white italic font-semibold animate-fade-in delay-400 drop-shadow-lg">
              Defending the Licenses of Nurses, Doctors, Therapists, Technologists, and more
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}






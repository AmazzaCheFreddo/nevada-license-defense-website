import type { Metadata } from 'next'
import { Josefin_Sans } from 'next/font/google'
import './globals.css'
import ConditionalLayout from '@/components/layout/ConditionalLayout'

const josefinSans = Josefin_Sans({ 
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-josefin-sans',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Nevada License Defense | Professional License Defense Attorney',
  description: 'Licensed Nevada Attorney Craig K. Perry defends professional licenses before various Nevada State Boards including Nursing, Pharmacy, and Medical Examiners.',
  keywords: 'Nevada license defense, nursing license defense, pharmacy license defense, medical license defense, professional license attorney',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://nevadalicensedefense.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload hero mountain images so they're ready before the rise animation */}
        <link rel="preload" href="/images/mountain_midground.png" as="image" />
        <link rel="preload" href="/images/mountain_foreground.png" as="image" />
        {/* Organization + LegalService + Attorney JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['LegalService', 'Attorney'],
              name: 'Nevada License Defense',
              description: 'Licensed Nevada Attorney Craig K. Perry defends professional licenses before various Nevada State Boards including Nursing, Pharmacy, and Medical Examiners.',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://nevadalicensedefense.com',
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nevadalicensedefense.com'}/images/NEVADA LICENSE DEFENSE LOGO.png`,
              image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nevadalicensedefense.com'}/images/craig_blue_arms_crossed.jpg`,
              telephone: '+1-702-893-4777',
              email: 'info@craigperry.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '2300 West Sahara Avenue, Suite 800',
                addressLocality: 'Las Vegas',
                addressRegion: 'NV',
                postalCode: '89102',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 36.1447,
                longitude: -115.1728,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
                  opens: '09:00',
                  closes: '17:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Friday',
                  opens: '08:00',
                  closes: '11:00',
                },
              ],
              founder: {
                '@type': 'Person',
                name: 'Craig K. Perry',
                jobTitle: 'Attorney',
              },
              areaServed: {
                '@type': 'State',
                name: 'Nevada',
              },
              priceRange: 'Free Consultation',
              sameAs: [
                'https://www.youtube.com/@lvnurseattorney',
              ],
            }),
          }}
        />
      </head>
      <body className={josefinSans.className}>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  )
}






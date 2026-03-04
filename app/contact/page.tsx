import ContactForm from '@/components/sections/ContactForm'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nevadalicensedefense.com'

export const metadata: Metadata = {
  title: 'Contact Us | Nevada License Defense',
  description: 'Schedule a free consultation with Nevada license defense attorney Craig K. Perry. Call 702.893.4777 or fill out our contact form. Office in Las Vegas, NV.',
  keywords: 'contact Nevada license defense, free consultation, license defense attorney Las Vegas, Craig Perry attorney',
  openGraph: {
    title: 'Contact Us | Nevada License Defense',
    description: 'Schedule a free consultation with Nevada license defense attorney Craig K. Perry. Call 702.893.4777.',
    type: 'website',
    url: `${siteUrl}/contact`,
    images: [{ url: `${siteUrl}/images/NEVADA LICENSE DEFENSE LOGO.png`, width: 1200, height: 630, alt: 'Nevada License Defense' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Nevada License Defense',
    description: 'Schedule a free consultation with Nevada license defense attorney Craig K. Perry.',
  },
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
}

export default function ContactPage() {
  return (
    <div className="section-padding bg-gray-50">
      <div className="section-container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-700">
            Reach out to us for a consultation or any inquiries.
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  )
}






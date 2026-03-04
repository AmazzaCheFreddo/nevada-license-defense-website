import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nevadalicensedefense.com'

export const metadata: Metadata = {
  title: 'How We Help Nurses | Nevada License Defense',
  description: 'Our law firm helps nurses respond to NSBN inquiries, defend against disciplinary proceedings, resolve license renewal issues, handle criminal conviction matters, and negotiate settlements.',
  keywords: 'nursing license help, NSBN defense attorney, nursing disciplinary defense, nursing license renewal help, nursing investigation defense, consent agreement negotiation',
  openGraph: {
    title: 'How We Help Nurses | Nevada License Defense',
    description: 'We specialize in protecting nurses\' licenses and responding to NSBN inquiries, investigations, and complaints.',
    type: 'website',
    url: `${siteUrl}/board-of-nursing/how-we-help`,
    images: [{ url: `${siteUrl}/images/NEVADA LICENSE DEFENSE LOGO.png`, width: 1200, height: 630, alt: 'How We Help Nurses' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How We Help Nurses | Nevada License Defense',
    description: 'We specialize in protecting nurses\' licenses before the NSBN.',
  },
  alternates: {
    canonical: `${siteUrl}/board-of-nursing/how-we-help`,
  },
}

export default function HowWeHelpPage() {
  const services = [
    {
      title: 'Responding to Letters of Inquiry',
      description: 'We help you understand and respond appropriately to letters from the NSBN.',
      image: '/images/filler images/doctor-with-medical-report.jpg',
      imageAlt: 'Reviewing medical records and documentation',
    },
    {
      title: 'Representing Nurses in Disciplinary Proceedings',
      description: 'Strong representation to protect your license and career during disciplinary proceedings.',
      image: '/images/filler images/Gemini_Generated_Image_3z7bjc3z7bjc3z7b.png',
      imageAlt: 'Nurse seeking legal representation',
    },
    {
      title: 'Assisting with License Renewal Issues',
      description: 'We help resolve license renewal problems and ensure your license remains active.',
      image: '/images/filler images/doctor-doing-their-work-pediatrics-office.jpg',
      imageAlt: 'Nurse reviewing license paperwork',
    },
    {
      title: 'Handling Criminal Conviction Matters',
      description: 'We navigate the endorsement and application process when criminal convictions affect licensure.',
      image: '/images/filler images/nurse_holding_stethoscope_works_on_computer.jpg',
      imageAlt: 'Legal documentation review',
    },
    {
      title: 'Defending Against Complaints and Investigations',
      description: 'We defend nurses against complaints and guide them through the investigation process.',
      image: '/images/filler images/nurse_holding_stethoscop.jpg',
      imageAlt: 'Nurse reviewing documentation',
    },
    {
      title: 'Negotiating Settlements and Consent Agreements',
      description: 'We negotiate favorable settlements and consent agreements on your behalf.',
      image: '/images/filler images/physician-writing-prescription-treatment-plan-help-with-recovery.jpg',
      imageAlt: 'Professional consultation meeting',
    },
    {
      title: 'Appealing Adverse Board Decisions',
      description: 'We help appeal adverse board decisions to protect your professional license.',
      image: '/images/filler images/young-doctor-reading-notes-clipboard.jpg',
      imageAlt: 'Nurse documenting information',
    },
  ]

  return (
    <div className="section-padding bg-white">
      <div className="section-container">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-dark-blue mb-6 text-center">
            How Do We Help Nurses?
          </h1>
          
          <div className="prose prose-lg max-w-none mb-12 text-center">
            <p className="text-lg text-gray-700 mb-6">
              Our law firm specializes in protecting nurses&apos; licenses and responding to 
              inquiries, investigations, and complaints from the Nevada State Board of Nursing (NSBN).
            </p>

            <p className="text-lg text-gray-700 mb-8">
              We understand the pain and stress that comes with these situations, and we&apos;re 
              here to offer solutions. Our experienced team will guide you through every step of 
              the process.
            </p>
          </div>

          <div className="space-y-8 mb-12">
            {services.map((service, index) => {
              const isEven = index % 2 === 0
              return (
                <div
                  key={index}
                  className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 items-center bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow`}
                >
                  <div className="w-full md:w-1/2 h-64 md:h-80 relative">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      className="object-cover"
                      quality={85}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                    <h2 className="text-xl font-bold text-dark-blue mb-3">{service.title}</h2>
                    <p className="text-gray-700">{service.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="bg-dark-blue text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Free Consultation</h2>
            <p className="mb-6">Schedule a free 30-45 minute consultation via Zoom to discuss your case.</p>
            <Link
              href="/contact"
              className="btn-gold inline-block"
            >
              Schedule Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}






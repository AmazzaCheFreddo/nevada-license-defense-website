import Link from 'next/link'

export default function HowWeHelpPage() {
  return (
    <div className="section-padding">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How Do We Help Nurses?
          </h1>
          
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-gray-700 mb-6">
              Our law firm specializes in protecting nurses&apos; licenses and responding to 
              inquiries, investigations, and complaints from the Nevada State Board of Nursing (NSBN).
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Services Include:</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
              <li>Responding to letters of inquiry from the NSBN</li>
              <li>Representing nurses in disciplinary proceedings</li>
              <li>Assisting with license renewal issues</li>
              <li>Handling criminal conviction matters affecting licensure</li>
              <li>Defending against complaints and investigations</li>
              <li>Negotiating settlements and consent agreements</li>
              <li>Appealing adverse board decisions</li>
            </ul>

            <p className="text-lg text-gray-700 mb-6">
              We understand the pain and stress that comes with these situations, and we&apos;re 
              here to offer solutions. Our experienced team will guide you through every step of 
              the process.
            </p>
          </div>

          <div className="bg-primary-600 text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Free Consultation</h2>
            <p className="mb-6">Schedule a free 30-45 minute consultation via Zoom to discuss your case.</p>
            <Link
              href="/contact"
              className="btn-primary bg-white text-primary-600 hover:bg-primary-50 inline-block"
            >
              Schedule Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}






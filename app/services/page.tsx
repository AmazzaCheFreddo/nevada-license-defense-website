import Link from 'next/link'
import Image from 'next/image'

export default function ServicesPage() {
  return (
    <div className="section-padding bg-white">
      <div className="section-container">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
            More Services
          </h1>
          
          <p className="text-xl text-gray-700 mb-12 text-center">
            In addition to the boards listed below, we also handle cases before other 
            professional licensing boards in Nevada.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <Image
                src="/images/filler images/vet_at_clinic.jpg"
                alt="Veterinary clinic"
                width={600}
                height={300}
                className="w-full h-80 object-cover"
                quality={85}
loading="lazy"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Board of Veterinary Examiners</h2>
                <p className="text-gray-700 mb-6">
                  We represent veterinarians and veterinary technicians facing license issues.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <Image
                src="/images/filler images/doctor_reviewing_xrays.jpg"
                alt="Doctor reviewing x-rays"
                width={600}
                height={300}
                className="w-full h-80 object-cover"
                quality={85}
loading="lazy"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">ARRT (American Registry of Radiologic Technologists)</h2>
                <p className="text-gray-700 mb-6">
                  We assist radiologic technologists with ARRT certification and disciplinary matters.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <Image
                src="/images/filler images/nurse-putting-oxygen-mask-patient_2.jpg"
                alt="Nurse with patient"
                width={600}
                height={300}
                className="w-full h-80 object-cover"
                quality={85}
loading="lazy"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Nevada State Board of Osteopathic Medicine</h2>
                <p className="text-gray-700 mb-6">
                  We represent osteopathic physicians facing license issues before the Nevada State Board of Osteopathic Medicine.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <Image
                src="/images/filler images/dental_landscape.jpg"
                alt="Dental practice"
                width={600}
                height={300}
                className="w-full h-80 object-cover"
                quality={85}
loading="lazy"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Nevada State Board of Dental Examiners</h2>
                <p className="text-gray-700 mb-6">
                  We assist dentists and dental hygienists with license defense and disciplinary matters.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <Image
                src="/images/filler images/woman-with-hands-together-talking-with-counselor.jpg"
                alt="Counseling session"
                width={600}
                height={300}
                className="w-full h-80 object-cover"
                quality={85}
loading="lazy"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">State of Nevada Board of Psychological Examiners</h2>
                <p className="text-gray-700 mb-6">
                  We represent psychologists and psychological assistants facing license issues and disciplinary actions.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <Image
                src="/images/filler images/osteopathy-patient-getting-treatment-massage (1).jpg"
                alt="Chiropractic treatment"
                width={600}
                height={300}
                className="w-full h-80 object-cover"
                quality={85}
loading="lazy"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Chiropractic Physicians' Board of Nevada</h2>
                <p className="text-gray-700 mb-6">
                  We assist chiropractic physicians with license defense and disciplinary proceedings.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <Image
                src="/images/filler images/woman-does-legs-raise-exercise-therapist-helping-with-mechanical-disorders.jpg"
                alt="Physical therapy"
                width={600}
                height={300}
                className="w-full h-80 object-cover"
                quality={85}
loading="lazy"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">State of Nevada Physical Therapy Board</h2>
                <p className="text-gray-700 mb-6">
                  We represent physical therapists and physical therapist assistants facing license issues.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Other Professional Licenses</h2>
            <p className="text-gray-700 mb-6">
              If you hold a professional license in Nevada and are facing disciplinary action 
              or license issues, we may be able to help. Contact us to discuss your specific situation.
            </p>
            <Link
              href="/contact"
              className="btn-primary inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}






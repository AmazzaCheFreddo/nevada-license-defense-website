import Link from 'next/link'
import Image from 'next/image'

export default function CommonProblemsPage() {
  const problems = [
    {
      title: 'Letters of Inquiry',
      description: 'Receiving a letter from the NSBN can be overwhelming. We help you understand the process and respond appropriately.',
      image: '/images/filler images/close-up-doctor-holding-medical-records.jpg',
      imageAlt: 'Medical records and documentation',
    },
    {
      title: 'Criminal Convictions',
      description: 'Previous criminal convictions can affect your nursing license. We help navigate the endorsement and application process.',
      image: '/images/filler images/doctor_reviewing_paperwork.jpg',
      imageAlt: 'Legal documentation review',
    },
    {
      title: 'Substance Abuse Issues',
      description: 'We assist nurses dealing with substance abuse issues and help them maintain or regain their licenses.',
      image: '/images/filler images/female_nurse_holding_hands.jpg',
      imageAlt: 'Supportive healthcare professional',
    },
    {
      title: 'Disciplinary Actions',
      description: 'Facing disciplinary action? We provide strong representation to protect your license and career.',
      image: '/images/filler images/female_nurse_on_phonecall_thinking.jpg',
      imageAlt: 'Nurse seeking legal advice',
    },
    {
      title: 'License Renewal Issues',
      description: 'Problems with license renewal? We help resolve issues and ensure your license remains active.',
      image: '/images/filler images/nurse_overlooking_paperwork.jpg',
      imageAlt: 'Nurse reviewing paperwork',
    },
    {
      title: 'Complaints and Investigations',
      description: 'We defend nurses against complaints and guide them through the investigation process.',
      image: '/images/filler images/female_nurse_reviewing_xrays.jpg',
      imageAlt: 'Nurse reviewing documentation',
    },
  ]

  return (
    <div className="section-padding bg-white">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-dark-blue mb-6">
            Common Problems Nurses Face
          </h1>
          
          <p className="text-xl text-gray-700 mb-12">
            Nurses may encounter various issues that could threaten their professional license. 
            Here are some common situations we help with:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Image
                  src={problem.image}
                  alt={problem.imageAlt}
                  width={600}
                  height={300}
                  className="w-full h-80 object-cover"
                  quality={85}
                  loading="lazy"
                />
                <div className="p-6">
                  <h2 className="text-xl font-bold text-dark-blue mb-3">{problem.title}</h2>
                <p className="text-gray-700">{problem.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-dark-blue mb-4">Don&apos;t Face These Issues Alone</h2>
            <p className="text-gray-700 mb-6">
              If you&apos;re facing any of these issues or other problems with the NSBN, 
              contact us for a free consultation. We&apos;re here to help protect your license and your career.
            </p>
            <Link
              href="/contact"
              className="btn-primary inline-block"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}






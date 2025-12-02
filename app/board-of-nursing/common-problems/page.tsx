import Link from 'next/link'

export default function CommonProblemsPage() {
  const problems = [
    {
      title: 'Letters of Inquiry',
      description: 'Receiving a letter from the NSBN can be overwhelming. We help you understand the process and respond appropriately.',
    },
    {
      title: 'Criminal Convictions',
      description: 'Previous criminal convictions can affect your nursing license. We help navigate the endorsement and application process.',
    },
    {
      title: 'Substance Abuse Issues',
      description: 'We assist nurses dealing with substance abuse issues and help them maintain or regain their licenses.',
    },
    {
      title: 'Disciplinary Actions',
      description: 'Facing disciplinary action? We provide strong representation to protect your license and career.',
    },
    {
      title: 'License Renewal Issues',
      description: 'Problems with license renewal? We help resolve issues and ensure your license remains active.',
    },
    {
      title: 'Complaints and Investigations',
      description: 'We defend nurses against complaints and guide them through the investigation process.',
    },
  ]

  return (
    <div className="section-padding">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
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
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-3">{problem.title}</h2>
                <p className="text-gray-700">{problem.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-primary-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Don&apos;t Face These Issues Alone</h2>
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






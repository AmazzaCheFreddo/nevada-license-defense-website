export default function VideosPage() {
  return (
    <div className="section-padding">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Informational Videos for Nurses
          </h1>
          
          <p className="text-xl text-gray-700 mb-12">
            Educational videos to help nurses understand the license defense process and 
            what to expect when dealing with the Nevada State Board of Nursing.
          </p>

          <div className="bg-gray-50 p-12 rounded-lg text-center">
            <p className="text-lg text-gray-600 mb-6">
              Video content coming soon. Check back for educational videos about:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-left max-w-md mx-auto">
              <li>Understanding letters of inquiry</li>
              <li>The disciplinary process</li>
              <li>How to respond to complaints</li>
              <li>License renewal procedures</li>
              <li>What to expect during an investigation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}






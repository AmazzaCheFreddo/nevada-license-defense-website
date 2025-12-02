export default function PrivacyPolicyPage() {
  return (
    <div className="section-padding">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>
            <p className="text-gray-700 mb-6">
              We collect information that you provide directly to us, such as when you fill out 
              a contact form, schedule a consultation, or communicate with us.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 mb-6">
              We use the information we collect to respond to your inquiries, provide legal services, 
              and communicate with you about our services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-6">
              If you have questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:info@craigperry.com" className="text-primary-600 hover:text-primary-700">
                info@craigperry.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}






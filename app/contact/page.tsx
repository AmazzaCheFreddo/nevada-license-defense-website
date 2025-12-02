import ContactForm from '@/components/sections/ContactForm'

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






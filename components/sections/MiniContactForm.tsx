'use client'

import { useState } from 'react'

export default function MiniContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-dark-blue rounded-lg shadow-lg p-6 text-white sticky top-24">
      <h3 className="text-2xl font-bold mb-4">Get Help Now</h3>
      
      {/* Call Now Button */}
      <a
        href="tel:7028934777"
        className="flex items-center justify-center gap-2 bg-light-gold text-dark-blue px-4 py-3 rounded-lg font-bold hover:bg-dark-gold transition-all duration-300 mb-6 w-full"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        Call Now: 702.893.4777
      </a>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg text-dark-blue placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-light-gold"
          />
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg text-dark-blue placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-light-gold"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg text-dark-blue placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-light-gold"
          />
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg text-dark-blue placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-light-gold"
          />
        </div>
        <div>
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 rounded-lg text-dark-blue placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-light-gold resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-light-gold text-dark-blue px-4 py-3 rounded-lg font-bold hover:bg-dark-gold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
        
        {submitStatus === 'success' && (
          <p className="text-sm text-green-300 text-center">Message sent successfully!</p>
        )}
        {submitStatus === 'error' && (
          <p className="text-sm text-red-300 text-center">Error sending message. Please try again.</p>
        )}
      </form>
    </div>
  )
}


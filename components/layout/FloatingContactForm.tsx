'use client'

import { useState } from 'react'

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits.length === 0) return ''
  if (digits.length <= 3) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  message?: string
}

export default function FloatingContactForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Required'
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'At least 2 characters'
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Required'
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'At least 2 characters'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Required'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Invalid email'
      }
    }

    // Phone validation (optional but validate format if provided)
    if (formData.phone.trim()) {
      const digits = formData.phone.replace(/\D/g, '')
      if (digits.length < 10) {
        newErrors.phone = 'Enter a complete 10-digit number'
      }
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'At least 10 characters'
    } else if (formData.message.trim().length > 2000) {
      newErrors.message = 'Max 2000 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: name === 'phone' ? formatPhoneNumber(value) : value,
    })

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      })
    }

    // Clear general error message when user starts typing
    if (errorMessage) {
      setErrorMessage('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setErrorMessage('')
    
    // Validate form before submission
    if (!validateForm()) {
      return
    }

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

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
        })
        setErrors({})
        // Auto-close after 3 seconds on success
        setTimeout(() => {
          setIsOpen(false)
          setSubmitStatus('idle')
        }, 3000)
      } else {
        const errorMsg = data.details ? `${data.error}: ${data.details}` : data.error || 'Failed to send message'
        setErrorMessage(errorMsg)
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrorMessage('Network error. Please try again.')
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed right-6 bottom-6 z-[100] bg-dark-blue text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl hover:bg-opacity-90 transition-all duration-300 flex items-center gap-3 group animate-fade-in"
          aria-label="Open contact form"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="font-bold hidden sm:inline">Contact Us</span>
          <span className="font-bold sm:hidden">Contact</span>
        </button>
      )}

      {/* Floating Form Panel */}
      {isOpen && (
        <div className="fixed right-6 bottom-6 z-[100] w-full max-w-md bg-white rounded-lg shadow-2xl border border-gray-200 animate-scale-in">
          <div className="bg-dark-blue text-white p-4 rounded-t-lg flex items-center justify-between">
            <h3 className="text-xl font-bold">Get In Touch</h3>
            <button
              onClick={() => {
                setIsOpen(false)
                setSubmitStatus('idle')
              }}
              className="text-white hover:text-light-gold transition-colors"
              aria-label="Close contact form"
            >
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3">
            <div>
              <label htmlFor="floating-firstName" className="block text-sm font-semibold text-dark-blue mb-1">
                First Name *
              </label>
              <input
                type="text"
                id="floating-firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue focus:border-transparent ${
                  errors.firstName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={errors.firstName ? 'true' : 'false'}
                aria-describedby={errors.firstName ? 'floating-firstName-error' : undefined}
              />
              {errors.firstName && (
                <p id="floating-firstName-error" className="mt-0.5 text-xs text-red-600" role="alert">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="floating-lastName" className="block text-sm font-semibold text-dark-blue mb-1">
                Last Name *
              </label>
              <input
                type="text"
                id="floating-lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue focus:border-transparent ${
                  errors.lastName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={errors.lastName ? 'true' : 'false'}
                aria-describedby={errors.lastName ? 'floating-lastName-error' : undefined}
              />
              {errors.lastName && (
                <p id="floating-lastName-error" className="mt-0.5 text-xs text-red-600" role="alert">
                  {errors.lastName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="floating-email" className="block text-sm font-semibold text-dark-blue mb-1">
                Email *
              </label>
              <input
                type="email"
                id="floating-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue focus:border-transparent ${
                  errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'floating-email-error' : undefined}
              />
              {errors.email && (
                <p id="floating-email-error" className="mt-0.5 text-xs text-red-600" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="floating-phone" className="block text-sm font-semibold text-dark-blue mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="floating-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(702) 555-1234"
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue focus:border-transparent ${
                  errors.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={errors.phone ? 'true' : 'false'}
                aria-describedby={errors.phone ? 'floating-phone-error' : undefined}
              />
              {errors.phone && (
                <p id="floating-phone-error" className="mt-0.5 text-xs text-red-600" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="floating-message" className="block text-sm font-semibold text-dark-blue mb-1">
                Message *
              </label>
              <textarea
                id="floating-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={3}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue focus:border-transparent resize-none ${
                  errors.message ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'floating-message-error' : undefined}
              />
              <div className="flex justify-between items-center mt-0.5">
                {errors.message && (
                  <p id="floating-message-error" className="text-xs text-red-600" role="alert">
                    {errors.message}
                  </p>
                )}
                <p className={`text-xs ml-auto ${formData.message.length > 2000 ? 'text-red-600' : 'text-gray-500'}`}>
                  {formData.message.length}/2000
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-dark-blue text-white px-4 py-2.5 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded text-xs flex items-start gap-2" role="alert">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold">Message sent successfully!</p>
                  <p className="text-xs mt-0.5">We&apos;ll contact you soon.</p>
                </div>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-xs flex items-start gap-2" role="alert">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold">Error sending message</p>
                  <p className="text-xs mt-0.5">{errorMessage || 'Please try again or call us directly.'}</p>
                </div>
              </div>
            )}

            {/* Call Now Button */}
            <div className="pt-3 border-t border-gray-200">
              <a
                href="tel:7028934777"
                className="flex items-center justify-center gap-2 bg-light-gold text-dark-blue px-4 py-2.5 rounded-lg font-bold hover:bg-dark-gold hover:text-white transition-all duration-300 w-full text-sm"
              >
                <svg
                  className="w-4 h-4"
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
            </div>
          </form>
        </div>
      )}
    </>
  )
}


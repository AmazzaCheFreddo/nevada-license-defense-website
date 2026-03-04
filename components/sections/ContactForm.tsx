'use client'

import { useState } from 'react'
import Image from 'next/image'

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

export default function ContactForm() {
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
      newErrors.firstName = 'First name is required'
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters'
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address'
      }
    }

    // Phone validation (optional but validate format if provided)
    if (formData.phone.trim()) {
      const digits = formData.phone.replace(/\D/g, '')
      if (digits.length < 10) {
        newErrors.phone = 'Please enter a complete 10-digit phone number'
      }
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    } else if (formData.message.trim().length > 2000) {
      newErrors.message = 'Message must be less than 2000 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
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

      if (!response.ok) {
        const errorMsg = data.details ? `${data.error}: ${data.details}` : data.error || 'Failed to send message'
        setErrorMessage(errorMsg)
        throw new Error(errorMsg)
      }

      setSubmitStatus('success')
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' })
      setErrors({})
      
      // Scroll to success message
      setTimeout(() => {
        const successElement = document.querySelector('[data-success-message]')
        if (successElement) {
          successElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }
      }, 100)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      if (!errorMessage) {
        setErrorMessage('There was an error submitting your form. Please try again or call us directly.')
      }
    } finally {
      setIsSubmitting(false)
    }
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

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="max-w-5xl mx-auto">
          {/* Contact Info - Above */}
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-blue mb-6">
              Let Us Help You
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              Whether it&apos;s talking on the phone or doing a video conference call, 
              the initial consultation is <em>always</em> free. Plan on about 30 to 45 minutes—we are very thorough!
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div>
                <h3 className="font-bold text-dark-blue mb-2">Schedule An Appointment</h3>
                <p className="text-gray-600">
                  Free consultations via Zoom. We&apos;re here to help protect your professional license.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-dark-blue mb-2">Contact Information</h3>
                <p className="text-gray-600">
                  <a href="tel:7028934777" className="text-dark-gold hover:text-brown font-semibold transition-all duration-300 ease-in-out">
                    702.893.4777
                  </a>
                </p>
                <p className="text-gray-600">
                  <a href="mailto:info@craigperry.com" className="text-dark-gold hover:text-brown font-semibold transition-all duration-300 ease-in-out">
                    info@craigperry.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Image and Form - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Attorney Image - Left */}
            <div className="animate-slide-in-left flex items-center">
              <Image
                src="/images/craig_blue_arms_crossed.jpg"
                alt="Attorney Craig K. Perry"
                width={500}
                height={600}
                className="w-full h-auto rounded-lg object-cover"
                quality={85}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Contact Form - Right */}
            <div className="animate-slide-in-right">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-bold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-light-gold focus:border-light-gold transition-all duration-300 ease-in-out ${
                        errors.firstName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                      }`}
                      aria-invalid={errors.firstName ? 'true' : 'false'}
                      aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                    />
                    {errors.firstName && (
                      <p id="firstName-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-bold text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-light-gold focus:border-light-gold transition-all duration-300 ease-in-out ${
                        errors.lastName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                      }`}
                      aria-invalid={errors.lastName ? 'true' : 'false'}
                      aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                    />
                    {errors.lastName && (
                      <p id="lastName-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-light-gold focus:border-light-gold transition-all duration-300 ease-in-out ${
                      errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                    }`}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(702) 555-1234"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-light-gold focus:border-light-gold transition-all duration-300 ease-in-out ${
                      errors.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                    }`}
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-light-gold focus:border-light-gold resize-none transition-all duration-300 ease-in-out ${
                      errors.message ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                    }`}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.message && (
                      <p id="message-error" className="text-sm text-red-600" role="alert">
                        {errors.message}
                      </p>
                    )}
                    <p className={`text-xs ml-auto ${formData.message.length > 2000 ? 'text-red-600' : 'text-gray-500'}`}>
                      {formData.message.length}/2000 characters
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>

                {submitStatus === 'success' && (
                  <div 
                    data-success-message
                    className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 animate-fade-in"
                    role="alert"
                  >
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="font-semibold">Thank you for contacting us!</p>
                        <p className="text-sm mt-1">We&apos;ll contact you soon to schedule a consultation.</p>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div 
                    className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 animate-fade-in"
                    role="alert"
                  >
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="font-semibold">Error submitting form</p>
                        <p className="text-sm mt-1">{errorMessage || 'There was an error submitting your form. Please try again or call us directly.'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </form>

              <p className="mt-6 text-sm text-gray-600">
                If you prefer, drop us a note, and we will contact you to schedule a mutually 
                convenient time to talk.
              </p>
            </div>
          </div>

          {/* Location Information */}
          <div className="mt-12 animate-fade-in">
            <h3 className="text-2xl font-bold text-dark-blue mb-6 text-center">Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <h4 className="text-lg font-bold text-dark-blue mb-3">Address</h4>
                <p className="text-gray-700">
                  2300 West Sahara Avenue<br />
                  Suite 800<br />
                  Las Vegas, Nevada 89102
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-bold text-dark-blue mb-3">Working Hours</h4>
                <p className="text-gray-700">
                  Mon-Thurs. 9:00 am to 5:00 pm<br />
                  Fri. 8:00 am to 11:00 am
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
        </section>
      )
    }






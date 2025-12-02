'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

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

      const data = await response.json()

      if (!response.ok) {
        const errorMsg = data.details ? `${data.error}: ${data.details}` : data.error || 'Failed to send message'
        throw new Error(errorMsg)
      }

      setSubmitStatus('success')
      setFormData({ firstName: '', lastName: '', email: '', message: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
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
              the initial consultation is free. Plan on about 30 to 45 minutes—we are very thorough!
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-light-gold focus:border-light-gold transition-all duration-300 ease-in-out"
                    />
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-light-gold focus:border-light-gold transition-all duration-300 ease-in-out"
                    />
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-light-gold focus:border-light-gold transition-all duration-300 ease-in-out"
                  />
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-light-gold focus:border-light-gold resize-none transition-all duration-300 ease-in-out"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                    Thank you! We&apos;ll contact you soon to schedule a consultation.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    There was an error submitting your form. Please try again or call us directly.
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






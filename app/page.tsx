import dynamic from 'next/dynamic'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import About from '@/components/sections/About'

// Lazy load below-the-fold components
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), {
  loading: () => <div className="section-padding bg-gray-50"><div className="section-container"><div className="text-center py-12">Loading reviews...</div></div></div>,
})

const CTA = dynamic(() => import('@/components/sections/CTA'), {
  loading: () => null,
})

const ContactForm = dynamic(() => import('@/components/sections/ContactForm'), {
  loading: () => <div className="section-padding bg-white"><div className="section-container"><div className="text-center py-12">Loading contact form...</div></div></div>,
})

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <CTA />
      <ContactForm />
    </>
  )
}






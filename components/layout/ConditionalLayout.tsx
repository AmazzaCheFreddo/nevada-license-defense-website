'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import FloatingContactForm from './FloatingContactForm'

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')
  const isContactPage = pathname === '/contact'
  
  // Show floating form on all pages except contact page and admin routes
  const showFloatingForm = !isAdminRoute && !isContactPage

  return (
    <>
      {!isAdminRoute && <Header />}
      <main className="min-h-screen">
        {children}
      </main>
      {!isAdminRoute && <Footer />}
      {showFloatingForm && <FloatingContactForm />}
    </>
  )
}


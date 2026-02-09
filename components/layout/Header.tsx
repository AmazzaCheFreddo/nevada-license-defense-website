'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Board of Nursing',
    href: '/board-of-nursing/nevada-state-board-of-nursing',
    submenu: [
      { name: 'Nevada State Board of Nursing', href: '/board-of-nursing/nevada-state-board-of-nursing' },
      { name: 'How Do We Help Nurses?', href: '/board-of-nursing/how-we-help' },
      { name: 'Common Problems', href: '/board-of-nursing/common-problems' },
      { name: 'Informational Videos for Nurses', href: '/board-of-nursing/videos' },
    ],
  },
  { name: 'Board of Pharmacy', href: '/board-of-pharmacy' },
  { name: 'Board of Medical Examiners', href: '/board-of-medical-examiners' },
  { name: 'More Services', href: '/services' },
  { name: 'Articles', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const isOutside = Object.values(dropdownRefs.current).every(
        (ref) => ref && !ref.contains(target)
      )
      
      if (isOutside && activeSubmenu) {
        setActiveSubmenu(null)
      }
    }

    if (activeSubmenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activeSubmenu])

  const toggleSubmenu = (itemName: string) => {
    setActiveSubmenu(activeSubmenu === itemName ? null : itemName)
  }

  return (
    <>
      <header className="bg-white animate-fade-in">
        <nav className="section-container">
        {/* Top section: Logo centered */}
        <div className="flex items-center justify-between py-4">
          {/* Logo - Note: Dark blue cannot be used as background behind logo */}
          <div className="flex-1"></div>
          <Link href="/" className="flex items-center justify-center flex-1">
            <Image
              src="/images/NEVADA LICENSE DEFENSE LOGO.png"
              alt="Nevada License Defense Logo"
              width={400}
              height={120}
              priority
              quality={95}
              className="h-20 md:h-24 lg:h-28 w-auto"
              sizes="(max-width: 768px) 200px, (max-width: 1024px) 300px, 400px"
            />
          </Link>
          
          {/* Mobile menu button */}
          <div className="flex-1 flex justify-end">
            <button
              className="lg:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
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
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>


        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            {/* Mobile Call Button */}
            <a
              href="tel:7028934777"
              className="flex items-center justify-center gap-2 bg-dark-blue text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-300 shadow-md mb-4 mx-4"
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
              <span>702.893.4777</span>
            </a>
            
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block py-3 text-gray-700 hover:text-dark-blue font-bold transition-all duration-300 ease-in-out text-center"
                  onClick={() => {
                    if (!item.submenu) setMobileMenuOpen(false)
                    else setActiveSubmenu(activeSubmenu === item.name ? null : item.name)
                  }}
                >
                  {item.name}
                  {item.submenu && (
                    <span className="ml-2 text-light-gold">
                      {activeSubmenu === item.name ? '−' : '+'}
                    </span>
                  )}
                </Link>
                {item.submenu && activeSubmenu === item.name && (
                  <div className="pb-2 animate-slide-up">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        href={subitem.href}
                        className="block py-2 text-gray-600 hover:text-dark-blue hover:font-bold transition-all duration-300 ease-in-out text-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>
    </header>
    
    {/* Sticky Navigation Bar - Separate from header */}
    <div className="hidden lg:block bg-white border-t border-gray-200 sticky top-0 z-[99]">
      <div className="section-container relative">
        <div className="flex items-center justify-center flex-nowrap space-x-4 xl:space-x-6 py-4">
          {navigation.map((item) => (
            <div
              key={item.name}
              className="relative flex-shrink-0"
              ref={(el) => {
                if (item.submenu) {
                  dropdownRefs.current[item.name] = el
                }
              }}
            >
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className="text-gray-700 hover:text-dark-blue font-bold transition-all duration-300 ease-in-out relative group flex items-center uppercase text-sm whitespace-nowrap"
                  >
                    {item.name}
                    <svg
                      className={`w-4 h-4 ml-1 transform transition-transform duration-300 flex-shrink-0 ${
                        activeSubmenu === item.name ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-light-gold group-hover:w-full transition-all duration-300 ease-in-out"></span>
                  </button>
                    {activeSubmenu === item.name && (
                      <div className="absolute left-0 top-full mt-2 w-auto min-w-max bg-white rounded-lg shadow-xl border border-gray-200 py-2 animate-scale-in z-[9999]">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-light-gold hover:text-dark-blue transition-all duration-300 ease-in-out font-semibold whitespace-nowrap"
                          onClick={() => setActiveSubmenu(null)}
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-dark-blue font-bold transition-all duration-300 ease-in-out relative group uppercase text-sm whitespace-nowrap"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-light-gold group-hover:w-full transition-all duration-300 ease-in-out"></span>
                </Link>
              )}
            </div>
          ))}
          
          {/* Call button - After Contact */}
          <a
            href="tel:7028934777"
            className="flex items-center gap-2 bg-dark-blue text-white px-4 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-300 ml-4 flex-shrink-0 whitespace-nowrap"
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>702.893.4777</span>
          </a>
        </div>
      </div>
    </div>
    </>
  )
}






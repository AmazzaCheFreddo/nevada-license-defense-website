import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-dark-blue text-gray-300">
      <div className="section-container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div className="animate-fade-in">
            <h3 className="text-white text-lg font-bold mb-4">Nevada License Defense</h3>
            <p className="text-sm">
              We are a dedicated law firm focused on protecting professional licenses in Nevada. 
              Our team of experienced professionals is committed to providing the highest level 
              of representation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in delay-100">
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/board-of-nursing/nevada-state-board-of-nursing" className="hover:text-light-gold transition-all duration-300 ease-in-out font-semibold">
                  Board of Nursing
                </Link>
              </li>
              <li>
                <Link href="/board-of-pharmacy" className="hover:text-light-gold transition-all duration-300 ease-in-out font-semibold">
                  Board of Pharmacy
                </Link>
              </li>
              <li>
                <Link href="/board-of-medical-examiners" className="hover:text-light-gold transition-all duration-300 ease-in-out font-semibold">
                  Board of Medical Examiners
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-light-gold transition-all duration-300 ease-in-out font-semibold">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-light-gold transition-all duration-300 ease-in-out font-semibold">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in delay-200">
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <div className="space-y-2 text-sm">
              <p>
                <a href="tel:7028934777" className="hover:text-light-gold transition-all duration-300 ease-in-out font-semibold">
                  702.893.4777
                </a>
              </p>
              <p>
                <a href="mailto:info@craigperry.com" className="hover:text-light-gold transition-all duration-300 ease-in-out font-semibold">
                  info@craigperry.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {new Date().getFullYear()} Nevada License Defense. All rights reserved.</p>
            <Link href="/privacy-policy" className="mt-4 md:mt-0 hover:text-light-gold transition-all duration-300 ease-in-out font-semibold">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}






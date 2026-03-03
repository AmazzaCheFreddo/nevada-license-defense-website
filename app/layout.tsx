import type { Metadata } from 'next'
import { Josefin_Sans } from 'next/font/google'
import './globals.css'
import ConditionalLayout from '@/components/layout/ConditionalLayout'

const josefinSans = Josefin_Sans({ 
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-josefin-sans',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Nevada License Defense | Professional License Defense Attorney',
  description: 'Licensed Nevada Attorney Craig K. Perry defends professional licenses before various Nevada State Boards including Nursing, Pharmacy, and Medical Examiners.',
  keywords: 'Nevada license defense, nursing license defense, pharmacy license defense, medical license defense, professional license attorney',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://nevadalicensedefense.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload hero mountain images so they're ready before the rise animation */}
        <link rel="preload" href="/images/mountain_midground.png" as="image" />
        <link rel="preload" href="/images/mountain_foreground.png" as="image" />
      </head>
      <body className={josefinSans.className}>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  )
}






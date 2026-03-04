import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nevadalicensedefense.com'

export const metadata: Metadata = {
  title: 'Nevada Board of Medical Examiners Defense | Nevada License Defense',
  description: 'Defense against Nevada State Board of Medical Examiners disciplinary actions including malpractice, disruptive behavior, substance abuse, and license violations under NRS 630.',
  keywords: 'Nevada Board of Medical Examiners, medical license defense, NRS 630, physician disciplinary action, medical malpractice defense, doctor license defense Nevada',
  openGraph: {
    title: 'Nevada Board of Medical Examiners Defense | Nevada License Defense',
    description: 'Defense against Nevada Board of Medical Examiners disciplinary actions. Free consultation available.',
    type: 'website',
    url: `${siteUrl}/board-of-medical-examiners`,
    images: [{ url: `${siteUrl}/images/NEVADA LICENSE DEFENSE LOGO.png`, width: 1200, height: 630, alt: 'Nevada Board of Medical Examiners Defense' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nevada Board of Medical Examiners Defense | Nevada License Defense',
    description: 'Defense against Nevada Board of Medical Examiners disciplinary actions.',
  },
  alternates: {
    canonical: `${siteUrl}/board-of-medical-examiners`,
  },
}

export default function BoardOfMedicalExaminersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

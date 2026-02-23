import { getAllPosts, getAllTags } from '@/lib/blog'
import BlogSearch from '@/components/blog/BlogSearch'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nevadalicensedefense.com'
const blogUrl = `${siteUrl}/blog`
const defaultOgImage = `${siteUrl}/images/NEVADA LICENSE DEFENSE LOGO.png`

export const metadata = {
  title: 'Articles | Nevada License Defense',
  description: 'Stay informed about professional license defense in Nevada. Read our latest articles on board procedures, legal updates, and license defense strategies.',
  keywords: [
    'Nevada license defense',
    'professional license defense Nevada',
    'Nevada license defense attorney',
    'board procedures',
    'license defense strategies',
    'Nevada State Board of Nursing',
    'Nevada Board of Pharmacy',
    'Nevada Board of Medical Examiners',
  ],
  openGraph: {
    title: 'Articles | Nevada License Defense',
    description: 'Stay informed about professional license defense in Nevada. Read our latest articles on board procedures, legal updates, and license defense strategies.',
    type: 'website',
    url: blogUrl,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: 'Nevada License Defense - Professional License Defense Articles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Articles | Nevada License Defense',
    description: 'Stay informed about professional license defense in Nevada.',
    images: [defaultOgImage],
  },
  alternates: {
    canonical: blogUrl,
  },
}

export default function BlogPage() {
  const posts = getAllPosts()
  const allTags = getAllTags(posts)

  return (
    <div className="section-padding bg-white">
      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-dark-blue mb-4">
              Articles
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Stay informed about professional license defense in Nevada.
              Read our latest articles on board procedures, legal updates, and license defense strategies.
            </p>
          </div>

          <BlogSearch posts={posts} allTags={allTags} />
        </div>
      </div>
    </div>
  )
}

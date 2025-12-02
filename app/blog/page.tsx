import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/blog'
import { format } from 'date-fns'

export const metadata = {
  title: 'Blog | Nevada License Defense',
  description: 'Stay informed about professional license defense in Nevada. Read our latest articles on board procedures, legal updates, and license defense strategies.',
  openGraph: {
    title: 'Blog | Nevada License Defense',
    description: 'Stay informed about professional license defense in Nevada.',
    type: 'website',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="section-padding bg-white">
      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-dark-blue mb-4">
              Blog
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Stay informed about professional license defense in Nevada. 
              Read our latest articles on board procedures, legal updates, and license defense strategies.
            </p>
          </div>

          {/* Blog Posts Grid */}
          {posts.length === 0 ? (
            <div className="bg-gray-50 p-12 rounded-lg text-center">
              <p className="text-lg text-gray-600">
                Blog posts coming soon. Check back for updates on professional license defense, 
                board procedures, and legal updates.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  {post.image && (
                    <Link href={`/blog/${post.slug}`} className="block relative h-48 w-full">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </Link>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-2">
                      <time
                        dateTime={post.date}
                        className="text-sm text-gray-500"
                      >
                        {format(new Date(post.date), 'MMMM d, yyyy')}
                      </time>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="text-2xl font-bold text-dark-blue mb-3 hover:text-dark-gold transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                    {post.excerpt && (
                      <p className="text-gray-700 mb-4 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-light-gold text-dark-blue px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-dark-blue font-semibold hover:text-dark-gold transition-colors inline-flex items-center mt-auto"
                    >
                      Read More
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

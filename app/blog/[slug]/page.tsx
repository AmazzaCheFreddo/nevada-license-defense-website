import { notFound } from 'next/navigation'
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found | Nevada License Defense',
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nevadalicensedefense.com'
  const imageUrl = post.image ? `${siteUrl}${post.image}` : `${siteUrl}/images/NEVADA LICENSE DEFENSE LOGO.png`

  return {
    title: `${post.title} | Nevada License Defense Blog`,
    description: post.excerpt || `Read about ${post.title} on the Nevada License Defense blog.`,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || '',
      images: [imageUrl],
    },
    alternates: {
      canonical: `${siteUrl}/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Check if content is HTML (from rich text editor) or Markdown (legacy)
  const isHTML = post.content.trim().startsWith('<')
  
  let contentHtml: string
  if (isHTML) {
    // Content is already HTML from rich text editor
    // Add some basic styling classes to match the design
    contentHtml = post.content
      .replace(/<h1>/g, '<h1 class="text-3xl font-bold text-dark-blue mt-8 mb-4">')
      .replace(/<h2>/g, '<h2 class="text-2xl font-bold text-dark-blue mt-6 mb-3">')
      .replace(/<h3>/g, '<h3 class="text-xl font-bold text-dark-blue mt-4 mb-2">')
      .replace(/<h4>/g, '<h4 class="text-lg font-bold text-dark-blue mt-4 mb-2">')
      .replace(/<h5>/g, '<h5 class="text-base font-bold text-dark-blue mt-3 mb-2">')
      .replace(/<h6>/g, '<h6 class="text-sm font-bold text-dark-blue mt-3 mb-2">')
      .replace(/<p>/g, '<p class="text-gray-700 mb-4 leading-relaxed">')
      .replace(/<a href="([^"]*)"([^>]*)>/g, '<a href="$1" class="text-dark-blue hover:text-dark-gold underline font-semibold"$2>')
      .replace(/<strong>/g, '<strong class="font-bold text-dark-blue">')
      .replace(/<ul>/g, '<ul class="list-disc list-inside mb-4 text-gray-700 space-y-2">')
      .replace(/<ol>/g, '<ol class="list-decimal list-inside mb-4 text-gray-700 space-y-2">')
      .replace(/<li>/g, '<li class="ml-4">')
      .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-dark-gold pl-4 italic text-gray-600 my-4">')
  } else {
    // Legacy markdown content - convert to HTML
    contentHtml = post.content
      .split('\n\n')
      .map((paragraph) => {
        if (!paragraph.trim()) return ''
        
        // Headers
        if (paragraph.startsWith('# ')) {
          return `<h1 class="text-3xl font-bold text-dark-blue mt-8 mb-4">${paragraph.substring(2).trim()}</h1>`
        }
        if (paragraph.startsWith('## ')) {
          return `<h2 class="text-2xl font-bold text-dark-blue mt-6 mb-3">${paragraph.substring(3).trim()}</h2>`
        }
        if (paragraph.startsWith('### ')) {
          return `<h3 class="text-xl font-bold text-dark-blue mt-4 mb-2">${paragraph.substring(4).trim()}</h3>`
        }
        
        // Process inline formatting
        let processed = paragraph
        // Bold
        processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-dark-blue">$1</strong>')
        // Links
        processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-dark-blue hover:text-dark-gold underline font-semibold">$1</a>')
        // Italic
        processed = processed.replace(/\*(.*?)\*/g, '<em>$1</em>')
        
        return `<p class="text-gray-700 mb-4 leading-relaxed">${processed}</p>`
      })
      .filter(Boolean)
      .join('\n')
  }

  return (
    <article className="section-padding bg-white">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Back to Blog */}
          <Link
            href="/blog"
            className="inline-flex items-center text-dark-blue hover:text-dark-gold mb-6 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-8">
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-light-gold text-dark-blue px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-dark-blue mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-600">
              <time dateTime={post.date} className="text-sm">
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </time>
              <span className="text-gray-300">•</span>
              <span className="text-sm">By {post.author}</span>
            </div>
          </header>

          {/* Featured Image */}
          {post.image && (
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-dark-blue prose-a:text-dark-blue prose-a:no-underline hover:prose-a:text-dark-gold prose-strong:text-dark-blue"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Structured Data for SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: post.title,
                image: post.image ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nevadalicensedefense.com'}${post.image}` : undefined,
                datePublished: post.date,
                dateModified: post.date,
                author: {
                  '@type': 'Person',
                  name: post.author,
                },
                publisher: {
                  '@type': 'Organization',
                  name: 'Nevada License Defense',
                  logo: {
                    '@type': 'ImageObject',
                    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nevadalicensedefense.com'}/images/NEVADA LICENSE DEFENSE LOGO.png`,
                  },
                },
                description: post.excerpt,
                mainEntityOfPage: {
                  '@type': 'WebPage',
                  '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nevadalicensedefense.com'}/blog/${slug}`,
                },
              }),
            }}
          />

          {/* Author Bio / CTA */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-xl font-bold text-dark-blue mb-4">
              Need Help with Your Professional License?
            </h3>
            <p className="text-gray-700 mb-4">
              If you&apos;re facing a license issue in Nevada, don&apos;t wait. Contact our experienced 
              license defense attorneys for a free consultation.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-dark-blue text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-300"
            >
              Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}


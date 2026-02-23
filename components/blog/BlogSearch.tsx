'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import type { BlogPost } from '@/lib/blog'
import MiniContactForm from '@/components/sections/MiniContactForm'

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function matchesText(post: BlogPost, query: string): boolean {
  if (!query.trim()) return true
  const q = query.trim().toLowerCase()
  const inTitle = post.title.toLowerCase().includes(q)
  const inExcerpt = (post.excerpt || '').toLowerCase().includes(q)
  const inTags = (post.tags ?? []).some((t) => t.toLowerCase().includes(q))
  const inContent = stripHtml(post.content || '').toLowerCase().includes(q)
  return inTitle || inExcerpt || inTags || inContent
}

function matchesTags(post: BlogPost, selectedTags: string[]): boolean {
  if (selectedTags.length === 0) return true
  const postTagsLower = new Set((post.tags ?? []).map((t) => t.toLowerCase()))
  return selectedTags.some((t) => postTagsLower.has(t.toLowerCase()))
}

interface BlogSearchProps {
  posts: BlogPost[]
  allTags: string[]
}

export default function BlogSearch({ posts, allTags }: BlogSearchProps) {
  const [textQuery, setTextQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const filteredPosts = useMemo(() => {
    return posts.filter(
      (post) => matchesText(post, textQuery) && matchesTags(post, selectedTags)
    )
  }, [posts, textQuery, selectedTags])

  const toggleTag = (tag: string) => {
    const tagLower = tag.toLowerCase()
    setSelectedTags((prev) => {
      const idx = prev.findIndex((t) => t.toLowerCase() === tagLower)
      if (idx >= 0) return prev.filter((_, i) => i !== idx)
      return [...prev, tag]
    })
  }

  const clearFilters = () => {
    setTextQuery('')
    setSelectedTags([])
  }

  const hasActiveFilters = textQuery.trim() !== '' || selectedTags.length > 0

  if (posts.length === 0) {
    return (
      <div className="bg-gray-50 p-12 rounded-lg text-center">
        <p className="text-lg text-gray-600">
          Articles coming soon. Check back for updates on professional license
          defense, board procedures, and legal updates.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Search and filters */}
      <div className="mb-10 space-y-4">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="search"
            placeholder="Search articles by keyword..."
            value={textQuery}
            onChange={(e) => setTextQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:border-dark-blue focus:outline-none focus:ring-2 focus:ring-dark-blue/20"
            aria-label="Search articles"
          />
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Filter by tag:</span>
            {allTags.map((tag) => {
              const isSelected = selectedTags.includes(tag)
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    isSelected
                      ? 'bg-dark-blue text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        )}

        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Showing {filteredPosts.length} of {posts.length} article
              {posts.length !== 1 ? 's' : ''}
            </span>
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-medium text-dark-blue hover:text-dark-gold"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Results grid */}
      {filteredPosts.length === 0 ? (
        <div className="bg-gray-50 p-12 rounded-lg text-center">
          <p className="text-lg text-gray-600">
            No articles match your search. Try different keywords or tags.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 text-dark-blue font-semibold hover:text-dark-gold"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
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

          {filteredPosts.length > 2 && (
            <div key="contact-form" className="md:col-span-2 lg:col-span-1">
              <MiniContactForm />
            </div>
          )}
        </div>
      )}
    </>
  )
}

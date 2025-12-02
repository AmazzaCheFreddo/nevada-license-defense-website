'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import RichTextEditor from './RichTextEditor'

interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  image?: string
  tags?: string[]
  content?: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingSlug, setEditingSlug] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loadingPosts, setLoadingPosts] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/posts/list')
      if (response.ok) {
        const data = await response.json()
        setPosts(data.posts)
      }
    } catch (err) {
      console.error('Failed to fetch posts:', err)
    } finally {
      setLoadingPosts(false)
    }
  }

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    date: new Date().toISOString().split('T')[0],
    author: 'Craig K. Perry',
    excerpt: '',
    image: '',
    tags: '',
    content: '',
  })

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      date: new Date().toISOString().split('T')[0],
      author: 'Craig K. Perry',
      excerpt: '',
      image: '',
      tags: '',
      content: '',
    })
    setEditingSlug(null)
  }

  const handleEdit = async (slug: string) => {
    try {
      setLoading(true)
      setError('')
      const response = await fetch(`/api/admin/posts/${slug}`)
      
      if (response.ok) {
        const data = await response.json()
        const post = data.post
        
        setFormData({
          title: post.title || '',
          slug: post.slug || '',
          date: post.date || new Date().toISOString().split('T')[0],
          author: post.author || 'Craig K. Perry',
          excerpt: post.excerpt || '',
          image: post.image || '',
          tags: post.tags ? post.tags.join(', ') : '',
          content: post.content || '',
        })
        setEditingSlug(slug)
        setShowForm(true)
        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setError('Failed to load post for editing')
      }
    } catch (err) {
      setError('An error occurred while loading the post')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Only images are allowed.')
      return
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      setError('File size too large. Maximum size is 5MB.')
      return
    }

    setUploadingImage(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setFormData((prev) => ({ ...prev, image: data.path }))
        setSuccess('Image uploaded successfully!')
      } else {
        setError(data.error || 'Failed to upload image')
      }
    } catch (err) {
      setError('An error occurred while uploading the image')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Auto-generate slug from title only if not editing and slug is empty
    if (name === 'title' && !editingSlug && !formData.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setFormData((prev) => ({ ...prev, slug }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const tagsArray = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)

      const isEditing = !!editingSlug
      const url = isEditing ? '/api/admin/posts/update' : '/api/admin/posts'
      const method = isEditing ? 'PUT' : 'POST'

      const body = isEditing
        ? {
            originalSlug: editingSlug,
            ...formData,
            tags: tagsArray,
          }
        : {
            ...formData,
            tags: tagsArray,
          }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(
          isEditing
            ? `Blog post "${formData.title}" updated successfully!`
            : `Blog post "${formData.title}" created successfully!`
        )
        resetForm()
        setShowForm(false)
        // Refresh posts list
        await fetchPosts()
      } else {
        setError(data.error || `Failed to ${isEditing ? 'update' : 'create'} blog post`)
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    resetForm()
    setShowForm(false)
    setError('')
    setSuccess('')
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gray-50 section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-dark-blue mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your blog posts</p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/blog"
                className="px-4 py-2 text-dark-blue border border-dark-blue rounded-lg hover:bg-dark-blue hover:text-white transition-colors"
              >
                View Blog
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Toggle Form Button */}
        <div className="mb-6">
          <button
            onClick={() => {
              if (showForm) {
                handleCancel()
              } else {
                resetForm()
                setShowForm(true)
              }
            }}
            className="bg-dark-blue text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-300"
          >
            {showForm ? 'Hide Form' : '+ Create New Blog Post'}
          </button>
        </div>

        {/* Blog Post Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-dark-blue mb-6">
              {editingSlug ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-blue focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug {editingSlug && '(changing this will create a new post)'}
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-blue focus:border-transparent"
                    placeholder="my-blog-post"
                  />
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Publication Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-blue focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-blue focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image
                  </label>
                  <div className="flex gap-4 items-start">
                    <div className="flex-1">
                      <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-blue focus:border-transparent"
                        placeholder="/images/blog/image.jpg or upload below"
                      />
                    </div>
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="px-4 py-2 bg-light-gold text-dark-blue rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                      >
                        {uploadingImage ? 'Uploading...' : 'Upload Image'}
                      </button>
                    </div>
                  </div>
                  {formData.image && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Preview:</p>
                      <div className="relative w-full h-48 border border-gray-300 rounded-lg overflow-hidden">
                        <Image
                          src={formData.image}
                          alt="Preview"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-blue focus:border-transparent"
                    placeholder="Tag1, Tag2, Tag3"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt (summary for blog listing)
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-blue focus:border-transparent"
                  placeholder="A brief summary of your post..."
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(value) => setFormData((prev) => ({ ...prev, content: value }))}
                  placeholder="Start writing your blog post. Use the toolbar above to format your text..."
                />
                <p className="mt-2 text-sm text-gray-500">
                  Use the formatting toolbar above to style your content. You can make text bold, italic, change fonts, add links, and more!
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-dark-blue text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? editingSlug
                      ? 'Updating...'
                      : 'Creating...'
                    : editingSlug
                    ? 'Update Blog Post'
                    : 'Create Blog Post'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Existing Posts List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-dark-blue mb-6">Existing Blog Posts</h2>
          {loadingPosts ? (
            <p className="text-gray-600">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-gray-600">No blog posts yet. Create your first one above!</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.slug}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-dark-blue mb-1">{post.title}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(post.date).toLocaleDateString()} • {post.author}
                      </p>
                      {post.excerpt && (
                        <p className="text-gray-700 mt-2 line-clamp-2">{post.excerpt}</p>
                      )}
                    </div>
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => handleEdit(post.slug)}
                        className="px-4 py-2 bg-dark-gold text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm font-semibold"
                      >
                        Edit
                      </button>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="px-4 py-2 text-dark-blue border border-dark-blue rounded-lg hover:bg-dark-blue hover:text-white transition-colors text-sm font-semibold"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

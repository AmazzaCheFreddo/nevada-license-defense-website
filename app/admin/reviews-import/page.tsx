'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ReviewsImportPage() {
  const [reviews, setReviews] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  // Check authentication
  useEffect(() => {
    fetch('/api/admin/check-auth')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setAuthenticated(true)
        } else {
          router.push('/admin/login')
        }
      })
      .catch(() => {
        router.push('/admin/login')
      })
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      // Parse JSON input
      const reviewsArray = JSON.parse(reviews)

      // Send to API
      const response = await fetch('/api/google-reviews/manual-import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reviews: reviewsArray }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to import reviews')
      }

      setResult(data)
      setReviews('') // Clear form on success
    } catch (err: any) {
      setError(err.message || 'Failed to import reviews')
    } finally {
      setLoading(false)
    }
  }

  const exampleReview = {
    author_name: "John Doe",
    author_url: "https://www.google.com/maps/contrib/123456789",
    profile_photo_url: "https://example.com/photo.jpg",
    rating: 5,
    relative_time_description: "2 weeks ago",
    text: "Great service! Highly recommend.",
    time: Math.floor(Date.now() / 1000) - (14 * 24 * 60 * 60), // 2 weeks ago in seconds
    translated: false
  }

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <a
            href="/admin/dashboard"
            className="text-dark-blue hover:text-light-gold transition-colors duration-300 inline-flex items-center mb-4"
          >
            ← Back to Dashboard
          </a>
          <h1 className="text-3xl font-bold text-dark-blue mb-2">Import Google Reviews Manually</h1>
          <p className="text-gray-600">
            Add reviews from your <a href="https://share.google.com/YS9sT6yE3vFOSJ1f2" target="_blank" rel="noopener noreferrer" className="text-dark-blue hover:text-light-gold underline">Google Business Profile</a> that aren't available through the API.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-dark-blue mb-4">Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
            <li>Visit your <a href="https://share.google.com/YS9sT6yE3vFOSJ1f2" target="_blank" rel="noopener noreferrer" className="text-dark-blue hover:text-light-gold underline">Google Business Profile reviews page</a></li>
            <li>For each review you want to add, create a JSON object with the review details</li>
            <li>Paste the JSON array below (see example format)</li>
            <li>Click "Import Reviews"</li>
          </ol>
          <p className="text-sm text-gray-600">
            <strong>Tip:</strong> You can add reviews one at a time or in batches. Duplicates are automatically prevented.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}

        {result && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
            <strong>Success!</strong> {result.message}
            <div className="mt-2 text-sm">
              <p>Imported: {result.stats.imported} reviews</p>
              <p>New reviews added: {result.stats.newReviewsAdded}</p>
              <p>Total in archive: {result.stats.totalArchived}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <label htmlFor="reviews" className="block text-sm font-bold text-dark-blue mb-2">
              Reviews JSON Array
            </label>
            <textarea
              id="reviews"
              value={reviews}
              onChange={(e) => setReviews(e.target.value)}
              className="w-full h-64 p-3 border border-gray-300 rounded-lg font-mono text-sm"
              placeholder={`[\n  {\n    "author_name": "John Doe",\n    "rating": 5,\n    "text": "Great service!",\n    "time": 1766136556,\n    "relative_time_description": "2 weeks ago"\n  }\n]`}
              required
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-dark-blue text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Importing...' : 'Import Reviews'}
            </button>
          </div>
        </form>

        <div className="bg-gray-50 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-bold text-dark-blue mb-3">Example Review Format</h3>
          <pre className="bg-white p-4 rounded border border-gray-200 overflow-x-auto text-xs">
            {JSON.stringify([exampleReview], null, 2)}
          </pre>
          <div className="mt-3 text-sm text-gray-600">
            <p><strong>Required fields:</strong> author_name, rating, text</p>
            <p><strong>Optional fields:</strong> author_url, profile_photo_url, time, relative_time_description</p>
            <p className="mt-2"><strong>Time field:</strong> Unix timestamp in seconds. Use <a href="https://www.epochconverter.com/" target="_blank" rel="noopener noreferrer" className="text-dark-blue hover:text-light-gold underline">epoch converter</a> to convert dates.</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <h3 className="text-lg font-bold text-dark-blue mb-2">Quick Import Helper</h3>
          <p className="text-sm text-gray-700 mb-3">
            Click the button below to load an example review format, then modify it with your actual review data.
          </p>
          <button
            onClick={() => {
              const now = Math.floor(Date.now() / 1000)
              const example = [{
                ...exampleReview,
                time: now - (7 * 24 * 60 * 60), // 7 days ago
                relative_time_description: "a week ago"
              }]
              setReviews(JSON.stringify(example, null, 2))
            }}
            className="bg-light-gold text-dark-blue px-4 py-2 rounded font-semibold hover:bg-dark-gold hover:text-white transition-all duration-300"
          >
            Load Example Review
          </button>
        </div>
      </div>
    </div>
  )
}

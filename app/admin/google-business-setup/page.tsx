'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function GoogleBusinessSetupPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

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

  const handleStartOAuth = () => {
    setLoading(true)
    // Redirect to OAuth initiation endpoint
    window.location.href = '/api/auth/google'
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
    return null
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
          <h1 className="text-3xl font-bold text-dark-blue mb-2">Google Business Profile API Setup</h1>
          <p className="text-gray-600">
            Connect your Google Business Profile to fetch all reviews programmatically.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-dark-blue mb-4">Prerequisites</h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <div>
                <strong>Business Verification:</strong> Your business must be verified on Google Business Profile
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <div>
                <strong>Google Cloud Setup:</strong> API enabled, OAuth credentials configured
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <div>
                <strong>Environment Variables:</strong> Client ID and Secret set in <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-red-700 mb-3">⚠️ Critical: Configure Redirect URI</h3>
          <p className="text-gray-700 mb-3">
            <strong>Before starting the OAuth flow, you MUST add this redirect URI to Google Cloud Console:</strong>
          </p>
          <div className="bg-white p-4 rounded border-2 border-red-200 mb-3">
            <code className="text-sm font-mono text-dark-blue break-all">
              http://localhost:3333/api/auth/google/callback
            </code>
          </div>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm">
            <li>Go to <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-dark-blue hover:text-light-gold underline">Google Cloud Console → Credentials</a></li>
            <li>Click on your OAuth 2.0 Client ID</li>
            <li>Under <strong>"Authorized redirect URIs"</strong>, click <strong>"Add URI"</strong></li>
            <li>Paste the URI above (must match exactly, including <code className="bg-gray-100 px-1">http://</code>)</li>
            <li>Click <strong>"Save"</strong></li>
            <li>Wait 30 seconds for changes to propagate</li>
          </ol>
          <p className="text-xs text-gray-600 mt-3">
            If you see "redirect_uri_mismatch" error, this is why. See <a href="/docs/FIX_REDIRECT_URI_MISMATCH.md" target="_blank" className="text-dark-blue hover:text-light-gold underline">fix guide</a> for details.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-dark-blue mb-3">Setup Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Follow the guide in <code className="bg-white px-2 py-1 rounded">docs/GOOGLE_BUSINESS_PROFILE_API_SETUP.md</code></li>
            <li>Add your OAuth credentials to <code className="bg-white px-2 py-1 rounded">.env.local</code>:
              <pre className="bg-white p-3 rounded mt-2 text-sm overflow-x-auto">
{`GOOGLE_BUSINESS_CLIENT_ID=your-client-id
GOOGLE_BUSINESS_CLIENT_SECRET=your-client-secret
GOOGLE_BUSINESS_REDIRECT_URI=http://localhost:3333/api/auth/google/callback`}
              </pre>
            </li>
            <li><strong>Configure the redirect URI in Google Cloud Console (see red box above)</strong></li>
            <li>Click the button below to start the OAuth flow</li>
            <li>Authorize the app to access your business data</li>
            <li>Reviews will be automatically fetched and archived</li>
          </ol>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-dark-blue mb-4">Start OAuth Flow</h3>
          <p className="text-gray-700 mb-4">
            Click the button below to authorize this application to access your Google Business Profile data.
            You'll be redirected to Google to sign in and grant permissions.
          </p>
          <button
            onClick={handleStartOAuth}
            disabled={loading}
            className="bg-dark-blue text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Redirecting...' : 'Connect Google Business Profile'}
          </button>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <h4 className="font-bold text-dark-blue mb-2">⚠️ Important Notes</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>Make sure your business is verified on Google Business Profile before starting</li>
            <li>The OAuth flow requires your Google account that manages the business</li>
            <li><strong>Add your email as a test user:</strong> Go to <a href="https://console.cloud.google.com/apis/credentials/consent" target="_blank" rel="noopener noreferrer" className="text-dark-blue hover:text-light-gold underline">OAuth Consent Screen</a> → Test users → Add your email</li>
            <li>API access approval may take 3-7 business days if required</li>
            <li>Tokens will be returned in the callback - store them securely in production</li>
          </ul>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
          <h4 className="font-bold text-red-700 mb-2">🚨 If You See "Access Blocked" Error</h4>
          <p className="text-sm text-gray-700 mb-2">
            This means your app is in "Testing" mode and your email isn't added as a test user.
          </p>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
            <li>Go to <a href="https://console.cloud.google.com/apis/credentials/consent" target="_blank" rel="noopener noreferrer" className="text-dark-blue hover:text-light-gold underline">Google Cloud Console → OAuth Consent Screen</a></li>
            <li>Scroll to <strong>"Test users"</strong> section</li>
            <li>Click <strong>"+ ADD USERS"</strong></li>
            <li>Add your Google account email (the one you're signing in with)</li>
            <li>Click <strong>"ADD"</strong> and try again</li>
          </ol>
          <p className="text-xs text-gray-600 mt-2">
            See <a href="/docs/FIX_TEST_USER_ACCESS.md" target="_blank" className="text-dark-blue hover:text-light-gold underline">detailed guide</a> for more help.
          </p>
        </div>
      </div>
    </div>
  )
}


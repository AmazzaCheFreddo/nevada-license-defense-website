import { NextRequest, NextResponse } from 'next/server'
import { getTokensFromCode, getAccounts, getLocations, getLocationReviews, convertBusinessProfileReview } from '@/lib/google-business-profile'
import { getArchivedReviews, saveArchivedReviews, mergeReviews } from '@/lib/reviews'
import { ArchivedReviews } from '@/lib/reviews'

/**
 * OAuth callback handler
 * GET /api/auth/google/callback?code=...
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  // Handle OAuth errors from Google
  if (error) {
    const errorHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>OAuth Error - Nevada License Defense</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              max-width: 800px;
              margin: 50px auto;
              padding: 20px;
              background: #f5f5f5;
            }
            .container {
              background: white;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h1 { color: #dc2626; }
            .error-box {
              background: #fee2e2;
              border: 1px solid #fecaca;
              padding: 15px;
              border-radius: 4px;
              margin: 20px 0;
            }
            .button {
              display: inline-block;
              background: #12203b;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 4px;
              margin-top: 20px;
            }
            .button:hover { background: #1a2f4f; }
            code { background: #f3f4f6; padding: 2px 6px; border-radius: 3px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>❌ OAuth Authorization Failed</h1>
            <div class="error-box">
              <strong>Error:</strong> ${error}<br>
              ${errorDescription ? `<strong>Details:</strong> ${errorDescription}` : ''}
            </div>
            <h2>Common Causes:</h2>
            <ul>
              <li>You denied access to the application</li>
              <li>The redirect URI doesn't match what's configured in Google Cloud Console</li>
              <li>Your account isn't added as a test user (if app is in testing mode)</li>
              <li>The OAuth consent screen isn't properly configured</li>
            </ul>
            <h2>How to Fix:</h2>
            <ol>
              <li>Make sure you're using the Google account that manages your business</li>
              <li>Verify the redirect URI in Google Cloud Console matches: <code>http://localhost:3333/api/auth/google/callback</code></li>
              <li>If in testing mode, add your email as a test user in OAuth consent screen</li>
              <li>Try again: <a href="/admin/google-business-setup" class="button">Go to Setup Page</a></li>
            </ol>
          </div>
        </body>
      </html>
    `
    return new NextResponse(errorHtml, {
      status: 400,
      headers: { 'Content-Type': 'text/html' },
    })
  }

  // Handle missing authorization code
  if (!code) {
    const noCodeHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>OAuth Setup - Nevada License Defense</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              max-width: 800px;
              margin: 50px auto;
              padding: 20px;
              background: #f5f5f5;
            }
            .container {
              background: white;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h1 { color: #12203b; }
            .info-box {
              background: #dbeafe;
              border: 1px solid #93c5fd;
              padding: 15px;
              border-radius: 4px;
              margin: 20px 0;
            }
            .button {
              display: inline-block;
              background: #12203b;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 4px;
              margin-top: 20px;
            }
            .button:hover { background: #1a2f4f; }
            code { background: #f3f4f6; padding: 2px 6px; border-radius: 3px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🔗 OAuth Setup Required</h1>
            <div class="info-box">
              <strong>No authorization code received.</strong><br>
              This page is the OAuth callback endpoint. You need to start the OAuth flow from the setup page.
            </div>
            <h2>To Connect Google Business Profile:</h2>
            <ol>
              <li>Go to the <a href="/admin/google-business-setup">Google Business Profile Setup page</a></li>
              <li>Click "Connect Google Business Profile"</li>
              <li>You'll be redirected to Google to sign in and authorize</li>
              <li>Google will redirect you back here automatically with the authorization code</li>
            </ol>
            <p><strong>Don't visit this URL directly!</strong> It's only meant to be called by Google after authorization.</p>
            <a href="/admin/google-business-setup" class="button">Go to Setup Page</a>
          </div>
        </body>
      </html>
    `
    return new NextResponse(noCodeHtml, {
      status: 400,
      headers: { 'Content-Type': 'text/html' },
    })
  }

  try {
    // Exchange code for tokens
    const tokens = await getTokensFromCode(code)
    
    if (!tokens.access_token) {
      throw new Error('No access token received')
    }

    // Get accounts (businesses)
    const accountsData = await getAccounts(tokens.access_token)
    const accounts = accountsData.accounts || []

    if (accounts.length === 0) {
      const noAccountsHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>No Business Found - Nevada License Defense</title>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                max-width: 800px;
                margin: 50px auto;
                padding: 20px;
                background: #f5f5f5;
              }
              .container {
                background: white;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              h1 { color: #dc2626; }
              .error-box {
                background: #fee2e2;
                border: 1px solid #fecaca;
                padding: 15px;
                border-radius: 4px;
                margin: 20px 0;
              }
              .button {
                display: inline-block;
                background: #12203b;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 4px;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>❌ No Business Accounts Found</h1>
              <div class="error-box">
                <strong>Error:</strong> No business accounts found for this Google account.
              </div>
              <h2>Possible Reasons:</h2>
              <ul>
                <li>Your business is not verified on Google Business Profile</li>
                <li>You're using a Google account that doesn't manage the business</li>
                <li>The Google Business Profile API access hasn't been approved yet</li>
              </ul>
              <h2>How to Fix:</h2>
              <ol>
                <li>Make sure your business is verified: <a href="https://business.google.com/" target="_blank">Google Business Profile</a></li>
                <li>Use the Google account that manages your business</li>
                <li>Wait for API access approval if you just submitted the request</li>
              </ol>
              <a href="/admin/google-business-setup" class="button">Try Again</a>
            </div>
          </body>
        </html>
      `
      return new NextResponse(noAccountsHtml, {
        status: 404,
        headers: { 'Content-Type': 'text/html' },
      })
    }

    // Use first account
    const account = accounts[0]
    const accountName = account.name

    // Get locations
    const locationsData = await getLocations(tokens.access_token, accountName)
    const locations = locationsData.locations || []

    if (locations.length === 0) {
      const noLocationsHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>No Locations Found - Nevada License Defense</title>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                max-width: 800px;
                margin: 50px auto;
                padding: 20px;
                background: #f5f5f5;
              }
              .container {
                background: white;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              h1 { color: #dc2626; }
              .error-box {
                background: #fee2e2;
                border: 1px solid #fecaca;
                padding: 15px;
                border-radius: 4px;
                margin: 20px 0;
              }
              .button {
                display: inline-block;
                background: #12203b;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 4px;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>❌ No Locations Found</h1>
              <div class="error-box">
                <strong>Error:</strong> No business locations found for this account.
              </div>
              <a href="/admin/google-business-setup" class="button">Go Back</a>
            </div>
          </body>
        </html>
      `
      return new NextResponse(noLocationsHtml, {
        status: 404,
        headers: { 'Content-Type': 'text/html' },
      })
    }

    // Use first location (or you can filter by name/address)
    const location = locations[0]
    // Location name format: "locations/123456789" or just the ID
    const locationName = location.name || ''

    // Get ALL reviews for this location
    const reviewsData = await getLocationReviews(
      tokens.access_token,
      accountName,
      locationName
    )

    // Convert to our format
    const convertedReviews = reviewsData.reviews.map(convertBusinessProfileReview)

    // Get archived reviews
    const archived = getArchivedReviews()
    const archivedReviews = archived?.reviews || []

    // Merge with archived reviews
    const allReviews = mergeReviews(archivedReviews, convertedReviews)

    // Get business info
    const businessName = location.storefrontAddress?.addressLines?.[0] || location.title || 'Business'
    const rating = location.rating?.averageRating || 0
    const totalRatings = location.rating?.totalCount || allReviews.length

    // Save to archive
    const archiveData: ArchivedReviews = {
      lastUpdated: new Date().toISOString(),
      businessName,
      rating,
      totalRatings,
      reviews: allReviews,
    }

    saveArchivedReviews(archiveData)

    // Success page
    const successHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Success! - Nevada License Defense</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              max-width: 800px;
              margin: 50px auto;
              padding: 20px;
              background: #f5f5f5;
            }
            .container {
              background: white;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h1 { color: #059669; }
            .success-box {
              background: #d1fae5;
              border: 1px solid #6ee7b7;
              padding: 15px;
              border-radius: 4px;
              margin: 20px 0;
            }
            .stats {
              background: #f3f4f6;
              padding: 15px;
              border-radius: 4px;
              margin: 20px 0;
            }
            .button {
              display: inline-block;
              background: #12203b;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 4px;
              margin-top: 20px;
            }
            .button:hover { background: #1a2f4f; }
            .warning {
              background: #fef3c7;
              border: 1px solid #fcd34d;
              padding: 15px;
              border-radius: 4px;
              margin: 20px 0;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>✅ Successfully Connected!</h1>
            <div class="success-box">
              <strong>Google Business Profile API connected successfully!</strong><br>
              Reviews have been fetched and archived.
            </div>
            <div class="stats">
              <h2>Statistics:</h2>
              <ul>
                <li><strong>Total Reviews Fetched:</strong> ${reviewsData.total}</li>
                <li><strong>New Reviews Added:</strong> ${allReviews.length - archivedReviews.length}</li>
                <li><strong>Total Reviews in Archive:</strong> ${allReviews.length}</li>
                <li><strong>Business Name:</strong> ${businessName}</li>
                <li><strong>Rating:</strong> ${rating.toFixed(1)} / 5.0</li>
                <li><strong>Total Ratings:</strong> ${totalRatings}</li>
              </ul>
            </div>
            <div class="warning">
              <strong>⚠️ Important:</strong> Access tokens were returned in the response. In production, store these tokens securely in a database. Tokens will expire and need to be refreshed periodically.
            </div>
            <a href="/admin/google-business-setup" class="button">Back to Setup</a>
            <a href="/" class="button" style="margin-left: 10px;">View Homepage</a>
          </div>
        </body>
      </html>
    `

    return new NextResponse(successHtml, {
      headers: { 'Content-Type': 'text/html' },
    })
  } catch (error) {
    console.error('Error in OAuth callback:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const isQuotaError = errorMessage.includes('Quota exceeded') || errorMessage.includes('quota')
    const isApiDisabledError = errorMessage.includes('SERVICE_DISABLED') || 
                                errorMessage.includes('has not been used') || 
                                errorMessage.includes('it is disabled') ||
                                errorMessage.includes('Google My Business API')
    
    // Extract activation URL if present in error message
    let activationUrl = ''
    if (errorMessage.includes('activationUrl') || errorMessage.includes('console.developers.google.com')) {
      const urlMatch = errorMessage.match(/https:\/\/console\.developers\.google\.com[^\s"']+/)
      if (urlMatch) {
        activationUrl = urlMatch[0]
      }
    }
    
    const errorHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Error - Nevada License Defense</title>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              max-width: 800px;
              margin: 50px auto;
              padding: 20px;
              background: #f5f5f5;
            }
            .container {
              background: white;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h1 { color: ${isQuotaError ? '#f59e0b' : '#dc2626'}; }
            .error-box {
              background: ${isQuotaError ? '#fef3c7' : '#fee2e2'};
              border: 1px solid ${isQuotaError ? '#fcd34d' : '#fecaca'};
              padding: 15px;
              border-radius: 4px;
              margin: 20px 0;
            }
            .success-note {
              background: #d1fae5;
              border: 1px solid #6ee7b7;
              padding: 15px;
              border-radius: 4px;
              margin: 20px 0;
            }
            .button {
              display: inline-block;
              background: #12203b;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 4px;
              margin-top: 20px;
            }
            code {
              background: #f3f4f6;
              padding: 2px 6px;
              border-radius: 3px;
              font-family: monospace;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>${isQuotaError ? '⏱️ Quota Exceeded' : isApiDisabledError ? '🔧 API Not Enabled' : '❌ Error During OAuth Flow'}</h1>
            ${isQuotaError ? `
              <div class="success-note">
                <strong>✅ Good News!</strong> Your OAuth authentication is working! The API connection is successful, but you've hit the rate limit.
              </div>
            ` : ''}
            ${isApiDisabledError ? `
              <div class="success-note">
                <strong>🔍 Found the Issue!</strong> The Google My Business API (v4) needs to be enabled to fetch reviews.
              </div>
            ` : ''}
            <div class="error-box">
              <strong>Error:</strong> ${errorMessage}
            </div>
            ${isApiDisabledError ? `
              <h2>Enable the Google My Business API:</h2>
              <ol>
                <li>Click the link below to enable the API (or copy and paste it into your browser):</li>
                <li><strong><a href="${activationUrl || 'https://console.developers.google.com/apis/api/mybusiness.googleapis.com/overview?project=768037670086'}" target="_blank">Enable Google My Business API →</a></strong></li>
                <li>Click the <strong>"Enable"</strong> button on the page</li>
                <li>Wait 1-2 minutes for the API to activate</li>
                <li>Come back here and try again</li>
              </ol>
              <p><strong>Why this is needed:</strong> While locations use the Business Information API (v1), reviews still require the Google My Business API (v4) to be enabled.</p>
            ` : isQuotaError ? `
              <h2>What This Means:</h2>
              <p>Your OAuth flow is working correctly! The error is just because you've exceeded the API rate limit (requests per minute).</p>
              
              <h2>Quick Fix:</h2>
              <ol>
                <li><strong>Wait 1-2 minutes</strong> for the quota to reset</li>
                <li>Try the OAuth flow again</li>
                <li>The quota resets automatically every minute</li>
              </ol>
              
              <h2>For Production:</h2>
              <p>Request a quota increase in Google Cloud Console:</p>
              <ol>
                <li>Go to <a href="https://console.cloud.google.com/apis/dashboard" target="_blank">Google Cloud Console → APIs & Services → Dashboard</a></li>
                <li>Find "Google Business Profile API"</li>
                <li>Click "Quotas" tab</li>
                <li>Request an increase for "Requests per minute"</li>
              </ol>
              
              <p><strong>Note:</strong> Once you successfully fetch reviews once, they'll be archived locally and you won't need to fetch them again immediately.</p>
            ` : `
              <h2>Common Issues:</h2>
              <ul>
                <li>API not enabled in Google Cloud Console</li>
                <li>Incorrect OAuth credentials</li>
                <li>API access not yet approved</li>
                <li>Network or connectivity issues</li>
              </ul>
              <h2>Check:</h2>
              <ol>
                <li>Verify <code>GOOGLE_BUSINESS_CLIENT_ID</code> and <code>GOOGLE_BUSINESS_CLIENT_SECRET</code> in <code>.env.local</code></li>
                <li>Ensure Google Business Profile API is enabled in Google Cloud Console</li>
                <li>Check that your redirect URI matches: <code>http://localhost:3333/api/auth/google/callback</code></li>
              </ol>
            `}
            <a href="/admin/google-business-setup" class="button">${isQuotaError ? 'Wait & Try Again' : isApiDisabledError ? 'Enable API & Try Again' : 'Try Again'}</a>
          </div>
        </body>
      </html>
    `
    return new NextResponse(errorHtml, {
      status: 500,
      headers: { 'Content-Type': 'text/html' },
    })
  }
}

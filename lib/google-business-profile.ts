import { google } from 'googleapis'

/**
 * Google Business Profile API client
 * 
 * This requires OAuth 2.0 authentication and business verification.
 * See docs/GOOGLE_BUSINESS_PROFILE_API_SETUP.md for setup instructions.
 */

const CLIENT_ID = process.env.GOOGLE_BUSINESS_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_BUSINESS_CLIENT_SECRET
const REDIRECT_URI = process.env.GOOGLE_BUSINESS_REDIRECT_URI || 'http://localhost:3333/api/auth/google/callback'

/**
 * Create OAuth2 client
 */
export function getOAuth2Client() {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('Google Business Profile API credentials not configured')
  }

  return new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  )
}

/**
 * Get authorization URL for OAuth flow
 */
export function getAuthUrl(): string {
  const oauth2Client = getOAuth2Client()
  
  const scopes = [
    'https://www.googleapis.com/auth/business.manage',
  ]

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent', // Force consent screen to get refresh token
  })
}

/**
 * Exchange authorization code for tokens
 */
export async function getTokensFromCode(code: string) {
  const oauth2Client = getOAuth2Client()
  const { tokens } = await oauth2Client.getToken(code)
  return tokens
}

/**
 * Set credentials on OAuth2 client
 */
export function setCredentials(tokens: any) {
  const oauth2Client = getOAuth2Client()
  oauth2Client.setCredentials(tokens)
  return oauth2Client
}

/**
 * Get authenticated client for API calls
 */
export async function getAuthenticatedClient(accessToken: string, refreshToken?: string) {
  const oauth2Client = getOAuth2Client()
  
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  })

  // Refresh token if needed
  if (refreshToken) {
    try {
      await oauth2Client.refreshAccessToken()
    } catch (error) {
      console.error('Error refreshing token:', error)
      throw new Error('Failed to refresh access token')
    }
  }

  return oauth2Client
}

/**
 * Get all accounts (businesses) for authenticated user
 */
export async function getAccounts(accessToken: string) {
  const response = await fetch('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to fetch accounts: ${response.status} ${response.statusText} - ${errorText}`)
  }

  return await response.json()
}

/**
 * Get locations for an account
 * 
 * accountName format: "accounts/104014692442643149168"
 * We need to use the Business Information API
 */
export async function getLocations(accessToken: string, accountName: string) {
  // Extract account ID from account name (format: "accounts/ID" or just "ID")
  const accountId = accountName.includes('/') ? accountName.split('/').pop() : accountName
  
  // Use Business Information API v1
  // The API requires a readMask parameter (camelCase) to specify which fields to return
  // Start with minimal fields to verify format, then expand
  const url = `https://mybusinessbusinessinformation.googleapis.com/v1/accounts/${accountId}/locations?readMask=name`
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to fetch locations: ${response.status} ${response.statusText} - ${errorText}`)
  }

  return await response.json()
}

/**
 * Get all reviews for a location
 * 
 * This is the key function - it returns ALL reviews, not just 5!
 * 
 * accountName format: "accounts/104014692442643149168"
 * locationName format: "locations/123456789" or just "123456789"
 */
export async function getLocationReviews(
  accessToken: string,
  accountName: string,
  locationName: string,
  pageSize: number = 50
) {
  // Extract account ID and location ID
  const accountId = accountName.includes('/') ? accountName.split('/').pop() : accountName
  const locationId = locationName.includes('/') ? locationName.split('/').pop() : locationName
  
  const allReviews: any[] = []
  let pageToken: string | undefined = undefined

  do {
    // Reviews might need to use the v4 API endpoint (legacy but still functional)
    // Try v4 API first, as Business Information API v1 might not have reviews endpoint
    const url = new URL(`https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`)
    url.searchParams.set('pageSize', pageSize.toString())
    if (pageToken) {
      url.searchParams.set('pageToken', pageToken)
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to fetch reviews: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()
    const reviews = data.reviews || []
    allReviews.push(...reviews)

    pageToken = data.nextPageToken || undefined
  } while (pageToken)

  return {
    reviews: allReviews,
    total: allReviews.length,
  }
}

/**
 * Convert Google Business Profile review to our Review format
 */
export function convertBusinessProfileReview(review: any): any {
  return {
    author_name: review.reviewer?.displayName || 'Anonymous',
    author_url: review.reviewer?.profilePhotoUrl || '',
    profile_photo_url: review.reviewer?.profilePhotoUrl || '',
    rating: review.starRating === 'FIVE' ? 5 :
            review.starRating === 'FOUR' ? 4 :
            review.starRating === 'THREE' ? 3 :
            review.starRating === 'TWO' ? 2 :
            review.starRating === 'ONE' ? 1 : 5,
    text: review.comment || '',
    time: review.createTime ? Math.floor(new Date(review.createTime).getTime() / 1000) : Math.floor(Date.now() / 1000),
    relative_time_description: review.createTime ? 
      getRelativeTime(new Date(review.createTime)) : 'recently',
    translated: false,
  }
}

/**
 * Get relative time description
 */
function getRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'today'
  if (diffDays === 1) return 'yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}


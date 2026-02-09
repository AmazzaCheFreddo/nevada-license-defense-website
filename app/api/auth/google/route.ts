import { NextResponse } from 'next/server'
import { getAuthUrl } from '@/lib/google-business-profile'

/**
 * Initiate OAuth flow
 * GET /api/auth/google
 */
export async function GET() {
  try {
    const authUrl = getAuthUrl()
    return NextResponse.redirect(authUrl)
  } catch (error) {
    console.error('Error generating auth URL:', error)
    return NextResponse.json(
      { 
        error: 'Failed to initiate OAuth flow',
        details: error instanceof Error ? error.message : 'Unknown error',
        hint: 'Make sure GOOGLE_BUSINESS_CLIENT_ID and GOOGLE_BUSINESS_CLIENT_SECRET are set in .env.local'
      },
      { status: 500 }
    )
  }
}


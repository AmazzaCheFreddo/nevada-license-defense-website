import { NextResponse } from 'next/server'

/**
 * Health check / diagnostic endpoint
 * GET /api/health
 * Reports which environment variables are configured (without revealing values)
 */
export async function GET() {
  const envVars = {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ? 'SET' : 'MISSING',
    GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY ? 'SET' : 'MISSING',
    GOOGLE_PLACE_ID: process.env.GOOGLE_PLACE_ID ? 'SET' : 'MISSING',
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY ? 'SET' : 'MISSING',
    RESEND_API_KEY: process.env.RESEND_API_KEY ? 'SET' : 'MISSING',
    CONTACT_EMAIL: process.env.CONTACT_EMAIL ? 'SET' : 'MISSING',
    FROM_EMAIL: process.env.FROM_EMAIL ? 'SET' : 'MISSING',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? 'SET' : 'MISSING',
    GOOGLE_BUSINESS_CLIENT_ID: process.env.GOOGLE_BUSINESS_CLIENT_ID ? 'SET' : 'MISSING',
    GOOGLE_BUSINESS_CLIENT_SECRET: process.env.GOOGLE_BUSINESS_CLIENT_SECRET ? 'SET' : 'MISSING',
    GOOGLE_BUSINESS_REDIRECT_URI: process.env.GOOGLE_BUSINESS_REDIRECT_URI ? 'SET' : 'MISSING',
    NODE_ENV: process.env.NODE_ENV || 'not set',
    PORT: process.env.PORT || 'not set',
  }

  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: envVars,
  })
}

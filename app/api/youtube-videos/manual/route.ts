import { NextResponse } from 'next/server'
import { getManualVideos } from '@/lib/youtube-videos'

/**
 * Get videos from manual JSON file
 * No API key required!
 * GET /api/youtube-videos/manual
 */
export async function GET() {
  const videos = getManualVideos()
  
  return NextResponse.json({
    videos,
    channelUrl: 'https://www.youtube.com/@lvnurseattorney',
    total: videos.length,
    source: 'manual',
  })
}


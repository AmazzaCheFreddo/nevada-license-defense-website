import { NextResponse } from 'next/server'

/**
 * Fetch videos from YouTube channel
 * GET /api/youtube-videos
 */
export async function GET() {
  const channelHandle = '@lvnurseattorney'
  const channelId = 'UC' // We'll extract from handle or use handle directly
  
  try {
    // YouTube Data API v3 endpoint
    // Using channel handle to get channel ID, then fetch uploads playlist
    const apiKey = process.env.YOUTUBE_API_KEY
    
    if (!apiKey) {
      // If no API key, return a fallback with direct YouTube links
      return NextResponse.json({
        videos: [],
        channelUrl: `https://www.youtube.com/${channelHandle}`,
        error: 'YouTube API key not configured. Using fallback.',
      })
    }

    // First, get channel ID from handle
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(channelHandle)}&type=channel&key=${apiKey}&maxResults=1`
    )

    if (!channelResponse.ok) {
      throw new Error('Failed to fetch channel')
    }

    const channelData = await channelResponse.json()
    
    if (!channelData.items || channelData.items.length === 0) {
      return NextResponse.json({
        videos: [],
        channelUrl: `https://www.youtube.com/${channelHandle}`,
        error: 'Channel not found',
      })
    }

    const channelId = channelData.items[0].snippet.channelId

    // Get uploads playlist ID
    const channelDetailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
    )

    if (!channelDetailsResponse.ok) {
      throw new Error('Failed to fetch channel details')
    }

    const channelDetails = await channelDetailsResponse.json()
    const uploadsPlaylistId = channelDetails.items[0].contentDetails.relatedPlaylists.uploads

    // Get videos from uploads playlist
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&key=${apiKey}&maxResults=50&order=date`
    )

    if (!videosResponse.ok) {
      throw new Error('Failed to fetch videos')
    }

    const videosData = await videosResponse.json()

    const videos = videosData.items.map((item: any) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
      publishedAt: item.snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
    }))

    return NextResponse.json({
      videos,
      channelUrl: `https://www.youtube.com/${channelHandle}`,
      total: videos.length,
    })
  } catch (error) {
    console.error('Error fetching YouTube videos:', error)
    
    // Return fallback with channel link
    return NextResponse.json({
      videos: [],
      channelUrl: `https://www.youtube.com/${channelHandle}`,
      error: error instanceof Error ? error.message : 'Failed to fetch videos',
    })
  }
}


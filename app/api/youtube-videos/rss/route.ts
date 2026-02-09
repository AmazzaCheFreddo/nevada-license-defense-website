import { NextResponse } from 'next/server'

/**
 * Fetch videos from YouTube channel using RSS feed
 * No API key required!
 * GET /api/youtube-videos/rss
 */
export async function GET() {
  const channelHandle = '@lvnurseattorney'
  const channelId = 'UCENaCzhHC8YsU7ip-wD7Xnw' // Your channel ID
  
  try {
    
    // Fetch RSS feed
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
    const rssResponse = await fetch(rssUrl)
    
    if (!rssResponse.ok) {
      throw new Error('Failed to fetch RSS feed')
    }
    
    const rssXml = await rssResponse.text()
    
    // Parse RSS XML (simple parsing)
    const videoMatches = Array.from(rssXml.matchAll(/<entry>([\s\S]*?)<\/entry>/g))
    const videos: any[] = []
    
    for (const match of videoMatches) {
      const entry = match[1]
      
      // Extract video ID from <yt:videoId>
      const videoIdMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)
      // Extract title
      const titleMatch = entry.match(/<title>([^<]+)<\/title>/)
      // Extract published date
      const publishedMatch = entry.match(/<published>([^<]+)<\/published>/)
      // Extract description (if available)
      const descriptionMatch = entry.match(/<media:description>([^<]+)<\/media:description>/)
      // Extract thumbnail
      const thumbnailMatch = entry.match(/<media:thumbnail url="([^"]+)"/)
      
      if (videoIdMatch) {
        videos.push({
          id: videoIdMatch[1],
          title: titleMatch ? titleMatch[1] : 'Untitled',
          description: descriptionMatch ? descriptionMatch[1] : '',
          thumbnail: thumbnailMatch ? thumbnailMatch[1] : `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg`,
          publishedAt: publishedMatch ? publishedMatch[1] : new Date().toISOString(),
          url: `https://www.youtube.com/watch?v=${videoIdMatch[1]}`,
        })
      }
    }
    
    return NextResponse.json({
      videos: videos.slice(0, 50), // Limit to 50 most recent
      channelUrl: `https://www.youtube.com/${channelHandle}`,
      total: videos.length,
    })
  } catch (error) {
    console.error('Error fetching YouTube videos via RSS:', error)
    
    return NextResponse.json({
      videos: [],
      channelUrl: `https://www.youtube.com/${channelHandle}`,
      error: error instanceof Error ? error.message : 'Failed to fetch videos',
      fallback: 'Use manual video list or get YouTube API key',
      channelId: 'UCENaCzhHC8YsU7ip-wD7Xnw',
    })
  }
}


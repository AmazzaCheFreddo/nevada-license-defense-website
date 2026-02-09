import fs from 'fs'
import path from 'path'

export interface YouTubeVideo {
  id: string
  title: string
  description?: string
  publishedAt: string
  thumbnail?: string
  url?: string
}

/**
 * Get videos from manual JSON file
 * No API key required!
 */
export function getManualVideos(): YouTubeVideo[] {
  const filePath = path.join(process.cwd(), 'content', 'youtube-videos.json')
  
  try {
    if (!fs.existsSync(filePath)) {
      return []
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const videos: YouTubeVideo[] = JSON.parse(fileContents)
    
    // Add thumbnail and URL if not present
    return videos.map((video) => ({
      ...video,
      thumbnail: video.thumbnail || `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`,
      url: video.url || `https://www.youtube.com/watch?v=${video.id}`,
    }))
  } catch (error) {
    console.error('Error reading manual videos:', error)
    return []
  }
}

/**
 * Get video ID from YouTube URL
 */
export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      return match[1]
    }
  }
  
  return null
}


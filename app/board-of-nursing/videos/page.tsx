import YouTubeVideoGrid from '@/components/sections/YouTubeVideoGrid'

export const metadata = {
  title: 'Informational Videos for Nurses | Nevada License Defense',
  description: 'Educational videos to help nurses understand the license defense process and what to expect when dealing with the Nevada State Board of Nursing.',
}

async function getYouTubeVideos() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3333'
    
    // Try RSS feed first (no API key needed, auto-updates)
    const rssResponse = await fetch(`${siteUrl}/api/youtube-videos/rss`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    
    if (rssResponse.ok) {
      const rssData = await rssResponse.json()
      if (rssData.videos && rssData.videos.length > 0) {
        return rssData
      }
    }
    
    // Try manual videos second (no API key needed)
    const manualResponse = await fetch(`${siteUrl}/api/youtube-videos/manual`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    
    if (manualResponse.ok) {
      const manualData = await manualResponse.json()
      if (manualData.videos && manualData.videos.length > 0) {
        return manualData
      }
    }
    
    // Fallback to API if RSS and manual are empty
    const response = await fetch(`${siteUrl}/api/youtube-videos`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching YouTube videos:', error)
    return null
  }
}

export default async function VideosPage() {
  const videosData = await getYouTubeVideos()

  return (
    <div className="section-padding bg-white">
      <div className="section-container">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-dark-blue mb-4">
              Informational Videos for Nurses
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Educational videos to help nurses understand the license defense process and 
              what to expect when dealing with the Nevada State Board of Nursing.
            </p>
          </div>

          {videosData && videosData.videos && videosData.videos.length > 0 ? (
            <YouTubeVideoGrid videos={videosData.videos} channelUrl={videosData.channelUrl} />
          ) : (
            <div className="bg-gray-50 p-12 rounded-lg text-center">
              <p className="text-lg text-gray-600 mb-6">
                {videosData?.error 
                  ? 'Unable to load videos at this time. Please visit our YouTube channel directly.'
                  : 'Loading videos...'}
              </p>
              {videosData?.channelUrl && (
                <a
                  href={videosData.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-dark-blue text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-300"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Visit Our YouTube Channel
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

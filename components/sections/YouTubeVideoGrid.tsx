'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  publishedAt: string
  url: string
}

interface YouTubeVideoGridProps {
  videos: Video[]
  channelUrl: string
}

export default function YouTubeVideoGrid({ videos, channelUrl }: YouTubeVideoGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <>
      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-[100] flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="bg-white rounded-lg max-w-5xl w-full p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-dark-blue">{selectedVideo.title}</h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close video"
              >
                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={selectedVideo.title}
              />
            </div>
            {selectedVideo.description && (
              <p className="mt-4 text-gray-700 text-sm line-clamp-3">{selectedVideo.description}</p>
            )}
          </div>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={() => setSelectedVideo(video)}
          >
            <div className="relative aspect-video bg-gray-200">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover group-hover:opacity-90 transition-opacity"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-dark-blue mb-2 line-clamp-2 group-hover:text-dark-gold transition-colors">
                {video.title}
              </h3>
              <p className="text-xs text-gray-500 mb-2">{formatDate(video.publishedAt)}</p>
              {video.description && (
                <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Channel Link */}
      <div className="text-center">
        <a
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-dark-blue text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          View All Videos on YouTube
        </a>
      </div>
    </>
  )
}


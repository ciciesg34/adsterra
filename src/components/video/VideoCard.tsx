import React from 'react';
import Link from 'next/link';
import { VideoCardProps } from '@/types';
import { formatViewCount, formatRelativeTime, truncateText } from '@/lib/utils';
import VideoCategoryBadge from './VideoCategoryBadge';
import VideoViewsCounter from './VideoViewsCounter';

/**
 * VideoCard component
 * Displays a video thumbnail, title, and metadata in a card layout
 */
export default function VideoCard({
  video,
  showDescription = false,
  showCategory = true,
  showViews = true,
  className = '',
}: VideoCardProps) {
  return (
    <Link
      href={`/${video.id}`}
      className={`block group rounded-xl overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-xl ${className}`}
      style={{
        backgroundColor: '#16213e',
        border: '1px solid #0f3460',
      }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={video.thumbnailUrl || '/images/placeholder-thumbnail.svg'}
          alt={video.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/placeholder-thumbnail.svg';
          }}
        />
        
        {/* Duration badge */}
        {video.duration && (
          <div
            className="absolute bottom-2 right-2 px-2 py-1 rounded text-xs font-medium text-white"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            }}
          >
            {video.duration}
          </div>
        )}
        
        {/* Featured badge */}
        {video.featured && (
          <div
            className="absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium text-white"
            style={{
              backgroundColor: '#e94560',
            }}
          >
            Featured
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3
          className="text-sm font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
          title={video.title}
        >
          {video.title}
        </h3>
        
        {showDescription && video.description && (
          <p className="text-xs text-gray-400 mb-3 line-clamp-2">
            {truncateText(video.description, 80)}
          </p>
        )}
        
        <div className="flex items-center justify-between gap-2">
          {showCategory && (
            <VideoCategoryBadge category={video.category} />
          )}
          
          {showViews && (
            <VideoViewsCounter views={video.views} />
          )}
        </div>
        
        <div className="mt-2 text-xs text-gray-500">
          {formatRelativeTime(video.createdAt)}
        </div>
      </div>
    </Link>
  );
}
'use client';

import React from 'react';
import { VideoPlayerProps } from '@/types';
import VideoEmbed from './VideoEmbed';
import VideoShare from './VideoShare';
import VideoCategoryBadge from './VideoCategoryBadge';
import VideoViewsCounter from './VideoViewsCounter';
import { formatDate, formatViewCount } from '@/lib/utils';

/**
 * VideoPlayer component
 * Displays the video player with metadata, description, and share functionality
 */
export default function VideoPlayer({
  video,
  onEnded,
  autoplay = false,
  className = '',
}: VideoPlayerProps) {
  return (
    <div className={className}>
      {/* Video embed */}
      <VideoEmbed
        videoUrl={video.videoUrl}
        provider={video.embedProvider}
        title={video.title}
      />
      
      {/* Video info */}
      <div className="mt-4 space-y-3">
        <h1 className="text-xl md:text-2xl font-bold text-white">
          {video.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
          <span>{formatViewCount(video.views)} views</span>
          <span>•</span>
          <span>{formatDate(video.createdAt)}</span>
          
          {video.category && (
            <>
              <span>•</span>
              <VideoCategoryBadge category={video.category} />
            </>
          )}
        </div>
        
        {/* Description */}
        {video.description && (
          <div
            className="p-4 rounded-lg text-sm text-gray-300"
            style={{
              backgroundColor: '#16213e',
              border: '1px solid #0f3460',
            }}
          >
            <p className="whitespace-pre-wrap">{video.description}</p>
          </div>
        )}
        
        {/* Tags */}
        {video.tags && video.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-full text-xs text-gray-400"
                style={{
                  backgroundColor: '#1a1a2e',
                  border: '1px solid #0f3460',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Share */}
        <VideoShare video={video} />
      </div>
    </div>
  );
}
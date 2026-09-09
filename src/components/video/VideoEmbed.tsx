'use client';

import React, { useState } from 'react';
import { VideoEmbedProps } from '@/types';
import { getEmbedUrl } from '@/lib/utils';

/**
 * VideoEmbed component
 * Safely embeds video content from supported providers
 */
export default function VideoEmbed({
  videoUrl,
  provider,
  title,
  className = '',
}: VideoEmbedProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const embedUrl = getEmbedUrl(videoUrl, provider);

  if (!embedUrl || error) {
    return (
      <div
        className={`flex items-center justify-center aspect-video rounded-xl ${className}`}
        style={{
          backgroundColor: '#1a1a2e',
          border: '1px solid #0f3460',
        }}
      >
        <div className="text-center p-6">
          <svg
            className="w-12 h-12 mx-auto mb-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-gray-400 text-sm font-medium">Video unavailable</p>
          <p className="text-gray-500 text-xs mt-2">
            This video cannot be played or the URL is not supported.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-video rounded-xl overflow-hidden ${className}`}
      style={{
        backgroundColor: '#000000',
        border: '1px solid #0f3460',
      }}
    >
      {/* Loading state */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-10 h-10 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin"
            style={{
              borderTopColor: '#e94560',
            }}
          />
        </div>
      )}
      
      {/* Embedded iframe */}
      <iframe
        src={embedUrl}
        title={title}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
      />
    </div>
  );
}
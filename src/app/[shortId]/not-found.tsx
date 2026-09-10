import React from 'react';
import Link from 'next/link';
import EmptyState from '@/components/ui/EmptyState';

/**
 * Video-specific 404 Not Found page
 * Displayed when a video with the given short ID does not exist
 */
export default function VideoNotFound() {
  return (
    <div className="py-12">
      <EmptyState
        title="Video Not Found"
        description="The video you are looking for does not exist or has been removed. Please check the URL or browse other videos."
      />
      
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        <Link
          href="/"
          className="px-6 py-3 rounded-lg font-semibold text-white transition-opacity"
          style={{ backgroundColor: '#e94560' }}
        >
          Go to Homepage
        </Link>
        <Link
          href="/search"
          className="px-6 py-3 rounded-lg font-semibold text-gray-300 transition-colors"
          style={{ backgroundColor: '#16213e', border: '1px solid #0f3460' }}
        >
          Browse Videos
        </Link>
      </div>
    </div>
  );
}
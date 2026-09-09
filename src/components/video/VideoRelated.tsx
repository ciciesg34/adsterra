import React from 'react';
import { VideoRelatedProps } from '@/types';
import VideoCard from './VideoCard';
import EmptyState from '@/components/ui/EmptyState';

/**
 * VideoRelated component
 * Displays a list of related videos
 */
export default function VideoRelated({
  videos,
  currentVideoId,
  className = '',
}: VideoRelatedProps) {
  const relatedVideos = videos.filter((video) => video.id !== currentVideoId);

  if (relatedVideos.length === 0) {
    return (
      <EmptyState
        title="No Related Videos"
        description="There are no related videos to display."
      />
    );
  }

  return (
    <div className={className}>
      <h2 className="text-lg font-bold text-white mb-4">Related Videos</h2>
      
      <div className="space-y-3">
        {relatedVideos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            showDescription={false}
            showCategory={true}
            showViews={true}
          />
        ))}
      </div>
    </div>
  );
}
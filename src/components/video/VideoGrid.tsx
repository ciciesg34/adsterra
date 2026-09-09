import React from 'react';
import { VideoGridProps } from '@/types';
import VideoCard from './VideoCard';
import EmptyState from '@/components/ui/EmptyState';

/**
 * VideoGrid component
 * Displays a grid of video cards
 */
export default function VideoGrid({
  videos,
  title,
  emptyMessage = 'No videos found.',
  className = '',
}: VideoGridProps) {
  if (!videos || videos.length === 0) {
    return (
      <EmptyState
        title="No Videos Available"
        description={emptyMessage}
      />
    );
  }

  return (
    <div className={className}>
      {title && (
        <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            showDescription={true}
            showCategory={true}
            showViews={true}
          />
        ))}
      </div>
    </div>
  );
}
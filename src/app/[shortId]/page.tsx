import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import VideoPlayer from '@/components/video/VideoPlayer';
import VideoRelated from '@/components/video/VideoRelated';
import VideoCard from '@/components/video/VideoCard';
import AdvertisementBanner from '@/components/video/AdvertisementBanner';
import EmptyState from '@/components/ui/EmptyState';
import {
  getVideoById,
  getRelatedVideos,
  getAllCategories,
} from '@/lib/videos';
import {
  getAdvertisementsByPosition,
  getSiteSettings,
} from '@/lib/settings';
import {
  isValidShortId,
  isReservedShortId,
  formatDate,
} from '@/lib/utils';

/**
 * Generate metadata for video page
 */
export async function generateMetadata({
  params,
}: {
  params: { shortId: string };
}): Promise<Metadata> {
  const { shortId } = params;

  // Validate short ID
  if (!isValidShortId(shortId) || isReservedShortId(shortId)) {
    return {
      title: 'Video Not Found | Vidnesia',
      description: 'The requested video could not be found.',
    };
  }

  const video = getVideoById(shortId);

  if (!video) {
    return {
      title: 'Video Not Found | Vidnesia',
      description: 'The requested video could not be found.',
    };
  }

  const settings = getSiteSettings();

  return {
    title: `${video.title} | ${settings.siteName}`,
    description: video.description || `Watch ${video.title} on ${settings.siteName}`,
    openGraph: {
      title: video.title,
      description: video.description || `Watch ${video.title} on ${settings.siteName}`,
      type: 'video.other',
      images: [
        {
          url: video.thumbnailUrl || '/images/placeholder-thumbnail.svg',
          width: 640,
          height: 360,
          alt: video.title,
        },
      ],
    },
    keywords: video.tags,
  };
}

/**
 * Video page component
 * Displays individual video with player, related videos, and advertisements
 */
export default function VideoPage({
  params,
}: {
  params: { shortId: string };
}) {
  const { shortId } = params;

  // Check if shortId is a reserved route
  if (isReservedShortId(shortId)) {
    notFound();
  }

  // Validate short ID format
  if (!isValidShortId(shortId)) {
    notFound();
  }

  // Get video data
  const video = getVideoById(shortId);

  // If video not found, show 404
  if (!video) {
    notFound();
  }

  // Get related videos
  const relatedVideos = getRelatedVideos(shortId, 6);

  // Get advertisements
  const inContentAds = getAdvertisementsByPosition('in-content-middle');
  const sidebarAds = getAdvertisementsByPosition('sidebar-top');

  // Get all categories for sidebar
  const categories = getAllCategories();

  const settings = getSiteSettings();

  return (
    <div className="space-y-6">
      {/* Main video content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video player and info */}
        <div className="lg:col-span-2">
          <VideoPlayer video={video} />

          {/* In-content advertisement */}
          {inContentAds.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase">
                Sponsored
              </h3>
              <AdvertisementBanner
                advertisement={inContentAds[0]}
                className="aspect-[21/9] w-full"
              />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Sidebar advertisement */}
          {sidebarAds.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase">
                Sponsored
              </h3>
              <AdvertisementBanner
                advertisement={sidebarAds[0]}
                className="aspect-square w-full"
              />
            </div>
          )}

          {/* Categories */}
          {categories.length > 0 && (
            <div
              className="p-4 rounded-xl"
              style={{
                backgroundColor: '#16213e',
                border: '1px solid #0f3460',
              }}
            >
              <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <a
                    key={category}
                    href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                    style={{
                      backgroundColor: '#1a1a2e',
                      color: '#a0a0a0',
                      border: '1px solid #0f3460',
                    }}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Video info card */}
          <div
            className="p-4 rounded-xl"
            style={{
              backgroundColor: '#16213e',
              border: '1px solid #0f3460',
            }}
          >
            <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase">
              Video Details
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Published</span>
                <span className="text-sm text-white">
                  {formatDate(video.createdAt)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Views</span>
                <span className="text-sm text-white">
                  {video.views.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Category</span>
                <span className="text-sm text-white capitalize">
                  {video.category}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Duration</span>
                <span className="text-sm text-white">{video.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related videos section */}
      {relatedVideos.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
            Related Videos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedVideos.map((relatedVideo) => (
              <VideoCard
                key={relatedVideo.id}
                video={relatedVideo}
                showDescription={false}
                showCategory={true}
                showViews={true}
              />
            ))}
          </div>
        </section>
      )}

      {/* Bottom advertisement */}
      {getAdvertisementsByPosition('bottom').length > 0 && (
        <div className="max-w-4xl mx-auto mt-8">
          <AdvertisementBanner
            advertisement={getAdvertisementsByPosition('bottom')[0]}
            className="aspect-[21/9] w-full"
          />
        </div>
      )}
    </div>
  );
}
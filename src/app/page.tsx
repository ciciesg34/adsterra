import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import VideoGrid from '@/components/video/VideoGrid';
import VideoCard from '@/components/video/VideoCard';
import CategoryFilter from '@/components/ui/CategoryFilter';
import AdvertisementBanner from '@/components/video/AdvertisementBanner';
import EmptyState from '@/components/ui/EmptyState';
import {
  getFeaturedVideos,
  getLatestVideos,
  getAllCategories,
  getPublishedVideos,
} from '@/lib/videos';
import {
  getAdvertisementsByPosition,
  getActiveAdvertisements,
  getSiteSettings,
  isMaintenanceModeEnabled,
  getMaintenanceMessage,
} from '@/lib/settings';

/**
 * Homepage metadata
 */
export const metadata: Metadata = {
  title: 'Vidnesia - Watch Amazing Videos Online',
  description: 'Discover and watch amazing videos from creators around the world. Vidnesia brings you the best content across all categories.',
  openGraph: {
    title: 'Vidnesia - Watch Amazing Videos Online',
    description: 'Discover and watch amazing videos from creators around the world.',
    type: 'website',
  },
};

/**
 * Homepage component
 * Displays featured videos, latest videos, categories, and advertisements
 */
export default function HomePage() {
  // Check maintenance mode
  if (isMaintenanceModeEnabled()) {
    return (
      <div className="py-12">
        <EmptyState
          title="Under Maintenance"
          description={getMaintenanceMessage()}
        />
      </div>
    );
  }

  // Get data
  const featuredVideos = getFeaturedVideos(4);
  const latestVideos = getLatestVideos(12);
  const categories = getAllCategories();
  const topBannerAds = getAdvertisementsByPosition('top');
  const sidebarAds = getAdvertisementsByPosition('sidebar-top');
  const allPublishedVideos = getPublishedVideos();
  const settings = getSiteSettings();

  return (
    <div className="space-y-8">
      {/* Top Banner Advertisement */}
      {topBannerAds.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <AdvertisementBanner
            advertisement={topBannerAds[0]}
            className="aspect-[21/9] w-full"
          />
        </div>
      )}

      {/* Hero Section */}
      <section className="text-center py-8">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Welcome to {settings.siteName}
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-6">
          {settings.siteDescription}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/search"
            className="px-6 py-3 rounded-lg font-semibold text-white transition-opacity"
            style={{ backgroundColor: '#e94560' }}
          >
            Browse All Videos
          </Link>
          {categories.length > 0 && (
            <Link
              href={`/category/${categories[0].toLowerCase().replace(/\s+/g, '-')}`}
              className="px-6 py-3 rounded-lg font-semibold text-gray-300 transition-colors"
              style={{ backgroundColor: '#16213e', border: '1px solid #0f3460' }}
            >
              Explore Categories
            </Link>
          )}
        </div>
      </section>

      {/* Featured Videos Section */}
      {featuredVideos.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Featured Videos
            </h2>
            <Link
              href="/search"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              View All →
            </Link>
          </div>
          <VideoGrid
            videos={featuredVideos}
            emptyMessage="No featured videos available."
          />
        </section>
      )}

      {/* Categories Section */}
      {categories.length > 0 && (
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
            Browse by Category
          </h2>
          <CategoryFilter categories={categories} />
        </section>
      )}

      {/* Main Content with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Videos */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Latest Videos
            </h2>
            <Link
              href="/search"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              View All →
            </Link>
          </div>
          <VideoGrid
            videos={latestVideos}
            emptyMessage="No videos available yet."
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Sidebar Advertisement */}
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

          {/* Popular Videos */}
          {allPublishedVideos.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase">
                Popular Videos
              </h3>
              <div className="space-y-3">
                {allPublishedVideos
                  .sort((a, b) => b.views - a.views)
                  .slice(0, 5)
                  .map((video) => (
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
          )}

          {/* Stats Section */}
          <div
            className="p-4 rounded-xl"
            style={{
              backgroundColor: '#16213e',
              border: '1px solid #0f3460',
            }}
          >
            <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase">
              Platform Stats
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Total Videos</span>
                <span className="text-sm font-semibold text-white">
                  {allPublishedVideos.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Categories</span>
                <span className="text-sm font-semibold text-white">
                  {categories.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Total Views</span>
                <span className="text-sm font-semibold text-white">
                  {allPublishedVideos.reduce((sum, video) => sum + video.views, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banner Advertisement */}
      {getAdvertisementsByPosition('bottom').length > 0 && (
        <div className="max-w-4xl mx-auto">
          <AdvertisementBanner
            advertisement={getAdvertisementsByPosition('bottom')[0]}
            className="aspect-[21/9] w-full"
          />
        </div>
      )}
    </div>
  );
}
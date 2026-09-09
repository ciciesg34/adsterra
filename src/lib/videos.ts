/**
 * Video operations for Vidnesia
 * Server-side data access layer for video management
 */

import { Video, VideoInput, SearchFilters, PaginatedResponse } from '@/types';
import videosData from '@/data/videos.json';
import {
  generateShortId,
  getCurrentISODate,
  paginateItems,
  sortVideos,
  filterVideosByQuery,
  filterVideosByCategory,
  filterVideosByTag,
  isValidShortId,
} from './utils';

// Cast JSON data to Video type
// This is safe because we validate the data structure in development
const videos: Video[] = videosData as Video[];

// ============================================
// VIDEO QUERIES
// ============================================

/**
 * Get all videos
 * @returns Array of all videos
 */
export function getAllVideos(): Video[] {
  return videos;
}

/**
 * Get all published videos
 * @returns Array of published videos
 */
export function getPublishedVideos(): Video[] {
  return videos.filter((video) => video.status === 'published');
}

/**
 * Get a video by its short ID
 * @param shortId - The short ID of the video
 * @returns The video or null if not found
 */
export function getVideoById(shortId: string): Video | null {
  if (!isValidShortId(shortId)) {
    return null;
  }
  
  return videos.find((video) => video.id === shortId) || null;
}

/**
 * Get a video by its slug (for SEO-friendly URLs)
 * @param slug - The slug of the video title
 * @returns The video or null if not found
 */
export function getVideoBySlug(slug: string): Video | null {
  const normalizedSlug = slug.toLowerCase().replace(/-/g, ' ');
  
  return videos.find((video) => {
    const videoSlug = video.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ');
    return videoSlug === normalizedSlug;
  }) || null;
}

/**
 * Get featured videos
 * @param limit - Maximum number of videos to return
 * @returns Array of featured videos
 */
export function getFeaturedVideos(limit?: number): Video[] {
  const featured = videos.filter((video) => video.featured && video.status === 'published');
  return limit ? featured.slice(0, limit) : featured;
}

/**
 * Get latest videos
 * @param limit - Maximum number of videos to return
 * @returns Array of latest videos sorted by creation date
 */
export function getLatestVideos(limit?: number): Video[] {
  const latest = sortVideos(getPublishedVideos(), 'newest', 'desc');
  return limit ? latest.slice(0, limit) : latest;
}

/**
 * Get related videos based on category and tags
 * @param videoId - The ID of the current video
 * @param limit - Maximum number of videos to return
 * @returns Array of related videos
 */
export function getRelatedVideos(videoId: string, limit: number = 6): Video[] {
  const currentVideo = getVideoById(videoId);
  if (!currentVideo) {
    return [];
  }
  
  const related = videos.filter((video) => {
    return (
      video.id !== videoId &&
      video.status === 'published' &&
      (video.category === currentVideo.category ||
        video.tags.some((tag) => currentVideo.tags.includes(tag)))
    );
  });
  
  // Sort by relevance (same category first, then shared tags)
  related.sort((a, b) => {
    const aSameCategory = a.category === currentVideo.category ? 1 : 0;
    const bSameCategory = b.category === currentVideo.category ? 1 : 0;
    
    if (aSameCategory !== bSameCategory) {
      return bSameCategory - aSameCategory;
    }
    
    const aSharedTags = a.tags.filter((tag) => currentVideo.tags.includes(tag)).length;
    const bSharedTags = b.tags.filter((tag) => currentVideo.tags.includes(tag)).length;
    
    return bSharedTags - aSharedTags;
  });
  
  return related.slice(0, limit);
}

/**
 * Search videos with filters
 * @param filters - Search filters
 * @returns Paginated search results
 */
export function searchVideos(filters: SearchFilters): PaginatedResponse<Video> {
  let results = getPublishedVideos();
  
  // Apply query filter
  if (filters.query) {
    results = filterVideosByQuery(results, filters.query);
  }
  
  // Apply category filter
  if (filters.category) {
    results = filterVideosByCategory(results, filters.category);
  }
  
  // Apply tag filter
  if (filters.tag) {
    results = filterVideosByTag(results, filters.tag);
  }
  
  // Apply sorting
  if (filters.sortBy) {
    results = sortVideos(results, filters.sortBy, 'desc');
  }
  
  // Apply pagination
  const page = filters.page || 1;
  const perPage = filters.perPage || 12;
  const paginated = paginateItems(results, page, perPage);
  
  return {
    items: paginated.items,
    total: paginated.total,
    page: paginated.page,
    totalPages: paginated.totalPages,
    perPage: paginated.perPage,
  };
}

/**
 * Get videos by category
 * @param category - The category to filter by
 * @param page - Page number for pagination
 * @param perPage - Number of items per page
 * @returns Paginated videos in the category
 */
export function getVideosByCategory(
  category: string,
  page: number = 1,
  perPage: number = 12
): PaginatedResponse<Video> {
  const filtered = filterVideosByCategory(getPublishedVideos(), category);
  const sorted = sortVideos(filtered, 'newest', 'desc');
  const paginated = paginateItems(sorted, page, perPage);
  
  return {
    items: paginated.items,
    total: paginated.total,
    page: paginated.page,
    totalPages: paginated.totalPages,
    perPage: paginated.perPage,
  };
}

/**
 * Get all categories
 * @returns Array of unique categories
 */
export function getAllCategories(): string[] {
  const categories = new Set<string>();
  videos.forEach((video) => {
    if (video.status === 'published' && video.category) {
      categories.add(video.category);
    }
  });
  return Array.from(categories).sort();
}

/**
 * Get all tags
 * @returns Array of unique tags
 */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  videos.forEach((video) => {
    if (video.status === 'published') {
      video.tags.forEach((tag) => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
}

/**
 * Get total video count
 * @returns Total number of videos
 */
export function getTotalVideoCount(): number {
  return videos.length;
}

/**
 * Get total published video count
 * @returns Total number of published videos
 */
export function getPublishedVideoCount(): number {
  return videos.filter((video) => video.status === 'published').length;
}

/**
 * Get total view count across all videos
 * @returns Total views
 */
export function getTotalViews(): number {
  return videos.reduce((sum, video) => sum + video.views, 0);
}

// ============================================
// VIDEO MUTATIONS (For Admin Use)
// ============================================

/**
 * Create a new video
 * @param input - Video input data
 * @returns The created video or null if validation fails
 */
export function createVideo(input: VideoInput): Video | null {
  // Validate required fields
  if (!input.title || !input.videoUrl || !input.category) {
    return null;
  }
  
  const now = getCurrentISODate();
  const newVideo: Video = {
    id: generateShortId(10),
    title: input.title,
    description: input.description || '',
    thumbnailUrl: input.thumbnailUrl || '/images/placeholder-thumbnail.svg',
    videoUrl: input.videoUrl,
    embedProvider: input.embedProvider || 'other',
    duration: input.duration || '00:00',
    category: input.category,
    tags: input.tags || [],
    featured: input.featured || false,
    views: 0,
    createdAt: now,
    updatedAt: now,
    status: input.status || 'published',
  };
  
  videos.push(newVideo);
  return newVideo;
}

/**
 * Update an existing video
 * @param shortId - The short ID of the video to update
 * @param updates - Partial video updates
 * @returns The updated video or null if not found
 */
export function updateVideo(shortId: string, updates: Partial<Video>): Video | null {
  const videoIndex = videos.findIndex((video) => video.id === shortId);
  
  if (videoIndex === -1) {
    return null;
  }
  
  const updatedVideo: Video = {
    ...videos[videoIndex],
    ...updates,
    id: videos[videoIndex].id, // Ensure ID doesn't change
    createdAt: videos[videoIndex].createdAt, // Ensure creation date doesn't change
    updatedAt: getCurrentISODate(),
  };
  
  videos[videoIndex] = updatedVideo;
  return updatedVideo;
}

/**
 * Delete a video by its short ID
 * @param shortId - The short ID of the video to delete
 * @returns True if deleted, false if not found
 */
export function deleteVideo(shortId: string): boolean {
  const videoIndex = videos.findIndex((video) => video.id === shortId);
  
  if (videoIndex === -1) {
    return false;
  }
  
  videos.splice(videoIndex, 1);
  return true;
}

/**
 * Increment video view count
 * @param shortId - The short ID of the video
 * @returns The updated video or null if not found
 */
export function incrementVideoViews(shortId: string): Video | null {
  const video = getVideoById(shortId);
  
  if (!video) {
    return null;
  }
  
  return updateVideo(shortId, { views: video.views + 1 });
}

// ============================================
// ADMIN VIDEO QUERIES
// ============================================

/**
 * Get all videos including drafts and archived (for admin)
 * @returns Array of all videos regardless of status
 */
export function getAllVideosForAdmin(): Video[] {
  return [...videos].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

/**
 * Get videos by status (for admin)
 * @param status - Video status to filter by
 * @returns Array of videos with the specified status
 */
export function getVideosByStatus(status: 'published' | 'draft' | 'archived'): Video[] {
  return videos.filter((video) => video.status === status);
}

/**
 * Get dashboard statistics for admin
 * @returns Statistics object
 */
export function getDashboardStats() {
  const allVideos = getAllVideosForAdmin();
  const publishedVideos = getPublishedVideos();
  
  return {
    totalVideos: allVideos.length,
    publishedVideos: publishedVideos.length,
    draftVideos: allVideos.filter((video) => video.status === 'draft').length,
    totalViews: getTotalViews(),
    totalCategories: getAllCategories().length,
    totalTags: getAllTags().length,
  };
}
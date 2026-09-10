/**
 * Admin operations for Vidnesia
 * Server-side data access layer for admin functionality
 */

import { Video, VideoInput, SiteSettings } from '@/types';
import videosData from '@/data/videos.json';
import settingsData from '@/data/settings.json';
import { generateShortId, getCurrentISODate, isValidShortId, isReservedShortId } from './utils';

// Cast JSON data to proper types
const videos: Video[] = videosData as Video[];
const settings: SiteSettings = settingsData as SiteSettings;

// ============================================
// VALIDATION FUNCTIONS
// ============================================

/**
 * Validate video input data
 * @param input - Video input data to validate
 * @returns Object with validation result and error messages
 */
export function validateVideoInput(input: VideoInput): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!input.title || input.title.trim().length === 0) {
    errors.push('Title is required.');
  }

  if (!input.videoUrl || input.videoUrl.trim().length === 0) {
    errors.push('Video URL is required.');
  }

  if (!input.category || input.category.trim().length === 0) {
    errors.push('Category is required.');
  }

  if (input.tags && !Array.isArray(input.tags)) {
    errors.push('Tags must be an array of strings.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate a short ID for video creation/update
 * @param shortId - The short ID to validate
 * @param excludeId - Optional ID to exclude from duplicate check
 * @returns Object with validation result and error messages
 */
export function validateShortId(shortId: string, excludeId?: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!shortId || shortId.trim().length === 0) {
    errors.push('Short ID is required.');
    return { valid: false, errors };
  }

  const trimmedId = shortId.trim();

  // Check length (3-10 characters)
  if (trimmedId.length < 3 || trimmedId.length > 10) {
    errors.push('Short ID must be between 3 and 10 characters.');
  }

  // Check format (alphanumeric only)
  const alphanumericPattern = /^[a-zA-Z0-9]+$/;
  if (!alphanumericPattern.test(trimmedId)) {
    errors.push('Short ID must contain only letters and numbers.');
  }

  // Check reserved routes
  if (isReservedShortId(trimmedId)) {
    errors.push('Short ID is a reserved route and cannot be used.');
  }

  // Check duplicates
  const isDuplicate = videos.some((video) => video.id === trimmedId && video.id !== excludeId);
  if (isDuplicate) {
    errors.push('Short ID already exists. Please choose a different one.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Generate a unique short ID that does not collide with existing videos
 * @param length - Length of the generated ID (default: 8)
 * @returns A unique short ID
 */
export function generateUniqueShortId(length: number = 8): string {
  let shortId = generateShortId(length);
  let attempts = 0;
  
  // Ensure uniqueness and validity
  while (
    videos.some((video) => video.id === shortId) ||
    isReservedShortId(shortId) ||
    !isValidShortId(shortId)
  ) {
    shortId = generateShortId(length);
    attempts++;
    
    // Safety check to prevent infinite loop
    if (attempts > 100) {
      break;
    }
  }
  
  return shortId;
}

// ============================================
// ADMIN VIDEO OPERATIONS
// ============================================

/**
 * Get all videos for admin (including drafts and archived)
 * @returns Array of all videos sorted by created date
 */
export function getAllVideosForAdmin(): Video[] {
  return [...videos].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

/**
 * Get a video by ID for admin
 * @param id - The video ID
 * @returns The video or null if not found
 */
export function getVideoByIdForAdmin(id: string): Video | null {
  return videos.find((video) => video.id === id) || null;
}

/**
 * Create a new video
 * @param input - Video input data
 * @param shortId - Optional short ID (will be generated if not provided)
 * @returns The created video or null if validation fails
 */
export function createVideoForAdmin(input: VideoInput, shortId?: string): Video | null {
  // Validate input
  const validation = validateVideoInput(input);
  if (!validation.valid) {
    return null;
  }

  // Determine short ID
  let finalShortId = shortId;
  if (!finalShortId) {
    finalShortId = generateUniqueShortId(8);
  }

  // Validate short ID
  const shortIdValidation = validateShortId(finalShortId);
  if (!shortIdValidation.valid) {
    return null;
  }

  const now = getCurrentISODate();
  const newVideo: Video = {
    id: finalShortId,
    title: input.title.trim(),
    description: input.description || '',
    thumbnailUrl: input.thumbnailUrl || '/images/placeholder-thumbnail.svg',
    videoUrl: input.videoUrl.trim(),
    embedProvider: input.embedProvider || 'other',
    duration: input.duration || '00:00',
    category: input.category.trim(),
    tags: input.tags || [],
    featured: input.featured || false,
    views: 0,
    createdAt: now,
    updatedAt: now,
    status: input.status || 'draft',
  };

  videos.push(newVideo);
  return newVideo;
}

/**
 * Update an existing video
 * @param id - The video ID to update
 * @param updates - Partial video updates
 * @returns The updated video or null if not found
 */
export function updateVideoForAdmin(
  id: string,
  updates: Partial<VideoInput>
): Video | null {
  const videoIndex = videos.findIndex((video) => video.id === id);
  
  if (videoIndex === -1) {
    return null;
  }

  // If short ID is being changed, validate it
  if (updates.id && updates.id !== id) {
    const shortIdValidation = validateShortId(updates.id, id);
    if (!shortIdValidation.valid) {
      return null;
    }
  }

  const updatedVideo: Video = {
    ...videos[videoIndex],
    ...updates,
    id: updates.id || videos[videoIndex].id,
    createdAt: videos[videoIndex].createdAt,
    updatedAt: getCurrentISODate(),
  };

  videos[videoIndex] = updatedVideo;
  return updatedVideo;
}

/**
 * Delete a video
 * @param id - The video ID to delete
 * @returns True if deleted, false if not found
 */
export function deleteVideoForAdmin(id: string): boolean {
  const videoIndex = videos.findIndex((video) => video.id === id);
  
  if (videoIndex === -1) {
    return false;
  }
  
  videos.splice(videoIndex, 1);
  return true;
}

/**
 * Toggle video featured status
 * @param id - The video ID
 * @returns The updated video or null if not found
 */
export function toggleFeaturedForAdmin(id: string): Video | null {
  const video = getVideoByIdForAdmin(id);
  
  if (!video) {
    return null;
  }
  
  return updateVideoForAdmin(id, { featured: !video.featured });
}

/**
 * Change video status
 * @param id - The video ID
 * @param status - New status
 * @returns The updated video or null if not found
 */
export function changeVideoStatusForAdmin(
  id: string,
  status: 'published' | 'draft' | 'archived'
): Video | null {
  const video = getVideoByIdForAdmin(id);
  
  if (!video) {
    return null;
  }
  
  return updateVideoForAdmin(id, { status });
}

/**
 * Get dashboard statistics for admin
 * @returns Statistics object
 */
export function getAdminDashboardStats() {
  const allVideos = getAllVideosForAdmin();
  const publishedVideos = allVideos.filter((video) => video.status === 'published');
  const draftVideos = allVideos.filter((video) => video.status === 'draft');
  const featuredVideos = allVideos.filter((video) => video.featured);
  const totalViews = allVideos.reduce((sum, video) => sum + video.views, 0);
  
  return {
    totalVideos: allVideos.length,
    publishedVideos: publishedVideos.length,
    draftVideos: draftVideos.length,
    featuredVideos: featuredVideos.length,
    totalViews,
    recentVideos: allVideos.slice(0, 5),
  };
}

// ============================================
// ADMIN SETTINGS OPERATIONS
// ============================================

/**
 * Get site settings for admin
 * @returns The site settings object
 */
export function getSettingsForAdmin(): SiteSettings {
  return settings;
}

/**
 * Update site settings
 * @param updates - Partial settings updates
 * @returns The updated settings
 */
export function updateSettingsForAdmin(updates: Partial<SiteSettings>): SiteSettings {
  Object.assign(settings, updates);
  return settings;
}
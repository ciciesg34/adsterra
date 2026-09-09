/**
 * Utility functions for Vidnesia
 * Shared helpers used across the application
 */

import { Video, Advertisement, SiteSettings } from '@/types';
import type { SortOrder } from '@/types';

// ============================================
// STRING UTILITIES
// ============================================

/**
 * Convert a string to a URL-friendly slug
 * @param text - The text to slugify
 * @returns The slugified string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Generate a random short ID for videos
 * @param length - The length of the ID (default: 10)
 * @returns A random alphanumeric string
 */
export function generateShortId(length: number = 10): string {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

/**
 * Generate a unique ID with timestamp prefix
 * @param prefix - Optional prefix for the ID
 * @returns A unique ID string
 */
export function generateUniqueId(prefix?: string): string {
  const timestamp = Date.now().toString(36);
  const random = generateShortId(6);
  return prefix ? `${prefix}_${timestamp}_${random}` : `${timestamp}_${random}`;
}

// ============================================
// DATE UTILITIES
// ============================================

/**
 * Format a date string to a human-readable format
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format a date string to relative time (e.g., "2 days ago")
 * @param dateString - ISO date string
 * @returns Relative time string
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Unknown time';
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
}

/**
 * Get current ISO date string
 * @returns Current date as ISO string
 */
export function getCurrentISODate(): string {
  return new Date().toISOString();
}

// ============================================
// NUMBER UTILITIES
// ============================================

/**
 * Format a number with thousands separators
 * @param num - The number to format
 * @returns Formatted number string
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

/**
 * Format view count for display (e.g., 1.2K, 3.4M)
 * @param views - The view count
 * @returns Formatted view count string
 */
export function formatViewCount(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
}

// ============================================
// ARRAY UTILITIES
// ============================================

/**
 * Sort videos by a specified criteria
 * @param videos - Array of videos to sort
 * @param sortBy - Sort criteria
 * @param order - Sort order (ascending or descending)
 * @returns Sorted array of videos
 */
export function sortVideos(
  videos: Video[],
  sortBy: 'newest' | 'oldest' | 'mostViewed' | 'title',
  order: SortOrder = 'desc'
): Video[] {
  const sorted = [...videos];
  
  switch (sortBy) {
    case 'newest':
      sorted.sort((a, b) => {
        const comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        return order === 'desc' ? -comparison : comparison;
      });
      break;
    case 'oldest':
      sorted.sort((a, b) => {
        const comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        return order === 'desc' ? comparison : -comparison;
      });
      break;
    case 'mostViewed':
      sorted.sort((a, b) => {
        const comparison = a.views - b.views;
        return order === 'desc' ? -comparison : comparison;
      });
      break;
    case 'title':
      sorted.sort((a, b) => {
        const comparison = a.title.localeCompare(b.title);
        return order === 'desc' ? -comparison : comparison;
      });
      break;
    default:
      break;
  }
  
  return sorted;
}

/**
 * Filter videos by search query
 * @param videos - Array of videos to filter
 * @param query - Search query
 * @returns Filtered array of videos
 */
export function filterVideosByQuery(videos: Video[], query: string): Video[] {
  if (!query || query.trim().length === 0) {
    return videos;
  }
  
  const searchTerm = query.toLowerCase().trim();
  
  return videos.filter((video) => {
    return (
      video.title.toLowerCase().includes(searchTerm) ||
      video.description.toLowerCase().includes(searchTerm) ||
      video.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      video.category.toLowerCase().includes(searchTerm)
    );
  });
}

/**
 * Filter videos by category
 * @param videos - Array of videos to filter
 * @param category - Category to filter by
 * @returns Filtered array of videos
 */
export function filterVideosByCategory(videos: Video[], category: string): Video[] {
  if (!category || category === 'all') {
    return videos;
  }
  
  const normalizedCategory = category.toLowerCase().replace(/-/g, ' ');
  
  return videos.filter((video) => {
    return video.category.toLowerCase().replace(/-/g, ' ') === normalizedCategory;
  });
}

/**
 * Filter videos by tag
 * @param videos - Array of videos to filter
 * @param tag - Tag to filter by
 * @returns Filtered array of videos
 */
export function filterVideosByTag(videos: Video[], tag: string): Video[] {
  if (!tag) {
    return videos;
  }
  
  const normalizedTag = tag.toLowerCase();
  
  return videos.filter((video) => {
    return video.tags.some((videoTag) => videoTag.toLowerCase() === normalizedTag);
  });
}

/**
 * Get unique categories from videos
 * @param videos - Array of videos
 * @returns Array of unique categories
 */
export function getUniqueCategories(videos: Video[]): string[] {
  const categories = new Set<string>();
  videos.forEach((video) => {
    if (video.category && video.category.trim().length > 0) {
      categories.add(video.category);
    }
  });
  return Array.from(categories).sort();
}

/**
 * Get unique tags from videos
 * @param videos - Array of videos
 * @returns Array of unique tags
 */
export function getUniqueTags(videos: Video[]): string[] {
  const tags = new Set<string>();
  videos.forEach((video) => {
    video.tags.forEach((tag) => {
      if (tag && tag.trim().length > 0) {
        tags.add(tag);
      }
    });
  });
  return Array.from(tags).sort();
}

/**
 * Paginate an array of items
 * @param items - Array of items to paginate
 * @param page - Current page (1-based)
 * @param perPage - Number of items per page
 * @returns Paginated result
 */
export function paginateItems<T>(
  items: T[],
  page: number = 1,
  perPage: number = 12
): { items: T[]; total: number; page: number; totalPages: number; perPage: number } {
  const total = items.length;
  const totalPages = Math.ceil(total / perPage) || 1;
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  
  return {
    items: items.slice(startIndex, endIndex),
    total,
    page: currentPage,
    totalPages,
    perPage,
  };
}

// ============================================
// VALIDATION UTILITIES
// ============================================

/**
 * Validate a URL string
 * @param url - The URL to validate
 * @returns True if the URL is valid
 */
export function isValidUrl(url: string): boolean {
  if (!url || url.trim().length === 0) {
    return false;
  }
  
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validate an email address
 * @param email - The email to validate
 * @returns True if the email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Truncate text to a specified length with ellipsis
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - 3) + '...';
}

// ============================================
// VIDEO EMBED UTILITIES
// ============================================

/**
 * Get the embed URL for a video based on provider
 * @param videoUrl - The original video URL
 * @param provider - The video embed provider
 * @returns Sanitized embed URL or null if invalid
 */
export function getEmbedUrl(videoUrl: string, provider: string): string | null {
  if (!videoUrl || !provider) {
    return null;
  }
  
  switch (provider) {
    case 'youtube':
      return extractYouTubeEmbedUrl(videoUrl);
    case 'vimeo':
      return extractVimeoEmbedUrl(videoUrl);
    case 'direct':
      return isValidUrl(videoUrl) ? videoUrl : null;
    case 'other':
      return isValidUrl(videoUrl) ? videoUrl : null;
    default:
      return null;
  }
}

/**
 * Extract YouTube embed URL from various YouTube URL formats
 * @param url - YouTube URL
 * @returns Embed URL or null if invalid
 */
function extractYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  
  // Handle different YouTube URL formats
  const patterns = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
    /youtu\.be\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }
  
  // If already an embed URL
  if (url.includes('/embed/')) {
    return url;
  }
  
  return null;
}

/**
 * Extract Vimeo embed URL from various Vimeo URL formats
 * @param url - Vimeo URL
 * @returns Embed URL or null if invalid
 */
function extractVimeoEmbedUrl(url: string): string | null {
  if (!url) return null;
  
  // Handle Vimeo URL formats
  const patterns = [
    /vimeo\.com\/(\d+)/,
    /vimeo\.com\/video\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://player.vimeo.com/video/${match[1]}`;
    }
  }
  
  // If already an embed URL
  if (url.includes('player.vimeo.com')) {
    return url;
  }
  
  return null;
}

// ============================================
// RESERVED ROUTES
// ============================================

const RESERVED_ROUTES = [
  'admin',
  'api',
  'search',
  'category',
  'login',
  'settings',
  'favicon.ico',
  'robots.txt',
  'sitemap.xml',
  '_next',
];

/**
 * Check if a short ID is a reserved route
 * @param shortId - The short ID to check
 * @returns True if the short ID is reserved
 */
export function isReservedShortId(shortId: string): boolean {
  const normalized = shortId.toLowerCase().trim();
  return RESERVED_ROUTES.includes(normalized);
}

/**
 * Validate a short ID
 * @param shortId - The short ID to validate
 * @returns True if the short ID is valid for a video
 */
export function isValidShortId(shortId: string): boolean {
  if (!shortId || shortId.trim().length === 0) {
    return false;
  }
  
  if (isReservedShortId(shortId)) {
    return false;
  }
  
  // Allow alphanumeric characters only
  const validPattern = /^[a-zA-Z0-9_-]+$/;
  return validPattern.test(shortId);
}

// ============================================
// MISC UTILITIES
// ============================================

/**
 * Safely get a value from an object with a default fallback
 * @param obj - The object to access
 * @param key - The key to access
 * @param defaultValue - Default value if key doesn't exist
 * @returns The value or default
 */
export function safeGet<T>(
  obj: Record<string, unknown> | null | undefined,
  key: string,
  defaultValue: T
): T {
  if (!obj || typeof obj !== 'object') {
    return defaultValue;
  }
  
  const value = obj[key];
  return value !== undefined && value !== null ? (value as T) : defaultValue;
}

/**
 * Debounce a function call
 * @param func - The function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      func(...args);
      timeout = null;
    }, wait);
  };
}

/**
 * Clamp a number between min and max values
 * @param value - The value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Get a random item from an array
 * @param items - Array of items
 * @returns Random item or null if array is empty
 */
export function getRandomItem<T>(items: T[]): T | null {
  if (!items || items.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

/**
 * Check if a value is a valid number
 * @param value - Value to check
 * @returns True if value is a valid number
 */
export function isValidNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}
/**
 * Video type definitions for Vidnesia
 * These types define the structure of video content
 */

// ============================================
// VIDEO PROVIDER & STATUS
// ============================================

export type EmbedProvider = 'youtube' | 'vimeo' | 'direct' | 'other';

export type VideoStatus = 'published' | 'draft' | 'archived';

// ============================================
// VIDEO ENTITY
// ============================================

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  embedProvider: EmbedProvider;
  duration: string;
  category: string;
  tags: string[];
  featured: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  status: VideoStatus;
}

// ============================================
// VIDEO INPUT (for create/update operations)
// ============================================

export interface VideoInput {
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  embedProvider: EmbedProvider;
  duration: string;
  category: string;
  tags: string[];
  featured: boolean;
  status: VideoStatus;
}

// ============================================
// VIDEO COLLECTION TYPES
// ============================================

export type VideosData = Video[];

// ============================================
// PAGINATION
// ============================================

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
  perPage: number;
}

export type PaginatedResponse<T> = PaginatedResult<T>;

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  className?: string;
}

// ============================================
// SEARCH FILTERS
// ============================================

export interface SearchFilters {
  query?: string;
  category?: string;
  tag?: string;
  sortBy?: 'newest' | 'oldest' | 'mostViewed' | 'title';
  page?: number;
  perPage?: number;
}

// ============================================
// VIDEO FORM DATA (for admin forms)
// ============================================

export interface VideoFormData {
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  embedProvider: EmbedProvider;
  duration: string;
  category: string;
  tags: string;
  featured: boolean;
  status: VideoStatus;
}

// ============================================
// VALIDATION
// ============================================

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface VideoValidationResult extends ValidationResult {
  video?: Video;
}

// ============================================
// RESERVED ROUTES
// ============================================

export const RESERVED_ROUTES: readonly string[] = [
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
] as const;
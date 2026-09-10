/**
 * Admin type definitions for Vidnesia
 * These types define the structure of admin authentication and API responses
 */

import type { Video } from './video';
import type { Advertisement } from './advertisement';
import type { SiteSettings } from './settings';

// ============================================
// AUTH TYPES
// ============================================

export interface AdminCredentials {
  username: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  message: string;
  token?: string;
}

export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
  message: string;
  token?: string;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

// ============================================
// ADMIN VIDEO RESPONSES
// ============================================

export interface AdminVideoListResponse {
  success: boolean;
  data: Video[];
}

export interface AdminVideoDetailResponse {
  success: boolean;
  data: Video | null;
}

export interface AdminVideoCreateResponse {
  success: boolean;
  message: string;
  data?: Video;
}

export interface AdminVideoUpdateResponse {
  success: boolean;
  message: string;
  data?: Video;
}

export interface AdminVideoDeleteResponse {
  success: boolean;
  message: string;
}

// ============================================
// ADMIN ADVERTISEMENT RESPONSES
// ============================================

export interface AdminAdvertisementListResponse {
  success: boolean;
  data: Advertisement[];
}

export interface AdminAdvertisementDetailResponse {
  success: boolean;
  data: Advertisement | null;
}

export interface AdminAdvertisementCreateResponse {
  success: boolean;
  message: string;
  data?: Advertisement;
}

export interface AdminAdvertisementUpdateResponse {
  success: boolean;
  message: string;
  data?: Advertisement;
}

export interface AdminAdvertisementDeleteResponse {
  success: boolean;
  message: string;
}

// ============================================
// ADMIN SETTINGS RESPONSES
// ============================================

export interface AdminSettingsResponse {
  success: boolean;
  data: SiteSettings;
}

// ============================================
// ADMIN DASHBOARD TYPES
// ============================================

export interface DashboardStats {
  totalVideos: number;
  publishedVideos: number;
  draftVideos: number;
  featuredVideos: number;
  totalViews: number;
  totalAdvertisements: number;
  activeAdvertisements: number;
  totalCategories: number;
  totalTags: number;
  recentVideos: Video[];
}

// ============================================
// SORT TYPES
// ============================================

export type SortOrder = 'asc' | 'desc';
/**
 * Vidnesia Type System
 * Central type definitions for the entire application
 *
 * This file contains all TypeScript types, interfaces, and constants
 * used across the Vidnesia project.
 */

// ============================================
// RESERVED ROUTES
// ============================================

/**
 * Reserved routes that cannot be used as video short IDs.
 * These routes are handled by Next.js App Router and must not
 * conflict with the dynamic [shortId] route.
 */
export const RESERVED_ROUTES = [
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

export type ReservedRoute = (typeof RESERVED_ROUTES)[number];

// ============================================
// VIDEO TYPES
// ============================================

export type EmbedProvider = 'youtube' | 'vimeo' | 'direct' | 'other';

export type VideoStatus = 'draft' | 'published' | 'archived';

export interface Video {
  id: string;
  shortId: string;
  slug: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  category: string;
  tags: string[];
  status: VideoStatus;
  featured: boolean;
  views: number;
  duration: string;
  embedProvider: EmbedProvider;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface VideoInput {
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  category: string;
  tags: string[];
  status: VideoStatus;
  featured: boolean;
  duration?: string;
  embedProvider?: EmbedProvider;
  shortId?: string;
  slug?: string;
  publishedAt?: string;
}

export interface VideoFormData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  category: string;
  tags: string;
  status: VideoStatus;
  featured: boolean;
  duration: string;
  embedProvider: EmbedProvider;
}

export type VideosData = Video[];

// ============================================
// PAGINATION TYPES
// ============================================

export interface PaginatedResult {
  videos: Video[];
  totalPages: number;
  currentPage: number;
  totalVideos?: number;
  perPage?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
  perPage: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  className?: string;
}

// ============================================
// SEARCH TYPES
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
// ADVERTISEMENT TYPES
// ============================================

export type AdvertisementType = 'banner' | 'sidebar' | 'in-content' | 'footer';

export type AdvertisementPosition =
  | 'top'
  | 'bottom'
  | 'sidebar-top'
  | 'sidebar-bottom'
  | 'in-content-middle'
  | 'footer-top';

export interface Advertisement {
  id: string;
  name: string;
  type: AdvertisementType;
  imageUrl: string;
  targetUrl: string;
  active: boolean;
  position: AdvertisementPosition;
  impressions: number;
  clicks: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdvertisementInput {
  name: string;
  type: AdvertisementType;
  imageUrl: string;
  targetUrl: string;
  active: boolean;
  position: AdvertisementPosition;
}

export interface AdvertisementFormData {
  name: string;
  type: AdvertisementType;
  imageUrl: string;
  targetUrl: string;
  active: boolean;
  position: AdvertisementPosition;
}

export type AdvertisementsData = Advertisement[];

// ============================================
// SETTINGS TYPES
// ============================================

export interface SocialLinks {
  twitter: string;
  facebook: string;
  instagram: string;
  youtube: string;
}

export interface SeoSettings {
  defaultTitle: string;
  defaultDescription: string;
  keywords: string[];
  ogImage: string;
}

export interface AnalyticsSettings {
  googleAnalyticsId: string;
  enableAnalytics: boolean;
}

export interface MaintenanceSettings {
  enabled: boolean;
  message: string;
}

export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterSettings {
  copyrightText: string;
  links: FooterLink[];
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  logoUrl: string;
  faviconUrl: string;
  socialLinks: SocialLinks;
  seo: SeoSettings;
  analytics: AnalyticsSettings;
  maintenance: MaintenanceSettings;
  footer: FooterSettings;
}

export type Settings = SiteSettings;

export interface SettingsFormData {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  logoUrl: string;
  faviconUrl: string;
  socialLinks: SocialLinks;
  seo: SeoSettings;
  analytics: AnalyticsSettings;
  maintenance: MaintenanceSettings;
  footer: FooterSettings;
}

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
// COMPONENT PROPS TYPES
// ============================================

export interface VideoCardProps {
  video: Video;
  showDescription?: boolean;
  showCategory?: boolean;
  showViews?: boolean;
  className?: string;
}

export interface VideoGridProps {
  videos: Video[];
  title?: string;
  emptyMessage?: string;
  className?: string;
}

export interface VideoEmbedProps {
  videoUrl: string;
  provider: EmbedProvider;
  title: string;
  className?: string;
}

export interface VideoPlayerProps {
  video: Video;
  onEnded?: () => void;
  autoplay?: boolean;
  className?: string;
}

export interface VideoShareProps {
  video: Video;
  className?: string;
}

export interface VideoRelatedProps {
  videos: Video[];
  currentVideoId: string;
  className?: string;
}

export interface VideoCategoryBadgeProps {
  category: string;
  className?: string;
}

export interface VideoViewsCounterProps {
  views: number;
  className?: string;
}

export interface SearchBarProps {
  initialQuery?: string;
  onSearch?: (query: string) => void;
  className?: string;
  placeholder?: string;
}

export interface CategoryFilterProps {
  categories: string[];
  activeCategory?: string;
  onSelect?: (category: string) => void;
  className?: string;
}

export interface AdvertisementBannerProps {
  advertisement: Advertisement;
  className?: string;
  onClick?: (advertisement: Advertisement) => void;
}

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

// ============================================
// LAYOUT COMPONENT PROPS
// ============================================

export interface HeaderProps {
  siteName: string;
  logoUrl?: string;
  className?: string;
}

export interface FooterProps {
  settings: SiteSettings;
  className?: string;
}

export interface AdminSidebarProps {
  activePage?: 'dashboard' | 'videos' | 'advertisements' | 'settings';
  className?: string;
}

export interface AdminHeaderProps {
  title: string;
  description?: string;
  onLogout?: () => void;
  className?: string;
}

// ============================================
// UTILITY TYPES
// ============================================

export type SortOrder = 'asc' | 'desc';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface VideoValidationResult extends ValidationResult {
  video?: Video;
}

export interface AdvertisementValidationResult extends ValidationResult {
  advertisement?: Advertisement;
}
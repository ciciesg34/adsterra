/**
 * Vidnesia Type System
 * Central type definitions for the entire application
 */

// ============================================
// VIDEO TYPES
// ============================================

export type EmbedProvider = 'youtube' | 'vimeo' | 'direct' | 'other';

export type VideoStatus = 'published' | 'draft' | 'archived';

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
// ADVERTISEMENT TYPES
// ============================================

export type AdvertisementType = 'banner' | 'sidebar' | 'in-content' | 'footer';

export type AdvertisementPosition = 'top' | 'bottom' | 'sidebar-top' | 'sidebar-bottom' | 'in-content-middle' | 'footer-top';

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

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
  perPage: number;
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

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
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
// ADMIN DASHBOARD TYPES
// ============================================

export interface DashboardStats {
  totalVideos: number;
  publishedVideos: number;
  draftVideos: number;
  totalViews: number;
  totalAdvertisements: number;
  activeAdvertisements: number;
  totalCategories: number;
  totalTags: number;
}

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

export interface AdvertisementFormData {
  name: string;
  type: AdvertisementType;
  imageUrl: string;
  targetUrl: string;
  active: boolean;
  position: AdvertisementPosition;
}

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

// ============================================
// EXPORT ALL TYPES
// ============================================

export type {
  VideoCardProps as VideoCardPropsType,
  VideoGridProps as VideoGridPropsType,
  VideoEmbedProps as VideoEmbedPropsType,
  VideoPlayerProps as VideoPlayerPropsType,
  VideoShareProps as VideoSharePropsType,
  VideoRelatedProps as VideoRelatedPropsType,
  VideoCategoryBadgeProps as VideoCategoryBadgePropsType,
  VideoViewsCounterProps as VideoViewsCounterPropsType,
  PaginationProps as PaginationPropsType,
  SearchBarProps as SearchBarPropsType,
  CategoryFilterProps as CategoryFilterPropsType,
  AdvertisementBannerProps as AdvertisementBannerPropsType,
  HeaderProps as HeaderPropsType,
  FooterProps as FooterPropsType,
  AdminSidebarProps as AdminSidebarPropsType,
  AdminHeaderProps as AdminHeaderPropsType,
  ConfirmDialogProps as ConfirmDialogPropsType,
  ModalProps as ModalPropsType,
  ToastProps as ToastPropsType,
  LoadingSpinnerProps as LoadingSpinnerPropsType,
  EmptyStateProps as EmptyStatePropsType,
  DashboardStats as DashboardStatsType,
  VideoFormData as VideoFormDataType,
  AdvertisementFormData as AdvertisementFormDataType,
  SettingsFormData as SettingsFormDataType,
  SortOrder as SortOrderType,
  ValidationResult as ValidationResultType,
  VideoValidationResult as VideoValidationResultType,
  AdvertisementValidationResult as AdvertisementValidationResultType,
};
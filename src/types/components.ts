/**
 * Component prop types for Vidnesia
 * These types define the props for all React components
 */

import type { Video } from './video';
import type { Advertisement } from './advertisement';
import type { SiteSettings } from './settings';

// ============================================
// VIDEO COMPONENT PROPS
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
  provider: 'youtube' | 'vimeo' | 'direct' | 'other';
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

// ============================================
// UI COMPONENT PROPS
// ============================================

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
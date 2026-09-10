/**
 * Settings type definitions for Vidnesia
 * These types define the structure of site settings and related configurations
 */

// ============================================
// SOCIAL LINKS
// ============================================

export interface SocialLinks {
  twitter: string;
  facebook: string;
  instagram: string;
  youtube: string;
}

// ============================================
// SEO SETTINGS
// ============================================

export interface SeoSettings {
  defaultTitle: string;
  defaultDescription: string;
  keywords: string[];
  ogImage: string;
}

// ============================================
// ANALYTICS SETTINGS
// ============================================

export interface AnalyticsSettings {
  googleAnalyticsId: string;
  enableAnalytics: boolean;
}

// ============================================
// MAINTENANCE SETTINGS
// ============================================

export interface MaintenanceSettings {
  enabled: boolean;
  message: string;
}

// ============================================
// FOOTER SETTINGS
// ============================================

export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterSettings {
  copyrightText: string;
  links: FooterLink[];
}

// ============================================
// SITE SETTINGS
// ============================================

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
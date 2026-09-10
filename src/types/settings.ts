/**
 * Settings type definitions for Vidnesia
 * These types define the structure of site settings
 */

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
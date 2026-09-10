/**
 * Advertisement type definitions for Vidnesia
 * These types define the structure of advertisement content
 */

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

// ============================================
// ADVERTISEMENT ENTITY
// ============================================

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

// ============================================
// ADVERTISEMENT INPUT
// ============================================

export interface AdvertisementInput {
  name: string;
  type: AdvertisementType;
  imageUrl: string;
  targetUrl: string;
  active: boolean;
  position: AdvertisementPosition;
}

// ============================================
// ADVERTISEMENT COLLECTION
// ============================================

export type AdvertisementsData = Advertisement[];

// ============================================
// ADVERTISEMENT FORM DATA
// ============================================

export interface AdvertisementFormData {
  name: string;
  type: AdvertisementType;
  imageUrl: string;
  targetUrl: string;
  active: boolean;
  position: AdvertisementPosition;
}

// ============================================
// ADVERTISEMENT VALIDATION
// ============================================

export interface AdvertisementValidationResult {
  valid: boolean;
  errors: string[];
  advertisement?: Advertisement;
}
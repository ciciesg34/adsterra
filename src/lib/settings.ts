/**
 * Settings operations for Vidnesia
 * Server-side data access layer for site settings and advertisements
 */

import { SiteSettings, Advertisement, AdvertisementInput } from '@/types';
import settingsData from '@/data/settings.json';
import advertisementsData from '@/data/advertisements.json';
import { generateUniqueId, getCurrentISODate } from './utils';

// Cast JSON data to proper types
const settings: SiteSettings = settingsData as SiteSettings;
const advertisements: Advertisement[] = advertisementsData as Advertisement[];

// ============================================
// SETTINGS OPERATIONS
// ============================================

/**
 * Get site settings
 * @returns The site settings object
 */
export function getSiteSettings(): SiteSettings {
  return settings;
}

/**
 * Update site settings
 * @param updates - Partial settings updates
 * @returns The updated settings
 */
export function updateSiteSettings(updates: Partial<SiteSettings>): SiteSettings {
  Object.assign(settings, updates);
  return settings;
}

/**
 * Get site name
 * @returns The site name
 */
export function getSiteName(): string {
  return settings.siteName || 'Vidnesia';
}

/**
 * Get site description
 * @returns The site description
 */
export function getSiteDescription(): string {
  return settings.siteDescription || '';
}

/**
 * Get SEO settings
 * @returns SEO settings object
 */
export function getSeoSettings() {
  return settings.seo;
}

/**
 * Check if maintenance mode is enabled
 * @returns True if maintenance mode is enabled
 */
export function isMaintenanceModeEnabled(): boolean {
  return settings.maintenance.enabled;
}

/**
 * Get maintenance message
 * @returns The maintenance message
 */
export function getMaintenanceMessage(): string {
  return settings.maintenance.message || 'We are currently performing scheduled maintenance.';
}

/**
 * Get social links
 * @returns Social links object
 */
export function getSocialLinks() {
  return settings.socialLinks;
}

/**
 * Get footer settings
 * @returns Footer settings object
 */
export function getFooterSettings() {
  return settings.footer;
}

// ============================================
// ADVERTISEMENT OPERATIONS
// ============================================

/**
 * Get all advertisements
 * @returns Array of all advertisements
 */
export function getAllAdvertisements(): Advertisement[] {
  return advertisements;
}

/**
 * Get active advertisements
 * @returns Array of active advertisements
 */
export function getActiveAdvertisements(): Advertisement[] {
  return advertisements.filter((ad) => ad.active);
}

/**
 * Get advertisements by type
 * @param type - Advertisement type
 * @returns Array of advertisements of the specified type
 */
export function getAdvertisementsByType(
  type: 'banner' | 'sidebar' | 'in-content' | 'footer'
): Advertisement[] {
  return advertisements.filter((ad) => ad.type === type && ad.active);
}

/**
 * Get advertisements by position
 * @param position - Advertisement position
 * @returns Array of advertisements at the specified position
 */
export function getAdvertisementsByPosition(
  position: 'top' | 'bottom' | 'sidebar-top' | 'sidebar-bottom' | 'in-content-middle' | 'footer-top'
): Advertisement[] {
  return advertisements.filter((ad) => ad.position === position && ad.active);
}

/**
 * Get an advertisement by ID
 * @param id - Advertisement ID
 * @returns The advertisement or null if not found
 */
export function getAdvertisementById(id: string): Advertisement | null {
  return advertisements.find((ad) => ad.id === id) || null;
}

/**
 * Create a new advertisement
 * @param input - Advertisement input data
 * @returns The created advertisement or null if validation fails
 */
export function createAdvertisement(input: AdvertisementInput): Advertisement | null {
  // Validate required fields
  if (!input.name || !input.imageUrl || !input.targetUrl) {
    return null;
  }
  
  const now = getCurrentISODate();
  const newAdvertisement: Advertisement = {
    id: generateUniqueId('ad'),
    name: input.name,
    type: input.type,
    imageUrl: input.imageUrl,
    targetUrl: input.targetUrl,
    active: input.active ?? true,
    position: input.position,
    impressions: 0,
    clicks: 0,
    createdAt: now,
    updatedAt: now,
  };
  
  advertisements.push(newAdvertisement);
  return newAdvertisement;
}

/**
 * Update an existing advertisement
 * @param id - Advertisement ID
 * @param updates - Partial advertisement updates
 * @returns The updated advertisement or null if not found
 */
export function updateAdvertisement(
  id: string,
  updates: Partial<Advertisement>
): Advertisement | null {
  const adIndex = advertisements.findIndex((ad) => ad.id === id);
  
  if (adIndex === -1) {
    return null;
  }
  
  const updatedAd: Advertisement = {
    ...advertisements[adIndex],
    ...updates,
    id: advertisements[adIndex].id,
    createdAt: advertisements[adIndex].createdAt,
    updatedAt: getCurrentISODate(),
  };
  
  advertisements[adIndex] = updatedAd;
  return updatedAd;
}

/**
 * Delete an advertisement by ID
 * @param id - Advertisement ID
 * @returns True if deleted, false if not found
 */
export function deleteAdvertisement(id: string): boolean {
  const adIndex = advertisements.findIndex((ad) => ad.id === id);
  
  if (adIndex === -1) {
    return false;
  }
  
  advertisements.splice(adIndex, 1);
  return true;
}

/**
 * Increment advertisement impression count
 * @param id - Advertisement ID
 * @returns The updated advertisement or null if not found
 */
export function incrementAdImpression(id: string): Advertisement | null {
  const ad = getAdvertisementById(id);
  
  if (!ad) {
    return null;
  }
  
  return updateAdvertisement(id, { impressions: ad.impressions + 1 });
}

/**
 * Increment advertisement click count
 * @param id - Advertisement ID
 * @returns The updated advertisement or null if not found
 */
export function incrementAdClick(id: string): Advertisement | null {
  const ad = getAdvertisementById(id);
  
  if (!ad) {
    return null;
  }
  
  return updateAdvertisement(id, { clicks: ad.clicks + 1 });
}
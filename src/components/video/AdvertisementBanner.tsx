'use client';

import React from 'react';
import { AdvertisementBannerProps } from '@/types';

/**
 * AdvertisementBanner component
 * Displays advertisement banners with click tracking
 */
export default function AdvertisementBanner({
  advertisement,
  className = '',
  onClick,
}: AdvertisementBannerProps) {
  if (!advertisement || !advertisement.active) {
    return null;
  }

  const handleClick = () => {
    if (onClick) {
      onClick(advertisement);
    }
    
    // Open target URL in new tab
    if (advertisement.targetUrl) {
      window.open(advertisement.targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl cursor-pointer ${className}`}
      onClick={handleClick}
      role="button"
      aria-label={`Advertisement: ${advertisement.name}`}
    >
      <img
        src={advertisement.imageUrl}
        alt={advertisement.name}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          // Hide advertisement if image fails to load
          const target = e.target as HTMLImageElement;
          const parent = target.parentElement;
          if (parent) {
            parent.style.display = 'none';
          }
        }}
      />
      
      {/* Advertisement label */}
      <div
        className="absolute top-2 right-2 px-2 py-1 rounded text-xs text-white"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }}
      >
        Ad
      </div>
    </div>
  );
}
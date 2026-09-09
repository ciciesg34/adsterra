import React from 'react';
import Link from 'next/link';
import { VideoCategoryBadgeProps } from '@/types';
import { slugify } from '@/lib/utils';

/**
 * VideoCategoryBadge component
 * Displays a category badge that links to the category page
 */
export default function VideoCategoryBadge({
  category,
  className = '',
}: VideoCategoryBadgeProps) {
  if (!category) {
    return null;
  }

  const categorySlug = slugify(category);

  return (
    <Link
      href={`/category/${categorySlug}`}
      className={`inline-block px-2 py-1 rounded-full text-xs font-medium transition-colors ${className}`}
      style={{
        backgroundColor: '#0f3460',
        color: '#e94560',
        border: '1px solid #e94560',
      }}
    >
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </Link>
  );
}
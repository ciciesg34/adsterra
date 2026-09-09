'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CategoryFilterProps } from '@/types';
import { slugify } from '@/lib/utils';

/**
 * CategoryFilter component
 * Displays category navigation for filtering videos
 */
export default function CategoryFilter({
  categories,
  activeCategory,
  onSelect,
  className = '',
}: CategoryFilterProps) {
  const pathname = usePathname();

  const isCategoryActive = (category: string): boolean => {
    if (activeCategory) {
      return activeCategory === category;
    }
    
    if (pathname) {
      const pathCategory = pathname.split('/').pop();
      if (pathCategory) {
        return pathCategory.replace(/-/g, ' ') === category;
      }
    }
    
    return false;
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`} role="navigation" aria-label="Category filter">
      <Link
        href="/"
        className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
        style={{
          backgroundColor: activeCategory === undefined && pathname === '/' ? '#e94560' : '#16213e',
          color: activeCategory === undefined && pathname === '/' ? '#ffffff' : '#a0a0a0',
          border: '1px solid #0f3460',
        }}
      >
        All
      </Link>
      
      {categories.map((category) => {
        const active = isCategoryActive(category);
        const categorySlug = slugify(category);
        
        return (
          <Link
            key={category}
            href={`/category/${categorySlug}`}
            onClick={(e) => {
              if (onSelect) {
                e.preventDefault();
                onSelect(category);
              }
            }}
            className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
            style={{
              backgroundColor: active ? '#e94560' : '#16213e',
              color: active ? '#ffffff' : '#a0a0a0',
              border: '1px solid #0f3460',
            }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Link>
        );
      })}
    </div>
  );
}
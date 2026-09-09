import React from 'react';
import Link from 'next/link';
import { HeaderProps } from '@/types';
import SearchBar from '@/components/ui/SearchBar';
import { getAllCategories } from '@/lib/videos';

/**
 * Header component
 * Displays the site header with logo, navigation, and search
 */
export default function Header({
  siteName,
  logoUrl,
  className = '',
}: HeaderProps) {
  const categories = getAllCategories();

  return (
    <header
      className={`sticky top-0 z-50 ${className}`}
      style={{
        backgroundColor: '#1a1a2e',
        borderBottom: '1px solid #0f3460',
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between py-3 gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 flex-shrink-0"
            aria-label={siteName}
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={siteName}
                className="w-8 h-8 rounded"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            ) : (
              <div
                className="w-8 h-8 rounded flex items-center justify-center"
                style={{
                  backgroundColor: '#e94560',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                }}
              >
                V
              </div>
            )}
            <span className="text-lg font-bold text-white hidden sm:block">
              {siteName}
            </span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-xl">
            <SearchBar placeholder="Search videos..." />
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-2 flex-shrink-0" aria-label="Main navigation">
            <Link
              href="/"
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/search"
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Browse
            </Link>
            <Link
              href="/admin/login"
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
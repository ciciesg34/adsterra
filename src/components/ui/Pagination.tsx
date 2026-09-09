import React from 'react';
import Link from 'next/link';
import { PaginationProps } from '@/types';

/**
 * Pagination component
 * Displays page navigation for paginated content
 */
export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  className = '',
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const getPageUrl = (page: number): string => {
    if (page === 1) {
      return baseUrl;
    }
    
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}page=${page}`;
  };

  const getVisiblePages = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      if (startPage > 2) {
        pages.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav
      className={`flex items-center justify-center gap-2 py-4 ${className}`}
      aria-label="Pagination"
    >
      {/* Previous button */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{
            backgroundColor: '#16213e',
            color: '#ffffff',
          }}
          aria-label="Previous page"
        >
          Previous
        </Link>
      ) : (
        <span
          className="px-3 py-2 rounded-lg text-sm font-medium cursor-not-allowed opacity-50"
          style={{
            backgroundColor: '#16213e',
            color: '#666666',
          }}
        >
          Previous
        </span>
      )}

      {/* Page numbers */}
      {visiblePages.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-2 text-sm text-gray-400"
            >
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        return (
          <Link
            key={`page-${pageNumber}`}
            href={getPageUrl(pageNumber)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive ? 'text-white' : 'text-gray-300'
            }`}
            style={{
              backgroundColor: isActive ? '#e94560' : '#16213e',
            }}
            aria-current={isActive ? 'page' : undefined}
          >
            {pageNumber}
          </Link>
        );
      })}

      {/* Next button */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{
            backgroundColor: '#16213e',
            color: '#ffffff',
          }}
          aria-label="Next page"
        >
          Next
        </Link>
      ) : (
        <span
          className="px-3 py-2 rounded-lg text-sm font-medium cursor-not-allowed opacity-50"
          style={{
            backgroundColor: '#16213e',
            color: '#666666',
          }}
        >
          Next
        </span>
      )}
    </nav>
  );
}
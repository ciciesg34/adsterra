'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { SearchBarProps } from '@/types';

/**
 * SearchBar component
 * Provides search functionality with navigation to search results
 */
export default function SearchBar({
  initialQuery = '',
  onSearch,
  className = '',
  placeholder = 'Search videos...',
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const trimmedQuery = query.trim();
    
    if (trimmedQuery.length === 0) {
      return;
    }
    
    if (onSearch) {
      onSearch(trimmedQuery);
    } else {
      // Default behavior: navigate to search page
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center gap-2 ${className}`}
      role="search"
      aria-label="Search videos"
    >
      <div className="relative flex-1">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 pl-10 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all"
          style={{
            backgroundColor: '#16213e',
            border: '1px solid #0f3460',
          }}
          aria-label="Search query"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      
      <button
        type="submit"
        className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
        style={{
          backgroundColor: '#e94560',
        }}
        aria-label="Search"
      >
        Search
      </button>
    </form>
  );
}
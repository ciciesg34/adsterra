import React from 'react';
import { EmptyStateProps } from '@/types';

/**
 * EmptyState component
 * Displays a message when no content is available
 */
export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}
    >
      <div
        className="w-16 h-16 mb-4 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: '#1a1a2e',
          border: '2px solid #0f3460',
        }}
      >
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      
      {description && (
        <p className="text-gray-400 mb-6 max-w-md">{description}</p>
      )}
      
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 rounded-lg font-medium transition-colors"
          style={{
            backgroundColor: '#e94560',
            color: 'white',
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
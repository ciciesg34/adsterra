import React from 'react';
import { LoadingSpinnerProps } from '@/types';

/**
 * LoadingSpinner component
 * Displays a loading animation
 */
export default function LoadingSpinner({
  size = 'medium',
  className = '',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4',
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.medium;

  return (
    <div className={`flex justify-center items-center ${className}`} role="status" aria-label="Loading">
      <div
        className={`${spinnerSize} border-gray-300 border-t-blue-600 rounded-full animate-spin`}
        style={{
          borderTopColor: '#e94560',
        }}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
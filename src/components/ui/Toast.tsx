'use client';

import React, { useEffect } from 'react';
import { ToastProps } from '@/types';

/**
 * Toast component
 * Displays temporary notification messages
 */
export default function Toast({
  message,
  type = 'info',
  isVisible,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) {
    return null;
  }

  const typeStyles = {
    success: {
      backgroundColor: '#10b981',
      color: '#ffffff',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    error: {
      backgroundColor: '#ef4444',
      color: '#ffffff',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
    },
    info: {
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  };

  const currentType = typeStyles[type] || typeStyles.info;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg"
      style={{
        backgroundColor: currentType.backgroundColor,
        color: currentType.color,
      }}
      role="alert"
      aria-live="polite"
    >
      {currentType.icon}
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 p-1 rounded hover:bg-white hover:bg-opacity-20 transition-colors"
        aria-label="Close notification"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
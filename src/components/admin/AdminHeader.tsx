'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdminHeaderProps } from '@/types';

/**
 * AdminHeader component
 * Displays the admin header with title and logout button
 */
export default function AdminHeader({
  title,
  description,
  onLogout,
  className = '',
}: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Default logout behavior
      document.cookie = 'vidnesia_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      router.push('/admin/login');
    }
  };

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 ${className}`}
    >
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {description && (
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        )}
      </div>
      
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-300 transition-colors self-start sm:self-auto"
        style={{
          backgroundColor: '#16213e',
          border: '1px solid #0f3460',
        }}
        aria-label="Logout"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Logout
      </button>
    </div>
  );
}
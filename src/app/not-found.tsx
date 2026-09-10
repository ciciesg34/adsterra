import React from 'react';
import Link from 'next/link';
import EmptyState from '@/components/ui/EmptyState';

/**
 * Global 404 Not Found page
 * Displayed when no route matches the requested URL
 */
export default function NotFound() {
  return (
    <div className="py-12">
      <EmptyState
        title="404 - Page Not Found"
        description="The page you are looking for does not exist or has been moved. Please check the URL or navigate back to the homepage."
        actionLabel="Go to Homepage"
        onAction={() => {
          // This is a server component, so we use Link instead
          // The action will be handled by the Link below
        }}
      />
      
      <div className="text-center mt-4">
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-lg font-semibold text-white transition-opacity"
          style={{ backgroundColor: '#e94560' }}
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
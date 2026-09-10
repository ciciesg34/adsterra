import React from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import AdminSidebar from '@/components/admin/AdminSidebar';

/**
 * Admin layout component
 * Protects admin routes and provides admin layout structure
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check authentication server-side
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('vidnesia_admin_session');

  if (!sessionCookie || !sessionCookie.value) {
    redirect('/admin/login');
  }

  // Validate session token
  const token = sessionCookie.value;
  if (!isTokenValid(token)) {
    redirect('/admin/login');
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <AdminSidebar />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}

/**
 * Basic token validation
 */
function isTokenValid(token: string): boolean {
  if (!token || token.trim().length === 0) {
    return false;
  }
  
  // Token should be a non-empty string with underscores (matching our auth token format)
  const validPattern = /^[a-z0-9_]+$/i;
  return validPattern.test(token);
}
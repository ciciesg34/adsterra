import React from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import { getAdminDashboardStats } from '@/lib/admin';

/**
 * Admin dashboard page
 * Displays overview statistics and quick actions
 */
export default function AdminDashboardPage() {
  const stats = getAdminDashboardStats();

  const statCards = [
    {
      label: 'Total Videos',
      value: stats.totalVideos,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      color: '#3b82f6',
    },
    {
      label: 'Published Videos',
      value: stats.publishedVideos,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      color: '#10b981',
    },
    {
      label: 'Draft Videos',
      value: stats.draftVideos,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      color: '#f59e0b',
    },
    {
      label: 'Featured Videos',
      value: stats.featuredVideos,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      color: '#e94560',
    },
  ];

  return (
    <div>
      <AdminHeader
        title="Dashboard"
        description="Overview of your video platform"
      />

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-xl"
            style={{
              backgroundColor: '#16213e',
              border: '1px solid #0f3460',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">{stat.label}</span>
              <span style={{ color: stat.color }}>{stat.icon}</span>
            </div>
            <span className="text-2xl font-bold text-white">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/videos/new"
            className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity"
            style={{ backgroundColor: '#e94560' }}
          >
            + Add New Video
          </Link>
          <Link
            href="/admin/videos"
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 transition-colors"
            style={{
              backgroundColor: '#16213e',
              border: '1px solid #0f3460',
            }}
          >
            Manage Videos
          </Link>
          <Link
            href="/admin/settings"
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 transition-colors"
            style={{
              backgroundColor: '#16213e',
              border: '1px solid #0f3460',
            }}
          >
            Settings
          </Link>
        </div>
      </div>

      {/* Recent videos */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Recent Videos</h2>
        <div
          className="rounded-xl overflow-hidden"
          style={{
            backgroundColor: '#16213e',
            border: '1px solid #0f3460',
          }}
        >
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #0f3460' }}>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                  Featured
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                  Created
                </th>
              </tr>
            </thead>
            <tbody>
              {stats.recentVideos.map((video) => (
                <tr key={video.id} style={{ borderBottom: '1px solid #0f3460' }}>
                  <td className="px-4 py-3 text-sm text-white">{video.title}</td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor:
                          video.status === 'published'
                            ? 'rgba(16, 185, 129, 0.2)'
                            : video.status === 'draft'
                            ? 'rgba(245, 158, 11, 0.2)'
                            : 'rgba(107, 114, 128, 0.2)',
                        color:
                          video.status === 'published'
                            ? '#10b981'
                            : video.status === 'draft'
                            ? '#f59e0b'
                            : '#6b7280',
                      }}
                    >
                      {video.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">
                    {video.featured ? 'Yes' : 'No'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">
                    {new Date(video.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
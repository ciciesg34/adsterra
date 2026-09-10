import React from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import { getAllVideosForAdmin } from '@/lib/admin';

/**
 * Admin videos list page
 * Displays all videos with management options
 */
export default function AdminVideosPage() {
  const videos = getAllVideosForAdmin();

  return (
    <div>
      <AdminHeader
        title="Video Management"
        description="Manage all videos on your platform"
      />

      {/* Add video button */}
      <div className="mb-6">
        <Link
          href="/admin/videos/new"
          className="inline-block px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity"
          style={{ backgroundColor: '#e94560' }}
        >
          + Add New Video
        </Link>
      </div>

      {/* Videos table */}
      {videos.length === 0 ? (
        <div
          className="p-8 rounded-xl text-center"
          style={{
            backgroundColor: '#16213e',
            border: '1px solid #0f3460',
          }}
        >
          <p className="text-gray-400">No videos found.</p>
          <Link
            href="/admin/videos/new"
            className="inline-block mt-4 px-4 py-2 rounded-lg text-sm font-medium text-white"
            style={{ backgroundColor: '#e94560' }}
          >
            Create Your First Video
          </Link>
        </div>
      ) : (
        <div
          className="rounded-xl overflow-hidden"
          style={{
            backgroundColor: '#16213e',
            border: '1px solid #0f3460',
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #0f3460' }}>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                    ID
                  </th>
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {videos.map((video) => (
                  <tr key={video.id} style={{ borderBottom: '1px solid #0f3460' }}>
                    <td className="px-4 py-3 text-sm text-gray-400">{video.id}</td>
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
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/videos/${video.id}/edit`}
                          className="px-3 py-1 rounded text-xs font-medium text-white transition-colors"
                          style={{ backgroundColor: '#3b82f6' }}
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/${video.id}`}
                          target="_blank"
                          className="px-3 py-1 rounded text-xs font-medium text-gray-300 transition-colors"
                          style={{ backgroundColor: '#10b981' }}
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import VideoForm from '@/components/admin/VideoForm';
import { VideoFormData } from '@/types';

/**
 * Admin create video page
 * Provides form for creating a new video
 */
export default function AdminCreateVideoPage() {
  const router = useRouter();

  const handleSave = async (data: VideoFormData, shortId?: string) => {
    try {
      const response = await fetch('/api/admin/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          tags: data.tags.split(',').map((tag) => tag.trim()).filter((tag) => tag.length > 0),
          shortId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        router.push('/admin/videos');
      } else {
        alert(result.message || 'Failed to create video.');
      }
    } catch {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <AdminHeader
        title="Create New Video"
        description="Add a new video to your platform"
      />

      <div
        className="p-6 rounded-xl"
        style={{
          backgroundColor: '#16213e',
          border: '1px solid #0f3460',
        }}
      >
        <VideoForm onSave={handleSave} />
      </div>
    </div>
  );
}
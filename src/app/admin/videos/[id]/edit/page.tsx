'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import VideoForm from '@/components/admin/VideoForm';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Video, VideoFormData } from '@/types';

/**
 * Convert a comma-separated tags string into an array of strings.
 */
function parseTagsInput(tagsInput: string): string[] {
  if (!tagsInput || typeof tagsInput !== 'string') {
    return [];
  }

  return tagsInput
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
}

/**
 * Admin edit video page
 * Provides form for editing an existing video
 */
export default function AdminEditVideoPage() {
  const router = useRouter();
  const params = useParams();
  const videoId = params.id as string;

  const [video, setVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`/api/admin/videos/${videoId}`);
        const result = await response.json();

        if (result.success && result.data) {
          setVideo(result.data);
        } else {
          setError('Video not found.');
        }
      } catch {
        setError('Failed to load video.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  const handleSave = async (data: VideoFormData, shortId?: string) => {
    try {
      // Convert tags string to array before sending to API
      const tagsArray = parseTagsInput(data.tags);

      const response = await fetch(`/api/admin/videos/${videoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          tags: tagsArray,
          shortId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        router.push('/admin/videos');
      } else {
        alert(result.message || 'Failed to update video.');
      }
    } catch {
      alert('An error occurred. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this video?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/videos/${videoId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        router.push('/admin/videos');
      } else {
        alert(result.message || 'Failed to delete video.');
      }
    } catch {
      alert('An error occurred. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div>
        <AdminHeader title="Edit Video" />
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !video) {
    return (
      <div>
        <AdminHeader title="Edit Video" />
        <div
          className="p-6 rounded-xl text-center"
          style={{
            backgroundColor: '#16213e',
            border: '1px solid #0f3460',
          }}
        >
          <p className="text-gray-400">{error || 'Video not found.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader
        title="Edit Video"
        description={`Editing: ${video.title}`}
      />

      <div
        className="p-6 rounded-xl"
        style={{
          backgroundColor: '#16213e',
          border: '1px solid #0f3460',
        }}
      >
        <VideoForm video={video} onSave={handleSave} />

        <div className="mt-6 pt-4 border-t" style={{ borderTopColor: '#0f3460' }}>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity"
            style={{ backgroundColor: '#ef4444' }}
          >
            Delete Video
          </button>
        </div>
      </div>
    </div>
  );
}
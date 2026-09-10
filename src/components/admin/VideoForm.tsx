'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { VideoFormData, Video, EmbedProvider, VideoStatus } from '@/types';

/**
 * VideoForm component
 * Reusable form for creating and editing videos
 */
export default function VideoForm({
  video,
  onSave,
  onCancel,
}: {
  video?: Video | null;
  onSave?: (data: VideoFormData, shortId?: string) => void;
  onCancel?: () => void;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState<VideoFormData>({
    title: video?.title || '',
    description: video?.description || '',
    thumbnailUrl: video?.thumbnailUrl || '',
    videoUrl: video?.videoUrl || '',
    embedProvider: video?.embedProvider || 'youtube',
    duration: video?.duration || '',
    category: video?.category || '',
    tags: video?.tags ? video.tags.join(', ') : '',
    featured: video?.featured || false,
    status: video?.status || 'draft',
  });
  const [shortId, setShortId] = useState(video?.id || '');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.title.trim()) {
      setError('Title is required.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.videoUrl.trim()) {
      setError('Video URL is required.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.category.trim()) {
      setError('Category is required.');
      setIsSubmitting(false);
      return;
    }

    // Parse tags
    const tagsArray = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const finalData: VideoFormData = {
      ...formData,
      tags: tagsArray.join(', '),
    };

    if (onSave) {
      onSave(finalData, shortId || undefined);
    }
    
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.push('/admin/videos');
    }
  };

  const embedProviders: { value: EmbedProvider; label: string }[] = [
    { value: 'youtube', label: 'YouTube' },
    { value: 'vimeo', label: 'Vimeo' },
    { value: 'direct', label: 'Direct Link' },
    { value: 'other', label: 'Other' },
  ];

  const statusOptions: { value: VideoStatus; label: string }[] = [
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' },
    { value: 'archived', label: 'Archived' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div
          className="p-3 rounded-lg text-sm"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid #ef4444',
            color: '#ef4444',
          }}
        >
          {error}
        </div>
      )}

      {/* Short ID */}
      <div>
        <label htmlFor="shortId">Short ID</label>
        <input
          type="text"
          id="shortId"
          name="shortId"
          value={shortId}
          onChange={(e) => setShortId(e.target.value)}
          placeholder="Leave empty to auto-generate"
          className="mt-1"
        />
        <p className="text-xs text-gray-500 mt-1">
          Leave empty to auto-generate. Must be 3-10 alphanumeric characters.
        </p>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter video title"
          required
          className="mt-1"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter video description"
          rows={4}
          className="mt-1"
        />
      </div>

      {/* Video URL */}
      <div>
        <label htmlFor="videoUrl">Video URL *</label>
        <input
          type="url"
          id="videoUrl"
          name="videoUrl"
          value={formData.videoUrl}
          onChange={handleChange}
          placeholder="https://www.youtube.com/watch?v=..."
          required
          className="mt-1"
        />
      </div>

      {/* Thumbnail URL */}
      <div>
        <label htmlFor="thumbnailUrl">Thumbnail URL</label>
        <input
          type="url"
          id="thumbnailUrl"
          name="thumbnailUrl"
          value={formData.thumbnailUrl}
          onChange={handleChange}
          placeholder="https://example.com/thumbnail.jpg"
          className="mt-1"
        />
      </div>

      {/* Embed Provider */}
      <div>
        <label htmlFor="embedProvider">Embed Provider</label>
        <select
          id="embedProvider"
          name="embedProvider"
          value={formData.embedProvider}
          onChange={handleChange}
          className="mt-1"
        >
          {embedProviders.map((provider) => (
            <option key={provider.value} value={provider.value}>
              {provider.label}
            </option>
          ))}
        </select>
      </div>

      {/* Duration */}
      <div>
        <label htmlFor="duration">Duration</label>
        <input
          type="text"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="10:24"
          className="mt-1"
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category">Category *</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="tutorial"
          required
          className="mt-1"
        />
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="tutorial, getting-started, guide"
          className="mt-1"
        />
        <p className="text-xs text-gray-500 mt-1">
          Separate tags with commas.
        </p>
      </div>

      {/* Status */}
      <div>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1"
        >
          {statusOptions.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      {/* Featured */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
          className="w-4 h-4"
        />
        <label htmlFor="featured" className="mb-0">
          Featured Video
        </label>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity disabled:opacity-50"
          style={{ backgroundColor: '#e94560' }}
        >
          {isSubmitting ? 'Saving...' : video ? 'Update Video' : 'Create Video'}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 transition-colors"
          style={{
            backgroundColor: '#16213e',
            border: '1px solid #0f3460',
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
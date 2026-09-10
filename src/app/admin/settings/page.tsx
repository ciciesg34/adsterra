'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { SiteSettings } from '@/types';

/**
 * Admin settings page
 * Provides form for managing site settings
 */
export default function AdminSettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/admin/settings');
        const result = await response.json();

        if (result.success && result.data) {
          setSettings(result.data);
        } else {
          setError('Failed to load settings.');
        }
      } catch {
        setError('Failed to load settings.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!settings) return;

    setError('');
    setIsSaving(true);

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      const result = await response.json();

      if (result.success) {
        alert('Settings updated successfully.');
      } else {
        setError(result.message || 'Failed to update settings.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        <AdminHeader title="Settings" />
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error && !settings) {
    return (
      <div>
        <AdminHeader title="Settings" />
        <div
          className="p-6 rounded-xl text-center"
          style={{
            backgroundColor: '#16213e',
            border: '1px solid #0f3460',
          }}
        >
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!settings) {
    return null;
  }

  return (
    <div>
      <AdminHeader
        title="Settings"
        description="Manage your website settings"
      />

      <div
        className="p-6 rounded-xl"
        style={{
          backgroundColor: '#16213e',
          border: '1px solid #0f3460',
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
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

          <div>
            <label htmlFor="siteName">Site Name</label>
            <input
              type="text"
              id="siteName"
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
              className="mt-1"
              required
            />
          </div>

          <div>
            <label htmlFor="siteUrl">Site URL</label>
            <input
              type="url"
              id="siteUrl"
              name="siteUrl"
              value={settings.siteUrl}
              onChange={handleChange}
              className="mt-1"
              required
            />
          </div>

          <div>
            <label htmlFor="siteDescription">Site Description</label>
            <textarea
              id="siteDescription"
              name="siteDescription"
              value={settings.siteDescription}
              onChange={handleChange}
              rows={4}
              className="mt-1"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity disabled:opacity-50"
            style={{ backgroundColor: '#e94560' }}
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </form>
      </div>
    </div>
  );
}
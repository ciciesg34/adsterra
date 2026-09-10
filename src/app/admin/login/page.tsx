'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Admin login page
 * Provides authentication form for admin access
 */
export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate credentials client-side (basic check)
      if (!username.trim() || !password.trim()) {
        setError('Username and password are required.');
        setIsLoading(false);
        return;
      }

      // In a real implementation, this would call an API endpoint
      // For now, we validate against environment variables server-side
      // by calling an API route
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (result.success) {
        // Set session cookie
        document.cookie = `vidnesia_admin_session=${result.token}; path=/; max-age=86400; SameSite=Strict`;
        router.push('/admin');
      } else {
        setError(result.message || 'Invalid username or password.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div
          className="p-6 rounded-xl"
          style={{
            backgroundColor: '#16213e',
            border: '1px solid #0f3460',
          }}
        >
          <div className="text-center mb-6">
            <div
              className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
              style={{
                backgroundColor: '#e94560',
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '1.25rem',
              }}
            >
              V
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Login</h1>
            <p className="text-sm text-gray-400 mt-1">
              Sign in to access the dashboard
            </p>
          </div>

          {error && (
            <div
              className="p-3 rounded-lg text-sm mb-4"
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid #ef4444',
                color: '#ef4444',
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                autoComplete="username"
                required
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                required
                className="mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity disabled:opacity-50"
              style={{ backgroundColor: '#e94560' }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t text-center" style={{ borderTopColor: '#0f3460' }}>
            <a
              href="/"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
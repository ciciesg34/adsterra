/**
 * Authentication utilities for Vidnesia
 * Simple credential-based authentication for admin access
 */

import { AdminCredentials, AuthResult } from '@/types';

// ============================================
// AUTH CONSTANTS
// ============================================

const AUTH_TOKEN_KEY = 'vidnesia_admin_token';
const AUTH_SESSION_KEY = 'vidnesia_admin_session';
const SESSION_TIMEOUT_MS = 24 * 60 * 60 * 1000; // 24 hours

// ============================================
// CREDENTIAL VALIDATION
// ============================================

/**
 * Validate admin credentials against environment variables
 * @param credentials - Admin credentials to validate
 * @returns Auth result with success status and token if valid
 */
export function validateAdminCredentials(credentials: AdminCredentials): AuthResult {
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
  if (!credentials.username || !credentials.password) {
    return {
      success: false,
      message: 'Username and password are required.',
    };
  }
  
  if (credentials.username !== adminUsername || credentials.password !== adminPassword) {
    return {
      success: false,
      message: 'Invalid username or password.',
    };
  }
  
  const token = generateAuthToken();
  
  return {
    success: true,
    message: 'Authentication successful.',
    token,
  };
}

/**
 * Generate a simple auth token
 * @returns A unique token string
 */
function generateAuthToken(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 15);
  const random2 = Math.random().toString(36).substring(2, 15);
  return `${timestamp}_${random}_${random2}`;
}

// ============================================
// SESSION MANAGEMENT (Client-side)
// ============================================

/**
 * Check if the user is authenticated (client-side)
 * @returns True if the user has a valid session
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') {
    return false; // Server-side: no session available
  }
  
  const session = getSession();
  return session !== null;
}

/**
 * Set the authentication session (client-side)
 * @param token - The auth token
 */
export function setAuthSession(token: string): void {
  if (typeof window === 'undefined') {
    return; // Server-side: cannot set session
  }
  
  const session = {
    token,
    expiresAt: Date.now() + SESSION_TIMEOUT_MS,
  };
  
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

/**
 * Get the current authentication session (client-side)
 * @returns Session object or null if no valid session
 */
export function getSession(): { token: string; expiresAt: number } | null {
  if (typeof window === 'undefined') {
    return null; // Server-side: no session available
  }
  
  const sessionJson = localStorage.getItem(AUTH_SESSION_KEY);
  if (!sessionJson) {
    return null;
  }
  
  try {
    const session = JSON.parse(sessionJson);
    
    // Check if session has expired
    if (Date.now() > session.expiresAt) {
      clearAuthSession();
      return null;
    }
    
    return session;
  } catch {
    clearAuthSession();
    return null;
  }
}

/**
 * Get the auth token (client-side)
 * @returns The auth token or null if not authenticated
 */
export function getAuthToken(): string | null {
  const session = getSession();
  return session ? session.token : null;
}

/**
 * Clear the authentication session (client-side)
 */
export function clearAuthSession(): void {
  if (typeof window === 'undefined') {
    return; // Server-side: cannot clear session
  }
  
  localStorage.removeItem(AUTH_SESSION_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

/**
 * Check if auth token is valid (can be used server-side with token parameter)
 * @param token - The auth token to validate
 * @returns True if the token is valid
 */
export function isTokenValid(token: string): boolean {
  if (!token || token.trim().length === 0) {
    return false;
  }
  
  // Basic validation: token should be a non-empty string with underscores
  const validPattern = /^[a-z0-9_]+$/i;
  return validPattern.test(token);
}

// ============================================
// LOGIN/LOGOUT HELPERS
// ============================================

/**
 * Attempt to log in with credentials (client-side)
 * @param username - Admin username
 * @param password - Admin password
 * @returns Auth result with success status
 */
export function login(username: string, password: string): AuthResult {
  const result = validateAdminCredentials({ username, password });
  
  if (result.success && result.token) {
    setAuthSession(result.token);
  }
  
  return result;
}

/**
 * Log out the current admin (client-side)
 */
export function logout(): void {
  clearAuthSession();
}

/**
 * Require authentication for a page (client-side)
 * @returns True if user should be redirected to login
 */
export function requireAuth(): boolean {
  return !isAuthenticated();
}
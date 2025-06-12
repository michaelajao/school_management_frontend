/**
 * Secure Storage Utility
 * Handles secure storage of authentication tokens and sensitive data
 * Uses httpOnly cookies for tokens, localStorage only for non-sensitive data
 */

import { AuthResponse, User } from './api/auth';

interface SecureStorageOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  maxAge?: number; // in seconds
}

export class SecureStorage {
  private static readonly TOKEN_KEY = 'auth_token';
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private static readonly USER_DATA_KEY = 'user_data';
  private static readonly SCHOOL_CONFIG_KEY = 'school_config';

  /**
   * Store authentication tokens securely
   * Tokens go to httpOnly cookies, user data to localStorage (non-sensitive)
   */
  static storeAuthData(authResponse: AuthResponse): void {
    try {
      // Store tokens in httpOnly cookies via API route
      if (typeof window !== 'undefined') {
        this.setSecureCookie(this.TOKEN_KEY, authResponse.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 2, // 2 hours
        });

        this.setSecureCookie(this.REFRESH_TOKEN_KEY, authResponse.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        // Store non-sensitive user data in localStorage
        const safeUserData = {
          id: authResponse.user.id,
          email: authResponse.user.email,
          firstName: authResponse.user.firstName,
          lastName: authResponse.user.lastName,
          role: authResponse.user.role,
          schoolId: authResponse.user.schoolId,
        };

        localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(safeUserData));
      }
    } catch (error) {
      console.error('Failed to store auth data securely:', error);
      throw new Error('Authentication storage failed');
    }
  }

  /**
   * Get stored user data (non-sensitive only)
   */
  static getStoredUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const userData = localStorage.getItem(this.USER_DATA_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      return null;
    }
  }

  /**
   * Get authentication token from secure cookie
   * This will be handled by the API route in practice
   */
  static async getStoredToken(): Promise<string | null> {
    if (typeof window === 'undefined') return null;
    
    try {
      // In production, this would read from httpOnly cookie via API route
      const response = await fetch('/api/auth/get-token', {
        method: 'GET',
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.token || null;
      }
      
      return null;
    } catch (error) {
      console.error('Failed to get stored token:', error);
      return null;
    }
  }

  /**
   * Clear all authentication data
   */
  static clearAuthData(): void {
    if (typeof window === 'undefined') return;

    try {
      // Clear localStorage
      localStorage.removeItem(this.USER_DATA_KEY);
      
      // Clear cookies via API route
      this.clearSecureCookie(this.TOKEN_KEY);
      this.clearSecureCookie(this.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to clear auth data:', error);
    }
  }

  /**
   * Store school configuration (non-sensitive branding data)
   */
  static storeSchoolConfig(config: {
    schoolName?: string;
    primaryColor?: string;
    logoUrl?: string;
    [key: string]: any;
  }): void {
    if (typeof window === 'undefined') return;

    try {
      // This is non-sensitive branding data, safe for localStorage
      localStorage.setItem(this.SCHOOL_CONFIG_KEY, JSON.stringify(config));
    } catch (error) {
      console.error('Failed to store school config:', error);
    }
  }

  /**
   * Get school configuration
   */
  static getSchoolConfig(): any {
    if (typeof window === 'undefined') return null;

    try {
      const config = localStorage.getItem(this.SCHOOL_CONFIG_KEY);
      return config ? JSON.parse(config) : null;
    } catch (error) {
      console.error('Failed to get school config:', error);
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  static async isAuthenticated(): Promise<boolean> {
    const token = await this.getStoredToken();
    const user = this.getStoredUser();
    return !!(token && user);
  }

  /**
   * Set secure cookie via API route
   * In production, this would call an API route that sets httpOnly cookies
   */
  private static async setSecureCookie(
    name: string, 
    value: string, 
    options: SecureStorageOptions
  ): Promise<void> {
    try {
      await fetch('/api/auth/set-cookie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, value, options }),
        credentials: 'include',
      });
    } catch (error) {
      console.error(`Failed to set secure cookie ${name}:`, error);
      // Fallback to regular cookie for development
      if (process.env.NODE_ENV !== 'production') {
        document.cookie = `${name}=${value}; path=/; ${options.secure ? 'secure;' : ''} samesite=${options.sameSite || 'lax'}`;
      }
    }
  }

  /**
   * Clear secure cookie via API route
   */
  private static async clearSecureCookie(name: string): Promise<void> {
    try {
      await fetch('/api/auth/clear-cookie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
        credentials: 'include',
      });
    } catch (error) {
      console.error(`Failed to clear secure cookie ${name}:`, error);
      // Fallback for development
      if (process.env.NODE_ENV !== 'production') {
        document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }
    }
  }
}

/**
 * Migration utility to move existing localStorage tokens to secure storage
 * Call this once during app initialization
 */
export function migrateToSecureStorage(): void {
  if (typeof window === 'undefined') return;

  try {
    const oldToken = localStorage.getItem('auth_token');
    const oldRefreshToken = localStorage.getItem('refresh_token');
    const oldUserData = localStorage.getItem('user_data');

    if (oldToken && oldRefreshToken && oldUserData) {
      const userData = JSON.parse(oldUserData);
      
      // Create auth response format for migration
      const authResponse: AuthResponse = {
        accessToken: oldToken,
        refreshToken: oldRefreshToken,
        user: userData,
      };

      // Store securely
      SecureStorage.storeAuthData(authResponse);
      
      // Remove old insecure storage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      // Keep user_data but it will be sanitized in the new format
      
      console.log('Successfully migrated to secure storage');
    }
  } catch (error) {
    console.error('Failed to migrate to secure storage:', error);
  }
}
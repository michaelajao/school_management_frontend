/**
 * Centralized API error handling and common API patterns
 * Eliminates duplicate API logic across components
 */

/**
 * Standard API response structure
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string>;
}

/**
 * Common API error class
 */
export class ApiError extends Error {
  public statusCode: number;
  public errors?: Record<string, string>;

  constructor(message: string, statusCode: number = 500, errors?: Record<string, string>) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

/**
 * Enhanced fetch with consistent error handling
 */
export async function apiRequest<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    let responseData: any;
    let responseText: string;

    try {
      responseText = await response.text();
      responseData = responseText ? JSON.parse(responseText) : {};
    } catch (parseError) {
      console.error('Failed to parse response:', parseError);
      responseData = { message: `Server error (${response.status}): ${responseText}` };
    }

    if (!response.ok) {
      throw new ApiError(
        responseData.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        responseData.errors
      );
    }

    return {
      success: true,
      data: responseData,
      message: responseData.message,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Network or other errors
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error occurred',
      0
    );
  }
}

/**
 * Common API endpoints
 */
export const API_ENDPOINTS = {
  // Authentication
  CREATE_SCHOOL_ADMIN: '/api/auth/create-school-admin',
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  FORGOT_PASSWORD: '/api/auth/forgot-password',
  RESET_PASSWORD: '/api/auth/reset-password',
  
  // Users
  USERS: '/api/users',
  USER_BY_ID: (id: string) => `/api/users/${id}`,
  
  // Classes
  CLASSES: '/api/classes',
  CLASS_BY_ID: (id: string) => `/api/classes/${id}`,
} as const;

/**
 * Common API methods
 */
export const apiMethods = {
  // Generic CRUD operations
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return apiRequest<T>(endpoint, { method: 'GET' });
  },

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return apiRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return apiRequest<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return apiRequest<T>(endpoint, { method: 'DELETE' });
  },

  // Authentication specific
  async createSchoolAdmin(data: any): Promise<ApiResponse> {
    return this.post(API_ENDPOINTS.CREATE_SCHOOL_ADMIN, data);
  },

  async login(credentials: any): Promise<ApiResponse> {
    return this.post(API_ENDPOINTS.LOGIN, credentials);
  },

  async forgotPassword(email: string): Promise<ApiResponse> {
    return this.post(API_ENDPOINTS.FORGOT_PASSWORD, { email });
  },

  async resetPassword(token: string, password: string): Promise<ApiResponse> {
    return this.post(API_ENDPOINTS.RESET_PASSWORD, { token, password });
  },
};

/**
 * Error handling utility for components
 */
export function handleApiError(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
}

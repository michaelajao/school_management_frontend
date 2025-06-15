// Base API service for handling HTTP requests
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  error?: string;
}

class BaseApiService {
  private instance: AxiosInstance;
  private baseURL: string;

  constructor() {
    // Determine base URL based on environment
    this.baseURL = this.getBaseURL();
    
    this.instance = axios.create({
      baseURL: this.baseURL,
      timeout: 30000, // 30 seconds
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private getBaseURL(): string {
    if (typeof window === 'undefined') {
      // Server-side
      return process.env.RAILWAY_BACKEND_URL || 'http://localhost:4000';
    }

    // Client-side
    if (process.env.NODE_ENV === 'production') {
      return process.env.NEXT_PUBLIC_API_URL || 'https://schoolmanagementbackend-production-be10.up.railway.app';
    }
    
    return 'http://localhost:4000';
  }

  private setupInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add tenant/school context if available
        const schoolId = this.getSchoolId();
        if (schoolId) {
          config.headers['X-School-ID'] = schoolId;
        }

        console.log(`🌐 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        console.log(`✅ API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error(`❌ API Error: ${error.response?.status} ${error.config?.url}`, error.response?.data);

        // Handle specific error cases
        if (error.response?.status === 401) {
          this.handleUnauthorized();
        }

        if (error.response?.status === 403) {
          this.handleForbidden();
        }

        if (error.response?.status >= 500) {
          this.handleServerError(error);
        }

        return Promise.reject(error);
      }
    );
  }

  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    try {
      // Try to get from localStorage first
      const token = localStorage.getItem('auth_token');
      if (token) return token;

      // Fallback to cookies
      const cookies = document.cookie.split(';');
      const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth_token='));
      return authCookie ? authCookie.split('=')[1] : null;
    } catch (error) {
      console.error('Failed to get auth token:', error);
      return null;
    }
  }

  private getSchoolId(): string | null {
    if (typeof window === 'undefined') return null;
    
    try {
      return localStorage.getItem('school_id');
    } catch (error) {
      console.error('Failed to get school ID:', error);
      return null;
    }
  }

  private handleUnauthorized() {
    if (typeof window !== 'undefined') {
      // Clear auth data
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      
      // Redirect to login
      window.location.href = '/auth/signin';
    }
  }

  private handleForbidden() {
    console.warn('Access forbidden - insufficient permissions');
    // Could show a toast notification here
  }

  private handleServerError(error: any) {
    console.error('Server error occurred:', error);
    // Could show a toast notification here
  }

  // Generic request methods
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance.get(url, config);
      return {
        data: response.data,
        success: true,
      };
    } catch (error: any) {
      return this.handleError<T>(error);
    }
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance.post(url, data, config);
      return {
        data: response.data,
        success: true,
      };
    } catch (error: any) {
      return this.handleError<T>(error);
    }
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance.put(url, data, config);
      return {
        data: response.data,
        success: true,
      };
    } catch (error: any) {
      return this.handleError<T>(error);
    }
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance.patch(url, data, config);
      return {
        data: response.data,
        success: true,
      };
    } catch (error: any) {
      return this.handleError<T>(error);
    }
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance.delete(url, config);
      return {
        data: response.data,
        success: true,
      };
    } catch (error: any) {
      return this.handleError<T>(error);
    }
  }

  private handleError<T>(error: any): ApiResponse<T> {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    
    return {
      data: null as T,
      success: false,
      error: message,
      message,
    };
  }

  // Utility methods
  setAuthToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  removeAuthToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  setSchoolId(schoolId: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('school_id', schoolId);
    }
  }

  // File upload helper
  async uploadFile<T = any>(url: string, file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await this.instance.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(progress);
          }
        },
      });

      return {
        data: response.data,
        success: true,
      };
    } catch (error: any) {
      return this.handleError<T>(error);
    }
  }

  // Batch requests helper
  async batch<T = any>(requests: Array<() => Promise<ApiResponse<any>>>): Promise<ApiResponse<T[]>> {
    try {
      const results = await Promise.allSettled(requests.map(req => req()));
      
      const data = results.map((result, index) => {
        if (result.status === 'fulfilled') {
          return result.value.data;
        } else {
          console.error(`Batch request ${index} failed:`, result.reason);
          return null;
        }
      });

      return {
        data: data as T[],
        success: true,
      };
    } catch (error: any) {
      return this.handleError<T[]>(error);
    }
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.get('/health');
      return response.success;
    } catch (error) {
      return false;
    }
  }

  // Get instance for advanced usage
  getInstance(): AxiosInstance {
    return this.instance;
  }
}

// Export singleton instance
export const ApiService = new BaseApiService();
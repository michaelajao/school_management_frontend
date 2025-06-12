import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  statusCode: number;
}

class ApiClient {
  private client: AxiosInstance;
  private static instance: ApiClient;
  constructor() {
    this.client = axios.create({
      baseURL: '/api/proxy', // Use proxy API route for security
      timeout: 30000, // Increased timeout for proxy
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Include cookies for auth
    });

    this.setupInterceptors();
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  private setupInterceptors() {
    // Request interceptor - auth token is now handled by proxy via httpOnly cookies
    this.client.interceptors.request.use(
      (config) => {
        // No need to manually add auth token - proxy handles it via cookies
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        
        // Token expired handling (status 401)
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          // Don't try to refresh if we're already on the auth endpoints
          const isAuthEndpoint = originalRequest.url?.includes('/auth/') || false;
          const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;
          
          // Attempt token refresh if we have a refresh token and not on auth endpoints
          if (refreshToken && !isAuthEndpoint) {
            try {              const { AuthApiService } = await import('./auth');
              const response = await AuthApiService.refreshToken();
              
              // Update auth token in axios headers
              this.setAuthToken(response.accessToken);
              originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
              
              // Retry the original request with new token
              return this.client(originalRequest);
            } catch (refreshError) {
              // Refresh token failed, clear tokens and redirect to login
              console.error('Token refresh failed:', refreshError);
              this.clearStoredToken();
              
              if (typeof window !== 'undefined') {
                window.location.href = '/auth/signin';
              }
            }
          } else {
            // No refresh token or on auth endpoint, clear tokens and redirect
            this.clearStoredToken();
            
            if (typeof window !== 'undefined') {
              window.location.href = '/auth/signin';
            }
          }
        }
        
        const apiError: ApiError = {
          message: error.response?.data?.message || error.message || 'An error occurred',
          statusCode: error.response?.status || 500,
          error: error.response?.data?.error,
        };
        
        return Promise.reject(apiError);
      }
    );
  }

  private getStoredToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  private clearStoredToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  }

  public setAuthToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }
  // Generic HTTP methods
  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<ApiResponse<T>>(url, config);
    return (response.data as any).data || response.data as T;
  }

  public async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    return (response.data as any).data || response.data as T;
  }

  public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    return (response.data as any).data || response.data as T;
  }

  public async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<ApiResponse<T>>(url, data, config);
    return (response.data as any).data || response.data as T;
  }

  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
    return (response.data as any).data || response.data as T;
  }
}

export const apiClient = ApiClient.getInstance();

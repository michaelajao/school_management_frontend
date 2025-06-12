import axios, { AxiosInstance } from 'axios';

// Mock API client for testing frontend without backend
class MockApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: '/api/mock-auth', // Use our mock endpoints
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log('Mock API Request:', config.method?.toUpperCase(), config.url);
        return config;
      },
      (error) => {
        console.error('Mock API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log('Mock API Response:', response.status, response.data);
        return response.data;
      },
      (error) => {
        console.error('Mock API Response Error:', error);
        throw error;
      }
    );
  }

  async get<T = any>(url: string, config?: any): Promise<T> {
    return this.client.get(url, config);
  }

  async post<T = any>(url: string, data?: any, config?: any): Promise<T> {
    return this.client.post(url, data, config);
  }

  async put<T = any>(url: string, data?: any, config?: any): Promise<T> {
    return this.client.put(url, data, config);
  }

  async patch<T = any>(url: string, data?: any, config?: any): Promise<T> {
    return this.client.patch(url, data, config);
  }

  async delete<T = any>(url: string, config?: any): Promise<T> {
    return this.client.delete(url, config);
  }

  setAuthToken(token: string) {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  removeAuthToken() {
    delete this.client.defaults.headers.common['Authorization'];
  }
}

export const mockApiClient = new MockApiClient();
import axios from 'axios';
import { config } from '@/lib/config';

const api = axios.create({
  baseURL: config.apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for tenant context
api.interceptors.request.use(
  (config) => {
    // Add school context from subdomain or query params
    const schoolId = getSchoolContext();
    if (schoolId) {
      config.headers['X-School-Id'] = schoolId;
    }

    // Add low-bandwidth header for African networks
    if (typeof navigator !== 'undefined') {
      const connection = (navigator as any).connection;
      if (connection && (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g')) {
        config.headers['X-Low-Bandwidth'] = 'true';
      }
    }

    // Add environment header
    config.headers['X-Environment'] = process.env.NEXT_PUBLIC_ENVIRONMENT || 'staging';

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (config.features.debugging) {
      console.error('API Error:', error.response?.data || error.message);
    }
    
    if (error.response?.status === 401) {
      // Handle authentication errors
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/signin';
      }
    }
    
    if (error.response?.status >= 500) {
      // Log server errors for monitoring
      console.error('Server error:', error.response.data);
    }
    
    return Promise.reject(error);
  }
);

function getSchoolContext(): string | null {
  // Extract school from subdomain
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const subdomain = hostname.split('.')[0];
    
    // Skip www and common subdomains
    if (subdomain && !['www', 'app', 'staging', 'localhost'].includes(subdomain)) {
      return subdomain;
    }
  }
  
  return null;
}

export default api;

import axios from 'axios';

// Configuration based on environment
const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  environment: (process.env.NEXT_PUBLIC_ENVIRONMENT as 'development' | 'staging' | 'production') || 'development',
  features: {
    pwa: process.env.NEXT_PUBLIC_ENABLE_PWA === 'true',
    offline: process.env.NEXT_PUBLIC_ENABLE_OFFLINE === 'true',
    analytics: process.env.NEXT_PUBLIC_ENVIRONMENT === 'production',
    debugging: process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production',
  },
};

// Create axios instance
const api = axios.create({
  baseURL: config.apiUrl,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for tenant context and performance optimization
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

    // Add environment context
    config.headers['X-Environment'] = process.env.NEXT_PUBLIC_ENVIRONMENT || 'development';

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle authentication errors
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/signin';
      }
    }
    
    if (error.response?.status >= 500) {
      // Log server errors for monitoring
      if (config.features.debugging) {
        console.error('Server error:', error.response.data);
      }
    }
    
    return Promise.reject(error);
  }
);

// Utility function to extract school context from URL
function getSchoolContext(): string | null {
  if (typeof window === 'undefined') return null;
  
  const hostname = window.location.hostname;
  const subdomain = hostname.split('.')[0];
  
  // Skip common subdomains
  if (subdomain && !['www', 'app', 'staging', 'localhost'].includes(subdomain)) {
    return subdomain;
  }
  
  // Check query parameters as fallback
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('school') || null;
}

// Network quality detection for African markets
export const getNetworkQuality = (): 'excellent' | 'good' | 'poor' | 'offline' => {
  if (typeof navigator === 'undefined') return 'good';
  
  const connection = (navigator as any).connection;
  if (!connection) return 'good';
  
  const { effectiveType, downlink } = connection;
  
  if (!navigator.onLine) return 'offline';
  if (downlink < 0.15 || effectiveType === 'slow-2g') return 'poor';
  if (downlink < 1.5 || effectiveType === '2g' || effectiveType === '3g') return 'good';
  
  return 'excellent';
};

export { config, api };
export default api;

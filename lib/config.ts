interface AppConfig {
  apiUrl: string;
  appUrl: string;
  environment: 'development' | 'staging' | 'production';
  features: {
    pwa: boolean;
    offline: boolean;
    analytics: boolean;
    debugging: boolean;
  };
}

export const config: AppConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000', // School management backend
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  environment: (process.env.NEXT_PUBLIC_ENVIRONMENT as any) || 'development',
  features: {
    pwa: process.env.NEXT_PUBLIC_ENABLE_PWA === 'true',
    offline: process.env.NEXT_PUBLIC_ENABLE_OFFLINE === 'true',
    analytics: process.env.NEXT_PUBLIC_ENVIRONMENT === 'production',
    debugging: process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production',
  },
};

// Network quality detection for African markets
export const getNetworkQuality = (): 'excellent' | 'good' | 'poor' | 'offline' => {
  if (typeof navigator === 'undefined') return 'good';
  
  const connection = (navigator as any).connection;
  if (!connection) return 'good';
  
  const { effectiveType, downlink } = connection;
  
  if (downlink < 0.15 || effectiveType === 'slow-2g') return 'poor';
  if (downlink < 1.5 || effectiveType === '2g' || effectiveType === '3g') return 'good';
  
  return 'excellent';
};

export default config;

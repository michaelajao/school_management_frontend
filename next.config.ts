import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable strict mode for development
  reactStrictMode: true,
  
  // Enable ESLint during build for code quality
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // Enable TypeScript checking during build
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Turbopack configuration (moved from experimental.turbo)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  
  // Security headers for production
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
  ],

  // Allow cross-origin requests from network IP
  allowedDevOrigins: [
    'http://192.168.0.85:3000',
    'http://localhost:3000',
  ],
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 
                         process.env.NODE_ENV === 'production' 
                           ? 'https://schoolmanagementbackend-production-be10.up.railway.app'
                           : 'http://localhost:4000',
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 
                              process.env.NODE_ENV === 'production' 
                                ? 'https://schoolmanagementbackend-production-be10.up.railway.app'
                                : 'http://localhost:4000',
  },
  
  // Image optimization for Docker
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  
  // Headers for API integration
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

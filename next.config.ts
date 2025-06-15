import type { NextConfig } from "next";
// @ts-ignore
const withPWA = require('next-pwa');

const nextConfig: NextConfig = {
  // Enable strict mode for better error detection
  reactStrictMode: true,
  
  // Railway deployment is handled by server.js
  
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
  
  // Security headers for production and API integration
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
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Note: unsafe-eval needed for Next.js dev
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https:",
            "font-src 'self' data:",
            "connect-src 'self' " + (process.env.NODE_ENV === 'production' 
              ? (process.env.RAILWAY_BACKEND_URL || 'https://schoolmanagementbackend-production-be10.up.railway.app')
              : 'http://localhost:4000'),
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'",
          ].join('; '),
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(), payment=()',
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains; preload',
        },
      ],
    },
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
  ],

  // Allow cross-origin requests from network IP
  allowedDevOrigins: [
    'http://192.168.0.85:3000',
    'http://localhost:3000',
  ],
  
  // Remove exposed environment variables - API URLs are now handled server-side
  
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
};

// Configure PWA settings
const pwaConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: false, // We'll register manually for better control
  sw: '/sw.js',
  scope: '/',
  reloadOnOnline: true,
  fallbacks: {
    document: '/offline',
  },
  cacheStartUrl: true,
  dynamicStartUrl: false,
  cacheOnFrontEndNav: true,
  subdomainPrefix: undefined,
  skipWaiting: false,
  clientsClaim: false,
  disableDevLogs: true,
});

export default pwaConfig(nextConfig);

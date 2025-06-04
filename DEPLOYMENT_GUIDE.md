# School Management System - Complete Deployment Guide

## Overview

This guide covers deployment for both frontend (Next.js) and backend (NestJS) components of the multi-tenant school management system.

## Prerequisites

- Node.js >= 18
- PostgreSQL database
- Git repository access

## Backend Deployment

### Option 1: Railway (Recommended for staging)

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and Initialize:**
   ```bash
   railway login
   cd ../school_management_backend
   railway init
   ```

3. **Set Environment Variables:**
   ```bash
   railway add DATABASE_URL
   railway add JWT_SECRET
   railway add NODE_ENV=staging
   railway add PORT=4000
   railway add CORS_ORIGIN=https://your-frontend-url.com
   ```

4. **Deploy:**
   ```bash
   railway up
   ```

### Option 2: Render (Production Ready)

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Use the following build settings:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`
   - Environment: Node

### Option 3: Vercel (Serverless)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy from backend directory:
   ```bash
   cd ../school_management_backend
   vercel --prod
   ```

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

3. **Environment Variables:**
   Set these in Vercel dashboard:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   NEXT_PUBLIC_APP_URL=https://your-frontend-url.com
   ```

### Option 2: Netlify

1. Connect GitHub repository to Netlify
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
NODE_ENV=staging
PORT=4000
CORS_ORIGIN=https://your-frontend-url.com

# Optional for production
REDIS_URL=redis://localhost:6379
EMAIL_SERVICE_API_KEY=your-email-service-key
FILE_UPLOAD_BUCKET=your-s3-bucket-name
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NEXT_PUBLIC_APP_URL=https://your-frontend-url.com

# Optional
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA-XXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

## Database Setup

### Option 1: Railway PostgreSQL (Recommended for staging)
1. Add PostgreSQL to your Railway project
2. Copy the provided DATABASE_URL
3. No additional setup required

### Option 2: Supabase (Good for African markets)
1. Create account at https://supabase.com
2. Create new project
3. Copy connection string from Settings > Database
4. Format: `postgresql://postgres:[password]@[host]:5432/postgres`

### Option 3: Neon (Serverless PostgreSQL)
1. Create account at https://neon.tech
2. Create database
3. Copy connection string

### Option 4: Local PostgreSQL
1. Install PostgreSQL locally
2. Create database: `createdb school_management`
3. Use connection string: `postgresql://postgres:password@localhost:5432/school_management`

## Quick Setup Commands

### Backend Setup:
```bash
# Navigate to backend directory
cd ../school_management_backend

# Install dependencies
npm install

# Set up environment variables (create .env file)
# Copy .env.example to .env and fill in values

# Run database migrations
npm run typeorm:migration:run

# Start development server
npm run start:dev
```

### Frontend Setup:
```bash
# Navigate to frontend directory (this directory)
cd school_management_frontend

# Install dependencies
npm install

# Create .env.local file with API URL
echo "NEXT_PUBLIC_API_URL=http://localhost:4000" > .env.local

# Start development server
npm run dev
```

## Production Checklist

### Backend
- [ ] Database migrations executed
- [ ] Environment variables configured
- [ ] JWT_SECRET is secure (32+ characters)
- [ ] CORS_ORIGIN points to frontend URL
- [ ] Health check endpoint accessible
- [ ] Error logging configured

### Frontend
- [ ] API_URL points to backend
- [ ] Build completes without errors
- [ ] Environment variables set
- [ ] Analytics configured (if needed)
- [ ] SEO metadata updated

## Troubleshooting

### Common Backend Issues
- **Port conflicts**: Change PORT in environment variables
- **Database connection**: Verify DATABASE_URL format and credentials
- **CORS errors**: Ensure CORS_ORIGIN matches frontend URL
- **Migration errors**: Check database permissions and existing tables

### Common Frontend Issues
- **API connection failed**: Verify NEXT_PUBLIC_API_URL is correct
- **Build errors**: Check for TypeScript errors with `npm run type-check`
- **Hydration errors**: Ensure server and client rendering match

## Monitoring & Maintenance

### Recommended Tools
- **Error Tracking**: Sentry for both frontend and backend
- **Performance**: Vercel Analytics for frontend, PM2 for backend
- **Database**: Native monitoring tools from your database provider
- **Uptime**: UptimeRobot or similar service

### Regular Maintenance
- Monitor database size and performance
- Update dependencies monthly
- Review error logs weekly
- Backup database regularly
- Monitor API response times

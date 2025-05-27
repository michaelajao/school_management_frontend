# Backend Deployment Guide

## Option 1: Railway (Recommended for staging)

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
   ```

4. **Deploy:**
   ```bash
   railway up
   ```

## Option 2: Render (Alternative)

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Use the following build settings:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`
   - Environment: Node

## Environment Variables Needed:

```
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=staging
PORT=4000
CORS_ORIGIN=https://your-app-staging.vercel.app
```

## Database Setup:

For staging, you can use:
- **Railway PostgreSQL** (free tier available)
- **Supabase** (free tier with good African coverage)
- **Neon** (serverless PostgreSQL)

## Quick Setup Commands:

```bash
# Navigate to backend
cd ../school_management_backend

# Install dependencies
npm install

# Run migrations (after setting up DATABASE_URL)
npm run typeorm:run

# Start development server
npm run start:dev
```

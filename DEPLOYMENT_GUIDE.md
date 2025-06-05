# School Management System - Complete Deployment Guide

## Overview

This guide covers deployment for both frontend (Next.js) and backend (NestJS) components of the multi-tenant school management system.

## Prerequisites

- Node.js >= 18
- PostgreSQL database
- Git repository access
- Docker and Docker Compose (for staging)

## Local Development Setup

### Quick Start with Docker (Recommended)

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd school_management_system
   ```

2. **Start the staging environment:**
   ```bash
   # Using Docker Compose
   docker-compose -f docker-compose.staging.yml up -d
   
   # Or using helper script
   ./start-staging.ps1  # Windows
   ```

3. **Access the services:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000
   - Database Admin: http://localhost:8080
   - Redis Commander: http://localhost:8081

### Manual Setup

1. **Backend setup:**
   ```bash
   cd school_management_backend
   npm install
   
   # Create .env file with database configuration
   cp .env.template .env
   
   # Start development server
   npm run start:dev
   ```

2. **Frontend setup:**
   ```bash
   cd school_management_frontend
   npm install
   
   # Create .env.local file
   echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:4000" > .env.local
   
   # Start development server
   npm run dev
   ```

## Production Deployment

### Backend Deployment

#### Option 1: Railway (Recommended for staging)

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and Initialize:**
   ```bash
   railway login
   cd school_management_backend
   railway init
   ```

3. **Set Environment Variables:**
   ```bash
   railway add DATABASE_URL
   railway add JWT_SECRET
   railway add NODE_ENV=production
   railway add PORT=4000
   railway add CORS_ORIGIN=https://your-frontend-url.com
   ```

4. **Deploy:**
   ```bash
   railway up
   ```

#### Option 2: Render (Production Ready)

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Use the following build settings:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`
   - Environment: Node

#### Option 3: Vercel (Serverless)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy from backend directory:
   ```bash
   cd school_management_backend
   vercel --prod
   ```

### Frontend Deployment

#### Option 1: Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy from frontend directory:**
   ```bash
   cd school_management_frontend
   vercel --prod
   ```

3. **Environment Variables:**
   Set these in Vercel dashboard:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   NEXT_PUBLIC_APP_URL=https://your-frontend-url.com
   ```

#### Option 2: Netlify

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
NODE_ENV=production
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

## Docker Deployment

### Staging Environment

The project includes a complete Docker Compose setup for staging:

```bash
# Start all services
docker-compose -f docker-compose.staging.yml up -d

# Stop all services
docker-compose -f docker-compose.staging.yml down

# View logs
docker-compose -f docker-compose.staging.yml logs -f

# Reset everything
docker-compose -f docker-compose.staging.yml down -v
docker-compose -f docker-compose.staging.yml up -d
```

### Production Docker Setup

For production, you can use the staging compose file as a base and modify:

1. Change environment variables to production values
2. Use production database URLs
3. Enable SSL/TLS
4. Configure proper secrets management

## Production Checklist

### Backend
- [ ] Database migrations executed
- [ ] Environment variables configured
- [ ] JWT_SECRET is secure (32+ characters)
- [ ] CORS_ORIGIN points to frontend URL
- [ ] Health check endpoint accessible
- [ ] Error logging configured
- [ ] SSL/TLS enabled
- [ ] Rate limiting configured

### Frontend
- [ ] API_URL points to backend
- [ ] Build completes without errors
- [ ] Environment variables set
- [ ] Analytics configured (if needed)
- [ ] SEO metadata updated
- [ ] Performance optimized
- [ ] Error tracking enabled

## Troubleshooting

### Common Backend Issues
- **Port conflicts**: Change PORT in environment variables
- **Database connection**: Verify DATABASE_URL format and credentials
- **CORS errors**: Ensure CORS_ORIGIN matches frontend URL
- **JWT errors**: Verify JWT_SECRET is set and secure

### Common Frontend Issues
- **API connection**: Verify NEXT_PUBLIC_API_URL is correct
- **Build errors**: Check for TypeScript errors and missing dependencies
- **Environment variables**: Ensure all required variables are set
- **Routing issues**: Verify Next.js app router configuration

### Docker Issues
- **Port conflicts**: Check if ports 3000, 4000, 5432, 6379, 8080, 8081 are available
- **Permission errors**: Ensure Docker has proper permissions
- **Network issues**: Check Docker network configuration
- **Volume issues**: Clear Docker volumes if database issues persist

## Monitoring and Maintenance

### Health Checks
- Backend: `GET /health`
- Frontend: Check if page loads correctly
- Database: Connection test via pgAdmin

### Logs
```bash
# View application logs
docker-compose -f docker-compose.staging.yml logs -f backend
docker-compose -f docker-compose.staging.yml logs -f frontend

# View database logs
docker-compose -f docker-compose.staging.yml logs -f postgres
```

### Backup
```bash
# Database backup
docker-compose -f docker-compose.staging.yml exec postgres pg_dump -U school_admin school_management_db > backup.sql

# Restore database
docker-compose -f docker-compose.staging.yml exec -T postgres psql -U school_admin school_management_db < backup.sql
```

## Security Considerations

1. **Environment Variables**: Never commit `.env` files to version control
2. **Database Security**: Use strong passwords and limit access
3. **API Security**: Implement rate limiting and input validation
4. **SSL/TLS**: Always use HTTPS in production
5. **Secrets Management**: Use proper secrets management in production
6. **Regular Updates**: Keep dependencies updated
7. **Monitoring**: Implement proper logging and monitoring

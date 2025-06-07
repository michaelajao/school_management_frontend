# School Management System - Deployment Guide

## Overview

This guide covers deployment options for the School Management System, focusing on Docker-based deployment and local development setup.

## Prerequisites

- Node.js >= 18
- Docker and Docker Compose
- PostgreSQL database access
- Git repository access

## Local Development Setup

### Docker Development Environment (Recommended)

The system includes a comprehensive Docker setup for local development and staging.

1. **Ensure both repositories are available:**
   ```bash
   # If working with both frontend and backend
   mkdir school_management_workspace
   cd school_management_workspace
   git clone <frontend-repo> school_management_frontend
   git clone <backend-repo> school_management_backend
   ```

2. **Start the integrated environment:**
   ```bash
   # From workspace directory (containing both repos)
   docker-compose -f docker-compose.staging.yml up -d
   
   # Or use helper scripts
   ./start-staging.ps1  # Windows
   ```

3. **Access the services:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000
   - Database Admin (pgAdmin): http://localhost:8080
   - Redis Commander: http://localhost:8081

4. **Stop the environment:**
   ```bash
   docker-compose -f docker-compose.staging.yml down
   
   # Or use helper script
   ./stop-staging.ps1  # Windows
   ```

### Manual Development Setup

#### Frontend Only
```bash
cd school_management_frontend
npm install

# Create environment file
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:4000" > .env.local

# Start development server
npm run dev
```

#### Backend Only
```bash
cd school_management_backend
npm install

# Create .env file with database configuration
cp .env.template .env

# Start development server
npm run start:dev
```

## Production Deployment

### Docker Production Deployment

#### Option 1: Docker Compose (Recommended)

1. **Prepare production environment:**
   ```bash
   # Create production docker-compose file
   cp docker-compose.staging.yml docker-compose.prod.yml
   ```

2. **Update environment variables:**
   ```yaml
   # docker-compose.prod.yml
   environment:
     - NODE_ENV=production
     - DB_SYNC=false
     - JWT_SECRET=your-production-jwt-secret
     - NEXT_PUBLIC_API_BASE_URL=https://your-domain.com
   ```

3. **Deploy:**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

#### Option 2: Individual Docker Containers

**Backend:**
```bash
cd school_management_backend
docker build -t school-backend .
docker run -p 4000:4000 \
  -e NODE_ENV=production \
  -e DB_HOST=your-db-host \
  -e JWT_SECRET=your-jwt-secret \
  school-backend
```

**Frontend:**
```bash
cd school_management_frontend
docker build -t school-frontend .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL=https://your-backend-url \
  school-frontend
```

### Cloud Platform Deployment

#### Railway (Recommended for staging)

**Backend:**
1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Initialize: `railway init`
4. Set environment variables:
   ```bash
   railway add NODE_ENV=production
   railway add JWT_SECRET=your-jwt-secret
   railway add PORT=4000
   ```
5. Deploy: `railway up`

**Frontend:**
1. Connect repository to Railway
2. Set build command: `npm run build`
3. Set start command: `npm run start`
4. Set environment variables:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-url
   ```

#### Render (Production Ready)

**Backend:**
1. Connect GitHub repository to Render
2. Create Web Service
3. Build Command: `npm install && npm run build`
4. Start Command: `npm run start:prod`
5. Set environment variables in dashboard

**Frontend:**
1. Connect GitHub repository to Render
2. Create Static Site
3. Build Command: `npm run build`
4. Publish Directory: `.next`

## Environment Configuration

### Backend Environment Variables

**Development (.env):**
```env
NODE_ENV=development
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=school_management
DB_SYNC=true
JWT_SECRET=your-development-jwt-secret
REDIS_HOST=localhost
REDIS_PORT=6379
```

**Production (.env):**
```env
NODE_ENV=production
PORT=4000
DB_HOST=your-production-db-host
DB_PORT=5432
DB_USERNAME=your-db-username
DB_PASSWORD=your-db-password
DB_NAME=school_management
DB_SYNC=false
JWT_SECRET=your-production-jwt-secret-minimum-32-characters
REDIS_HOST=your-redis-host
REDIS_PORT=6379
LOG_LEVEL=warn
```

### Frontend Environment Variables

**Development (.env.local):**
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
NODE_ENV=development
```

**Production (.env.local):**
```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend-api-url
NODE_ENV=production
```

## Database Setup

### Option 1: Railway PostgreSQL (Staging)
1. Add PostgreSQL service to Railway project
2. Copy the provided DATABASE_URL
3. Update backend environment variables

### Option 2: Supabase (Production)
1. Create account at https://supabase.com
2. Create new project
3. Get connection details from Settings > Database
4. Format: `postgresql://postgres:[password]@[host]:5432/postgres`

### Option 3: Local PostgreSQL (Development)
```bash
# Using Docker
docker run --name postgres-school \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=school_management \
  -p 5432:5432 -d postgres:15

# Or install locally and create database
createdb school_management
```

## Testing Deployment

### Health Checks

**Backend API:**
```bash
# Test backend health
curl http://localhost:4000/health

# Test authentication
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier":"admin@schoolsms.staging","password":"staging123"}'
```

**Frontend:**
```bash
# Test frontend
curl http://localhost:3000

# Check API integration
# Visit http://localhost:3000/admin (after login)
```

### Test Accounts

```
Admin: admin@schoolsms.staging / staging123
Teacher: teacher@schoolsms.staging / staging123
Student: student@schoolsms.staging / staging123
Parent: parent@schoolsms.staging / staging123
```

## Monitoring and Maintenance

### Logs

**Docker Logs:**
```bash
# View all service logs
docker-compose -f docker-compose.staging.yml logs -f

# View specific service logs
docker-compose -f docker-compose.staging.yml logs -f frontend
docker-compose -f docker-compose.staging.yml logs -f backend
```

**Application Logs:**
- Backend: Structured logging with Pino
- Frontend: Console logs and error boundaries

### Database Maintenance

```bash
# Backup database
pg_dump school_management > backup.sql

# Restore database
psql school_management < backup.sql

# Run migrations
cd school_management_backend
npm run migration:run
```

## Troubleshooting

### Common Issues

1. **Port Conflicts:**
   - Ensure ports 3000, 4000, 5432, 6379, 8080, 8081 are available
   - Stop conflicting services or change ports in docker-compose

2. **Database Connection:**
   - Check PostgreSQL container is running
   - Verify connection credentials
   - Check network connectivity

3. **API Connection:**
   - Verify backend is running on correct port
   - Check CORS configuration
   - Verify environment variables

4. **Docker Issues:**
   ```bash
   # Clean up Docker resources
   docker system prune -f
   
   # Rebuild containers
   docker-compose -f docker-compose.staging.yml up --build
   ```

### Getting Help

1. Check application logs
2. Verify environment variables
3. Test individual services
4. Check network connectivity
5. Review Docker container status

## Security Considerations

### Production Security

1. **Environment Variables:**
   - Use strong JWT secrets (minimum 32 characters)
   - Never commit secrets to version control
   - Use environment-specific configurations

2. **Database Security:**
   - Use strong database passwords
   - Enable SSL connections in production
   - Implement proper backup strategies

3. **API Security:**
   - Configure CORS properly
   - Use HTTPS in production
   - Implement rate limiting

4. **Frontend Security:**
   - Validate all user inputs
   - Implement proper error handling
   - Use secure authentication flows

---

**Note**: This deployment guide focuses on Docker-based deployment and cloud platforms. For specific platform configurations, consult the respective platform documentation.

# School Management System - Team Deployment Guide

## Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Git installed
- Node.js >= 18 (for local development)
- PostgreSQL >= 15 (for local development)

### Initial Setup

1. **Clone the repositories:**
   ```bash
   git clone <frontend-repo-url>
   git clone <backend-repo-url>
   ```

2. **Create environment files:**
   ```bash
   # In frontend directory
   cp .env.template .env.local
   
   # In backend directory
   cp .env.template .env
   ```

3. **Start the development environment:**
   ```bash
   # Using Docker (recommended)
   docker-compose -f docker-compose.staging.yml up --build
   
   # Or using local setup
   ./setup-staging.sh  # For Linux/Mac
   # OR
   .\setup-staging.ps1  # For Windows
   ```

## Development Environment

### Using Docker (Recommended)

1. **Start all services:**
   ```bash
   docker-compose -f docker-compose.staging.yml up -d
   ```

2. **Access the services:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000
   - pgAdmin: http://localhost:8080
   - Redis Commander: http://localhost:8081

3. **View logs:**
   ```bash
   # All services
   docker-compose -f docker-compose.staging.yml logs -f
   
   # Specific service
   docker-compose -f docker-compose.staging.yml logs -f frontend
   ```

4. **Stop services:**
   ```bash
   docker-compose -f docker-compose.staging.yml down
   ```

### Local Development

1. **Backend setup:**
   ```bash
   cd ../school_management_backend
   npm install
   npm run start:dev
   ```

2. **Frontend setup:**
   ```bash
   cd ../school_management_frontend
   npm install
   npm run dev
   ```

## Testing Accounts

### Admin Access
- Email: admin@schoolsms.staging
- Password: staging123

### Teacher Access
- Email: teacher@schoolsms.staging
- Password: staging123

### Student Access
- Email: student@schoolsms.staging
- Password: staging123

## Development Workflow

1. **Branch Strategy:**
   - `main` - Production code
   - `staging` - Staging environment
   - `develop` - Development branch
   - Feature branches: `feature/feature-name`

2. **Code Review Process:**
   - Create feature branch from `develop`
   - Submit PR to `develop`
   - After review, merge to `develop`
   - Regular merges from `develop` to `staging`
   - Production releases from `staging` to `main`

3. **Testing Requirements:**
   - Unit tests for new features
   - E2E tests for critical paths
   - Manual testing checklist completed

## Common Tasks

### Database Management

1. **Access pgAdmin:**
   - URL: http://localhost:8080
   - Email: admin@schoolsms.staging
   - Password: staging123

2. **Reset Database:**
   ```bash
   docker-compose -f docker-compose.staging.yml down -v
   docker-compose -f docker-compose.staging.yml up -d
   ```

### Redis Management

1. **Access Redis Commander:**
   - URL: http://localhost:8081
   - No authentication required in staging

2. **Clear Redis Cache:**
   ```bash
   docker-compose -f docker-compose.staging.yml exec redis redis-cli FLUSHALL
   ```

### Logs and Monitoring

1. **View Application Logs:**
   ```bash
   # Backend logs
   docker-compose -f docker-compose.staging.yml logs -f backend
   
   # Frontend logs
   docker-compose -f docker-compose.staging.yml logs -f frontend
   ```

2. **Monitor Resources:**
   ```bash
   docker stats
   ```

## Troubleshooting

### Common Issues

1. **Port Conflicts:**
   ```bash
   # Check if ports are in use
   netstat -tulpn | grep LISTEN
   
   # Kill process using port
   kill -9 <PID>
   ```

2. **Database Connection Issues:**
   - Check if PostgreSQL is running: `docker-compose -f docker-compose.staging.yml ps`
   - Verify credentials in `.env` file
   - Check logs: `docker-compose -f docker-compose.staging.yml logs postgres`

3. **Frontend API Connection:**
   - Verify `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
   - Check CORS settings in backend
   - Verify network connectivity

4. **Docker Issues:**
   ```bash
   # Reset Docker
   docker-compose -f docker-compose.staging.yml down
   docker system prune -f
   docker-compose -f docker-compose.staging.yml up -d
   ```

## Security Guidelines

1. **Environment Variables:**
   - Never commit `.env` files
   - Use strong passwords
   - Rotate secrets regularly

2. **Database Security:**
   - Use strong passwords
   - Limit database access
   - Regular backups

3. **API Security:**
   - Use HTTPS in production
   - Implement rate limiting
   - Validate all inputs

## Deployment Checklist

### Before Deployment
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] Security review completed
- [ ] Performance testing done

### After Deployment
- [ ] Health checks passing
- [ ] Logs monitored
- [ ] Database connections verified
- [ ] API endpoints tested
- [ ] Frontend functionality verified

## Support and Resources

### Internal Resources
- Documentation: `/docs` directory
- API Documentation: http://localhost:4000/api/docs
- Issue Tracker: [GitHub Issues]

### External Resources
- Docker Documentation: https://docs.docker.com
- Next.js Documentation: https://nextjs.org/docs
- NestJS Documentation: https://docs.nestjs.com

## Team Contacts

### Technical Leads
- Backend Lead: [Name] - [Email]
- Frontend Lead: [Name] - [Email]
- DevOps Lead: [Name] - [Email]

### Support Channels
- Slack Channel: #school-management-support
- Email: support@schoolsms.com
- Emergency Contact: [Phone Number] 
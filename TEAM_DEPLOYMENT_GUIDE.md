# School Management System - Team Deployment Guide

## Multi-Repository Workspace Setup

This guide covers the integrated development environment for teams working with separate frontend and backend repositories.

## Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Git installed
- Node.js >= 18 (for local development)
- PostgreSQL >= 15 (for local development)

### Initial Setup

1. **Create a workspace directory and clone both repositories:**
   ```bash
   # Create workspace directory
   mkdir school_management_workspace
   cd school_management_workspace
   
   # Clone both repositories
   git clone <frontend-repo-url> school_management_frontend
   git clone <backend-repo-url> school_management_backend
   
   # Copy the docker-compose file to workspace level
   # (This should be provided separately or created)
   ```

2. **Create environment files:**
   ```bash
   # In frontend directory
   cd school_management_frontend
   cp .env.template .env.local
   
   # In backend directory
   cd ../school_management_backend
   cp .env.template .env
   
   # Return to workspace directory
   cd ..
   ```

3. **Start the integrated development environment:**
   ```bash
   # From workspace directory (containing both repos)
   docker-compose -f docker-compose.staging.yml up --build
   
   # Or use helper scripts (if available)
   ./start-staging.ps1  # For Windows
   ```

## Repository Structure

```
workspace/
├── school_management_frontend/     # Frontend repository
│   ├── app/                       # Next.js app router
│   ├── components/                # React components
│   ├── .git/                      # Frontend git history
│   └── package.json               # Frontend dependencies
├── school_management_backend/      # Backend repository
│   ├── src/                       # NestJS source code
│   ├── .git/                      # Backend git history
│   └── package.json               # Backend dependencies
├── docker-compose.staging.yml     # Integrated environment
├── start-staging.ps1              # Helper script (Windows)
├── stop-staging.ps1               # Helper script (Windows)
└── README.md                      # Workspace documentation
```

## Development Environment

### Using Docker (Recommended)

1. **Start all services (from workspace directory):**
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
   
   # Or use helper script
   ./stop-staging.ps1  # For Windows
   ```

### Local Development (Repository-Specific)

**Frontend Development:**
```bash
cd school_management_frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

**Backend Development:**
```bash
cd school_management_backend
npm install
npm run start:dev
# Runs on http://localhost:4000
```

## Team Workflow

### Repository Management

1. **Frontend Team:**
   - Work in `school_management_frontend/` directory
   - Maintain separate Git history
   - Independent deployment pipeline
   - Focus on UI/UX and frontend features

2. **Backend Team:**
   - Work in `school_management_backend/` directory
   - Maintain separate Git history
   - Independent deployment pipeline
   - Focus on API and business logic

3. **Integration Testing:**
   - Use workspace-level Docker Compose
   - Test API integration
   - Coordinate feature development

### Git Workflow

Each repository follows independent Git workflows:

**Frontend Repository:**
```bash
cd school_management_frontend
git checkout -b feature/new-frontend-feature
# Make changes
git commit -m "Add new frontend feature"
git push origin feature/new-frontend-feature
# Create PR in frontend repository
```

**Backend Repository:**
```bash
cd school_management_backend
git checkout -b feature/new-api-endpoint
# Make changes
git commit -m "Add new API endpoint"
git push origin feature/new-api-endpoint
# Create PR in backend repository
```

### Coordination Between Teams

1. **API Changes:**
   - Backend team updates API documentation
   - Frontend team updates integration accordingly
   - Test integration using workspace environment

2. **Environment Variables:**
   - Coordinate environment variable changes
   - Update both repository configurations
   - Test in integrated environment

3. **Database Schema:**
   - Backend team manages database migrations
   - Frontend team updates data models
   - Test with shared database in workspace

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
   # Check if ports are in use (Windows)
   netstat -ano | findstr "3000\|4000\|5432\|6379\|8080\|8081"
   
   # Kill process using port
   taskkill /PID <PID> /F
   ```

2. **Repository Sync Issues:**
   - Ensure both repositories are up to date
   - Check for conflicting environment variables
   - Verify API endpoint compatibility

3. **Docker Issues:**
   ```bash
   # Reset Docker environment
   docker-compose -f docker-compose.staging.yml down
   docker system prune -f
   docker-compose -f docker-compose.staging.yml up -d
   ```

4. **Cross-Repository Communication:**
   - Verify CORS settings in backend
   - Check API base URL in frontend
   - Ensure network connectivity between containers

## Deployment

### Development/Staging
Use the workspace Docker Compose setup for integrated development and testing.

### Production
Each repository deploys independently:

**Frontend:**
- Vercel (recommended for Next.js)
- Netlify
- Railway

**Backend:**
- Railway
- Render
- Heroku

## Security Guidelines

1. **Environment Variables:**
   - Never commit `.env` files to either repository
   - Use different secrets for each environment
   - Coordinate secret management between teams

2. **Repository Access:**
   - Manage access permissions per repository
   - Use branch protection rules
   - Require code reviews for both repositories

## Quick Commands Reference

```bash
# Workspace-level commands (from workspace directory)
docker-compose -f docker-compose.staging.yml up -d     # Start all services
docker-compose -f docker-compose.staging.yml down      # Stop all services
docker-compose -f docker-compose.staging.yml logs -f   # View logs

# Frontend-specific commands
cd school_management_frontend
npm run dev                                             # Start frontend only
npm run build                                           # Build frontend
npm run test                                            # Test frontend

# Backend-specific commands
cd school_management_backend
npm run start:dev                                       # Start backend only
npm run build                                           # Build backend
npm run test                                            # Test backend
```

---

**Note:** This guide assumes a multi-repository workspace setup where frontend and backend teams work independently but can integrate for testing and development. 
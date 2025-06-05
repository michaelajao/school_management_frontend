# School Management System - Development Workspace

This workspace contains both the frontend and backend repositories for the School Management System, configured for integrated development.

## 🏗️ Repository Structure

This workspace includes two separate repositories:

- **Frontend Repository**: `school_management_frontend/` - Next.js 15 application
- **Backend Repository**: `school_management_backend/` - NestJS API

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18
- Docker and Docker Compose
- Git

### Development Setup

1. **Start the integrated development environment:**
   ```bash
   # From this workspace directory
   docker-compose -f docker-compose.staging.yml up -d
   ```

2. **Access the services:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000
   - Database Admin: http://localhost:8080
   - Redis Commander: http://localhost:8081

### Manual Setup

If you prefer to run services individually:

1. **Backend setup:**
   ```bash
   cd school_management_backend
   npm install
   npm run start:dev
   ```

2. **Frontend setup:**
   ```bash
   cd school_management_frontend
   npm install
   npm run dev
   ```

## 📁 Workspace Structure

```
workspace/
├── school_management_frontend/     # Frontend repository
│   ├── app/                       # Next.js app router
│   ├── components/                # React components
│   ├── README.md                  # Frontend documentation
│   └── package.json               # Frontend dependencies
├── school_management_backend/      # Backend repository
│   ├── src/                       # NestJS source code
│   ├── README.md                  # Backend documentation
│   └── package.json               # Backend dependencies
├── docker-compose.staging.yml     # Integrated development environment
└── README.md                      # This workspace documentation
```

## 🛠️ Development Workflow

### Working with Multiple Repositories

Each repository maintains its own:
- Git history and branches
- Dependencies and package.json
- Documentation and README
- CI/CD configuration

### Integrated Development

The workspace provides:
- Unified Docker Compose setup
- Shared development environment
- Cross-repository coordination

## 🔧 Available Commands

### Workspace Level (from this directory)

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

### Repository Level

**Frontend:**
```bash
cd school_management_frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run tests
```

**Backend:**
```bash
cd school_management_backend
npm run start:dev    # Start development server
npm run build        # Build for production
npm run test         # Run tests
```

## 📚 Documentation

- **Frontend**: [Frontend Documentation](./school_management_frontend/README.md)
- **Backend**: [Backend Documentation](./school_management_backend/README.md)
- **Deployment**: [Team Deployment Guide](./school_management_frontend/TEAM_DEPLOYMENT_GUIDE.md)
- **Authentication**: [Auth Integration Guide](./school_management_frontend/AUTH_INTEGRATION_GUIDE.md)

## 🧪 Testing

### Test Accounts (Staging)

- **Admin:** admin@schoolsms.staging / staging123
- **Teacher:** teacher@schoolsms.staging / staging123
- **Student:** student@schoolsms.staging / staging123
- **Parent:** parent@schoolsms.staging / staging123

## 🤝 Team Development

### Repository Management

1. **Frontend Team**: Work primarily in `school_management_frontend/`
2. **Backend Team**: Work primarily in `school_management_backend/`
3. **Integration**: Use workspace-level Docker Compose for testing

### Git Workflow

Each repository follows its own Git workflow:
- Separate branches and commits
- Independent release cycles
- Repository-specific CI/CD

### Coordination

- Use workspace for integrated testing
- Coordinate API changes between teams
- Share environment configurations

## 🚀 Deployment

### Multi-Repository Workspace Setup

This frontend repository is designed to work with the backend repository in a shared workspace for integrated development.

**Workspace Structure:**
```
workspace/
├── school_management_frontend/     # This repository
├── school_management_backend/      # Backend repository
├── docker-compose.staging.yml     # Integrated development environment
└── README.md                      # Workspace documentation
```

### Integrated Development Environment

For full-stack development with both frontend and backend:

1. **Ensure both repositories are in the same workspace directory**
2. **From the workspace directory (parent of both repos):**
   ```bash
   # Start all services
   docker-compose -f docker-compose.staging.yml up -d
   
   # Or use the helper script
   ./start-staging.ps1  # Windows
   ```

3. **Access the services:**
   - Frontend (this app): http://localhost:3000
   - Backend API: http://localhost:4000
   - Database Admin: http://localhost:8080
   - Redis Commander: http://localhost:8081

### Frontend-Only Development

To run just the frontend application:

```bash
# From this directory (school_management_frontend)
npm install
npm run dev
```

**Note:** You'll need to configure `NEXT_PUBLIC_API_BASE_URL` in `.env.local` to point to your backend API.

### Manual Deployment

For detailed deployment instructions, see the [Deployment Guide](./DEPLOYMENT_GUIDE.md).

### Production Deployment

The frontend can be deployed independently to platforms like:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Any static hosting service**

For detailed setup instructions, see the [Team Deployment Guide](./TEAM_DEPLOYMENT_GUIDE.md).

## 🆘 Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000, 4000, 5432, 6379, 8080, 8081 are available
2. **Docker issues**: Run `docker system prune -f` if needed
3. **Database connection**: Check if PostgreSQL container is running

### Getting Help

1. Check repository-specific documentation
2. Review [troubleshooting guide](./school_management_frontend/CONNECTIVITY_TROUBLESHOOTING.md)
3. Contact the respective team (frontend/backend)

---

**Note**: This is a development workspace containing two separate repositories. Each repository maintains its own documentation, dependencies, and Git history. 
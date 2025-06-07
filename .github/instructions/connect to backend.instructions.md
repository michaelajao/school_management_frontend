# AI Instructions: School Management System

## Project Overview

This is a modern School Management System with separate frontend (Next.js) and backend (NestJS) repositories. The system features role-based authentication, comprehensive dashboards, and user management for educational institutions.

## Current Architecture

### Frontend (Next.js 15)
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Context + Custom Hooks
- **API Client**: Custom fetch-based API service
- **Authentication**: JWT with automatic role detection
- **Forms**: React Hook Form with Zod validation

### Backend (NestJS)
- **Framework**: NestJS 11.0.1
- **Language**: TypeScript
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with role-based access control
- **Cache**: Redis
- **Documentation**: Swagger/OpenAPI

## Project Structure

### Frontend (`school_management_frontend/`)
```
app/
├── (users)/                 # Protected routes
│   ├── admin/               # Admin dashboard
│   ├── teacher/             # Teacher dashboard
│   ├── student/             # Student dashboard
│   └── parent/              # Parent dashboard
├── auth/                    # Authentication pages
│   ├── signin/              # General login
│   ├── create-account/      # Registration
│   └── forgot-password/     # Password recovery

├── page.tsx                 # Landing page
└── layout.tsx               # Root layout

components/
├── admin/                   # Admin components
├── auth/                    # Auth components
├── layout/                  # Layout components
├── shared/                  # Shared components
└── ui/                      # Base UI components

lib/
├── api/                     # API services
│   ├── client.ts            # API client setup
│   ├── auth.ts              # Auth API service
│   └── users.ts             # Users API service
└── utils.ts                 # Utility functions
```

### Backend (`school_management_backend/`)
```
src/
├── modules/
│   ├── auth/                # Authentication
│   ├── users/               # User management
│   ├── students/            # Student management
│   ├── parents/             # Parent management
│   ├── classes/             # Class management
│   ├── grades/              # Grade management
│   └── attendance/          # Attendance tracking
├── config/                  # Configuration
├── migrations/              # Database migrations
└── shared/                  # Shared utilities
```

## Key Implementation Details

### Authentication Flow
1. User logs in via `/auth/signin` (general login)
2. Backend determines user role automatically
3. Frontend redirects to appropriate dashboard based on role
4. JWT token contains user info and role

### User Roles
```typescript
enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
  PARENT = 'parent',
  SCHOOL_MANAGEMENT = 'school_management'
}
```

### API Endpoints Structure
- **Authentication**: `/auth/login`, `/auth/refresh`, `/auth/logout`
- **General Users**: `/users` - General user operations
- **Students**: `/users/students` - Student-specific operations
- **Parents**: `/users/parents` - Parent-specific operations
- **Classes**: `/classes` - Class management
- **Grades**: `/grades` - Grade management
- **Attendance**: `/attendance` - Attendance tracking

### Environment Configuration

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
NODE_ENV=development
```

#### Backend (.env)
```env
NODE_ENV=development
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=school_management
DB_SYNC=true
JWT_SECRET=your_jwt_secret_key
REDIS_HOST=localhost
REDIS_PORT=6379
```

## Development Guidelines

### When Working on Frontend:
1. **Components**: Use TypeScript with proper typing
2. **Styling**: Use Tailwind CSS classes and shadcn/ui components
3. **API Calls**: Use the existing API services in `lib/api/`
4. **Forms**: Use React Hook Form with Zod validation
5. **Routing**: Use Next.js App Router conventions
6. **State**: Use React Context for global state, local state for component-specific data

### When Working on Backend:
1. **Modules**: Follow NestJS module structure
2. **DTOs**: Create proper DTOs for request/response validation
3. **Guards**: Use existing auth guards for protected routes
4. **Services**: Implement business logic in services
5. **Controllers**: Keep controllers thin, delegate to services
6. **Database**: Use TypeORM entities and repositories

### Code Style:
- Use TypeScript strict mode
- Follow existing naming conventions
- Add proper JSDoc comments for complex functions
- Use async/await for asynchronous operations
- Handle errors appropriately with try/catch blocks

## Current Features

### Implemented:
- ✅ Role-based authentication system
- ✅ User management with role-specific endpoints
- ✅ Professional landing page
- ✅ Admin dashboard with user management
- ✅ Teacher dashboard with class management
- ✅ Student dashboard with academic portal
- ✅ Parent dashboard with child monitoring
- ✅ Role-based dashboards for all user types
- ✅ Docker development environment

### Dashboard Features:
- **Admin**: User management, system overview, analytics
- **Teacher**: Class management, student tracking, assignments
- **Student**: Grades, assignments, schedule, progress
- **Parent**: Child progress, communication, events

## Testing

### Test Accounts:
```
Admin: admin@schoolsms.staging / staging123
Teacher: teacher@schoolsms.staging / staging123
Student: student@schoolsms.staging / staging123
Parent: parent@schoolsms.staging / staging123
```

### Testing Endpoints:
- Visit `/admin` after login to access the dashboard
- Use provided test accounts for different role testing

## Development Setup

### Quick Start:
```bash
# Frontend
cd school_management_frontend
npm install
npm run dev  # http://localhost:3000

# Backend
cd school_management_backend
npm install
npm run start:dev  # http://localhost:4000
```

### Docker Environment:
```bash
# Start integrated environment
docker-compose -f docker-compose.staging.yml up -d

# Services:
# Frontend: http://localhost:3000
# Backend: http://localhost:4000
# Database Admin: http://localhost:8080
# Redis Commander: http://localhost:8081
```

## Important Notes for AI Assistants

1. **No Role Selection**: The system uses automatic role detection, not manual role selection
2. **API Structure**: Use role-specific endpoints (`/users/students`, `/users/parents`) when appropriate
3. **Authentication**: All protected routes require JWT authentication
4. **Documentation**: Refer to `docs/` folders for detailed documentation
5. **Current State**: The system is fully functional with all major features implemented

## Documentation Structure

### Frontend Docs (`docs/`):
- `AUTH_INTEGRATION_GUIDE.md` - Authentication implementation
- `DEPLOYMENT_GUIDE.md` - Setup and deployment
- `TESTING_GUIDE.md` - Testing procedures
- `DASHBOARD_DOCUMENTATION.md` - Dashboard features
- `CONNECTIVITY_TROUBLESHOOTING.md` - Troubleshooting

### Backend Docs (`doc/`):
- `DATABASE-STRUCTURE.md` - Database schema
- `TENANT-IMPLEMENTATION.md` - Multi-tenancy details
- `DOCUMENTATION.md` - API documentation
- `MIGRATION-GUIDE.md` - Database migrations
- `CONNECTIVITY_GUIDE.md` - Connection setup

## Common Tasks

### Adding New API Endpoint:
1. Create DTO in backend module
2. Add method to controller
3. Implement business logic in service
4. Add corresponding frontend API service method
5. Update Swagger documentation

### Adding New Component:
1. Create component in appropriate directory
2. Use TypeScript with proper props interface
3. Style with Tailwind CSS
4. Add to component exports if reusable

### Database Changes:
1. Create migration using TypeORM CLI
2. Update entity definitions
3. Run migration in development
4. Update related DTOs and services

This instruction file reflects the current, accurate state of the School Management System as of June 2025. 
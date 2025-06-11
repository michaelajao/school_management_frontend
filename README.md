# School Management System - Frontend

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat-square&logo=tailwind-css)

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Goals & Vision](#goals--vision)
- [User Roles & Features](#user-roles--features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Authentication & Authorization](#authentication--authorization)
- [API Integration](#api-integration)
- [Development Guidelines](#development-guidelines)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)

## 🎯 About the Project

A comprehensive Multi-Tenant School Management System (SMS) designed as a SaaS platform for schools in Nigeria and Ghana. The system provides optimized performance for low-resource environments, integrated teacher development, customizable lesson planning, actionable insights, and seamless parent engagement. Each school operates independently with complete data isolation while sharing the same powerful platform.

### Goals & Vision

#### Primary Goals
- **Multi-Tenant SaaS Platform**: Serve multiple schools with complete data isolation
- **Simplified Authentication**: Universal email + password login for all users (no role selection required)
- **Enhanced Communication**: Enable seamless interaction between students, parents, teachers, and administrators
- **Role-Based Access Control**: Granular permissions system with 7 distinct user roles
- **Financial Management**: Automated fee collection, invoicing, and financial reporting
- **Scalable Architecture**: Support unlimited schools with invitation-based onboarding

#### Multi-Tenant Benefits
- **Cost Effective**: Shared infrastructure reduces costs for schools
- **Easy Onboarding**: School owners can register and invite users instantly  
- **Data Security**: Complete isolation between schools with tenant-level security
- **Centralized Updates**: All schools benefit from platform improvements simultaneously
- **Flexible Domains**: Support for custom school domains and branding

#### Target Audience
- School owners and administrators
- Teachers and academic staff
- Parents and guardians
- Students
- Educational consultants
- Government education agencies

## 👥 User Roles & Features

### Super Admin
- **Access**: Platform-wide system control across all schools
- **Features**: 
  - Complete system management
  - School creation and oversight
  - Global user management
  - Platform analytics and monitoring
  - Billing and subscription management
  - System configuration and updates

### School Admin  
- **Access**: Complete school operations management
- **Features**:
  - Staff and student management
  - Academic structure setup (classes, subjects, terms)
  - School calendar and event management
  - Communication management (announcements, messages)
  - Financial oversight and fee management
  - School settings and customization
  - User invitation and role assignment

### Assistant Admin
- **Access**: Limited administrative functions
- **Features**:
  - Data entry and basic record management
  - Report generation and viewing
  - Communication assistance
  - Student and parent information updates
  - Basic academic calendar management

### Class Teacher
- **Access**: Class-specific academic management
- **Features**:
  - Class student management
  - Grade recording and progress tracking
  - Attendance management for assigned classes
  - Assignment creation and grading
  - Parent communication regarding class students
  - Class performance analytics

### Subject Teacher
- **Access**: Subject-specific academic management
- **Features**:
  - Subject grade recording across multiple classes
  - Lesson planning and curriculum management
  - Subject-specific assignments and assessments
  - Student performance analysis for taught subjects
  - Resource management for subject materials

### Student
- **Access**: Personal learning portal
- **Features**:
  - Grade and progress viewing
  - Assignment submission and tracking
  - Attendance record access
  - Course material downloads
  - Communication with teachers
  - Academic calendar viewing
  - Fee payment status tracking

### Parent
- **Access**: Child progress monitoring and school interaction
- **Features**:
  - Child's academic progress monitoring
  - Fee payment and financial tracking
  - Direct communication with teachers and school admin
  - Attendance and behavior reports
  - School event and announcement notifications
  - Multiple children management (if applicable)

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: React Context API + Custom Hooks

### Authentication & Security
- **Authentication**: JWT-based with automatic role detection
- **Authorization**: Role-based access control (RBAC) with feature permissions
- **Multi-Tenancy**: Automatic school context switching
- **Session Management**: Secure token storage with automatic refresh

### Development Tools
- **API Client**: Custom service layer with TypeScript interfaces
- **Form Management**: React Hook Form with validation
- **Icons**: Lucide React icon library
- **Notifications**: Sonner toast notifications
- **Testing**: Jest + React Testing Library
- **Code Quality**: ESLint, Prettier, Husky pre-commit hooks

### Performance Optimizations
- **Code Splitting**: Automatic route-based and component-level splitting
- **Image Optimization**: Next.js Image component with lazy loading
- **API Caching**: Strategic response caching and request deduplication
- **Bundle Analysis**: Webpack bundle analyzer for size optimization

## 🚀 Getting Started

### Prerequisites
- **Node.js** >= 18.0.0
- **npm** or **yarn**
- **Backend API** running (see backend repository)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd school_management_frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env.local` file in the root directory:
```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000

# Environment
NODE_ENV=development

# Optional: For staging/production
NEXT_PUBLIC_APP_ENV=development

# Optional: School customization
NEXT_PUBLIC_DEFAULT_SCHOOL_DOMAIN=localhost
```

4. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking

# Testing
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:e2e     # Run end-to-end tests
npm run test:coverage # Generate test coverage report

# Deployment
npm run deploy       # Deploy to production
npm run build:analyze # Analyze bundle size
```

## 🏗️ Project Structure

```
school_management_frontend/
├── app/                          # Next.js App Router
│   ├── (users)/                  # Protected user routes (role-based)
│   │   ├── admin/               # School admin dashboard and features
│   │   ├── teacher/             # Teacher dashboard and tools
│   │   ├── student/             # Student portal and learning resources
│   │   ├── parent/              # Parent engagement portal
│   │   ├── superadmin/          # Super admin system controls
│   │   └── school_management/   # School management interface
│   ├── auth/                    # Authentication pages
│   │   ├── signin/              # Universal login (email + password)
│   │   ├── school-signup/       # School owner registration
│   │   ├── complete-registration/ # Invite-based registration
│   │   ├── forgot-password/     # Password recovery flow
│   │   └── reset-password/      # Password reset completion
│   ├── onboarding/              # Role-specific onboarding flows
│   ├── api/                     # API route handlers and middleware
│   ├── page.tsx                 # Landing page with school selection
│   └── layout.tsx               # Root layout with global providers
├── components/                   # Reusable components organized by feature
│   ├── admin/                   # Admin-specific components
│   │   ├── students/            # Student management components
│   │   ├── parents/             # Parent management components
│   │   └── announcement/        # Communication components
│   ├── auth/                    # Authentication components
│   │   ├── registration-forms/  # Role-specific registration forms
│   │   └── shared/              # Shared auth utilities
│   ├── dashboard/               # Dashboard components for all roles
│   ├── layout/                  # Layout components (sidebar, header, nav)
│   │   └── sidebar/             # Role-based navigation sidebar
│   ├── shared/                  # Shared utility components
│   └── ui/                      # Base UI components (shadcn/ui)
├── contexts/                     # React contexts for global state
│   └── auth-context.tsx         # Authentication and user state management
├── hooks/                        # Custom React hooks
├── lib/                         # Utilities and configurations
│   ├── api/                     # API client and service classes
│   │   ├── auth.ts              # Authentication API service
│   │   ├── users.ts             # User management API service
│   │   ├── classes.ts           # Class management API service
│   │   ├── client.ts            # Base API client with interceptors
│   │   └── index.ts             # API service exports
│   └── utils.ts                 # Utility functions and helpers
├── store/                       # Additional state management (if needed)
└── types/                       # TypeScript type definitions
```

## 🔐 Authentication & Authorization

### Multi-Tenant Authentication Flow

#### 1. School Owner Registration
```typescript
// School owners register and create their school + admin account
POST /auth/create-school-admin
{
  "firstName": "John", "lastName": "Smith",
  "email": "admin@school.edu", "password": "SecurePass123!",
  "schoolName": "Lincoln High School", "schoolAlias": "lincoln-high",
  "country": "Nigeria"
}
// Result: School entity + Admin user with SCHOOL_ADMIN role
```

#### 2. Admin Invites Users
```typescript
// School admin invites users with pre-assigned roles
POST /invites/send
{
  "email": "teacher@example.com",
  "role": "CLASS_TEACHER",
  "firstName": "Jane"
}
// Result: Email with invite link containing pre-assigned role
```

#### 3. Invite Registration
```typescript
// Invited users complete registration via email link
POST /auth/complete-invite-registration
{
  "inviteToken": "ABC123",
  "email": "teacher@example.com", "password": "MyPassword123!",
  "firstName": "Jane", "lastName": "Doe", "staffId": "TCH001"
}
// Result: User created with role from invite + school linkage
```

#### 4. Universal Login
```typescript
// All users login with just email + password (no role selection)
POST /auth/login
{
  "email": "teacher@example.com",
  "password": "MyPassword123!"
}
// Result: Backend determines role, frontend redirects accordingly
```

### Role-Based Access Control (RBAC)

#### Role Structure
```typescript
export enum UserRole {
  SUPER_ADMIN = 'super_admin',      // Platform-wide control
  SCHOOL_ADMIN = 'school_admin',    // School operations
  ASSISTANT_ADMIN = 'assistant_admin', // Limited admin functions
  CLASS_TEACHER = 'class_teacher',   // Class-specific management
  SUBJECT_TEACHER = 'subject_teacher', // Subject-specific management
  STUDENT = 'student',              // Learning portal
  PARENT = 'parent',                // Child monitoring
}
```

#### Feature Permissions Matrix
```typescript
export const FEATURE_PERMISSIONS = {
  USER_MANAGEMENT: [SUPER_ADMIN, SCHOOL_ADMIN],
  SCHOOL_SETTINGS: [SUPER_ADMIN, SCHOOL_ADMIN],
  ACADEMIC_CALENDAR: [SUPER_ADMIN, SCHOOL_ADMIN],
  GRADE_MANAGEMENT: [SUPER_ADMIN, SCHOOL_ADMIN, CLASS_TEACHER, SUBJECT_TEACHER],
  ATTENDANCE: [SUPER_ADMIN, SCHOOL_ADMIN, CLASS_TEACHER, SUBJECT_TEACHER],
  VIEW_GRADES: [ALL_ROLES],
  FEE_MANAGEMENT: [SUPER_ADMIN, SCHOOL_ADMIN, PARENT],
  REPORTS: [ALL_ROLES],
  BILLING: [SUPER_ADMIN],
  SYSTEM_SETTINGS: [SUPER_ADMIN],
};
```

### Auto-Redirect Dashboard System
```typescript
// Automatic role-based dashboard redirection
function getDashboardPath(role: UserRole): string {
  switch (role) {
    case 'super_admin': return '/(users)/admin';
    case 'school_admin': return '/(users)/admin';
    case 'assistant_admin': return '/(users)/admin';
    case 'class_teacher': return '/(users)/teacher';
    case 'subject_teacher': return '/(users)/teacher';
    case 'student': return '/(users)/student';
    case 'parent': return '/(users)/parent';
    default: return '/(users)/student';
  }
}
```

### Session Management
- **JWT Tokens**: Secure access and refresh token handling
- **Automatic Refresh**: Tokens refreshed automatically before expiration
- **School Context**: All requests include school context for multi-tenancy
- **Secure Storage**: Tokens stored securely in httpOnly cookies (production) or localStorage (development)

## 🌐 API Integration

### Multi-Tenant API Architecture
```typescript
// API Client with automatic school context
class ApiClient {
  private baseURL: string;
  private schoolContext?: string;
  
  setSchoolContext(schoolId: string) {
    this.schoolContext = schoolId;
  }
  
  async request(endpoint: string, options?: RequestOptions) {
    const headers = {
      ...options?.headers,
      'X-School-Context': this.schoolContext,
      'Authorization': `Bearer ${this.getToken()}`
    };
    
    return fetch(`${this.baseURL}${endpoint}`, { ...options, headers });
  }
}
```

### Authentication API Service
```typescript
export class AuthApiService {
  // Universal login for all users
  static async login(credentials: LoginCredentials): Promise<AuthResponse>
  
  // School owner registration
  static async createSchoolAndAdmin(data: SchoolRegistrationData): Promise<AuthResponse>
  
  // Complete invite registration
  static async completeInviteRegistration(data: InviteRegistrationData): Promise<AuthResponse>
  
  // Password reset system
  static async requestPasswordReset(email: string): Promise<void>
  static async resetPassword(token: string, newPassword: string): Promise<void>
  
  // Token management
  static async refreshToken(): Promise<RefreshTokenResponse>
  static getStoredUser(): User | null
  static isAuthenticated(): boolean
}
```

### Error Handling & Resilience
- **Automatic Retry**: Failed requests retried with exponential backoff
- **Token Refresh**: Expired tokens automatically refreshed
- **School Context**: Automatic school switching for multi-tenant access
- **Error Boundaries**: React error boundaries for graceful degradation
- **Offline Support**: Basic offline functionality with request queuing

## 🧪 Testing

### Testing Strategy
```bash
# Run all tests
npm run test

# Test with coverage
npm run test:coverage

# E2E testing
npm run test:e2e

# Component testing
npm run test -- LoginForm.test.tsx

# API integration testing  
npm run test -- api.test.tsx
```

### Multi-Tenant Testing
```typescript
// Example multi-tenant test
describe('Multi-Tenant Authentication', () => {
  test('users can only access their school data', async () => {
    const schoolAUser = await loginAs('user@schoola.edu');
    const schoolBUser = await loginAs('user@schoolb.edu');
    
    // School A user should not see School B data
    expect(schoolAUser.schoolId).not.toBe(schoolBUser.schoolId);
    
    const schoolAData = await apiClient.getStudents();
    expect(schoolAData.every(student => 
      student.schoolId === schoolAUser.schoolId
    )).toBe(true);
  });
});
```

## 🚀 Deployment

### Development Deployment
```bash
npm run dev  # Local development with hot reload
```

### Production Deployment

#### Railway Deployment
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway add NEXT_PUBLIC_API_BASE_URL=https://your-backend.railway.app
railway up
```

#### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Docker Deployment
```dockerfile
# Production Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables (Production)
```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com
NODE_ENV=production

# Multi-tenant Configuration
NEXT_PUBLIC_ENABLE_SCHOOL_SELECTION=true
NEXT_PUBLIC_DEFAULT_SCHOOL_DOMAIN=your-platform.com

# Optional: Analytics and monitoring
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

## 📊 Test Accounts (Development)

### School-Based Test Users
```bash
# Demo School Test Accounts
School Admin:    admin@demoschool.edu         / Test123!
Assistant Admin: assistant@demoschool.edu     / Test123!
Class Teacher:   classteacher@demoschool.edu  / Test123!  
Subject Teacher: subjectteacher@demoschool.edu / Test123!
Student:         student@demoschool.edu       / Test123!
Parent:          parent@example.com           / Test123!

# Super Admin (Platform-wide)
Super Admin:     superadmin@platform.com      / SuperAdmin123!
```

### School Information
```bash
# Demo School Details
School Name: Demo School
School Alias: DEMO
School ID: [Generated UUID]
Country: Nigeria
```

## 🤝 Contributing

### Development Workflow
1. **Create Feature Branch**: `git checkout -b feature/your-feature`
2. **Implement Changes**: Add features with comprehensive tests
3. **Test Multi-Tenancy**: Verify school isolation works correctly
4. **Update Documentation**: Update README and component docs
5. **Create Pull Request**: Request review with detailed description

### Code Standards
- **TypeScript**: All code must be strictly typed
- **Multi-Tenant Aware**: All features must respect school boundaries
- **Role-Based**: Components must handle all user roles appropriately
- **Responsive Design**: Support mobile and desktop interfaces
- **Performance**: Consider low-bandwidth environments

### Commit Convention
```bash
feat: add multi-tenant user invitation system
fix: resolve school context switching bug
docs: update authentication flow documentation
test: add role-based access control tests
```

## 🔧 Troubleshooting

### Common Issues

#### Authentication Issues
```bash
# Check API connection
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@demoschool.edu","password":"Test123!"}'

# Verify environment variables
echo $NEXT_PUBLIC_API_BASE_URL

# Clear authentication cache
localStorage.clear() // In browser console
```

#### Multi-Tenant Issues
```bash
# Verify school context
console.log(authContext.user.schoolId) // In browser console

# Check API headers
// Network tab: verify X-School-Context header is present
```

#### Build Issues
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Type checking
npm run type-check
```

### Development Tools
```bash
# Bundle analysis
npm run build:analyze

# Performance profiling
npm run dev -- --profile

# API debugging
npm run test:api
```

---

## 📞 Support

- **Issues**: GitHub Issues with detailed reproduction steps
- **Documentation**: Check `/docs` for advanced guides
- **Team Contact**: Frontend team leads
- **Community**: Join project discussions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Key Features Highlight

✅ **Multi-Tenant SaaS Architecture** - Complete school data isolation  
✅ **Universal Authentication** - Email + password login for all users  
✅ **7-Role RBAC System** - Granular permission management  
✅ **Automatic School Context** - Seamless multi-tenant operation  
✅ **Invitation-Based Onboarding** - Easy user registration system  
✅ **Mobile-First Design** - Optimized for low-resource environments  
✅ **Real-time Updates** - Live notifications and data synchronization  
✅ **Offline Support** - Basic functionality without internet connection
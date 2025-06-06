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

A comprehensive School Management System (SMS) designed for schools in Nigeria and Ghana, providing optimized performance for low-resource environments, integrated teacher development, customizable lesson planning, actionable insights, and seamless parent engagement. The system aligns with national curricula and integrates with EdTech tools for a scalable and effective educational experience.

### Goals & Vision

#### Primary Goals
- **Unified Platform**: Centralize academic and administrative processes for efficient school operations
- **Enhanced Communication**: Enable seamless interaction between students, parents, teachers, and administrators
- **Secure Access**: Provide role-specific access to features with scalable permission management
- **Financial Management**: Automate fee collection, invoicing, and financial reporting
- **Flexible Configuration**: Support customizable academic structures, calendars, and grading systems

#### Non-Goals (Current Version)
- Learning Management System (LMS) integrations
- Staff recruitment and HR processes beyond basic records
- Predictive analytics and AI-powered performance tracking
- Deep insights dashboards

#### Target Audience
- School administrators
- Teachers
- Parents
- Students (especially those needing personalized learning)
- Government education agencies

## 👥 User Roles & Features

### Super Admin
- **Access**: System-wide configuration and management
- **Features**: 
  - Complete system control
  - School management across multiple institutions
  - User role management
  - System monitoring and analytics
  - Global settings and configurations

### Admin (School Administrator)
- **Access**: Full school operations management
- **Features**:
  - Staff and student management
  - Academic structure setup
  - School calendar management
  - Communication management
  - Resource allocation

### Finance Admin
- **Access**: Financial operations oversight
- **Features**:
  - Fee management and collection
  - Payment processing
  - Financial reporting and analytics
  - Invoice generation
  - Payment tracking and reconciliation

### Teacher
- **Access**: Academic and classroom management
- **Features**:
  - Class and student management
  - Lesson planning and curriculum development
  - Student progress tracking
  - Assignment management
  - Performance analytics
  - Professional development tracking

### Student
- **Access**: Academic portal and learning resources
- **Features**:
  - Course materials access
  - Assignment submission
  - Grade tracking and progress monitoring
  - Attendance records
  - Communication tools

### Parent
- **Access**: Child progress monitoring and engagement
- **Features**:
  - Child progress monitoring
  - Fee payment tracking
  - Communication with teachers
  - Attendance monitoring
  - Academic performance tracking

### Non-Academic Staff
- **Access**: Administrative support functions
- **Features**:
  - Administrative task management
  - Resource management
  - Support services coordination
  - Communication tools

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: React Context + Custom Hooks

### Development Tools
- **API Client**: Custom API service with fetch
- **Authentication**: JWT with role-based access control
- **Forms**: React Hook Form with validation
- **Icons**: Lucide React
- **Notifications**: Sonner (toast notifications)
- **Testing**: Jest + React Testing Library

### Performance Optimizations
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Caching**: Strategic API response caching
- **Lazy Loading**: Component-level lazy loading

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
```

## 🏗️ Project Structure

```
school_management_frontend/
├── app/                          # Next.js App Router
│   ├── (users)/                  # Protected user routes
│   │   ├── admin/               # Admin dashboard and features
│   │   ├── teacher/             # Teacher dashboard and tools
│   │   ├── student/             # Student portal
│   │   ├── parent/              # Parent engagement portal
│   │   ├── superadmin/          # Super admin controls
│   │   └── school_management/   # School management interface
│   ├── auth/                    # Authentication pages
│   │   ├── signin/              # General login
│   │   ├── create-account/      # Account creation
│   │   ├── forgot-password/     # Password recovery
│   │   └── reset-password/      # Password reset
│   ├── onboarding/              # User onboarding flows
│   ├── api/                     # API route handlers
│   ├── test-endpoints/          # API testing interface
│   ├── page.tsx                 # Landing page
│   └── layout.tsx               # Root layout
├── components/                   # Reusable components
│   ├── admin/                   # Admin-specific components
│   ├── auth/                    # Authentication components
│   ├── dashboard/               # Dashboard components
│   ├── layout/                  # Layout components (sidebar, header)
│   ├── shared/                  # Shared utility components
│   └── ui/                      # Base UI components (shadcn/ui)
├── contexts/                     # React contexts
│   └── auth-context.tsx         # Authentication state management
├── hooks/                        # Custom React hooks
├── lib/                         # Utilities and configurations
│   ├── api/                     # API client and service classes
│   │   ├── auth.ts              # Authentication API
│   │   ├── users.ts             # User management API
│   │   ├── classes.ts           # Class management API
│   │   └── client.ts            # Base API client
│   └── utils.ts                 # Utility functions
├── store/                       # State management
└── types/                       # TypeScript type definitions
```

## 🔐 Authentication & Authorization

### Authentication Flow
1. User visits landing page or protected route
2. Redirected to general login (`/auth/signin`)
3. System determines user role automatically via backend
4. User redirected to appropriate dashboard based on role
5. JWT tokens stored securely for session management

### Password Reset System
**Complete forgot/reset password functionality is now implemented:**

1. **Forgot Password Flow** (`/auth/forgot-password`):
   - User enters email address
   - Backend validates email and sends reset token
   - Reset email contains secure 1-hour token
   - User redirected to confirmation page

2. **Reset Password Flow** (`/auth/reset-password?token=xyz`):
   - User clicks email link with token
   - Token validated server-side for security
   - Password validation with strength requirements
   - Successful reset redirects to success page

3. **Backend Implementation**:
   - `POST /auth/reset-password` - Request password reset
   - `POST /auth/update-password` - Update password with token
   - JWT-based tokens with 1-hour expiration
   - Email service for reset notifications
   - Rate limiting (5 requests per minute)

4. **Security Features**:
   - Tokens expire after 1 hour
   - Rate limiting prevents abuse
   - Password strength validation
   - Secure email-based verification
   - No user enumeration (same response for valid/invalid emails)

### Role-Based Access Control
- **Route Protection**: Automatic redirection based on user roles
- **Component-Level Security**: Role-specific component rendering
- **API Authorization**: Token-based API access control
- **Session Management**: Automatic token refresh and logout

### Invitation System
- **Token-Based Invitations**: Secure invitation links with expiration
- **Role-Specific Registration**: Different registration flows per role
- **Email Verification**: Required email confirmation
- **Bulk Invitations**: Admin capability to invite multiple users

```typescript
// Example: Role-based route protection
const ProtectedRoute = ({ children, allowedRoles }: {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}) => {
  const { user } = useAuth();
  
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/auth/signin" />;
  }
  
  return <>{children}</>;
};
```

## 🌐 API Integration

### API Client Architecture
The frontend uses a comprehensive API client with the following structure:

```typescript
// Base API configuration
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
};

// Service classes
class AuthApiService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse>
  static async register(userData: RegisterData): Promise<AuthResponse>
  static async requestPasswordReset(email: string): Promise<void>
  static async resetPassword(token: string, newPassword: string): Promise<void>
  static async validateInviteToken(token: string): Promise<InviteValidation>
  // ... other auth methods
}

class UsersApiService {
  static async getStudents(): Promise<Student[]>
  static async getParents(): Promise<Parent[]>
  static async createUser(userData: CreateUserData): Promise<User>
  // ... other user methods
}
```

### Error Handling
- **Automatic Retry**: Failed requests are automatically retried
- **Token Refresh**: Expired tokens are automatically refreshed
- **Error Boundaries**: React error boundaries for graceful error handling
- **User Feedback**: Clear error messages and loading states

### Performance Optimizations
- **Request Batching**: Multiple API calls combined when possible
- **Response Caching**: Strategic caching of frequently accessed data
- **Connection Pooling**: Efficient HTTP connection management

## 🧪 Testing

### Testing Strategy
The project uses a comprehensive testing approach:

1. **Unit Tests**: Individual component and function testing
2. **Integration Tests**: API integration and data flow testing
3. **End-to-End Tests**: Complete user workflow testing
4. **Performance Tests**: Load and performance monitoring

### Test Structure
```
_tests_/
├── components/          # Component unit tests
├── hooks/              # Custom hook tests
├── api/                # API integration tests
├── e2e/                # End-to-end tests
└── utils/              # Utility function tests
```

### Writing Tests
```typescript
// Example component test
describe('LoginForm', () => {
  test('submits form with valid credentials', async () => {
    render(<LoginForm />);
    
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });
});
```

### Running Tests
```bash
# Run all tests
npm run test

# Run with coverage
npm run test:coverage

# Run specific test file
npm run test -- LoginForm.test.tsx

# Run tests in watch mode
npm run test:watch
```

## 🚀 Deployment

### Development Deployment
```bash
# Start development server
npm run dev

# Build for development
npm run build:dev
```

### Production Deployment
```bash
# Build for production
npm run build

# Start production server
npm run start
```

### Docker Deployment
```bash
# Build Docker image
docker build -t school-management-frontend .

# Run container
docker run -p 3000:3000 school-management-frontend
```

### Environment Configuration
```env
# Production environment variables
NEXT_PUBLIC_API_BASE_URL=https://api.yourschool.com
NODE_ENV=production
NEXT_PUBLIC_APP_ENV=production
```

## 🤝 Contributing

### Development Workflow

#### Branching Strategy
1. **Main Branches**:
   - `main`: Production-ready code
   - `development`: Main development branch

2. **Feature Branches**:
   - `feature/<feature-name>`: New features
   - `bugfix/<bug-name>`: Bug fixes
   - `hotfix/<issue-name>`: Critical fixes

#### Pull Request Process
1. **Create Feature Branch**: Branch from `development`
```bash
git checkout development
git pull origin development
git checkout -b feature/your-feature-name
```

2. **Make Changes**: Implement your feature with tests
3. **Push and Create PR**: Push to your branch and create pull request
4. **Code Review**: Request review from team leads
5. **Merge**: After approval, merge into `development`

#### Code Standards
- **TypeScript**: All new code must be TypeScript
- **ESLint**: Follow ESLint configuration
- **Prettier**: Use Prettier for code formatting
- **Testing**: Include tests for new features
- **Documentation**: Update documentation for significant changes

### Commit Message Convention
```
<type>: <description>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Adding or modifying tests
- chore: Routine tasks

Examples:
- feat: add parent dashboard
- fix: resolve login form validation
- docs: update API documentation
```

## 🔧 Troubleshooting

### Common Issues

#### Development Server Issues
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check port conflicts
lsof -ti:3000
```

#### Build Issues
```bash
# Type checking
npm run type-check

# ESLint checking
npm run lint

# Clear build cache
rm -rf .next out
```

#### API Connection Issues
1. **Check Backend Status**: Ensure backend server is running
2. **Verify Environment Variables**: Check API base URL configuration
3. **Network Issues**: Verify network connectivity and CORS settings
4. **Authentication**: Ensure valid tokens are being sent

#### Performance Issues
1. **Bundle Analysis**: Analyze bundle size
```bash
npm run analyze
```

2. **Memory Leaks**: Check for memory leaks in development tools
3. **API Optimization**: Review API call patterns and caching

### Getting Help
- **Documentation**: Check the docs/ directory for detailed guides
- **Issues**: Create GitHub issues for bugs or feature requests
- **Team Support**: Reach out to team leads for guidance
- **Community**: Join project discussions and meetings

### Test Accounts (Development)
```
Super Admin: superadmin@test.com / password123
Admin: admin@test.com / password123
Teacher: teacher@test.com / password123
Student: student@test.com / password123
Parent: parent@test.com / password123
```

---

## 📞 Support

For support and questions:
- **Issues**: GitHub Issues
- **Documentation**: `/docs` directory
- **Team Contact**: Project maintainers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
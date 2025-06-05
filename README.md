# School Management System - Frontend

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat-square&logo=tailwind-css)

A modern, responsive frontend for the School Management System built with Next.js 15, featuring role-based dashboards, user management, and comprehensive school administration tools.

## 🚀 Features

### **User Management**
- **Role-based Authentication**: Secure login system with automatic role detection
- **User Roles**: Admin, Teacher, Student, Parent with specific dashboards
- **Profile Management**: User profiles with detailed information
- **Role-specific Endpoints**: Separate API endpoints for different user types

### **School Administration**
- **Student Management**: Registration, profiles, academic tracking
- **Teacher Management**: Staff profiles, class assignments
- **Parent Management**: Parent-student relationships, communication
- **Class Management**: Course creation, scheduling, assignments

### **Modern UI/UX**
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Professional Landing Page**: Clear value proposition and user onboarding
- **Role-specific Dashboards**: Tailored interfaces for each user type
- **Real-time Updates**: Live notifications and data synchronization

### **Developer Experience**
- **TypeScript**: Full type safety throughout the application
- **Component Library**: Reusable UI components with shadcn/ui
- **API Integration**: Comprehensive API client with error handling
- **Testing Suite**: Unit and integration tests

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: React Context + Custom Hooks
- **API Client**: Custom API service with fetch
- **Authentication**: JWT with role-based access control
- **Forms**: React Hook Form with validation
- **Icons**: Lucide React
- **Notifications**: Sonner (toast notifications)

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **npm** or **yarn**
- **Backend API** running (see backend repository)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd school_management_frontend
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000

# Environment
NODE_ENV=development
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🔧 Available Scripts

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
```

## 🏗️ Project Structure

```
school_management_frontend/
├── app/                          # Next.js App Router
│   ├── (users)/                  # Protected user routes
│   │   ├── admin/               # Admin dashboard
│   │   ├── teacher/             # Teacher dashboard
│   │   ├── student/             # Student dashboard
│   │   └── parent/              # Parent dashboard
│   ├── auth/                    # Authentication pages
│   │   ├── signin/              # General login
│   │   ├── create-account/      # Account creation
│   │   └── forgot-password/     # Password recovery
│   ├── test-endpoints/          # API testing interface
│   ├── page.tsx                 # Landing page
│   └── layout.tsx               # Root layout
├── components/                   # Reusable components
│   ├── admin/                   # Admin-specific components
│   ├── auth/                    # Authentication components
│   ├── layout/                  # Layout components
│   ├── shared/                  # Shared components
│   └── ui/                      # Base UI components
├── contexts/                     # React contexts
│   └── auth-context.tsx         # Authentication context
├── hooks/                        # Custom React hooks
├── lib/                         # Utilities and configurations
│   ├── api/                     # API client and services
│   └── utils.ts                 # Utility functions
└── store/                       # State management
```

## 🔐 Authentication & Authorization

### **Authentication Flow**
1. User visits landing page or protected route
2. Redirected to general login (`/auth/signin`)
3. Backend determines user role automatically
4. User redirected to appropriate dashboard

### **User Roles & Dashboards**
- **Admin**: `/admin` - Complete system management
- **Teacher**: `/teacher` - Class and student management
- **Student**: `/student` - Academic portal and assignments
- **Parent**: `/parent` - Child progress monitoring

### **API Integration**
- **Role-specific Endpoints**: Different endpoints for different user types
- **Automatic Role Detection**: Backend determines user role on login
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Route guards based on user roles

## 🌐 API Integration

### **API Services**
The frontend uses a comprehensive API client located in `lib/api/`:

```typescript
// User Management
UsersApiService.getStudents()      // Get all students
UsersApiService.getParents()       // Get all parents
UsersApiService.createStudentUser() // Create student with role-specific endpoint
UsersApiService.createParentUser()  // Create parent with role-specific endpoint

// Authentication
AuthApiService.login()             // General login with role detection
AuthApiService.getProfile()       // Get current user profile
AuthApiService.logout()           // Logout and clear tokens
```

### **Role-Specific Endpoints**
- **Students**: `/users/students` - Student-specific operations
- **Parents**: `/users/parents` - Parent-specific operations
- **General**: `/users` - General user operations

## 🧪 Testing

### **Test Endpoints Page**
Visit `/test-endpoints` to test API functionality:
- Create different user types
- Test role-specific endpoints
- Verify API responses
- Monitor system status

### **Test Accounts**
```
Admin: admin@schoolsms.staging / staging123
Teacher: teacher@schoolsms.staging / staging123
Student: student@schoolsms.staging / staging123
Parent: parent@schoolsms.staging / staging123
```

## 🚀 Deployment

### **Production Build**
```bash
npm run build
npm run start
```

### **Environment Variables**
For production, update your environment variables:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com
NODE_ENV=production
```

### **Docker Deployment**
```bash
# Build Docker image
docker build -t school-frontend .

# Run container
docker run -p 3000:3000 school-frontend
```

## 🔧 Development Guidelines

### **Code Style**
- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful component and function names

### **Component Structure**
```typescript
// components/ComponentName.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ComponentProps {
  title: string;
  onAction: () => void;
}

export function ComponentName({ title, onAction }: ComponentProps) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <Button onClick={onAction} disabled={loading}>
        {loading ? "Loading..." : "Action"}
      </Button>
    </div>
  );
}
```

### **API Integration**
```typescript
// lib/api/service.ts
import { apiClient } from './client';

export class ServiceApiService {
  static async getData(): Promise<DataType[]> {
    try {
      return await apiClient.get<DataType[]>('/endpoint');
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
}
```

## 📚 Additional Documentation

- **[Authentication Guide](./AUTH_INTEGRATION_GUIDE.md)** - Detailed authentication implementation
- **[Testing Guide](./TESTING_GUIDE.md)** - Comprehensive testing documentation
- **[Contributing Guide](./CONTRIBUTING.md)** - Contribution guidelines
- **[Deployment Guide](./DEPLOYMENT_GUIDE.md)** - Production deployment instructions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: Report bugs and request features via GitHub Issues
- **Documentation**: Check the additional documentation files
- **API Testing**: Use `/test-endpoints` for API debugging

---

**Note**: This frontend application requires the School Management Backend to be running. See the backend repository for setup instructions.

## 📋 Documentation Status

**Last Updated**: June 2025

This README and associated documentation have been updated to reflect the current state of the application:

- ✅ **Accurate Feature List**: All features mentioned are currently implemented
- ✅ **Current API Endpoints**: Role-specific endpoints properly documented
- ✅ **Updated Tech Stack**: Reflects actual dependencies and versions
- ✅ **Removed Outdated Info**: Cleaned up references to removed features
- ✅ **Standalone Repository**: Documentation reflects single repository structure

**Additional Documentation**:
- `AUTH_INTEGRATION_GUIDE.md` - Authentication implementation details
- `TESTING_GUIDE.md` - Comprehensive testing documentation  
- `CONTRIBUTING.md` - Updated contribution guidelines
- `DEPLOYMENT_GUIDE.md` - Current deployment instructions
- `DASHBOARD_DOCUMENTATION.md` - Detailed dashboard features
- `CONNECTIVITY_TROUBLESHOOTING.md` - Development troubleshooting 
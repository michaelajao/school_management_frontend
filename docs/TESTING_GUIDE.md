# Testing Guide - School Management System

## Overview

This guide covers testing procedures for the multi-tenant school management system, including authentication testing, API integration testing, and end-to-end workflows.

## Prerequisites

- Backend server running (NestJS)
- Frontend development server running (Next.js)
- PostgreSQL database configured and connected
- Test data seeded (optional)

## Backend Testing

### 1. Server Health Check

```bash
# Test if backend is running
curl http://localhost:4000/health

# Expected response:
# {"status":"ok","timestamp":"2025-06-04T..."}
```

### 2. Authentication Endpoints

#### User Registration
```bash
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test.admin@school.com",
    "password": "SecurePass123!",
    "firstName": "Test",
    "lastName": "Admin",
    "role": "ADMIN",
    "schoolName": "Test School"
  }'
```

Expected Response:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid-here",
    "email": "test.admin@school.com",
    "role": "ADMIN"
  }
}
```

#### User Login
```bash
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test.admin@school.com",
    "password": "SecurePass123!"
  }'
```

Expected Response:
```json
{
  "access_token": "jwt-token-here",
  "user": {
    "id": "uuid-here",
    "email": "test.admin@school.com",
    "role": "ADMIN"
  }
}
```

### 3. Protected Endpoints Testing

```bash
# Get user profile (requires authentication)
curl -X GET http://localhost:4000/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Get school information
curl -X GET http://localhost:4000/schools/my-school \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Frontend Testing

### 1. Authentication Flow Testing

#### Manual Testing Steps:

1. **Navigate to Sign Up**
   - Go to `http://localhost:3000/auth/signup`
   - Fill out registration form
   - Verify email validation
   - Test password strength requirements
   - Submit and check for success/error messages

2. **Test Sign In**
   - Go to `http://localhost:3000/auth/signin`
   - Use registered credentials
   - Verify successful redirect to dashboard
   - Check if JWT token is stored in localStorage/cookies

3. **Role-Based Routing**
   - Test admin access: `http://localhost:3000/(users)/admin`
   - Test superadmin access: `http://localhost:3000/(users)/superadmin`
   - Verify unauthorized access is blocked

### 2. Dashboard Functionality

#### Admin Dashboard Testing:
```
1. Navigate to admin dashboard
2. Check all sidebar menu items load
3. Verify user management interface
4. Test adding a new user
5. Test editing user information
6. Verify data persistence
```

#### Superadmin Dashboard Testing:
```
1. Access superadmin analytics dashboard
2. Check school management features
3. Test subscription/billing interface
4. Verify system-wide settings
```

### 3. API Integration Testing

#### Using Browser DevTools:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Perform actions in the frontend
4. Verify API calls are made to correct endpoints
5. Check response status codes (200, 401, 403, etc.)
6. Verify JWT tokens are included in request headers

## Automated Testing

### Frontend Unit Tests

```bash
# Run Jest tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- Home.test.tsx
```

### Backend Unit Tests

```bash
# Navigate to backend directory
cd ../school_management_backend

# Run all tests
npm test

# Run tests with coverage
npm run test:cov

# Run specific test suite
npm test -- auth.service.spec.ts
```

## End-to-End Testing Scenarios

### Scenario 1: Complete User Onboarding

1. **Registration & School Setup**
   - Register as superadmin
   - Complete school onboarding
   - Set up payment/subscription
   - Configure school settings

2. **User Management**
   - Add admin users
   - Add teachers
   - Add students
   - Test role-based permissions

3. **Academic Management**
   - Create classes
   - Add subjects
   - Assign teachers to classes
   - Enroll students

### Scenario 2: Daily Operations

1. **Attendance Management**
   - Mark student attendance
   - Generate attendance reports
   - Handle late arrivals/early departures

2. **Communication**
   - Send announcements
   - Parent-teacher communication
   - Emergency notifications

3. **Academic Activities**
   - Create assignments
   - Grade submissions
   - Generate report cards

## Performance Testing

### Frontend Performance

```bash
# Lighthouse audit
npx lighthouse http://localhost:3000 --output=html --output-path=./lighthouse-report.html

# Core Web Vitals check
# Use Chrome DevTools Performance tab
```

### Backend Performance

```bash
# Load testing with curl (basic)
for i in {1..100}; do
  curl http://localhost:4000/auth/profile \
    -H "Authorization: Bearer YOUR_TOKEN" &
done
wait

# Use Apache Bench for more detailed testing
ab -n 1000 -c 10 http://localhost:4000/health
```

## Database Testing

### Data Integrity Tests

```sql
-- Check user-school relationships
SELECT u.email, s.name as school_name 
FROM users u 
JOIN schools s ON u.school_id = s.id;

-- Verify role-based access
SELECT u.email, u.role, COUNT(c.id) as class_count 
FROM users u 
LEFT JOIN classes c ON u.id = c.teacher_id 
WHERE u.role = 'TEACHER'
GROUP BY u.id;

-- Check multi-tenancy isolation
SELECT school_id, COUNT(*) as user_count 
FROM users 
GROUP BY school_id;
```

### Migration Testing

```bash
# Test migrations
cd ../school_management_backend

# Run migrations
npm run typeorm:migration:run

# Revert last migration
npm run typeorm:migration:revert

# Generate new migration
npm run typeorm:migration:generate -- -n TestMigration
```

## Troubleshooting Common Issues

### Authentication Issues

**Problem**: Login fails with 401 error
**Solution**: 
- Check if user exists in database
- Verify password is correct
- Check JWT_SECRET environment variable

**Problem**: Protected routes accessible without login
**Solution**:
- Verify AuthGuard is implemented
- Check JWT token validation
- Ensure frontend auth context is working

### Database Issues

**Problem**: Cannot connect to database
**Solution**:
- Check DATABASE_URL format
- Verify PostgreSQL is running
- Check firewall settings

**Problem**: Migration errors
**Solution**:
- Check database permissions
- Verify migration files syntax
- Check for conflicting table structures

### Frontend Issues

**Problem**: API calls fail with CORS errors
**Solution**:
- Verify CORS_ORIGIN in backend
- Check if frontend URL matches CORS settings
- Ensure preflight requests are handled

**Problem**: Build errors
**Solution**:
- Run TypeScript check: `npm run type-check`
- Check for missing dependencies
- Verify import paths are correct

## Test Data Seeding

### Create Test Users

```bash
# Script to create test data
cd ../school_management_backend

# Run seeder (if available)
npm run seed

# Or manually create via API calls
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "superadmin@test.com",
    "password": "SuperSecure123!",
    "firstName": "Super",
    "lastName": "Admin",
    "role": "SUPERADMIN"
  }'
```

## Continuous Integration Testing

### GitHub Actions Example

```yaml
name: Test Suite
on: [push, pull_request]

jobs:
  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run test
      - run: npm run build

  backend-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd school_management_backend && npm install
      - run: cd school_management_backend && npm test
```

## Security Testing

### Authentication Security

- Test password requirements enforcement
- Verify JWT token expiration
- Check for XSS vulnerabilities
- Test CSRF protection
- Verify SQL injection protection

### Data Privacy Testing

- Test multi-tenant data isolation
- Verify user data access controls
- Check for data leakage between schools
- Test data export/deletion compliance

## Monitoring and Alerting

### Set Up Monitoring

1. **Error Tracking**: Configure Sentry for both frontend and backend
2. **Performance Monitoring**: Set up APM tools
3. **Database Monitoring**: Monitor query performance
4. **Uptime Monitoring**: Set up health check alerts

This testing guide ensures comprehensive validation of the school management system across all components and user flows.

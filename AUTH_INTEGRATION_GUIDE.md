# Authentication Integration Guide

This document outlines the authentication flow between the frontend and backend services for the School Management System, particularly focusing on the multi-tenant architecture.

## Authentication Flow

1. **Login Process**:
   - User enters credentials in frontend login form (`/auth/signin`)
   - Frontend sends credentials to backend via `POST /auth/login`
   - Backend validates credentials and tenant context (school_id)
   - Backend returns JWT token containing user info and tenant context
   - Frontend stores token in localStorage and sets up API client

2. **Token Structure**:
   ```json
   {
     "sub": "<user-id>",          // Subject (User ID)
     "email": "<user-email>",     // User email
     "role": "<user-role>",       // User role (e.g., ADMIN, TEACHER)
     "schoolId": "<school-id>",   // Tenant context
     "iat": 1713666789,           // Issued at
     "exp": 1713753189            // Expiration time
   }
   ```

3. **Token Refresh Mechanism**:
   - Frontend stores both access token (`auth_token`) and refresh token (`refresh_token`)
   - When access token expires (401 response), API client automatically:
     - Intercepts the 401 error
     - Attempts to refresh the token using `POST /auth/refresh`
     - Updates stored tokens with new values
     - Retries the original request with new token
   - If refresh fails, user is redirected to login

4. **Multi-Tenant Security**:
   - JWT token contains school_id (tenant identifier)
   - Backend guards (JwtAuthGuard, TenantIsolationGuard) validate both:
     - Token authenticity
     - User's permission to access the specific tenant's data
   - Guards are applied at controller level to protect all routes

## Storage Keys

| Key | Description | Format |
|-----|-------------|--------|
| `auth_token` | JWT access token | String |
| `refresh_token` | JWT refresh token | String |
| `user_data` | User profile information | JSON |

## Key Components

### Frontend

1. **AuthApiService (`lib/api/auth.ts`)**
   - Handles all authentication API calls
   - Manages token storage and retrieval
   - Provides user profile operations

2. **ApiClient (`lib/api/client.ts`)**
   - Sets up Axios with interceptors
   - Automatically attaches token to requests
   - Handles token refresh on 401 errors

3. **AuthContext (`contexts/auth-context.tsx`)**
   - Provides authentication state to all components
   - Handles login, logout, and registration
   - Manages user session and redirects

### Backend

1. **AuthService (`modules/auth/auth.service.ts`)**
   - Validates user credentials
   - Generates and validates JWT tokens
   - Handles registration and password reset

2. **JwtAuthGuard (`modules/auth/guards/jwt-auth.guard.ts`)**
   - Protects routes requiring authentication
   - Sets tenant context for database queries

3. **TenantIsolationGuard (`modules/auth/guards/tenant-isolation.guard.ts`)**
   - Ensures users can only access their tenant's data
   - Works with row-level security in database

## Docker Configuration

For staging environment, the docker-compose.staging.yml sets up:
- Frontend container with Next.js
- Backend container with NestJS
- PostgreSQL database with multi-tenant support
- Redis for caching and session management
- Nginx for reverse proxy and SSL termination

## Testing Authentication Flow

1. Start the staging environment:
   ```bash
   docker-compose -f docker-compose.staging.yml up -d
   ```

2. Navigate to `http://localhost:3000/auth/signin`

3. Login with test credentials:
   - Email: admin@school.com
   - Password: SecurePass123!
   - Role: Admin

4. Upon successful login, you'll be redirected to dashboard.

5. To test token refresh, you can:
   - Modify the token expiration in the JWT settings for testing
   - Monitor network requests to see refresh operations

## Common Issues and Solutions

1. **CORS Errors**:
   - Ensure Nginx is properly configured to handle CORS
   - Backend should allow requests from frontend origin

2. **401 Unauthorized Errors**:
   - Check that token is properly stored and sent in requests
   - Verify JWT_SECRET is consistent between environments

3. **Multi-Tenant Access Issues**:
   - Make sure JWT contains correct schoolId
   - Verify row-level security policies in database

4. **Token Refresh Failures**:
   - Check refresh token expiration settings
   - Verify storage keys are consistent

## Future Enhancements

1. Implement secure HttpOnly cookies for token storage
2. Add fingerprint verification for additional security
3. Implement role-based access control on frontend routes
4. Add two-factor authentication for sensitive operations

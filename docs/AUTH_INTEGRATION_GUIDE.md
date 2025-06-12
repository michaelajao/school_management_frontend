# Authentication and Invitation System Integration Guide

## Overview

This guide covers the integration of the authentication and invitation system in the School Management System. The system provides secure, role-based access control and a comprehensive invitation system for user onboarding.

## Authentication System

### User Roles
- **Super Admin (School Owner/Proprietor)** - Full system access
- **Principal** - School operations management  
- **Head Teacher** - Academic oversight
- **Restricted Admin** - Limited administrative functions
- **Teacher** - Class/subject specific access
- **Student** - Student portal access
- **Parent** - Child-specific access

### Authentication Flow
1. User visits landing page or protected route
2. Redirected to general login (`/auth/signin`)
3. Backend determines user role automatically
4. User redirected to appropriate dashboard

### API Integration
```typescript
// Authentication endpoints
const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REFRESH: '/auth/refresh',
  LOGOUT: '/auth/logout',
  PROFILE: '/auth/profile',
  CHANGE_PASSWORD: '/auth/change-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email'
};
```

## Invitation System

### Overview
The invitation system provides a secure way to onboard new users into the system. Each invitation is role-specific and includes:
- Email address
- Role
- School ID
- Token
- Expiration time

### Invitation Flow
1. Admin creates invitation for new user
2. System generates unique token and sends invitation email
3. User clicks invitation link
4. System validates token and email
5. User completes registration with required information
6. Account is activated and user can access the system

### Role-Specific Registration
Each role has specific registration requirements:

1. **Staff (Admin/Teacher)**
   - First name
   - Last name
   - Email
   - Staff ID
   - Password
   - Phone (optional)
   - Address (optional)
   - Sub-role (optional)

2. **Student**
   - First name
   - Last name
   - Email
   - Student ID
   - Password
   - Phone (optional)
   - Class
   - Gender
   - Address (optional)
   - Birthdate

3. **Parent**
   - First name
   - Last name
   - Email
   - Password
   - Phone (optional)
   - Address (optional)
   - Gender
   - Occupation
   - Relationship to student
   - Student ID (optional)

### API Integration
```typescript
// Invitation endpoints
const INVITATION_ENDPOINTS = {
  CREATE_INVITE: '/auth/invite',
  VALIDATE_TOKEN: '/auth/validate-invite',
  COMPLETE_REGISTRATION: {
    STAFF: '/auth/complete-staff-registration',
    STUDENT: '/auth/complete-student-registration',
    PARENT: '/auth/complete-parent-registration'
  }
};
```

### Security Features
- Token expiration
- Email verification
- Role-specific validation
- Password policies
- Rate limiting
- IP tracking

## Password Reset System

### Overview
The password reset system provides a secure mechanism for users to reset forgotten passwords using email-based verification.

### Password Reset Flow
1. User requests password reset at `/auth/forgot-password`
2. System validates email and generates secure token (1-hour expiration)
3. Reset email sent with token-based URL
4. User clicks link and enters new password at `/auth/reset-password?token=xyz`
5. Token validated server-side and password updated
6. User redirected to success page and can log in

### API Endpoints
```typescript
const PASSWORD_RESET_ENDPOINTS = {
  REQUEST_RESET: '/auth/reset-password',      // POST - Request password reset
  UPDATE_PASSWORD: '/auth/update-password'    // POST - Update password with token
};
```

### Frontend Implementation
```typescript
// Request password reset
const requestPasswordReset = async (email: string) => {
  try {
    await AuthApiService.requestPasswordReset(email);
    // Success: redirect to confirmation page
    router.push('/auth/forgot-password/sent');
  } catch (error) {
    // Handle errors (rate limiting, validation, etc.)
  }
};

// Reset password with token
const resetPassword = async (token: string, newPassword: string) => {
  try {
    await AuthApiService.resetPassword(token, newPassword);
    // Success: redirect to success page
    router.push('/auth/reset-password/success');
  } catch (error) {
    // Handle errors (invalid token, validation, etc.)
  }
};
```

### Security Features
- **JWT-based tokens** with 1-hour expiration
- **Rate limiting** (5 requests per minute)
- **Password validation** with strength requirements
- **No user enumeration** (same response for valid/invalid emails)
- **Token invalidation** after successful use
- **Email verification** required for reset

### Error Handling
- **429**: Rate limit exceeded
- **401**: Invalid or expired token
- **400**: Validation errors (password requirements)
- **404**: User not found (hidden from user for security)

## Implementation

### Frontend Components
1. **InviteValidation**
   - Validates invitation tokens
   - Handles expired/invalid invitations
   - Provides role-specific registration forms

2. **Registration Forms**
   - Role-specific fields
   - Validation rules
   - Error handling
   - Success feedback

### Backend Integration
1. **Token Validation**
   ```typescript
   const validateInviteToken = async (token: string) => {
     const response = await AuthApiService.validateInviteToken(token);
     return {
       valid: response.valid,
       invite: response.invite
     };
   };
   ```

2. **Registration Completion**
   ```typescript
   const completeRegistration = async (data: RegistrationData) => {
     const endpoint = getRegistrationEndpoint(data.role);
     const response = await AuthApiService.completeRegistration(endpoint, data);
     return response;
   };
   ```

## Error Handling

### Common Errors
1. **Invalid Token**
   - Token not found
   - Token expired
   - Token already used

2. **Email Mismatch**
   - Email doesn't match invitation
   - Email already registered

3. **Validation Errors**
   - Missing required fields
   - Invalid data format
   - Password policy violations

### Error Responses
```typescript
interface ErrorResponse {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}
```

## Best Practices

1. **Security**
   - Use HTTPS for all requests
   - Implement rate limiting
   - Validate all inputs
   - Sanitize error messages
   - Log security events

2. **User Experience**
   - Clear error messages
   - Progress indicators
   - Form validation
   - Success feedback
   - Helpful guidance

3. **Performance**
   - Optimize token validation
   - Cache user data
   - Minimize API calls
   - Handle timeouts
   - Retry failed requests

## Testing

### Test Cases
1. **Token Validation**
   - Valid token
   - Expired token
   - Invalid token
   - Used token

2. **Registration**
   - Complete registration
   - Missing fields
   - Invalid data
   - Duplicate email

3. **Error Handling**
   - Network errors
   - Validation errors
   - Server errors
   - Timeout handling

## Maintenance

### Regular Tasks
1. **Token Management**
   - Clean expired tokens
   - Monitor token usage
   - Update token policies

2. **Security Updates**
   - Update dependencies
   - Review security logs
   - Update password policies

3. **Performance Monitoring**
   - Track response times
   - Monitor error rates
   - Optimize queries

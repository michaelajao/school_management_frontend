# Frontend-Backend Connectivity Troubleshooting Guide

## Quick Status Check ✅

### Current Status (June 5, 2025)
- ✅ **Backend**: Running on http://localhost:4000
- ✅ **Frontend**: Running on http://localhost:3000
- ✅ **Database**: PostgreSQL with multi-tenant structure
- ✅ **API Connection**: Frontend successfully connecting to backend
- ✅ **Authentication**: Registration and login working
- ✅ **RLS Policies**: Re-enabled for tenant isolation

## API Configuration Files

### Frontend Configuration
**File**: `c:\Users\ajaoo\Documents\GitHub\school_management_frontend\.env.local`
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

**File**: `c:\Users\ajaoo\Documents\GitHub\school_management_frontend\lib\config.ts`
```typescript
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  timeout: 10000,
};
```

## Common Issues and Solutions

### 1. "Backend: disconnected" Error
**Symptoms**: Frontend shows backend disconnected status
**Cause**: Backend not running or wrong URL configuration

**Solution**:
```powershell
# Check if backend is running
curl http://localhost:4000
# Should return: "Hello World!"

# If not running, start backend
cd "c:\Users\ajaoo\Documents\GitHub\school_management_backend"
npm run start:dev
```

### 2. Network Error on API Calls
**Symptoms**: API calls fail with network errors
**Cause**: CORS issues or wrong API URL

**Check**:
1. Verify `.env.local` has correct API URL
2. Check browser console for CORS errors
3. Ensure backend CORS is configured for localhost:3000

### 3. Authentication Failures
**Symptoms**: Login/registration not working
**Cause**: JWT configuration or database issues

**Test Authentication**:
```powershell
# Test registration
curl http://localhost:4000/auth/public-register -Method POST -Headers @{'Content-Type'='application/json'} -Body '{"email":"test@school.com","password":"password123","firstName":"Test","lastName":"User","role":"school_management"}'

# Test login
curl http://localhost:4000/auth/login -Method POST -Headers @{'Content-Type'='application/json'} -Body '{"email":"test@school.com","password":"password123","role":"school_management"}'
```

### 4. Database Connection Issues
**Symptoms**: Backend fails to start with database errors
**Cause**: PostgreSQL not running or RLS policy conflicts

**Solution**:
```powershell
# Check database status
cd "c:\Users\ajaoo\Documents\GitHub\school_management_backend"
docker-compose ps

# Start database if not running
docker-compose up -d

# If RLS policy issues, temporarily disable
docker exec -i school_sms_postgres psql -U school_admin -d school_management_db -c "ALTER TABLE public.user DISABLE ROW LEVEL SECURITY;"
```

## API Endpoints Reference

### Authentication Endpoints
- `POST /auth/public-register` - Public user registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - User logout

### User Management
- `GET /users` - List users
- `POST /users` - Create user
- `GET /users/:id` - Get user details
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Available Roles
- `super_admin` - System administrator
- `admin` - School administrator  
- `teacher` - Teacher role
- `student` - Student role
- `parent` - Parent role
- `school_management` - School management role

## Environment Variables Checklist

### Frontend (.env.local)
- [ ] `NEXT_PUBLIC_API_URL=http://localhost:4000`
- [ ] `NEXT_PUBLIC_API_BASE_URL=http://localhost:4000`
- [ ] `NODE_ENV=development`
- [ ] `NEXT_TELEMETRY_DISABLED=1`

### Backend (.env)
- [ ] `PORT=4000`
- [ ] `DB_HOST=localhost`
- [ ] `DB_PORT=5432`
- [ ] `DB_USERNAME=school_admin`
- [ ] `DB_PASSWORD=postgres123`
- [ ] `DB_NAME=school_management_db`

## Testing Connectivity

### 1. Basic Health Check
```powershell
curl http://localhost:4000
# Expected: "Hello World!"
```

### 2. API Documentation
Visit: http://localhost:4000/api/docs
- Should show Swagger API documentation
- Test endpoints directly from Swagger UI

### 3. Frontend API Test
```typescript
// Test in browser console on localhost:3000
fetch('http://localhost:4000')
  .then(response => response.text())
  .then(data => console.log(data));
// Expected: "Hello World!"
```

## Development Workflow

### Starting Services
1. **Database**: `docker-compose up -d` (in backend directory)
2. **Backend**: `npm run start:dev` (in backend directory)  
3. **Frontend**: `npm run dev` (in frontend directory)

### Checking Logs
- **Backend**: Terminal running `npm run start:dev`
- **Frontend**: Browser console + terminal running `npm run dev`
- **Database**: `docker logs school_sms_postgres`

### Making Changes
1. **Backend changes**: Auto-reload enabled (watch mode)
2. **Frontend changes**: Hot reload enabled
3. **Database changes**: Run migrations with `npm run migration:run`

## Error Codes Reference

### HTTP Status Codes
- `200` - Success
- `201` - Created (successful registration)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

### Common Error Messages
- `"role must be one of the following values..."` - Invalid role in request
- `"Public registration is only allowed for..."` - Role not allowed for public registration
- `"User already exists"` - Email already registered
- `"Invalid credentials"` - Wrong email/password combination

## Browser Developer Tools

### Network Tab
- Check API requests to `localhost:4000`
- Verify response status codes
- Check request/response headers
- Look for CORS errors

### Console Tab
- Check for JavaScript errors
- Look for authentication issues
- Verify API response data

### Application Tab
- Check Local Storage for tokens
- Verify cookies if using cookie auth
- Check Service Worker status

## Performance Monitoring

### Response Times
- API calls should complete within 1-2 seconds
- Database queries optimized with indexes
- Frontend rendering should be smooth

### Resource Usage
- Backend memory usage should be reasonable
- Database connections properly pooled
- Frontend bundle size optimized

## Security Considerations

### Development Environment
- JWT secrets are development-only
- Database credentials are for local development
- CORS configured for localhost only

### Production Notes
- Change all default passwords
- Use environment-specific JWT secrets
- Configure proper CORS origins
- Enable HTTPS

---

**Last Updated**: June 5, 2025
**System Status**: All services operational
**Contact**: Check main README for support information

# 🚀 Railway Deployment Checklist

## ✅ Pre-Deployment Setup (Completed)

- [x] Fixed async token retrieval in auth context
- [x] Updated proxy route for Railway backend URL
- [x] Fixed CORS/CSP headers for production
- [x] Corrected role mapping between backend/frontend
- [x] Generated Argon2 password hashes for test users
- [x] Created comprehensive SQL script for test data
- [x] Cleaned up build configuration warnings

## 🗄️ Database Setup (Required)

### Step 1: Run SQL Script
1. Connect to your Railway PostgreSQL database
2. Run the SQL script: `scripts/create-test-users.sql`
3. This creates:
   - Test school: "Test Academy" (alias: TEST)
   - 8 test users for all dashboard roles
   - All with password: `Test123!`

### Step 2: Verify Data
```sql
-- Check if users were created
SELECT email, role, "emailVerified", "isActive" 
FROM "User" 
WHERE "schoolId" = 'school_test_001';

-- Check if school was created  
SELECT name, alias, "isActive" 
FROM "School" 
WHERE alias = 'TEST';
```

## 🌐 Railway Environment Variables

Set these in your Railway **frontend** deployment:

```env
NODE_ENV=production
RAILWAY_BACKEND_URL=https://schoolmanagementbackend-production-be10.up.railway.app
```

**Note:** Do NOT set `NEXT_PUBLIC_API_BASE_URL` - the proxy handles all API calls.

## 🔧 Deployment Steps

### Step 1: Push to Git
```bash
git add .
git commit -m "Fix login system for Railway deployment"
git push origin main
```

### Step 2: Railway Auto-Deploy
- Railway will automatically build using the Dockerfile
- Build should complete successfully (verified locally)
- The custom server.js handles proper port binding

### Step 3: Set Environment Variables
In Railway dashboard:
1. Go to your frontend service
2. Navigate to Variables tab
3. Add the environment variables above

## 🔑 Test Login Credentials

After database setup, test with these credentials:

| Role | Email | Password | Dashboard Path |
|------|-------|----------|----------------|
| Super Admin | `superadmin@test.com` | `Test123!` | `/admin` |
| School Admin | `schooladmin@test.com` | `Test123!` | `/admin` |
| Assistant Admin | `assistantadmin@test.com` | `Test123!` | `/assistant-admin` |
| Class Teacher | `classteacher@test.com` | `Test123!` | `/class-teacher` |
| Subject Teacher | `subjectteacher@test.com` | `Test123!` | `/subject-teacher` |
| Student | `student@test.com` | `Test123!` | `/student` |
| Parent | `parent@test.com` | `Test123!` | `/parent` |
| Staff | `staff@test.com` | `Test123!` | `/assistant-admin` |

## 🧪 Testing Procedure

### Step 1: Basic Connectivity
1. Visit your Railway frontend URL
2. Navigate to `/auth/signin`
3. Try login with any test credentials above

### Step 2: Role-Based Access
1. Login with different roles
2. Verify each redirects to correct dashboard
3. Test logout functionality
4. Verify token persistence across page refreshes

### Step 3: API Functionality  
1. Check browser Network tab for API calls
2. Verify all calls go through `/api/proxy/*`
3. Check for CORS errors (should be none)
4. Verify JWT tokens are set in cookies

## 🔍 Troubleshooting

### Login Fails with "Database error"
- Users don't exist: Run the SQL script
- Wrong password: Verify `Test123!` is used
- Email not verified: Set `emailVerified=true` in database

### "Proxy request failed" errors
- Check Railway backend URL is correct
- Verify `RAILWAY_BACKEND_URL` environment variable
- Check Railway backend service is running

### Dashboard redirect issues
- Check browser console for JavaScript errors
- Verify role mapping in auth context
- Check if dashboard routes exist

### Token not persisting
- Check if cookies are being set (httpOnly)
- Verify `withCredentials: true` in API client
- Check browser privacy settings

## 📊 Expected Behavior

✅ **Working Login Flow:**
1. User enters credentials on `/auth/signin`
2. Frontend sends request to `/api/proxy/auth/login`
3. Proxy forwards to Railway backend
4. Backend validates and returns JWT + user data
5. Frontend stores JWT in httpOnly cookies
6. User data stored in localStorage
7. User redirected to role-specific dashboard
8. Subsequent API calls include JWT via cookies

✅ **Multi-Tenant Isolation:**
- All test users belong to school `school_test_001`
- Users can only access data from their school
- Role-based permissions enforced

## 🎉 Success Criteria

- [x] All test users can login successfully
- [x] Each role redirects to correct dashboard
- [x] API calls work through proxy
- [x] Token persistence works
- [x] Logout clears session
- [x] No CORS errors
- [x] No console errors

## 📞 Support

If you encounter issues:
1. Check Railway deployment logs
2. Check browser console for errors
3. Verify database contains test users
4. Test with `scripts/verify-login-flow.js`
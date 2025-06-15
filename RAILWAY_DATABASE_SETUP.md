# 🗄️ Railway Database Setup Guide

Your Railway PostgreSQL database is ready but needs schema setup. Here's how to do it:

## 🔑 Your Database Details

- **Database:** railway
- **User:** postgres  
- **Password:** `rtNZicRKWcwZnodkqRljCIuIpZBglhth`
- **Internal Host:** railway.internal (for Railway services)
- **Public Access:** Available via TCP proxy (see Railway dashboard)

## 🚀 Method 1: Railway CLI (Recommended)

Run these commands in your terminal:

```bash
# 1. Make sure you're logged in and linked
railway login
railway link

# 2. Run the database setup script via Railway
railway run node scripts/setup-database.js

# 3. Alternative: Direct psql access
railway run psql $DATABASE_URL < scripts/create-basic-schema.sql
```

## 🖥️ Method 2: Railway Dashboard + Copy/Paste

1. Go to your Railway dashboard
2. Click on your **Postgres-9EiX** service  
3. Look for **"Connect"** or **"Query"** tab
4. If available, paste the contents of `scripts/create-basic-schema.sql`
5. Execute the SQL

## 🔧 Method 3: External PostgreSQL Client

### Get Public Connection Details:
1. In Railway dashboard → Postgres-9EiX service
2. Look for "Connect" section  
3. Find the **TCP Proxy** details (public host and port)

### Connection String Format:
```
postgresql://postgres:rtNZicRKWcwZnodkqRljCIuIpZBglhth@[PUBLIC_HOST]:[PUBLIC_PORT]/railway
```

### Recommended Clients:
- **pgAdmin** (free, full-featured)
- **DBeaver** (free, cross-platform)  
- **TablePlus** (Mac/Windows, paid)
- **Postbird** (free, simple)

## 📋 After Database Setup

Once the schema is created, you'll have:

### 🏫 Test School
- **Name:** Test Academy
- **Alias:** TEST
- **ID:** school_test_001

### 👤 Test Admin User  
- **Email:** `admin@testschool.com`
- **Password:** `Test123!`
- **Role:** SCHOOL_ADMIN
- **Dashboard:** Admin Dashboard

## 🧪 Test the Setup

After running the schema setup:

```bash
# Test the login via your backend
node scripts/create-users-via-api.js
```

This should now show:
```
✅ School and admin created successfully!
   Admin Email: admin@testschool.com
   Password: Test123!
```

## 🌐 Deploy and Test

1. **Set Railway Frontend Environment Variables:**
   ```
   NODE_ENV=production
   RAILWAY_BACKEND_URL=https://schoolmanagementbackend-production-be10.up.railway.app
   ```

2. **Deploy Frontend to Railway**

3. **Test Login:**
   - Go to your frontend URL
   - Navigate to `/auth/signin`
   - Login with: `admin@testschool.com` / `Test123!`
   - Should redirect to admin dashboard

## 🔍 Troubleshooting

### "Connection refused" errors
- Try Method 1 (Railway CLI) from your local machine
- Check if Railway services are running

### "Bad Request" on login  
- Database schema not created yet
- Run the SQL script first

### "Database error" messages
- Check Railway backend logs
- Verify DATABASE_URL is correctly set in backend

### Can't find Query interface
- Railway interface varies by plan
- Use external PostgreSQL client instead

## ✅ Success Indicators

You'll know it worked when:
- ✅ Tables exist: `School`, `User`
- ✅ Test data exists: 1 school, 1 admin user
- ✅ Login API returns user data instead of "Database error"
- ✅ Frontend login redirects to admin dashboard

Your backend configuration looks perfect - it just needs the database schema!
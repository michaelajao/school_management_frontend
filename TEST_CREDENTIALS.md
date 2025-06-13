# 🔑 Test User Credentials

After running the SQL script (`scripts/create-test-users.sql`) on your Railway database, you can use these credentials to test all dashboard types:

## 🏫 School Information
- **School Name:** Test Academy
- **School Alias:** TEST  
- **School ID:** school_test_001

## 👥 Test User Accounts

All users have the password: **`Test123!`**

### 1. Super Admin Dashboard
- **Email:** `superadmin@test.com`
- **Password:** `Test123!`
- **Role:** SUPER_ADMIN
- **Dashboard:** `/(dashboard)/(users)/admin`

### 2. School Admin Dashboard  
- **Email:** `schooladmin@test.com`
- **Password:** `Test123!`
- **Role:** SCHOOL_ADMIN
- **Dashboard:** `/(dashboard)/(users)/admin`

### 3. Assistant Admin Dashboard
- **Email:** `assistantadmin@test.com` 
- **Password:** `Test123!`
- **Role:** ASSISTANT_ADMIN
- **Dashboard:** `/(dashboard)/(users)/assistant-admin`

### 4. Class Teacher Dashboard
- **Email:** `classteacher@test.com`
- **Password:** `Test123!`
- **Role:** CLASS_TEACHER
- **Dashboard:** `/(dashboard)/(users)/class-teacher`

### 5. Subject Teacher Dashboard
- **Email:** `subjectteacher@test.com`
- **Password:** `Test123!` 
- **Role:** SUBJECT_TEACHER
- **Dashboard:** `/(dashboard)/(users)/subject-teacher`

### 6. Student Dashboard
- **Email:** `student@test.com`
- **Password:** `Test123!`
- **Role:** STUDENT
- **Dashboard:** `/(dashboard)/(users)/student`

### 7. Parent Dashboard
- **Email:** `parent@test.com`
- **Password:** `Test123!`
- **Role:** PARENT  
- **Dashboard:** `/(dashboard)/(users)/parent`

### 8. Staff Dashboard
- **Email:** `staff@test.com`
- **Password:** `Test123!`
- **Role:** STAFF
- **Dashboard:** `/(dashboard)/(users)/assistant-admin` (mapped to assistant-admin)

## 🚀 Railway Environment Variables

Set these in your Railway frontend deployment:

```env
NODE_ENV=production
RAILWAY_BACKEND_URL=https://schoolmanagementbackend-production-be10.up.railway.app
```

## 📝 How to Use

1. **Run the SQL script** on your Railway PostgreSQL database
2. **Deploy your frontend** with the environment variables above
3. **Test login** with any of the credential pairs above
4. **Verify dashboard access** - each role should redirect to their specific dashboard

## 🔧 Troubleshooting

- If login fails, check that `emailVerified` is set to `true` for all users
- Ensure the school ID `school_test_001` exists in your School table
- Verify the Argon2 password hashes are correctly stored
- Check Railway logs for any authentication errors
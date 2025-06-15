-- Basic schema for Railway PostgreSQL database
-- Run this first to create the essential tables

-- Create School table
CREATE TABLE IF NOT EXISTS "School" (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    alias TEXT UNIQUE NOT NULL,
    country TEXT NOT NULL,
    website TEXT,
    phone TEXT,
    email TEXT,
    address TEXT,
    logo TEXT,
    timezone TEXT DEFAULT 'UTC',
    currency TEXT DEFAULT 'USD',
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- Create User table
CREATE TABLE IF NOT EXISTS "User" (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('SUPER_ADMIN', 'SCHOOL_ADMIN', 'ASSISTANT_ADMIN', 'CLASS_TEACHER', 'SUBJECT_TEACHER', 'STUDENT', 'PARENT', 'STAFF')),
    "schoolId" TEXT NOT NULL REFERENCES "School"(id) ON DELETE CASCADE,
    "phoneNumber" TEXT,
    address TEXT,
    "profilePicture" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "emailVerified" BOOLEAN DEFAULT false,
    "emailVerificationToken" TEXT,
    "passwordResetToken" TEXT,
    "passwordResetExpires" TIMESTAMP(3),
    "lastLogin" TIMESTAMP(3),
    preferences JSONB DEFAULT '{}',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS "User_schoolId_idx" ON "User"("schoolId");
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"(email);
CREATE INDEX IF NOT EXISTS "User_role_idx" ON "User"(role);
CREATE INDEX IF NOT EXISTS "School_alias_idx" ON "School"(alias);

-- Insert a test school
INSERT INTO "School" (
    id, name, alias, country, website, phone, email, "isActive", "createdAt", "updatedAt"
) VALUES (
    'school_test_001',
    'Test Academy',
    'TEST',
    'Nigeria',
    'https://testacademy.edu',
    '+234-123-456-7890',
    'info@testacademy.edu',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
) ON CONFLICT (alias) DO NOTHING;

-- Insert a test admin user
-- Password hash for 'Test123!' 
INSERT INTO "User" (
    id,
    email,
    password,
    "firstName",
    "lastName",
    role,
    "schoolId",
    "isActive",
    "emailVerified",
    "createdAt",
    "updatedAt"
) VALUES (
    'user_admin_001',
    'admin@testschool.com',
    '$argon2id$v=19$m=65536,t=3,p=4$9VxdWXx0/ldm58EK8yoH6g$k896YU+l8Ii+TFfHaxlg/Wwu+AEsTpDvKEtp51saCpU',
    'Test',
    'Admin',
    'SCHOOL_ADMIN',
    'school_test_001',
    true,
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
) ON CONFLICT (email) DO NOTHING;

-- Verify the setup
SELECT 'Schools created:' as info;
SELECT id, name, alias FROM "School";

SELECT 'Users created:' as info;
SELECT id, email, "firstName", "lastName", role, "schoolId" FROM "User";

-- Show table structure
SELECT 'School table structure:' as info;
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'School' 
ORDER BY ordinal_position;

SELECT 'User table structure:' as info;
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'User' 
ORDER BY ordinal_position;
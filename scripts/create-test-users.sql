-- SQL Script to create test users for all dashboard roles
-- Run this on your Railway PostgreSQL database

-- First, create a test school
INSERT INTO "School" (
  id, 
  name, 
  alias, 
  country, 
  website, 
  phone, 
  email, 
  address, 
  logo, 
  timezone, 
  currency, 
  "isActive", 
  "createdAt", 
  "updatedAt"
) VALUES (
  'school_test_001',
  'Test Academy', 
  'TEST',
  'Nigeria',
  'https://testacademy.edu',
  '+234-123-456-7890',
  'info@testacademy.edu',
  '123 Education Street, Lagos, Nigeria',
  NULL,
  'Africa/Lagos',
  'NGN',
  true,
  NOW(),
  NOW()
) ON CONFLICT (alias) DO NOTHING;

-- Create test users for each role
-- Password: 'Test123!' for all users (properly hashed with Argon2)

-- 1. SUPER_ADMIN
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
  'user_super_admin_001',
  'superadmin@test.com',
  '$argon2id$v=19$m=65536,t=3,p=4$9VxdWXx0/ldm58EK8yoH6g$k896YU+l8Ii+TFfHaxlg/Wwu+AEsTpDvKEtp51saCpU',
  'Super',
  'Admin',
  'SUPER_ADMIN',
  'school_test_001',
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- 2. SCHOOL_ADMIN  
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
  'user_school_admin_001',
  'schooladmin@test.com',
  '$argon2id$v=19$m=65536,t=3,p=4$dqyzbAsWmxGteBCgNqOu+wJNVXBakOfASugCTxJZLE4',
  'School',
  'Admin',
  'SCHOOL_ADMIN', 
  'school_test_001',
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- 3. ASSISTANT_ADMIN
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
  'user_assistant_admin_001', 
  'assistantadmin@test.com',
  '$argon2id$v=19$m=65536,t=3,p=4$O+y7WQmfYUEkqIMlCkTOyaookOKVBymnZLDbE9bklYs',
  'Assistant',
  'Admin',
  'ASSISTANT_ADMIN',
  'school_test_001', 
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- 4. CLASS_TEACHER
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
  'user_class_teacher_001',
  'classteacher@test.com', 
  '$argon2id$v=19$m=65536,t=3,p=4$zuTXAlzlFUzEV5qIP8+i2d7w0afbUe4UZsqFgSg0Jdg',
  'Class',
  'Teacher',
  'CLASS_TEACHER',
  'school_test_001',
  true,
  true, 
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- 5. SUBJECT_TEACHER
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
  'user_subject_teacher_001',
  'subjectteacher@test.com',
  '$argon2id$v=19$m=65536,t=3,p=4$vkIHP1Jeu1SBiwH/Q2tXAkp21UdbuvHZmG98MEutrNA',
  'Subject',
  'Teacher', 
  'SUBJECT_TEACHER',
  'school_test_001',
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- 6. STUDENT
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
  'user_student_001',
  'student@test.com',
  '$argon2id$v=19$m=65536,t=3,p=4$h3w7TjR6DsiEdyzXnZv2+eGrWXOAlugLLvL3ZtC08f4',
  'Test',
  'Student',
  'STUDENT',
  'school_test_001',
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- 7. PARENT
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
  'user_parent_001',
  'parent@test.com',
  '$argon2id$v=19$m=65536,t=3,p=4$npEDWCJBwGpeDuW1a1nBDyCCfsYKtHbJHhsnoqS/j8g',
  'Test',
  'Parent',
  'PARENT',
  'school_test_001',
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- 8. STAFF
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
  'user_staff_001',
  'staff@test.com',
  '$argon2id$v=19$m=65536,t=3,p=4$6ipPnpKRBKXcpbDvPU/eGHqrUFBrZzz4oadyJ2BwSnA',
  'Test',
  'Staff',
  'STAFF',
  'school_test_001',
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- Verify the created users
SELECT 
  email,
  "firstName",
  "lastName", 
  role,
  "schoolId",
  "isActive",
  "emailVerified"
FROM "User" 
WHERE "schoolId" = 'school_test_001'
ORDER BY role;
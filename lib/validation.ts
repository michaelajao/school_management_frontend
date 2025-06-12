/**
 * Comprehensive validation schemas for the school management system
 * Using Zod for runtime type checking and validation
 */

import { z } from 'zod';

// Common validation patterns
const phoneRegex = /^\+?[1-9]\d{1,14}$/; // International phone format
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Base schemas
export const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .min(1, 'Email is required')
  .max(100, 'Email is too long');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(100, 'Password is too long')
  .refine(
    (password) => passwordRegex.test(password),
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  );

export const phoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .max(20, 'Phone number is too long')
  .refine(
    (phone) => phoneRegex.test(phone),
    'Please enter a valid phone number'
  );

export const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .max(50, 'Name is too long')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes');

// School registration schemas
export const schoolDataSchema = z.object({
  name: z
    .string()
    .min(1, 'School name is required')
    .max(100, 'School name is too long'),
  alias: z
    .string()
    .min(1, 'School alias is required')
    .max(10, 'School alias must be 10 characters or less')
    .regex(/^[A-Z0-9]+$/, 'School alias must contain only uppercase letters and numbers'),
  country: z
    .string()
    .min(1, 'Country is required'),
  website: z
    .string()
    .url('Please enter a valid website URL')
    .optional()
    .or(z.literal('')),
});

export const createSchoolAdminSchema = z.object({
  // Personal information
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  password: passwordSchema,
  
  // School information
  schoolName: z
    .string()
    .min(1, 'School name is required')
    .max(100, 'School name is too long'),
  schoolAlias: z
    .string()
    .min(1, 'School alias is required')
    .max(10, 'School alias must be 10 characters or less')
    .regex(/^[A-Z0-9]+$/, 'School alias must contain only uppercase letters and numbers'),
  country: z
    .string()
    .min(1, 'Country is required'),
  website: z
    .string()
    .url('Please enter a valid website URL')
    .optional(),
});

// User roles validation
export const userRoleSchema = z.enum([
  'super_admin',
  'school_admin',
  'assistant_admin',
  'class_teacher',
  'subject_teacher',
  'student',
  'parent'
]);

// Login validation
export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(1, 'Password is required'),
});

// Password reset validation
export const passwordResetRequestSchema = z.object({
  email: emailSchema,
});

export const passwordResetSchema = z.object({
  token: z
    .string()
    .min(1, 'Reset token is required'),
  password: passwordSchema,
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }
);

// Class management validation
export const classSchema = z.object({
  name: z
    .string()
    .min(1, 'Class name is required')
    .max(50, 'Class name is too long'),
  level: z
    .string()
    .min(1, 'Class level is required'),
  capacity: z
    .number()
    .min(1, 'Class capacity must be at least 1')
    .max(100, 'Class capacity cannot exceed 100'),
  teacherId: z
    .string()
    .uuid('Invalid teacher ID')
    .optional(),
});

// Student registration validation
export const studentRegistrationSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema.optional(),
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required'),
  gender: z
    .enum(['male', 'female', 'other'], {
      errorMap: () => ({ message: 'Please select a valid gender' }),
    }),
  classId: z
    .string()
    .uuid('Invalid class ID'),
  parentEmail: emailSchema,
  parentPhone: phoneSchema,
});

// Teacher registration validation
export const teacherRegistrationSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  subjects: z
    .array(z.string())
    .min(1, 'At least one subject is required'),
  qualifications: z
    .string()
    .min(1, 'Qualifications are required')
    .max(500, 'Qualifications description is too long'),
});

/**
 * Validation helper function
 */
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: z.ZodError } {
  try {
    const validData = schema.parse(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
}

/**
 * Format Zod errors for API responses
 */
export function formatValidationErrors(error: z.ZodError) {
  const errors: Record<string, string> = {};
  
  error.errors.forEach((err) => {
    const path = err.path.join('.');
    errors[path] = err.message;
  });
  
  return {
    message: 'Validation failed',
    errors,
  };
}

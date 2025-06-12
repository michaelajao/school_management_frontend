/**
 * Shared validation patterns used across all forms
 * Eliminates duplicate validation logic
 */

import { FormErrors } from '@/hooks/useFormErrors';

// Common validation patterns
export const ValidationPatterns = {
  email: /^\S+@\S+\.\S+$/,
  phone: /^\+?[1-9]\d{1,14}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  name: /^[a-zA-Z\s'-]{2,50}$/
} as const;

// Common validation messages
export const ValidationMessages = {
  required: (field: string) => `${field} is required`,
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  password: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  minLength: (field: string, min: number) => `${field} must be at least ${min} characters`,
  maxLength: (field: string, max: number) => `${field} must be less than ${max} characters`,
  name: 'Please enter a valid name (letters, spaces, hyphens, and apostrophes only)'
} as const;

/**
 * Common validation functions used across forms
 */
export const CommonValidators = {
  validateRequired: (value: string, fieldName: string): string => {
    return !value.trim() ? ValidationMessages.required(fieldName) : '';
  },

  validateEmail: (email: string): string => {
    if (!email.trim()) return ValidationMessages.required('Email');
    if (!ValidationPatterns.email.test(email.trim())) return ValidationMessages.email;
    return '';
  },

  validatePhone: (phone: string): string => {
    if (!phone.trim()) return ValidationMessages.required('Phone number');
    if (phone.trim().length < 10) return ValidationMessages.minLength('Phone number', 10);
    return '';
  },

  validatePassword: (password: string): string => {
    if (!password) return ValidationMessages.required('Password');
    if (password.length < 8) return ValidationMessages.minLength('Password', 8);
    if (!ValidationPatterns.password.test(password)) return ValidationMessages.password;
    return '';
  },

  validateName: (name: string, fieldName: string): string => {
    if (!name.trim()) return ValidationMessages.required(fieldName);
    if (!ValidationPatterns.name.test(name.trim())) return ValidationMessages.name;
    return '';
  },

  validateConfirmPassword: (password: string, confirmPassword: string): string => {
    if (!confirmPassword) return ValidationMessages.required('Confirm password');
    if (password !== confirmPassword) return 'Passwords do not match';
    return '';
  }
};

/**
 * Form validation utility for consistent error handling
 */
export function validateForm(
  data: Record<string, any>,
  validationRules: Record<string, (value: any) => string>
): FormErrors {
  const errors: FormErrors = {};
  
  Object.entries(validationRules).forEach(([field, validator]) => {
    const error = validator(data[field]);
    if (error) {
      errors[field] = error;
    }
  });
  
  return errors;
}

/**
 * Specific form validators for different user types
 */
export const FormValidators = {
  // Common user fields
  user: {
    firstName: (value: string) => CommonValidators.validateName(value, 'First name'),
    lastName: (value: string) => CommonValidators.validateName(value, 'Last name'),
    email: CommonValidators.validateEmail,
    phone: CommonValidators.validatePhone,
    password: CommonValidators.validatePassword,
  },

  // School registration
  school: {
    name: (value: string) => CommonValidators.validateRequired(value, 'School name'),
    alias: (value: string) => CommonValidators.validateRequired(value, 'School alias'),
    country: (value: string) => CommonValidators.validateRequired(value, 'Country'),
  },

  // Login forms
  login: {
    identifier: (value: string) => CommonValidators.validateRequired(value, 'Email or Username'),
    password: (value: string) => CommonValidators.validateRequired(value, 'Password'),
  }
} as const;

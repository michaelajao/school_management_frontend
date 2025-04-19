// utils/validatePassword.ts

export interface PasswordValidationResult {
    valid: boolean
    errors: string[]
  }
  
  export function validatePassword(password: string): PasswordValidationResult {
    const errors: string[] = []
  
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long.")
    }
  
    if (!/[a-z]/.test(password)) {
      errors.push("Password must include at least one lowercase letter.")
    }
  
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must include at least one uppercase letter.")
    }
  
    if (!/[0-9]/.test(password)) {
      errors.push("Password must include at least one number.")
    }
  
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password must include at least one special character.")
    }
  
    return {
      valid: errors.length === 0,
      errors,
    }
  }
  
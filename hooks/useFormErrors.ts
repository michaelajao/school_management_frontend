"use client";

import { useState, useCallback } from 'react';

export type FormErrors = Record<string, string>;

/**
 * Centralized form error management hook
 * Eliminates duplicate error handling patterns across components
 */
export function useFormErrors() {
  const [errors, setErrors] = useState<FormErrors>({});

  const setError = useCallback((field: string, message: string) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  }, []);

  const clearError = useCallback((field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  const hasErrors = useCallback(() => {
    return Object.keys(errors).length > 0;
  }, [errors]);

  const getError = useCallback((field: string) => {
    return errors[field] || '';
  }, [errors]);

  const setMultipleErrors = useCallback((newErrors: FormErrors) => {
    setErrors(newErrors);
  }, []);

  return {
    errors,
    setError,
    clearError,
    clearAllErrors,
    hasErrors,
    getError,
    setMultipleErrors,
  };
}

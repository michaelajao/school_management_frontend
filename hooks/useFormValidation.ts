"use client";

import { useState } from "react";

export function useFormValidation<T extends Record<string, any>>(formData: T, requiredFields: Array<keyof T>) {
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const validate = () => {
    const newErrors: Record<string, boolean> = {};
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field as string] = true;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: keyof T) => {
    setErrors(prev => ({ ...prev, [field as string]: false }));
  };

  return { errors, validate, clearError, setErrors };
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

type AuthFormProps = {
  type: "signin" | "signup";
};

export function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const { login, signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    // Confirm password validation for signup
    if (type === "signup" && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      if (type === "signup") {
        await signup(formData.email, formData.password);
        toast.success("Account created successfully!");
      } else {
        await login(formData.email, formData.password);
        toast.success("Welcome back!");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("Authentication failed. Please check your credentials and try again.");
      setErrors({
        form: "Authentication failed. Please check your credentials and try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md p-6 shadow-lg rounded-xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">
          {type === "signin" ? "Sign In" : "Create Account"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {type === "signin" 
            ? "Enter your credentials to access your account" 
            : "Create a new account to get started"
          }
        </p>
      </div>
      
      {errors.form && (
        <div className="p-4 mb-4 text-sm text-red-500 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
          {errors.form}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password}</p>
          )}
        </div>
        
        {type === "signup" && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
            )}
          </div>
        )}
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? (
            <span>Loading...</span>
          ) : type === "signin" ? (
            "Sign In"
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        {type === "signin" ? (
          <p>
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        )}
      </div>
    </Card>
  );
}
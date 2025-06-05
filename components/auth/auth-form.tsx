"use client";

import { useState } from "react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";
import { validatePassword } from "@/lib/validatePassword";
import { usePricingStore } from "@/store/usePricingStore"; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define roles for the dropdown
const roles = [
  { value: "admin", label: "Admin" },
  { value: "teacher", label: "Teacher" },
  { value: "student", label: "Student" },
  { value: "parent", label: "Parent" }
];

type AuthFormProps = {
  type: "signin" | "signup";
};

export function AuthForm({ type }: AuthFormProps) {
  // const router = useRouter();
  const { login, signup } = useAuth();
  const setUserEmail = usePricingStore((state) => state.setUserEmail); 
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "student" // Default role
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
  
  // Handle role selection specifically
  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
    
    if (errors.role) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.role;
        return newErrors;
      });
    }
  };

  // Add role selection in the signin form after password field
  const renderRoleSelection = () => {
    if (type !== "signin") return null;
    
    return (
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select 
          value={formData.role} 
          onValueChange={(value) => handleRoleChange(value)} 
          disabled={isLoading}
        >
          <SelectTrigger className={errors.role ? "border-red-500" : ""}>
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.role && (
          <p className="text-xs text-red-500 mt-1">{errors.role}</p>
        )}
      </div>
    );
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
      newErrors.password = "Password is required"
    } else {
      // Validate password using shared utility
      // Displays the first rule violation as the error message
      const { valid, errors } = validatePassword(formData.password)

      if (!valid) {
        newErrors.password = errors[0]
      }
    }
    
    // Confirm password validation for signup
    if (type === "signup" && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    // Role validation for signin
    if (type === "signin" && !formData.role) {
      newErrors.role = "Please select a role";
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
        setUserEmail(formData.email); // Set the email in the pricing store
        toast.success("Account created successfully!");
      } else {
        // Pass the role to login for role-specific authentication
        const role = formData.role as "admin" | "teacher" | "student" | "parent" | "superadmin";
        await login(formData.email, formData.password, role);
        toast.success("Welcome back!");
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      
      // Provide more descriptive error messages when available
      const errorMessage = error?.response?.data?.message || 
        "Authentication failed. Please check your credentials and try again.";
        
      toast.error(errorMessage);
      setErrors({
        form: errorMessage
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
            type={showPassword ? 'text' : 'password'}
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
              type={showPassword ? 'text' : 'password'}
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

        {/* Insert role selection for signin */}
        {renderRoleSelection()}

        <div className="flex items-center gap-4 p-2 rounded">
          <Checkbox id="showPassword"
            checked={showPassword}
            onCheckedChange={(checked) => setShowPassword(!!checked)}
           />
          <Label htmlFor="showPassword">Show Password</Label>
        </div>
        
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
            Don&apos;t have an account?{" "}
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
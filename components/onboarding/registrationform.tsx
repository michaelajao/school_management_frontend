"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type UserRole = "admin" | "teacher" | "parent" | "student";

type Props = {
  prefilledRole: UserRole;
};

export default function RegistrationForm({ prefilledRole }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: prefilledRole,
    password: "",
    agreed: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key: keyof typeof form, value: string | boolean) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: false }));
  };

  const handleSubmit = () => {
    const newErrors: { [key: string]: boolean } = {};
    let hasError = false;

    // Check each field
    Object.entries(form).forEach(([key, value]) => {
      if (key === 'agreed') {
        if (!value) {
          newErrors[key] = true;
          hasError = true;
        }
      } else if (key !== 'role' && !value) {
        newErrors[key] = true;
        hasError = true;
      }
    });

    setErrors(newErrors);

    if (hasError) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    try {
      const user = { ...form };
      localStorage.setItem("user", JSON.stringify(user));
      router.push(`/onboarding/${form.role}`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Registration failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Create Your Account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <a href="#" className="text-primary font-medium hover:underline">
              Sign in
            </a>
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">First Name</Label>
            <Input
              placeholder="Enter first name"
              className={`h-11 px-4 py-2 ${errors.firstName ? 'border-red-500' : ''}`}
              value={form.firstName}
              onChange={e => handleChange("firstName", e.target.value)}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Last Name</Label>
            <Input
              placeholder="Enter last name"
              className={`h-11 px-4 py-2 ${errors.lastName ? 'border-red-500' : ''}`}
              value={form.lastName}
              onChange={e => handleChange("lastName", e.target.value)}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Email Address</Label>
            <Input
              placeholder="Enter email address"
              className={`h-11 px-4 py-2 ${errors.email ? 'border-red-500' : ''}`}
              value={form.email}
              onChange={e => handleChange("email", e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Phone Number</Label>
            <Input
              placeholder="Enter phone number"
              className={`h-11 px-4 py-2 ${errors.phone ? 'border-red-500' : ''}`}
              value={form.phone}
              onChange={e => handleChange("phone", e.target.value)}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Role</Label>
            <Input
              disabled
              className="h-11 px-4 py-2 bg-gray-100"
              value={form.role}
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Password</Label>
            <Input
              type="password"
              placeholder="Enter password"
              className={`h-11 px-4 py-2 ${errors.password ? 'border-red-500' : ''}`}
              value={form.password}
              onChange={e => handleChange("password", e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <Checkbox
              id="terms"
              checked={form.agreed}
              onCheckedChange={val => handleChange("agreed", !!val)}
            />
            <Label htmlFor="terms" className={`text-sm leading-none ${errors.agreed ? 'text-red-500' : ''}`}>
              I agree to the{" "}
              <a href="#" className="text-primary underline hover:text-primary/80">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary underline hover:text-primary/80">
                Privacy Policy
              </a>
            </Label>
          </div>
          {errors.agreed && (
            <p className="text-red-500 text-sm">You must agree to the terms</p>
          )}

          <Button
            className="w-full h-11 mt-4 text-sm font-medium"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </div>
      </div>
    </div>
  );
}

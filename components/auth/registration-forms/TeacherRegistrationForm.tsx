"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Eye, EyeOff, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { AuthApiService } from "@/lib/api/auth";
import { PasswordRequirements } from "./shared/PasswordRequirements";

const teacherRegistrationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  staffId: z.string().min(3, "Staff ID must be at least 3 characters"),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  subRole: z.enum(["SUBJECT_TEACHER", "CLASS_TEACHER"]).optional(),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type TeacherRegistrationForm = z.infer<typeof teacherRegistrationSchema>;

interface InviteData {
  email: string;
  role: string;
  token: string;
  schoolName?: string;
  isValid: boolean;
}

interface TeacherRegistrationFormProps {
  inviteData: InviteData;
}

export function TeacherRegistrationForm({ inviteData }: TeacherRegistrationFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TeacherRegistrationForm>({
    resolver: zodResolver(teacherRegistrationSchema),
    defaultValues: {
      email: inviteData.email,
      subRole: inviteData.role.toUpperCase() as "SUBJECT_TEACHER" | "CLASS_TEACHER",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: TeacherRegistrationForm) => {
    setIsLoading(true);
    try {
      const registrationData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        staffId: data.staffId,
        password: data.password,
        inviteToken: inviteData.token,
        phoneNumber: data.phoneNumber,
        address: data.address,
        subRole: data.subRole,
      };

      const response = await AuthApiService.completeTeacherRegistration(registrationData);
      
      toast.success("Account created successfully! Welcome to the school management system.");
      
      // Redirect to teacher dashboard
      router.push("/teacher");
    } catch (error: any) {
      console.error("Registration error:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "Failed to create account. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <UserCheck className="h-12 w-12 text-teal-600" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Complete Your Teacher Account
        </CardTitle>
        <p className="text-gray-600 mt-2">
          Fill in your details to complete your registration as a teacher
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  {...register("firstName")}
                  className={errors.firstName ? "border-red-500" : ""}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="text-sm text-red-600 mt-1">{errors.firstName.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  className={errors.lastName ? "border-red-500" : ""}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                disabled
                className="bg-gray-50"
                placeholder="Your email address"
              />
              <p className="text-sm text-gray-500 mt-1">
                This email is from your invitation and cannot be changed
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="staffId">Staff ID *</Label>
                <Input
                  id="staffId"
                  {...register("staffId")}
                  className={errors.staffId ? "border-red-500" : ""}
                  placeholder="Enter your staff ID"
                />
                {errors.staffId && (
                  <p className="text-sm text-red-600 mt-1">{errors.staffId.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="subRole">Teacher Type</Label>
                <Select
                  value={watch("subRole")}
                  onValueChange={(value) => setValue("subRole", value as "SUBJECT_TEACHER" | "CLASS_TEACHER")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select teacher type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SUBJECT_TEACHER">Subject Teacher</SelectItem>
                    <SelectItem value="CLASS_TEACHER">Class Teacher</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                {...register("phoneNumber")}
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                {...register("address")}
                placeholder="Enter your address"
              />
            </div>
          </div>

          {/* Password Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Account Security
            </h3>
            
            <div>
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  className={errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <PasswordRequirements password={password} />
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Complete Registration"
              )}
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500">
            By completing registration, you agree to the school's terms of service and privacy policy.
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 
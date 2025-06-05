"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { AuthApiService } from "@/lib/api/auth";
import { InviteValidation } from "@/components/auth/invite-validation";

const teacherRoles = [
  "Subject Teacher",
  "Class Teacher", 
  "Assistant Teacher",
  "Head of Department",
  "Special Education Teacher"
];

export default function TeacherSetupPage() {
  const router = useRouter();
  
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    staffId: "",
    role: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required field validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.staffId.trim()) newErrors.staffId = "Staff ID is required";
    if (!formData.role) newErrors.role = "Role selection is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";

    // Password validation
    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    if (formData.password && !passwordRegex.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, number, and special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent, inviteData: any) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setSubmitting(true);
    
    try {
      // Create the teacher account using the AuthApiService
      const accountData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        staffId: formData.staffId,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        inviteToken: inviteData.token,
        subRole: formData.role,
        firstLogin: true
      };

      const response = await AuthApiService.completeInviteRegistration(accountData);
      
      toast.success("Account setup completed successfully!");
      toast.success("Welcome! You are now logged in.");
      
      // Redirect to teacher dashboard since they're now authenticated
      router.push('/(users)/teacher');

    } catch (error: any) {
      console.error('Account setup error:', error);
      const errorMessage = error?.response?.data?.message || error?.message || "Failed to complete account setup. Please contact your administrator.";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <InviteValidation>
      {(inviteData) => {
        // Set email from invite data when available
        if (inviteData?.email && formData.email !== inviteData.email) {
          setFormData(prev => ({ ...prev, email: inviteData.email }));
        }

        return (
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Teacher Account Setup</CardTitle>
              <CardDescription>
                Complete your profile information and create a secure password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleSubmit(e, inviteData)} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={errors.firstName ? "border-red-500" : ""}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={errors.lastName ? "border-red-500" : ""}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      disabled
                      className="bg-gray-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">This email was provided in your invite</p>
                  </div>

                  <div>
                    <Label htmlFor="staffId">Staff ID *</Label>
                    <Input
                      id="staffId"
                      name="staffId"
                      type="text"
                      value={formData.staffId}
                      onChange={handleInputChange}
                      className={errors.staffId ? "border-red-500" : ""}
                      placeholder="Enter your staff ID"
                    />
                    {errors.staffId && (
                      <p className="text-sm text-red-600 mt-1">{errors.staffId}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="role">Teaching Role *</Label>
                    <Select 
                      value={formData.role} 
                      onValueChange={(value) => handleSelectChange("role", value)}
                    >
                      <SelectTrigger className={errors.role ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select your teaching role" />
                      </SelectTrigger>
                      <SelectContent>
                        {teacherRoles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.role && (
                      <p className="text-sm text-red-600 mt-1">{errors.role}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                    />
                  </div>
                </div>

                {/* Password Section */}
                <div className="space-y-4">
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Create Your Password</h3>
                  </div>

                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        className={errors.password ? "border-red-500" : ""}
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Must be at least 8 characters with uppercase, lowercase, number, and special character
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={errors.confirmPassword ? "border-red-500" : ""}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-4">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-teal-600 hover:bg-teal-700"
                  >
                    {submitting ? "Setting up account..." : "Complete Setup"}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By creating an account, you agree to the school's terms of service and privacy policy.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        );
      }}
    </InviteValidation>
  );
}

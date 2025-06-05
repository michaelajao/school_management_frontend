"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

export function OnboardingFlow() {
  const router = useRouter();
  const { login, signup, loading } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Login Form State
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  
  // School Signup State
  const [schoolData, setSchoolData] = useState({
    schoolName: "",
    schoolShortName: "",
    country: "",
    website: ""
  });
  
  // Account Creation State
  const [accountData, setAccountData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+1",
    role: "",
    password: "",
    agreeToTerms: false
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginData.email, loginData.password, 'admin'); // Default to admin for general login
      toast.success("Login successful!");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleSchoolSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    // School signup logic - for now just log the data
    console.log("School signup data:", schoolData);
    toast.success("School registration initiated!");
    // In real implementation, this would create school and redirect to payment/verification
  };

  const handleAccountCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(accountData.email, accountData.password);
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error("Account creation failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-teal-600 text-white text-center py-6">
        <h1 className="text-3xl font-bold">ONBOARDING</h1>
      </div>
      
      {/* Three Panel Layout */}
      <div className="flex justify-center items-center min-h-[calc(100vh-100px)] px-4">
        <div className="flex gap-6 max-w-7xl w-full">
          
          {/* Login Panel */}
          <div className="bg-teal-600 flex-1 flex items-center justify-center p-8">
            <div className="bg-white rounded-lg p-8 w-full max-w-md">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-blue-900 rounded mr-3"></div>
                <span className="text-lg font-semibold">Logoipsum</span>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter email address"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={loginData.password}
                      onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="remember-login" 
                      className="mr-2"
                      checked={loginData.rememberMe}
                      onChange={(e) => setLoginData(prev => ({ ...prev, rememberMe: e.target.checked }))}
                      aria-label="Remember me"
                    />
                    <Label htmlFor="remember-login" className="text-sm text-gray-600">Remember me</Label>
                  </div>
                  <button
                    type="button"
                    onClick={() => router.push("/auth/forgot-password")}
                    className="text-sm text-teal-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-teal-600 text-white hover:bg-teal-700"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
                
                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/auth/signin")}
                    className="text-teal-600 hover:underline"
                  >
                    Contact your school administrator
                  </button>
                </p>
              </form>
            </div>
          </div>

          {/* School Signup Panel */}
          <div className="bg-teal-600 flex-1 flex items-center justify-center p-8">
            <div className="bg-white rounded-lg p-8 w-full max-w-md">
              <h2 className="text-xl font-semibold text-center mb-6">School Signup</h2>
              
              <form onSubmit={handleSchoolSignup} className="space-y-4">
                <div>
                  <Label htmlFor="school-name" className="block text-sm font-medium text-gray-700 mb-2">
                    School Name
                  </Label>
                  <Input
                    id="school-name"
                    type="text"
                    placeholder="Your school name"
                    value={schoolData.schoolName}
                    onChange={(e) => setSchoolData(prev => ({ ...prev, schoolName: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="school-short" className="block text-sm font-medium text-gray-700 mb-2">
                    School Short Name
                  </Label>
                  <Input
                    id="school-short"
                    type="text"
                    placeholder="Short name"
                    value={schoolData.schoolShortName}
                    onChange={(e) => setSchoolData(prev => ({ ...prev, schoolShortName: e.target.value }))}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">This will be the main URL for the portal</p>
                </div>
                
                <div>
                  <Label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </Label>
                  <Select
                    value={schoolData.country}
                    onValueChange={(value) => setSchoolData(prev => ({ ...prev, country: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="ng">Nigeria</SelectItem>
                      <SelectItem value="ke">Kenya</SelectItem>
                      <SelectItem value="gh">Ghana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                    School Website
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://www.yourschool.com"
                    value={schoolData.website}
                    onChange={(e) => setSchoolData(prev => ({ ...prev, website: e.target.value }))}
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-teal-600 text-white hover:bg-teal-700"
                >
                  Next
                </Button>
              </form>
            </div>
          </div>

          {/* Create Account Panel */}
          <div className="bg-teal-600 flex-1 flex items-center justify-center p-8">
            <div className="bg-white rounded-lg p-8 w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Create your account</h2>
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
                  ?
                </div>
              </div>
              
              <form onSubmit={handleAccountCreation} className="space-y-4">
                <div>
                  <Label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </Label>
                  <Input
                    id="first-name"
                    type="text"
                    placeholder="Your first name"
                    value={accountData.firstName}
                    onChange={(e) => setAccountData(prev => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </Label>
                  <Input
                    id="last-name"
                    type="text"
                    placeholder="Your last name"
                    value={accountData.lastName}
                    onChange={(e) => setAccountData(prev => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="account-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </Label>
                  <Input
                    id="account-email"
                    type="email"
                    placeholder="Your email address"
                    value={accountData.email}
                    onChange={(e) => setAccountData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </Label>
                  <div className="flex">
                    <Select
                      value={accountData.countryCode}
                      onValueChange={(value) => setAccountData(prev => ({ ...prev, countryCode: value }))}
                    >
                      <SelectTrigger className="w-24 rounded-r-none border-r-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+1">🇺🇸 +1</SelectItem>
                        <SelectItem value="+44">🇬🇧 +44</SelectItem>
                        <SelectItem value="+234">🇳🇬 +234</SelectItem>
                        <SelectItem value="+254">🇰🇪 +254</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="tel"
                      placeholder="Enter phone number"
                      value={accountData.phone}
                      onChange={(e) => setAccountData(prev => ({ ...prev, phone: e.target.value }))}
                      className="rounded-l-none"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </Label>
                  <Select
                    value={accountData.role}
                    onValueChange={(value) => setAccountData(prev => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="account-password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="account-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Create password"
                      value={accountData.password}
                      onChange={(e) => setAccountData(prev => ({ ...prev, password: e.target.value }))}
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    className="mr-2 mt-1"
                    checked={accountData.agreeToTerms}
                    onChange={(e) => setAccountData(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                    required
                    aria-label="I agree to all Terms of Service & Privacy Policy"
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to all{" "}
                    <button type="button" className="text-teal-600 hover:underline">
                      Terms of Service & Privacy Policy
                    </button>
                  </Label>
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-teal-600 text-white hover:bg-teal-700"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Register"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

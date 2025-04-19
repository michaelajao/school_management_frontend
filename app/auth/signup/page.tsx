import { AuthForm } from "@/components/auth/auth-form";
import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - branding and hero section */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white flex-col justify-between p-12">
        <div>
          <Link href="/" className="font-bold text-2xl">
            SchoolMS
          </Link>
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Welcome to the School Management System</h1>
          <p className="text-lg text-slate-300">
            A comprehensive solution for schools to manage students, teachers, classes, and more.
          </p>
          <div className="flex space-x-4">
            {/* You can add testimonial or feature highlights here */}
            <div className="bg-slate-800 p-4 rounded-lg flex-1">
              <h3 className="font-medium">For Administrators</h3>
              <p className="text-sm text-slate-400">Complete school oversight and management</p>
            </div>
            {
              /*
            <div className="bg-slate-800 p-4 rounded-lg flex-1">
              <h3 className="font-medium">For Teachers</h3>
              <p className="text-sm text-slate-400">Class management and student tracking</p>
            </div>
            */
            }
          </div>
        </div>
        <div className="text-sm text-slate-400">
          © 2025 School Management System
        </div>
      </div>

      {/* Right side - auth form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 bg-slate-50">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Link href="/" className="font-bold text-2xl">
              SchoolMS
            </Link>
          </div>
          <AuthForm type="signup" />
        </div>
      </div>
    </div>
  );
}
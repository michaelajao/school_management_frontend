import { AuthForm } from "@/components/auth/auth-form";
import Link from "next/link";

export default function SigninPage() {
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
          <h1 className="text-4xl font-bold">Welcome Back</h1>
          <p className="text-lg text-slate-300">
            Sign in to access your School Management System dashboard.
          </p>
          <div className="flex space-x-4">
            <div className="bg-slate-800 p-4 rounded-lg flex-1">
              <h3 className="font-medium">For Parents</h3>
              <p className="text-sm text-slate-400">Monitor your child's academic progress</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg flex-1">
              <h3 className="font-medium">For Students</h3>
              <p className="text-sm text-slate-400">Access assignments and track grades</p>
            </div>
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
          <AuthForm type="signin" />
        </div>
      </div>
    </div>
  );
}
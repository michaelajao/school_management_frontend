"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface AuthLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
  backHref?: string;
}

export function AuthLayout({ children, showBackButton = false, backHref = "/auth/signin" }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-teal-600 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="flex items-center justify-center">
              <div className="bg-white/10 rounded-lg p-2 mr-3">
                <div className="w-8 h-8 bg-white/20 rounded"></div>
              </div>
              <div className="text-white text-2xl font-bold">
                Logoipsum
              </div>
            </div>
          </Link>
        </div>

        {/* White Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
          {/* Back Button */}
          {showBackButton && (
            <div className="mb-6">
              <Link
                href={backHref}
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </Link>
            </div>
          )}

          {/* Content */}
          {children}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white text-sm opacity-80">
          © 2025 School Management System
        </div>
      </div>
    </div>
  );
}

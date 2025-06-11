"use client";

import { Button } from "@/components/ui/button";

export function PasswordResetSentForm() {
  const handleGoToEmail = () => {
    // This would typically open the user's default email client
    window.open("mailto:", "_blank");
  };

  return (
    <div className="min-h-screen bg-teal-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Reset Password Sent Form */}
        <div className="bg-white rounded-lg p-8 shadow-lg">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Reset password</h1>
          </div>

          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-teal-600 rounded-2xl flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">!</span>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="text-center mb-8">
            <p className="text-gray-700">
              A link has been sent to you email to reset the password.
            </p>
          </div>

          {/* Go to Email Button */}
          <Button
            onClick={handleGoToEmail}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Go to Email
          </Button>
        </div>
      </div>
    </div>
  );
} 
'use client';
import { EditForm } from '@/components/StaffDashboard/EditForm';
import { ChevronLeft } from 'lucide-react';

export default function EditStaff() {
  return (
    <div>
      <div className="flex items-center font-semibold text-[#4A4A4A] cursor-pointer" onClick={() => window.history.back()}>
        <ChevronLeft />
        Edit Staff
      </div>
      <div className="max-w-5xl mx-auto mt-4 bg-white rounded-xl shadow p-8 space-y-6">
        <EditForm />
      </div>
    </div>
  );
}

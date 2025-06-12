'use client';
import AddForm from '@/components/staff-dashboard/AddForm';
import { ChevronLeft } from 'lucide-react';



export default function AddStaff() {

  return (
    <div>
      <div className="flex items-center font-semibold text-[#4A4A4A] cursor-pointer" onClick={() => window.history.back()}>
        <ChevronLeft />
        Add New Staff
      </div>
      <div className="max-w-5xl mx-auto mt-4 bg-white rounded-xl shadow p-8 space-y-6">
       <AddForm />
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon } from 'lucide-react';

export default function ClassActions() {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleNavigate = () => {
    if (selectedOption === 'class') {
      router.push('/users/admin/manage/academics/classes/assign_class_teacher');
    } else if (selectedOption === 'subject') {
      router.push('/users/admin/manage/academics/classes/assign_subject_teacher');
    }
  };

  const create = () => {
    router.push('/users/admin/manage/academics/classes/create');
  };

  return (
    <div className="flex flex-wrap gap-3 mt-4 mb-6 relative">
      {/* Assign Teacher Dropdown */}
      <div className="relative">
        <button
          className="border border-#BDFAFF-400 text-[#0F766E] px-3 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-[#BAE6E0]"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          Assign Teacher
          <ChevronDownIcon className="w-4 h-4" />
        </button>

        {showDropdown && (
          <div className="absolute mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleNavigate();
              }}
            >
              <label className="flex items-center mb-2 cursor-pointer">
                <input
                  type="radio"
                  name="assignType"
                  value="class"
                  checked={selectedOption === 'class'}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="mr-2"
                />
                Class Teacher
              </label>
              <label className="flex items-center mb-4 cursor-pointer">
                <input
                  type="radio"
                  name="assignType"
                  value="subject"
                  checked={selectedOption === 'subject'}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="mr-2"
                />
                Subject Teacher
              </label>

              <button
                type="submit"
                className="w-full bg-[#0F766E] text-white px-3 py-2 rounded-md hover:bg-[#0D9488]"
                disabled={!selectedOption}
              >
                Continue
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Add Subject Button */}
      <button
        className="border border-#BDFAFF-400 text-[#BDFAFF]-500 px-3 py-2 rounded-lg font-medium hover:bg-[#BAE6E0]"
        onClick={() => {
          router.push('/users/admin/manage/academics/classes/add_subject');
        }}
      >
        Add Subject
      </button>

      {/* Create New Class Button */}
      <button
        className="border border-orange-400 text-orange-500 font-medium px-4 py-2 rounded-lg hover:bg-orange-50"
        aria-label="View Class"
        onClick={create}
      >
        Create New Class / Arm
      </button>

      {/* View Class Performance Button */}
      <button
        className="border border-#BDFAFF-400 text-[#7C3AED] px-3 py-2 rounded-lg font-medium hover:bg-[#D8D0FF]"
        onClick={() => {
          router.push('/users/admin/manage/academics/classes/performance_grade');
        }}
      >
        View Class Performance
      </button>

      {/* View Class Attendance Button */}
      <button
        className="border border-gray-300 text-gray-800 px-3 py-2 rounded-lg font-medium hover:bg-gray-100"
        onClick={() => {
          router.push('/users/admin/manage/academics/classes/view_class_attendance');
        }}
      >
        View Class Attendance
      </button>
    </div>
  );
}
"use client";
import { ArrowLeftIcon } from 'lucide-react';
import React, { useState } from 'react';
// import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function EditClass() {
  const [searchTerm, setSearchTerm] = useState('');

  const subjectTeachers = [
    'Chiyedu Nduka - Physics',
    'Betty Godwin - English',
    'Mr. Adebayo - Mathematics',
    'Ms. Okafor - Biology',
    'Dr. Uche - Chemistry',
    'Mrs. Anu - English',
    'Mr. Kelvin - Geography',
    'Mr. Smith - Economics',
    'Mrs. Jane - Business Studies',
  ];

  const filteredTeachers = subjectTeachers.filter((teacher) =>
    teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-semibold">Edit Class</h2>
        </div>

        <form className="space-y-4">
          {/* Class Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class Name</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
              <option>Year 7</option>
              <option>Year 8</option>
              <option>Year 9</option>
            </select>
          </div>

          {/* Arm */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Arm</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
              <option>Year 7A</option>
              <option>Year 7B</option>
              <option>Year 7C</option>
            </select>
          </div>

          {/* Class Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class Description</label>
            <textarea
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              defaultValue="Science"
            />
          </div>

          {/* Class Teachers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assign Class Teacher</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
              <option selected>Samuel Okoro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assign Assistant</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
              <option selected>Samuel Omotayo</option>
            </select>
          </div>

          {/* Subject Teachers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assign Subject Teacher</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
              <option selected>Chiyedu Nduka - Physics</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assign Subject Teacher</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
              <option selected>Betty Godwin - English</option>
            </select>
          </div>

          {/* Searchable Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assign Subject Teacher</label>
            <input
              type="text"
              placeholder="Search by subject or teacher name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full mb-2 border border-gray-300 rounded-lg px-4 py-2"
            />
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
              {filteredTeachers.map((teacher, i) => (
                <option key={i}>{teacher}</option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-start gap-4 pt-4">
            <button
              type="submit"
              className="bg-[#00594C] text-white px-6 py-2 rounded-lg hover:bg-[#00473D]"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="border border-red-400 text-red-500 px-6 py-2 rounded-lg hover:bg-red-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
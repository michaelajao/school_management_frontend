"use client";
import { ArrowLeftIcon } from 'lucide-react';
import React, { useState } from 'react';

interface ClassFormData {
  className: string;
  arm: string;
  description: string;
  classTeacher: string;
  assistant: string;
  subjectTeachers: string[];
}

export default function EditClass() {
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<ClassFormData>({
    className: 'Year 7',
    arm: 'Year 7A',
    description: 'Science',
    classTeacher: 'Samuel Okoro',
    assistant: 'Samuel Omotayo',
    subjectTeachers: ['Chiyedu Nduka - Physics', 'Betty Godwin - English'],
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating class:', formData);
    alert('Class updated successfully!');
  };

  const handleCancel = () => {
    // Reset form or navigate back
    console.log('Edit cancelled');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-semibold">Edit Class</h2>
        </div>        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Class Name */}
          <div>
            <label htmlFor="className" className="block text-sm font-medium text-gray-700 mb-1">Class Name</label>
            <select 
              id="className"
              name="className"
              value={formData.className}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              aria-label="Select class name"
            >
              <option value="Year 7">Year 7</option>
              <option value="Year 8">Year 8</option>
              <option value="Year 9">Year 9</option>
            </select>
          </div>

          {/* Arm */}
          <div>
            <label htmlFor="arm" className="block text-sm font-medium text-gray-700 mb-1">Arm</label>
            <select 
              id="arm"
              name="arm"
              value={formData.arm}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              aria-label="Select class arm"
            >
              <option value="Year 7A">Year 7A</option>
              <option value="Year 7B">Year 7B</option>
              <option value="Year 7C">Year 7C</option>
            </select>
          </div>

          {/* Class Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Class Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Enter class description"
              aria-label="Class description"
            />
          </div>          {/* Class Teachers */}
          <div>
            <label htmlFor="classTeacher" className="block text-sm font-medium text-gray-700 mb-1">Assign Class Teacher</label>
            <select 
              id="classTeacher"
              name="classTeacher"
              value={formData.classTeacher}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              aria-label="Select class teacher"
            >
              <option value="Samuel Okoro">Samuel Okoro</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
            </select>
          </div>

          <div>
            <label htmlFor="assistant" className="block text-sm font-medium text-gray-700 mb-1">Assign Assistant</label>
            <select 
              id="assistant"
              name="assistant"
              value={formData.assistant}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              aria-label="Select assistant teacher"
            >
              <option value="Samuel Omotayo">Samuel Omotayo</option>
              <option value="Mary Johnson">Mary Johnson</option>
              <option value="Peter Wilson">Peter Wilson</option>
            </select>
          </div>          {/* Subject Teachers */}
          <div>
            <label htmlFor="subjectTeacher1" className="block text-sm font-medium text-gray-700 mb-1">Assign Subject Teacher</label>
            <select 
              id="subjectTeacher1"
              name="subjectTeacher1"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              aria-label="Select first subject teacher"
              defaultValue="Chiyedu Nduka - Physics"
            >
              <option value="Chiyedu Nduka - Physics">Chiyedu Nduka - Physics</option>
              <option value="Betty Godwin - English">Betty Godwin - English</option>
              <option value="Mr. Adebayo - Mathematics">Mr. Adebayo - Mathematics</option>
            </select>
          </div>

          <div>
            <label htmlFor="subjectTeacher2" className="block text-sm font-medium text-gray-700 mb-1">Assign Subject Teacher</label>
            <select 
              id="subjectTeacher2"
              name="subjectTeacher2"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              aria-label="Select second subject teacher"
              defaultValue="Betty Godwin - English"
            >
              <option value="Chiyedu Nduka - Physics">Chiyedu Nduka - Physics</option>
              <option value="Betty Godwin - English">Betty Godwin - English</option>
              <option value="Mr. Adebayo - Mathematics">Mr. Adebayo - Mathematics</option>
            </select>
          </div>

          {/* Searchable Dropdown */}
          <div>
            <label htmlFor="teacherSearch" className="block text-sm font-medium text-gray-700 mb-1">Assign Subject Teacher</label>
            <input
              id="teacherSearch"
              type="text"
              placeholder="Search by subject or teacher name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full mb-2 border border-gray-300 rounded-lg px-4 py-2"
              aria-label="Search for subject teachers"
            />
            <select 
              id="additionalTeacher"
              name="additionalTeacher"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              aria-label="Select additional subject teacher from search results"
            >
              {filteredTeachers.map((teacher, i) => (
                <option key={i} value={teacher}>{teacher}</option>
              ))}
            </select>
          </div>          {/* Buttons */}
          <div className="flex justify-start gap-4 pt-4">
            <button
              type="submit"
              className="bg-[#00594C] text-white px-6 py-2 rounded-lg hover:bg-[#00473D]"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleCancel}
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
"use client";
import React, { useState } from 'react';

interface ClassFormData {
  className: string;
  arm: string;
  description: string;
  classTeacher: string;
  assistantTeacher: string;
  subjectTeachers: string[];
}

export default function CreateNewClass() {
  const [formData, setFormData] = useState<ClassFormData>({
    className: "",
    arm: "",
    description: "",
    classTeacher: "",
    assistantTeacher: "",
    subjectTeachers: ["", "", "", "", "", ""],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectTeacherChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      subjectTeachers: prev.subjectTeachers.map((teacher, i) => 
        i === index ? value : teacher
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.className || !formData.arm) {
      alert("Please fill in required fields");
      return;
    }
    console.log("Creating new class:", formData);
    alert("Class created successfully!");
  };

  const handleCancel = () => {
    setFormData({
      className: "",
      arm: "",
      description: "",
      classTeacher: "",
      assistantTeacher: "",
      subjectTeachers: ["", "", "", "", "", ""],
    });
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-6">Create New Class</h2>        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Class Section */}
          <div>
            <label htmlFor="className" className="block text-sm font-medium text-gray-700 mb-1">Class *</label>
            <select 
              id="className"
              name="className"
              value={formData.className}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
              aria-label="Select class level"
              required
            >
              <option value="">Select Class</option>
              <option value="year-7">Year 7</option>
              <option value="year-8">Year 8</option>
              <option value="year-9">Year 9</option>
              <option value="year-10">Year 10</option>
              <option value="year-11">Year 11</option>
              <option value="year-12">Year 12</option>
            </select>
          </div>          {/* Arm */}
          <div>
            <label htmlFor="arm" className="block text-sm font-medium text-gray-700 mb-1">Arm *</label>
            <input
              type="text"
              id="arm"
              name="arm"
              value={formData.arm}
              onChange={handleInputChange}
              placeholder="Enter Class Arm (e.g., A, B, C)"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
              aria-label="Class arm designation"
              required
            />
          </div>          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Class Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
              placeholder="Write a short description"
              aria-label="Class description"
            />
          </div>

          {/* Assign Teachers */}
          <div className="space-y-4">            <div>
              <label htmlFor="classTeacher" className="block text-sm font-medium text-gray-700 mb-1">Assign Class Teacher</label>
              <select 
                id="classTeacher"
                name="classTeacher"
                value={formData.classTeacher}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
                aria-label="Select class teacher"
              >
                <option value="">Select Teacher</option>
                <option value="mr-johnson">Mr. Johnson</option>
                <option value="ms-daniels">Ms. Daniels</option>
              </select>
            </div>            <div>
              <label htmlFor="assistantTeacher" className="block text-sm font-medium text-gray-700 mb-1">Assign Assistant Teacher</label>
              <select 
                id="assistantTeacher"
                name="assistantTeacher"
                value={formData.assistantTeacher}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
                aria-label="Select assistant teacher"
              >
                <option value="">Select Assistant</option>
                <option value="mr-smith">Mr. Smith</option>
                <option value="mrs-jane">Mrs. Jane</option>
              </select>
            </div>            {/* Repeat Subject Teachers (up to 6) */}
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <label htmlFor={`subjectTeacher-${i}`} className="block text-sm font-medium text-gray-700 mb-1">Assign Subject Teacher {i + 1}</label>
                <select 
                  id={`subjectTeacher-${i}`}
                  name={`subjectTeacher-${i}`}
                  value={formData.subjectTeachers[i]}
                  onChange={(e) => handleSubjectTeacherChange(i, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  aria-label={`Select subject teacher ${i + 1}`}
                >
                  <option value="">Select Subject Teacher</option>
                  <option value="mr-alex-math">Mr. Alex - Math</option>
                  <option value="mrs-bella-english">Mrs. Bella - English</option>
                  <option value="ms-carter-science">Ms. Carter - Science</option>
                  <option value="mr-davis-history">Mr. Davis - History</option>
                  <option value="mrs-evans-art">Mrs. Evans - Art</option>
                  <option value="mr-foster-pe">Mr. Foster - PE</option>
                </select>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-start gap-4 pt-4">
            <button
              type="submit"
              className="bg-[#00594C] text-white px-6 py-2 rounded-lg hover:bg-[#00473D]"
            >
              Save Class
            </button>            <button
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
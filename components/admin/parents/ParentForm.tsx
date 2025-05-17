"use client";

import { Parent, Student } from "@/lib/utils";
import { useState, useEffect } from "react";

interface ParentFormProps {
  parent?: Parent; // Optional for Add mode
  onSubmit: (data: Partial<Parent>) => void;
  onCancel: () => void;
}

export default function ParentForm({ parent, onSubmit, onCancel }: ParentFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    gender: "",
    occupation: "",
    linkedStudentId: "",
    relationship: "",
  });

  useEffect(() => {
    if (parent) {
      setFormData({
        name: parent.name || "",
        email: parent.email || "",
        phoneNumber: parent.phoneNumber || "",
        address: parent.address || "",
        gender: parent.gender || "",
        occupation: parent.occupation || "",
        linkedStudentId: parent.linkedStudents?.[0]?.studentId || "",
        relationship: parent.relationship || "",
      });
    }
  }, [parent]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold">{parent ? "Edit Parent" : "Add New Parent"}</h2>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">Name</label>
        <input 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="text-sm border border-gray-300 rounded-lg p-2 w-full md:w-5/12"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">Email</label>
        <input 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="text-sm border border-gray-300 rounded-lg p-2 w-full md:w-5/12"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">Phone Number</label>
        <input 
            name="phoneNumber" 
            value={formData.phoneNumber} 
            onChange={handleChange} 
            className="text-sm border border-gray-300 rounded-lg p-2 w-full md:w-5/12" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">Address</label>
        <input 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            className="text-sm border border-gray-300 rounded-lg p-2 w-full md:w-5/12" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">Gender</label>
        <select 
            name="gender" 
            value={formData.gender} 
            onChange={handleChange} 
            className="text-sm border border-gray-300 rounded-lg p-2 w-full md:w-5/12">
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm">Occupation</label>
        <input 
            name="occupation" 
            value={formData.occupation} 
            onChange={handleChange} 
            className="text-sm border border-gray-300 rounded-lg p-2 w-full md:w-5/12" />
      </div>

      {parent?.linkedStudents && parent.linkedStudents.length > 0 && (
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm">Linked Student</label>
          <select
            name="linkedStudentId"
            value={formData.linkedStudentId}
            onChange={handleChange}
            className="text-sm border border-gray-300 rounded-lg p-2 w-full md:w-5/12"
          >
            <option value="">Select student</option>
            {parent.linkedStudents.map((student: Student) => (
              <option key={student.studentId} value={student.studentId}>
                {student.name} - {student.class}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label className="font-semibold text-sm">Relationship</label>
        <select 
            name="relationship" 
            value={formData.relationship} 
            onChange={handleChange} 
            className="text-sm border border-gray-300 rounded-lg p-2 w-full md:w-5/12">
          <option value="">Select</option>
          <option value="Father">Father</option>
          <option value="Mother">Mother</option>
          <option value="Guardian">Guardian</option>
        </select>
      </div>

      <div className="flex gap-4 mt-4">
        <button type="submit" className="cursor-pointer bg-[#348081] text-white px-4 py-2 rounded-lg">
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer border border-red-500 text-red-500 px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

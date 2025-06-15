"use client";
import React, { useState } from "react";

interface StaffFormData {
  role: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  religion: string;
  address: string;
  dateOfBirth: string;
  maritalStatus: string;
  stateOfOrigin: string;
  academicStatus: string;
  medicalCondition: string;
  documents: File[];
}

export default function AddStaffForm() {
  const [formData, setFormData] = useState<StaffFormData>({
    role: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
    religion: "",
    address: "",
    dateOfBirth: "",
    maritalStatus: "",
    stateOfOrigin: "",
    academicStatus: "",
    medicalCondition: "",
    documents: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, documents: files }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.role || !formData.name || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }
    console.log("Form submitted:", formData);
    alert("Staff member added successfully!");
  };

  const handleCancel = () => {
    setFormData({
      role: "",
      name: "",
      email: "",
      phone: "",
      gender: "",
      religion: "",
      address: "",
      dateOfBirth: "",
      maritalStatus: "",
      stateOfOrigin: "",
      academicStatus: "",
      medicalCondition: "",
      documents: [],
    });
  };
  return (
    <div className="bg-white p-6 md:p-10 rounded-xl shadow max-w-3xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-6">Add New Staff</h2>      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Select Role */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium mb-1">Select Role *</label>
          <select 
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
            aria-label="Select staff role"
            required
          >
            <option value="">Select Role</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Name *</label>
          <input 
            type="text" 
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter Name" 
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
            aria-label="Staff member name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
          <input 
            type="email" 
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter Email" 
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
            aria-label="Staff member email address"
          />
        </div>        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
          <div className="flex gap-2">
            <span className="border border-gray-300 px-4 py-2 rounded bg-gray-100">+234</span>
            <input 
              type="text" 
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number" 
              className="w-full border border-gray-300 rounded px-4 py-2"
              aria-label="Phone number"
            />
          </div>
        </div>        {/* Gender */}
        <div>
          <label htmlFor="gender" className="block text-sm font-medium mb-1">Gender</label>
          <select 
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
            aria-label="Select gender"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>        {/* Religion */}
        <div>
          <label htmlFor="religion" className="block text-sm font-medium mb-1">Religion</label>
          <select 
            id="religion"
            name="religion"
            value={formData.religion}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
            aria-label="Select religion"
          >
            <option value="">Select Religion</option>
            <option value="christian">Christian</option>
            <option value="muslim">Muslim</option>
            <option value="other">Other</option>
          </select>
        </div>        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
          <input 
            type="text" 
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter Address" 
            className="w-full border border-gray-300 rounded px-4 py-2"
            aria-label="Home address"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium mb-1">Date of Birth</label>
          <input 
            type="date" 
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
            aria-label="Date of birth"
          />
        </div>        {/* Marital Status */}
        <div>
          <label htmlFor="maritalStatus" className="block text-sm font-medium mb-1">Marital Status</label>
          <select 
            id="maritalStatus"
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
            aria-label="Select marital status"
          >
            <option value="">Select Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>        {/* State of Origin */}
        <div>
          <label htmlFor="stateOfOrigin" className="block text-sm font-medium mb-1">State of Origin</label>
          <select 
            id="stateOfOrigin"
            name="stateOfOrigin"
            value={formData.stateOfOrigin}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
            aria-label="Select state of origin"
          >
            <option value="">Select State</option>
            <option value="lagos">Lagos</option>
            <option value="abia">Abia</option>
            <option value="abuja">Abuja (FCT)</option>
            <option value="rivers">Rivers</option>
            <option value="kano">Kano</option>
            <option value="others">Others</option>
          </select>
        </div>        {/* Academic Status */}
        <div>
          <label htmlFor="academicStatus" className="block text-sm font-medium mb-1">Academic Status</label>
          <select 
            id="academicStatus"
            name="academicStatus"
            value={formData.academicStatus}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
            aria-label="Select academic status"
          >
            <option value="">Select Status</option>
            <option value="graduate">Graduate</option>
            <option value="post-graduate">Post-Graduate</option>
            <option value="phd">PhD</option>
            <option value="masters">Masters</option>
            <option value="bachelors">Bachelors</option>
          </select>
        </div>        {/* Medical Condition */}
        <div>
          <label htmlFor="medicalCondition" className="block text-sm font-medium mb-1">Medical Condition</label>
          <select 
            id="medicalCondition"
            name="medicalCondition"
            value={formData.medicalCondition}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
            aria-label="Select medical condition status"
          >
            <option value="">Select</option>
            <option value="none">None</option>
            <option value="has-condition">Has Condition</option>
          </select>
        </div>        {/* File Upload */}
        <div>
          <label htmlFor="documents" className="block text-sm font-medium mb-2">Upload Documents</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-sm text-gray-500">
            <input
              type="file"
              id="documents"
              name="documents"
              multiple
              onChange={handleFileUpload}
              accept=".pdf,.docx,.png,.jpg,.jpeg"
              className="hidden"
              aria-label="Upload documents"
            />
            <p className="mb-2">
              Drag & drop files here or{" "}
              <label 
                htmlFor="documents" 
                className="text-blue-600 underline cursor-pointer hover:text-blue-800"
              >
                Browse
              </label>
            </p>
            <p className="text-xs">Supported formats: PDF, DOCX, PNG, JPG</p>
            {formData.documents.length > 0 && (
              <div className="mt-2 text-left">
                <p className="text-sm font-medium text-gray-700">Selected files:</p>
                <ul className="text-xs text-gray-600">
                  {formData.documents.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button 
            type="submit" 
            className="bg-teal-700 text-white px-6 py-2 rounded hover:bg-teal-800 transition-colors"
            aria-label="Save staff member information"
          >
            Save
          </button>
          <button 
            type="button" 
            onClick={handleCancel}
            className="border border-red-500 text-red-500 px-6 py-2 rounded hover:bg-red-50 transition-colors"
            aria-label="Cancel and clear form"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
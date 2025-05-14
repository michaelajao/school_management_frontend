"use client";
import React from "react";

export default function AddStaffForm() {
  return (
    <div className="bg-white p-6 md:p-10 rounded-xl shadow max-w-3xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-6">Add New Staff</h2>

      <form className="space-y-4">
        {/* Select Role */}
        <div>
          <label className="block text-sm font-medium mb-1">Select Role</label>
          <select className="w-full border border-gray-300 rounded px-4 py-2">
            <option>Select Role</option>
            <option>Teacher</option>
            <option>Admin</option>
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input type="text" placeholder="Enter Name" className="w-full border border-gray-300 rounded px-4 py-2" />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" placeholder="Enter Email" className="w-full border border-gray-300 rounded px-4 py-2" />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <div className="flex gap-2">
            <span className="border border-gray-300 px-4 py-2 rounded bg-gray-100">+234</span>
            <input type="text" placeholder="Phone Number" className="w-full border border-gray-300 rounded px-4 py-2" />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select className="w-full border border-gray-300 rounded px-4 py-2">
            <option>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        {/* Religion */}
        <div>
          <label className="block text-sm font-medium mb-1">Religion</label>
          <select className="w-full border border-gray-300 rounded px-4 py-2">
            <option>Select Religion</option>
            <option>Christian</option>
            <option>Muslim</option>
          </select>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input type="text" placeholder="Enter Address" className="w-full border border-gray-300 rounded px-4 py-2" />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium mb-1">Date of Birth</label>
          <input type="date" className="w-full border border-gray-300 rounded px-4 py-2" />
        </div>

        {/* Marital Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Marital Status</label>
          <select className="w-full border border-gray-300 rounded px-4 py-2">
            <option>Select Status</option>
            <option>Single</option>
            <option>Married</option>
          </select>
        </div>

        {/* State of Origin */}
        <div>
          <label className="block text-sm font-medium mb-1">State of Origin</label>
          <select className="w-full border border-gray-300 rounded px-4 py-2">
            <option>Select State</option>
            <option>Lagos</option>
            <option>Abia</option>
            <option>Others</option>
          </select>
        </div>

        {/* Academic Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Academic Status</label>
          <select className="w-full border border-gray-300 rounded px-4 py-2">
            <option>Select Status</option>
            <option>Graduate</option>
            <option>Post-Graduate</option>
          </select>
        </div>

        {/* Medical Condition */}
        <div>
          <label className="block text-sm font-medium mb-1">Medical Condition</label>
          <select className="w-full border border-gray-300 rounded px-4 py-2">
            <option>Select</option>
            <option>None</option>
            <option>Has Condition</option>
          </select>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Upload Documents</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-sm text-gray-500">
            <p className="mb-2">Drag & drop files here or <span className="text-blue-600 underline cursor-pointer">Browse</span></p>
            <p className="text-xs">Supported formats: PDF, DOCX, PNG</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button type="submit" className="bg-teal-700 text-white px-6 py-2 rounded">Save</button>
          <button type="button" className="border border-red-500 text-red-500 px-6 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
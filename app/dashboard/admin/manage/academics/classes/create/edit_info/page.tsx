"use client";
import React from "react";
import { Download } from "lucide-react";

export default function EditStaffForm() {
  return (
    <div className="bg-white p-6 md:p-10 rounded-xl shadow max-w-3xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-6">Edit Info</h2>

      <form className="space-y-4">
        {/* Select Role */}
        <div>
          <label className="block text-sm font-medium mb-1">Select Role</label>
          <select defaultValue="Admin" className="w-full border border-gray-300 rounded px-4 py-2">
            <option>Teacher</option>
            <option>Admin</option>
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input type="text" defaultValue="Jenny Johnson" className="w-full border border-gray-300 rounded px-4 py-2" />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" defaultValue="jennyjmanor@gmail.com" className="w-full border border-gray-300 rounded px-4 py-2" />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <div className="flex gap-2">
            <span className="border border-gray-300 px-4 py-2 rounded bg-gray-100">+234</span>
            <input type="text" defaultValue="9053426789" className="w-full border border-gray-300 rounded px-4 py-2" />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select defaultValue="Female" className="w-full border border-gray-300 rounded px-4 py-2">
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        {/* Religion */}
        <div>
          <label className="block text-sm font-medium mb-1">Religion</label>
          <select defaultValue="Anglican" className="w-full border border-gray-300 rounded px-4 py-2">
            <option>Christian</option>
            <option>Muslim</option>
            <option>Others</option>
          </select>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            defaultValue="21 John Close, LADP Exp. Lagos"
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium mb-1">Date of Birth</label>
          <input type="date" defaultValue="1990-11-03" className="w-full border border-gray-300 rounded px-4 py-2" />
        </div>

        {/* Marital Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Marital Status</label>
          <select defaultValue="Married" className="w-full border border-gray-300 rounded px-4 py-2">
            <option>Single</option>
            <option>Married</option>
          </select>
        </div>

        {/* State of Origin */}
        <div>
          <label className="block text-sm font-medium mb-1">State of Origin</label>
          <select defaultValue="Anambra State" className="w-full border border-gray-300 rounded px-4 py-2">
            <option>Lagos</option>
            <option>Anambra State</option>
            <option>Others</option>
          </select>
        </div>

        {/* Medical Condition */}
        <div>
          <label className="block text-sm font-medium mb-1">Medical Condition</label>
          <select defaultValue="Nil" className="w-full border border-gray-300 rounded px-4 py-2">
            <option>Nil</option>
            <option>Has Condition</option>
          </select>
        </div>

        {/* Uploaded Document Preview */}
        <div>
          <label className="block text-sm font-medium mb-2">Document</label>
          <div className="bg-blue-50 border border-blue-300 rounded-lg px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-blue-900">Jenny Johnson&apos;s CV</span>
            <Download className="w-5 h-5 text-blue-600 cursor-pointer" />
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
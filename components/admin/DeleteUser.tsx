import React from "react";
import { X, Trash2 } from "lucide-react";

type DeleteUserProps = {
  onClose: () => void;
  onDelete: () => void;
};

export default function DeleteUser({ onClose, onDelete }: DeleteUserProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6 relative">
        
        {/* Close Icon */}
        <button
          className="absolute top-4 right-4 text-gray-700 hover:text-black"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Trash Icon */}
        <div className="flex justify-center mb-4">
          <Trash2 className="text-red-500 w-10 h-10" />
        </div>

        {/* Title */}
        <h3 className="text-center text-lg font-semibold mb-2">
          Are You Sure You Want to Delete This User?
        </h3>

        {/* Info Text */}
        <p className="text-center text-sm text-gray-600 mb-2">
          This action will permanently remove the user’s account and access to the portal.
        </p>

        <p className="text-center text-xs text-gray-400">
          Note: All associated data, attendance, and activity logs will remain stored for record-keeping purposes.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-teal-700 text-white px-6 py-2 rounded"
          >
            No, Cancel
          </button>
          <button
            onClick={onDelete}
            className="border border-red-500 text-red-500 px-6 py-2 rounded hover:bg-red-50"
          >
            Yes, Delete User
          </button>
        </div>
      </div>
    </div>
  );
}
"use client"

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ParentForm from "@/components/admin/parents/ParentForm";
import { useRouter } from "next/navigation";
import { useParentStore } from "@/store/parentStore"; // adjust this to match your actual store

export default function EditParent() {
  const router = useRouter();
  const selectedParent = useParentStore((state) => state.selectedParent);

  const handleEdit = (data: any) => {
    // Call your update API or mutation here
    console.log("Editing parent:", data);
    router.push("/dashboard/users/parents");
  };

  if (!selectedParent) {
    return <p className="text-red-500">No parent selected for editing.</p>;
  }

  return (
    <div>
      <Link className="flex gap-4 font-semibold mb-8" href="/dashboard/users/parents">
        <ChevronLeft />
        <p>Edit Info</p>
      </Link>

      <ParentForm
        parent={selectedParent}
        onSubmit={handleEdit}
        onCancel={() => router.push("/dashboard/users/parents")}
      />
    </div>
  );
}
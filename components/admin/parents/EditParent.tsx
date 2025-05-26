"use client"

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ParentForm from "@/components/admin/parents/ParentForm";
import { useRouter } from "next/navigation";
import { useParentStore } from "@/store/parentStore"; // adjust this to match your actual store
import { Button } from "@/components/ui/button";

export default function EditParent() {
  const router = useRouter();
  const selectedParent = useParentStore((state) => state.selectedParent);

  const handleEdit = (data: any) => {
    // Call your update API or mutation here
    console.log("Editing parent:", data);
    router.push("/users/admin/manage/parents");
  };

  if (!selectedParent) {
    return <p className="text-red-500">No parent selected for editing.</p>;
  }

  return (
    <div>
      <Button className="flex gap-4 font-semibold mb-8 bg-transparent text-black" 
        onClick={() => router.back()}
      >
        <ChevronLeft />
        <p>Edit Info</p>
      </Button>

      <ParentForm
        parent={selectedParent}
        onSubmit={handleEdit}
        onCancel={() => router.back()}
      />
    </div>
  );
}
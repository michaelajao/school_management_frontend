'use client'

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ParentForm from "@/components/admin/parents/ParentForm";
import { useRouter } from "next/navigation";

export default function AddParent() {
  const router = useRouter();

  const handleAdd = (data: any) => {
    // Call your add API or mutation here
    console.log("Adding parent:", data);
    router.push("/users/admin/manage/parents");
  };

  return (
    <div>
      <button className="cursor-pointer flex gap-4 font-semibold mb-8" onClick={() => router.back()}>
          <ChevronLeft />
          <p>Add Parent</p>
      </button>

      <ParentForm onSubmit={handleAdd} onCancel={() => router.back()} />
    </div>
  );
}
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
    router.push("/dashboard/users/parents");
  };

  return (
    <div>
      <Link className="flex gap-4 font-semibold mb-8" href="/dashboard/users/parents">
        <ChevronLeft />
        <p>Add Parent</p>
      </Link>

      <ParentForm onSubmit={handleAdd} onCancel={() => router.push("/dashboard/users/parents")} />
    </div>
  );
}
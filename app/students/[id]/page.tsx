"use client";

import { use } from "react";
import StudentProfile from "@/components/students/StudentProfile";

interface StudentDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function StudentDetailPage({ params }: StudentDetailPageProps) {
  const { id } = use(params);

  return <StudentProfile studentId={id} />;
}
// File: app/dashboard/students/[studentId]/edit/page.tsx (Server Component)

import StudentEditFormClient from "@/components/admin/students/StudentEditFormClient";



export default async function StudentEditPage({ params }: { params: { studentId: string } }) {
  // In a real application, you would fetch this data from your database
  // This would be server-side data fetching
  const studentData = {
    name: "Kingsley Essang",
    studentId: "STU-2023-0142",
    class: "Year 7A",
    gender: "Male",
    dateOfBirth: null as Date | null,
    email: "kingsleyessang@swamprimacischool.com",
    address: "24 deirth close, Lekki Epe Expressway, Lagos",
    parent: "Donald Essang",
    parentPhoneNumber: "8123456789",
    stateOfOrigin: "Akwa-Ibom",
    weight: "48kg",
    height: { feet: "5", inches: "7" },
    medicalCondition: "Asthmatic",
  };

  // You could replace the above with actual data fetching:
  // const studentData = await getStudentData(params.studentId);

  return (
    <StudentEditFormClient
      studentData={studentData} 
      studentId={params.studentId}
    />
  );
}
// File: app/dashboard/students/[studentId]/page.tsx (Server Component)

import StudentProfileClient from "@/components/admin/students/StudentProfileClient";



export default async function StudentProfilePage({ params }: { params: { studentId: string } }) {
  //  fetch this data from your database
  // This would be server-side data fetching
  const studentData = {
    name: "Kingsley Essang",
    role: "Student",
    studentId: "STU-2023-0142",
    gender: "Male",
    dateOfBirth: "3rd November 2015",
    class: "Year 7A",
    email: "kingsleyessang@swamprimacischool.com",
    address: "24 deirth close, Lekki Epe Expressway, Lagos",
    phoneNumber: "+234 8123456789",
    parent: "Mr Donald Essang",
    parentPhoneNumber: "+234 8123456789",
    stateOfOrigin: "Akwa-Ibom State",
    weight: "48kg",
    height: "5'7\"",
    medicalCondition: "Asthmatic",
    feeStatus: "Outstanding Fee",
    outstandingAmount: "N50,000",
    lastLogin: "20 minutes ago",
  };



  return <StudentProfileClient studentData={studentData} studentId={params.studentId} />;
}
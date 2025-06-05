import { SchoolAdminRegistrationForm } from "@/components/auth/school-admin-registration-form";

export const metadata = {
  title: "School Registration | School Management System",
  description: "Register your school and create an admin account to get started.",
};

export default function SchoolRegistrationPage() {
  return <SchoolAdminRegistrationForm />;
}

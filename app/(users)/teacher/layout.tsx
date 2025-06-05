import { SidebarWrapper } from "@/components/layout/sidebar/SidebarWrapper";
import { ReactNode } from "react";
import Header from "@/components/layout/Header";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function TeacherDashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex w-full overflow-hidden">
      <SidebarWrapper />

      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Header */}
        <Header />

        {/* Scrollable content area */}
        <main className="px-8 py-4 my-8 ml-4 mr-4 lg:mr-8 rounded-2xl bg-[#F5F5F5]">
          {children}
        </main>
      </div>
    </div>
  );
}

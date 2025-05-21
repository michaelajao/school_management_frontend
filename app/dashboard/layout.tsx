import { SidebarWrapper } from "@/components/layout/sidebar/SidebarWrapper";
import { ReactNode } from "react";
import Header from "@/components/layout/Header";


type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  /*
    Separation of concerns. Now layout is server-side rendered.
    SidebarWrapper, Header and Main can be tested independently
   */

  return (
    <div className="flex h-screen w-full flex-row bg-white">
      {/* Handles what sidebar to show depending on screensize */}
      <SidebarWrapper />

      <div className="flex flex-col sm:gap-4 sm:py-4 flex-1 overflow-y-auto ">
        {/* Header */}
        <Header />

        {/* Main Content Area */}
        {/* flex-1 gap-4 p-20 sm:px-6 sm:py-0 md:gap-8 */}
        <main className="p-8 my-4 mx-4 lg:mx-8 rounded-2xl bg-[#F5F5F5]">
          {children}
        </main>
      </div>
    </div>
  );
}
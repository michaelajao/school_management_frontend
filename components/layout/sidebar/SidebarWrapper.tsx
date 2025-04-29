import { AppSidebar } from "@/components/layout/sidebar/AppSidebar";
import { MobileSidebar } from "@/components/layout/sidebar/MobileSidebar"


export function SidebarWrapper() {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:w-[350px] lg:flex">
        <AppSidebar />
      </div>

      {/* Mobile Sidebar */}
      <div className="flex lg:hidden">
        <MobileSidebar />
      </div>
    </>
  );
}

"use client";

import { SidebarWrapper } from "@/components/layout/sidebar/SidebarWrapper";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth-context"; // Import useAuth
import { LogOut } from "lucide-react"; // Import LogOut icon


type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth(); // Get user and logout function

  return (
    <div className="flex h-screen w-full flex-row bg-muted/40">
      {/* Handles what sidebar to show depending on screensize */}
      <SidebarWrapper />

      <div className=" *:flex flex-col sm:gap-4 sm:py-4 flex-1 overflow-y-auto "> {/* Adjust pl to match sidebar width */}
        {/* Header (Optional) - Include Mobile Sidebar Trigger Here */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          {/* Other header content like breadcrumbs, user menu */}
          <div className="ml-auto flex items-center gap-4">
            {/* User Menu Dropdown */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      {/* Add user avatar image if available */}
                      {/* <AvatarImage src={user.avatarUrl} alt={user.name} /> */}
                      <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user.name || "My Account"}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
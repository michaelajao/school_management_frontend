"use client";

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
import NotificationBar from "@/components/layout/NotificationBar";
import SearchBar from "./Searchbar";

import { LogOut } from "lucide-react"; // Import LogOut icon
import { useAuth } from "@/contexts/auth-context"; // Import useAuth

export default function Header() {
  const { user, logout } = useAuth(); // Get user and logout function
  return (
      <div className="flex justify-end lg:justify-between py-2 md:pl-6"> {/* Adjust pl to match sidebar width */}
          {/* Search bar & Notificaiton panel */}
          <div className="flex gap-10">
              <SearchBar /> 

              {/* It's static for now. Needs to be able to fetch notfications */}
              <NotificationBar />
          </div>     
        {/* Header (Optional) - Include Mobile Sidebar Trigger Here */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
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

      </div>
  );
}
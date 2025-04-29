"use client";

import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown, ChevronUp } from "lucide-react";
import { getNavSectionsForRole } from "@/lib/utils";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
//import { useAuth } from "@/contexts/auth-context";

export function MobileSidebar() {
  // Role can be set here without having to go through the entire onboarding process
  // You can switch the role and see how it affects the dashboard
  // Valid roles: student | teacher | parent | admin | superadmim
  // const{ role } = useAuth();
  const role: 'student' = 'student';
  const navSections = getNavSectionsForRole(role);

  const [primaryColor, setPrimaryColor] = useState("#1B5B5E");
  const [schoolLogo, setSchoolLogo] = useState<string | null>(null);
  const [schoolName, setSchoolName] = useState("Your School");
  const [openSection, setOpenSection] = useState<string | null>(null);

  const handleToggle = (label: string) => {
    setOpenSection(prev => (prev === label ? null : label));
  };

  useEffect(() => {
    try {
      const configStr = localStorage.getItem("schoolConfig");
      if (configStr) {
        const config = JSON.parse(configStr);
        if (config.primaryColor) setPrimaryColor(config.primaryColor);
        if (config.logoUrl) setSchoolLogo(config.logoUrl);
        if (config.schoolName) setSchoolName(config.schoolName);
      }
    } catch (e) {
      console.error("Failed to load school config", e);
    }
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-64 p-4 pt-10">
        {/* Branding */}
        <div className="flex items-center mb-4">
          <div
            className="w-10 h-10 rounded-full overflow-hidden bg-gray-100"
            style={{ border: `2px solid ${primaryColor}` }}
          >
            {schoolLogo ? (
              <img
                src={schoolLogo}
                alt="School Logo"
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>
          <span
            className="ml-3 text-lg font-bold"
            style={{ color: primaryColor }}
          >
            {schoolName}
          </span>
        </div>

        {/* Navigation */}
        {navSections.map((section) => (
          <div key={section.label} className="mb-2">
            <button
              onClick={() => handleToggle(section.label)}
              className={cn(
                "flex items-center justify-between w-full text-left gap-3 text-sm text-gray-700 hover:text-black hover:bg-gray-200 rounded-md px-3 py-2 transition",
                openSection === section.label && "bg-gray-200"
              )}
            >
              <div className="flex items-center gap-3">
                <section.icon className="h-5 w-5" />
                <span className="font-bold">{section.label}</span>
              </div>
              {section.items && (
                openSection === section.label ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )
              )}
            </button>

            {section.items && openSection === section.label && (
              <div className="flex flex-col mt-2 ml-4">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 text-sm text-gray-700 hover:text-black hover:bg-gray-200 rounded-md px-3 py-2 transition"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </SheetContent>
    </Sheet>
  );
}

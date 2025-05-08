"use client";

import { useState, useEffect } from "react";
import { getNavSectionsForRole } from "@/lib/utils";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
//import { useAuth } from "@/contexts/auth-context";

export function AppSidebar() {
  // Role can be set here without having to go through the entire onboarding process
  // You can switch the role and see how it affects the dashboard
  // Valid roles: student | teacher | parent | admin | superadmim
  // const{ role } = useAuth();
  const role: 'superadmin' = 'superadmin'; // Change this to test different roles

  // Utility function that gets the necessary navigation section and items based on role.
  // Fits with the one layout system
  const navSections = getNavSectionsForRole(role);

  // School branding state
  const [primaryColor, setPrimaryColor] = useState("#1B5B5E");
  const [schoolLogo, setSchoolLogo] = useState<string | null>(null);
  const [schoolName, setSchoolName] = useState("Your School");
  const [openSection, setOpenSection] = useState<string | null>(null);

  const handleToggle = (label: string) => {
    setOpenSection(prev => (prev === label ? null : label));
  };

    useEffect(() => {
      // Load school config from localStorage (set during onboarding)
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
    <aside className="hidden lg:flex lg:flex-col *:w-68 p-4 h-full overflow-y-auto pt-10">
      {/* School branding */}
      <div className="flex items-center mb-6">
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
          style={{ color: primaryColor }} // School name in primary color
        >
          {schoolName}
        </span>
      </div>

      {navSections.map((section) => (
        <div key={section.label} className="mb-6">
          {/* 
            Section Header - Each role has a section header where items are grouped together; 
            ie: Academics 
          */}
          <button
            onClick={() => handleToggle(section.label)}
            className={cn(
              "flex items-center justify-between w-11/12 text-left gap-3 text-sm text-gray-700 hover:text-black hover:bg-gray-200 rounded-md px-3 py-2 transition",
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

          {/* 
            Section Items - Items part of a single section; 
            ie: Academics
                    -> Classes
                    -> Timetable (etc)
          */}
          {section.items && openSection === section.label && (
            <div className="flex flex-col mt-2 ml-4 w-10/12">
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
    </aside>
  );
}

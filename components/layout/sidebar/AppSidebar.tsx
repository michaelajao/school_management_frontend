
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Will add others as we proceed. 
import { adminSideBar, sideBarSettings } from "@/lib/utils";


type SidebarProps = {
    onItemClick?: () => void;
}

export function AppSidebar({ onItemClick }: SidebarProps) {

    // School branding state
    const [primaryColor, setPrimaryColor] = useState("#1B5B5E");
    const [schoolLogo, setSchoolLogo] = useState<string | null>(null);
    const [schoolName, setSchoolName] = useState("Your School");

    const pathname = usePathname();

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
        <aside className="flex flex-col *:w-68 p-4 h-full overflow-y-auto pt-10  bg-white">
            {/* School branding */}
            <div className="flex items-center mb-12">
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

            <section className="flex flex-col justify-between h-full">
                <div className="space-y-2">
                    {adminSideBar.map((section) => (
                        <Link 
                            key={section.href}
                            href={section.href}
                            onClick={onItemClick}
                            className={`
                                flex gap-2 items-center px-[12px] py-[10px] h-[36px]
                                ${pathname === section.href ? 'bg-[#BDFAFF] border-l-4 border-[#008080]' : ''}
                            `}>
                            <section.icon style={{ color: `${pathname === section.href ? '#008080' : '#4A4A4A'}`  }} className='h-5 w-5' />
                            <span className={`${pathname === section.href ? 'text-[#008080]' : 'text-[#4A4A4A]'}`}>{section.label}</span>
                        </Link>
                    ))}
                </div>

                {/* Settings & Logging off */}
                <div className="space-y-4">
                    {sideBarSettings.map((section) => (
                        <Link 
                            key={section.href}
                            href={section.href}
                            onClick={onItemClick}
                            className={`
                                flex gap-2 items-center px-[12px] py-[10px] h-[36px]
                                ${pathname === section.href ? 'bg-[#BDFAFF] border-l-4 border-[#008080]' : ''}
                            `}>
                            <section.icon style={{ color: `${section.label == 'Logout' ? '#FB3748' : '#4A4A4A'}` }} className='h-5 w-5' />
                            <span className="font-medium text-[#4A4A4A]">{section.label}</span>
                        </Link>
                    ))}
                </div>
            </section>
        </aside>
    );
}
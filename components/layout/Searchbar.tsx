"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getNavSectionsForRole } from "@/lib/utils";
//import { Input } from "@/components/ui/input";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
//import { useAuth } from "@/contexts/auth-context";
//import { cn } from "@/lib/utils";

import { useEffect } from "react";

export default function SearchBar() {
  const router = useRouter();
  //const { role } = useAuth();
  // For simplicity purposes; this will be removed.
  const role: 'admin' = 'admin';


  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Get nav items for role
  const navSections = useMemo(() => getNavSectionsForRole(role), [role]);

  // Flatten items for search
  const navItems = useMemo(() => {
    return navSections.flatMap(section =>
      section.items.map(item => ({
        ...item,
        section: section.label,
      }))
    );
  }, [navSections]);

  // Filtered items
  const filteredItems = useMemo(() => {
    if (!query) return [];
    return navItems.filter(item =>
      item.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, navItems]);

  // Close on escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);


  return (
    <div className="hidden lg:block lg:relative w-[500px] rounded-md">
      <Command 
      shouldFilter={false} 
      className="overflow-visible bg-[#ebfefe] border border-[#1B5B5E]"
     >
        <CommandInput
          placeholder="Search"
          value={query}
          onValueChange={(val) => {
            setQuery(val);
            setOpen(true);
          }}
          className="w-full"
        />
        {open && filteredItems.length > 0 && (
          <CommandList className="absolute top-full z-10 mt-1 w-full rounded-md border bg-white shadow-md max-h-64 overflow-auto">
            <CommandGroup heading="Results">
              {filteredItems.map(item => (
                <CommandItem
                  key={item.href}
                  value={item.label}
                  onSelect={() => {
                    router.push(item.href);
                    setOpen(false);
                    setQuery("");
                  }}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  );
}

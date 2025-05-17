"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
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
      </Command>
    </div>
  );
}

"use client";

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "./AppSidebar";
import { useState } from "react";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);


  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="mt-1 bg-[#ebfefe]">
        <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-80 pt-10">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>Access school management navigation links</SheetDescription>
        </SheetHeader>
        <AppSidebar onItemClick={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}

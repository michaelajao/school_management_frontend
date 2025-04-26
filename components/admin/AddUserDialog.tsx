"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type AddUserDialogProps = {
  roleToAdd: "admin" | "teacher" | "student";
  children: React.ReactNode; // To wrap the trigger button
  onUserAdded?: (userData: any) => void; // Optional callback after adding
};

export function AddUserDialog({ roleToAdd, children, onUserAdded }: AddUserDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // Add password state if needed, or handle it differently (e.g., invite link)
  // const [password, setPassword] = useState(""); 
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Adding user:", { name, email, role: roleToAdd });
    // --- TODO: Replace with actual API call --- 
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    // --- End TODO ---
    
    setIsLoading(false);
    toast.success(`${roleToAdd.charAt(0).toUpperCase() + roleToAdd.slice(1)} added successfully!`);
    // Call the callback if provided
    if (onUserAdded) {
      onUserAdded({ name, email, role: roleToAdd }); // Pass back mock data
    }
    // Reset form and close dialog
    setName("");
    setEmail("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children} 
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New {roleToAdd.charAt(0).toUpperCase() + roleToAdd.slice(1)}</DialogTitle>
          <DialogDescription>
            Enter the details for the new {roleToAdd}. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="col-span-3" 
                required 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="col-span-3" 
                required 
              />
            </div>
            {/* Add Password field if needed */}
            {/* 
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input id="password" type="password" className="col-span-3" required />
            </div>
            */}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

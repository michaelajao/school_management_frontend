"use client";

import { useState, useEffect } from "react";
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

type UserData = {
  id?: string;
  name: string;
  email: string;
  role: "admin" | "teacher" | "student";
};

type UserFormDialogProps = {
  mode: "add" | "edit";
  roleToAddOrEdit: "admin" | "teacher" | "student";
  initialData?: UserData | null;
  children?: React.ReactNode; // Make children optional for controlled mode
  onUserSaved?: (userData: UserData) => void;
  // Add props for controlled mode
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function UserFormDialog({ 
  mode,
  roleToAddOrEdit,
  initialData,
  children, // Trigger for uncontrolled mode
  onUserSaved,
  isOpen: controlledIsOpen, // Use controlled state if provided
  onOpenChange: controlledOnOpenChange // Use controlled handler if provided
}: UserFormDialogProps) {
  // Internal state for uncontrolled mode
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  // Determine if the dialog is controlled or uncontrolled
  const isControlled = controlledIsOpen !== undefined && controlledOnOpenChange !== undefined;

  // Use controlled state/handler if available, otherwise use internal state
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  const setIsOpen = isControlled ? controlledOnOpenChange : setInternalIsOpen;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = mode === 'edit';
  const role = isEditMode && initialData ? initialData.role : roleToAddOrEdit;

  // Populate form effect
  useEffect(() => {
    if (isEditMode && initialData && isOpen) {
      setName(initialData.name || "");
      setEmail(initialData.email || "");
    } else if (!isEditMode && isOpen) {
      setName("");
      setEmail("");
    }
    // Reset if closed externally while in edit mode
    if (!isOpen && isEditMode) {
        setName("");
        setEmail("");
    }
  }, [initialData, isEditMode, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const userData: UserData = {
      ...(isEditMode && initialData && { id: initialData.id }),
      name,
      email,
      role: role,
    };
    console.log(isEditMode ? "Updating user:" : "Adding user:", userData);
    // --- TODO: Replace with actual API call --- 
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    // --- End TODO ---
    setIsLoading(false);
    toast.success(`${role.charAt(0).toUpperCase() + role.slice(1)} ${isEditMode ? 'updated' : 'added'} successfully!`);
    if (onUserSaved) {
      onUserSaved(userData);
    }
    setIsOpen(false); // Close dialog using the correct setter
  };

  // Reset form state when dialog closes
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open); // Use the determined setter
    if (!open) {
        // Resetting state is handled by useEffect now based on isOpen
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {/* Only render trigger if in uncontrolled mode (usually 'add' mode) */}
      {!isControlled && children && (
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit' : 'Add New'} {role.charAt(0).toUpperCase() + role.slice(1)}</DialogTitle>
          <DialogDescription>
            {isEditMode ? `Update the details for ${initialData?.name}.` : `Enter the details for the new ${role}.`} Click save when you're done.
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
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : isEditMode ? "Save Changes" : "Save User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

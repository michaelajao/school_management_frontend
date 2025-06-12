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
import { ClassData } from "./ClassTable"; // Import ClassData type

// Type for form data (ID is optional for add mode)
export type ClassFormData = Omit<ClassData, 'id' | 'studentCount'> & { id?: string };

type ClassFormDialogProps = {
  mode: "add" | "edit";
  initialData?: ClassData | null;
  children?: React.ReactNode;
  onClassSaved?: (classData: ClassFormData) => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ClassFormDialog({
  mode,
  initialData,
  children,
  onClassSaved,
  isOpen: controlledIsOpen,
  onOpenChange: controlledOnOpenChange
}: ClassFormDialogProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined && controlledOnOpenChange !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  const setIsOpen = isControlled ? controlledOnOpenChange : setInternalIsOpen;

  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState(""); // Assuming teacher is assigned by name/ID string for now
  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = mode === 'edit';

  useEffect(() => {
    console.log("ClassFormDialog useEffect:", { isEditMode, initialData, isOpen });
    if (isEditMode && initialData && isOpen) {
      setName(initialData.name || "");
      setTeacher(initialData.teacher || "");
    } else if (!isEditMode && isOpen) {
      setName("");
      setTeacher("");
    }
     if (!isOpen) { // Reset form when closed
        setName("");
        setTeacher("");
    }
  }, [initialData, isEditMode, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const classData: ClassFormData = {
      ...(isEditMode && initialData && { id: initialData.id }),
      name,
      teacher,
    };
    console.log(isEditMode ? "Updating class:" : "Adding class:", classData);

    // --- TODO: Replace with actual API call (Add or Update Class) ---
    await new Promise(resolve => setTimeout(resolve, 1000));
    // --- End TODO ---

    setIsLoading(false);
    toast.success(`Class ${isEditMode ? 'updated' : 'added'} successfully!`);
    if (onClassSaved) {
      onClassSaved(classData);
    }
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {!isControlled && children && (
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit' : 'Add New'} Class</DialogTitle>
          <DialogDescription>
            {isEditMode ? `Update the details for ${initialData?.name}.` : `Enter the details for the new class.`} Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
           <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Class Name
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
              <Label htmlFor="teacher" className="text-right">
                Teacher
              </Label>
              {/* TODO: Replace with a Select dropdown populated with teachers */}
              <Input
                id="teacher"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                className="col-span-3"
                placeholder="Assign Teacher (Optional)"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : isEditMode ? "Save Changes" : "Save Class"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

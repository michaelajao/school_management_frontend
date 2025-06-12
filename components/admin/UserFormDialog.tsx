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
import { UsersApiService, type UserRole } from "@/lib/api/users";

type UserData = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
};

type UserFormDialogProps = {
  mode: "add" | "edit";
  roleToAddOrEdit: UserRole;
  initialData?: UserData | null;
  children?: React.ReactNode;
  onUserSaved?: (userData: UserData) => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function UserFormDialog({ 
  mode,
  roleToAddOrEdit,
  initialData,
  children,
  onUserSaved,
  isOpen: controlledIsOpen,
  onOpenChange: controlledOnOpenChange
}: UserFormDialogProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined && controlledOnOpenChange !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  const setIsOpen = isControlled ? controlledOnOpenChange : setInternalIsOpen;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | 'OTHER'>('MALE');
  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = mode === 'edit';
  const role = isEditMode && initialData ? initialData.role : roleToAddOrEdit;

  useEffect(() => {
    if (isEditMode && initialData && isOpen) {
      setFirstName(initialData.firstName || "");
      setLastName(initialData.lastName || "");
      setEmail(initialData.email || "");
      setPhoneNumber(initialData.phoneNumber || "");
      setAddress(initialData.address || "");
      setDateOfBirth(initialData.dateOfBirth || "");
      setGender(initialData.gender || 'MALE');
    } else if (!isEditMode && isOpen) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setAddress("");
      setDateOfBirth("");
      setGender('MALE');
    }
    if (!isOpen && isEditMode) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setAddress("");
      setDateOfBirth("");
      setGender('MALE');
    }
  }, [initialData, isEditMode, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userData: UserData = {
        ...(isEditMode && initialData && { id: initialData.id }),
        firstName,
        lastName,
        email,
        role,
        phoneNumber,
        address,
        dateOfBirth,
        gender,
      };

      let response;
      if (isEditMode && initialData?.id) {
        response = await UsersApiService.updateUser(initialData.id, userData);
      } else {
        switch (role) {
          case 'STUDENT':
            response = await UsersApiService.createStudentUser({
              ...userData,
              studentId: `STU${Date.now()}`, // Generate a temporary student ID
            });
            break;
          case 'PARENT':
            response = await UsersApiService.createParentUser({
              ...userData,
              relationshipToStudent: 'Parent', // Default relationship
            });
            break;
          default:
            response = await UsersApiService.createUser(userData);
        }
      }

      toast.success(`${role.charAt(0).toUpperCase() + role.slice(1)} ${isEditMode ? 'updated' : 'added'} successfully!`);
      if (onUserSaved) {
        onUserSaved(response.user || response);
      }
      setIsOpen(false);
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error(`Failed to ${isEditMode ? 'update' : 'add'} ${role.toLowerCase()}`);
    } finally {
      setIsLoading(false);
    }
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
          <DialogTitle>{isEditMode ? 'Edit' : 'Add New'} {role.charAt(0).toUpperCase() + role.slice(1)}</DialogTitle>
          <DialogDescription>
            {isEditMode ? `Update the details for ${initialData?.firstName} ${initialData?.lastName}.` : `Enter the details for the new ${role.toLowerCase()}.`} Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                First Name
              </Label>
              <Input 
                id="firstName" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                className="col-span-3" 
                required 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Last Name
              </Label>
              <Input 
                id="lastName" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                Phone
              </Label>
              <Input 
                id="phoneNumber" 
                type="tel" 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input 
                id="address" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dateOfBirth" className="text-right">
                Date of Birth
              </Label>
              <Input 
                id="dateOfBirth" 
                type="date" 
                value={dateOfBirth} 
                onChange={(e) => setDateOfBirth(e.target.value)} 
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right">
                Gender
              </Label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value as 'MALE' | 'FEMALE' | 'OTHER')}
                className="col-span-3 p-2 border rounded-md"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
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

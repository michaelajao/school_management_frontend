import React from 'react';
import { Trash2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';


export const DeleteModal = ({title, deleteaction, onCancel } : {title: string, deleteaction: () => void, onCancel: () => void}) => {
    const handleDelete = () => {
        deleteaction();
        toast("User Data has been Deleted!")
    };
    const cancel = () => {
        onCancel();
        toast("Deletion Cancelled!")
    };	

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="flex items-center bg-red-600 justify-center text-white rounded-lg px-1 py-1 text-sm md:w-1/6 cursor-pointer">
                    <Trash2 className="mr-2 w-5" /> Delete User
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <div className="flex justify-center my-2">
                    <Trash2 className="w-10 h-10 text-red-600" />
                </div>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex justify-center">Are You Sure You Want to Delete This {title}?</AlertDialogTitle>
                    <AlertDialogDescription className="px-26 text-justify">
                        This action will permanently remove the user’s account and access to the portal.
                    </AlertDialogDescription>
                    <AlertDialogDescription className="text-[#008080]">
                        Note: All associated data, attendance, and activity logs will remain stored for record-keeping purposes.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex justify-center gap-4">
                    <AlertDialogCancel onClick={cancel} className="!bg-teal-700 text-white hover:text-white cursor-pointer">No Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}  className="bg-white text-[#EF1A36] border border-[#EF1A36] hover:bg-white cursor-pointer">
                        Yes, Delete User
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

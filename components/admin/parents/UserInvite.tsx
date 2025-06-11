"use client";

import { Parent } from "@/lib/utils";
import { CustomButton } from '@/components/shared/CustomButton.'

const noProfilePicture =
"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

interface UserInviteProps {
    parent: Parent;
    onClick: () => void;
  }


  export default function UserInvite({ parent, onClick }: UserInviteProps) {
    return(
        <div className="flex items-center justify-between w-full md:w-10/12">
            <div className="flex items-center gap-4">
                <img 
                    src={noProfilePicture}
                    alt={parent.name}
                    className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover"
                />
                <p className="text-sm font-semibold">{parent.name}</p>
            </div>
            <CustomButton
                variant="default"
                size="sm"
                className="md:py-6 text-xs font-medium"
                onClick={onClick}
            >
                Resend Invite
            </CustomButton>
        </div>
    )
}
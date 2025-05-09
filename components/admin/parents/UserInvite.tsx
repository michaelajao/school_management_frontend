"use client";

import { Parent } from "@/lib/utils";

const noProfilePicture =
"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

interface UserInviteProps {
    parent: Parent;
    onClick: () => void;
  }


  export default function UserInvite({ parent, onClick }: UserInviteProps) {
    return(
        <div className="flex justify-between w-full md:w-8/12">
            <div className="flex items-center gap-4">
                <img 
                    src={noProfilePicture}
                    alt={parent.name}
                    className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover"
                />
                <p className="text-sm font-semibold">{parent.name}</p>
            </div>
            <button 
                className="cursor-pointer bg-[#348081] text-white text-xs rounded-lg px-4 py-2"
                onClick={onClick}>
                Resend Invite
            </button>
        </div>
    )
}
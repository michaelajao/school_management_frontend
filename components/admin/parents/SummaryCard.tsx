
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

import { Card, CardHeader} from "@/components/ui/card"
import Image from "next/image"


type SummaryCardProps = {
  icon: string
  value: number
  label: string
  textColor: string
  bgColor: string
}


export function SummaryCard({
  icon,
  value,
  label,
  textColor,
  bgColor,
}: SummaryCardProps) {
  return (

    <Card className="w-full ">
      <CardHeader className="flex flex-row items-center gap-2">
        <div className="p-2 w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: bgColor }}>
          <Image src={icon} alt="icon" width={20} height={20} />

        </div>
        <div className="flex flex-col justify-left gap-[2px] ">
          <p
            className="w-[55px] h-[24px] text-[24px] font-[600] leading-[100%] flex items-center tracking-[0] font-[Gellix]"
            style={{ color: textColor }}
          >
            {value}
          </p>
          <p
            className="h-[14px] text-sm font-[500] tracking-[0] leading-[100%] mt-1 font-[Gellix] flex items-center"
            style={{ color: textColor }}
          >
            {label}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
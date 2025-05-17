import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

type SummaryCardProps = {
  icon: ReactNode;
  value: number | string;
  label: string;
  textColor: string;
  bgColor: string;
};

export function SummaryCard({
  icon,
  value,
  label,
  textColor,
  bgColor,
}: SummaryCardProps) {
  return (
    <Card className="w-full sm:w-1/2 lg:w-1/4 h-[110px] flex gap-[16px] bg-[#FEFEFE] shadow-none border-none rounded-[20px]">
      <CardContent className="flex items-center h-[55px] px-[15px] py-[27px] gap-[16px]">
        <div
          className="w-[55px] h-[55px] rounded-[27.5px] flex items-center justify-center gap-[10px]"
          style={{ backgroundColor: bgColor }}
        >
          {icon}
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
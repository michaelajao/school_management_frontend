import { Card, CardHeader} from "@/components/ui/card"
import Image from "next/image"


type SummaryCardProps = {
  icon: string
  value: number
  label: string
  textColor: string
  bgColor: string
}

export function SummaryCard({ icon, value, label, textColor, bgColor }: SummaryCardProps) {
  return (
    <Card className="w-full ">
      <CardHeader className="flex flex-row items-center gap-2">
        <div className="p-2 w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: bgColor }}>
          <Image src={icon} alt="icon" width={20} height={20} />
        </div>
        <div>
          <p className="text-xl font-semibold" style={{ color: textColor }}>
            {value}
          </p>
          <p className="text-sm" style={{ color: textColor }}>
            {label}
          </p>
        </div>
      </CardHeader>
    </Card>
  )
}

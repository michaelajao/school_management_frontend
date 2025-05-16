import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { ReactNode } from "react"

type SummaryCardProps = {
  icon: ReactNode
  value: number
  label: string
  textColor: string
  bgColor: string
}

export function SummaryCard({ icon, value, label, textColor, bgColor }: SummaryCardProps) {
  return (
    <Card className="w-full md:w-3/12">
      <CardHeader className="flex flex-row items-center gap-2">
        <div className="p-2 rounded-full" style={{ backgroundColor: bgColor }}>
          {icon}
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

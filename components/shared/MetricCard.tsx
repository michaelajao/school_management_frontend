import { Card } from '@/components/ui/card';

type IconType = React.FC<React.SVGProps<SVGSVGElement>> | string;
export type MetricCardProps = {
    icon: IconType;
    value: number;
    label: string;
    primaryColor: string;
    secondaryColor: string;
}

export function MetricCard({
    icon: Icon,
    value,
    label,
    primaryColor,
    secondaryColor
}: MetricCardProps) {
    /**         
        Types: 
          icon            (Type: SVG ICON TYPE)
          value           (Type: String)
          label           (Type: String)
          primaryColor    (Type: String; expects color formats, ex: hexcode, rgba etc)
          secondaryColor  (Type: String; expects color formats, ex: hexcode, rgba etc)

        icon:           The Lucid icon that the metric should show 
        value:          The total value/number that the total metric should show.
        label:          The label under the value;
        primaryColor:   The color of the text and icon
        secondaryColor: The background color of the icon   
    */
    return (
        <Card className="w-full md:w-3/12 min-w-0">
            <div className="flex flex-row items-center gap-4 p-4">
                <div
                    className="w-12 h-12 flex items-center justify-center rounded-full p-0"
                    style={{ backgroundColor: secondaryColor }}
                >
                    {typeof Icon === 'string' ? 
                    <img src={Icon} className="w-7 h-7" /> :
                    <Icon color={primaryColor} className="w-7 h-7" />
                     }
                </div>
                <div style={{ color: primaryColor }} className="min-w-0 flex-1">
                    <p className="font-bold text-lg sm:text-xl">{value}</p>
                    <p className="font-medium text-xs sm:text-sm text-gray-600 truncate">{label}</p>
                </div>
            </div>
        </Card>

    )
}
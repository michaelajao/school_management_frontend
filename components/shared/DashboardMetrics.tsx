
import { MetricCard } from '@/components/shared/MetricCard';
import { MetricCardProps } from '@/components/shared/MetricCard';

type DashboardMericsProp = {
  metrics: MetricCardProps[]
}


export function DashboardMetrics({metrics}: DashboardMericsProp) {
    /** 
     Just call DashboardMetrics with a list of all the data you want to represent in the dashboard

     const data = [
        {
            icon: dummyIcon,
            value: dummyValue,
            label: dummyLabel,
            primaryColor: dummyPColor,
            secondaryColor: dummySColor
        },
        {
            icon: dummyIcon2,
            value: dummyValue2,
            label: dummyLabel2,
            primaryColor: dummyPColor2,
            secondaryColor: dummySColor2
        },
        etc...
     ]

     Usage:
     <DashboardMetrics
        metrics={data}
     />
    */
  return(
    <div className='flex flex-col md:flex-row gap-4  '>
      {metrics.map((metric, idx) => (
        <MetricCard 
            key={idx}
            icon={metric.icon}
            value={metric.value}
            label={metric.label}
            primaryColor={metric.primaryColor}
            secondaryColor={metric.secondaryColor}
        />
      ))}
    </div>
  )
}

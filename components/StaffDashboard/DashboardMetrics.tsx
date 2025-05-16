"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, CreditCard } from "lucide-react";

type MetricCardProps = {
  title: string;
  value: string | number;
  // description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
};

const MetricCard = ({ title, value, icon }: MetricCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="w-8 h-8 p-1.5 rounded-full bg-muted flex items-center justify-center">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {/* {description && (
        <p className="text-xs text-muted-foreground">
          {description}
          {trend && (
            <span className={trend.isPositive ? "text-green-500" : "text-red-500"}>
              {trend.isPositive ? "↗" : "↘"} {Math.abs(trend.value)}%
            </span>
          )}
        </p>
      )} */}
    </CardContent>
  </Card>
);

export function DashboardMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Staff"
        value="78"
        // description="Active enrollments"
        icon={<Users className="w-5 h-5" />}
        trend={{ value: 4, isPositive: true }}
      />
      <MetricCard
        title="Total Teaching Staff"
        value="52"
        // description="Faculty & administration"
        icon={<Building2 className="w-5 h-5" />}
      />
      <MetricCard
        title="Total Non-Teaching Staff"
        value="26"
        // description="Current term"
        icon={<CreditCard className="w-5 h-5" />}
        trend={{ value: 12, isPositive: true }}
      />
    </div>
  );
} 
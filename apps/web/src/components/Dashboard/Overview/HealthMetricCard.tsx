import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ElementType } from "react";

interface HealthMetricCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  icon: ElementType;
  iconColor?: string;
  className?: string;
}

export function HealthMetricCard({
  title,
  value,
  trend,
  trendUp,
  icon: Icon,
  iconColor = "text-primary",
  className,
}: HealthMetricCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={cn("p-2 rounded-lg bg-muted/50", iconColor)}>
            <Icon className="size-6" />
          </div>
          {trend && (
            <div className={cn("flex items-center text-xs font-medium", trendUp ? "text-green-500" : "text-red-500")}>
              {trendUp ? "+" : ""}{trend}
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RecentActivityItemProps {
  activity: string;
  time: string;
  duration: string;
  calories: number;
}

export function RecentActivityItem({ activity, time, duration, calories }: RecentActivityItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors rounded-lg">
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10 bg-primary/10 text-primary">
          <AvatarFallback className="text-primary font-bold">
            {activity.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium text-foreground">{activity}</p>
          <p className="text-xs text-muted-foreground">{time}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold">{calories} kcal</p>
        <p className="text-xs text-muted-foreground">{duration}</p>
      </div>
    </div>
  );
}


import { Card, CardContent } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";

interface ActivitySummaryCardProps {
  totalCalories: number;
  totalDuration: number;
  totalSessions: number;
  weeklyData: { day: string; calories: number }[];
}

export function ActivitySummaryCard({
  totalCalories,
  totalDuration,
  totalSessions,
  weeklyData,
}: ActivitySummaryCardProps) {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-4 flex-1">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Activity (Weekly)</p>
              <h2 className="text-3xl font-bold tracking-tight">{totalCalories.toLocaleString()} kcal</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-green-500 font-medium">+4.5%</span>
                <span className="text-xs text-muted-foreground">from last week</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Sessions</p>
                <p className="text-lg font-semibold">{totalSessions}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Duration</p>
                <p className="text-lg font-semibold">{Math.round(totalDuration / 60)} min</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Avg Form</p>
                <p className="text-lg font-semibold text-green-500">92%</p>
              </div>
            </div>
          </div>

          <div className="flex-1 h-[160px] min-w-[200px]">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#888' }} 
                  dy={10}
                />
                <Bar 
                  dataKey="calories" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 4, 4]} 
                  barSize={12}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


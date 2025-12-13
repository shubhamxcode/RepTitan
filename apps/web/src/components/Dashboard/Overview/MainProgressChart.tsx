import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface MainProgressChartProps {
  data: { date: string; value: number; value2?: number }[];
}

export function MainProgressChart({ data }: MainProgressChartProps) {
  const [filter, setFilter] = useState("calories");

  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-xl font-bold">Progress Summary</CardTitle>
        <div className="flex items-center gap-2">
           <Button 
            variant={filter === "calories" ? "secondary" : "ghost"} 
            size="sm" 
            onClick={() => setFilter("calories")}
            className="rounded-full px-4 h-8 text-xs"
           >
             Calories
           </Button>
           <Button 
            variant={filter === "duration" ? "secondary" : "ghost"} 
            size="sm" 
            onClick={() => setFilter("duration")}
            className="rounded-full px-4 h-8 text-xs"
           >
             Duration
           </Button>
           <Button 
            variant={filter === "reps" ? "secondary" : "ghost"} 
            size="sm" 
            onClick={() => setFilter("reps")}
            className="rounded-full px-4 h-8 text-xs"
           >
             Reps
           </Button>
        </div>
      </CardHeader>
      <CardContent className="pl-0">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#888' }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#888' }}
                dx={-10}
              />
              <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.1} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
              <Area 
                type="monotone" 
                dataKey="value2" 
                stroke="hsl(var(--secondary))" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorValue2)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}


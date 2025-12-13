import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS, apiFetch } from "@/lib/api";
import { ActivitySummaryCard } from "@/components/Dashboard/Overview/ActivitySummaryCard";
import { HealthMetricCard } from "@/components/Dashboard/Overview/HealthMetricCard";
import { MainProgressChart } from "@/components/Dashboard/Overview/MainProgressChart";
import { RecentActivityItem } from "@/components/Dashboard/Overview/RecentActivityItem";
import { Activity, Droplets, Scale } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

interface ExerciseSession {
  id: number;
  exerciseType: string;
  duration: number;
  caloriesBurned: number;
  sessionDate: string;
}

function DashboardHome() {
  const { user } = useAuth();

  // Fetch Goals/Health Data
  const { data: goalData } = useQuery({
    queryKey: ["goals", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const res = await apiFetch(API_ENDPOINTS.GOALS.GET(user.id));
      if (!res.ok) throw new Error("Failed to fetch goals");
      return res.json();
    },
    enabled: !!user?.id,
  });

  // Fetch Exercise Stats
  const { data: exerciseStats } = useQuery({
    queryKey: ["exerciseStats", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const res = await apiFetch(API_ENDPOINTS.GOALS.EXERCISE.STATS(user.id, 30));
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
    enabled: !!user?.id,
  });

  // Fetch Recent Sessions
  const { data: recentSessions } = useQuery({
    queryKey: ["recentSessions", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const res = await apiFetch(API_ENDPOINTS.GOALS.EXERCISE.GET_SESSIONS(user.id, 5));
      if (!res.ok) throw new Error("Failed to fetch recent sessions");
      return res.json();
    },
    enabled: !!user?.id,
  });

  // Mock data for charts if API returns empty or simple data
  // Ideally this would be transformed from real data
  const weeklyData = [
    { day: "Mon", calories: 320 },
    { day: "Tue", calories: 450 },
    { day: "Wed", calories: 280 },
    { day: "Thu", calories: 500 },
    { day: "Fri", calories: 380 },
    { day: "Sat", calories: 600 },
    { day: "Sun", calories: 420 },
  ];

  const progressData = [
    { date: "Jan", value: 400, value2: 240 },
    { date: "Feb", value: 300, value2: 139 },
    { date: "Mar", value: 550, value2: 380 },
    { date: "Apr", value: 480, value2: 390 },
    { date: "May", value: 650, value2: 480 },
    { date: "Jun", value: 700, value2: 520 },
    { date: "Jul", value: 800, value2: 600 },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.name?.split(" ")[0] || "User"}!
        </h1>
        <p className="text-muted-foreground">
          Here is your daily activity summary and health overview.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Stats Card (Portfolio Value equivalent) */}
        <ActivitySummaryCard
          totalCalories={exerciseStats?.totalCalories || 0}
          totalDuration={exerciseStats?.totalDuration || 0}
          totalSessions={exerciseStats?.totalSessions || 0}
          weeklyData={weeklyData}
        />

        {/* Small Metric Cards (Crypto equivalent) */}
        <div className="space-y-6">
          <HealthMetricCard
            title="Current Weight"
            value={goalData?.currentWeight ? `${goalData.currentWeight} kg` : "N/A"}
            trend="1.2%"
            trendUp={false} // Weight down is usually good
            icon={Scale}
            iconColor="text-blue-500"
          />
          <HealthMetricCard
            title="BMI Score"
            value={goalData?.bmi ? goalData.bmi.toFixed(1) : "N/A"}
            trend="Healthy"
            trendUp={true}
            icon={Activity}
            iconColor="text-green-500"
          />
          <HealthMetricCard
            title="Water Intake"
            value={goalData?.waterIntake ? `${goalData.waterIntake} ml` : "2500 ml"}
            trend="Target"
            trendUp={true}
            icon={Droplets}
            iconColor="text-cyan-500"
          />
        </div>
      </div>

      {/* Main Chart Section */}
      <MainProgressChart data={progressData} />

      {/* Recent Activity Section (Timeline equivalent) */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Recent Sessions</h2>
        <div className="bg-card rounded-xl border border-border shadow-sm">
          {recentSessions && recentSessions.length > 0 ? (
            recentSessions.map((session: ExerciseSession) => (
              <RecentActivityItem
                key={session.id}
                activity={session.exerciseType}
                time={new Date(session.sessionDate).toLocaleDateString()}
                duration={`${Math.round(session.duration / 60)} min`}
                calories={session.caloriesBurned}
              />
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              No recent activity found. Start a workout!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

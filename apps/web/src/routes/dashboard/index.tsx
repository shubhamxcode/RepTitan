import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Heart, Target, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
	component: DashboardHome,
});

function DashboardHome() {
	const { user } = useAuth();

	const stats = [
		{
			title: "Posture Sessions",
			value: "12",
			change: "+3 this week",
			icon: Activity,
			color: "text-blue-600 dark:text-blue-400",
		},
		{
			title: "Health Score",
			value: "85%",
			change: "+5% from last week",
			icon: Heart,
			color: "text-red-600 dark:text-red-400",
		},
		{
			title: "Goals Completed",
			value: "7/10",
			change: "3 remaining",
			icon: Target,
			color: "text-green-600 dark:text-green-400",
		},
		{
			title: "Weekly Progress",
			value: "68%",
			change: "+12% improvement",
			icon: TrendingUp,
			color: "text-purple-600 dark:text-purple-400",
		},
	];

	return (
		<div className="space-y-8">
			{/* Welcome Section */}
			<div>
				<h1 className="text-3xl font-bold text-foreground">
					Welcome back, {user?.name?.split(" ")[0]}!
				</h1>
				<p className="text-muted-foreground mt-2">
					Here's your health and fitness overview
				</p>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{stats.map((stat) => {
					const Icon = stat.icon;
					return (
						<Card key={stat.title}>
							<CardContent className="pt-6">
								<div className="flex items-start justify-between">
									<div className="space-y-2">
										<p className="text-sm font-medium text-muted-foreground">
											{stat.title}
										</p>
										<p className="text-2xl font-bold text-foreground">{stat.value}</p>
										<p className="text-xs text-muted-foreground">{stat.change}</p>
									</div>
									<div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
										<Icon className="size-5" />
									</div>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{/* Recent Activity Section */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Recent Activity</CardTitle>
						<CardDescription>Your latest posture and health sessions</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{[
								{ activity: "Posture Training", time: "2 hours ago", duration: "15 min" },
								{ activity: "Health Check", time: "Yesterday", duration: "5 min" },
								{ activity: "Goal Review", time: "2 days ago", duration: "10 min" },
							].map((item, idx) => (
								<div
									key={idx}
									className="flex items-center justify-between py-3 border-b border-border last:border-0"
								>
									<div>
										<p className="text-sm font-medium text-foreground">
											{item.activity}
										</p>
										<p className="text-xs text-muted-foreground">{item.time}</p>
									</div>
									<span className="text-xs text-muted-foreground">
										{item.duration}
									</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Quick Actions</CardTitle>
						<CardDescription>Get started with your daily routine</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 gap-3">
							<button className="p-4 rounded-lg border border-border hover:bg-accent transition-colors text-left">
								<Activity className="size-5 mb-2 text-blue-600 dark:text-blue-400" />
								<p className="text-sm font-medium">Start Posture</p>
							</button>
							<button className="p-4 rounded-lg border border-border hover:bg-accent transition-colors text-left">
								<Heart className="size-5 mb-2 text-red-600 dark:text-red-400" />
								<p className="text-sm font-medium">Health Check</p>
							</button>
							<button className="p-4 rounded-lg border border-border hover:bg-accent transition-colors text-left">
								<Target className="size-5 mb-2 text-green-600 dark:text-green-400" />
								<p className="text-sm font-medium">Set Goal</p>
							</button>
							<button className="p-4 rounded-lg border border-border hover:bg-accent transition-colors text-left">
								<TrendingUp className="size-5 mb-2 text-purple-600 dark:text-purple-400" />
								<p className="text-sm font-medium">View Progress</p>
							</button>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Tips Section */}
			<Card>
				<CardHeader>
					<CardTitle>Daily Tip</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">
						Remember to take regular breaks every 30 minutes to maintain good posture
						and avoid strain. Stand up, stretch, and walk around for a few minutes.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}

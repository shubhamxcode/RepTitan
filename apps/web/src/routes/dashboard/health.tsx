import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Activity, Zap, Moon, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/dashboard/health")({
	component: Health,
});

function Health() {
	const healthMetrics = [
		{
			title: "Heart Rate",
			value: "72 bpm",
			status: "Normal",
			icon: Heart,
			color: "text-red-600 dark:text-red-400",
		},
		{
			title: "Activity Level",
			value: "6,847",
			status: "Steps today",
			icon: Activity,
			color: "text-blue-600 dark:text-blue-400",
		},
		{
			title: "Energy Level",
			value: "High",
			status: "Feeling great",
			icon: Zap,
			color: "text-yellow-600 dark:text-yellow-400",
		},
		{
			title: "Sleep Quality",
			value: "7.5h",
			status: "Last night",
			icon: Moon,
			color: "text-purple-600 dark:text-purple-400",
		},
	];

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-foreground">Health Dashboard</h1>
					<p className="text-muted-foreground mt-2">
						Track your health metrics and wellness
					</p>
				</div>
				<Button>
					<TrendingUp className="size-4 mr-2" />
					Add Metric
				</Button>
			</div>

			{/* Health Metrics Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{healthMetrics.map((metric) => {
					const Icon = metric.icon;
					return (
						<Card key={metric.title}>
							<CardContent className="pt-6">
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<span className="text-sm font-medium text-muted-foreground">
											{metric.title}
										</span>
										<div className={`p-2 rounded-lg bg-muted ${metric.color}`}>
											<Icon className="size-4" />
										</div>
									</div>
									<div>
										<p className="text-2xl font-bold text-foreground">
											{metric.value}
										</p>
										<p className="text-xs text-muted-foreground mt-1">
											{metric.status}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{/* Main Content Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Weekly Overview */}
				<Card>
					<CardHeader>
						<CardTitle>Weekly Overview</CardTitle>
						<CardDescription>Your health trends this week</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{[
								{ label: "Average Heart Rate", value: "70 bpm", change: "+2" },
								{ label: "Daily Steps", value: "7,234", change: "+324" },
								{ label: "Sleep Average", value: "7.2h", change: "+0.3h" },
								{ label: "Active Minutes", value: "156 min", change: "+12" },
							].map((item, idx) => (
								<div
									key={idx}
									className="flex items-center justify-between py-3 border-b border-border last:border-0"
								>
									<span className="text-sm text-muted-foreground">{item.label}</span>
									<div className="text-right">
										<p className="text-sm font-semibold text-foreground">
											{item.value}
										</p>
										<p className="text-xs text-green-600 dark:text-green-400">
											{item.change}
										</p>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Health Score */}
				<Card>
					<CardHeader>
						<CardTitle>Overall Health Score</CardTitle>
						<CardDescription>Based on your recent activity</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col items-center justify-center py-8 space-y-4">
							<div className="relative w-32 h-32">
								<svg className="w-full h-full transform -rotate-90">
									<circle
										cx="64"
										cy="64"
										r="56"
										stroke="currentColor"
										strokeWidth="8"
										fill="none"
										className="text-muted"
									/>
									<circle
										cx="64"
										cy="64"
										r="56"
										stroke="currentColor"
										strokeWidth="8"
										fill="none"
										strokeDasharray={`${85 * 3.51} ${100 * 3.51}`}
										className="text-green-600 dark:text-green-400"
									/>
								</svg>
								<div className="absolute inset-0 flex items-center justify-center">
									<span className="text-3xl font-bold text-foreground">85</span>
								</div>
							</div>
							<div className="text-center">
								<p className="text-sm font-medium text-foreground">Excellent</p>
								<p className="text-xs text-muted-foreground">
									Keep up the great work!
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Recent Logs */}
				<Card>
					<CardHeader>
						<CardTitle>Recent Health Logs</CardTitle>
						<CardDescription>Your latest health entries</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{[
								{ type: "Workout", time: "2 hours ago", detail: "30 min cardio" },
								{ type: "Meal Logged", time: "4 hours ago", detail: "Lunch - 650 cal" },
								{ type: "Water Intake", time: "5 hours ago", detail: "500ml" },
								{ type: "Sleep", time: "Yesterday", detail: "7.5 hours" },
							].map((log, idx) => (
								<div
									key={idx}
									className="flex items-start justify-between py-3 border-b border-border last:border-0"
								>
									<div>
										<p className="text-sm font-medium text-foreground">{log.type}</p>
										<p className="text-xs text-muted-foreground">{log.time}</p>
									</div>
									<span className="text-xs text-muted-foreground">{log.detail}</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Health Tips */}
				<Card>
					<CardHeader>
						<CardTitle>Health Recommendations</CardTitle>
						<CardDescription>Personalized tips for you</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{[
								"Increase your daily water intake to 2-3 liters",
								"Try to maintain consistent sleep schedule",
								"Add 15 minutes of stretching to your routine",
								"Consider a 5-minute meditation before bed",
							].map((tip, idx) => (
								<div key={idx} className="flex items-start gap-3">
									<div className="mt-1 p-1 rounded-full bg-green-100 dark:bg-green-900">
										<div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400" />
									</div>
									<p className="text-sm text-muted-foreground">{tip}</p>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

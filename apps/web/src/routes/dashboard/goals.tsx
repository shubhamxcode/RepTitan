import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Plus, CheckCircle2, Circle, Clock } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/goals")({
	component: Goals,
});

function Goals() {
	const [goals] = useState([
		{
			id: 1,
			title: "Improve Posture",
			description: "Maintain good posture for 4 hours daily",
			progress: 75,
			status: "in_progress",
			dueDate: "Dec 31, 2024",
		},
		{
			id: 2,
			title: "Daily Exercise",
			description: "Complete 30 minutes of exercise every day",
			progress: 60,
			status: "in_progress",
			dueDate: "Dec 31, 2024",
		},
		{
			id: 3,
			title: "Sleep Schedule",
			description: "Get 7-8 hours of sleep consistently",
			progress: 100,
			status: "completed",
			dueDate: "Dec 15, 2024",
		},
		{
			id: 4,
			title: "Healthy Eating",
			description: "Follow balanced diet plan for 30 days",
			progress: 40,
			status: "in_progress",
			dueDate: "Jan 15, 2025",
		},
		{
			id: 5,
			title: "Stress Management",
			description: "Practice meditation 5 times a week",
			progress: 0,
			status: "pending",
			dueDate: "Jan 31, 2025",
		},
	]);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "completed":
				return "text-green-600 dark:text-green-400";
			case "in_progress":
				return "text-blue-600 dark:text-blue-400";
			case "pending":
				return "text-gray-600 dark:text-gray-400";
			default:
				return "text-gray-600 dark:text-gray-400";
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "completed":
				return CheckCircle2;
			case "in_progress":
				return Clock;
			case "pending":
				return Circle;
			default:
				return Circle;
		}
	};

	const completedGoals = goals.filter((g) => g.status === "completed").length;
	const totalGoals = goals.length;

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-foreground">Your Goals</h1>
					<p className="text-muted-foreground mt-2">
						Track and manage your fitness and wellness goals
					</p>
				</div>
				<Button>
					<Plus className="size-4 mr-2" />
					Add Goal
				</Button>
			</div>

			{/* Progress Overview */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card>
					<CardContent className="pt-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">Total Goals</p>
								<p className="text-3xl font-bold text-foreground mt-2">{totalGoals}</p>
							</div>
							<div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20">
								<Target className="size-6 text-blue-600 dark:text-blue-400" />
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="pt-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">Completed</p>
								<p className="text-3xl font-bold text-foreground mt-2">
									{completedGoals}
								</p>
							</div>
							<div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20">
								<CheckCircle2 className="size-6 text-green-600 dark:text-green-400" />
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="pt-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">
									Success Rate
								</p>
								<p className="text-3xl font-bold text-foreground mt-2">
									{Math.round((completedGoals / totalGoals) * 100)}%
								</p>
							</div>
							<div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/20">
								<CheckCircle2 className="size-6 text-purple-600 dark:text-purple-400" />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Goals List */}
			<div className="space-y-4">
				{goals.map((goal) => {
					const StatusIcon = getStatusIcon(goal.status);
					return (
						<Card key={goal.id}>
							<CardContent className="pt-6">
								<div className="space-y-4">
									{/* Header */}
									<div className="flex items-start justify-between">
										<div className="flex items-start gap-3 flex-1">
											<StatusIcon
												className={`size-5 mt-0.5 ${getStatusColor(goal.status)}`}
											/>
											<div className="flex-1 min-w-0">
												<h3 className="text-lg font-semibold text-foreground">
													{goal.title}
												</h3>
												<p className="text-sm text-muted-foreground mt-1">
													{goal.description}
												</p>
											</div>
										</div>
										<span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full whitespace-nowrap ml-4">
											{goal.dueDate}
										</span>
									</div>

									{/* Progress Bar */}
									<div className="space-y-2">
										<div className="flex items-center justify-between text-sm">
											<span className="text-muted-foreground">Progress</span>
											<span className="font-semibold text-foreground">
												{goal.progress}%
											</span>
										</div>
										<div className="w-full h-2 bg-muted rounded-full overflow-hidden">
											<div
												className={`h-full transition-all duration-300 ${
													goal.status === "completed"
														? "bg-green-600 dark:bg-green-400"
														: goal.status === "in_progress"
															? "bg-blue-600 dark:bg-blue-400"
															: "bg-gray-600 dark:bg-gray-400"
												}`}
												style={{ width: `${goal.progress}%` }}
											/>
										</div>
									</div>

									{/* Actions */}
									<div className="flex items-center gap-2 pt-2">
										<Button variant="outline" size="sm">
											Update
										</Button>
										{goal.status !== "completed" && (
											<Button variant="ghost" size="sm">
												Mark Complete
											</Button>
										)}
									</div>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{/* Motivational Card */}
			<Card className="border-blue-200 dark:border-blue-900 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
				<CardContent className="pt-6">
					<div className="flex items-center gap-4">
						<div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
							<Target className="size-8 text-blue-600 dark:text-blue-400" />
						</div>
						<div>
							<h3 className="text-lg font-semibold text-foreground">
								Keep Up The Momentum!
							</h3>
							<p className="text-sm text-muted-foreground mt-1">
								You've completed {completedGoals} out of {totalGoals} goals. Stay
								consistent and you'll achieve great results!
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

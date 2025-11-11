import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dumbbell } from "lucide-react";
import { useState } from "react";
import { ExerciseTracker } from "@/components/ExerciseTracker";
import type { ExerciseType } from "@/lib/exerciseDetection";

export const Route = createFileRoute("/dashboard/posture")({
	component: WorkoutTracker,
});

const EXERCISES: { type: ExerciseType; name: string; icon: string; description: string }[] = [
	{
		type: "pushup",
		name: "Push-ups",
		icon: "💪",
		description: "Upper body strength and core stability",
	},
	{
		type: "squat",
		name: "Squats",
		icon: "🦵",
		description: "Lower body strength and mobility",
	},
	{
		type: "plank",
		name: "Plank",
		icon: "🏋️",
		description: "Core strength and stability",
	},
];

function WorkoutTracker() {
	const [selectedExercise, setSelectedExercise] = useState<ExerciseType | null>(null);

	if (selectedExercise) {
		return (
			<div className="space-y-6">
				<Button
					onClick={() => setSelectedExercise(null)}
					variant="outline"
					className="gap-2"
				>
					← Back to Exercises
				</Button>
				<ExerciseTracker exerciseType={selectedExercise} />
			</div>
		);
	}

	return (
		<div className="space-y-8">
			{/* Header */}
			<div>
				<h1 className="text-3xl font-bold text-foreground">AI Workout Tracker</h1>
				<p className="text-muted-foreground mt-2">
					Select an exercise to start tracking with real-time AI form correction
				</p>
			</div>

			{/* Exercise Selection Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{EXERCISES.map((exercise) => (
					<Card
						key={exercise.type}
						className="group cursor-pointer hover:shadow-lg hover:border-primary transition-all duration-200"
						onClick={() => setSelectedExercise(exercise.type)}
					>
						<CardContent className="pt-6">
							<div className="flex flex-col items-center text-center space-y-4">
								<div className="text-6xl">{exercise.icon}</div>
								<div className="space-y-2">
									<h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
										{exercise.name}
									</h3>
									<p className="text-sm text-muted-foreground">
										{exercise.description}
									</p>
								</div>
								<Button className="w-full gap-2 group-hover:scale-105 transition-transform">
									<Dumbbell className="size-4" />
									Start Tracking
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Info Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card>
					<CardContent className="pt-6">
						<div className="text-center space-y-2">
							<div className="text-4xl mb-2">🎥</div>
							<h3 className="font-semibold text-foreground">Real-time Tracking</h3>
							<p className="text-sm text-muted-foreground">
								Uses your webcam to track body movements in real-time
							</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="pt-6">
						<div className="text-center space-y-2">
							<div className="text-4xl mb-2">✅</div>
							<h3 className="font-semibold text-foreground">Form Correction</h3>
							<p className="text-sm text-muted-foreground">
								Get instant feedback on your exercise form and posture
							</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="pt-6">
						<div className="text-center space-y-2">
							<div className="text-4xl mb-2">📊</div>
							<h3 className="font-semibold text-foreground">Track Progress</h3>
							<p className="text-sm text-muted-foreground">
								Automatic rep counting and session statistics
							</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Tips */}
			<Card>
				<CardContent className="pt-6">
					<h3 className="font-semibold text-foreground mb-4">Tips for Best Results</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="flex items-start gap-3">
							<div className="mt-0.5 p-1 rounded-full bg-primary/10">
								<div className="w-2 h-2 rounded-full bg-primary" />
							</div>
							<div>
								<p className="text-sm font-medium text-foreground">Good Lighting</p>
								<p className="text-xs text-muted-foreground">
									Ensure you have adequate lighting for better tracking
								</p>
							</div>
						</div>
						<div className="flex items-start gap-3">
							<div className="mt-0.5 p-1 rounded-full bg-primary/10">
								<div className="w-2 h-2 rounded-full bg-primary" />
							</div>
							<div>
								<p className="text-sm font-medium text-foreground">Full Body Visible</p>
								<p className="text-xs text-muted-foreground">
									Position yourself so your entire body is in frame
								</p>
							</div>
						</div>
						<div className="flex items-start gap-3">
							<div className="mt-0.5 p-1 rounded-full bg-primary/10">
								<div className="w-2 h-2 rounded-full bg-primary" />
							</div>
							<div>
								<p className="text-sm font-medium text-foreground">Side View</p>
								<p className="text-xs text-muted-foreground">
									Position camera to the side for best angle detection
								</p>
							</div>
						</div>
						<div className="flex items-start gap-3">
							<div className="mt-0.5 p-1 rounded-full bg-primary/10">
								<div className="w-2 h-2 rounded-full bg-primary" />
							</div>
							<div>
								<p className="text-sm font-medium text-foreground">Clear Background</p>
								<p className="text-xs text-muted-foreground">
									Use a plain background for accurate pose detection
								</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

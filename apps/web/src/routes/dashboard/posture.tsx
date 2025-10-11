import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, AlertCircle, Camera, Play, Pause } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/posture")({
	component: PostureCorrector,
});

function PostureCorrector() {
	const [isTracking, setIsTracking] = useState(false);

	return (
		<div className="space-y-8">
			{/* Header */}
			<div>
				<h1 className="text-3xl font-bold text-foreground">Posture Corrector</h1>
				<p className="text-muted-foreground mt-2">
					Monitor and improve your posture in real-time
				</p>
			</div>

			{/* Main Tracking Card */}
			<Card>
				<CardContent className="pt-6">
					<div className="flex flex-col items-center justify-center py-12 space-y-6">
						<div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center">
							<Camera className="size-16 text-muted-foreground" />
						</div>
						<div className="text-center space-y-2">
							<h3 className="text-xl font-semibold text-foreground">
								{isTracking ? "Tracking Your Posture" : "Ready to Start"}
							</h3>
							<p className="text-sm text-muted-foreground max-w-md">
								{isTracking
									? "Keep your back straight and shoulders relaxed. We're monitoring your posture."
									: "Click the button below to start monitoring your posture using your webcam."}
							</p>
						</div>
						<Button
							size="lg"
							onClick={() => setIsTracking(!isTracking)}
							className="gap-2"
						>
							{isTracking ? (
								<>
									<Pause className="size-5" />
									Stop Tracking
								</>
							) : (
								<>
									<Play className="size-5" />
									Start Tracking
								</>
							)}
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Today's Session</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<p className="text-3xl font-bold text-foreground">45 min</p>
							<p className="text-sm text-muted-foreground">Active tracking time</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Posture Score</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<p className="text-3xl font-bold text-foreground">78%</p>
							<p className="text-sm text-muted-foreground">Good posture maintained</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Alerts</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<p className="text-3xl font-bold text-foreground">8</p>
							<p className="text-sm text-muted-foreground">Posture corrections today</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Tips and Guidelines */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Posture Tips</CardTitle>
						<CardDescription>Follow these guidelines for better posture</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{[
								"Keep your back straight and shoulders back",
								"Your feet should be flat on the floor",
								"Monitor should be at eye level",
								"Take breaks every 30 minutes",
								"Avoid slouching or leaning forward",
							].map((tip, idx) => (
								<div key={idx} className="flex items-start gap-3">
									<div className="mt-0.5 p-1 rounded-full bg-primary/10">
										<div className="w-2 h-2 rounded-full bg-primary" />
									</div>
									<p className="text-sm text-muted-foreground">{tip}</p>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Recent Sessions</CardTitle>
						<CardDescription>Your posture tracking history</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{[
								{ date: "Today", score: 78, duration: "45 min" },
								{ date: "Yesterday", score: 82, duration: "1h 20 min" },
								{ date: "2 days ago", score: 75, duration: "50 min" },
								{ date: "3 days ago", score: 88, duration: "1h 15 min" },
							].map((session, idx) => (
								<div
									key={idx}
									className="flex items-center justify-between py-3 border-b border-border last:border-0"
								>
									<div>
										<p className="text-sm font-medium text-foreground">
											{session.date}
										</p>
										<p className="text-xs text-muted-foreground">
											{session.duration}
										</p>
									</div>
									<div className="text-right">
										<p className="text-sm font-semibold text-foreground">
											{session.score}%
										</p>
										<p className="text-xs text-muted-foreground">Score</p>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Alert Banner */}
			<Card className="border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20">
				<CardContent className="pt-6">
					<div className="flex items-start gap-3">
						<AlertCircle className="size-5 text-blue-600 dark:text-blue-400 mt-0.5" />
						<div>
							<p className="text-sm font-medium text-blue-900 dark:text-blue-100">
								Camera Permission Required
							</p>
							<p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
								To use the posture corrector, please allow access to your webcam in your
								browser settings.
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

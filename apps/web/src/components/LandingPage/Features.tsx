import { HeroParallax } from "@/components/ui/hero-parallax";

// Images showing MediaPipe pose detection with skeleton overlays and form correction
// These images demonstrate MediaPipe detecting posture and correcting form in real-time
// You can replace these with your own screenshots from ExerciseTracker component

const featureProducts = [
	{
		title: "AI-Powered Rep Counting",
		link: "#",
		thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQDyO2Q0ymLsvNKcUQkFPavehwpUwXFO7lAQ&s", // MediaPipe pose detection - rep counting
	},
	{
		title: "Real-Time Form Correction",
		link: "#",
		thumbnail: "https://www.researchgate.net/publication/367169569/figure/fig3/AS:11431281113339908@1673877598367/Key-point-detection-by-Mediapipe-for-the-postures-mentioned-from-a-e.ppm", // MediaPipe key point detection - form correction
	},
	{
		title: "Personalized Workout Insights",
		link: "#",
		thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQDyO2Q0ymLsvNKcUQkFPavehwpUwXFO7lAQ&s", // MediaPipe pose detection - workout insights
	},
	{
		title: "Progress Tracking & Analytics",
		link: "#",
		thumbnail: "https://www.researchgate.net/publication/367169569/figure/fig3/AS:11431281113339908@1673877598367/Key-point-detection-by-Mediapipe-for-the-postures-mentioned-from-a-e.ppm", // MediaPipe pose tracking - progress analytics
	},
	{
		title: "Video Analysis",
		link: "#",
		thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQDyO2Q0ymLsvNKcUQkFPavehwpUwXFO7lAQ&s", // MediaPipe video analysis with pose detection
	},
	{
		title: "Smart Workout Plans",
		link: "#",
		thumbnail: "https://www.researchgate.net/publication/367169569/figure/fig3/AS:11431281113339908@1673877598367/Key-point-detection-by-Mediapipe-for-the-postures-mentioned-from-a-e.ppm", // MediaPipe pose detection - workout plans
	},
	{
		title: "Performance Metrics",
		link: "#",
		thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQDyO2Q0ymLsvNKcUQkFPavehwpUwXFO7lAQ&s", // MediaPipe pose detection - performance metrics
	},
	{
		title: "Form Feedback",
		link: "#",
		thumbnail: "https://www.researchgate.net/publication/367169569/figure/fig3/AS:11431281113339908@1673877598367/Key-point-detection-by-Mediapipe-for-the-postures-mentioned-from-a-e.ppm", // MediaPipe form feedback with skeleton overlay
	},
	{
		title: "Strength Tracking",
		link: "#",
		thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQDyO2Q0ymLsvNKcUQkFPavehwpUwXFO7lAQ&s", // MediaPipe pose detection - strength tracking
	},
	{
		title: "Goal Setting",
		link: "#",
		thumbnail: "https://www.researchgate.net/publication/367169569/figure/fig3/AS:11431281113339908@1673877598367/Key-point-detection-by-Mediapipe-for-the-postures-mentioned-from-a-e.ppm", // MediaPipe pose detection - goal tracking
	},
	{
		title: "Workout History",
		link: "#",
		thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQDyO2Q0ymLsvNKcUQkFPavehwpUwXFO7lAQ&s", // MediaPipe pose detection - workout history
	},
	{
		title: "Exercise Library",
		link: "#",
		thumbnail: "https://www.researchgate.net/publication/367169569/figure/fig3/AS:11431281113339908@1673877598367/Key-point-detection-by-Mediapipe-for-the-postures-mentioned-from-a-e.ppm", // MediaPipe pose detection - exercise library
	},
	{
		title: "AI Coach",
		link: "#",
		thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQDyO2Q0ymLsvNKcUQkFPavehwpUwXFO7lAQ&s", // MediaPipe AI coach with pose overlay
	},
	{
		title: "Rest Timer",
		link: "#",
		thumbnail: "https://www.researchgate.net/publication/367169569/figure/fig3/AS:11431281113339908@1673877598367/Key-point-detection-by-Mediapipe-for-the-postures-mentioned-from-a-e.ppm", // MediaPipe pose detection - rest monitoring
	},
	{
		title: "Achievement Badges",
		link: "#",
		thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQDyO2Q0ymLsvNKcUQkFPavehwpUwXFO7lAQ&s", // MediaPipe pose detection - achievements
	},
];

export default function Features() {
	return <HeroParallax products={featureProducts} />;
} 
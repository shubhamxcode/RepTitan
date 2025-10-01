import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/LandingPage/hero";
import VideoSection from "@/components/LandingPage/VideoSection";
import Features from "@/components/LandingPage/Features";
import Pricing from "@/components/LandingPage/Pricing";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent() {
	return (
		<>
			<Hero />
			<Features />
			<VideoSection />
			<Pricing />
		</>
	);
}

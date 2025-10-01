import { createFileRoute } from "@tanstack/react-router";
import Footer from "@/components/LandingPage/Footer";

export const Route = createFileRoute("/docs")({
	component: DocsComponent,
});

function DocsComponent() {
	return (
		<>
			<div className="min-h-screen bg-white dark:bg-black pt-24 px-8 md:px-16">
				<div className="max-w-4xl mx-auto">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Documentation</h1>
					<p className="text-xl text-gray-600 dark:text-gray-400">
						Documentation page - Coming soon!
					</p>
				</div>
			</div>
			<Footer />
		</>
	);
} 
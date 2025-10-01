import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: AboutComponent,
});

function AboutComponent() {
	return (
		<div className="min-h-screen bg-white dark:bg-black pt-24 px-8 md:px-16">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">About RepTitan</h1>
				<p className="text-xl text-gray-600 dark:text-gray-400">
					About page - Coming soon!
				</p>
			</div>
		</div>
	);
} 
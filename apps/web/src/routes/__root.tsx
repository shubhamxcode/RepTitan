import Header from "@/components/LandingPage/header";
import Footer from "@/components/LandingPage/Footer";
import Loader from "@/components/loader";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import {
	HeadContent,
	Outlet,
	createRootRouteWithContext,
	useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../index.css";

export interface RouterAppContext {}

export const Route = createRootRouteWithContext<RouterAppContext>()({
	component: RootComponent,
	head: () => ({
		meta: [
			{
				title: "RepTitan",
			},
			{
				name: "description",
				content: "RepTitan is a web application",
			},
		],
		links: [
			{
				rel: "icon",
				href: "/favicon.ico",
			},
		],
	}),
});

function RootComponent() {
	const isFetching = useRouterState({
		select: (s) => s.isLoading,
	});

	const location = useRouterState({
		select: (s) => s.location.pathname,
	});

	// Hide header/footer on dashboard pages
	const isDashboard = location.startsWith("/dashboard");

	return (
		<>
			<HeadContent />
			<ThemeProvider
				attribute="class"
				defaultTheme="light"
				disableTransitionOnChange
				storageKey="vite-ui-theme"
			>
				{!isDashboard && <Header />}
				<main>
					{isFetching ? <Loader /> : <Outlet />}
				</main>
				{!isDashboard && <Footer />}
				<Toaster richColors />
			</ThemeProvider>
			<TanStackRouterDevtools position="bottom-left" />
		</>
	);
}

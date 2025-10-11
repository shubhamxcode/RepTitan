import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
	Home,
	Settings,
	Activity,
	Heart,
	Target,
	LogOut,
	Menu,
	X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
	{ to: "/dashboard", label: "Home", icon: Home },
	{ to: "/dashboard/posture", label: "Posture Corrector", icon: Activity },
	{ to: "/dashboard/health", label: "Health", icon: Heart },
	{ to: "/dashboard/goals", label: "Your Goals", icon: Target },
	{ to: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout() {
	const { user, logout } = useAuth();
	const location = useLocation();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const handleLogout = async () => {
		await logout();
		window.location.href = "/";
	};

	return (
		<div className="min-h-screen bg-background">
			{/* Mobile Menu Button */}
			<button
				onClick={() => setSidebarOpen(!sidebarOpen)}
				className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-card border border-border shadow-sm"
			>
				{sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
			</button>

			{/* Sidebar */}
			<aside
				className={`fixed top-0 left-0 z-40 h-screen w-64 bg-card border-r border-border transition-transform ${
					sidebarOpen ? "translate-x-0" : "-translate-x-full"
				} md:translate-x-0`}
			>
				<div className="flex flex-col h-full">
					{/* Logo/Brand */}
					<div className="flex items-center gap-2 p-6 border-b border-border">
						<div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
							<span className="text-primary-foreground font-black text-lg">R</span>
						</div>
						<span className="text-xl font-bold text-foreground">RepTitan</span>
					</div>

					{/* User Info */}
					<div className="p-4 border-b border-border">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
								<span className="text-lg font-semibold text-muted-foreground">
									{user?.name?.charAt(0).toUpperCase()}
								</span>
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium text-foreground truncate">
									{user?.name}
								</p>
								<p className="text-xs text-muted-foreground truncate">
									{user?.email}
								</p>
							</div>
						</div>
					</div>

					{/* Navigation */}
					<nav className="flex-1 p-4 space-y-1">
						{navItems.map((item) => {
							const Icon = item.icon;
							const isActive = location.pathname === item.to;
							return (
								<Link
									key={item.to}
									to={item.to}
									onClick={() => setSidebarOpen(false)}
									className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
										isActive
											? "bg-primary text-primary-foreground"
											: "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
									}`}
								>
									<Icon className="size-5 shrink-0" />
									<span className="text-sm font-medium">{item.label}</span>
								</Link>
							);
						})}
					</nav>

					{/* Bottom Actions */}
					<div className="p-4 border-t border-border space-y-2">
						<div className="flex items-center justify-between px-4 py-2">
							<span className="text-sm text-muted-foreground">Theme</span>
							<ModeToggle />
						</div>
						<Button
							variant="ghost"
							className="w-full justify-start gap-3"
							onClick={handleLogout}
						>
							<LogOut className="size-5" />
							<span>Logout</span>
						</Button>
					</div>
				</div>
			</aside>

			{/* Overlay for mobile */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 z-30 bg-black/50 md:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Main Content */}
			<main className="md:ml-64 min-h-screen">
				<div className="p-4 md:p-8">
					<Outlet />
				</div>
			</main>
		</div>
	);
}


import { createFileRoute, Navigate } from "@tanstack/react-router";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/dashboard")({
	component: DashboardWrapper,
});

function DashboardWrapper() {
	const { isAuthenticated, loading } = useAuth();

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/auth/Login" />;
	}

	return <DashboardLayout />;
}

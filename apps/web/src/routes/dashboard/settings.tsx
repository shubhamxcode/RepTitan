import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { User, Mail, Bell, Shield, Palette, Globe } from "lucide-react";

export const Route = createFileRoute("/dashboard/settings")({
	component: Settings,
});

function Settings() {
	const { user } = useAuth();

	return (
		<div className="space-y-8">
			{/* Header */}
			<div>
				<h1 className="text-3xl font-bold text-foreground">Settings</h1>
				<p className="text-muted-foreground mt-2">
					Manage your account settings and preferences
				</p>
			</div>

			{/* Settings Sections */}
			<div className="space-y-6">
				{/* Profile Settings */}
				<Card>
					<CardHeader>
						<div className="flex items-center gap-2">
							<User className="size-5 text-muted-foreground" />
							<CardTitle>Profile Information</CardTitle>
						</div>
						<CardDescription>Update your personal information</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="name">Full Name</Label>
								<Input id="name" defaultValue={user?.name} />
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input id="email" type="email" defaultValue={user?.email} disabled />
							</div>
						</div>
						<Button>Save Changes</Button>
					</CardContent>
				</Card>

				{/* Account Settings */}
				<Card>
					<CardHeader>
						<div className="flex items-center gap-2">
							<Shield className="size-5 text-muted-foreground" />
							<CardTitle>Account Security</CardTitle>
						</div>
						<CardDescription>Manage your account security settings</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between py-3 border-b border-border">
							<div>
								<p className="text-sm font-medium text-foreground">
									Connected Account
								</p>
								<p className="text-xs text-muted-foreground">
									{user?.provider === "google" ? "Google" : "Email"}
								</p>
							</div>
							<Button variant="outline" size="sm" disabled>
								Connected
							</Button>
						</div>
						<div className="flex items-center justify-between py-3 border-b border-border">
							<div>
								<p className="text-sm font-medium text-foreground">Password</p>
								<p className="text-xs text-muted-foreground">
									Last updated 3 months ago
								</p>
							</div>
							<Button variant="outline" size="sm">
								Change Password
							</Button>
						</div>
						<div className="flex items-center justify-between py-3">
							<div>
								<p className="text-sm font-medium text-foreground">
									Two-Factor Authentication
								</p>
								<p className="text-xs text-muted-foreground">
									Add an extra layer of security
								</p>
							</div>
							<Button variant="outline" size="sm">
								Enable
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Notification Settings */}
				<Card>
					<CardHeader>
						<div className="flex items-center gap-2">
							<Bell className="size-5 text-muted-foreground" />
							<CardTitle>Notifications</CardTitle>
						</div>
						<CardDescription>
							Configure how you receive notifications
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{[
							{
								title: "Email Notifications",
								description: "Receive updates via email",
								enabled: true,
							},
							{
								title: "Push Notifications",
								description: "Receive browser push notifications",
								enabled: false,
							},
							{
								title: "Posture Alerts",
								description: "Get notified about posture corrections",
								enabled: true,
							},
							{
								title: "Goal Reminders",
								description: "Reminders for your daily goals",
								enabled: true,
							},
						].map((setting, idx) => (
							<div
								key={idx}
								className="flex items-center justify-between py-3 border-b border-border last:border-0"
							>
								<div>
									<p className="text-sm font-medium text-foreground">
										{setting.title}
									</p>
									<p className="text-xs text-muted-foreground">
										{setting.description}
									</p>
								</div>
								<button
									className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
										setting.enabled ? "bg-primary" : "bg-muted"
									}`}
								>
									<span
										className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
											setting.enabled ? "translate-x-6" : "translate-x-1"
										}`}
									/>
								</button>
							</div>
						))}
					</CardContent>
				</Card>

				{/* Appearance Settings */}
				<Card>
					<CardHeader>
						<div className="flex items-center gap-2">
							<Palette className="size-5 text-muted-foreground" />
							<CardTitle>Appearance</CardTitle>
						</div>
						<CardDescription>Customize how RepTitan looks</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<Label className="text-sm font-medium text-foreground mb-3 block">
								Theme
							</Label>
							<div className="grid grid-cols-3 gap-3">
								{["Light", "Dark", "System"].map((theme) => (
									<button
										key={theme}
										className="p-4 rounded-lg border border-border hover:bg-accent transition-colors text-left"
									>
										<p className="text-sm font-medium text-foreground">{theme}</p>
									</button>
								))}
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Preferences */}
				<Card>
					<CardHeader>
						<div className="flex items-center gap-2">
							<Globe className="size-5 text-muted-foreground" />
							<CardTitle>Preferences</CardTitle>
						</div>
						<CardDescription>Set your personal preferences</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="language">Language</Label>
							<select
								id="language"
								className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground"
							>
								<option>English</option>
								<option>Spanish</option>
								<option>French</option>
								<option>German</option>
							</select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="timezone">Timezone</Label>
							<select
								id="timezone"
								className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground"
							>
								<option>UTC (GMT+0)</option>
								<option>EST (GMT-5)</option>
								<option>PST (GMT-8)</option>
								<option>IST (GMT+5:30)</option>
							</select>
						</div>
						<Button>Save Preferences</Button>
					</CardContent>
				</Card>

				{/* Danger Zone */}
				<Card className="border-red-200 dark:border-red-900">
					<CardHeader>
						<CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
						<CardDescription>Irreversible account actions</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between py-3">
							<div>
								<p className="text-sm font-medium text-foreground">Delete Account</p>
								<p className="text-xs text-muted-foreground">
									Permanently delete your account and all data
								</p>
							</div>
							<Button variant="destructive" size="sm">
								Delete Account
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

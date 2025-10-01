import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";

export default function Header() {
	const navLinks = [
		{ to: "/", label: "Home" },
		{ to: "/about", label: "About" },
		{ to: "/docs", label: "Docs" },
	] as const;

	return (
		<header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 ">
			<div className="max-w-6xl mx-auto bg-white/40 backdrop-blur-xl border border-gray-200/30 dark:bg-black/40 dark:border-white/10 rounded-4xl shadow-lg">
				<div className="flex items-center justify-between h-16 px-6 md:px-8">
					{/* Left - Logo/Brand */}
					<Link to="/" className="flex items-center gap-2 group">
						<div className="w-8 h-8 bg-cyan-600 dark:bg-gradient-to-br dark:from-cyan-500 dark:to-purple-600 rounded-4xl flex items-center justify-center">
							<span className="text-white font-black text-lg">R</span>
						</div>
						<span className="text-xl font-bold text-gray-900 dark:bg-gradient-to-r dark:from-cyan-400 dark:to-purple-400 dark:bg-clip-text dark:text-transparent group-hover:text-cyan-600 dark:group-hover:from-cyan-300 dark:group-hover:to-purple-300 transition-all">
							RepTitan
						</span>
					</Link>

					{/* Middle - Navigation Links */}
					<nav className="hidden md:flex items-center gap-8">
						{navLinks.map(({ to, label }) => (
							<Link
								key={to}
								to={to}
								className="text-gray-700 hover:text-cyan-600 dark:text-gray-300 dark:hover:text-white transition-colors duration-200 relative group"
							>
								{label}
								<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 dark:bg-gradient-to-r dark:from-cyan-400 dark:to-purple-400 group-hover:w-full transition-all duration-300"></span>
							</Link>
						))}
					</nav>

					{/* Right - Login Button & Theme Toggle */}
					<div className="flex items-center gap-4">
						<ModeToggle />
						<Link to="/auth/Login"
							className="bg-cyan-600 hover:bg-cyan-700 dark:bg-gradient-to-r dark:from-cyan-500 dark:to-purple-600 dark:hover:from-cyan-600 dark:hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
						>
							Login
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
}

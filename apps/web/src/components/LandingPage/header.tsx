import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";

export default function Header() {
	const navLinks = [
		{ to: "/", label: "Home" },
		{ to: "/about", label: "About" },
		{ to: "/contact", label: "Contact" },
	] as const;

	return (
		<header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
			{/* Hacker-style top border line */}
			<div className="h-0.5 w-full bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-80 shadow-[0_0_10px_rgba(220,38,38,0.8)]" />

			<div className="bg-black/80 backdrop-blur-md border-b border-white/5 shadow-2xl">
				<div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
					{/* Left - Brand */}
					<Link to="/" className="group flex items-center gap-3 relative">
						<div className="absolute -inset-2 bg-red-600/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
						<div className="relative w-10 h-10 bg-red-700 rounded-sm flex items-center justify-center border border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)] transform group-hover:rotate-180 transition-transform duration-700">
							<span className="text-white font-mono font-bold text-xl select-none">R</span>
						</div>
						<div className="flex flex-col">
							<span className="text-2xl font-black tracking-tighter text-white group-hover:text-red-500 transition-colors bg-clip-text">
								REPTITAN
							</span>
							<span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 group-hover:text-red-400 transition-colors">
								System
							</span>
						</div>
					</Link>

					{/* Middle - Navigation Links */}
					<nav className="hidden md:flex items-center gap-10">
						{navLinks.map(({ to, label }) => (
							<Link
								key={to}
								to={to}
								className="relative text-gray-400 hover:text-white transition-colors duration-300 font-mono text-sm uppercase tracking-widest group py-2"
							>
								{label}
								<span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(220,38,38,0.8)]"></span>
							</Link>
						))}
					</nav>

					{/* Right - Actions */}
					<div className="flex items-center gap-6">
						<ModeToggle />
						<Link
							to="/auth/Login"
							className="relative overflow-hidden bg-transparent border border-red-600/50 text-red-500 hover:text-white px-8 py-2.5 rounded-sm font-mono text-sm tracking-wider uppercase transition-all duration-300 group hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:border-red-500"
						>
							<span className="relative z-10">Login</span>
							<div className="absolute inset-0 bg-red-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out -z-0 blur-none opacity-90"></div>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
}

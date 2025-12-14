import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { GlitchEffect } from "@/components/GlitchEffect";

export default function Hero() {
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div className="relative min-h-screen overflow-hidden bg-black text-white font-mono selection:bg-red-500 selection:text-white">
			{/* Background Video (Local) */}
			<div
				className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
				style={{
					transform: `translateY(${scrollY * 0.5}px) scale(1.1)`,
				}}
			>
				<video
					className="absolute top-1/2 left-1/2 w-full h-full min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
					src="/video/dark_intro.mp4"
					autoPlay
					muted
					loop
					playsInline
				/>
			</div>

			{/* Gradient Overlay Layers */}
			<div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-black/60 to-black z-10"></div>
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_100%)] z-10 opacity-70"></div>
			<div className="absolute inset-0 z-10 opacity-20 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(255,0,0,0.02),rgba(255,0,0,0.06))] bg-[length:100%_4px,6px_100%]"></div>


			{/* Animated Shapes/Elements - Red/Dark */}
			<div
				className="absolute top-20 right-10 w-72 h-72 bg-red-600/10 rounded-full blur-[100px]"
				style={{
					transform: `translateY(${scrollY * 0.3}px)`,
				}}
			></div>
			<div
				className="absolute bottom-20 left-10 w-96 h-96 bg-red-900/10 rounded-full blur-[120px]"
				style={{
					transform: `translateY(${scrollY * -0.2}px)`,
				}}
			></div>

			{/* Main Content with Parallax Layers */}
			<div className="relative z-20 flex flex-col justify-center min-h-screen px-8 md:px-16 lg:px-24">
				{/* Speed Label - Subtle detail */}
				<div
					className="mb-4 opacity-80 text-sm tracking-[0.3em] text-red-500 font-mono flex items-center gap-2"
					style={{
						transform: `translateY(${scrollY * 0.8}px)`,
					}}
				>
					<span className="w-2 h-2 bg-red-500 animate-pulse rounded-full"></span>
					&gt; SYSTEM_READY
				</div>

				{/* Main Heading with Different Speed */}
				<div
					className="mb-8 max-w-5xl"
					style={{
						transform: `translateY(${scrollY * 0.4}px)`,
						opacity: 1 - scrollY * 0.003,
					}}
				>
					<div className="flex flex-wrap items-center gap-3 mb-4">
						<GlitchEffect text="RepTitan" className="text-7xl md:text-9xl font-black text-red-600 mb-2 tracking-tighter" />
						<div className="text-3xl md:text-5xl text-white font-bold bg-red-600/10 px-4 py-1 border-l-4 border-red-600">
							<LayoutTextFlip
								text=""
								words={[
									"KILL THE ASUR...",
									"REWRITE DESTINY...",
									"START DOING NOW...",
									"THE END IS NEAR..."
								]}
								duration={2000}
							/>
						</div>
					</div>
				</div>

				{/* Subtitle with different parallax speed */}
				<p
					className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light mb-12 max-w-2xl border-l-[1px] border-red-900/50 pl-6"
					style={{
						transform: `translateY(${scrollY * 0.2}px)`,
						opacity: 1 - scrollY * 0.004,
					}}
				>
					There are two worlds. The one you see, and the truth you deny.
					<span className="text-red-500 font-bold block mt-2"> Kill the Asur in your head.</span>
				</p>

				{/* CTA Button with minimal parallax */}
				<div
					className="flex items-center gap-6"
					style={{
						transform: `translateY(${scrollY * 0.15}px)`,
						opacity: 1 - scrollY * 0.005,
					}}
				>
					<Button
						size="lg"
						className="bg-red-600 hover:bg-black hover:text-red-500 text-white font-mono font-bold px-10 py-8 text-lg rounded-none transition-all duration-300 shadow-[0_0_30px_rgba(220,38,38,0.2)] hover:shadow-[0_0_20px_rgba(220,38,38,0.6)] hover:border-red-600 border border-transparent inline-flex items-center gap-3 group relative overflow-hidden"
					>
						<span className="relative z-10 flex items-center gap-2">
							Get Started
							<svg
								className="w-5 h-5 transition-transform group-hover:translate-x-1"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
							</svg>
						</span>
					</Button>

					<div className="text-gray-500 text-sm font-mono">
						<div className="flex items-center gap-2">
							<div className="w-12 h-[1px] bg-red-900"></div>
							<span className="tracking-widest opacity-60">SCROLL TO EXPLORE</span>
						</div>
					</div>
				</div>

				{/* Stats/Metrics - Fixed position effect */}
				<div
					className="absolute bottom-16 right-8 md:right-24 hidden md:block"
					style={{
						transform: `translateY(${scrollY * -0.1}px)`,
						opacity: 1 - scrollY * 0.006,
					}}
				>
					<div className="backdrop-blur-sm bg-black/40 border border-red-900/30 rounded-none p-6 text-right shadow-[0_0_15px_rgba(220,38,38,0.1)]">
						<div className="text-5xl md:text-6xl font-bold text-red-600 mb-1 font-mono">
							99.9<span className="text-3xl">%</span>
						</div>
						<div className="text-xs text-red-400/60 tracking-[0.2em] font-medium uppercase">
							Accuracy
						</div>
					</div>
				</div>
			</div>

			{/* Scroll Indicator - Animated */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 animate-pulse opacity-50">
				<div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-red-600 to-transparent"></div>
				<svg
					className="w-6 h-6 text-red-600"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</div>
		</div>
	);
}

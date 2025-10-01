import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import Intro from "/images/intro.png";

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
		<div className="relative min-h-screen overflow-hidden bg-white dark:bg-black">
			{/* Background Image with Parallax */}
			<div 
				className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-100 ease-out"
				style={{
					backgroundImage: `url(${Intro})`,
					transform: `translateY(${scrollY * 0.5}px) scale(1.1)`,
				}}
			></div>
			
			{/* Gradient Overlay Layers */}
			<div className="absolute inset-0 bg-gradient-to-br from-indigo-200/30 via-purple-200/20 to-white/40 dark:from-indigo-900/60 dark:via-purple-900/50 dark:to-black/70 z-10"></div>
			<div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent dark:from-black dark:via-transparent dark:to-transparent z-10"></div>
			
			{/* Animated Shapes/Elements */}
			<div 
				className="absolute top-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
				style={{
					transform: `translateY(${scrollY * 0.3}px)`,
				}}
			></div>
			<div 
				className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
				style={{
					transform: `translateY(${scrollY * -0.2}px)`,
				}}
			></div>
			
			{/* Main Content with Parallax Layers */}
			<div className="relative z-20 flex flex-col justify-center min-h-screen px-8 md:px-16 lg:px-24">
				{/* Speed Label - Subtle detail */}
				<div 
					className="mb-4 opacity-60 text-sm tracking-[0.3em] text-cyan-600 dark:text-cyan-400 font-light"
					style={{
						transform: `translateY(${scrollY * 0.8}px)`,
					}}
				>
					01. AI-POWERED FITNESS
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
						<LayoutTextFlip 
							text="RepTitan"
							words={[
								"combines AI with fitness",
								"transforms your workouts",
								"makes you stronger",
								"is your fitness companion"
							]}
							duration={2000}
						/>
					</div>
				</div>
				
				{/* Subtitle with different parallax speed */}
				<p 
					className="text-xl md:text-2xl text-gray-700 dark:text-white/80 leading-relaxed font-light mb-12 max-w-2xl"
					style={{
						transform: `translateY(${scrollY * 0.2}px)`,
						opacity: 1 - scrollY * 0.004,
					}}
				>
					RepTitan combines AI with fitness to transform your workouts. 
					<span className="text-cyan-600 dark:text-cyan-400 font-medium"> Smarter reps, stronger you.</span>
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
						className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-10 py-7 text-lg rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] inline-flex items-center gap-3 group"
					>
						Watch Video
						<svg 
							className="w-5 h-5 transition-transform group-hover:translate-x-1" 
							fill="currentColor" 
							viewBox="0 0 20 20"
						>
							<path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
						</svg>
					</Button>
					
					<div className="text-gray-600 dark:text-white/60 text-sm">
						<div className="flex items-center gap-2">
							<div className="w-12 h-[1px] bg-gray-400 dark:bg-white/40"></div>
							<span className="tracking-wider">SCROLL TO EXPLORE</span>
						</div>
					</div>
				</div>
				
				{/* Stats/Metrics - Fixed position effect */}
				<div 
					className="absolute bottom-16 right-8 md:right-24"
					style={{
						transform: `translateY(${scrollY * -0.1}px)`,
						opacity: 1 - scrollY * 0.006,
					}}
				>
					<div className="backdrop-blur-md bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 text-right shadow-lg">
						<div className="text-5xl md:text-6xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">
							92.0<span className="text-3xl">%</span>
						</div>
						<div className="text-xs text-gray-600 dark:text-white/60 tracking-widest font-medium">
							PERFECT EXECUTION
						</div>
					</div>
				</div>
			</div>
			
			{/* Scroll Indicator - Animated */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 animate-bounce">
				<div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-cyan-600 dark:via-cyan-400 to-transparent"></div>
				<svg 
					className="w-6 h-6 text-cyan-600 dark:text-cyan-400" 
					fill="none" 
					stroke="currentColor" 
					viewBox="0 0 24 24"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</div>
			
			{/* Large Typography Background - Fixed */}
			<div 
				className="absolute top-1/2 left-0 -translate-y-1/2 z-0 select-none pointer-events-none opacity-5"
				style={{
					transform: `translateY(-50%) translateX(${scrollY * -0.05}px)`,
				}}
			>
				<h2 className="text-[20rem] font-black text-gray-900 dark:text-white whitespace-nowrap">
					FITNESS
				</h2>
			</div>
		</div>
	);
}

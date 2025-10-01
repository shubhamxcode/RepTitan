import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function VideoSection() {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"]
	});

	const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.9]);
	const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.95]);
	const y = useTransform(scrollYProgress, [0, 0.3], [100, 0]);

	return (
		<motion.section 
			ref={ref}
			style={{ opacity, y }}
			className="py-20 md:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-black dark:via-gray-900 dark:to-black relative overflow-hidden"
		>
			{/* Background Decoration */}
			<div className="absolute inset-0 opacity-20">
				<div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
				<div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
			</div>

			<div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
				{/* Section Header */}
				<motion.div 
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true, margin: "-100px" }}
					className="text-center mb-16"
				>
					<h2 className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 tracking-widest mb-4">
						SEE IT IN ACTION
					</h2>
					<h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
						Watch RepTitan Transform Your Workouts
					</h3>
					<p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
						Experience real-time AI analysis, rep counting, and form correction in action
					</p>
				</motion.div>

				{/* Video Container */}
				<motion.div
					style={{ scale }}
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					viewport={{ once: true, margin: "-50px" }}
					className="relative max-w-5xl mx-auto"
				>
					{/* Glow Effect */}
					<div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-2xl opacity-75"></div>
					
					{/* Video Frame */}
					<div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-700/50 shadow-2xl">
						<video
							className="w-full h-auto"
							controls
							playsInline
							poster="/images/intro.png"
						>
							<source src="/video/hero section video.mp4" type="video/mp4" />
							Your browser does not support the video tag.
						</video>
					</div>

					{/* Floating Stats */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.5 }}
						viewport={{ once: true }}
						className="absolute -left-8 top-1/4 hidden lg:block"
					>
						<div className="bg-white/90 dark:bg-black/80 backdrop-blur-md border border-cyan-300 dark:border-cyan-500/30 rounded-xl p-4 shadow-xl">
							<div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">15</div>
							<div className="text-xs text-gray-600 dark:text-gray-400">Reps Tracked</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.6 }}
						viewport={{ once: true }}
						className="absolute -right-8 bottom-1/4 hidden lg:block"
					>
						<div className="bg-white/90 dark:bg-black/80 backdrop-blur-md border border-purple-300 dark:border-purple-500/30 rounded-xl p-4 shadow-xl">
							<div className="text-3xl font-bold text-purple-600 dark:text-purple-400">98%</div>
							<div className="text-xs text-gray-600 dark:text-gray-400">Form Score</div>
						</div>
					</motion.div>
				</motion.div>

				{/* Features Grid */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					viewport={{ once: true, margin: "-100px" }}
					className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
				>
					<div className="text-center">
						<div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg className="w-6 h-6 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
							</svg>
						</div>
						<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-Time Analysis</h4>
						<p className="text-gray-600 dark:text-gray-400 text-sm">Instant feedback as you perform each rep</p>
					</div>

					<div className="text-center">
						<div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
							</svg>
						</div>
						<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Counting</h4>
						<p className="text-gray-600 dark:text-gray-400 text-sm">Never lose track of your sets again</p>
					</div>

					<div className="text-center">
						<div className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
							</svg>
						</div>
						<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Instant Corrections</h4>
						<p className="text-gray-600 dark:text-gray-400 text-sm">Perfect your form with AI guidance</p>
					</div>
				</motion.div>
			</div>
		</motion.section>
	);
} 
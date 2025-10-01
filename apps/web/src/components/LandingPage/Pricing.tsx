import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const pricingPlans = [
	{
		name: "Monthly",
		price: "$2",
		period: "per month",
		description: "Perfect for trying out RepTitan",
		features: [
			"AI-Powered Rep Counting",
			"Real-Time Form Correction",
			"Basic Progress Tracking",
			"Video Analysis",
			"Exercise Library Access",
			"Mobile App Access",
		],
		highlighted: false,
	},
	{
		name: "6 Months",
		price: "$10",
		period: "for 6 months",
		description: "Save 17% with this plan",
		originalPrice: "$12",
		features: [
			"Everything in Monthly",
			"Advanced Analytics",
			"Personalized Workout Plans",
			"Priority Support",
			"Offline Mode",
			"Export Data & Reports",
			"Achievement Badges",
			"Custom Goals",
		],
		highlighted: false,
	},
	{
		name: "1 Year",
		price: "$18",
		period: "for 12 months",
		description: "Best value - Save 25%",
		originalPrice: "$24",
		features: [
			"Everything in 6 Months",
			"Lifetime Updates",
			"1-on-1 Coaching Sessions",
			"Custom Meal Plans",
			"Early Access to Features",
			"Dedicated Account Manager",
			"Advanced AI Insights",
			"Group Challenges",
			"Free Merchandise",
		],
		highlighted: true,
	},
];

export default function Pricing() {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"]
	});

	const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.9]);
	const y = useTransform(scrollYProgress, [0, 0.3], [100, 0]);

	return (
		<motion.section 
			ref={ref}
			style={{ opacity, y }}
			className="py-20 md:py-32 bg-white dark:bg-black relative overflow-hidden"
		>
			{/* Subtle Background Elements */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
				<div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
			</div>

			<div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					viewport={{ once: true, margin: "-100px" }}
					className="text-center mb-16"
				>
					<motion.h2 
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
						className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 tracking-widest mb-4"
					>
						PRICING
					</motion.h2>
					<motion.h3 
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						viewport={{ once: true }}
						className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
					>
						Choose Your Plan
					</motion.h3>
					<motion.p 
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						viewport={{ once: true }}
						className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
					>
						Start your fitness journey with RepTitan. Pick the plan that works best for you.
					</motion.p>
				</motion.div>

				{/* Pricing Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
					{pricingPlans.map((plan, index) => (
						<motion.div
							key={plan.name}
							initial={{ opacity: 0, y: 80, scale: 0.95 }}
							whileInView={{ opacity: 1, y: 0, scale: 1 }}
							transition={{ 
								duration: 0.7, 
								delay: index * 0.2,
								ease: [0.25, 0.46, 0.45, 0.94]
							}}
							viewport={{ once: true, margin: "-50px" }}
							whileHover={{ 
								scale: 1.02,
								transition: { duration: 0.3 }
							}}
							className={`relative rounded-3xl p-8 transition-all duration-300 ${
								plan.highlighted
									? "bg-cyan-600 dark:bg-cyan-500 text-white shadow-2xl border-2 border-cyan-700 dark:border-cyan-400"
									: "bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl"
							}`}
						>
							{/* Best Value Badge */}
							{plan.highlighted && (
								<motion.div 
									initial={{ opacity: 0, y: -20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.5 }}
									viewport={{ once: true }}
									className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg"
								>
									⭐ BEST VALUE
								</motion.div>
							)}

							{/* Plan Name */}
							<motion.div 
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
								viewport={{ once: true }}
								className="mb-6"
							>
								<h4
									className={`text-2xl font-bold mb-2 ${
										plan.highlighted ? "text-white" : "text-gray-900 dark:text-white"
									}`}
								>
									{plan.name}
								</h4>
								<p
									className={`text-sm ${
										plan.highlighted ? "text-white/90" : "text-gray-600 dark:text-gray-400"
									}`}
								>
									{plan.description}
								</p>
							</motion.div>

							{/* Price */}
							<motion.div 
								initial={{ opacity: 0, scale: 0.8 }}
								whileInView={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
								viewport={{ once: true }}
								className="mb-8"
							>
								<div className="flex items-baseline gap-2">
									{plan.originalPrice && (
										<span className="text-2xl line-through opacity-60">{plan.originalPrice}</span>
									)}
									<span className="text-6xl font-black">{plan.price}</span>
								</div>
								<p
									className={`text-sm mt-1 ${
										plan.highlighted ? "text-white/80" : "text-gray-500 dark:text-gray-400"
									}`}
								>
									{plan.period}
								</p>
							</motion.div>

							{/* Features */}
							<ul className="space-y-4 mb-8">
								{plan.features.map((feature, idx) => (
									<motion.li 
										key={idx} 
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.4, delay: index * 0.2 + 0.5 + idx * 0.05 }}
										viewport={{ once: true }}
										className="flex items-start gap-3"
									>
										<div
											className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
												plan.highlighted ? "bg-white/20" : "bg-cyan-100 dark:bg-cyan-900/30"
											}`}
										>
											<Check
												className={`w-4 h-4 ${
													plan.highlighted ? "text-white" : "text-cyan-600 dark:text-cyan-400"
												}`}
											/>
										</div>
										<span
											className={`text-sm ${
												plan.highlighted ? "text-white/90" : "text-gray-700 dark:text-gray-300"
											}`}
										>
											{feature}
										</span>
									</motion.li>
								))}
							</ul>

							{/* CTA Button */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.2 + 0.8 }}
								viewport={{ once: true }}
							>
								<Button
									className={`w-full py-6 text-lg font-semibold rounded-xl transition-all duration-300 ${
										plan.highlighted
											? "bg-white text-cyan-600 hover:bg-gray-100 shadow-lg"
											: "bg-cyan-600 text-white hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 shadow-lg hover:shadow-xl"
									}`}
								>
									Get Started
								</Button>
							</motion.div>
						</motion.div>
					))}
				</div>

				{/* Money Back Guarantee */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6 }}
					viewport={{ once: true }}
					className="text-center mt-12"
				>
					<p className="text-gray-600 dark:text-gray-400 text-lg">
						🔒 30-day money-back guarantee • Cancel anytime
					</p>
				</motion.div>
			</div>
		</motion.section>
	);
} 
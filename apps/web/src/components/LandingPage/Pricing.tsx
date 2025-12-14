import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const pricingPlans = [
	{
		name: "Monthly",
		price: "$2",
		period: "per month",
		description: "Basic access to the system",
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
		description: "Standard operative clearance",
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
		description: "Full system control",
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
			className="py-20 md:py-32 bg-black relative overflow-hidden font-mono"
		>
			{/* Subtle Background Elements */}
			<div className="absolute inset-0 opacity-10 pointer-events-none">
				<div className="absolute top-20 left-10 w-96 h-96 bg-red-600 rounded-full blur-[150px]"></div>
				<div className="absolute bottom-20 right-10 w-96 h-96 bg-red-800 rounded-full blur-[150px]"></div>
				<div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
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
						className="text-sm font-bold text-red-600 tracking-[0.5em] mb-4"
					>
						&gt; PRICING_PLANS
					</motion.h2>
					<motion.h3
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						viewport={{ once: true }}
						className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase"
					>
						Select Your Plan
					</motion.h3>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						viewport={{ once: true }}
						className="text-xl text-gray-400 max-w-3xl mx-auto"
					>
						<span className="text-red-500 font-bold">&gt;</span> Choose the plan that best fits your needs.
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
							className={`relative rounded-none p-8 transition-all duration-300 border-2 ${plan.highlighted
								? "bg-black border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.15)]"
								: "bg-black border-white/20 hover:border-red-600/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.1)]"
								}`}
						>
							{/* Best Value Badge */}
							{plan.highlighted && (
								<motion.div
									initial={{ opacity: 0, y: -20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.5 }}
									viewport={{ once: true }}
									className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-1 text-sm font-bold shadow-lg tracking-widest uppercase border border-red-400"
								>
									Recommended
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
									className={`text-2xl font-bold mb-2 uppercase text-white`}
								>
									{plan.name}
								</h4>
								<p
									className={`text-sm text-gray-400 font-mono`}
								>
									// {plan.description}
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
								<div className="flex items-baseline gap-2 text-white">
									{plan.originalPrice && (
										<span className="text-2xl line-through opacity-40 text-red-500">{plan.originalPrice}</span>
									)}
									<span className="text-6xl font-black">{plan.price}</span>
								</div>
								<p
									className={`text-sm mt-1 text-gray-500 font-mono uppercase tracking-wider`}
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
											className={`flex-shrink-0 w-5 h-5 flex items-center justify-center`}
										>
											<Check
												className={`w-4 h-4 text-red-500`}
											/>
										</div>
										<span
											className={`text-sm text-gray-300 font-mono`}
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
									className={`w-full py-6 text-lg font-bold rounded-none transition-all duration-300 uppercase tracking-wider border hover:bg-transparent ${plan.highlighted
										? "bg-red-600 text-white border-red-600 hover:text-red-500 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
										: "bg-white text-black border-white hover:text-white"
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
					<p className="text-gray-500 text-sm font-mono tracking-widest uppercase">
						<span className="text-red-500">[SECURE]</span> 30-day money-back guarantee active
					</p>
				</motion.div>
			</div>
		</motion.section>
	);
} 
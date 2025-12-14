import { Link } from "@tanstack/react-router";

export default function Footer() {
	return (
		<footer className="relative bg-black text-white overflow-hidden border-t border-red-900/30">
			{/* Background Image/Pattern */}
			<div
				className="absolute inset-0 opacity-20 grayscale mix-blend-overlay"
				style={{
					backgroundImage: 'url(/images/intro.png)',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			></div>
			<div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent"></div>

			<div className="relative z-10 font-mono">
				{/* Main Footer Content */}
				<div className="max-w-7xl mx-auto px-8 md:px-16 py-16">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
						{/* Get Started */}
						<div>
							<h3 className="text-lg font-bold mb-4 text-red-600 uppercase tracking-widest">&gt; START_UP</h3>
							<ul className="space-y-2">
								<li>
									<Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm hover:translate-x-1 inline-block duration-300">
										Sign up for Free
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm hover:translate-x-1 inline-block duration-300">
										Download App
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm hover:translate-x-1 inline-block duration-300">
										Subscribe
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm hover:translate-x-1 inline-block duration-300">
										Start Workout
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm hover:translate-x-1 inline-block duration-300">
										Track Progress
									</Link>
								</li>
							</ul>
						</div>

						{/* Features */}
						<div>
							<h3 className="text-lg font-bold mb-4 text-red-600 uppercase tracking-widest">&gt; MODULES</h3>
							<ul className="space-y-2">
								<li>
									<Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm hover:translate-x-1 inline-block duration-300">
										AI Rep Counting
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm hover:translate-x-1 inline-block duration-300">
										Form Correction
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm hover:translate-x-1 inline-block duration-300">
										Video Analysis
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm hover:translate-x-1 inline-block duration-300">
										Progress Tracking
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm hover:translate-x-1 inline-block duration-300">
										Workout Plans
									</Link>
								</li>
							</ul>
						</div>

						{/* Resources */}
						<div>
							<h3 className="text-lg font-bold mb-4 text-red-600 uppercase tracking-widest">&gt; DATABASE</h3>
							<ul className="space-y-2">
								<li>
									<Link to="/docs" className="text-gray-400 hover:text-red-500 transition-colors text-sm hover:translate-x-1 inline-block duration-300">
										Documentation
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm hover:translate-x-1 inline-block duration-300">
										Exercise Library
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm hover:translate-x-1 inline-block duration-300">
										Training Guides
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm hover:translate-x-1 inline-block duration-300">
										API Access
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm hover:translate-x-1 inline-block duration-300">
										Blog
									</Link>
								</li>
							</ul>
						</div>

						{/* About Us */}
						<div>
							<h3 className="text-lg font-bold mb-4 text-red-600 uppercase tracking-widest">&gt; WHO_WE_ARE</h3>
							<ul className="space-y-2">
								<li>
									<Link to="/about" className="text-gray-400 hover:text-red-500 transition-colors text-sm hover:translate-x-1 inline-block duration-300">
										Mission Protocol
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm hover:translate-x-1 inline-block duration-300">
										Our Team
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm hover:translate-x-1 inline-block duration-300">
										Join Resistance
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm hover:translate-x-1 inline-block duration-300">
										Press
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm hover:translate-x-1 inline-block duration-300">
										Partners
									</Link>
								</li>
							</ul>
						</div>

						{/* Support */}
						<div>
							<h3 className="text-lg font-bold mb-4 text-red-600 uppercase tracking-widest">&gt; UPLINK</h3>
							<ul className="space-y-2">
								<li>
									<Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm hover:translate-x-1 inline-block duration-300">
										Contact Us
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm hover:translate-x-1 inline-block duration-300">
										Help Center
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm hover:translate-x-1 inline-block duration-300">
										FAQs
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm hover:translate-x-1 inline-block duration-300">
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm hover:translate-x-1 inline-block duration-300">
										Terms of Service
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Bottom Footer */}
				<div className="border-t border-red-900/20 bg-black">
					<div className="max-w-7xl mx-auto px-8 md:px-16 py-6">
						<div className="flex flex-col md:flex-row justify-between items-center gap-4">
							<div className="text-xs text-gray-500 uppercase tracking-widest">
								system.copyright {new Date().getFullYear()} | <Link to="/" className="hover:text-red-500 transition-colors">SECURE_CONNECTION</Link>
							</div>

							<div className="text-xs text-red-900/50 uppercase tracking-[0.5em] font-bold">
								REPTITAN.OS.V.1.0
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
} 
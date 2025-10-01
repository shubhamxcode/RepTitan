import { Link } from "@tanstack/react-router";

export default function Footer() {
	return (
		<footer className="relative bg-gray-900 dark:bg-black text-white overflow-hidden">
			{/* Background Image/Pattern */}
			<div 
				className="absolute inset-0 opacity-10"
				style={{
					backgroundImage: 'url(/images/intro.png)',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			></div>
			
			<div className="relative z-10">
				{/* Main Footer Content */}
				<div className="max-w-7xl mx-auto px-8 md:px-16 py-16">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
						{/* Get Started */}
						<div>
							<h3 className="text-lg font-bold mb-4 text-white">Get Started:</h3>
							<ul className="space-y-2">
								<li>
									<Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
										Sign up for Free
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
										Download App
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
										Subscribe
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
										Start Workout
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
										Track Progress
									</Link>
								</li>
							</ul>
						</div>

						{/* Features */}
						<div>
							<h3 className="text-lg font-bold mb-4 text-white">Features:</h3>
							<ul className="space-y-2">
								<li>
									<Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
										AI Rep Counting
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
										Form Correction
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
										Video Analysis
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
										Progress Tracking
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
										Workout Plans
									</Link>
								</li>
							</ul>
						</div>

						{/* Resources */}
						<div>
							<h3 className="text-lg font-bold mb-4 text-white">Resources:</h3>
							<ul className="space-y-2">
								<li>
									<Link to="/docs" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
										Documentation
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
										Exercise Library
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
										Training Guides
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
										API Access
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
										Blog
									</Link>
								</li>
							</ul>
						</div>

						{/* About Us */}
						<div>
							<h3 className="text-lg font-bold mb-4 text-white">About Us:</h3>
							<ul className="space-y-2">
								<li>
									<Link to="/about" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
										Who We Are
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
										Our Team
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
										Careers
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
										Press
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
										Partners
									</Link>
								</li>
							</ul>
						</div>

						{/* Support */}
						<div>
							<h3 className="text-lg font-bold mb-4 text-white">Support:</h3>
							<ul className="space-y-2">
								<li>
									<Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
										Contact Us
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
										Help Center
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
										FAQs
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
										Terms of Service
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Bottom Footer */}
				<div className="border-t border-gray-800">
					<div className="max-w-7xl mx-auto px-8 md:px-16 py-6">
						<div className="flex flex-col md:flex-row justify-between items-center gap-4">
							<div className="text-sm text-gray-400">
								Copyright {new Date().getFullYear()} | <Link to="/" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
							</div>
							
							<div className="text-sm text-gray-400">
								Global Fitness Platform
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
} 
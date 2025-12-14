import { Router, type Router as ExpressRouter } from "express";
import passport from "../config/passport.js";
import dotenv from "dotenv";

dotenv.config();
const router: ExpressRouter = Router();

const LOCAL_FRONTEND = process.env.LocalHostUrl;
const PRODUCTION_FRONTEND = process.env.VERCEL_URL;


router.get("/google", (req, res, next) => {
	const referer = req.get("Referer") || "";
	const isFromLocalhost = referer.includes("localhost");
	
	(req.session as any).frontendURL = isFromLocalhost ? LOCAL_FRONTEND : PRODUCTION_FRONTEND;
	
	console.log("OAuth started from:", isFromLocalhost ? "localhost" : "production");
	passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
});

// Helper to get frontend URL from session or fallback
const getFrontendURL = (req: any) => {
	// Use stored URL from session, or detect from environment
	const storedURL = req.session?.frontendURL;
	if (storedURL) {
		return storedURL;
	}
	// Fallback based on NODE_ENV
	return process.env.NODE_ENV === "production" ? PRODUCTION_FRONTEND : LOCAL_FRONTEND;
};


router.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "/auth/login-failed" }),
	(req, res) => {
		// Successful authentication, redirect to the frontend user came from
		const frontendURL = getFrontendURL(req);
		console.log("OAuth success, redirecting to:", frontendURL);
		res.redirect(`${frontendURL}/dashboard`);
	}
);

// Handle login failure
router.get("/login-failed", (req, res) => {
	const frontendURL = getFrontendURL(req);
	res.redirect(`${frontendURL}/auth/Login?error=auth_failed`);
});

// Logout
router.post("/logout", (req, res) => {
	req.logout((err) => {
		if (err) {
			return res.status(500).json({ error: "Logout failed" });
		}
		res.json({ message: "Logged out successfully" });
	});
});

// Get current user
router.get("/user", (req, res) => {
	if (req.isAuthenticated()) {
		res.json(req.user);
	} else {
		res.status(401).json({ error: "Not authenticated" });
	}
});

export default router; 
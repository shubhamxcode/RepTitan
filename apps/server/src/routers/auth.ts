import { Router, type Router as ExpressRouter } from "express";
import passport from "../config/passport.js";

const router: ExpressRouter = Router();

// Google OAuth login
router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback
router.get(
	"/google/callback",
	passport.authenticate("google", {
		failureRedirect: `${process.env.CORS_ORIGIN}/auth/Login`,
	}),
	(req, res) => {
		// Successful authentication, redirect to dashboard
		res.redirect(`${process.env.CORS_ORIGIN}/dashboard`);
	}
);

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
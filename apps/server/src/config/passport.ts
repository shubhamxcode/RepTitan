import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "../db/index.js";

passport.serializeUser((user: any, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id: any, done) => {
	try {
		const user = await prisma.user.findUnique({ where: { id: Number(id) } });
		done(null, user);
	} catch (error) {
		done(error, null);
	}
});

// Get the full callback URL for OAuth
// Production URL hardcoded as fallback
const PRODUCTION_BACKEND = "https://reptitan-x7ib.onrender.com";

const getCallbackURL = () => {
	// Use RENDER_URL if explicitly set (your custom env var)
	if (process.env.RENDER_URL) {
		return `${process.env.RENDER_URL}/auth/google/callback`;
	}
	// Render provides RENDER_EXTERNAL_URL automatically
	if (process.env.RENDER_EXTERNAL_URL) {
		return `${process.env.RENDER_EXTERNAL_URL}/auth/google/callback`;
	}
	// Production fallback or development
	const baseUrl = process.env.NODE_ENV === "production" ? PRODUCTION_BACKEND : "http://localhost:3000";
	return `${baseUrl}/auth/google/callback`;
};

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
			callbackURL: getCallbackURL(),
		},
		async (_accessToken, _refreshToken, profile, done) => {
			try {
				// Check if user already exists
				let user = await prisma.user.findUnique({
					where: { googleId: profile.id },
				});

				if (!user) {
					// Check if user exists with the same email
					user = await prisma.user.findUnique({
						where: { email: profile.emails?.[0]?.value },
					});

					if (user) {
						// Link Google account to existing user
						user = await prisma.user.update({
							where: { id: user.id },
							data: {
								googleId: profile.id,
								provider: "google",
							},
						});
					} else {
						// Create new user
						user = await prisma.user.create({
							data: {
								email: profile.emails?.[0]?.value || "",
								name: profile.displayName || "",
								googleId: profile.id,
								provider: "google",
							},
						});
					}
				}

				return done(null, user);
			} catch (error) {
				return done(error as Error, undefined);
			}
		}
	)
);

export default passport; 
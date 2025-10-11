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

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
			callbackURL: "/auth/google/callback",
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
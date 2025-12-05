import "dotenv/config";
import cors from "cors";
import express from "express";
import session from "express-session";
import passport from "./config/passport.js";
import authRouter from "./routers/auth.js";
import goalsRouter from "./routers/goals.js";

const app = express();

// Trust proxy for secure cookies behind Render's proxy
if (process.env.NODE_ENV === "production") {
	app.set("trust proxy", 1);
}

// CORS configuration for cross-domain (Vercel frontend + Render backend)
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3001";
console.log("CORS Origin configured:", corsOrigin);

app.use(
	cors({
		origin: corsOrigin,
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		credentials: true,
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
);

app.use(express.json());

// Session configuration with cross-domain cookie settings
app.use(
	session({
		secret: process.env.SESSION_SECRET || "your-secret-key",
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: process.env.NODE_ENV === "production", // HTTPS only in production
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000, // 24 hours
			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Required for cross-domain
		},
	})
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRouter);
app.use("/goals", goalsRouter);

app.get("/", (_req, res) => {
	res.status(200).send("OK");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

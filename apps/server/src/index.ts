import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import express from "express";
import session from "express-session";
import passport from "./config/passport.js";
import authRouter from "./routers/auth.js";
import goalsRouter from "./routers/goals.js";

// Load environment variables
// .env.local takes precedence over .env for local development
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env.local") }); // Load .env.local first (if exists)
dotenv.config({ path: path.resolve(__dirname, "../.env") }); // Then load .env (won't override existing vars)

const app = express();
const isProduction = process.env.NODE_ENV === "production";

console.log("Server starting...");
console.log("Environment:", process.env.NODE_ENV);
console.log("Production Mode:", isProduction);

// Trust proxy for secure cookies behind Render's proxy
if (isProduction) {
	app.set("trust proxy", 1);
}

// CORS configuration - Allow both localhost and production Vercel
const ALLOWED_ORIGINS = [
	"http://localhost:3001",           // Local frontend
	"https://rep-titan-web.vercel.app",  // Production Vercel
];

// Add any custom origin from env
if (process.env.CORS_ORIGIN && !ALLOWED_ORIGINS.includes(process.env.CORS_ORIGIN)) {
	ALLOWED_ORIGINS.push(process.env.CORS_ORIGIN);
}

console.log("✅ CORS Origins allowed:", ALLOWED_ORIGINS);

app.use(
	cors({
		origin: (origin, callback) => {
			// Allow requests with no origin (mobile apps, curl, etc.)
			if (!origin) return callback(null, true);
			
			if (ALLOWED_ORIGINS.includes(origin)) {
				callback(null, true);
			} else {
				console.log("❌ CORS blocked origin:", origin);
				callback(new Error("Not allowed by CORS"));
			}
		},
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
		proxy: isProduction, // Required for Heroku/Render/Vercel proxies
		cookie: {
			secure: isProduction, // HTTPS only in production
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000, // 24 hours
			sameSite: isProduction ? "none" : "lax", // Required for cross-domain
			domain: isProduction ? undefined : undefined, // Let the browser handle domain (defaults to host)
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

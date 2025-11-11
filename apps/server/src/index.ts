import "dotenv/config";
import cors from "cors";
import express from "express";
import session from "express-session";
import passport from "./config/passport.js";
import authRouter from "./routers/auth.js";
import goalsRouter from "./routers/goals.js";

const app = express();

app.use(
	cors({
		origin: process.env.CORS_ORIGIN || "",
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		credentials: true,
	}),
);

app.use(express.json());

// Session configuration
app.use(
	session({
		secret: process.env.SESSION_SECRET || "your-secret-key",
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: process.env.NODE_ENV === "production",
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000, // 24 hours
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

import express from "express";
import prisma from "../db/index.js";

const router:express.Router = express.Router();

// Get user's goal data
router.get("/:userId", async (req, res) => {
	try {
		const userId = parseInt(req.params.userId);

		const goalDetail = await prisma.userGoalDetail.findUnique({
			where: { userId },
		});

		if (!goalDetail) {
			return res.status(404).json({ error: "Goal data not found" });
		}

		res.json(goalDetail);
	} catch (error) {
		console.error("Error fetching goal data:", error);
		res.status(500).json({ error: "Failed to fetch goal data" });
	}
});

// Save or update user's goal data
router.post("/save", async (req, res) => {
	try {
		const {
			userId,
			goal,
			gender,
			age,
			height,
			currentWeight,
			targetWeight,
			activityLevel,
			bmi,
			bmiCategory,
			bmr,
			tdee,
			targetCalories,
			protein,
			carbs,
			fats,
			waterIntake,
			weightDifference,
			estimatedWeeks,
			exerciseRecommendation,
			goalTimeline,
		} = req.body;

		// Validate required fields
		if (!userId) {
			return res.status(400).json({ error: "User ID is required" });
		}

		// Check if goal data already exists for this user
		const existingGoal = await prisma.userGoalDetail.findUnique({
			where: { userId },
		});

		let goalDetail;

		if (existingGoal) {
			// Update existing goal
			goalDetail = await prisma.userGoalDetail.update({
				where: { userId },
				data: {
					goal,
					gender,
					age,
					height,
					currentWeight,
					targetWeight,
					activityLevel,
					bmi,
					bmiCategory,
					bmr,
					tdee,
					targetCalories,
					protein,
					carbs,
					fats,
					waterIntake,
					weightDifference,
					estimatedWeeks,
					exerciseRecommendation,
					goalTimeline,
				},
			});
		} else {
			// Create new goal
			goalDetail = await prisma.userGoalDetail.create({
				data: {
					userId,
					goal,
					gender,
					age,
					height,
					currentWeight,
					targetWeight,
					activityLevel,
					bmi,
					bmiCategory,
					bmr,
					tdee,
					targetCalories,
					protein,
					carbs,
					fats,
					waterIntake,
					weightDifference,
					estimatedWeeks,
					exerciseRecommendation,
					goalTimeline,
				},
			});
		}

		res.json({
			message: existingGoal ? "Goal updated successfully" : "Goal saved successfully",
			data: goalDetail,
		});
	} catch (error) {
		console.error("Error saving goal data:", error);
		res.status(500).json({ error: "Failed to save goal data" });
	}
});

// Delete user's goal data
router.delete("/:userId", async (req, res) => {
	try {
		const userId = parseInt(req.params.userId);

		await prisma.userGoalDetail.delete({
			where: { userId },
		});

		res.json({ message: "Goal deleted successfully" });
	} catch (error) {
		console.error("Error deleting goal data:", error);
		res.status(500).json({ error: "Failed to delete goal data" });
	}
});

// Save exercise session data
router.post("/exercise/save", async (req, res) => {
	try {
		const {
			userId,
			exerciseType,
			repsCompleted,
			duration,
			averageFormQuality,
		} = req.body;

		// Validate required fields
		if (!userId || !exerciseType || duration === undefined) {
			return res.status(400).json({ error: "Missing required fields" });
		}

		// Calculate estimated calories burned based on exercise type and duration
		// These are rough estimates based on exercise intensity
		let caloriesBurned = 0;
		const durationInMinutes = duration / 60;
		
		// Calorie estimates per minute (for average 70kg person)
		const caloriesPerMinute = {
			pushup: 7, // ~7 cal/min for moderate intensity
			squat: 8, // ~8 cal/min for moderate intensity
			plank: 3, // ~3 cal/min for static hold
		};

		caloriesBurned = Math.round(
			(caloriesPerMinute[exerciseType as keyof typeof caloriesPerMinute] || 5) * durationInMinutes
		);

		// Create exercise session
		const exerciseSession = await prisma.exerciseSession.create({
			data: {
				userId,
				exerciseType,
				repsCompleted: repsCompleted || 0,
				duration,
				caloriesBurned,
				averageFormQuality: averageFormQuality || 0,
			},
		});

		res.json({
			message: "Exercise session saved successfully",
			data: exerciseSession,
		});
	} catch (error) {
		console.error("Error saving exercise session:", error);
		res.status(500).json({ error: "Failed to save exercise session" });
	}
});

// Get user's exercise sessions (with optional date filtering)
router.get("/exercise/:userId", async (req, res) => {
	try {
		const userId = parseInt(req.params.userId);
		const { startDate, endDate, limit } = req.query;

		let whereClause: any = { userId };

		// Add date filtering if provided
		if (startDate || endDate) {
			whereClause.sessionDate = {};
			if (startDate) {
				whereClause.sessionDate.gte = new Date(startDate as string);
			}
			if (endDate) {
				whereClause.sessionDate.lte = new Date(endDate as string);
			}
		}

		const sessions = await prisma.exerciseSession.findMany({
			where: whereClause,
			orderBy: {
				sessionDate: "desc",
			},
			take: limit ? parseInt(limit as string) : undefined,
		});

		res.json(sessions);
	} catch (error) {
		console.error("Error fetching exercise sessions:", error);
		res.status(500).json({ error: "Failed to fetch exercise sessions" });
	}
});

// Get exercise statistics summary for user
router.get("/exercise/:userId/stats", async (req, res) => {
	try {
		const userId = parseInt(req.params.userId);
		const { days } = req.query;

		// Calculate date range (default last 7 days)
		const daysCount = days ? parseInt(days as string) : 7;
		const startDate = new Date();
		startDate.setDate(startDate.getDate() - daysCount);

		// Get all sessions in date range
		const sessions = await prisma.exerciseSession.findMany({
			where: {
				userId,
				sessionDate: {
					gte: startDate,
				},
			},
		});

		// Calculate statistics
		const stats = {
			totalSessions: sessions.length,
			totalDuration: sessions.reduce((sum, s) => sum + s.duration, 0),
			totalCalories: sessions.reduce((sum, s) => sum + s.caloriesBurned, 0),
			totalReps: sessions.reduce((sum, s) => sum + s.repsCompleted, 0),
			averageFormQuality: sessions.length > 0
				? sessions.reduce((sum, s) => sum + s.averageFormQuality, 0) / sessions.length
				: 0,
			exerciseBreakdown: sessions.reduce((acc: any, session) => {
				if (!acc[session.exerciseType]) {
					acc[session.exerciseType] = {
						count: 0,
						totalReps: 0,
						totalDuration: 0,
						totalCalories: 0,
					};
				}
				acc[session.exerciseType].count += 1;
				acc[session.exerciseType].totalReps += session.repsCompleted;
				acc[session.exerciseType].totalDuration += session.duration;
				acc[session.exerciseType].totalCalories += session.caloriesBurned;
				return acc;
			}, {}),
		};

		res.json(stats);
	} catch (error) {
		console.error("Error fetching exercise stats:", error);
		res.status(500).json({ error: "Failed to fetch exercise stats" });
	}
});

export default router;


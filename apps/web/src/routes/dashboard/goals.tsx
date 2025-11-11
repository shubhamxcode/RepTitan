import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target, TrendingUp, TrendingDown, Heart, CheckCircle2, User, Activity, Flame, Apple, Drumstick, Beef, Wheat, Loader2, Bot, Send, Brain, MessageCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/goals")({
	component: Goals,
});

type GoalType = "weight_gain" | "weight_loss" | "healthy_body" | null;

interface UserData {
	age: string;
	gender: "male" | "female" | "";
	height: string;
	currentWeight: string;
	targetWeight: string;
	activityLevel: "sedentary" | "light" | "moderate" | "very_active" | "extra_active" | "";
}

interface NutritionPlan {
	bmr: number;
	tdee: number;
	targetCalories: number;
	protein: number;
	carbs: number;
	fats: number;
	bmi: number;
	bmiCategory: string;
	waterIntake: number;
	exerciseRecommendation: string;
	goalTimeline: string;
	currentWeight: number;
	targetWeight: number;
	weightDifference: number;
	estimatedWeeks: number;
}

interface ChatMessage {
	id: string;
	role: "user" | "assistant";
	content: string;
	timestamp: Date;
}

interface ExerciseStats {
	totalSessions: number;
	totalDuration: number;
	totalCalories: number;
	totalReps: number;
	averageFormQuality: number;
	exerciseBreakdown: {
		[key: string]: {
			count: number;
			totalReps: number;
			totalDuration: number;
			totalCalories: number;
		};
	};
}

function Goals() {
	const [step, setStep] = useState<1 | 2 | 3>(1);
	const [selectedGoal, setSelectedGoal] = useState<GoalType>(null);
	const [userData, setUserData] = useState<UserData>({
		age: "",
		gender: "",
		height: "",
		currentWeight: "",
		targetWeight: "",
		activityLevel: "",
	});
	const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(null);
	const [isSaving, setIsSaving] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [hasExistingGoal, setHasExistingGoal] = useState(false);

	// Chatbot state
	const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
	const [chatInput, setChatInput] = useState("");
	const [isChatLoading, setIsChatLoading] = useState(false);
	const [showChat, setShowChat] = useState(false);
	const chatMessagesEndRef = useRef<HTMLDivElement>(null);

	// Exercise tracking state
	const [exerciseStats, setExerciseStats] = useState<ExerciseStats | null>(null);
	const [exerciseStatsLoading, setExerciseStatsLoading] = useState(false);

	// API Base URL
	const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
	const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
	
	// For demo purposes, using userId = 1
	// In production, get this from auth context/session
	const userId = 1;

	const goalOptions = [
		{
			id: "weight_gain",
			title: "Weight Gain",
			description: "Build muscle mass and increase body weight in a healthy way",
			icon: TrendingUp,
			color: "blue",
			gradient: "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
			iconBg: "bg-blue-100 dark:bg-blue-900/30",
			iconColor: "text-blue-600 dark:text-blue-400",
			borderColor: "border-blue-200 dark:border-blue-900",
		},
		{
			id: "weight_loss",
			title: "Weight Loss",
			description: "Burn fat and reduce body weight through exercise and nutrition",
			icon: TrendingDown,
			color: "green",
			gradient: "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
			iconBg: "bg-green-100 dark:bg-green-900/30",
			iconColor: "text-green-600 dark:text-green-400",
			borderColor: "border-green-200 dark:border-green-900",
		},
		{
			id: "healthy_body",
			title: "Healthy Body",
			description: "Maintain overall wellness, fitness, and good physical health",
			icon: Heart,
			color: "purple",
			gradient: "from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20",
			iconBg: "bg-purple-100 dark:bg-purple-900/30",
			iconColor: "text-purple-600 dark:text-purple-400",
			borderColor: "border-purple-200 dark:border-purple-900",
		},
	];

	// Auto-scroll chat messages
	useEffect(() => {
		chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [chatMessages]);

	// Send chat message to Gemini AI
	const sendChatMessage = async (messageText?: string) => {
		const textToSend = messageText || chatInput.trim();
		
		if (!textToSend || isChatLoading) return;

		const userMessage: ChatMessage = {
			id: Date.now().toString(),
			role: "user",
			content: textToSend,
			timestamp: new Date(),
		};

		setChatMessages((prev) => [...prev, userMessage]);
		setChatInput("");
		setIsChatLoading(true);

		try {
			// Create context from nutrition plan
			const goalContext = nutritionPlan ? `
User's Fitness Goal: ${selectedGoal}
Current Weight: ${nutritionPlan.currentWeight}kg
Target Weight: ${nutritionPlan.targetWeight}kg
BMI: ${nutritionPlan.bmi} (${nutritionPlan.bmiCategory})
Daily Calorie Target: ${nutritionPlan.targetCalories} cal
Protein: ${nutritionPlan.protein}g, Carbs: ${nutritionPlan.carbs}g, Fats: ${nutritionPlan.fats}g
Exercise Plan: ${nutritionPlan.exerciseRecommendation}
Timeline: ${nutritionPlan.goalTimeline}
` : '';

			const conversationHistory = chatMessages
				.map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
				.join("\n\n");

			const systemPrompt = `You are a professional fitness and nutrition coach helping a user achieve their fitness goals. Be supportive, motivating, and provide evidence-based advice.

${goalContext}

IMPORTANT: Format your response in a clear, human-readable way:
- Use short paragraphs (2-3 sentences each)
- remove any markdown formatting like **, * or _
- Add line breaks between paragraphs for readability
- Use bullet points (•) or numbered lists when listing items
- Start with a friendly greeting or acknowledgment
- End with encouragement
- Keep language simple and conversational
- Avoid technical jargon unless necessary

Example formatting:
"Great question! Let me help you with that.

Here are some key points:
• First important point
• Second important point
• Third important point

This will help you achieve your goals. Keep up the great work!"`;

			const prompt = `${systemPrompt}

${conversationHistory ? `Previous conversation:\n${conversationHistory}\n\n` : ""}User: ${textToSend}`;

			// Call Gemini API v1 with gemini-2.0-flash model (free, publicly available)
			const response = await fetch(
				`https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						contents: [{
							parts: [{ text: prompt }]
						}],
						generationConfig: {
							temperature: 0.7,
							topP: 1,
							topK: 1,
							maxOutputTokens: 2048,
						}
					}),
				}
			);

			if (!response.ok) {
				const errorText = await response.text();
				console.error('Gemini API Error:', response.status, errorText);
				throw new Error(`API Error: ${response.status} ${response.statusText}`);
			}

			const data = await response.json();
			
			// Safe fallback handling for response structure
			const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 
						 data?.candidates?.[0]?.output || 
						 "Sorry, I couldn't generate a response. Please try again.";

			const assistantMessage: ChatMessage = {
				id: (Date.now() + 1).toString(),
				role: "assistant",
				content: text,
				timestamp: new Date(),
			};

			setChatMessages((prev) => [...prev, assistantMessage]);
		} catch (error) {
			console.error("Chat error:", error);
			toast.error("Failed to get response. Please try again.");
		} finally {
			setIsChatLoading(false);
		}
	};

	const handleChatKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			sendChatMessage();
		}
	};

	// Load existing goal data on component mount
	useEffect(() => {
		const loadExistingGoal = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(`${API_URL}/goals/${userId}`);
				if (response.ok) {
					const data = await response.json();
					
					// Populate form with existing data
					setSelectedGoal(data.goal as GoalType);
					setUserData({
						age: data.age.toString(),
						gender: data.gender,
						height: data.height.toString(),
						currentWeight: data.currentWeight.toString(),
						targetWeight: data.targetWeight.toString(),
						activityLevel: data.activityLevel,
					});
					setNutritionPlan({
						bmi: data.bmi,
						bmiCategory: data.bmiCategory,
						bmr: data.bmr,
						tdee: data.tdee,
						targetCalories: data.targetCalories,
						protein: data.protein,
						carbs: data.carbs,
						fats: data.fats,
						waterIntake: data.waterIntake,
						weightDifference: data.weightDifference,
						estimatedWeeks: data.estimatedWeeks,
						exerciseRecommendation: data.exerciseRecommendation,
						goalTimeline: data.goalTimeline,
						currentWeight: data.currentWeight,
						targetWeight: data.targetWeight,
					});
					setStep(3); // Go directly to results
					setHasExistingGoal(true);
					toast.success("Loaded your existing goal!");
				}
			} catch (error) {
				console.error("Error loading goal:", error);
				// No toast for 404 - user simply doesn't have a goal yet
			} finally {
				setIsLoading(false);
			}
		};

		loadExistingGoal();
	}, []);

	// Load exercise stats when on step 3 (results page)
	useEffect(() => {
		const loadExerciseStats = async () => {
			if (step !== 3) return;

			setExerciseStatsLoading(true);
			try {
				const response = await fetch(`${API_URL}/goals/exercise/${userId}/stats?days=7`);
				if (response.ok) {
					const data = await response.json();
					setExerciseStats(data);
				}
			} catch (error) {
				console.error("Error loading exercise stats:", error);
			} finally {
				setExerciseStatsLoading(false);
			}
		};

		loadExerciseStats();
	}, [step]);

	const handleSelectGoal = (goalId: GoalType) => {
		setSelectedGoal(goalId);
	};

	const handleSaveGoal = async () => {
		if (!nutritionPlan || !selectedGoal) return;

		setIsSaving(true);
		try {
			const response = await fetch(`${API_URL}/goals/save`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId,
					goal: selectedGoal,
					gender: userData.gender,
					age: parseInt(userData.age),
					height: parseFloat(userData.height),
					currentWeight: parseFloat(userData.currentWeight),
					targetWeight: parseFloat(userData.targetWeight),
					activityLevel: userData.activityLevel,
					bmi: nutritionPlan.bmi,
					bmiCategory: nutritionPlan.bmiCategory,
					bmr: nutritionPlan.bmr,
					tdee: nutritionPlan.tdee,
					targetCalories: nutritionPlan.targetCalories,
					protein: nutritionPlan.protein,
					carbs: nutritionPlan.carbs,
					fats: nutritionPlan.fats,
					waterIntake: nutritionPlan.waterIntake,
					weightDifference: nutritionPlan.weightDifference,
					estimatedWeeks: nutritionPlan.estimatedWeeks,
					exerciseRecommendation: nutritionPlan.exerciseRecommendation,
					goalTimeline: nutritionPlan.goalTimeline,
				}),
			});

			const result = await response.json();

			if (response.ok) {
				setHasExistingGoal(true);
				toast.success(result.message);
			} else {
				toast.error(result.error || "Failed to save goal");
			}
		} catch (error) {
			console.error("Error saving goal:", error);
			toast.error("Failed to save goal. Please try again.");
		} finally {
			setIsSaving(false);
		}
	};

	const handleNext = () => {
		if (step === 1 && selectedGoal) {
			setStep(2);
		} else if (step === 2 && isUserDataValid()) {
			calculateNutritionPlan();
			setStep(3);
		}
	};

	const isUserDataValid = () => {
		return userData.age && userData.gender && userData.height && userData.currentWeight && userData.targetWeight && userData.activityLevel;
	};

	const calculateNutritionPlan = () => {
		const age = parseInt(userData.age);
		const currentWeight = parseFloat(userData.currentWeight);
		const targetWeight = parseFloat(userData.targetWeight);
		const height = parseFloat(userData.height);

		// Calculate weight difference
		const weightDifference = Math.abs(targetWeight - currentWeight);
		const isGaining = targetWeight > currentWeight;
		const isLosing = targetWeight < currentWeight;

		// Calculate BMI (current)
		const heightInMeters = height / 100;
		const bmi = currentWeight / (heightInMeters * heightInMeters);
		
		let bmiCategory = "";
		if (bmi < 18.5) bmiCategory = "Underweight";
		else if (bmi < 25) bmiCategory = "Normal weight";
		else if (bmi < 30) bmiCategory = "Overweight";
		else bmiCategory = "Obese";

		// Calculate BMR using Mifflin-St Jeor Equation (based on current weight)
		let bmr = 0;
		if (userData.gender === "male") {
			bmr = 10 * currentWeight + 6.25 * height - 5 * age + 5;
		} else {
			bmr = 10 * currentWeight + 6.25 * height - 5 * age - 161;
		}

		// Calculate TDEE (Total Daily Energy Expenditure)
		const activityMultipliers = {
			sedentary: 1.2,
			light: 1.375,
			moderate: 1.55,
			very_active: 1.725,
			extra_active: 1.9,
		};
		const tdee = bmr * activityMultipliers[userData.activityLevel as keyof typeof activityMultipliers];

		// Calculate target calories and timeline based on goal and weight difference
		let targetCalories = tdee;
		let proteinPerKg = 0;
		let exerciseRecommendation = "";
		let goalTimeline = "";
		let weeklyWeightChange = 0;
		let estimatedWeeks = 0;

		if (selectedGoal === "weight_loss") {
			// Adjust calorie deficit based on weight to lose
			if (weightDifference <= 5) {
				targetCalories = tdee - 300; // Smaller deficit for last few kg
				weeklyWeightChange = 0.3;
			} else if (weightDifference <= 15) {
				targetCalories = tdee - 500; // Standard deficit
				weeklyWeightChange = 0.5;
			} else {
				targetCalories = tdee - 600; // Larger deficit for significant weight loss
				weeklyWeightChange = 0.6;
			}
			proteinPerKg = 2.2; // Higher protein to preserve muscle
			estimatedWeeks = Math.ceil(weightDifference / weeklyWeightChange);
			exerciseRecommendation = "4-5 days/week: 30-45 min cardio + 30 min strength training";
			goalTimeline = `Target: Lose ${weightDifference}kg in ${estimatedWeeks} weeks (${weeklyWeightChange}kg/week)`;
		} else if (selectedGoal === "weight_gain") {
			// Adjust calorie surplus based on weight to gain
			if (weightDifference <= 5) {
				targetCalories = tdee + 300; // Smaller surplus for lean gains
				weeklyWeightChange = 0.3;
			} else if (weightDifference <= 15) {
				targetCalories = tdee + 500; // Standard surplus
				weeklyWeightChange = 0.5;
			} else {
				targetCalories = tdee + 600; // Larger surplus
				weeklyWeightChange = 0.6;
			}
			proteinPerKg = 2.0; // High protein for muscle building
			estimatedWeeks = Math.ceil(weightDifference / weeklyWeightChange);
			exerciseRecommendation = "5-6 days/week: Focus on compound lifts (Squats, Deadlifts, Bench Press)";
			goalTimeline = `Target: Gain ${weightDifference}kg in ${estimatedWeeks} weeks (${weeklyWeightChange}kg/week)`;
		} else {
			targetCalories = tdee; // Maintenance calories
			proteinPerKg = 1.8;
			estimatedWeeks = 0;
			exerciseRecommendation = "4-5 days/week: Mix of cardio (2 days) & strength (3 days)";
			goalTimeline = `Target: Maintain ${currentWeight}kg weight & improve overall fitness`;
		}

		// Calculate macros (based on current weight)
		const protein = currentWeight * proteinPerKg; // grams
		const proteinCalories = protein * 4;
		
		// Fats should be 25-30% of total calories
		const fatCalories = targetCalories * 0.27;
		const fats = fatCalories / 9; // grams
		
		// Remaining calories from carbs
		const carbCalories = targetCalories - proteinCalories - fatCalories;
		const carbs = carbCalories / 4; // grams

		// Water intake (ml) - 35ml per kg of body weight
		const waterIntake = currentWeight * 35;

		setNutritionPlan({
			bmr: Math.round(bmr),
			tdee: Math.round(tdee),
			targetCalories: Math.round(targetCalories),
			protein: Math.round(protein),
			carbs: Math.round(carbs),
			fats: Math.round(fats),
			bmi: Math.round(bmi * 10) / 10,
			bmiCategory,
			waterIntake: Math.round(waterIntake),
			exerciseRecommendation,
			goalTimeline,
			currentWeight,
			targetWeight,
			weightDifference: Math.round(weightDifference * 10) / 10,
			estimatedWeeks,
		});
	};

	const activityLevels = [
		{ value: "sedentary", label: "Sedentary", description: "Little or no exercise" },
		{ value: "light", label: "Light", description: "Exercise 1-3 days/week" },
		{ value: "moderate", label: "Moderate", description: "Exercise 3-5 days/week" },
		{ value: "very_active", label: "Very Active", description: "Exercise 6-7 days/week" },
		{ value: "extra_active", label: "Extra Active", description: "Very intense exercise daily" },
	];

	// Show loading state while fetching existing goal data
	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[60vh]">
				<div className="text-center space-y-4">
					<Loader2 className="size-12 animate-spin mx-auto text-blue-600" />
					<p className="text-muted-foreground">Loading your fitness goals...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			{/* Progress Indicator */}
			<div className="max-w-2xl mx-auto">
				<div className="flex items-center justify-center gap-2">
					{[1, 2, 3].map((s) => (
						<div key={s} className="flex items-center">
							<div
								className={`size-10 rounded-full flex items-center justify-center font-semibold transition-all ${
									step >= s
										? "bg-blue-600 text-white"
										: "bg-muted text-muted-foreground"
								}`}
							>
								{s}
							</div>
							{s < 3 && (
								<div
									className={`h-1 w-16 mx-2 transition-all ${
										step > s ? "bg-blue-600" : "bg-muted"
									}`}
								/>
							)}
						</div>
					))}
				</div>
				<div className="flex justify-between mt-2 text-xs text-muted-foreground">
					<span>Select Goal</span>
					<span>Your Details</span>
					<span>Your Plan</span>
				</div>
			</div>

			{/* STEP 1: Goal Selection */}
			{step === 1 && (
				<>
					<div className="text-center max-w-2xl mx-auto">
						<div className="flex items-center justify-center mb-4">
							<div className="p-3 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
								<Target className="size-8 text-blue-600 dark:text-blue-400" />
							</div>
						</div>
						<h1 className="text-3xl font-bold text-foreground">Set Your Fitness Goal</h1>
						<p className="text-muted-foreground mt-2">
							Choose your primary fitness objective to personalize your experience
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
						{goalOptions.map((goal) => {
							const Icon = goal.icon;
							const isSelected = selectedGoal === goal.id;
							
							return (
								<Card 
									key={goal.id}
									className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
										isSelected 
											? `${goal.borderColor} border-2 ring-2 ring-offset-2 ring-${goal.color}-500/50` 
											: "border-muted hover:border-muted-foreground/30"
									}`}
									onClick={() => handleSelectGoal(goal.id as GoalType)}
								>
									<CardContent className="pt-6 pb-6">
										<div className="space-y-4">
											<div className="flex flex-col items-center text-center space-y-4">
												<div className={`p-4 rounded-xl ${goal.iconBg} relative`}>
													<Icon className={`size-8 ${goal.iconColor}`} />
													{isSelected && (
														<div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
															<CheckCircle2 className="size-4 text-white" />
														</div>
													)}
												</div>
												<div>
													<h3 className="text-xl font-semibold text-foreground">
														{goal.title}
													</h3>
													<p className="text-sm text-muted-foreground mt-2 min-h-[40px]">
														{goal.description}
													</p>
												</div>
											</div>
											<Button 
												className="w-full"
												variant={isSelected ? "default" : "outline"}
												onClick={(e) => {
													e.stopPropagation();
													handleSelectGoal(goal.id as GoalType);
												}}
											>
												{isSelected ? "Selected" : "Select Goal"}
											</Button>
										</div>
									</CardContent>
								</Card>
							);
						})}
					</div>

					{selectedGoal && (
						<div className="flex justify-center">
							<Button size="lg" className="px-8" onClick={handleNext}>
								Continue to Details
							</Button>
						</div>
					)}
				</>
			)}

			{/* STEP 2: User Details Form */}
			{step === 2 && (
				<>
					<div className="text-center max-w-2xl mx-auto">
						<div className="flex items-center justify-center mb-4">
							<div className="p-3 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
								<User className="size-8 text-blue-600 dark:text-blue-400" />
							</div>
						</div>
						<h1 className="text-3xl font-bold text-foreground">Tell Us About Yourself</h1>
						<p className="text-muted-foreground mt-2">
							Help us create a personalized nutrition and exercise plan for you
						</p>
					</div>

					<Card className="max-w-3xl mx-auto">
						<CardContent className="pt-6 space-y-6">
							{/* Gender Selection */}
							<div className="space-y-3">
								<Label className="text-base font-semibold">Gender</Label>
								<div className="grid grid-cols-2 gap-4">
									<Button
										type="button"
										variant={userData.gender === "male" ? "default" : "outline"}
										className="h-auto py-4"
										onClick={() => setUserData({ ...userData, gender: "male" })}
									>
										Male
									</Button>
									<Button
										type="button"
										variant={userData.gender === "female" ? "default" : "outline"}
										className="h-auto py-4"
										onClick={() => setUserData({ ...userData, gender: "female" })}
									>
										Female
									</Button>
								</div>
							</div>

							{/* Age and Height */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<Label htmlFor="age">Age (years)</Label>
									<Input
										id="age"
										type="number"
										placeholder="25"
										value={userData.age}
										onChange={(e) => setUserData({ ...userData, age: e.target.value })}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="height">Height (cm)</Label>
									<Input
										id="height"
										type="number"
										placeholder="175"
										value={userData.height}
										onChange={(e) => setUserData({ ...userData, height: e.target.value })}
									/>
								</div>
							</div>

							{/* Current Weight and Target Weight */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<Label htmlFor="currentWeight" className="text-base font-semibold">
										Current Weight (kg)
									</Label>
									<Input
										id="currentWeight"
										type="number"
										placeholder="70"
										value={userData.currentWeight}
										onChange={(e) => setUserData({ ...userData, currentWeight: e.target.value })}
										className="text-lg"
									/>
									<p className="text-xs text-muted-foreground">Your current body weight</p>
								</div>
								<div className="space-y-2">
									<Label htmlFor="targetWeight" className="text-base font-semibold">
										Target Weight (kg)
									</Label>
									<Input
										id="targetWeight"
										type="number"
										placeholder="75"
										value={userData.targetWeight}
										onChange={(e) => setUserData({ ...userData, targetWeight: e.target.value })}
										className="text-lg"
									/>
									<p className="text-xs text-muted-foreground">Your desired goal weight</p>
								</div>
							</div>

							{/* Weight Difference Indicator */}
							{userData.currentWeight && userData.targetWeight && (
								<div className="p-4 rounded-lg bg-muted">
									<div className="flex items-center justify-center gap-2">
										<p className="text-sm text-muted-foreground">
											Weight Difference:
										</p>
										<p className={`text-lg font-bold ${
											parseFloat(userData.targetWeight) > parseFloat(userData.currentWeight)
												? "text-blue-600 dark:text-blue-400"
												: parseFloat(userData.targetWeight) < parseFloat(userData.currentWeight)
												? "text-green-600 dark:text-green-400"
												: "text-purple-600 dark:text-purple-400"
										}`}>
											{parseFloat(userData.targetWeight) > parseFloat(userData.currentWeight) && "+"}
											{Math.round((parseFloat(userData.targetWeight) - parseFloat(userData.currentWeight)) * 10) / 10} kg
										</p>
									</div>
								</div>
							)}

							{/* Activity Level */}
							<div className="space-y-3">
								<Label className="text-base font-semibold">Activity Level</Label>
								<div className="space-y-2">
									{activityLevels.map((level) => (
										<Card
											key={level.value}
											className={`cursor-pointer transition-all ${
												userData.activityLevel === level.value
													? "border-blue-600 border-2 bg-blue-50 dark:bg-blue-950/20"
													: "hover:border-muted-foreground/30"
											}`}
											onClick={() =>
												setUserData({
													...userData,
													activityLevel: level.value as UserData["activityLevel"],
												})
											}
										>
											<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
														<p className="font-semibold text-foreground">{level.label}</p>
														<p className="text-sm text-muted-foreground">
															{level.description}
														</p>
													</div>
													{userData.activityLevel === level.value && (
														<CheckCircle2 className="size-5 text-blue-600" />
													)}
												</div>
											</CardContent>
										</Card>
									))}
								</div>
							</div>
						</CardContent>
					</Card>

					<div className="flex justify-center gap-4">
						<Button variant="outline" size="lg" onClick={() => setStep(1)}>
							Back
						</Button>
						<Button
							size="lg"
							onClick={handleNext}
							disabled={!isUserDataValid()}
						>
							Generate My Plan
						</Button>
					</div>
				</>
			)}

			{/* STEP 3: Nutrition Plan Display */}
			{step === 3 && nutritionPlan && (
				<>
					<div className="text-center max-w-2xl mx-auto">
						<div className="flex items-center justify-center mb-4">
							<div className="p-3 rounded-full bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30">
								<CheckCircle2 className="size-8 text-green-600 dark:text-green-400" />
							</div>
						</div>
						<h1 className="text-3xl font-bold text-foreground">Your Personalized Plan</h1>
						<p className="text-muted-foreground mt-2">
							Based on your goal: <span className="font-semibold text-foreground">
								{goalOptions.find((g) => g.id === selectedGoal)?.title}
							</span>
						</p>
					</div>

					{/* Weight Progress Card */}
					<Card className={`max-w-6xl mx-auto ${
						selectedGoal === "weight_loss"
							? "border-green-200 dark:border-green-900 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20"
							: selectedGoal === "weight_gain"
							? "border-blue-200 dark:border-blue-900 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20"
							: "border-purple-200 dark:border-purple-900 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20"
					}`}>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Target className="size-5" />
								Your Weight Goal
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
								<div className="text-center p-4 rounded-lg bg-white/50 dark:bg-black/20">
									<p className="text-sm text-muted-foreground">Current Weight</p>
									<p className="text-3xl font-bold text-foreground">{nutritionPlan.currentWeight}</p>
									<p className="text-xs text-muted-foreground mt-1">kg</p>
								</div>
								<div className="text-center p-4 rounded-lg bg-white/50 dark:bg-black/20">
									<p className="text-sm text-muted-foreground">Target Weight</p>
									<p className="text-3xl font-bold text-foreground">{nutritionPlan.targetWeight}</p>
									<p className="text-xs text-muted-foreground mt-1">kg</p>
								</div>
								<div className="text-center p-4 rounded-lg bg-white/50 dark:bg-black/20">
									<p className="text-sm text-muted-foreground">To {selectedGoal === "weight_gain" ? "Gain" : selectedGoal === "weight_loss" ? "Lose" : "Change"}</p>
									<p className={`text-3xl font-bold ${
										selectedGoal === "weight_gain" 
											? "text-blue-600 dark:text-blue-400"
											: selectedGoal === "weight_loss"
											? "text-green-600 dark:text-green-400"
											: "text-purple-600 dark:text-purple-400"
									}`}>
										{nutritionPlan.weightDifference}
									</p>
									<p className="text-xs text-muted-foreground mt-1">kg</p>
								</div>
								<div className="text-center p-4 rounded-lg bg-white/50 dark:bg-black/20">
									<p className="text-sm text-muted-foreground">Estimated Time</p>
									<p className="text-3xl font-bold text-foreground">
										{nutritionPlan.estimatedWeeks > 0 ? nutritionPlan.estimatedWeeks : "-"}
									</p>
									<p className="text-xs text-muted-foreground mt-1">
										{nutritionPlan.estimatedWeeks > 0 ? `weeks (~${Math.ceil(nutritionPlan.estimatedWeeks / 4)} months)` : "maintenance"}
									</p>
							</div>
						</div>
					</CardContent>
				</Card>

					{/* Exercise Progress Card */}
					{exerciseStats && (
						<Card className="max-w-6xl mx-auto border-orange-200 dark:border-orange-900 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Activity className="size-5 text-orange-600" />
									Your Exercise Progress (Last 7 Days)
								</CardTitle>
								<CardDescription>
									Track your workout consistency and calories burned
								</CardDescription>
							</CardHeader>
							<CardContent>
								{/* Overall Stats Grid */}
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
									<div className="text-center p-4 rounded-lg bg-white/50 dark:bg-black/20">
										<p className="text-sm text-muted-foreground">Total Sessions</p>
										<p className="text-3xl font-bold text-foreground">{exerciseStats.totalSessions}</p>
										<p className="text-xs text-muted-foreground mt-1">workouts</p>
									</div>
									<div className="text-center p-4 rounded-lg bg-white/50 dark:bg-black/20">
										<p className="text-sm text-muted-foreground">Total Time</p>
										<p className="text-3xl font-bold text-foreground">
											{Math.round(exerciseStats.totalDuration / 60)}
										</p>
										<p className="text-xs text-muted-foreground mt-1">minutes</p>
									</div>
									<div className="text-center p-4 rounded-lg bg-white/50 dark:bg-black/20">
										<p className="text-sm text-muted-foreground">Calories Burned</p>
										<p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
											{exerciseStats.totalCalories}
										</p>
										<p className="text-xs text-muted-foreground mt-1">kcal</p>
									</div>
									<div className="text-center p-4 rounded-lg bg-white/50 dark:bg-black/20">
										<p className="text-sm text-muted-foreground">Total Reps</p>
										<p className="text-3xl font-bold text-foreground">{exerciseStats.totalReps}</p>
										<p className="text-xs text-muted-foreground mt-1">repetitions</p>
									</div>
								</div>

								{/* Exercise Breakdown */}
								{Object.keys(exerciseStats.exerciseBreakdown).length > 0 && (
									<div className="space-y-4">
										<h3 className="text-base font-semibold text-foreground">Exercise Breakdown</h3>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											{Object.entries(exerciseStats.exerciseBreakdown).map(([exercise, data]) => (
												<div key={exercise} className="p-4 rounded-lg bg-white/70 dark:bg-black/30 border border-orange-200 dark:border-orange-900">
													<div className="flex items-center justify-between mb-3">
														<h4 className="text-sm font-semibold text-foreground capitalize">
															{exercise === 'pushup' ? 'Push-ups' : exercise === 'squat' ? 'Squats' : 'Plank'}
														</h4>
														<span className="text-xs bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 px-2 py-1 rounded">
															{data.count} sessions
														</span>
													</div>
													<div className="space-y-2">
														<div className="flex justify-between text-sm">
															<span className="text-muted-foreground">Reps:</span>
															<span className="font-medium text-foreground">{data.totalReps}</span>
														</div>
														<div className="flex justify-between text-sm">
															<span className="text-muted-foreground">Time:</span>
															<span className="font-medium text-foreground">
																{Math.round(data.totalDuration / 60)}min
															</span>
														</div>
														<div className="flex justify-between text-sm">
															<span className="text-muted-foreground">Calories:</span>
															<span className="font-medium text-orange-600 dark:text-orange-400">
																{data.totalCalories} kcal
															</span>
														</div>
													</div>
												</div>
											))}
										</div>
									</div>
								)}

								{/* Progress Bar towards Goal */}
								{nutritionPlan && (
									<div className="mt-6 p-4 rounded-lg bg-white/70 dark:bg-black/30 border border-orange-200 dark:border-orange-900">
										<div className="flex items-center justify-between mb-2">
											<h3 className="text-sm font-semibold text-foreground">Weekly Goal Progress</h3>
											<span className="text-xs text-muted-foreground">
												{exerciseStats.totalSessions} / {nutritionPlan.estimatedWeeks > 0 ? 5 : 4} sessions
											</span>
										</div>
										<div className="w-full bg-muted rounded-full h-4 overflow-hidden">
											<div
												className="bg-gradient-to-r from-orange-500 to-red-500 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
												style={{
													width: `${Math.min((exerciseStats.totalSessions / (nutritionPlan.estimatedWeeks > 0 ? 5 : 4)) * 100, 100)}%`,
												}}
											>
												{exerciseStats.totalSessions > 0 && (
													<span className="text-xs font-bold text-white">
														{Math.round((exerciseStats.totalSessions / (nutritionPlan.estimatedWeeks > 0 ? 5 : 4)) * 100)}%
													</span>
												)}
											</div>
										</div>
										<p className="text-xs text-muted-foreground mt-2 text-center">
											{exerciseStats.totalSessions >= (nutritionPlan.estimatedWeeks > 0 ? 5 : 4)
												? "🎉 Weekly goal achieved! Keep it up!"
												: `${(nutritionPlan.estimatedWeeks > 0 ? 5 : 4) - exerciseStats.totalSessions} more session(s) to reach your weekly goal`}
										</p>
									</div>
								)}
							</CardContent>
						</Card>
					)}

					{/* No Exercise Data Message */}
					{exerciseStats && exerciseStats.totalSessions === 0 && (
						<Card className="max-w-6xl mx-auto border-orange-200 dark:border-orange-900 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
							<CardContent className="py-8 text-center">
								<Activity className="size-12 text-muted-foreground mx-auto mb-4" />
								<h3 className="text-lg font-semibold text-foreground mb-2">No Exercise Data Yet</h3>
								<p className="text-muted-foreground mb-4">
									Start tracking your workouts with our AI-powered exercise tracker!
								</p>
								<Button 
									onClick={() => window.location.href = '/dashboard/posture'}
									className="gap-2"
								>
									<Activity className="size-4" />
									Start Your First Workout
								</Button>
							</CardContent>
						</Card>
					)}

					{/* BMI Card */}
					<Card className="max-w-6xl mx-auto">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<User className="size-5" />
								Your Body Metrics
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div className="text-center p-4 rounded-lg bg-muted">
									<p className="text-sm text-muted-foreground">BMI</p>
									<p className="text-2xl font-bold text-foreground">{nutritionPlan.bmi}</p>
									<p className="text-xs text-muted-foreground mt-1">
										{nutritionPlan.bmiCategory}
									</p>
								</div>
								<div className="text-center p-4 rounded-lg bg-muted">
									<p className="text-sm text-muted-foreground">BMR</p>
									<p className="text-2xl font-bold text-foreground">
										{nutritionPlan.bmr}
									</p>
									<p className="text-xs text-muted-foreground mt-1">cal/day at rest</p>
								</div>
								<div className="text-center p-4 rounded-lg bg-muted">
									<p className="text-sm text-muted-foreground">TDEE</p>
									<p className="text-2xl font-bold text-foreground">
										{nutritionPlan.tdee}
									</p>
									<p className="text-xs text-muted-foreground mt-1">
										cal/day maintenance
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Daily Nutrition Target */}
					<Card className="max-w-6xl mx-auto border-blue-200 dark:border-blue-900 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Flame className="size-5 text-orange-600" />
								Daily Calorie Target
							</CardTitle>
							<CardDescription>
								{nutritionPlan.goalTimeline}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="text-center">
								<p className="text-5xl font-bold text-foreground">
									{nutritionPlan.targetCalories}
								</p>
								<p className="text-muted-foreground mt-2">calories per day</p>
						</div>
					</CardContent>
				</Card>

					{/* Macronutrients Breakdown */}
					<Card className="max-w-6xl mx-auto">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Apple className="size-5" />
								Daily Macronutrients
							</CardTitle>
							<CardDescription>
								Your daily macro targets to achieve your goal
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								{/* Protein */}
								<div className="space-y-3">
									<div className="flex items-center gap-3">
										<div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30">
											<Drumstick className="size-6 text-red-600 dark:text-red-400" />
			</div>
										<div>
											<p className="text-sm text-muted-foreground">Protein</p>
											<p className="text-2xl font-bold text-foreground">
												{nutritionPlan.protein}g
												</p>
											</div>
										</div>
									<div className="w-full bg-muted rounded-full h-3">
										<div
											className="bg-red-600 h-3 rounded-full"
											style={{
												width: `${(nutritionPlan.protein * 4 / nutritionPlan.targetCalories) * 100}%`,
											}}
										/>
									</div>
									<p className="text-xs text-muted-foreground">
										{Math.round((nutritionPlan.protein * 4 / nutritionPlan.targetCalories) * 100)}% of daily calories
									</p>
									</div>

								{/* Carbs */}
								<div className="space-y-3">
									<div className="flex items-center gap-3">
										<div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
											<Wheat className="size-6 text-yellow-600 dark:text-yellow-400" />
										</div>
										<div>
											<p className="text-sm text-muted-foreground">Carbs</p>
											<p className="text-2xl font-bold text-foreground">
												{nutritionPlan.carbs}g
											</p>
										</div>
									</div>
									<div className="w-full bg-muted rounded-full h-3">
										<div
											className="bg-yellow-600 h-3 rounded-full"
											style={{
												width: `${(nutritionPlan.carbs * 4 / nutritionPlan.targetCalories) * 100}%`,
											}}
										/>
									</div>
									<p className="text-xs text-muted-foreground">
										{Math.round((nutritionPlan.carbs * 4 / nutritionPlan.targetCalories) * 100)}% of daily calories
									</p>
								</div>

								{/* Fats */}
								<div className="space-y-3">
									<div className="flex items-center gap-3">
										<div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/30">
											<Beef className="size-6 text-orange-600 dark:text-orange-400" />
										</div>
										<div>
											<p className="text-sm text-muted-foreground">Fats</p>
											<p className="text-2xl font-bold text-foreground">
												{nutritionPlan.fats}g
											</p>
										</div>
									</div>
									<div className="w-full bg-muted rounded-full h-3">
										<div
											className="bg-orange-600 h-3 rounded-full"
											style={{
												width: `${(nutritionPlan.fats * 9 / nutritionPlan.targetCalories) * 100}%`,
											}}
										/>
									</div>
									<p className="text-xs text-muted-foreground">
										{Math.round((nutritionPlan.fats * 9 / nutritionPlan.targetCalories) * 100)}% of daily calories
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Exercise & Water */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Activity className="size-5" />
									Exercise Plan
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-foreground font-medium">
									{nutritionPlan.exerciseRecommendation}
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									💧 Water Intake
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-3xl font-bold text-foreground">
									{(nutritionPlan.waterIntake / 1000).toFixed(1)}L
								</p>
								<p className="text-sm text-muted-foreground mt-1">
									{nutritionPlan.waterIntake}ml per day
								</p>
							</CardContent>
						</Card>
					</div>

					{/* Action Buttons */}
					<div className="flex justify-center gap-4 flex-wrap">
						{hasExistingGoal && (
							<Button 
								variant="ghost" 
								size="lg" 
								onClick={() => {
									setStep(1);
									setSelectedGoal(null);
									setUserData({
										age: "",
										gender: "",
										height: "",
										currentWeight: "",
										targetWeight: "",
										activityLevel: "",
									});
									setNutritionPlan(null);
									setHasExistingGoal(false);
								}}
							>
								Create New Goal
							</Button>
						)}
						<Button variant="outline" size="lg" onClick={() => setStep(2)}>
							Edit Details
						</Button>
						<Button size="lg" onClick={handleSaveGoal} disabled={isSaving}>
							{isSaving ? (
								<>
									<Loader2 className="size-4 mr-2 animate-spin" />
									Saving...
								</>
							) : (
								<>
									<Target className="size-4 mr-2" />
									{hasExistingGoal ? "Update My Plan" : "Save My Plan"}
								</>
							)}
						</Button>
					</div>

					{/* Tips Card */}
					<Card className="max-w-6xl mx-auto border-green-200 dark:border-green-900 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
				<CardContent className="pt-6">
							<h3 className="text-lg font-semibold text-foreground mb-3">
								💪 Pro Tips for Success
							</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>✓ Track your meals daily to stay within your calorie target</li>
								<li>✓ Eat protein with every meal to maintain muscle mass</li>
								<li>✓ Stay consistent with your exercise routine</li>
								<li>✓ Get 7-8 hours of quality sleep every night</li>
								<li>✓ Drink water throughout the day, especially before meals</li>
								<li>✓ Take progress photos and measurements weekly</li>
							</ul>
				</CardContent>
			</Card>

					{/* AI Fitness Coach Chatbot */}
					<Card className="max-w-6xl mx-auto border-purple-200 dark:border-purple-900 shadow-lg">
						<CardHeader className="border-b bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
							<div className="flex items-center justify-between">
								<CardTitle className="flex items-center gap-2">
									<Brain className="size-5 text-purple-600 dark:text-purple-400" />
									AI Fitness Coach
								</CardTitle>
								<Button
									variant={showChat ? "default" : "outline"}
									size="sm"
									onClick={() => setShowChat(!showChat)}
								>
									<MessageCircle className="size-4 mr-2" />
									{showChat ? "Hide" : "Ask Questions"}
								</Button>
							</div>
							{!showChat && (
								<p className="text-sm text-muted-foreground mt-2">
									Get personalized advice about your fitness goals, nutrition, and workouts
								</p>
							)}
						</CardHeader>

						{showChat && (
							<CardContent className="p-0">
								{/* Chat Messages Area */}
								<div className="h-[400px] overflow-y-auto p-4 space-y-3">
									{chatMessages.length === 0 && (
										<div className="h-full flex flex-col items-center justify-center text-center space-y-4">
											<div className="p-4 rounded-full bg-muted/50">
												<Bot className="size-10 text-muted-foreground" />
											</div>
											<div>
												<h3 className="text-lg font-semibold text-foreground">
													Ask Your AI Coach
												</h3>
												<p className="text-sm text-muted-foreground mt-1 max-w-md">
													I can help you with workout tips, nutrition advice, and answering questions about your personalized fitness plan
												</p>
											</div>
											<div className="flex flex-wrap gap-2 justify-center max-w-2xl">
												<Button
													variant="outline"
													size="sm"
													onClick={() => sendChatMessage("What are the best exercises for my goal?")}
												>
													Best exercises for my goal?
												</Button>
												<Button
													variant="outline"
													size="sm"
													onClick={() => sendChatMessage("How should I track my progress?")}
												>
													How to track progress?
												</Button>
												<Button
													variant="outline"
													size="sm"
													onClick={() => sendChatMessage("What foods should I eat more of?")}
												>
													What foods to eat?
												</Button>
											</div>
										</div>
									)}

									{chatMessages.map((message) => (
										<div
											key={message.id}
											className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
										>
											{message.role === "assistant" && (
												<div className="p-2 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 shrink-0 h-fit">
													<Bot className="size-4 text-purple-600 dark:text-purple-400" />
												</div>
											)}
											<div
												className={`max-w-[80%] rounded-xl px-3 py-2 ${
													message.role === "user"
														? "bg-primary text-primary-foreground"
														: "bg-muted text-foreground"
												}`}
											>
												<p className="text-sm whitespace-pre-wrap leading-relaxed">
													{message.content}
												</p>
												<p className="text-xs opacity-60 mt-1">
													{message.timestamp.toLocaleTimeString([], {
														hour: "2-digit",
														minute: "2-digit",
													})}
												</p>
											</div>
											{message.role === "user" && (
												<div className="p-2 rounded-full bg-primary shrink-0 h-fit">
													<User className="size-4 text-primary-foreground" />
												</div>
											)}
										</div>
									))}

									{isChatLoading && (
										<div className="flex gap-2 justify-start">
											<div className="p-2 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 shrink-0 h-fit">
												<Bot className="size-4 text-purple-600 dark:text-purple-400" />
											</div>
											<div className="bg-muted rounded-xl px-3 py-2">
												<div className="flex items-center gap-2">
													<Loader2 className="size-4 animate-spin text-muted-foreground" />
													<p className="text-sm text-muted-foreground">Thinking...</p>
												</div>
											</div>
										</div>
									)}

									<div ref={chatMessagesEndRef} />
								</div>

								{/* Chat Input Area */}
								<div className="p-4 border-t bg-muted/30">
									<div className="flex gap-2">
										<Input
											value={chatInput}
											onChange={(e) => setChatInput(e.target.value)}
											onKeyPress={handleChatKeyPress}
											placeholder="Ask about your fitness plan, nutrition, or workouts..."
											disabled={isChatLoading}
											className="flex-1"
										/>
										<Button
											onClick={() => sendChatMessage()}
											disabled={!chatInput.trim() || isChatLoading}
											size="icon"
										>
											{isChatLoading ? (
												<Loader2 className="size-4 animate-spin" />
											) : (
												<Send className="size-4" />
											)}
										</Button>
									</div>
									<p className="text-xs text-muted-foreground mt-2 text-center">
										Press Enter to send • AI-powered by Gemini
									</p>
								</div>
							</CardContent>
						)}
					</Card>
				</>
			)}
		</div>
	);
}

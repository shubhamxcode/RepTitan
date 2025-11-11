# Exercise Tracking System - Implementation Guide

## Overview
A complete exercise tracking system using MediaPipe for pose detection that saves workout data to the database and displays progress toward user fitness goals.

## What Was Implemented

### 1. Database Schema (Prisma)
**File:** `apps/server/prisma/schema/schema.prisma`

Added a new `ExerciseSession` model to store workout data:
- `exerciseType`: Type of exercise (pushup, squat, plank)
- `repsCompleted`: Number of repetitions
- `duration`: Session duration in seconds
- `caloriesBurned`: Estimated calories burned (auto-calculated)
- `averageFormQuality`: Average form quality percentage (0-100)
- `sessionDate`: When the workout was performed

**Database Status:** ✅ Schema synced to database successfully

### 2. Backend API Endpoints
**File:** `apps/server/src/routers/goals.ts`

#### New Endpoints:

**POST `/goals/exercise/save`**
- Saves a completed exercise session
- Auto-calculates calories burned based on exercise type and duration
- Request body:
```json
{
  "userId": 1,
  "exerciseType": "pushup",
  "repsCompleted": 20,
  "duration": 180,
  "averageFormQuality": 85
}
```

**GET `/goals/exercise/:userId`**
- Retrieves user's exercise sessions
- Optional query params: `startDate`, `endDate`, `limit`
- Returns array of exercise sessions

**GET `/goals/exercise/:userId/stats`**
- Gets aggregated exercise statistics
- Optional query param: `days` (default: 7)
- Returns:
  - Total sessions, duration, calories, reps
  - Average form quality
  - Breakdown by exercise type

### 3. Exercise Tracker Component
**File:** `apps/web/src/components/ExerciseTracker.tsx`

#### New Features:
- ✅ **Save Workout Button**: Saves session data to database
- ✅ **Form Quality Tracking**: Tracks correct form percentage throughout workout
- ✅ **Success Toast**: Shows calories burned and session summary
- ✅ **Session Saved State**: Prevents duplicate saves

#### How It Works:
1. User starts workout → MediaPipe tracks movements
2. Component tracks form quality in real-time
3. User stops workout → "Save Workout" button appears
4. Click save → Data sent to backend with:
   - Exercise type
   - Reps completed
   - Duration
   - Average form quality
5. Backend calculates calories and saves to database
6. Success message shows calories burned

### 4. Goals Page Progress Visualization
**File:** `apps/web/src/routes/dashboard/goals.tsx`

#### New Features:

**Exercise Progress Card** (displays when user has workout data):
- **Overall Stats Grid:**
  - Total sessions (last 7 days)
  - Total workout time
  - Total calories burned
  - Total reps completed

- **Exercise Breakdown:**
  - Individual cards for each exercise type
  - Shows sessions, reps, time, calories per exercise

- **Weekly Goal Progress Bar:**
  - Tracks progress toward recommended weekly sessions
  - Target: 5 sessions for weight loss/gain, 4 for maintenance
  - Visual progress bar with percentage

**No Data State:**
- Shows when user hasn't completed any workouts
- Includes CTA button to start first workout

## Calorie Calculation
Backend automatically estimates calories burned based on:
- **Push-ups:** ~7 cal/min
- **Squats:** ~8 cal/min
- **Plank:** ~3 cal/min

Formula: `calories = (cal_per_min × duration_in_minutes)`

## Usage Flow

### For Users:
1. **Complete Workout:**
   - Go to Dashboard → Posture (Exercise Tracker)
   - Select exercise type (pushup, squat, plank)
   - Click "Start" → Perform exercises
   - MediaPipe tracks movements and counts reps
   - Click "Stop" when done

2. **Save Session:**
   - Click "Save Workout" button
   - See success message with calories burned
   - Data automatically saved to database

3. **Track Progress:**
   - Go to Dashboard → Goals
   - Scroll to "Exercise Progress" section
   - View last 7 days statistics
   - See progress bar toward weekly goal
   - Check exercise breakdown by type

### For Developers:

#### Testing the API:
```bash
# Save a workout session
curl -X POST http://localhost:3001/goals/exercise/save \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "exerciseType": "pushup",
    "repsCompleted": 25,
    "duration": 120,
    "averageFormQuality": 90
  }'

# Get user's exercise stats
curl http://localhost:3001/goals/exercise/1/stats?days=7

# Get all sessions
curl http://localhost:3001/goals/exercise/1
```

#### Database Query Examples:
```typescript
// Get all exercise sessions for a user
const sessions = await prisma.exerciseSession.findMany({
  where: { userId: 1 },
  orderBy: { sessionDate: 'desc' }
});

// Get sessions for specific date range
const sessions = await prisma.exerciseSession.findMany({
  where: {
    userId: 1,
    sessionDate: {
      gte: new Date('2025-01-01'),
      lte: new Date('2025-01-31')
    }
  }
});

// Get total calories burned
const stats = await prisma.exerciseSession.aggregate({
  where: { userId: 1 },
  _sum: { caloriesBurned: true }
});
```

## Features

### ✅ Implemented
- Real-time exercise tracking with MediaPipe
- Automatic rep counting (pushups, squats)
- Form quality tracking
- Session saving to database
- Calorie estimation
- Weekly progress visualization
- Exercise breakdown by type
- Progress bar toward weekly goals
- Last 7 days statistics

### 🔄 Future Enhancements
- Weight-based calorie calculations (currently uses average 70kg)
- Historical charts/graphs
- Workout streaks and badges
- Exercise recommendations based on goals
- Personal records tracking
- Social sharing of achievements
- Custom workout routines

## Technical Details

### MediaPipe Integration
- Uses pose detection landmarks (33 body points)
- Tracks angles for exercise-specific movements
- Real-time form feedback
- FPS monitoring for performance

### Form Quality Calculation
```typescript
// Calculated as percentage of frames with correct form
const averageFormQuality = 
  (correctFormFrames / totalFrames) × 100
```

### Progress Bar Logic
```typescript
// Weekly goal: 5 sessions for weight loss/gain, 4 for maintenance
const targetSessions = nutritionPlan.estimatedWeeks > 0 ? 5 : 4;
const progress = (completedSessions / targetSessions) × 100;
```

## Files Modified/Created

### Created:
- `apps/server/src/routers/goals.ts` (exercise endpoints added)
- `EXERCISE_TRACKING_GUIDE.md` (this file)

### Modified:
- `apps/server/prisma/schema/schema.prisma`
- `apps/web/src/components/ExerciseTracker.tsx`
- `apps/web/src/routes/dashboard/goals.tsx`

## Environment Variables
No new environment variables needed. Uses existing:
- `VITE_API_URL` - Backend API URL (default: http://localhost:3001)
- `DATABASE_URL` - PostgreSQL connection string

## Next Steps
1. Start the development servers:
```bash
# Terminal 1 - Backend
cd apps/server
npm run dev

# Terminal 2 - Frontend
cd apps/web
npm run dev
```

2. Test the flow:
   - Login to the app
   - Set up a fitness goal
   - Go to Posture page
   - Complete a workout
   - Save the session
   - Return to Goals page
   - View progress statistics

## Support
For issues or questions about this implementation, refer to:
- MediaPipe documentation: https://google.github.io/mediapipe/
- Prisma documentation: https://www.prisma.io/docs/
- Original exercise detection logic: `apps/web/src/lib/exerciseDetection.ts`

---

**Status:** ✅ Fully Implemented and Tested
**Last Updated:** November 11, 2025


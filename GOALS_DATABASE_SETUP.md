# Goals Database Setup Guide

## 🎯 What Was Implemented

I've added a complete **Save & Update Goals** feature that stores user fitness goals in the database!

---

## 📊 Database Changes

### Updated Schema (`UserGoalDetail` Model)

The schema now stores:

#### User Input Data:
- `goal` - "weight_loss", "weight_gain", or "healthy_body"
- `gender` - User's gender
- `age` - User's age
- `height` - Height in cm
- `currentWeight` - Current weight in kg
- `targetWeight` - Target weight in kg
- `activityLevel` - Activity level

#### Calculated Nutrition Plan:
- `bmi`, `bmiCategory` - Body Mass Index
- `bmr`, `tdee` - Metabolism calculations
- `targetCalories` - Daily calorie goal
- `protein`, `carbs`, `fats` - Macro targets
- `waterIntake` - Daily water intake
- `weightDifference` - Kg to gain/lose
- `estimatedWeeks` - Timeline to goal
- `exerciseRecommendation` - Workout plan
- `goalTimeline` - Goal description

#### Relations:
- Linked to `User` model (one-to-one)
- Cascading delete (if user deleted, goal deleted)

---

## 🔧 Backend API Endpoints Created

### 1. **GET `/goals/:userId`**
- Loads existing goal data for a user
- Returns 404 if no goal exists

### 2. **POST `/goals/save`**
- Creates new goal OR updates existing goal
- Automatically detects if user already has a goal
- Returns success message

### 3. **DELETE `/goals/:userId`**
- Deletes user's goal data

---

## 💻 Frontend Features

### 1. **Auto-Load Existing Goals**
- When page loads, checks if user has saved goal
- If yes, loads data and shows results directly (Step 3)
- If no, starts from Step 1

### 2. **Save/Update Button**
- Saves all goal data to database
- Shows "Save My Plan" (first time)
- Shows "Update My Plan" (existing goal)
- Loading state with spinner
- Success/error toast notifications

### 3. **Create New Goal Button**
- Appears when user has existing goal
- Resets form to start fresh
- Clears all fields back to Step 1

### 4. **Loading States**
- Initial loading spinner while fetching data
- Save button disabled during save
- Toast notifications for feedback

---

## 🚀 Setup Instructions

### Step 1: Push Database Schema

You need to push the updated schema to your Neon DB:

```bash
cd /home/shubhamvarshney/webdevelopment/RepTitan-fullstack/RepTitan

# Generate Prisma client with new schema
pnpm db:generate

# Push schema changes to Neon DB
pnpm db:push
```

### Step 2: Restart Development Server

```bash
# Restart the server to load new Prisma client
pnpm dev:server

# In another terminal, restart the web app
pnpm dev:web
```

### Step 3: Test the Feature

1. Go to `/dashboard/goals`
2. Fill out the form and click "Generate My Plan"
3. Click "Save My Plan" button
4. Refresh the page - your goal should auto-load!
5. Make changes and click "Update My Plan"

---

## 🔍 How It Works

### Flow for New User:
```
1. Page loads → No goal found → Start at Step 1
2. User selects goal → Step 2 → Enters details → Step 3
3. Click "Save My Plan" → Data saved to DB
4. Refresh page → Goal auto-loads → Jump to Step 3
```

### Flow for Returning User:
```
1. Page loads → Goal found → Auto-load data → Jump to Step 3
2. Click "Edit Details" → Modify data → Save
3. Click "Update My Plan" → Update DB
4. Click "Create New Goal" → Start fresh from Step 1
```

---

## 📝 Environment Variables

Make sure your `.env` file has:

```env
# Database
DATABASE_URL="your-neon-db-connection-string"

# CORS (for API calls)
CORS_ORIGIN="http://localhost:3001"
```

And in your web app, create `.env` (or `.env.local`):

```env
VITE_API_URL="http://localhost:3000"
```

---

## 🔐 Important Notes

### User ID
Currently using hardcoded `userId = 1` for demo purposes.

**For production**, replace this with actual user authentication:

```typescript
// Get from auth context
const { user } = useAuth();
const userId = user.id;
```

### API Security
Add authentication middleware to protect routes:

```typescript
// Example middleware
const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

router.post("/save", requireAuth, async (req, res) => {
  // Only allow users to save their own data
  if (req.body.userId !== req.user.id) {
    return res.status(403).json({ error: "Forbidden" });
  }
  // ... rest of code
});
```

---

## 🎨 UI Features

### Toast Notifications:
- ✅ "Loaded your existing goal!" - on page load
- ✅ "Goal saved successfully" - first save
- ✅ "Goal updated successfully" - update
- ❌ Error messages if save fails

### Button States:
- "Save My Plan" (new goal)
- "Update My Plan" (existing goal)
- "Saving..." (loading state)
- "Create New Goal" (reset form)

---

## 🐛 Troubleshooting

### Error: "Failed to save goal"
- Check if server is running: `pnpm dev:server`
- Check database connection in `.env`
- Check browser console for API errors

### Error: Prisma client error
- Run: `pnpm db:generate`
- Restart server

### Data not loading
- Check if `DATABASE_URL` is correct
- Check if schema was pushed: `pnpm db:push`
- Check browser network tab for API calls

---

## ✅ Testing Checklist

- [ ] Database schema pushed successfully
- [ ] Can create new goal
- [ ] Goal saves to database
- [ ] Page refresh loads saved goal
- [ ] Can update existing goal
- [ ] "Create New Goal" resets form
- [ ] Toast notifications appear
- [ ] Loading states work correctly


# 🎯 Quick Demo - AI Workout Tracker

## What You Just Got! 🚀

A **complete AI-powered workout tracking system** with real-time form correction using MediaPipe Pose detection!

## 📸 What It Looks Like

### 1. Exercise Selection Screen
```
┌─────────────────────────────────────────────────┐
│  AI Workout Tracker                             │
│  Select an exercise to start tracking           │
├─────────────────────────────────────────────────┤
│                                                  │
│   💪        🦵        🏋️        🎯        ⚡    │
│ Push-ups   Squats    Plank    Sit-ups  Jumping  │
│                                         Jacks    │
│                                                  │
└─────────────────────────────────────────────────┘
```

### 2. Live Tracking Screen
```
┌─────────────────────────────────────────────────┐
│  ← Back to Exercises    [▶ Start] [↻ Reset]    │
├─────────────────────────────────────────────────┤
│                                                  │
│  ╔══════════ VIDEO FEED ══════════╗            │
│  ║                                 ║            │
│  ║    [Skeleton Overlay]           ║            │
│  ║    • • • skeleton dots          ║            │
│  ║    connected by lines           ║            │
│  ║                                 ║            │
│  ║  Reps: 12     Time: 2:45        ║            │
│  ║  ✅ Good form! Keep going       ║            │
│  ╚═════════════════════════════════╝            │
│                                                  │
│  Total Reps: 12  |  Time: 2:45  |  Form: ✓     │
│                                                  │
└─────────────────────────────────────────────────┘
```

## 🎬 Step-by-Step Usage

### Step 1: Start Your Dev Server
```bash
cd apps/web
pnpm dev
```

### Step 2: Navigate to Workout Tracker
1. Go to `http://localhost:3001`
2. Log into your dashboard
3. Click **"AI Workout Tracker"** in the sidebar

### Step 3: Select an Exercise
Click on any exercise card:
- 💪 **Push-ups** - Upper body
- 🦵 **Squats** - Lower body  
- 🏋️ **Plank** - Core hold
- 🎯 **Sit-ups** - Abs
- ⚡ **Jumping Jacks** - Cardio

### Step 4: Grant Camera Permission
When you click "Start", your browser will ask for camera access. Click **Allow**.

### Step 5: Position Yourself
```
Good Setup:
✓ Full body visible in frame
✓ Side view for push-ups/planks
✓ Good lighting
✓ Clear background

Bad Setup:
✗ Only upper body visible
✗ Poor lighting
✗ Busy background
✗ Too close to camera
```

### Step 6: Start Exercising!
- Green overlay = ✅ Good form
- Yellow overlay = ⚠️ Fix form
- Real-time rep counting
- Instant feedback

## 🎮 Live Features

### Real-Time Feedback Examples

**Push-ups:**
- "Good! Arms extended" (at top)
- "Go lower" (during descent)
- "Perfect depth!" (at 90° elbow angle)
- "Keep your body straight!" (if sagging)

**Squats:**
- "Standing position" (at top)
- "Go deeper for full squat" (partial squat)
- "Excellent deep squat!" (thighs parallel)
- "Keep your back straight!" (if hunched)

**Plank:**
- "Holding! 15s" (good position)
- "Hips too high!" (needs adjustment)
- "Hips sagging! Engage core" (losing form)

## 🔥 Key Features

1. **Automatic Rep Counting**
   - No manual counting needed
   - Accurate detection using joint angles
   - Visual rep counter on screen

2. **Form Correction**
   - Real-time angle calculations
   - Instant feedback on posture
   - Color-coded alerts (green = good, yellow = fix)

3. **Session Tracking**
   - Time elapsed
   - Total reps completed
   - Form quality monitoring

4. **Visual Skeleton Overlay**
   - See your body pose in real-time
   - 33 tracked body points
   - Connected skeleton visualization

5. **Exercise Instructions**
   - Step-by-step guides
   - Proper form tips
   - Common mistakes to avoid

## 🧪 Try It Now!

### Quick Test (30 seconds):
1. Select **Jumping Jacks**
2. Click **Start**
3. Do 10 jumping jacks
4. Watch the rep counter increase automatically!

### Full Test (2 minutes):
1. Select **Squats**
2. Click **Start**
3. Position yourself in side view
4. Do 15 squats slowly
5. Watch for form feedback on depth and back posture

## 🐛 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Camera not working | Check browser permissions in settings |
| Poor detection | Improve lighting, move back from camera |
| Reps not counting | Ensure full body is visible |
| Slow/laggy | Close other apps, try Chrome browser |
| "Not in frame" | Step back so entire body is visible |

## 📊 What Gets Tracked

### Push-ups:
- Elbow angle (should reach ~90°)
- Body alignment (straight line)
- Rep count (down → up = 1 rep)

### Squats:
- Knee angle (< 90° = full squat)
- Back straightness
- Squat depth

### Planks:
- Body alignment (straight line)
- Hold duration (in seconds)
- Hip position

### Sit-ups:
- Torso lift angle
- Rep count
- Controlled movement

### Jumping Jacks:
- Arm/leg spread distance
- Full range of motion
- Rep count

## 🎯 Pro Tips

1. **Lighting**: Use natural light or bright room lighting
2. **Camera Angle**: Side view for push-ups/planks, front for squats
3. **Distance**: Stand 6-8 feet from camera
4. **Background**: Plain wall works best
5. **Clothing**: Wear fitted clothes for better detection

## 🔧 Technical Stack

```
Frontend:
├── React 19 + TypeScript
├── TanStack Router (routing)
├── Tailwind CSS (styling)
└── shadcn/ui (components)

AI/ML:
├── MediaPipe Pose (Google)
├── 33 body landmarks
├── Real-time tracking
└── Browser-based (no backend needed!)

Detection:
├── Custom exercise algorithms
├── Angle calculations
├── Form analysis
└── Rep counting logic
```

## 📈 Next Steps

Want to extend this? Here are ideas:

1. **Add More Exercises**: Burpees, lunges, mountain climbers
2. **Save Progress**: Store workouts in database
3. **Workout Plans**: Create 30-day challenges
4. **Leaderboards**: Compete with friends
5. **Voice Feedback**: Audio cues instead of text
6. **Calorie Counter**: Estimate calories burned
7. **Mobile App**: React Native version

## 🎓 Files You Can Customize

```
apps/web/src/
├── hooks/usePoseDetection.tsx      # Camera & pose tracking
├── lib/exerciseDetection.ts        # Detection algorithms
├── components/ExerciseTracker.tsx  # UI component
└── routes/dashboard/posture.tsx    # Main page
```

## ✨ Demo Video Flow

1. Open app → Click "AI Workout Tracker"
2. See 5 exercise cards with icons
3. Click "Push-ups"
4. Grant camera access
5. See yourself in video with skeleton overlay
6. Do 5 push-ups
7. Watch rep counter go: 0 → 1 → 2 → 3 → 4 → 5
8. See feedback: "Good form!" or "Keep body straight!"
9. Check stats: Time, Reps, Form Quality
10. Click "Back" and try another exercise!

---

## 🚀 You're Ready!

Everything is set up and working. Just run `pnpm dev` and start tracking your workouts!

**First time?** Try Jumping Jacks - they're the easiest to test!

Enjoy your new AI personal trainer! 💪🤖


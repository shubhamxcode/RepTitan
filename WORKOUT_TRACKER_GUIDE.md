# AI Workout Tracker - Implementation Guide

## 🎉 What's Been Implemented

Your RepTitan app now has a **fully functional AI-powered workout tracker** with real-time pose detection and form correction!

## 📦 What Was Added

### 1. **Pose Detection Hook** (`src/hooks/usePoseDetection.tsx`)
- Custom React hook for MediaPipe Pose integration
- Manages camera access and video stream
- Provides real-time pose landmarks (33 body keypoints)
- Renders skeleton overlay on video feed

### 2. **Exercise Detection Library** (`src/lib/exerciseDetection.ts`)
- **5 Exercise Detectors:**
  - **Push-ups**: Tracks arm angles, counts reps, checks body alignment
  - **Squats**: Monitors knee angles, tracks depth, checks back posture
  - **Planks**: Times hold duration, ensures straight body line
  - **Sit-ups**: Counts reps based on torso angle
  - **Jumping Jacks**: Detects arm/leg movements, counts reps
  
- **Smart Form Correction:**
  - Real-time angle calculations
  - Instant feedback on form
  - Visibility checks to ensure you're in frame

### 3. **Exercise Tracker Component** (`src/components/ExerciseTracker.tsx`)
- Live video feed with skeleton overlay
- Real-time rep counting
- Session timer
- Form feedback overlays
- Exercise instructions
- Stats dashboard

### 4. **Updated Workout Page** (`src/routes/dashboard/posture.tsx`)
- Beautiful exercise selection grid
- Exercise-specific tracking interface
- Tips for best results

## 🚀 How to Use

### Starting the App

1. Make sure you're in the web directory:
```bash
cd apps/web
pnpm dev
```

2. Navigate to the Dashboard → Posture/Workout section

### Using the Tracker

1. **Select an Exercise**: Click on any exercise card (Push-ups, Squats, etc.)

2. **Click "Start"**: Grant camera permissions when prompted

3. **Position Yourself**:
   - Ensure full body is visible in frame
   - Use side view for best results
   - Good lighting helps accuracy
   - Clear background recommended

4. **Start Exercising**: 
   - Green feedback = Good form ✅
   - Yellow feedback = Form needs adjustment ⚠️
   - Real-time rep counting
   - Angle measurements displayed

5. **Track Your Progress**:
   - Reps counted automatically
   - Session time tracked
   - Form quality monitored

## 🎯 Supported Exercises

| Exercise | What It Tracks | Form Checks |
|----------|----------------|-------------|
| **Push-ups** | Elbow angles (90° = good depth) | Body alignment, arm extension |
| **Squats** | Knee angles (< 90° = full squat) | Back straightness, squat depth |
| **Planks** | Body alignment, hold time | Hip position, core engagement |
| **Sit-ups** | Hip/torso angles, reps | Torso lift, controlled movement |
| **Jumping Jacks** | Arm/leg spread, reps | Full range of motion |

## 🔧 Technical Details

### MediaPipe Pose Landmarks
- **33 body keypoints** tracked in real-time
- Includes shoulders, elbows, wrists, hips, knees, ankles, etc.
- Each point has x, y, z coordinates + visibility score

### How Exercise Detection Works

```typescript
// Example: Push-up detection
1. Calculate elbow angle (shoulder → elbow → wrist)
2. Check body alignment (shoulder → hip → ankle)
3. Detect stages:
   - Angle > 160° = "up" position
   - Angle < 90° = "down" position
4. Count rep when transition: down → up
5. Provide form feedback based on angles
```

### Performance
- Runs at **30-60 FPS** depending on hardware
- Model loads from CDN (~8MB)
- Works entirely in browser (no backend needed)

## 🎨 Customization Options

### Adjusting Detection Sensitivity

In `usePoseDetection.tsx`:
```typescript
modelComplexity: 1,  // 0 = Lite (faster), 1 = Full, 2 = Heavy (more accurate)
minDetectionConfidence: 0.5,  // Lower = more lenient
minTrackingConfidence: 0.5,   // Lower = tracks more easily
```

### Adding New Exercises

1. Create a new detector class in `exerciseDetection.ts`:
```typescript
export class LungeDetector {
  private stage: 'up' | 'down' | null = null;
  private count = 0;

  detect(landmarks: PoseLandmark[]): ExerciseStats {
    // Your detection logic
  }

  reset() {
    this.stage = null;
    this.count = 0;
  }
}
```

2. Add exercise type to `ExerciseType`:
```typescript
export type ExerciseType = 'pushup' | 'squat' | 'plank' | 'situp' | 'jumping_jack' | 'lunge';
```

3. Update `ExerciseTracker.tsx` to include your new detector

4. Add to exercise list in `posture.tsx`

## 📊 Future Enhancements

Here are some ideas you could add:

- [ ] **Workout History**: Save session data to database
- [ ] **Progress Charts**: Graph reps/form quality over time
- [ ] **Workout Plans**: Pre-built routines (e.g., "30-day challenge")
- [ ] **Voice Feedback**: Audio cues instead of text
- [ ] **Multiplayer**: Compete with friends in real-time
- [ ] **More Exercises**: Burpees, mountain climbers, lunges, etc.
- [ ] **Rep Goals**: Set targets and track completion
- [ ] **Calorie Estimation**: Based on exercise and duration
- [ ] **Export Data**: Download workout logs as CSV
- [ ] **Mobile App**: React Native version

## 🐛 Troubleshooting

### Camera Not Working
- Check browser permissions
- Try a different browser (Chrome/Edge work best)
- Ensure no other app is using the camera

### Poor Detection
- Improve lighting in room
- Move back so full body is visible
- Try side view instead of front view
- Avoid busy/cluttered backgrounds

### Slow Performance
- Lower `modelComplexity` to 0 in hook
- Close other browser tabs
- Try on a more powerful device

## 📝 Code Architecture

```
src/
├── hooks/
│   └── usePoseDetection.tsx          # MediaPipe integration hook
├── lib/
│   └── exerciseDetection.ts          # Exercise detection algorithms
├── components/
│   └── ExerciseTracker.tsx           # Main tracking UI component
└── routes/
    └── dashboard/
        └── posture.tsx                # Exercise selection page
```

## 🎓 Learning Resources

- [MediaPipe Pose Guide](https://google.github.io/mediapipe/solutions/pose.html)
- [Pose Landmark Model](https://google.github.io/mediapipe/solutions/pose#pose-landmark-model)
- [Exercise Biomechanics](https://exrx.net/Kinesiology)

## ✅ Ready to Use!

Your AI workout tracker is fully functional! Just navigate to the dashboard and start tracking your workouts.

**Pro Tip**: For push-ups and planks, position the camera to your side. For squats and jumping jacks, a front view works great!

---

Built with ❤️ using MediaPipe Pose + React + TypeScript


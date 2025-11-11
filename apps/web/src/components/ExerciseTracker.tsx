import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Activity, Maximize, Minimize, Save, CheckCircle2 } from 'lucide-react';
import { usePoseDetection } from '@/hooks/usePoseDetection';
import {
  PushUpDetector,
  SquatDetector,
  PlankDetector,
} from '@/lib/exerciseDetection';
import type { ExerciseType, ExerciseStats } from '@/lib/exerciseDetection';
import { toast } from 'sonner';

interface ExerciseTrackerProps {
  exerciseType: ExerciseType;
}

const EXERCISE_NAMES: Record<ExerciseType, string> = {
  pushup: 'Push-ups',
  squat: 'Squats',
  plank: 'Plank Hold',
};

const EXERCISE_INSTRUCTIONS: Record<ExerciseType, string[]> = {
  pushup: [
    'Start in a plank position with hands shoulder-width apart',
    'Lower your body until elbows are at 90 degrees',
    'Keep your body straight throughout the movement',
    'Push back up to starting position',
  ],
  squat: [
    'Stand with feet shoulder-width apart',
    'Lower your body by bending knees and hips',
    'Go down until thighs are parallel to floor',
    'Keep back straight and chest up',
  ],
  plank: [
    'Start in a forearm plank position',
    'Keep body in a straight line from head to heels',
    'Engage your core and hold the position',
    'Don\'t let hips sag or rise too high',
  ],
};

export const ExerciseTracker = ({ exerciseType }: ExerciseTrackerProps) => {
  const [stats, setStats] = useState<ExerciseStats | null>(null);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [sessionSaved, setSessionSaved] = useState(false);
  const [formQualityHistory, setFormQualityHistory] = useState<boolean[]>([]);
  
  const detectorRef = useRef<
    PushUpDetector | SquatDetector | PlankDetector
  >(undefined);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // API Base URL
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
  // For demo purposes, using userId = 1
  const userId = 1;

  // Initialize detector based on exercise type
  useEffect(() => {
    switch (exerciseType) {
      case 'pushup':
        detectorRef.current = new PushUpDetector();
        break;
      case 'squat':
        detectorRef.current = new SquatDetector();
        break;
      case 'plank':
        detectorRef.current = new PlankDetector();
        break;
    }
  }, [exerciseType]);

  const { videoRef, isLoading, isDetecting, error, fps, startDetection, stopDetection } =
    usePoseDetection({
      onResults: (results) => {
        if (results.poseLandmarks && detectorRef.current) {
          const exerciseStats = detectorRef.current.detect(results.poseLandmarks as any);
          setStats(exerciseStats);
          
          // Track form quality for calculating average
          if (isDetecting) {
            setFormQualityHistory((prev) => [...prev, exerciseStats.isCorrectForm]);
          }
        }
      },
      enablePerformanceMode: true, // Enable optimizations
    });

  // Track session duration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isDetecting && sessionStartTime) {
      interval = setInterval(() => {
        setSessionDuration(Math.floor((Date.now() - sessionStartTime) / 1000));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isDetecting, sessionStartTime]);

  const handleStart = async () => {
    await startDetection();
    setSessionStartTime(Date.now());
  };

  const handleStop = () => {
    stopDetection();
    setSessionStartTime(null);
  };

  const handleReset = () => {
    if (detectorRef.current) {
      detectorRef.current.reset();
      setStats(null);
      setSessionDuration(0);
      setSessionStartTime(null);
      setFormQualityHistory([]);
      setSessionSaved(false);
    }
  };

  const handleSaveSession = async () => {
    if (!stats || sessionDuration === 0) {
      toast.error("No workout data to save");
      return;
    }

    setIsSaving(true);
    try {
      // Calculate average form quality percentage
      const averageFormQuality = formQualityHistory.length > 0
        ? (formQualityHistory.filter((f) => f).length / formQualityHistory.length) * 100
        : 0;

      const response = await fetch(`${API_URL}/goals/exercise/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          exerciseType,
          repsCompleted: stats.count,
          duration: sessionDuration,
          averageFormQuality: Math.round(averageFormQuality),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSessionSaved(true);
        toast.success("Workout saved successfully! 🎉", {
          description: `${stats.count} reps • ${Math.round(sessionDuration / 60)}min • ${result.data.caloriesBurned} cal burned`,
        });
      } else {
        toast.error(result.error || "Failed to save workout");
      }
    } catch (error) {
      console.error("Error saving workout:", error);
      toast.error("Failed to save workout. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleFullscreen = async () => {
    if (!videoContainerRef.current) return;

    try {
      if (!isFullscreen) {
        // Enter fullscreen
        if (videoContainerRef.current.requestFullscreen) {
          await videoContainerRef.current.requestFullscreen();
        } else if ((videoContainerRef.current as any).webkitRequestFullscreen) {
          await (videoContainerRef.current as any).webkitRequestFullscreen();
        } else if ((videoContainerRef.current as any).mozRequestFullScreen) {
          await (videoContainerRef.current as any).mozRequestFullScreen();
        }
        setIsFullscreen(true);
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          await (document as any).mozCancelFullScreen();
        }
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  // Listen for fullscreen changes (user can also exit with ESC)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Exercise Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {EXERCISE_NAMES[exerciseType]}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time exercise tracking with AI
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={isDetecting ? handleStop : handleStart}
            disabled={isLoading}
            size="lg"
            className="gap-2"
          >
            {isDetecting ? (
              <>
                <Pause className="size-5" />
                Stop
              </>
            ) : (
              <>
                <Play className="size-5" />
                Start
              </>
            )}
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <RotateCcw className="size-5" />
            Reset
          </Button>
          <Button
            onClick={handleSaveSession}
            disabled={!stats || sessionDuration === 0 || isSaving || sessionSaved}
            size="lg"
            className="gap-2"
            variant={sessionSaved ? "default" : "secondary"}
          >
            {sessionSaved ? (
              <>
                <CheckCircle2 className="size-5" />
                Saved
              </>
            ) : (
              <>
                <Save className="size-5" />
                {isSaving ? "Saving..." : "Save Workout"}
              </>
            )}
          </Button>
          <Button
            onClick={toggleFullscreen}
            variant="outline"
            size="lg"
            className="gap-2"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? (
              <>
                <Minimize className="size-5" />
                Exit
              </>
            ) : (
              <>
                <Maximize className="size-5" />
                Fullscreen
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Video Feed */}
      <Card>
        <CardContent className="p-6">
          <div 
            ref={videoContainerRef}
            className="relative bg-black rounded-lg overflow-hidden aspect-video"
          >
            {/* Video feed - clean view without skeleton overlay */}
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
            
            {!isDetecting && !isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Activity className="size-16 text-muted-foreground mx-auto" />
                  <p className="text-white">Click Start to begin tracking</p>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto" />
                  <p className="text-white">Loading AI model...</p>
                </div>
              </div>
            )}

            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-950/50">
                <p className="text-white text-center px-4">{error}</p>
              </div>
            )}

            {/* Live Stats Overlay */}
            {isDetecting && stats && (
              <div className="absolute top-4 left-4 right-4 flex justify-between">
                <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4 space-y-1">
                  <p className="text-white text-sm font-medium">Reps</p>
                  <p className="text-4xl font-bold text-white">{stats.count}</p>
                </div>
                
                <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4 space-y-1">
                  <p className="text-white text-sm font-medium">Time</p>
                  <p className="text-2xl font-bold text-white">
                    {formatTime(sessionDuration)}
                  </p>
                </div>

                {/* FPS Counter */}
                <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4 space-y-1">
                  <p className="text-white text-sm font-medium">FPS</p>
                  <p className={`text-2xl font-bold ${fps >= 25 ? 'text-green-400' : fps >= 15 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {fps}
                  </p>
                </div>
              </div>
            )}

            {/* Feedback Overlay */}
            {isDetecting && stats && (
              <div className="absolute bottom-4 left-4 right-4">
                <div
                  className={`backdrop-blur-sm rounded-lg p-4 ${
                    stats.isCorrectForm
                      ? 'bg-green-500/70'
                      : 'bg-yellow-500/70'
                  }`}
                >
                  <p className="text-white font-semibold text-center text-lg">
                    {stats.feedback}
                  </p>
                  {stats.angle !== undefined && (
                    <p className="text-white text-center text-sm mt-1">
                      Angle: {stats.angle}°
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Total Reps</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">{stats?.count || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Session Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">
              {formatTime(sessionDuration)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Form Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">
              {stats?.isCorrectForm ? '✓' : '⚠'}
            </p>
            <p className="text-sm text-muted-foreground">
              {stats?.isCorrectForm ? 'Good Form' : 'Check Form'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Perform {EXERCISE_NAMES[exerciseType]}</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {EXERCISE_INSTRUCTIONS[exerciseType].map((instruction, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  {idx + 1}
                </span>
                <span className="text-muted-foreground">{instruction}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};


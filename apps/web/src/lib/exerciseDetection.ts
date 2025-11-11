import type { PoseLandmark } from '@/hooks/usePoseDetection';

// MediaPipe Pose landmark indices
export const POSE_LANDMARKS = {
  NOSE: 0,
  LEFT_EYE_INNER: 1,
  LEFT_EYE: 2,
  LEFT_EYE_OUTER: 3,
  RIGHT_EYE_INNER: 4,
  RIGHT_EYE: 5,
  RIGHT_EYE_OUTER: 6,
  LEFT_EAR: 7,
  RIGHT_EAR: 8,
  MOUTH_LEFT: 9,
  MOUTH_RIGHT: 10,
  LEFT_SHOULDER: 11,
  RIGHT_SHOULDER: 12,
  LEFT_ELBOW: 13,
  RIGHT_ELBOW: 14,
  LEFT_WRIST: 15,
  RIGHT_WRIST: 16,
  LEFT_PINKY: 17,
  RIGHT_PINKY: 18,
  LEFT_INDEX: 19,
  RIGHT_INDEX: 20,
  LEFT_THUMB: 21,
  RIGHT_THUMB: 22,
  LEFT_HIP: 23,
  RIGHT_HIP: 24,
  LEFT_KNEE: 25,
  RIGHT_KNEE: 26,
  LEFT_ANKLE: 27,
  RIGHT_ANKLE: 28,
  LEFT_HEEL: 29,
  RIGHT_HEEL: 30,
  LEFT_FOOT_INDEX: 31,
  RIGHT_FOOT_INDEX: 32,
};

export type ExerciseType = 'pushup' | 'squat' | 'plank';

export interface ExerciseStats {
  type: ExerciseType;
  count: number;
  feedback: string;
  isCorrectForm: boolean;
  angle?: number;
}

/**
 * Calculate angle between three points
 */
export const calculateAngle = (
  a: PoseLandmark,
  b: PoseLandmark,
  c: PoseLandmark
): number => {
  const radians =
    Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs((radians * 180.0) / Math.PI);

  if (angle > 180.0) {
    angle = 360 - angle;
  }

  return angle;
};

/**
 * Calculate distance between two landmarks
 */
export const calculateDistance = (a: PoseLandmark, b: PoseLandmark): number => {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

/**
 * Check if person is visible in frame with good confidence
 */
export const isPersonVisible = (landmarks: PoseLandmark[]): boolean => {
  const keyPoints = [
    POSE_LANDMARKS.LEFT_SHOULDER,
    POSE_LANDMARKS.RIGHT_SHOULDER,
    POSE_LANDMARKS.LEFT_HIP,
    POSE_LANDMARKS.RIGHT_HIP,
  ];

  return keyPoints.every(
    (index) => landmarks[index] && landmarks[index].visibility > 0.5
  );
};

/**
 * Push-up detection with improved accuracy
 */
export class PushUpDetector {
  private stage: 'up' | 'down' | 'transition' | null = null;
  private count = 0;
  private lastCountTime = 0;
  private readonly MIN_COUNT_INTERVAL = 500; // Minimum 500ms between counts (prevents double counting)
  private readonly UP_ANGLE_THRESHOLD = 150; // More lenient up position (was 160)
  private readonly DOWN_ANGLE_THRESHOLD = 100; // More lenient down position (was 90)
  private readonly TRANSITION_ANGLE = 120; // Middle position for better tracking

  detect(landmarks: PoseLandmark[]): ExerciseStats {
    if (!isPersonVisible(landmarks)) {
      return {
        type: 'pushup',
        count: this.count,
        feedback: 'Move into frame',
        isCorrectForm: false,
      };
    }

    // Calculate elbow angle (shoulder-elbow-wrist)
    const leftElbowAngle = calculateAngle(
      landmarks[POSE_LANDMARKS.LEFT_SHOULDER],
      landmarks[POSE_LANDMARKS.LEFT_ELBOW],
      landmarks[POSE_LANDMARKS.LEFT_WRIST]
    );

    const rightElbowAngle = calculateAngle(
      landmarks[POSE_LANDMARKS.RIGHT_SHOULDER],
      landmarks[POSE_LANDMARKS.RIGHT_ELBOW],
      landmarks[POSE_LANDMARKS.RIGHT_WRIST]
    );

    const avgElbowAngle = (leftElbowAngle + rightElbowAngle) / 2;

    // Check body alignment (shoulder-hip-ankle should be straight)
    const leftBodyAngle = calculateAngle(
      landmarks[POSE_LANDMARKS.LEFT_SHOULDER],
      landmarks[POSE_LANDMARKS.LEFT_HIP],
      landmarks[POSE_LANDMARKS.LEFT_ANKLE]
    );

    const isBodyStraight = leftBodyAngle > 155 && leftBodyAngle < 205; // More lenient

    let feedback = '';
    let isCorrectForm = true;
    const now = Date.now();

    // Improved state machine for better rep counting
    if (avgElbowAngle >= this.UP_ANGLE_THRESHOLD) {
      // Arms extended - UP position
      if (this.stage === 'down' || this.stage === 'transition') {
        // Complete rep when coming up from down position
        if (now - this.lastCountTime >= this.MIN_COUNT_INTERVAL) {
          this.count++;
          this.lastCountTime = now;
          feedback = '✓ Rep counted!';
        }
      }
      this.stage = 'up';
      if (!feedback) feedback = 'Push down';
      
    } else if (avgElbowAngle <= this.DOWN_ANGLE_THRESHOLD) {
      // Arms bent - DOWN position
      this.stage = 'down';
      feedback = 'Push up!';
      
    } else if (avgElbowAngle > this.DOWN_ANGLE_THRESHOLD && avgElbowAngle < this.UP_ANGLE_THRESHOLD) {
      // Middle range - TRANSITION
      this.stage = 'transition';
      if (avgElbowAngle < this.TRANSITION_ANGLE) {
        feedback = 'Good depth, push up!';
      } else {
        feedback = 'Keep going!';
      }
    }

    // Form feedback overrides
    if (!isBodyStraight) {
      feedback = '⚠ Keep your body straight!';
      isCorrectForm = false;
    }

    // Perfect form feedback
    if (avgElbowAngle < 80 && isBodyStraight) {
      feedback = '🔥 Perfect depth!';
    }

    return {
      type: 'pushup',
      count: this.count,
      feedback,
      isCorrectForm,
      angle: Math.round(avgElbowAngle),
    };
  }

  reset() {
    this.stage = null;
    this.count = 0;
    this.lastCountTime = 0;
  }
}

/**
 * Squat detection with improved accuracy
 */
export class SquatDetector {
  private stage: 'up' | 'down' | 'transition' | null = null;
  private count = 0;
  private lastCountTime = 0;
  private readonly MIN_COUNT_INTERVAL = 600; // Minimum 600ms between counts
  private readonly UP_ANGLE_THRESHOLD = 155; // More lenient standing position (was 160)
  private readonly DOWN_ANGLE_THRESHOLD = 110; // More lenient squat position (was 90)
  private readonly TRANSITION_ANGLE = 130; // Middle position

  detect(landmarks: PoseLandmark[]): ExerciseStats {
    if (!isPersonVisible(landmarks)) {
      return {
        type: 'squat',
        count: this.count,
        feedback: 'Move into frame',
        isCorrectForm: false,
      };
    }

    // Calculate knee angle (hip-knee-ankle)
    const leftKneeAngle = calculateAngle(
      landmarks[POSE_LANDMARKS.LEFT_HIP],
      landmarks[POSE_LANDMARKS.LEFT_KNEE],
      landmarks[POSE_LANDMARKS.LEFT_ANKLE]
    );

    const rightKneeAngle = calculateAngle(
      landmarks[POSE_LANDMARKS.RIGHT_HIP],
      landmarks[POSE_LANDMARKS.RIGHT_KNEE],
      landmarks[POSE_LANDMARKS.RIGHT_ANKLE]
    );

    const avgKneeAngle = (leftKneeAngle + rightKneeAngle) / 2;

    // Check back straightness (shoulder-hip-knee)
    const backAngle = calculateAngle(
      landmarks[POSE_LANDMARKS.LEFT_SHOULDER],
      landmarks[POSE_LANDMARKS.LEFT_HIP],
      landmarks[POSE_LANDMARKS.LEFT_KNEE]
    );

    const isBackStraight = backAngle > 150; // More lenient

    let feedback = '';
    let isCorrectForm = true;
    const now = Date.now();

    // Improved state machine for better rep counting
    if (avgKneeAngle >= this.UP_ANGLE_THRESHOLD) {
      // Standing - UP position
      if (this.stage === 'down' || this.stage === 'transition') {
        // Complete rep when standing up from squat
        if (now - this.lastCountTime >= this.MIN_COUNT_INTERVAL) {
          this.count++;
          this.lastCountTime = now;
          feedback = '✓ Rep counted!';
        }
      }
      this.stage = 'up';
      if (!feedback) feedback = 'Squat down';
      
    } else if (avgKneeAngle <= this.DOWN_ANGLE_THRESHOLD) {
      // Squatting - DOWN position
      this.stage = 'down';
      feedback = 'Stand up!';
      
    } else if (avgKneeAngle > this.DOWN_ANGLE_THRESHOLD && avgKneeAngle < this.UP_ANGLE_THRESHOLD) {
      // Middle range - TRANSITION
      this.stage = 'transition';
      if (avgKneeAngle < this.TRANSITION_ANGLE) {
        feedback = 'Good depth, stand up!';
      } else {
        feedback = 'Keep going down!';
      }
    }

    // Form feedback overrides
    if (!isBackStraight) {
      feedback = '⚠ Keep your back straight!';
      isCorrectForm = false;
    }

    // Perfect form feedback
    if (avgKneeAngle < 90 && isBackStraight) {
      feedback = '🔥 Excellent deep squat!';
    }

    return {
      type: 'squat',
      count: this.count,
      feedback,
      isCorrectForm,
      angle: Math.round(avgKneeAngle),
    };
  }

  reset() {
    this.stage = null;
    this.count = 0;
    this.lastCountTime = 0;
  }
}

/**
 * Plank detection
 */
export class PlankDetector {
  private isHolding = false;
  private holdStartTime: number | null = null;
  private totalHoldTime = 0;

  detect(landmarks: PoseLandmark[]): ExerciseStats & { holdTime: number } {
    if (!isPersonVisible(landmarks)) {
      return {
        type: 'plank',
        count: 0,
        feedback: 'Move into frame',
        isCorrectForm: false,
        holdTime: this.totalHoldTime,
      };
    }

    // Calculate body angle (shoulder-hip-ankle should be straight)
    const leftBodyAngle = calculateAngle(
      landmarks[POSE_LANDMARKS.LEFT_SHOULDER],
      landmarks[POSE_LANDMARKS.LEFT_HIP],
      landmarks[POSE_LANDMARKS.LEFT_ANKLE]
    );

    const rightBodyAngle = calculateAngle(
      landmarks[POSE_LANDMARKS.RIGHT_SHOULDER],
      landmarks[POSE_LANDMARKS.RIGHT_HIP],
      landmarks[POSE_LANDMARKS.RIGHT_ANKLE]
    );

    const avgBodyAngle = (leftBodyAngle + rightBodyAngle) / 2;

    // Check if elbows are bent (plank position)
    const leftElbowAngle = calculateAngle(
      landmarks[POSE_LANDMARKS.LEFT_SHOULDER],
      landmarks[POSE_LANDMARKS.LEFT_ELBOW],
      landmarks[POSE_LANDMARKS.LEFT_WRIST]
    );

    const isPlankPosition = avgBodyAngle > 160 && avgBodyAngle < 200 && leftElbowAngle < 120;

    let feedback = '';
    let isCorrectForm = true;

    if (isPlankPosition) {
      if (!this.isHolding) {
        this.holdStartTime = Date.now();
        this.isHolding = true;
      } else if (this.holdStartTime) {
        this.totalHoldTime = Math.floor((Date.now() - this.holdStartTime) / 1000);
      }
      feedback = `Holding! ${this.totalHoldTime}s`;
    } else {
      this.isHolding = false;
      this.holdStartTime = null;
      
      if (avgBodyAngle < 160) {
        feedback = 'Hips too high!';
        isCorrectForm = false;
      } else if (avgBodyAngle > 200) {
        feedback = 'Hips sagging! Engage core';
        isCorrectForm = false;
      } else {
        feedback = 'Get into plank position';
        isCorrectForm = false;
      }
    }

    return {
      type: 'plank',
      count: 0,
      feedback,
      isCorrectForm,
      angle: Math.round(avgBodyAngle),
      holdTime: this.totalHoldTime,
    };
  }

  reset() {
    this.isHolding = false;
    this.holdStartTime = null;
    this.totalHoldTime = 0;
  }
}



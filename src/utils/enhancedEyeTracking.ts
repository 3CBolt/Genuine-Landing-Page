// Enhanced Eye Tracking Utilities
// Provides improved visual feedback for eye tracking with trails and animations

export interface EyePosition {
  x: number;
  y: number;
  timestamp: number;
}

export interface EyeTrail {
  positions: EyePosition[];
  maxLength: number;
}

export interface EyeTrackingVisuals {
  // Trail of recent eye positions
  leftEyeTrail: EyeTrail;
  rightEyeTrail: EyeTrail;
  
  // Animation state
  pulsePhase: number;
  lastUpdate: number;
}

// Create a new eye trail
export function createEyeTrail(maxLength: number = 5): EyeTrail {
  return {
    positions: [],
    maxLength
  };
}

// Add a new position to an eye trail
export function addEyePosition(trail: EyeTrail, x: number, y: number): EyeTrail {
  const newPosition: EyePosition = {
    x,
    y,
    timestamp: Date.now()
  };
  
  return {
    ...trail,
    positions: [...trail.positions.slice(-(trail.maxLength - 1)), newPosition]
  };
}

// Calculate trail opacity based on age
export function getTrailOpacity(timestamp: number, maxAge: number = 2000): number {
  const age = Date.now() - timestamp;
  return Math.max(0, 1 - (age / maxAge));
}

// Draw enhanced eye tracking overlay
export function drawEnhancedEyeTracking(
  ctx: CanvasRenderingContext2D,
  leftEye: [number, number] | null,
  rightEye: [number, number] | null,
  visuals: EyeTrackingVisuals,
  canvasWidth: number,
  canvasHeight: number
): void {
  if (!ctx) return;
  
  // Update pulse phase
  const now = Date.now();
  const pulseSpeed = 0.005; // Adjust for faster/slower pulsing
  visuals.pulsePhase = (now * pulseSpeed) % (2 * Math.PI);
  visuals.lastUpdate = now;
  
  // Draw left eye
  if (leftEye) {
    drawEyeWithTrail(ctx, leftEye[0], leftEye[1], visuals.leftEyeTrail, 'left', visuals.pulsePhase);
  }
  
  // Draw right eye
  if (rightEye) {
    drawEyeWithTrail(ctx, rightEye[0], rightEye[1], visuals.rightEyeTrail, 'right', visuals.pulsePhase);
  }
  
  // Draw center reference line if both eyes are detected
  if (leftEye && rightEye) {
    drawCenterReference(ctx, leftEye, rightEye, canvasWidth, canvasHeight);
  }
}

// Draw individual eye with trail
function drawEyeWithTrail(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  trail: EyeTrail,
  side: 'left' | 'right',
  pulsePhase: number
): void {
  // Draw trail
  if (trail.positions.length > 1) {
    ctx.save();
    ctx.strokeStyle = side === 'left' ? 'rgba(0, 255, 255, 0.6)' : 'rgba(255, 0, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    trail.positions.forEach((pos, index) => {
      const opacity = getTrailOpacity(pos.timestamp);
      ctx.globalAlpha = opacity;
      
      if (index === 0) {
        ctx.moveTo(pos.x, pos.y);
      } else {
        ctx.lineTo(pos.x, pos.y);
      }
    });
    ctx.stroke();
    ctx.restore();
  }
  
  // Draw current eye position with pulsing effect
  const pulseSize = 3 + Math.sin(pulsePhase) * 2;
  const pulseOpacity = 0.7 + Math.sin(pulsePhase) * 0.3;
  
  ctx.save();
  ctx.fillStyle = side === 'left' ? 'rgba(0, 255, 255, 0.8)' : 'rgba(255, 0, 255, 0.8)';
  ctx.strokeStyle = side === 'left' ? 'rgba(0, 200, 200, 1)' : 'rgba(200, 0, 200, 1)';
  ctx.lineWidth = 2;
  ctx.globalAlpha = pulseOpacity;
  
  // Draw pulsing circle
  ctx.beginPath();
  ctx.arc(x, y, pulseSize, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  
  // Draw inner dot
  ctx.globalAlpha = 1;
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(x, y, 1, 0, 2 * Math.PI);
  ctx.fill();
  
  ctx.restore();
}

// Draw center reference line
function drawCenterReference(
  ctx: CanvasRenderingContext2D,
  leftEye: [number, number],
  rightEye: [number, number],
  canvasWidth: number,
  canvasHeight: number
): void {
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  
  // Calculate eye center
  const eyeCenterX = (leftEye[0] + rightEye[0]) / 2;
  const eyeCenterY = (leftEye[1] + rightEye[1]) / 2;
  
  // Draw faint line from eye center to canvas center
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);
  
  ctx.beginPath();
  ctx.moveTo(eyeCenterX, eyeCenterY);
  ctx.lineTo(centerX, centerY);
  ctx.stroke();
  
  ctx.restore();
  
  // Draw center target
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.lineWidth = 1;
  
  const targetSize = 8;
  ctx.beginPath();
  ctx.arc(centerX, centerY, targetSize, 0, 2 * Math.PI);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(centerX, centerY, targetSize / 2, 0, 2 * Math.PI);
  ctx.stroke();
  
  ctx.restore();
}

// Initialize enhanced eye tracking visuals
export function createEyeTrackingVisuals(): EyeTrackingVisuals {
  return {
    leftEyeTrail: createEyeTrail(5),
    rightEyeTrail: createEyeTrail(5),
    pulsePhase: 0,
    lastUpdate: Date.now()
  };
}

// Update eye tracking visuals with new positions
export function updateEyeTrackingVisuals(
  visuals: EyeTrackingVisuals,
  leftEye: [number, number] | null,
  rightEye: [number, number] | null
): EyeTrackingVisuals {
  return {
    ...visuals,
    leftEyeTrail: leftEye ? addEyePosition(visuals.leftEyeTrail, leftEye[0], leftEye[1]) : visuals.leftEyeTrail,
    rightEyeTrail: rightEye ? addEyePosition(visuals.rightEyeTrail, rightEye[0], rightEye[1]) : visuals.rightEyeTrail
  };
} 
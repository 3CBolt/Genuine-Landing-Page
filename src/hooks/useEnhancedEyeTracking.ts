import { useRef, useCallback, useEffect, useState } from 'react';
import { 
  createEyeTrackingVisuals, 
  updateEyeTrackingVisuals, 
  drawEnhancedEyeTracking,
  type EyeTrackingVisuals 
} from '@/utils/enhancedEyeTracking';

export interface EnhancedEyeTrackingOptions {
  enabled?: boolean;
  trailLength?: number;
  pulseSpeed?: number;
  showCenterReference?: boolean;
  debugMode?: boolean;
}

export interface EyeTrackingState {
  leftEye: [number, number] | null;
  rightEye: [number, number] | null;
  isTracking: boolean;
  confidence: number;
  lastUpdate: number;
}

export function useEnhancedEyeTracking(options: EnhancedEyeTrackingOptions = {}) {
  const {
    enabled = true,
    debugMode = false
  } = options;

  // State
  const [eyeTrackingState, setEyeTrackingState] = useState<EyeTrackingState>({
    leftEye: null,
    rightEye: null,
    isTracking: false,
    confidence: 0,
    lastUpdate: 0
  });

  // Refs
  const visualsRef = useRef<EyeTrackingVisuals>(createEyeTrackingVisuals());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Update eye positions from SDK detection
  const updateEyePositions = useCallback((
    leftEye: [number, number] | null,
    rightEye: [number, number] | null,
    confidence: number = 0
  ) => {
    if (!enabled) return;

    // Update visuals
    visualsRef.current = updateEyeTrackingVisuals(
      visualsRef.current,
      leftEye,
      rightEye
    );

    // Update state
    setEyeTrackingState({
      leftEye,
      rightEye,
      isTracking: !!(leftEye && rightEye),
      confidence,
      lastUpdate: Date.now()
    });
  }, [enabled]);

  // Draw enhanced overlay
  const drawOverlay = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !enabled) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw enhanced eye tracking
    drawEnhancedEyeTracking(
      ctx,
      eyeTrackingState.leftEye,
      eyeTrackingState.rightEye,
      visualsRef.current,
      canvas.width,
      canvas.height
    );

    // Debug information
    if (debugMode) {
      drawDebugInfo(ctx, eyeTrackingState);
    }
  }, [enabled, eyeTrackingState, debugMode]);

  // Animation loop
  const animate = useCallback(() => {
    drawOverlay();
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [drawOverlay]);

  // Start/stop animation
  useEffect(() => {
    if (enabled) {
      animate();
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enabled, animate]);

  // Set canvas reference
  const setCanvasRef = useCallback((canvas: HTMLCanvasElement | null) => {
    canvasRef.current = canvas;
    
    if (canvas) {
      // Ensure canvas is properly sized
      const container = canvas.parentElement;
      if (container) {
        const rect = container.getBoundingClientRect();
        const scale = window.devicePixelRatio || 1;
        
        canvas.width = rect.width * scale;
        canvas.height = rect.height * scale;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.scale(scale, scale);
        }
      }
    }
  }, []);

  // Draw debug information
  const drawDebugInfo = useCallback((
    ctx: CanvasRenderingContext2D,
    state: EyeTrackingState
  ) => {
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(10, 10, 200, 80);
    
    ctx.fillStyle = 'white';
    ctx.font = '12px monospace';
    ctx.textBaseline = 'top';
    
    const lines = [
      `Left Eye: ${state.leftEye ? `(${state.leftEye[0].toFixed(1)}, ${state.leftEye[1].toFixed(1)})` : 'Not detected'}`,
      `Right Eye: ${state.rightEye ? `(${state.rightEye[0].toFixed(1)}, ${state.rightEye[1].toFixed(1)})` : 'Not detected'}`,
      `Tracking: ${state.isTracking ? '✓' : '✗'}`,
      `Confidence: ${(state.confidence * 100).toFixed(1)}%`,
      `Last Update: ${Date.now() - state.lastUpdate}ms ago`
    ];
    
    lines.forEach((line, index) => {
      ctx.fillText(line, 15, 15 + (index * 15));
    });
    
    ctx.restore();
  }, []);

  return {
    // State
    eyeTrackingState,
    
    // Actions
    updateEyePositions,
    setCanvasRef,
    
    // Refs
    canvasRef,
    
    // Utilities
    isEnabled: enabled,
    isTracking: eyeTrackingState.isTracking
  };
} 
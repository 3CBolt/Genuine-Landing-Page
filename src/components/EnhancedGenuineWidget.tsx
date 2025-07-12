import React, { useEffect, useRef } from 'react';
import { GenuineWidget } from 'genuine-verify-sdk';
import { useEnhancedEyeTracking } from '@/hooks/useEnhancedEyeTracking';

interface EnhancedGenuineWidgetProps {
  gestureType: 'headTilt';
  onSuccess: (token: any) => void;
  onError?: (error: Error) => void;
  debug?: boolean;
  theme?: 'light' | 'dark';
  instructionalText?: string;
  instructionalTextStyle?: React.CSSProperties;
  enhancedEyeTracking?: boolean;
}

export const EnhancedGenuineWidget: React.FC<EnhancedGenuineWidgetProps> = ({
  gestureType,
  onSuccess,
  onError,
  debug = false,
  theme = 'dark',
  instructionalText,
  instructionalTextStyle,
  enhancedEyeTracking = true
}) => {
  const widgetKey = useRef(Date.now());
  
  // Enhanced eye tracking hook
  const {
    eyeTrackingState,
    updateEyePositions,
    setCanvasRef,
    isTracking
  } = useEnhancedEyeTracking({
    enabled: enhancedEyeTracking,
    debugMode: debug
  });

  // Custom canvas for enhanced eye tracking
  const enhancedCanvasRef = useRef<HTMLCanvasElement>(null);

  // Set up canvas reference
  useEffect(() => {
    if (enhancedEyeTracking && enhancedCanvasRef.current) {
      setCanvasRef(enhancedCanvasRef.current);
    }
  }, [enhancedEyeTracking, setCanvasRef]);

  // Mock eye position updates for demonstration
  // In a real implementation, this would come from the SDK's detection results
  useEffect(() => {
    if (!enhancedEyeTracking) return;

    const interval = setInterval(() => {
      // Simulate eye tracking data (replace with actual SDK data)
      const mockLeftEye: [number, number] = [240, 180];
      const mockRightEye: [number, number] = [280, 180];
      
      updateEyePositions(mockLeftEye, mockRightEye, 0.8);
    }, 100);

    return () => clearInterval(interval);
  }, [enhancedEyeTracking, updateEyePositions]);

  return (
    <div className="relative">
      {/* Enhanced Eye Tracking Canvas */}
      {enhancedEyeTracking && (
        <canvas
          ref={enhancedCanvasRef}
          className="absolute top-0 left-0 w-80 h-60 pointer-events-none z-10"
          style={{
            width: '320px',
            height: '240px'
          }}
        />
      )}
      
      {/* Status indicator for enhanced eye tracking */}
      {enhancedEyeTracking && (
        <div className="absolute top-2 right-2 z-20">
          <div className={`px-2 py-1 rounded text-xs text-white ${
            isTracking ? 'bg-green-500' : 'bg-yellow-500'
          }`}>
            {isTracking ? '👁️ Tracking' : '👁️ Searching'}
          </div>
        </div>
      )}

      {/* Original GenuineWidget */}
      <GenuineWidget
        key={widgetKey.current}
        gestureType={gestureType}
        onSuccess={onSuccess}
        onError={onError}
        debug={debug}
        theme={theme}
        instructionalText={instructionalText}
        instructionalTextStyle={instructionalTextStyle}
      />

      {/* Enhanced Debug Panel */}
      {debug && enhancedEyeTracking && (
        <div className="mt-4 p-3 bg-gray-900 text-white rounded text-xs">
          <div className="font-semibold mb-2">Enhanced Eye Tracking Debug:</div>
          <div>Left Eye: {eyeTrackingState.leftEye ? 
            `(${eyeTrackingState.leftEye[0].toFixed(1)}, ${eyeTrackingState.leftEye[1].toFixed(1)})` : 
            'Not detected'}</div>
          <div>Right Eye: {eyeTrackingState.rightEye ? 
            `(${eyeTrackingState.rightEye[0].toFixed(1)}, ${eyeTrackingState.rightEye[1].toFixed(1)})` : 
            'Not detected'}</div>
          <div>Tracking: {eyeTrackingState.isTracking ? '✓' : '✗'}</div>
          <div>Confidence: {(eyeTrackingState.confidence * 100).toFixed(1)}%</div>
          <div>Last Update: {Date.now() - eyeTrackingState.lastUpdate}ms ago</div>
        </div>
      )}
    </div>
  );
}; 
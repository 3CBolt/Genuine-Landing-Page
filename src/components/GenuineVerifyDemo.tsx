'use client'
import React, { useState } from 'react';
import { GenuineWidgetEmbeddable, useVerificationStatus, clearStoredToken } from 'genuine-verify-sdk';

interface GenuineVerifyDemoProps {
  onTokenIssued?: (payload: unknown) => void;
  onError?: (error: unknown) => void;
}

export const GenuineVerifyDemo: React.FC<GenuineVerifyDemoProps> = ({
  onTokenIssued,
  onError,
}) => {
  const [widgetKey, setWidgetKey] = useState(Date.now());
  const { token, isVerified, clearToken } = useVerificationStatus();
  const [error, setError] = useState<string | null>(null);

  const handleTokenIssued = (payload: unknown) => {
    setError(null);
    if (onTokenIssued) onTokenIssued(payload);
  };

  const handleFailure = (context: unknown) => {
    if (
      typeof context === 'object' &&
      context !== null &&
      'reason' in context &&
      typeof (context as Record<string, unknown>).reason === 'string'
    ) {
      setError((context as { reason: string }).reason);
    } else {
      setError('Verification failed');
    }
    if (onError) onError(context);
  };

  const handleClearAndRetry = () => {
    clearToken();
    clearStoredToken();
    setWidgetKey(Date.now());
    setError(null);
  };

  return (
    <>
      <style>{`
        video, canvas {
          width: 320px !important;
          height: 240px !important;
          max-width: none !important;
          max-height: none !important;
          min-width: 0 !important;
          min-height: 0 !important;
          object-fit: contain !important;
          box-sizing: content-box !important;
        }
      `}</style>
      <div style={{ width: 320, height: 240, position: 'relative', margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <GenuineWidgetEmbeddable
          key={widgetKey}
          onTokenIssued={handleTokenIssued}
          onFailure={handleFailure}
          tokenTTL={300}
          debug={true}
          persist={true}
          trigger="auto"
          maxAttempts={3}
        />
      </div>
      <div style={{ width: 320, margin: '0 auto', marginTop: 16 }}>
        <div style={{ fontSize: 13, color: '#333', background: '#f9fafb', borderRadius: 8, padding: 12, marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Status:</span>
            <span style={{ color: isVerified ? '#16a34a' : '#64748b', fontWeight: 500 }}>
              {isVerified ? '✅ Verified' : '⏳ Pending'}
            </span>
          </div>
          {token && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              <span>Token:</span>
              <span style={{ fontFamily: 'monospace', color: '#334155' }}>
                {token.slice(0, 8)}...{token.slice(-8)}
              </span>
            </div>
          )}
          {error && (
            <div style={{ color: '#dc2626', marginTop: 8, fontWeight: 500 }}>
              Error: {error}
            </div>
          )}
        </div>
        <button
          onClick={handleClearAndRetry}
          style={{ width: '100%', padding: '10px 0', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 15, cursor: 'pointer' }}
        >
          Reset & Retry
        </button>
      </div>
    </>
  );
}; 
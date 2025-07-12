'use client'
import { useState } from 'react'
import { 
  GenuineWidgetEmbeddable, 
  useVerificationStatus,
  clearStoredToken
} from 'genuine-verify-sdk'

export const GenuineVerifySection = () => {
  const [widgetKey, setWidgetKey] = useState(Date.now())
  const { token, isVerified, clearToken } = useVerificationStatus()

  const handleTokenIssued = (payload: {
    token: string;
    metadata: {
      issuedAt: string;
      expiresAt: string;
      gestureType: string;
    };
  }) => {
    console.log('✅ Verification successful!')
    console.log('Token:', payload.token)
    console.log('Expires:', payload.metadata.expiresAt)
  }

  const handleFailure = (context: {
    reason: string;
    attempts: number;
    maxAttempts: number;
    error?: Error;
    timestamp: string;
  }) => {
    console.log('❌ Verification failed:', context.reason)
  }

  const handleClearAndRetry = () => {
    clearToken()
    clearStoredToken()
    setWidgetKey(Date.now())
  }

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
      {/* Token Status Display and Reset Button below the widget for clarity */}
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
        </div>
        <button
          onClick={handleClearAndRetry}
          style={{ width: '100%', padding: '10px 0', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 15, cursor: 'pointer' }}
        >
          Reset & Retry
        </button>
      </div>
    </>
  )
} 
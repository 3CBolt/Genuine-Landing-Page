'use client'
import { GenuineWidgetEmbeddable, clearStoredToken } from 'genuine-verify-sdk'
import React, { useState } from 'react'

export const GenuineVerifyDemo = () => {
  const [widgetKey, setWidgetKey] = useState(0)

  const handleClearToken = () => {
    clearStoredToken()
    setWidgetKey(k => k + 1)
  }

  return (
    <div
      style={{
        width: 320,
        margin: '40px auto',
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <GenuineWidgetEmbeddable
        key={widgetKey}
        tokenTTL={300}
        debug={true}
        persist={true}
        onTokenIssued={payload => console.log('Token issued:', payload)}
      />
      <button
        style={{
          marginTop: 20,
          padding: '8px 16px',
          background: '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
          fontWeight: 500,
        }}
        onClick={handleClearToken}
      >
        Clear Token & Retry
      </button>
    </div>
  )
} 
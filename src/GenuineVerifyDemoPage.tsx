'use client'
import { GenuineWidget } from 'genuine-verify-sdk';

export default function GenuineVerifyDemoPage() {
  return (
    <div style={{ width: 360, margin: '60px auto 0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <GenuineWidget
        gestureType="headTilt"
        onSuccess={payload => {
          console.log('✅ Verification successful!', payload);
        }}
      />
    </div>
  );
} 
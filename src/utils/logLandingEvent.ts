import { supabase } from './supabaseClient'

export const logLandingEvent = async (
  event: string,
  data: Record<string, any> = {}
) => {
  try {
    // Generate anonymous session ID if not exists
    let sessionId = localStorage.getItem('genuine-session-id')
    if (!sessionId) {
      sessionId = crypto.randomUUID()
      localStorage.setItem('genuine-session-id', sessionId)
    }

    const eventData = {
      event,
      page: 'landing',
      timestamp: new Date().toISOString(),
      session_id: sessionId,
      extra_data: data,
    }

    // Log to console for debugging
    console.log('[Landing Analytics]', eventData)

    // Send to Supabase if configured
    if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
      const { error } = await supabase
        .from('landing_events')
        .insert([eventData])

      if (error) {
        console.error('Error logging event to Supabase:', error)
      }
    }
  } catch (err) {
    console.warn('Landing analytics failed:', err)
  }
}

// Helper functions for common events
export const logDemoClicked = () => logLandingEvent('demo_clicked')
export const logDemoMounted = () => logLandingEvent('demo_mounted')
export const logDemoVerified = (gestureType: string, timeToVerifyMs: number) => 
  logLandingEvent('demo_verified', { gesture: gestureType, timeToVerifyMs })
export const logWaitlistViewed = () => logLandingEvent('waitlist_viewed')
export const logWaitlistSubmitted = (useCase: string) => 
  logLandingEvent('waitlist_submitted', { use_case: useCase }) 
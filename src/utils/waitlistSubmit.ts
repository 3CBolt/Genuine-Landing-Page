import { supabase } from './supabaseClient'

export interface WaitlistSubmission {
  email: string
  useCase: string
  source?: string
}

export const submitWaitlist = async (data: WaitlistSubmission) => {
  try {
    const submissionData = {
      email: data.email,
      use_case: data.useCase,
      timestamp: new Date().toISOString(),
      source: data.source || 'landing',
    }

    console.log('[Waitlist Submission]', submissionData)

    // Send to Supabase if configured
    if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
      const { error } = await supabase
        .from('waitlist')
        .insert([submissionData])

      if (error) {
        console.error('Waitlist signup failed:', error)
        throw new Error('Failed to submit to waitlist')
      }
    }

    return { success: true }
  } catch (err) {
    console.error('Waitlist submission error:', err)
    throw err
  }
} 
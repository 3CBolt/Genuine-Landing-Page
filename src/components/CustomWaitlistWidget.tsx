import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { submitWaitlist } from "@/utils/waitlistSubmit"
import { logWaitlistViewed, logWaitlistSubmitted } from "@/utils/logLandingEvent"

export function CustomWaitlistWidget() {
  const [email, setEmail] = useState("")
  const [useCase, setUseCase] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  // Log when component mounts
  useState(() => {
    logWaitlistViewed()
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !useCase) {
      setError("Please fill in all fields")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      await submitWaitlist({ email, useCase })
      await logWaitlistSubmitted(useCase)
      setIsSubmitted(true)
    } catch (err) {
      setError("Failed to submit. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
          🎉 You're on the list!
        </h3>
        <p className="text-green-600 dark:text-green-300">
          We'll notify you when Genuine is ready for your {useCase} use case.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email Address
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="useCase" className="block text-sm font-medium mb-2">
          How do you plan to use Genuine?
        </label>
        <Select value={useCase} onValueChange={setUseCase} required>
          <SelectTrigger>
            <SelectValue placeholder="Select your use case" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="agent_auth">Agentic AI task verification</SelectItem>
            <SelectItem value="form_protection">Form protection / bot defense</SelectItem>
            <SelectItem value="auth_enhancement">Add-on to login workflows</SelectItem>
            <SelectItem value="api_gating">Protecting API access</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {error && (
        <div className="text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-[#6366F1] hover:bg-[#818CF8] text-white"
      >
        {isSubmitting ? "Joining..." : "Join the Waitlist"}
      </Button>
    </form>
  )
} 
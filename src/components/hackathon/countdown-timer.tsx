'use client'

import { useEffect, useState } from 'react'
import { useI18n } from '@/i18n/context'

interface CountdownTimerProps {
  readonly deadline: string
}

interface TimeLeft {
  readonly days: number
  readonly hours: number
  readonly minutes: number
  readonly seconds: number
}

function calcTimeLeft(deadline: string): TimeLeft | null {
  const diff = new Date(deadline).getTime() - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function CountdownTimer({ deadline }: CountdownTimerProps) {
  const { t } = useI18n()
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => calcTimeLeft(deadline))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft(deadline))
    }, 1000)
    return () => clearInterval(timer)
  }, [deadline])

  if (!timeLeft) {
    return (
      <div className="terminal rounded-lg p-4 text-center">
        <span className="font-terminal text-sm text-red-400">ENDED</span>
      </div>
    )
  }

  const isUrgent = timeLeft.days === 0

  return (
    <div className={`terminal rounded-lg p-4 space-y-2 ${isUrgent ? 'neon-border-cyan' : ''}`} role="timer" aria-live="polite">
      <p className="font-terminal text-xs text-muted-foreground text-center">
        {t('tab.submit')} DEADLINE
      </p>
      <div className="grid grid-cols-4 gap-1 text-center">
        {[
          { value: timeLeft.days, label: 'D' },
          { value: timeLeft.hours, label: 'H' },
          { value: timeLeft.minutes, label: 'M' },
          { value: timeLeft.seconds, label: 'S' },
        ].map(({ value, label }) => (
          <div key={label}>
            <div className={`font-terminal text-2xl tabular-nums ${isUrgent ? 'text-glow-amber' : 'text-glow'}`}>
              {String(value).padStart(2, '0')}
            </div>
            <div className="font-terminal text-xs text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

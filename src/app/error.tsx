'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  readonly error: Error
  readonly reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 px-4">
      <div className="w-full max-w-lg terminal rounded-lg p-6 space-y-3" style={{ boxShadow: '0 0 20px oklch(0.704 0.191 22.216 / 30%)' }}>
        <div className="flex items-center gap-2 border-b border-red-500/30 pb-3">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span className="ml-2 text-xs text-red-400">error.log</span>
        </div>
        <div className="space-y-2">
          <p className="text-red-400 font-terminal text-sm">
            <span className="text-muted-foreground">$ </span>
            ERROR: Process terminated unexpectedly
          </p>
          <p className="text-red-300/70 font-terminal text-xs pl-4">
            An unexpected error occurred. Please try again.
          </p>
        </div>
      </div>
      <button
        onClick={reset}
        className="brutal-button rounded-md bg-primary px-6 py-2.5 font-terminal text-sm text-primary-foreground"
      >
        $ retry --force
      </button>
    </div>
  )
}

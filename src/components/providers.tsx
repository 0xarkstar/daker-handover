'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import { I18nProvider } from '@/i18n/context'
import { seedIfNeeded } from '@/lib/seed'

export function Providers({ children }: { readonly children: ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    seedIfNeeded().then(() => setReady(true))
  }, [])

  if (!ready) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <div className="terminal rounded-lg px-6 py-4">
          <span className="font-terminal text-sm">
            <span className="text-muted-foreground">$ </span>
            Initializing<span className="terminal-cursor"></span>
          </span>
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <I18nProvider>{children}</I18nProvider>
      <Toaster />
    </ThemeProvider>
  )
}

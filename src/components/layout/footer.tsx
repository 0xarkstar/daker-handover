'use client'

import { Code2 } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t-2 border-primary bg-muted/30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4" />
          <span><span className="text-primary font-terminal">$ </span>DAKER Hackathon Platform</span>
        </div>
        <div className="font-terminal">© 2026</div>
      </div>
    </footer>
  )
}

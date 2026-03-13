'use client'

import Link from 'next/link'
import { Code2, Github } from 'lucide-react'
import { useI18n } from '@/i18n/context'

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="border-t-2 border-primary bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              <span className="font-terminal font-bold tracking-wider">DAKER</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            <h4 className="font-terminal text-sm font-semibold">Navigation</h4>
            <nav className="flex flex-col gap-1">
              <Link href="/hackathons" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('nav.hackathons')}
              </Link>
              <Link href="/camp" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('nav.camp')}
              </Link>
              <Link href="/rankings" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('nav.rankings')}
              </Link>
            </nav>
          </div>

          {/* Tech */}
          <div className="space-y-2">
            <h4 className="font-terminal text-sm font-semibold">Built With</h4>
            <p className="text-sm text-muted-foreground">
              Next.js 16 + React 19 + Tailwind v4
            </p>
            <p className="text-xs text-muted-foreground">
              shadcn/ui + Magic UI
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
          <span><span className="text-primary font-terminal">$ </span>DAKER Hackathon Platform</span>
          <span className="font-terminal">&copy; 2026</span>
        </div>
      </div>
    </footer>
  )
}

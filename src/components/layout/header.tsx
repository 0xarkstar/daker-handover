'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Trophy, Users, Code2, Globe, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useI18n } from '@/i18n/context'
import type { Locale } from '@/types'
import { useState } from 'react'

const NAV_ITEMS = [
  { href: '/hackathons', labelKey: 'nav.hackathons', icon: Code2 },
  { href: '/camp', labelKey: 'nav.camp', icon: Users },
  { href: '/rankings', labelKey: 'nav.rankings', icon: Trophy },
] as const

const LOCALES: Locale[] = ['ko', 'en', 'zh', 'ja']

export function Header() {
  const pathname = usePathname()
  const { t, locale, setLocale } = useI18n()
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-primary bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center px-4">
        <Link href="/" className="mr-6 flex items-center gap-2 font-bold">
          <Code2 className="h-5 w-5 text-primary" />
          <span className="hidden font-terminal tracking-wider sm:inline">DAKER<span className="terminal-cursor">_</span></span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex md:gap-1">
          {NAV_ITEMS.map(({ href, labelKey, icon: Icon }) => (
            <Link key={href} href={href}>
              <Button
                variant={pathname.startsWith(href) ? 'default' : 'ghost'}
                size="sm"
                className="gap-1.5 hover:-translate-y-0.5 hover:shadow-[2px_2px_0] transition-all"
              >
                <Icon className="h-4 w-4" />
                {t(labelKey)}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Dark mode toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 px-0"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Language switcher */}
          <div className="hidden items-center gap-1 sm:flex">
            <Globe className="h-4 w-4 text-muted-foreground" />
            {LOCALES.map((loc) => (
              <Button
                key={loc}
                variant={locale === loc ? 'default' : 'ghost'}
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setLocale(loc)}
                aria-label={`${t('common.language')}: ${loc.toUpperCase()}`}
              >
                {loc.toUpperCase()}
              </Button>
            ))}
          </div>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden" render={<Button variant="ghost" size="sm" aria-label={t('common.menu')} />}>
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-64 glass">
              <nav className="mt-8 flex flex-col gap-2">
                {NAV_ITEMS.map(({ href, labelKey, icon: Icon }) => (
                  <Link key={href} href={href} onClick={() => setOpen(false)}>
                    <Button
                      variant={pathname.startsWith(href) ? 'default' : 'ghost'}
                      className="w-full justify-start gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {t(labelKey)}
                    </Button>
                  </Link>
                ))}
                <div className="mt-4 border-t pt-4">
                  <div className="flex gap-1">
                    {LOCALES.map((loc) => (
                      <Button
                        key={loc}
                        variant={locale === loc ? 'default' : 'ghost'}
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => setLocale(loc)}
                        aria-label={`${t('common.language')}: ${loc.toUpperCase()}`}
                      >
                        {loc.toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Code2, Trophy, Users, Search, UserPlus, Send, Medal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HackathonCard } from '@/components/hackathon/hackathon-card'
import { useI18n } from '@/i18n/context'
import { getHackathons } from '@/lib/storage'
import { DotPattern } from '@/components/ui/dot-pattern'
import { NumberTicker } from '@/components/ui/number-ticker'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { Marquee } from '@/components/ui/marquee'
import { Badge } from '@/components/ui/badge'
import { DataTools } from '@/components/data-tools'

export default function HomePage() {
  const { t } = useI18n()
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const hackathons = getHackathons()
  const featured = hackathons.filter((h) => h.status !== 'ended')
  const hasEnded = hackathons.some((h) => h.status === 'ended')

  const allTags = Array.from(new Set(hackathons.flatMap((h) => h.tags)))

  return (
    <div className="space-y-16">
      {/* Announcement Banner */}
      {!bannerDismissed && (
        <div
          className="relative py-2 px-4 text-center text-sm text-white font-terminal"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
        >
          <Link
            href="/hackathons/daker-handover-2026-03"
            className="hover:underline underline-offset-2"
          >
            {t('home.announcement')}: DAKER Handover 2026-03
          </Link>
          <button
            onClick={() => setBannerDismissed(true)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:opacity-70"
            aria-label="Dismiss"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <DotPattern className="absolute inset-0 opacity-20 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-4">
          <div className="terminal rounded-lg overflow-hidden">
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span className="ml-2 font-terminal text-xs text-muted-foreground">daker-cli</span>
            </div>
            {/* Terminal body */}
            <div className="p-8 text-center space-y-6">
              <h1 className="text-gradient-purple-cyan text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                {t('hero.title')}
              </h1>
              <div className="terminal-cursor animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <p className="text-lg text-muted-foreground sm:text-xl font-terminal">
                  <span className="text-primary">{'> '}</span>{t('hero.subtitle')}
                </p>
              </div>
              <div className="animate-fade-in-up flex justify-center gap-3" style={{ animationDelay: '0.2s' }}>
                <Link href="/hackathons">
                  <ShimmerButton
                    className="mx-auto gap-2"
                    shimmerColor="#a78bfa"
                    background="linear-gradient(135deg, #6366f1, #8b5cf6)"
                  >
                    {t('hero.cta')}
                    <ArrowRight className="h-4 w-4" />
                  </ShimmerButton>
                </Link>
                <Link href="/camp">
                  <Button size="lg" variant="outline" className="brutal-button gap-2">
                    <Users className="h-4 w-4" />
                    {t('nav.camp')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tag Marquee */}
      {allTags.length > 0 && (
        <section className="mx-auto max-w-6xl px-4">
          <Marquee pauseOnHover className="[--duration:30s]">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="mx-1 px-3 py-1 font-terminal text-xs"
              >
                {tag}
              </Badge>
            ))}
          </Marquee>
        </section>
      )}

      {/* How It Works */}
      <section className="mx-auto max-w-6xl px-4">
        <h2 className="mb-6 text-2xl font-bold font-terminal">
          <span className="text-primary">{'// '}</span>{t('home.howItWorks')}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Search, title: t('home.browse'), desc: t('home.browseDesc'), color: 'text-primary', href: '/hackathons' },
            { icon: UserPlus, title: t('home.teamUp'), desc: t('home.teamUpDesc'), color: 'text-green-500', href: '/camp' },
            { icon: Send, title: t('home.submitProject'), desc: t('home.submitDesc'), color: 'text-blue-500', href: '/hackathons/daker-handover-2026-03#submit' },
            { icon: Medal, title: t('home.compete'), desc: t('home.competeDesc'), color: 'text-yellow-500', href: '/rankings' },
          ].map(({ icon: Icon, title, desc, color, href }) => (
            <Link key={title} href={href}>
              <div className="glass-card rounded-lg p-5 space-y-3 h-full">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-muted ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-terminal text-sm font-semibold">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link href="/hackathons" className="group">
            <div className="glass-card animate-fade-in-up flex items-center gap-4 p-5" style={{ animationDelay: '0.1s' }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Code2 className="h-6 w-6 text-primary text-glow" />
              </div>
              <div>
                <div className="font-terminal text-4xl text-glow">
                  <NumberTicker value={hackathons.length} />
                </div>
                <div className="text-sm text-muted-foreground">{t('nav.hackathons')}</div>
              </div>
            </div>
          </Link>
          <Link href="/camp" className="group">
            <div className="glass-card animate-fade-in-up flex items-center gap-4 p-5" style={{ animationDelay: '0.2s' }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400 text-glow-cyan" />
              </div>
              <div>
                <div className="font-terminal text-4xl text-glow-cyan">{t('nav.camp')}</div>
                <div className="text-sm text-muted-foreground">{t('team.create')}</div>
              </div>
            </div>
          </Link>
          <Link href="/rankings" className="group">
            <div className="glass-card animate-fade-in-up flex items-center gap-4 p-5" style={{ animationDelay: '0.3s' }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
                <Trophy className="h-6 w-6 text-yellow-600 dark:text-yellow-400 text-glow-amber" />
              </div>
              <div>
                <div className="font-terminal text-4xl text-glow-amber">{t('nav.rankings')}</div>
                <div className="text-sm text-muted-foreground">{t('rankings.title')}</div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Hackathons */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold font-terminal"><span className="text-primary">{'// '}</span>{t('nav.hackathons')}</h2>
            <Link href="/hackathons">
              <Button variant="ghost" size="sm" className="gap-1">
                {t('common.viewAll')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((hackathon, index) => (
              <div
                key={hackathon.slug}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <HackathonCard hackathon={hackathon} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Ended Hackathons */}
      {hasEnded && (
        <section className="mx-auto max-w-6xl px-4 pb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold font-terminal"><span className="text-primary">{'// '}</span>{t('filter.ended')}</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hackathons
              .filter((h) => h.status === 'ended')
              .map((hackathon, index) => (
                <div
                  key={hackathon.slug}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <HackathonCard hackathon={hackathon} />
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Data Tools */}
      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="glass-card rounded-lg p-4 flex items-center justify-between">
          <div>
            <h3 className="font-terminal text-sm font-semibold">{t('home.dataBackup')}</h3>
            <p className="text-xs text-muted-foreground">{t('home.dataBackupDesc')}</p>
          </div>
          <DataTools />
        </div>
      </section>
    </div>
  )
}

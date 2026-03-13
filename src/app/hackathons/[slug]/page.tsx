'use client'

import { use } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n/context'
import { getHackathon, getHackathonDetail, getTeams } from '@/lib/storage'
import { getStatusColor } from '@/lib/format'
import { HackathonOverview } from '@/components/hackathon/hackathon-overview'
import { HackathonTeams } from '@/components/hackathon/hackathon-teams'
import { HackathonEval } from '@/components/hackathon/hackathon-eval'
import { HackathonPrize } from '@/components/hackathon/hackathon-prize'
import { HackathonInfo } from '@/components/hackathon/hackathon-info'
import { HackathonSchedule } from '@/components/hackathon/hackathon-schedule'
import { HackathonSubmit } from '@/components/hackathon/hackathon-submit'
import { HackathonLeaderboard } from '@/components/hackathon/hackathon-leaderboard'
import { HackathonSidebar } from '@/components/hackathon/hackathon-sidebar'
import { ScrollspyNav } from '@/components/hackathon/scrollspy-nav'

interface PageProps {
  readonly params: Promise<{ slug: string }>
}

const SECTION_IDS = ['overview', 'schedule', 'teams', 'submit', 'eval', 'leaderboard', 'prize', 'info'] as const

export default function HackathonDetailPage({ params }: PageProps) {
  const { slug } = use(params)
  const { t } = useI18n()
  const detail = getHackathonDetail(slug)
  const hackathon = getHackathon(slug)
  const teams = getTeams(slug)

  if (!detail || !hackathon) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="terminal flex min-h-[200px] items-center justify-center rounded-lg border border-dashed">
          <p className="text-muted-foreground">{t('detail.notFound')}</p>
        </div>
      </div>
    )
  }

  const visibleSections = detail.sections.prize
    ? SECTION_IDS
    : SECTION_IDS.filter((id) => id !== 'prize')

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="font-terminal text-xs mb-4 text-muted-foreground">
        <Link href="/hackathons" className="hover:text-primary">{t('nav.hackathons')}</Link>
        <span className="mx-2 text-primary">{'>'}</span>
        <span>{hackathon.title}</span>
      </nav>

      {/* Title + Badge */}
      <div className="mb-6 flex items-center gap-3">
        <h1 className="font-terminal text-glow text-3xl font-bold">{hackathon.title}</h1>
        <Badge variant={getStatusColor(hackathon.status)} className={hackathon.status === 'ongoing' ? 'animate-neon-pulse' : ''}>
          {t(`status.${hackathon.status}`)}
        </Badge>
      </div>

      {/* Mobile sidebar content */}
      <div className="lg:hidden mb-6">
        <HackathonSidebar hackathon={hackathon} detail={detail} teamCount={teams.length} />
      </div>

      {/* Scrollspy nav */}
      <ScrollspyNav sections={visibleSections} />

      <div className="lg:flex lg:gap-6 mt-4">
        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-8">
          <section id="section-overview" className="scroll-mt-16">
            <h2 className="font-terminal text-xl font-bold mb-4">{t('nav.scrollspy.overview')}</h2>
            <div className="glass rounded-lg p-1">
              <HackathonOverview sections={detail.sections} />
            </div>
          </section>

          <section id="section-schedule" className="scroll-mt-16">
            <h2 className="font-terminal text-xl font-bold mb-4">{t('nav.scrollspy.schedule')}</h2>
            <div className="glass rounded-lg p-1">
              <HackathonSchedule sections={detail.sections} />
            </div>
          </section>

          <section id="section-teams" className="scroll-mt-16">
            <h2 className="font-terminal text-xl font-bold mb-4">{t('nav.scrollspy.teams')}</h2>
            <div className="glass rounded-lg p-1">
              <HackathonTeams sections={detail.sections} slug={slug} />
            </div>
          </section>

          <section id="section-submit" className="scroll-mt-16">
            <h2 className="font-terminal text-xl font-bold mb-4">{t('nav.scrollspy.submit')}</h2>
            <div className="glass rounded-lg p-1">
              <HackathonSubmit sections={detail.sections} slug={slug} />
            </div>
          </section>

          <section id="section-eval" className="scroll-mt-16">
            <h2 className="font-terminal text-xl font-bold mb-4">{t('nav.scrollspy.eval')}</h2>
            <div className="glass rounded-lg p-1">
              <HackathonEval sections={detail.sections} />
            </div>
          </section>

          <section id="section-leaderboard" className="scroll-mt-16">
            <h2 className="font-terminal text-xl font-bold mb-4">{t('nav.scrollspy.leaderboard')}</h2>
            <div className="glass rounded-lg p-1">
              <HackathonLeaderboard slug={slug} />
            </div>
          </section>

          {detail.sections.prize && (
            <section id="section-prize" className="scroll-mt-16">
              <h2 className="font-terminal text-xl font-bold mb-4">{t('nav.scrollspy.prize')}</h2>
              <div className="glass rounded-lg p-1">
                <HackathonPrize sections={detail.sections} />
              </div>
            </section>
          )}

          <section id="section-info" className="scroll-mt-16">
            <h2 className="font-terminal text-xl font-bold mb-4">{t('nav.scrollspy.info')}</h2>
            <div className="glass rounded-lg p-1">
              <HackathonInfo sections={detail.sections} />
            </div>
          </section>
        </div>

        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-4">
            <HackathonSidebar hackathon={hackathon} detail={detail} teamCount={teams.length} />
          </div>
        </aside>
      </div>
    </div>
  )
}

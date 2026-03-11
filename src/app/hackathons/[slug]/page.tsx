'use client'

import { use } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useI18n } from '@/i18n/context'
import { getHackathon, getHackathonDetail } from '@/lib/storage'
import { getStatusColor } from '@/lib/format'
import { HackathonOverview } from '@/components/hackathon/hackathon-overview'
import { HackathonTeams } from '@/components/hackathon/hackathon-teams'
import { HackathonEval } from '@/components/hackathon/hackathon-eval'
import { HackathonPrize } from '@/components/hackathon/hackathon-prize'
import { HackathonInfo } from '@/components/hackathon/hackathon-info'
import { HackathonSchedule } from '@/components/hackathon/hackathon-schedule'
import { HackathonSubmit } from '@/components/hackathon/hackathon-submit'
import { HackathonLeaderboard } from '@/components/hackathon/hackathon-leaderboard'

interface PageProps {
  readonly params: Promise<{ slug: string }>
}

const TAB_KEYS = [
  'overview',
  'teams',
  'eval',
  'prize',
  'info',
  'schedule',
  'submit',
  'leaderboard',
] as const

export default function HackathonDetailPage({ params }: PageProps) {
  const { slug } = use(params)
  const { t } = useI18n()
  const detail = getHackathonDetail(slug)
  const hackathon = getHackathon(slug)

  if (!detail || !hackathon) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="terminal flex min-h-[200px] items-center justify-center rounded-lg border border-dashed">
          <p className="text-muted-foreground">{t('detail.notFound')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="font-terminal text-xs mb-4 text-muted-foreground">
        <Link href="/hackathons" className="hover:text-primary">해커톤</Link>
        <span className="mx-2 text-primary">{'>'}</span>
        <span>{hackathon.title}</span>
      </nav>

      <div className="mb-6 flex items-center gap-3">
        <h1 className="font-terminal text-glow text-3xl font-bold">{hackathon.title}</h1>
        <Badge variant={getStatusColor(hackathon.status)} className={hackathon.status === 'ongoing' ? 'animate-neon-pulse' : ''}>
          {t(`status.${hackathon.status}`)}
        </Badge>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4 flex w-full overflow-x-auto flex-nowrap gap-1 bg-transparent">
          {TAB_KEYS.map((key) => (
            <TabsTrigger key={key} value={key}>
              {t(`tab.${key}`)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview">
          <div className="glass rounded-lg p-1">
            <HackathonOverview sections={detail.sections} />
          </div>
        </TabsContent>
        <TabsContent value="teams">
          <div className="glass rounded-lg p-1">
            <HackathonTeams sections={detail.sections} slug={slug} />
          </div>
        </TabsContent>
        <TabsContent value="eval">
          <div className="glass rounded-lg p-1">
            <HackathonEval sections={detail.sections} />
          </div>
        </TabsContent>
        <TabsContent value="prize">
          <div className="glass rounded-lg p-1">
            <HackathonPrize sections={detail.sections} />
          </div>
        </TabsContent>
        <TabsContent value="info">
          <div className="glass rounded-lg p-1">
            <HackathonInfo sections={detail.sections} />
          </div>
        </TabsContent>
        <TabsContent value="schedule">
          <div className="glass rounded-lg p-1">
            <HackathonSchedule sections={detail.sections} />
          </div>
        </TabsContent>
        <TabsContent value="submit">
          <div className="glass rounded-lg p-1">
            <HackathonSubmit sections={detail.sections} slug={slug} />
          </div>
        </TabsContent>
        <TabsContent value="leaderboard">
          <div className="glass rounded-lg p-1">
            <HackathonLeaderboard slug={slug} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

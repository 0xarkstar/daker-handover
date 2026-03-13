'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n/context'
import { getStatusColor, formatKRW } from '@/lib/format'
import { CountdownTimer } from '@/components/hackathon/countdown-timer'
import { Users, Calendar, Trophy, Building2 } from 'lucide-react'
import type { Hackathon, HackathonDetail } from '@/types'

interface HackathonSidebarProps {
  readonly hackathon: Hackathon
  readonly detail: HackathonDetail
  readonly teamCount: number
}

export function HackathonSidebar({ hackathon, detail, teamCount }: HackathonSidebarProps) {
  const { t } = useI18n()

  const prizeTotal = detail.sections.prize
    ? detail.sections.prize.items.reduce((sum, p) => sum + p.amountKRW, 0)
    : 0

  return (
    <div className="space-y-4">
      <CountdownTimer deadline={hackathon.period.submissionDeadlineAt} />

      <div className="glass-card rounded-lg p-4 space-y-3">
        <h3 className="font-terminal text-sm font-semibold">{t('sidebar.info')}</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t('tab.info')}</span>
            <Badge
              variant={getStatusColor(hackathon.status)}
              className={hackathon.status === 'ongoing' ? 'animate-neon-pulse' : ''}
            >
              {t(`status.${hackathon.status}`)}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {t('sidebar.deadline')}
            </span>
            <span className="font-terminal tabular-nums text-xs">
              {new Date(hackathon.period.submissionDeadlineAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              {t('tab.teams')}
            </span>
            <span className="font-terminal">{teamCount}</span>
          </div>

          {prizeTotal > 0 && (
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Trophy className="h-3.5 w-3.5" />
                {t('tab.prize')}
              </span>
              <span className="font-terminal text-xs">{formatKRW(prizeTotal)}</span>
            </div>
          )}

          {hackathon.hostName && (
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Building2 className="h-3.5 w-3.5" />
                {t('sidebar.organizer')}
              </span>
              <span className="font-terminal text-xs">{hackathon.hostName}</span>
            </div>
          )}
        </div>
      </div>

      <Link
        href={`/camp?hackathon=${hackathon.slug}`}
        className="block w-full rounded-lg bg-primary px-4 py-2.5 text-center font-terminal text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        {t('sidebar.joinTeam')}
      </Link>
    </div>
  )
}

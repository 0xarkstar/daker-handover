'use client'

import Link from 'next/link'
import { Calendar, Clock, Building2, Trophy, Users } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n/context'
import { getDDay, formatDate, formatKRW, getStatusClassName } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { Hackathon } from '@/types'

interface HackathonCardProps {
  readonly hackathon: Hackathon
}

const ACCENT_BY_STATUS: Record<string, string> = {
  ongoing: 'bg-green-500',
  upcoming: 'bg-primary',
  ended: 'bg-muted-foreground/40',
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
  const { t, locale } = useI18n()
  const statusClassName = getStatusClassName(hackathon.status)
  const dDay = getDDay(hackathon.period.submissionDeadlineAt)
  const accentClass = ACCENT_BY_STATUS[hackathon.status] ?? 'bg-muted-foreground/40'

  return (
    <Link href={`/hackathons/${hackathon.slug}`}>
      <Card className="glass-card group h-full overflow-hidden cursor-pointer">
        {/* Gradient or solid header banner */}
        {hackathon.bannerGradient ? (
          <div
            className="h-12"
            style={{ background: hackathon.bannerGradient }}
          />
        ) : (
          <div className={cn('h-12', accentClass)} />
        )}
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                {hackathon.title}
              </h3>
            </div>
            <Badge variant="outline" className={cn('shrink-0', statusClassName, hackathon.status === 'ongoing' && 'animate-neon-pulse')}>
              {t(`status.${hackathon.status}`)}
            </Badge>
          </div>
          {hackathon.hostName && (
            <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
              <Building2 className="h-3 w-3 shrink-0" />
              <span className="truncate">{hackathon.hostName}</span>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Meta badges: prize + team count */}
          {(hackathon.totalPrizeKRW || hackathon.teamCount) && (
            <div className="flex flex-col sm:flex-row gap-1.5">
              {hackathon.totalPrizeKRW && (
                <Badge variant="outline" className="text-xs font-terminal gap-1">
                  <Trophy className="h-3 w-3" />
                  {formatKRW(hackathon.totalPrizeKRW)}
                </Badge>
              )}
              {hackathon.teamCount && (
                <Badge variant="outline" className="text-xs font-terminal gap-1">
                  <Users className="h-3 w-3" />
                  {hackathon.teamCount} {t('team.members')}
                </Badge>
              )}
            </div>
          )}
          <div className="flex flex-wrap gap-1.5">
            {hackathon.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs font-terminal">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatDate(hackathon.period.submissionDeadlineAt, locale)}</span>
            </div>
            {hackathon.status !== 'ended' && (
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span className="font-terminal tabular-nums text-lg text-glow-amber">{dDay}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

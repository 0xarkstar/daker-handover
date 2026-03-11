'use client'

import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n/context'
import { getDDay, formatDate, getStatusClassName } from '@/lib/format'
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
        {/* Colored header strip */}
        <div className={cn('h-2', accentClass)} />
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
        </CardHeader>
        <CardContent className="space-y-3">
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

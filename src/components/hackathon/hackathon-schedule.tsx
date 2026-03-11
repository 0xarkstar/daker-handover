'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from '@/i18n/context'
import { formatDate, getMilestoneStatus } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { HackathonSections } from '@/types'

interface HackathonScheduleProps {
  readonly sections: HackathonSections
}

const STATUS_STYLES = {
  past: 'bg-muted-foreground/40',
  current: 'bg-primary animate-pulse-dot neon-glow-purple',
  future: 'bg-border',
} as const

const TEXT_STYLES = {
  past: 'text-muted-foreground',
  current: 'text-primary font-semibold',
  future: 'text-foreground',
} as const

const LINE_STYLES = {
  past: 'bg-primary',
  current: 'bg-primary',
  future: 'bg-border',
} as const

export function HackathonSchedule({ sections }: HackathonScheduleProps) {
  const { t, locale } = useI18n()
  const { schedule } = sections

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-terminal">{t('schedule.timeline')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-6 pl-6">
          {schedule.milestones.map((milestone, index) => {
            const status = getMilestoneStatus(milestone.at)
            const isLast = index === schedule.milestones.length - 1
            return (
              <div key={milestone.name} className="relative flex gap-4">
                {/* Connecting line segment */}
                {!isLast && (
                  <div
                    className={cn(
                      'absolute -left-[21px] top-[14px] w-px',
                      LINE_STYLES[status]
                    )}
                    style={{ height: 'calc(100% + 10px)' }}
                  />
                )}
                {/* Dot */}
                <div
                  className={cn(
                    'absolute -left-6 top-1.5 h-[10px] w-[10px] rounded-full ring-2 ring-background',
                    STATUS_STYLES[status]
                  )}
                />
                <div className="flex flex-col gap-0.5">
                  <span className={cn('text-sm', TEXT_STYLES[status])}>
                    {milestone.name}
                  </span>
                  <span className="font-terminal text-xs text-muted-foreground">
                    {formatDate(milestone.at, locale)}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

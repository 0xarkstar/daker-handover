'use client'

import Link from 'next/link'
import { ExternalLink, Pencil, Trash2, Users, RotateCw } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/context'
import { formatDate, sanitizeUrl } from '@/lib/format'
import { deleteTeam, updateTeam, getHackathon } from '@/lib/storage'
import type { Team, TeamStatus } from '@/types'

const STATUS_CYCLE: readonly TeamStatus[] = ['recruiting', 'active', 'archived'] as const

const STATUS_BADGE_STYLES: Record<TeamStatus, string> = {
  recruiting: 'border-green-500 text-green-600 dark:text-green-400 shadow-[0_0_8px_oklch(0.72_0.19_145/30%)]',
  active: 'border-primary text-primary',
  archived: 'border-muted-foreground text-muted-foreground',
}

interface TeamCardProps {
  readonly team: Team
  readonly onEdit?: (team: Team) => void
  readonly onDeleted?: () => void
}

export function TeamCard({ team, onEdit, onDeleted }: TeamCardProps) {
  const { t, locale } = useI18n()

  const effectiveStatus: TeamStatus = team.status ?? (team.isOpen ? 'recruiting' : 'archived')

  const handleDelete = () => {
    if (!window.confirm(t('common.confirmDelete'))) return
    deleteTeam(team.teamCode)
    onDeleted?.()
  }

  const handleCycleStatus = () => {
    const currentIndex = STATUS_CYCLE.indexOf(effectiveStatus)
    const nextStatus = STATUS_CYCLE[(currentIndex + 1) % STATUS_CYCLE.length]
    const isOpen = nextStatus === 'recruiting'
    updateTeam(team.teamCode, { status: nextStatus, isOpen })
    onDeleted?.()
  }

  const statusLabel = t(`team.${effectiveStatus}`)

  return (
    <Card className={`h-full glass-card ${effectiveStatus === 'archived' ? 'opacity-60' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base leading-tight line-clamp-2 font-terminal">
            {team.name}
          </h3>
          <Badge
            variant="outline"
            className={`font-terminal text-xs border ${STATUS_BADGE_STYLES[effectiveStatus]}`}
          >
            {statusLabel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {team.intro}
        </p>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          <span>
            {team.memberCount}
            {t('team.members')}
          </span>
        </div>

        {team.lookingFor.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">{t('team.lookingFor')}</p>
            <div className="flex flex-wrap gap-1">
              {team.lookingFor.map((role) => (
                <Badge key={role} variant="outline" className="text-xs font-terminal">
                  {role}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <Link
            href={`/hackathons/${team.hackathonSlug}`}
            className="hover:text-primary underline underline-offset-2"
          >
            {getHackathon(team.hackathonSlug)?.title ?? team.hackathonSlug}
          </Link>
          <span>{formatDate(team.createdAt, locale)}</span>
        </div>

        <div className="flex items-center justify-between border-t pt-3">
          <a
            href={sanitizeUrl(team.contact.url)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            aria-label={t('team.contact')}
          >
            {t('team.contact')}
            <ExternalLink className="h-3 w-3" />
          </a>
          <div className="flex gap-1">
            <Button
              className="brutal-button"
              variant="ghost"
              size="sm"
              onClick={handleCycleStatus}
              aria-label={t('team.status')}
            >
              <RotateCw className="h-3.5 w-3.5" />
              <span className="sr-only">{t('team.status')}</span>
            </Button>
            <Button
              className="brutal-button"
              variant="ghost"
              size="sm"
              onClick={() => onEdit?.(team)}
              aria-label={t('common.edit')}
            >
              <Pencil className="h-3.5 w-3.5" />
              <span className="sr-only">{t('common.edit')}</span>
            </Button>
            <Button
              className="brutal-button"
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              aria-label={t('common.delete')}
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="sr-only">{t('common.delete')}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

'use client'

import Link from 'next/link'
import { ExternalLink, Pencil, Trash2, Users } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/context'
import { formatDate } from '@/lib/format'
import { deleteTeam, updateTeam } from '@/lib/storage'
import type { Team } from '@/types'

interface TeamCardProps {
  readonly team: Team
  readonly onEdit?: (team: Team) => void
  readonly onDeleted?: () => void
}

export function TeamCard({ team, onEdit, onDeleted }: TeamCardProps) {
  const { t, locale } = useI18n()

  const handleDelete = () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    deleteTeam(team.teamCode)
    onDeleted?.()
  }

  const handleToggleOpen = () => {
    updateTeam(team.teamCode, { isOpen: !team.isOpen })
    onDeleted?.()
  }

  return (
    <Card className="h-full glass-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base leading-tight line-clamp-2 font-terminal">
            {team.name}
          </h3>
          <Badge variant={team.isOpen ? 'default' : 'secondary'} className="font-terminal text-xs">
            {team.isOpen ? t('team.open') : t('team.closed')}
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
            {team.hackathonSlug}
          </Link>
          <span>{formatDate(team.createdAt, locale)}</span>
        </div>

        <div className="flex items-center justify-between border-t pt-3">
          <a
            href={team.contact.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            aria-label="연락처"
          >
            {t('team.contact')}
            <ExternalLink className="h-3 w-3" />
          </a>
          <div className="flex gap-1">
            <Button
              className="brutal-button"
              variant="ghost"
              size="sm"
              onClick={() => onEdit?.(team)}
              aria-label="수정"
            >
              <Pencil className="h-3.5 w-3.5" />
              <span className="sr-only">{t('common.edit')}</span>
            </Button>
            <Button
              className="brutal-button"
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              aria-label="삭제"
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

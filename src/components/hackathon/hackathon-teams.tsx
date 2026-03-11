'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/context'
import { getTeams } from '@/lib/storage'
import type { HackathonSections } from '@/types'

interface HackathonTeamsProps {
  readonly sections: HackathonSections
  readonly slug: string
}

export function HackathonTeams({ sections, slug }: HackathonTeamsProps) {
  const { t } = useI18n()
  const teams = getTeams(slug)
  const preview = teams.slice(0, 3)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-terminal text-lg font-semibold">{t('tab.teams')}</h2>
        <div className="flex items-center gap-2">
          {sections.teams.campEnabled && (
            <Link href={`/camp?hackathon=${slug}&create=true`}>
              <Button size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                팀 만들기
              </Button>
            </Link>
          )}
          {sections.teams.campEnabled && (
            <Link href={`/camp?hackathon=${slug}`}>
              <Button variant="outline" size="sm">
                {t('common.viewAll')}
              </Button>
            </Link>
          )}
        </div>
      </div>

      {preview.length === 0 ? (
        <div className="flex min-h-[120px] items-center justify-center rounded-lg border border-dashed">
          <p className="text-muted-foreground">{t('empty.teams')}</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((team) => (
            <Card key={team.teamCode} size="sm">
              <CardHeader>
                <CardTitle>{team.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant={team.isOpen ? 'default' : 'outline'}>
                    {team.isOpen ? t('team.open') : t('team.closed')}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {team.memberCount}{t('team.members')}
                  </span>
                </div>
                <p className="line-clamp-2 text-xs text-muted-foreground">
                  {team.intro}
                </p>
                {team.lookingFor.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {team.lookingFor.map((role) => (
                      <Badge key={role} variant="secondary" className="text-xs">
                        {role}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

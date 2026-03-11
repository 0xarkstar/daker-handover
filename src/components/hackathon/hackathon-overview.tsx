'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from '@/i18n/context'
import type { HackathonSections } from '@/types'

interface HackathonOverviewProps {
  readonly sections: HackathonSections
}

export function HackathonOverview({ sections }: HackathonOverviewProps) {
  const { t } = useI18n()
  const { overview } = sections

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-terminal">{t('tab.overview')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap text-muted-foreground">
            {overview.summary}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-terminal">{t('overview.teamPolicy')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="font-medium">{t('overview.solo')}:</span>
              <span>{overview.teamPolicy.allowSolo ? t('overview.yes') : t('overview.no')}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="font-medium">{t('overview.maxSize')}:</span>
              <span>{overview.teamPolicy.maxTeamSize}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

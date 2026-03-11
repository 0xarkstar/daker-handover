'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from '@/i18n/context'
import type { HackathonSections } from '@/types'

interface HackathonEvalProps {
  readonly sections: HackathonSections
}

export function HackathonEval({ sections }: HackathonEvalProps) {
  const { t } = useI18n()
  const { eval: evalSection } = sections

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-terminal">{t('eval.metric')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <span className="text-sm font-medium">{evalSection.metricName}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {evalSection.description}
          </p>
        </CardContent>
      </Card>

      {evalSection.scoreDisplay && (
        <Card>
          <CardHeader>
            <CardTitle className="font-terminal">{evalSection.scoreDisplay.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {evalSection.scoreDisplay.breakdown.map((item) => (
                <li
                  key={item.key}
                  className="flex items-center justify-between text-sm"
                >
                  <span>{item.label}</span>
                  <span className="font-terminal text-primary font-medium">{item.weightPercent}%</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {evalSection.limits && (
        <Card>
          <CardHeader>
            <CardTitle className="font-terminal">{t('eval.limits')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {evalSection.limits.maxRuntimeSec !== undefined && (
                <li className="flex items-center justify-between">
                  <span>{t('eval.maxRuntime')}</span>
                  <span className="font-medium">
                    {evalSection.limits.maxRuntimeSec}s
                  </span>
                </li>
              )}
              {evalSection.limits.maxSubmissionsPerDay !== undefined && (
                <li className="flex items-center justify-between">
                  <span>{t('eval.maxSubmissions')}</span>
                  <span className="font-medium">
                    {evalSection.limits.maxSubmissionsPerDay}
                  </span>
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

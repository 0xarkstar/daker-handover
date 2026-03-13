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

  const totalRubricPoints = evalSection.rubricCriteria
    ? evalSection.rubricCriteria.reduce((sum, c) => sum + c.maxPoints, 0)
    : 0

  return (
    <div className="space-y-4">
      <Card className="glass-card">
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

      {evalSection.rubricCriteria && evalSection.rubricCriteria.length > 0 && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="font-terminal">{t('eval.rubric')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2">
              <span>{t('eval.criteria')}</span>
              <span>{t('eval.maxPoints')}</span>
            </div>
            {evalSection.rubricCriteria.map((criterion) => {
              const widthPercent = totalRubricPoints > 0
                ? (criterion.maxPoints / totalRubricPoints) * 100
                : 0
              return (
                <div key={criterion.key} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{criterion.label}</span>
                    <span className="font-terminal text-primary font-medium text-sm">
                      {criterion.maxPoints} pts
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary/80 transition-all duration-500"
                      style={{ width: `${widthPercent}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{criterion.description}</p>
                </div>
              )
            })}
            <div className="flex items-center justify-between border-t pt-3 mt-2">
              <span className="text-sm font-medium">{t('eval.totalPoints')}</span>
              <span className="font-terminal text-primary font-bold text-base">
                {totalRubricPoints} pts
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {evalSection.scoreDisplay && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="font-terminal">{t('eval.scoreBreakdown')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs text-muted-foreground mb-2">
              {evalSection.scoreDisplay.label}
            </p>
            {evalSection.scoreDisplay.breakdown.map((item) => (
              <div key={item.key} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="font-terminal text-primary font-medium">
                    {item.weightPercent}%
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.key === 'judge'
                        ? 'bg-purple-500/80'
                        : 'bg-green-500/80'
                    }`}
                    style={{ width: `${item.weightPercent}%` }}
                  />
                </div>
              </div>
            ))}
            {/* Dual-bar voting weight visualization */}
            <div className="mt-3 pt-3 border-t">
              <p className="text-xs text-muted-foreground mb-2">{t('eval.votingWeight')}</p>
              <div className="h-4 w-full rounded-full bg-muted overflow-hidden flex">
                {evalSection.scoreDisplay.breakdown.map((item) => (
                  <div
                    key={`dual-${item.key}`}
                    className={`h-full first:rounded-l-full last:rounded-r-full flex items-center justify-center text-[10px] font-terminal text-white ${
                      item.key === 'judge'
                        ? 'bg-purple-500/80'
                        : 'bg-green-500/80'
                    }`}
                    style={{ width: `${item.weightPercent}%` }}
                  >
                    {item.weightPercent}%
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-1">
                {evalSection.scoreDisplay.breakdown.map((item) => (
                  <span key={`label-${item.key}`} className="text-[10px] text-muted-foreground">
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {evalSection.limits && (
        <Card className="glass-card">
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

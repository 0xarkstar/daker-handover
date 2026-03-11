'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from '@/i18n/context'
import { formatKRW } from '@/lib/format'
import type { HackathonSections } from '@/types'

interface HackathonPrizeProps {
  readonly sections: HackathonSections
}

const PLACE_COLORS: Record<string, string> = {
  '1st': 'text-yellow-500 dark:text-yellow-400',
  '2nd': 'text-gray-400 dark:text-gray-500',
  '3rd': 'text-amber-700 dark:text-amber-500',
}

export function HackathonPrize({ sections }: HackathonPrizeProps) {
  const { t } = useI18n()
  const prize = sections.prize

  if (!prize) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">
            {t('prize.empty')}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-terminal">{t('tab.prize')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {prize.items.map((item) => (
            <li
              key={item.place}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <span
                className={`font-terminal text-sm font-semibold ${PLACE_COLORS[item.place] ?? 'text-foreground'}`}
              >
                {item.place}
              </span>
              <span className="font-terminal text-lg">
                {formatKRW(item.amountKRW)}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

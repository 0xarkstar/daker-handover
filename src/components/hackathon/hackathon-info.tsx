'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from '@/i18n/context'
import type { HackathonSections } from '@/types'

interface HackathonInfoProps {
  readonly sections: HackathonSections
}

export function HackathonInfo({ sections }: HackathonInfoProps) {
  const { t } = useI18n()
  const { info } = sections

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-terminal">{t('info.notice')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
            {info.notice.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-terminal">{t('info.links')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={info.links.rules}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-4 hover:underline"
              >
                {t('info.rules')}
              </a>
            </li>
            <li>
              <a
                href={info.links.faq}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-4 hover:underline"
              >
                {t('info.faq')}
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

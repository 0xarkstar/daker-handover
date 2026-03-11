'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useI18n } from '@/i18n/context'
import { getLeaderboard } from '@/lib/storage'
import { formatDate } from '@/lib/format'

interface HackathonLeaderboardProps {
  readonly slug: string
}

export function HackathonLeaderboard({ slug }: HackathonLeaderboardProps) {
  const { t, locale } = useI18n()
  const entries = getLeaderboard(slug)

  if (entries.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed">
        <p className="text-muted-foreground">{t('empty.leaderboard')}</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-terminal">{t('leaderboard.rank')}</TableHead>
          <TableHead className="font-terminal">{t('leaderboard.team')}</TableHead>
          <TableHead className="font-terminal">{t('leaderboard.score')}</TableHead>
          <TableHead className="font-terminal">{t('leaderboard.time')}</TableHead>
          <TableHead className="font-terminal">{t('leaderboard.participant')}</TableHead>
          <TableHead className="font-terminal">{t('leaderboard.judge')}</TableHead>
          <TableHead className="font-terminal">{t('leaderboard.artifacts')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => (
          <TableRow key={`${entry.teamName}-${entry.submittedAt}`} className={entry.rank <= 3 ? 'neon-border-purple' : ''}>
            <TableCell className="font-medium">{entry.rank}</TableCell>
            <TableCell>{entry.teamName}</TableCell>
            <TableCell>{entry.score}</TableCell>
            <TableCell className="text-muted-foreground">
              {formatDate(entry.submittedAt, locale)}
            </TableCell>
            <TableCell>
              {entry.scoreBreakdown?.participant ?? '-'}
            </TableCell>
            <TableCell>
              {entry.scoreBreakdown?.judge ?? '-'}
            </TableCell>
            <TableCell>
              {entry.artifacts ? (
                <div className="flex gap-2">
                  <a
                    href={entry.artifacts.webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline-offset-4 hover:underline text-xs"
                  >
                    Web
                  </a>
                  <a
                    href={entry.artifacts.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline-offset-4 hover:underline text-xs"
                  >
                    PDF
                  </a>
                </div>
              ) : (
                '-'
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}

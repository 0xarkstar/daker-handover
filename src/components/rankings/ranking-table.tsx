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
import type { RankingEntry } from '@/types'

interface RankingTableProps {
  readonly entries: readonly RankingEntry[]
}

const MEDALS = ['', '\u{1F947}', '\u{1F948}', '\u{1F949}'] as const

export function RankingTable({ entries }: RankingTableProps) {
  const { t } = useI18n()

  if (entries.length === 0) {
    return (
      <div className="terminal flex min-h-[200px] items-center justify-center rounded-lg border border-dashed">
        <p className="text-muted-foreground">$ {t('empty.leaderboard')}</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border brutal-card">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16 font-terminal">{t('leaderboard.rank')}</TableHead>
          <TableHead className="font-terminal">{t('leaderboard.team')}</TableHead>
          <TableHead className="text-right font-terminal">{t('rankings.totalScore')}</TableHead>
          <TableHead className="text-right font-terminal">{t('rankings.hackathonCount')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry, index) => {
          const rank = index + 1
          const medal = MEDALS[rank] ?? ''
          return (
            <TableRow key={entry.teamName} className={rank <= 3 ? 'neon-border-purple' : ''}>
              <TableCell className="font-medium">
                {medal ? `${medal} ${rank}` : rank}
              </TableCell>
              <TableCell>{entry.teamName}</TableCell>
              <TableCell className="text-right">{entry.totalScore}</TableCell>
              <TableCell className="text-right">{entry.hackathonCount}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
    </div>
  )
}

'use client'

import { useState, useCallback } from 'react'
import { Info } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/context'
import { getLeaderboard, hasVoted, castVote } from '@/lib/storage'
import { formatDate } from '@/lib/format'

interface HackathonLeaderboardProps {
  readonly slug: string
}

const MEDAL_BY_RANK: Record<number, string> = {
  1: '🥇',
  2: '🥈',
  3: '🥉',
}

export function HackathonLeaderboard({ slug }: HackathonLeaderboardProps) {
  const { t, locale } = useI18n()
  const entries = getLeaderboard(slug)
  const [votedTeams, setVotedTeams] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    for (const entry of entries) {
      if (hasVoted(slug, entry.teamName)) {
        initial[entry.teamName] = true
      }
    }
    return initial
  })

  const handleVote = useCallback((teamName: string) => {
    castVote(slug, teamName)
    setVotedTeams((prev) => ({ ...prev, [teamName]: true }))
  }, [slug])

  if (entries.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed">
        <p className="text-muted-foreground">{t('empty.leaderboard')}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Scoring formula info card */}
      <Card className="glass-card border-primary/20">
        <CardContent className="flex items-start gap-3 py-3 px-4">
          <Info className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
          <div className="space-y-1">
            <p className="text-sm font-medium font-terminal">
              {t('leaderboard.finalScore')}
            </p>
            <p className="text-xs text-muted-foreground font-terminal">
              finalScore = ({t('leaderboard.peerScore')} x 0.3) + ({t('leaderboard.judgeScore')} x 0.7)
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-terminal">{t('leaderboard.rank')}</TableHead>
              <TableHead className="font-terminal">{t('leaderboard.team')}</TableHead>
              <TableHead className="font-terminal">{t('leaderboard.score')}</TableHead>
              <TableHead className="font-terminal">{t('leaderboard.time')}</TableHead>
              <TableHead className="font-terminal">{t('leaderboard.peerScore')}</TableHead>
              <TableHead className="font-terminal">{t('leaderboard.judgeScore')}</TableHead>
              <TableHead className="font-terminal">{t('leaderboard.artifacts')}</TableHead>
              <TableHead className="font-terminal">{t('leaderboard.vote')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => {
              const medal = MEDAL_BY_RANK[entry.rank]
              const isVoted = votedTeams[entry.teamName] ?? false

              return (
                <TableRow
                  key={`${entry.teamName}-${entry.submittedAt}`}
                  className={entry.rank <= 3 ? 'neon-border-purple' : ''}
                >
                  <TableCell className="font-medium">
                    {medal ? (
                      <span className="text-lg" role="img" aria-label={`rank ${entry.rank}`}>
                        {medal}
                      </span>
                    ) : (
                      entry.rank
                    )}
                  </TableCell>
                  <TableCell>{entry.teamName}</TableCell>
                  <TableCell className="font-terminal">{entry.score}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(entry.submittedAt, locale)}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{entry.scoreBreakdown?.participant ?? '-'}</span>
                      {entry.peerVotes !== undefined && (
                        <span className="text-xs text-muted-foreground">
                          ({entry.peerVotes} votes)
                        </span>
                      )}
                    </div>
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
                  <TableCell>
                    <Button
                      variant={isVoted ? 'outline' : 'default'}
                      size="sm"
                      disabled={isVoted}
                      onClick={(e) => {
                        e.preventDefault()
                        handleVote(entry.teamName)
                      }}
                      className="font-terminal text-xs"
                    >
                      {isVoted ? t('leaderboard.voted') : t('leaderboard.vote')}
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

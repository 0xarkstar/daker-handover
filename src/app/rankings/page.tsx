'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { RankingTable } from '@/components/rankings/ranking-table'
import { useI18n } from '@/i18n/context'
import { getHackathons, getLeaderboards } from '@/lib/storage'
import type { RankingEntry } from '@/types'

export default function RankingsPage() {
  const { t } = useI18n()
  const hackathons = getHackathons()
  const leaderboards = getLeaderboards()

  const [hackathonFilter, setHackathonFilter] = useState<string | undefined>(
    undefined
  )

  const rankings: readonly RankingEntry[] = useMemo(() => {
    const accumulator = new Map<
      string,
      { totalScore: number; hackathonCount: number; hackathons: string[] }
    >()

    const slugs = hackathonFilter
      ? [hackathonFilter]
      : Object.keys(leaderboards)

    for (const slug of slugs) {
      const board = leaderboards[slug]
      if (!board) continue

      for (const entry of board.entries) {
        const existing = accumulator.get(entry.teamName)
        if (existing) {
          if (!existing.hackathons.includes(slug)) {
            accumulator.set(entry.teamName, {
              totalScore: existing.totalScore + entry.score,
              hackathonCount: existing.hackathonCount + 1,
              hackathons: [...existing.hackathons, slug],
            })
          }
        } else {
          accumulator.set(entry.teamName, {
            totalScore: entry.score,
            hackathonCount: 1,
            hackathons: [slug],
          })
        }
      }
    }

    return Array.from(accumulator.entries())
      .map(
        ([teamName, data]): RankingEntry => ({
          teamName,
          totalScore: data.totalScore,
          hackathonCount: data.hackathonCount,
          hackathons: data.hackathons,
        })
      )
      .sort((a, b) => b.totalScore - a.totalScore)
  }, [leaderboards, hackathonFilter])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-terminal"><span className="text-primary">{'// '}</span>{t('rankings.title')}</h1>
      </div>

      {/* Hackathon filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Button
          className="brutal-button"
          variant={hackathonFilter === undefined ? 'default' : 'outline'}
          size="sm"
          onClick={() => setHackathonFilter(undefined)}
        >
          {t('filter.all')}
        </Button>
        {hackathons.map((h) => (
          <Button
            key={h.slug}
            className="brutal-button"
            variant={hackathonFilter === h.slug ? 'default' : 'outline'}
            size="sm"
            onClick={() => setHackathonFilter(h.slug)}
          >
            {h.title}
          </Button>
        ))}
      </div>

      <RankingTable entries={rankings} />
    </div>
  )
}

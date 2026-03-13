'use client'

import { useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { HackathonCard } from '@/components/hackathon/hackathon-card'
import { useI18n } from '@/i18n/context'
import { getHackathons } from '@/lib/storage'
import type { Hackathon } from '@/types'

type Filter = 'all' | 'ongoing' | 'upcoming' | 'ended'
type SortKey = 'deadline' | 'title' | 'status'

const FILTERS: Filter[] = ['all', 'ongoing', 'upcoming', 'ended']

const STATUS_ORDER: Record<string, number> = { ongoing: 0, upcoming: 1, ended: 2 }

function sortHackathons(list: Hackathon[], sortKey: SortKey): Hackathon[] {
  return [...list].sort((a, b) => {
    switch (sortKey) {
      case 'deadline':
        return new Date(a.period.submissionDeadlineAt).getTime() - new Date(b.period.submissionDeadlineAt).getTime()
      case 'title':
        return a.title.localeCompare(b.title)
      case 'status':
        return (STATUS_ORDER[a.status] ?? 3) - (STATUS_ORDER[b.status] ?? 3)
      default:
        return 0
    }
  })
}

export default function HackathonsPage() {
  const { t } = useI18n()
  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('deadline')
  const hackathons = getHackathons()

  const filtered = sortHackathons(
    hackathons
      .filter((h) => filter === 'all' || h.status === filter)
      .filter((h) =>
        h.title.toLowerCase().includes(search.toLowerCase()) ||
        h.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
      ),
    sortKey
  )

  const counts = {
    all: hackathons.length,
    ongoing: hackathons.filter((h) => h.status === 'ongoing').length,
    upcoming: hackathons.filter((h) => h.status === 'upcoming').length,
    ended: hackathons.filter((h) => h.status === 'ended').length,
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-terminal"><span className="text-primary">{'// '}</span>{t('nav.hackathons')}</h1>
      </div>

      {/* Search + Sort */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('common.search')}
          className="max-w-sm font-terminal border-2"
        />
        <div className="flex items-center gap-1">
          <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
          {(['deadline', 'title', 'status'] as const).map((key) => (
            <Button
              key={key}
              variant={sortKey === key ? 'default' : 'ghost'}
              size="sm"
              className="h-7 px-2 text-xs font-terminal"
              onClick={() => setSortKey(key)}
            >
              {key === 'deadline' ? t('tab.schedule') : key === 'title' ? t('team.name') : t('filter.all')}
            </Button>
          ))}
        </div>
      </div>

      {/* Filters with counts */}
      <div className="mb-6 flex gap-2">
        {FILTERS.map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            size="sm"
            className="brutal-button gap-1.5"
            onClick={() => setFilter(f)}
          >
            {t(`filter.${f}`)}
            <Badge variant="secondary" className="ml-0.5 h-5 px-1.5 text-xs">
              {counts[f]}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed terminal">
          <p className="text-muted-foreground font-terminal">$ {t('empty.hackathons')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((hackathon) => (
            <HackathonCard key={hackathon.slug} hackathon={hackathon} />
          ))}
        </div>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { HackathonCard } from '@/components/hackathon/hackathon-card'
import { useI18n } from '@/i18n/context'
import { getHackathons } from '@/lib/storage'

type Filter = 'all' | 'ongoing' | 'upcoming' | 'ended'

const FILTERS: Filter[] = ['all', 'ongoing', 'upcoming', 'ended']

export default function HackathonsPage() {
  const { t } = useI18n()
  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')
  const hackathons = getHackathons()

  const filtered = hackathons
    .filter((h) => filter === 'all' || h.status === filter)
    .filter((h) =>
      h.title.toLowerCase().includes(search.toLowerCase()) ||
      h.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
    )

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-terminal"><span className="text-primary">{'// '}</span>{t('nav.hackathons')}</h1>
      </div>

      {/* Search */}
      <div className="mb-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('common.search') ?? '검색...'}
          className="max-w-sm font-terminal border-2"
        />
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2">
        {FILTERS.map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            size="sm"
            className="brutal-button"
            onClick={() => setFilter(f)}
          >
            {t(`filter.${f}`)}
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

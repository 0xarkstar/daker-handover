'use client'

import { Suspense, useCallback, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { TeamCard } from '@/components/camp/team-card'
import { TeamForm } from '@/components/camp/team-form'
import { useI18n } from '@/i18n/context'
import { getHackathons, getTeams } from '@/lib/storage'
import type { Team } from '@/types'

function CampContent() {
  const { t } = useI18n()
  const searchParams = useSearchParams()
  const hackathonFilter = searchParams.get('hackathon') ?? undefined

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editTeam, setEditTeam] = useState<Team | undefined>(undefined)
  const [refreshKey, setRefreshKey] = useState(0)

  const hackathons = getHackathons()
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>(
    hackathonFilter
  )

  const teams = getTeams(selectedFilter)

  const handleRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1)
  }, [])

  const handleClose = useCallback(() => {
    setDialogOpen(false)
    setEditTeam(undefined)
    handleRefresh()
  }, [handleRefresh])

  const handleEdit = useCallback((team: Team) => {
    setEditTeam(team)
    setDialogOpen(true)
  }, [])

  const handleCreate = useCallback(() => {
    setEditTeam(undefined)
    setDialogOpen(true)
  }, [])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8" key={refreshKey}>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold font-terminal"><span className="text-primary">{'// '}</span>{t('nav.camp')}</h1>
        <Button className="brutal-button" onClick={handleCreate}>
          <Plus className="mr-1 h-4 w-4" />
          {t('team.create')}
        </Button>
      </div>

      {/* Hackathon filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Button
          className="brutal-button"
          variant={selectedFilter === undefined ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedFilter(undefined)}
        >
          {t('filter.all')}
        </Button>
        {hackathons.map((h) => (
          <Button
            key={h.slug}
            className="brutal-button"
            variant={selectedFilter === h.slug ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter(h.slug)}
          >
            {h.title}
          </Button>
        ))}
      </div>

      {/* Team grid */}
      {teams.length === 0 ? (
        <div className="terminal flex min-h-[200px] items-center justify-center rounded-lg border border-dashed">
          <p className="text-muted-foreground">$ {t('empty.teams')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <TeamCard
              key={team.teamCode}
              team={team}
              onEdit={handleEdit}
              onDeleted={handleRefresh}
            />
          ))}
        </div>
      )}

      {/* Create / Edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="glass sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editTeam ? t('common.edit') : t('team.create')}
            </DialogTitle>
          </DialogHeader>
          <TeamForm
            hackathonSlug={selectedFilter}
            onClose={handleClose}
            editTeam={editTeam}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function CampPage() {
  return (
    <Suspense>
      <CampContent />
    </Suspense>
  )
}

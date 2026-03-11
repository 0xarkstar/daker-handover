'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useI18n } from '@/i18n/context'
import { addTeam, getHackathons, updateTeam } from '@/lib/storage'
import type { Team } from '@/types'

interface TeamFormProps {
  readonly hackathonSlug?: string
  readonly onClose: () => void
  readonly editTeam?: Team
}

export function TeamForm({ hackathonSlug, onClose, editTeam }: TeamFormProps) {
  const { t } = useI18n()
  const hackathons = getHackathons()

  const [selectedSlug, setSelectedSlug] = useState(
    editTeam?.hackathonSlug ?? hackathonSlug ?? ''
  )
  const [name, setName] = useState(editTeam?.name ?? '')
  const [intro, setIntro] = useState(editTeam?.intro ?? '')
  const [lookingForText, setLookingForText] = useState(
    editTeam?.lookingFor.join(', ') ?? ''
  )
  const [contactUrl, setContactUrl] = useState(editTeam?.contact.url ?? '')
  const [memberCount, setMemberCount] = useState(
    String(editTeam?.memberCount ?? 1)
  )

  const handleSave = () => {
    if (!selectedSlug || !name.trim()) return

    const lookingFor = lookingForText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    const clampedMemberCount = Math.min(10, Math.max(1, Number(memberCount) || 1))

    if (editTeam) {
      updateTeam(editTeam.teamCode, {
        hackathonSlug: selectedSlug,
        name: name.trim(),
        intro: intro.trim(),
        lookingFor,
        contact: { type: 'url', url: contactUrl.trim() },
        memberCount: clampedMemberCount,
      })
    } else {
      const team: Team = {
        teamCode: `T-${Date.now()}`,
        hackathonSlug: selectedSlug,
        name: name.trim(),
        isOpen: true,
        memberCount: clampedMemberCount,
        lookingFor,
        intro: intro.trim(),
        contact: { type: 'url', url: contactUrl.trim() },
        createdAt: new Date().toISOString(),
      }
      addTeam(team)
    }

    onClose()
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="team-hackathon" className="text-sm font-medium font-terminal">{t('team.hackathon')}</label>
        <Select value={selectedSlug} onValueChange={(v) => setSelectedSlug(v ?? '')}>
          <SelectTrigger id="team-hackathon" className="w-full">
            <SelectValue placeholder={t('team.hackathon')} />
          </SelectTrigger>
          <SelectContent>
            {hackathons.map((h) => (
              <SelectItem key={h.slug} value={h.slug}>
                {h.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="team-name" className="text-sm font-medium font-terminal">{t('team.name')}</label>
        <Input
          id="team-name"
          className="font-terminal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('team.name')}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="team-intro" className="text-sm font-medium font-terminal">{t('team.intro')}</label>
        <Textarea
          id="team-intro"
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          placeholder={t('team.intro')}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="team-lookingFor" className="text-sm font-medium font-terminal">{t('team.lookingFor')}</label>
        <Input
          id="team-lookingFor"
          className="font-terminal"
          value={lookingForText}
          onChange={(e) => setLookingForText(e.target.value)}
          placeholder="Frontend, Backend, Designer"
        />
        <p className="text-xs text-muted-foreground">쉼표로 구분 (예: Frontend, Backend, Designer)</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="team-contact" className="text-sm font-medium font-terminal">{t('team.contact')}</label>
        <Input
          id="team-contact"
          className="font-terminal"
          value={contactUrl}
          onChange={(e) => setContactUrl(e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="team-members" className="text-sm font-medium font-terminal">{t('team.members')}</label>
        <Input
          id="team-members"
          className="font-terminal"
          type="number"
          min={1}
          max={10}
          value={memberCount}
          onChange={(e) => setMemberCount(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button className="brutal-button" variant="outline" onClick={onClose}>
          {t('common.cancel')}
        </Button>
        <Button className="brutal-button" onClick={handleSave} disabled={!selectedSlug || !name.trim()}>
          {t('common.save')}
        </Button>
      </div>
    </div>
  )
}

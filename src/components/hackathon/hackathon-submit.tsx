'use client'

import { useCallback, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Confetti, type ConfettiRef } from '@/components/ui/confetti'
import { useI18n } from '@/i18n/context'
import {
  addSubmission,
  addLeaderboardEntry,
  getSubmissions,
} from '@/lib/storage'
import { formatDate } from '@/lib/format'
import type { HackathonSections, Submission, LeaderboardEntry } from '@/types'

interface HackathonSubmitProps {
  readonly sections: HackathonSections
  readonly slug: string
}

export function HackathonSubmit({ sections, slug }: HackathonSubmitProps) {
  const { t, locale } = useI18n()
  const { submit } = sections
  const confettiRef = useRef<ConfettiRef>(null)

  const [teamName, setTeamName] = useState('')
  const [notes, setNotes] = useState('')
  const [items, setItems] = useState<Record<string, string>>({})
  const [saved, setSaved] = useState(false)

  const handleItemChange = useCallback((key: string, value: string) => {
    setItems((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleSubmit = useCallback(() => {
    if (!teamName.trim()) return

    const now = new Date().toISOString()
    const submission: Submission = {
      id: crypto.randomUUID(),
      hackathonSlug: slug,
      teamName: teamName.trim(),
      items: { ...items },
      notes: notes.trim() || undefined,
      submittedAt: now,
    }

    const existingSubmissions = getSubmissions(slug)
    const isFirstSubmission = existingSubmissions.length === 0
    const score = Math.min(100, (existingSubmissions.length + 1) * 33)

    addSubmission(submission)

    const entry: LeaderboardEntry = {
      rank: 0,
      teamName: teamName.trim(),
      score,
      submittedAt: now,
    }

    addLeaderboardEntry(slug, entry)

    setSaved(true)
    setTeamName('')
    setNotes('')
    setItems({})

    if (isFirstSubmission) {
      confettiRef.current?.fire({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [teamName, notes, items, slug])

  return (
    <div className="relative space-y-4">
      <Confetti
        ref={confettiRef}
        manualstart
        className="pointer-events-none fixed inset-0 z-50 h-full w-full"
      />

      <Card>
        <CardHeader>
          <CardTitle className="font-terminal">{t('submit.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
            {submit.guide.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {submit.submissionItems && (
        <Card>
          <CardHeader>
            <CardTitle className="font-terminal">{t('submit.send')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="submit-teamName" className="font-terminal text-sm font-medium">
                {t('submit.teamName')}
              </label>
              <Input
                id="submit-teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder={t('submit.teamName')}
              />
            </div>

            {submit.submissionItems.map((item) => (
              <div key={item.key} className="space-y-1.5">
                <label htmlFor={`submit-${item.key}`} className="font-terminal text-sm font-medium">
                  {item.title}
                  <span className="ml-1 text-xs text-muted-foreground">
                    ({item.format})
                  </span>
                </label>
                <Input
                  id={`submit-${item.key}`}
                  value={items[item.key] ?? ''}
                  onChange={(e) => handleItemChange(item.key, e.target.value)}
                  placeholder={item.title}
                />
              </div>
            ))}

            <div className="space-y-1.5">
              <label htmlFor="submit-notes" className="font-terminal text-sm font-medium">
                {t('submit.notes')}
              </label>
              <Textarea
                id="submit-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t('submit.notes')}
                rows={3}
              />
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={handleSubmit} disabled={!teamName.trim()}>
                {t('submit.send')}
              </Button>
              {saved && (
                <Badge variant="secondary">{t('submit.saved')}</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {(() => {
        const submissions = getSubmissions(slug)
        if (submissions.length === 0) return null
        return (
          <div className="mt-6 space-y-2">
            <h4 className="font-terminal font-medium">{t('submit.history')}</h4>
            {submissions.map((sub) => (
              <div key={sub.id} className="rounded border p-3 text-sm">
                <div className="font-medium">{sub.teamName}</div>
                <div className="text-muted-foreground">{formatDate(sub.submittedAt, locale)}</div>
              </div>
            ))}
          </div>
        )
      })()}
    </div>
  )
}

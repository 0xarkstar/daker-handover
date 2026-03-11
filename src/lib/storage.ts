import type {
  Hackathon,
  HackathonDetail,
  Team,
  LeaderboardData,
  LeaderboardEntry,
  Submission,
} from '@/types'

const KEYS = {
  hackathons: 'hackathons',
  hackathonDetails: 'hackathonDetails',
  teams: 'teams',
  leaderboards: 'leaderboards',
  submissions: 'submissions',
  seeded: 'seeded',
} as const

function getItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  const raw = localStorage.getItem(key)
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(value))
}

// ===== Hackathons =====
export function getHackathons(): Hackathon[] {
  return getItem<Hackathon[]>(KEYS.hackathons, [])
}

export function getHackathon(slug: string): Hackathon | undefined {
  return getHackathons().find((h) => h.slug === slug)
}

// ===== Hackathon Details =====
export function getHackathonDetails(): Record<string, HackathonDetail> {
  return getItem<Record<string, HackathonDetail>>(KEYS.hackathonDetails, {})
}

export function getHackathonDetail(slug: string): HackathonDetail | null {
  const details = getHackathonDetails()
  return details[slug] ?? null
}

// ===== Teams =====
export function getTeams(hackathonSlug?: string): Team[] {
  const teams = getItem<Team[]>(KEYS.teams, [])
  if (!hackathonSlug) return teams
  return teams.filter((t) => t.hackathonSlug === hackathonSlug)
}

export function addTeam(team: Team): void {
  const teams = getTeams()
  setItem(KEYS.teams, [...teams, team])
}

export function updateTeam(teamCode: string, updates: Partial<Team>): void {
  const teams = getTeams()
  const updated = teams.map((t) =>
    t.teamCode === teamCode ? { ...t, ...updates } : t
  )
  setItem(KEYS.teams, updated)
}

export function deleteTeam(teamCode: string): void {
  const teams = getTeams()
  setItem(
    KEYS.teams,
    teams.filter((t) => t.teamCode !== teamCode)
  )
}

// ===== Leaderboards =====
export function getLeaderboards(): Record<string, LeaderboardData> {
  return getItem<Record<string, LeaderboardData>>(KEYS.leaderboards, {})
}

export function getLeaderboard(slug: string): LeaderboardEntry[] {
  const boards = getLeaderboards()
  return [...(boards[slug]?.entries ?? [])].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
  })
}

export function addLeaderboardEntry(
  slug: string,
  entry: LeaderboardEntry
): void {
  const boards = getLeaderboards()
  const existing = boards[slug] ?? {
    hackathonSlug: slug,
    updatedAt: new Date().toISOString(),
    entries: [],
  }
  const newEntries = [...existing.entries, entry].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
  })
  const ranked = newEntries.map((e, i) => ({ ...e, rank: i + 1 }))
  setItem(KEYS.leaderboards, {
    ...boards,
    [slug]: {
      ...existing,
      updatedAt: new Date().toISOString(),
      entries: ranked,
    },
  })
}

// ===== Submissions =====
export function getSubmissions(hackathonSlug?: string): Submission[] {
  const subs = getItem<Submission[]>(KEYS.submissions, [])
  if (!hackathonSlug) return subs
  return subs.filter((s) => s.hackathonSlug === hackathonSlug)
}

export function addSubmission(submission: Submission): void {
  const subs = getSubmissions()
  setItem(KEYS.submissions, [...subs, submission])
}

// ===== Seed Check =====
export function isSeeded(): boolean {
  return getItem<boolean>(KEYS.seeded, false)
}

export function markSeeded(): void {
  setItem(KEYS.seeded, true)
}

export function setHackathons(data: Hackathon[]): void {
  setItem(KEYS.hackathons, data)
}

export function setHackathonDetails(
  data: Record<string, HackathonDetail>
): void {
  setItem(KEYS.hackathonDetails, data)
}

export function setTeams(data: Team[]): void {
  setItem(KEYS.teams, data)
}

export function setLeaderboards(data: Record<string, LeaderboardData>): void {
  setItem(KEYS.leaderboards, data)
}

export function resetAll(): void {
  if (typeof window === 'undefined') return
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key))
}

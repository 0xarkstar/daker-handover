import type { HackathonDetail, LeaderboardData } from '@/types'
import {
  isSeeded,
  markSeeded,
  setHackathons,
  setHackathonDetails,
  setTeams,
  setLeaderboards,
} from './storage'

interface RawHackathonDetail {
  slug: string
  title: string
  sections: HackathonDetail['sections']
  extraDetails?: Array<{
    slug: string
    title: string
    sections: HackathonDetail['sections']
  }>
}

interface RawLeaderboard {
  hackathonSlug: string
  updatedAt: string
  entries: LeaderboardData['entries']
  extraLeaderboards?: LeaderboardData[]
}

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(path)
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`)
  return res.json() as Promise<T>
}

export async function seedIfNeeded(): Promise<void> {
  if (typeof window === 'undefined') return
  if (isSeeded()) return

  const [hackathons, rawDetail, rawLeaderboard, teams] = await Promise.all([
    fetchJson('/seed/public_hackathons.json'),
    fetchJson<RawHackathonDetail>('/seed/public_hackathon_detail.json'),
    fetchJson<RawLeaderboard>('/seed/public_leaderboard.json'),
    fetchJson('/seed/public_teams.json'),
  ])

  // Normalize hackathon details: flatten extraDetails into slug-keyed map
  const detailMap: Record<string, HackathonDetail> = {}
  detailMap[rawDetail.slug] = {
    slug: rawDetail.slug,
    title: rawDetail.title,
    sections: rawDetail.sections,
  }
  if (rawDetail.extraDetails) {
    for (const extra of rawDetail.extraDetails) {
      detailMap[extra.slug] = {
        slug: extra.slug,
        title: extra.title,
        sections: extra.sections,
      }
    }
  }

  // Normalize leaderboards: flatten extraLeaderboards into slug-keyed map
  const leaderboardMap: Record<string, LeaderboardData> = {}
  leaderboardMap[rawLeaderboard.hackathonSlug] = {
    hackathonSlug: rawLeaderboard.hackathonSlug,
    updatedAt: rawLeaderboard.updatedAt,
    entries: rawLeaderboard.entries,
  }
  if (rawLeaderboard.extraLeaderboards) {
    for (const extra of rawLeaderboard.extraLeaderboards) {
      leaderboardMap[extra.hackathonSlug] = {
        hackathonSlug: extra.hackathonSlug,
        updatedAt: extra.updatedAt,
        entries: extra.entries,
      }
    }
  }

  setHackathons(hackathons as Parameters<typeof setHackathons>[0])
  setHackathonDetails(detailMap)
  setTeams(teams as Parameters<typeof setTeams>[0])
  setLeaderboards(leaderboardMap)
  markSeeded()
}

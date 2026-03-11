// ===== Hackathon List =====
export interface HackathonPeriod {
  readonly timezone: string
  readonly submissionDeadlineAt: string
  readonly endAt: string
}

export interface HackathonLinks {
  readonly detail: string
  readonly rules: string
  readonly faq: string
}

export interface Hackathon {
  readonly slug: string
  readonly title: string
  readonly status: 'ended' | 'ongoing' | 'upcoming'
  readonly tags: readonly string[]
  readonly thumbnailUrl: string
  readonly period: HackathonPeriod
  readonly links: HackathonLinks
}

// ===== Hackathon Detail =====
export interface TeamPolicy {
  readonly allowSolo: boolean
  readonly maxTeamSize: number
}

export interface OverviewSection {
  readonly summary: string
  readonly teamPolicy: TeamPolicy
}

export interface InfoSection {
  readonly notice: readonly string[]
  readonly links: {
    readonly rules: string
    readonly faq: string
  }
}

export interface ScoreBreakdownItem {
  readonly key: string
  readonly label: string
  readonly weightPercent: number
}

export interface EvalSection {
  readonly metricName: string
  readonly description: string
  readonly scoreSource?: string
  readonly scoreDisplay?: {
    readonly label: string
    readonly breakdown: readonly ScoreBreakdownItem[]
  }
  readonly limits?: {
    readonly maxRuntimeSec?: number
    readonly maxSubmissionsPerDay?: number
  }
}

export interface Milestone {
  readonly name: string
  readonly at: string
}

export interface ScheduleSection {
  readonly timezone: string
  readonly milestones: readonly Milestone[]
}

export interface PrizeItem {
  readonly place: string
  readonly amountKRW: number
}

export interface PrizeSection {
  readonly items: readonly PrizeItem[]
}

export interface TeamsSection {
  readonly campEnabled: boolean
  readonly listUrl: string
}

export interface SubmissionItem {
  readonly key: string
  readonly title: string
  readonly format: string
}

export interface SubmitSection {
  readonly allowedArtifactTypes: readonly string[]
  readonly submissionUrl: string
  readonly guide: readonly string[]
  readonly submissionItems?: readonly SubmissionItem[]
}

export interface LeaderboardSection {
  readonly publicLeaderboardUrl: string
  readonly note: string
}

export interface HackathonSections {
  readonly overview: OverviewSection
  readonly info: InfoSection
  readonly eval: EvalSection
  readonly schedule: ScheduleSection
  readonly prize?: PrizeSection
  readonly teams: TeamsSection
  readonly submit: SubmitSection
  readonly leaderboard: LeaderboardSection
}

export interface HackathonDetail {
  readonly slug: string
  readonly title: string
  readonly sections: HackathonSections
}

// ===== Leaderboard =====
export interface LeaderboardArtifacts {
  readonly webUrl: string
  readonly pdfUrl: string
  readonly planTitle: string
}

export interface LeaderboardEntry {
  readonly rank: number
  readonly teamName: string
  readonly score: number
  readonly submittedAt: string
  readonly scoreBreakdown?: {
    readonly participant: number
    readonly judge: number
  }
  readonly artifacts?: LeaderboardArtifacts
}

export interface LeaderboardData {
  readonly hackathonSlug: string
  readonly updatedAt: string
  readonly entries: readonly LeaderboardEntry[]
}

// ===== Teams =====
export interface TeamContact {
  readonly type: string
  readonly url: string
}

export interface Team {
  readonly teamCode: string
  readonly hackathonSlug: string
  readonly name: string
  readonly isOpen: boolean
  readonly memberCount: number
  readonly lookingFor: readonly string[]
  readonly intro: string
  readonly contact: TeamContact
  readonly createdAt: string
}

// ===== Submissions (user-generated) =====
export interface Submission {
  readonly id: string
  readonly hackathonSlug: string
  readonly teamName: string
  readonly items: Record<string, string>
  readonly notes?: string
  readonly submittedAt: string
}

// ===== Rankings =====
export interface RankingEntry {
  readonly teamName: string
  readonly totalScore: number
  readonly hackathonCount: number
  readonly hackathons: readonly string[]
}

// ===== i18n =====
export type Locale = 'ko' | 'en' | 'zh' | 'ja'

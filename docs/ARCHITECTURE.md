# Architecture

## System Overview

DAKER is a client-side Next.js 16 hackathon platform. There is no backend server or database.
All state lives in the browser's `localStorage`, seeded on first visit from static JSON files
served out of `/public/seed/`. The app renders an SSR shell (layout, metadata, fonts) then
hydrates into fully client-side components that read and write through `storage.ts`.

## Data Flow

```
public/seed/*.json ──► seedIfNeeded() ──► localStorage
                                              │
Pages (SSR shell) ──► Client Components ──► storage.ts ──► localStorage
                                              │
User Actions ──► addTeam / addSubmission ──► localStorage ──► UI re-render
                      (immutable spread)
```

1. **Boot** - `Providers` calls `seedIfNeeded()`. If the `seeded` flag is absent, four JSON
   files are fetched, normalized into keyed maps, and written to localStorage.
2. **Read** - Components call `getHackathons()`, `getLeaderboard(slug)`, etc. Each helper
   deserializes from localStorage with a typed fallback.
3. **Write** - Mutation helpers (`addTeam`, `updateTeam`, `addSubmission`, `addLeaderboardEntry`)
   read the full collection, produce a new array/object via spread, and write it back.
4. **Vote** - `castVote(slug, teamName)` sets a per-team flag in localStorage. `hasVoted()`
   checks the flag to prevent duplicate votes.
5. **Reset** - `resetAll()` clears all keys; the next page load re-seeds.

## Key Architecture Decisions

| Decision | Rationale |
|---|---|
| Client-only with localStorage | Simplicity over scalability. No auth, no API, instant deploys. Trade-off: ~5 MB storage cap, no cross-device sync. |
| Scrollspy sections over tabs | All content visible at once improves discoverability. IntersectionObserver tracks active section. Matches daker.ai's navigation pattern. |
| Sidebar + main layout | Desktop: sticky sidebar (w-72) with key info + main scrollable content. Mobile: sidebar renders inline. Mirrors daker.ai's detail page pattern. |
| CSS custom properties for design system | Three visual modes (brutal, glass, terminal) share a single token layer toggled by `next-themes`. |
| i18n via React context | Avoids route-level locale segments. 130+ keys × 4 languages (ko, en, zh, ja). |
| Immutable data patterns | All type interfaces use `readonly`. Storage helpers spread into new arrays/objects. |
| Team lifecycle states | 3-state model (recruiting → active → archived) with backward compatibility to boolean `isOpen`. |
| Peer voting with weighted scoring | `finalScore = (peer × 0.3) + (judge × 0.7)`. localStorage prevents duplicate votes. |

## Component Tree

```
RootLayout (layout.tsx)
├── Skip-to-content link (a11y)
├── Providers (ThemeProvider + I18nProvider + seedIfNeeded + Toaster)
├── Header (nav links, theme toggle, language switcher, mobile Sheet)
├── <main id="main-content">
│   ├── HomePage (/)
│   │   ├── AnnouncementBanner (dismissible, gradient, links to active hackathon)
│   │   ├── Hero (terminal UI, ShimmerButton)
│   │   ├── Tag Marquee
│   │   ├── Feature Showcase (4 cards: Browse, Team Up, Submit, Compete)
│   │   ├── Stats (NumberTicker)
│   │   ├── Featured Hackathons (HackathonCard grid)
│   │   ├── Ended Hackathons
│   │   └── DataTools (seed/reset)
│   ├── HackathonsPage (/hackathons)
│   │   ├── Search input + status filter + sort
│   │   └── HackathonCard grid (gradient header, org badge, prize, team count)
│   ├── HackathonDetailPage (/hackathons/[slug])
│   │   ├── Breadcrumb + Title
│   │   ├── HackathonSidebar (mobile: inline, desktop: sticky aside)
│   │   │   ├── CountdownTimer (aria-live="polite", role="timer")
│   │   │   ├── Key Info Card (status, deadline, prize, teams, organizer)
│   │   │   └── Join Team CTA
│   │   ├── ScrollspyNav (IntersectionObserver, horizontal pills / sidebar nav)
│   │   └── Sections (all visible, scroll-mt-16)
│   │       ├── HackathonOverview
│   │       ├── HackathonSchedule
│   │       ├── HackathonTeams
│   │       ├── HackathonSubmit (3-stage: plan → web → pdf)
│   │       ├── HackathonEval (rubric progress bars, voting weight visualization)
│   │       ├── HackathonLeaderboard (peer voting, medal icons, weighted scores)
│   │       ├── HackathonPrize
│   │       └── HackathonInfo
│   ├── CampPage (/camp)
│   │   ├── Hackathon filter + Status filter (recruiting/active/archived)
│   │   ├── TeamCard grid (3-state lifecycle badges, glow effects)
│   │   └── TeamForm dialog (status selector)
│   └── RankingsPage (/rankings)
│       └── RankingTable
└── Footer
```

## File Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (fonts, metadata, skip-to-content)
│   ├── page.tsx            # Home (announcement + feature showcase)
│   ├── globals.css         # Design tokens + a11y styles (focus-visible, skip-to-content)
│   ├── hackathons/
│   │   ├── page.tsx        # Hackathon list
│   │   └── [slug]/page.tsx # Hackathon detail (scrollspy + sidebar)
│   ├── camp/page.tsx       # Team recruitment (lifecycle filter)
│   └── rankings/page.tsx   # Global rankings
├── components/
│   ├── ui/                 # shadcn/ui + Magic UI primitives
│   ├── layout/             # Header, Footer
│   ├── hackathon/          # Domain components
│   │   ├── hackathon-card.tsx       # Enriched card (gradient, badges)
│   │   ├── hackathon-eval.tsx       # Rubric visualization
│   │   ├── hackathon-leaderboard.tsx # Voting + medals
│   │   ├── hackathon-sidebar.tsx    # Sticky sidebar
│   │   ├── scrollspy-nav.tsx        # IntersectionObserver nav
│   │   ├── hackathon-overview.tsx
│   │   ├── hackathon-schedule.tsx
│   │   ├── hackathon-teams.tsx
│   │   ├── hackathon-submit.tsx
│   │   ├── hackathon-prize.tsx
│   │   ├── hackathon-info.tsx
│   │   └── countdown-timer.tsx      # aria-live, role="timer"
│   ├── camp/               # TeamCard (3-state), TeamForm (status selector)
│   ├── rankings/           # RankingTable
│   ├── providers.tsx       # Client wrapper
│   └── data-tools.tsx      # Dev seed/reset UI
├── lib/
│   ├── storage.ts          # localStorage CRUD + vote helpers
│   ├── seed.ts             # First-visit data hydration
│   ├── format.ts           # Display formatters (formatKRW, getDDay, etc.)
│   └── utils.ts            # cn() helper
├── i18n/
│   ├── context.tsx         # I18nProvider + useI18n hook
│   └── dictionaries.ts     # 130+ keys × 4 languages
└── types/
    └── index.ts            # Readonly interfaces (Hackathon, Team, etc.)
```

## How to Add a Hackathon

1. Add the hackathon summary to `public/seed/public_hackathons.json` (include `hostName`, `totalPrizeKRW`, `bannerGradient`).
2. Add detail sections to `public/seed/public_hackathon_detail.json` (include `rubricCriteria` in eval section).
3. Optionally add leaderboard data to `public/seed/public_leaderboard.json`.
4. Clear localStorage and reload to re-seed.

## How to Add a Language

1. Add locale code to `Locale` union in `types/index.ts`.
2. Add full dictionary (130+ keys) in `i18n/dictionaries.ts`.
3. Add locale to `LOCALES` array in `components/layout/header.tsx`.
4. Add `lang.XX` label in every existing dictionary.

# 04 - Comprehensive Codebase Audit vs Daker.ai

> Audited: 2026-03-12
> Auditor: Architect Agent
> Scope: Every source file in `app/src/`, all seed JSON, all 4 daker.ai snapshots

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Per-File Analysis](#2-per-file-analysis)
3. [Component Comparison Matrix](#3-component-comparison-matrix)
4. [Missing Components](#4-missing-components)
5. [Route Coverage](#5-route-coverage)
6. [State Management Analysis](#6-state-management-analysis)
7. [i18n Coverage](#7-i18n-coverage)
8. [Styling Analysis](#8-styling-analysis)
9. [Seed Data Completeness](#9-seed-data-completeness)
10. [Priority Recommendations](#10-priority-recommendations)

---

## 1. Executive Summary

The codebase implements a functional hackathon platform with 3 hackathons, team CRUD, leaderboards, submissions, i18n (4 languages), and dark mode. However, compared to daker.ai, it covers approximately **35-40%** of the feature surface. The most critical gaps are:

1. **Layout architecture** -- daker.ai uses a sidebar+main layout on every list/detail page; ours uses a flat single-column layout everywhere
2. **Hackathon detail page** -- daker.ai has a left scrollspy nav, right sidebar with real-time clock/countdown, and 11+ sections; ours has a horizontal tab bar with 8 tabs
3. **Missing entire pages** -- Basecamp (with adventurer profiles), Community, Showcase, Learning (404)
4. **Card info density** -- daker.ai cards show organizer avatar, prize badge, D-day, team count, view count; ours show only title, tags, date, D-day
5. **Footer** -- daker.ai has a rich footer with company info, social links, legal text; ours is a single line
6. **Social features** -- no likes, comments, views, shares, bookmarks anywhere
7. **Real-time elements** -- no countdown timer, no live clock, no announcement banner marquee on list pages

---

## 2. Per-File Analysis

### 2.1 Pages (app/)

#### `app/src/app/layout.tsx` (47 lines)
- **Current functionality**: Root layout with Geist fonts, Providers wrapper, Header/Footer, skip-to-content link
- **What it does well**: Clean structure, skip-to-content for accessibility, proper `suppressHydrationWarning` for theme
- **Missing vs daker.ai**: No global search bar integration, no notification region (`region "Notifications (F8)"` in daker snapshots)
- **Code quality**: Good. Uses `Readonly<>` for children prop
- **Accessibility**: Has skip-to-content link (good). Missing landmark roles beyond `<main>`
- **Responsive**: Flex column layout is fine; no sidebar layout structure
- **Suggestions**:
  - Line 39: `<main>` is correct but daker.ai wraps content in sidebar+main grid at the layout level for list pages
  - Consider adding a `<SearchProvider>` or global search state here

#### `app/src/app/page.tsx` (173 lines)
- **Current functionality**: Home page with hero (AnimatedGradientText, DotPattern), tag marquee, stats cards (hackathon count, camp, rankings), featured hackathons grid, ended hackathons grid
- **What it does well**: Magic UI components (AnimatedGradientText, DotPattern, NumberTicker, ShimmerButton, Marquee), staggered animations, clean layout
- **Missing vs daker.ai**:
  - No mountain illustration background (daker has `img "정상을 향한 여정"`)
  - No animated stats ticker ("39개 해커톤 . 80개 원정대 . 103명 모험가") -- ours shows hackathon count only
  - No "DAKER 시스템 소개" section with 4 feature cards (프로필, 원정대, 해커톤, 배지 & 랭킹)
  - No "DACON + DAKER" combined stats bar (98.4만+ 제출, 23.1만+ 팀 참여, 423개 대회 개최)
  - No bottom CTA section ("준비되셨나요?" + 회원가입 button)
  - Hero title differs: ours says "해커톤 플랫폼", daker says "AI 서비스개발 히어로의 여정을 시작하세요"
  - CTA links differ: ours goes to `/hackathons`, daker goes to `/public/hackathons`
- **Code quality**: Uses `getHackathons()` directly in render (synchronous localStorage read on every render). Should be in state or useMemo
- **Accessibility**: Stats section uses generic divs, not semantic list or `<dl>` elements
- **Responsive**: 3-col grid on large, 1-col on small -- adequate but no tablet breakpoint
- **Suggestions**:
  - Line 18-19: `getHackathons()` called in render body -- wrap in `useMemo` or `useState` with effect
  - Add the 4 system introduction cards to match daker.ai's "DAKER 시스템 소개" section
  - Add the large stats bar with platform-wide metrics
  - Add bottom CTA section

#### `app/src/app/hackathons/page.tsx` (72 lines)
- **Current functionality**: Hackathon list with search input, 4 status filter buttons, grid of HackathonCards
- **What it does well**: Search by title and tags, status filtering, empty state
- **Missing vs daker.ai**:
  - No left sidebar layout with filter counts (daker shows "전체(2), 모집중(1), 접수대기(0), 종료(1)")
  - No announcement banner marquee at top
  - No sort controls or view toggle (list/grid)
  - No "해커톤 가이드" link in sidebar
  - Filter buttons don't show counts
  - No pagination
- **Code quality**: Clean. Filter logic is correct
- **Accessibility**: No `aria-label` on filter buttons, no `role="search"` on search section
- **Responsive**: Grid is responsive. No sidebar collapse behavior needed (since no sidebar)
- **Suggestions**:
  - Wrap in a sidebar+main layout component
  - Add filter counts: `{t('filter.all')} ({hackathons.length})`
  - Add announcement marquee banner

#### `app/src/app/hackathons/[slug]/page.tsx` (102 lines)
- **Current functionality**: Detail page with breadcrumb, title+badge, horizontal TabsList with 8 tabs (overview, teams, eval, prize, info, schedule, submit, leaderboard)
- **What it does well**: Breadcrumb navigation, clean tab structure, all 8 section components
- **Missing vs daker.ai** (CRITICAL GAPS):
  - **No left scrollspy sidebar** -- daker has a collapsible tree nav: 대회안내 > (개요, 평가, 규칙, 일정, 상금, 데이터, 동의사항), 제출 > (기획서/웹링크/PPT), 리더보드, 갤러리, 게시판 > (전체/공지/업데이트/FAQ/일반)
  - **No right sidebar** -- daker has: real-time clock (HH:MM:SS), countdown timer (X일 X시 X분), deadline list, team list sidebar ("모집 중 7팀"), 참가 신청하기 CTA
  - **No gallery tab** -- daker has "갤러리" with project showcase cards
  - **No forum/board tab** -- daker has "게시판" with category tabs (전체, 공지, 업데이트, FAQ, 일반)
  - **No "데이터 설명" section** -- separate data section in daker
  - **No "동의사항" section** -- agreements/terms in daker
  - **No participation guide modal** -- daker has a 3-step guide overlay dialog
  - **No share button** on detail page header
  - **No "참가 가이드 보기" button**
  - No organizer info (avatar, name, email) in overview
  - No key metrics bar (상금, 대회기간, 접수기간, 참가팀수, 제출/저장 건수, 조회수)
  - Horizontal tabs don't work well for 8+ items on mobile -- daker uses vertical sidebar for this reason
- **Code quality**: Uses `use(params)` for async params (Next.js 16 pattern) -- correct
- **Accessibility**: TabsList with overflow-x-auto may hide tabs without keyboard navigation support
- **Responsive**: Horizontal tabs will scroll on mobile, losing discoverability
- **Suggestions**:
  - Replace horizontal tabs with a 3-column layout: left scrollspy + center content + right sidebar
  - Add countdown timer component to right sidebar
  - Add gallery and forum tabs
  - Add participation guide modal

#### `app/src/app/camp/page.tsx` (130 lines)
- **Current functionality**: Team list with create/edit dialog, hackathon filter buttons, team grid
- **What it does well**: Full CRUD (create, edit, delete via TeamCard), Suspense boundary for useSearchParams, hackathon filter
- **Missing vs daker.ai**:
  - No left sidebar layout (daker basecamp has sidebar with description, filter counts, "모험가 찾기" link, "피드백 보내기" button)
  - No announcement banner
  - No search bar
  - No sort/filter/view controls
  - No pagination
  - No "원정대그룹 가기" or "원정대 만들기" action buttons in header area
  - No bookmark button on team cards
  - No team creator avatar/tier badge
  - No visibility labels ("비공개 원정대", "초대 필요")
  - Filter doesn't show counts
- **Code quality**: Good use of `useCallback` for handlers, proper key handling with `refreshKey`
- **Accessibility**: Dialog uses DialogTitle which is good
- **Responsive**: Grid is responsive
- **Suggestions**:
  - Add search, sort, pagination
  - Add sidebar layout
  - Add team member count display like "X/X명"

#### `app/src/app/rankings/page.tsx` (96 lines)
- **Current functionality**: Global rankings page aggregating leaderboard entries across hackathons, with hackathon filter
- **What it does well**: Proper score aggregation with deduplication, useMemo for derived data, sort by total score
- **Missing vs daker.ai**: Daker doesn't have an explicit standalone rankings page at the same URL -- rankings are part of leaderboard within hackathon detail. Our rankings page is an added feature
- **Code quality**: Good. Immutable accumulator pattern
- **Accessibility**: Filter buttons lack `aria-pressed` state
- **Responsive**: Table scrolls horizontally

#### `app/src/app/error.tsx` (23 lines)
- **Current functionality**: Error boundary with error message and retry button
- **Missing vs daker.ai**: Daker has a custom 404 with Korean text and illustration. Our error page is English-only ("Something went wrong", "Try again")
- **Code quality**: Uses native `<button>` instead of `Button` component
- **Suggestions**: Use i18n for error text, use `Button` component for consistency

#### `app/src/app/not-found.tsx` (17 lines)
- **Current functionality**: 404 page with Korean text, link to home
- **What it does well**: Korean text, link to home
- **Missing vs daker.ai**: Daker 404 says "앗! 페이지를 찾을 수 없어요" + "홈으로 돌아가기" -- similar. But daker has an illustration
- **Code quality**: Uses native link styling instead of `Button` component. Not using i18n
- **Suggestions**: Use i18n, add illustration/icon

---

### 2.2 Layout Components

#### `app/src/components/layout/header.tsx` (123 lines)
- **Current functionality**: Sticky header with logo, desktop nav (3 items: hackathons, camp, rankings), dark mode toggle, language switcher (4 locales), mobile sheet menu
- **What it does well**: Responsive mobile menu, active route highlighting, theme toggle with animation, language persistence
- **Missing vs daker.ai**:
  - Only 3 nav items vs daker's 6 (해커톤, 베이스캠프, 커뮤니티, 학습, 쇼케이스, 더보기)
  - No global search bar ("원정대, 해커톤, 사용자 검색...")
  - No login button (daker has "로그인" linking to `/api/auth/dacon/login`)
  - No "더보기" dropdown for additional links
  - Logo is just Code2 icon + "DAKER" text, daker has an actual logo image
- **Code quality**: Good use of `as const` for nav items. `SheetTrigger` uses `render` prop which may be base-ui specific
- **Accessibility**: Has `aria-label` for language buttons and menu button. Missing `aria-current="page"` on active nav items
- **Responsive**: Mobile menu via Sheet component -- good
- **Suggestions**:
  - Add global search input
  - Add login button placeholder
  - Add missing nav items (community, showcase, learning, more dropdown)

#### `app/src/components/layout/footer.tsx` (18 lines)
- **Current functionality**: Minimal footer with Code2 icon, "DAKER Hackathon Platform" text, copyright year
- **Missing vs daker.ai** (MAJOR GAP):
  - Daker footer has: DACON logo, 5 links (이용약관, 대회주최문의, 서비스소개, 교육문의, 채용), social links (카카오톡, 인스타그램, 유튜브, 블로그), "AI 해커톤 플랫폼" heading, full company info (대표, 사업자번호, 통신판매업, 주소, 이메일, 전화번호)
  - Our footer is a single line -- missing 95% of footer content
- **Code quality**: Minimal and clean, but too minimal
- **Suggestions**: Expand significantly to match daker.ai footer structure

#### `app/src/components/providers.tsx` (32 lines)
- **Current functionality**: Wraps app in ThemeProvider, I18nProvider, Toaster; seeds localStorage on first load
- **What it does well**: Loading spinner while seeding, proper provider nesting
- **Code quality**: Good. The `seedIfNeeded()` async in useEffect is clean
- **Suggestions**: Consider adding error handling for seed failure

---

### 2.3 Hackathon Components

#### `app/src/components/hackathon/hackathon-card.tsx` (70 lines)
- **Current functionality**: Card with gradient header strip (color by status), title, status badge, tags, deadline date, D-day counter
- **What it does well**: Gradient by status, hover scale animation, D-day calculation, line-clamp on title
- **Missing vs daker.ai**:
  - No organizer avatar + name
  - No prize badge (e.g., "총 상금: 1,000,000원")
  - No team count
  - No view count
  - No CTA button ("참가 신청하기" / "종료됨")
  - Gradient is a flat color strip; daker uses actual thumbnail images
  - No bookmark/save button
- **Code quality**: Clean. Uses `cn()` utility properly
- **Accessibility**: Card is wrapped in `<Link>` making the whole card clickable -- good. But screen readers get a long link with all card text concatenated
- **Responsive**: Cards resize properly in grid
- **Suggestions**:
  - Add organizer info, prize amount, team/view counts
  - Add CTA button
  - Support actual thumbnail images (currently `thumbnailUrl` exists in data but unused)

#### `app/src/components/hackathon/hackathon-overview.tsx` (48 lines)
- **Current functionality**: Shows summary text and team policy (allowSolo, maxTeamSize)
- **Missing vs daker.ai**:
  - Daker overview has: title with icon, rich description paragraphs, organizer info (avatar, name, email), key info grid (상금, 대회기간, 접수기간, 참가팀수, 제출/저장건, 조회수), "참가 신청 가능" notice with D-day, "로그인하고 참가하기" button
  - Our overview is just 2 cards with plain text -- extremely sparse
- **Suggestions**: Add organizer info card, key metrics grid, participation CTA

#### `app/src/components/hackathon/hackathon-eval.tsx` (82 lines)
- **Current functionality**: Shows metric name, description, score breakdown (weight %), and limits (runtime, submissions/day)
- **What it does well**: Handles optional scoreDisplay and limits gracefully
- **Missing vs daker.ai**:
  - Daker eval has a detailed table with 4 criteria (기본구현 30, 확장/아이디어 30, 완성도 25, 문서/설명 15) with descriptions
  - Daker has a "단계별 평가 비율" visual showing percentages per phase (기획서 확인, 웹링크 확인, 1차 투표)
  - Our eval is more generic/abstract; daker's is more visual
- **Suggestions**: Add evaluation criteria table, add phase-based evaluation visual

#### `app/src/components/hackathon/hackathon-prize.tsx` (61 lines)
- **Current functionality**: Prize list with place labels and KRW amounts, gold/silver/bronze colors
- **What it does well**: Color coding for 1st/2nd/3rd, proper KRW formatting, empty state
- **Missing vs daker.ai**:
  - No total prize display ("총 상금: 1,000,000원")
  - No emoji/icon decorations (daker uses medal emojis)
  - Place labels are "1st/2nd/3rd" (English) even in Korean locale
- **Suggestions**: Add total prize header, localize place labels, add medal emojis

#### `app/src/components/hackathon/hackathon-info.tsx` (62 lines)
- **Current functionality**: Notice list and external links (rules, FAQ)
- **What it does well**: External links with `target="_blank"` and `rel="noopener noreferrer"`
- **Missing vs daker.ai**:
  - Daker splits rules into multiple subsections: 제출물, 웹페이지, 솔루션설명자료, 개발/배포규칙, 공정성/저작권, 심사관련유의사항
  - Our version is a flat bullet list + 2 links
- **Suggestions**: Structure rules into collapsible subsections

#### `app/src/components/hackathon/hackathon-schedule.tsx` (80 lines)
- **Current functionality**: Vertical timeline with dots (past/current/future styling), connecting lines, milestone dates
- **What it does well**: Excellent timeline visualization with past/current/future states, animated pulse on current milestone, proper line coloring
- **Missing vs daker.ai**:
  - Daker has numbered steps (1-8) in circles
  - Daker shows date ranges (e.g., "3/5 14:00 ~ 3/30 10:00") not single dates
  - Daker has "진행중" badge on active steps
  - Daker has category labels (기타, 제출, 평가) on each step
- **Code quality**: Good. Clean separation of style constants
- **Suggestions**: Add step numbers, date ranges, category labels, "진행중" badge

#### `app/src/components/hackathon/hackathon-submit.tsx` (176 lines)
- **Current functionality**: Submission form with team name, dynamic fields from submissionItems, notes, confetti on submit, submission history list
- **What it does well**: Dynamic form fields based on data, confetti celebration, localStorage persistence, score generation
- **Missing vs daker.ai**:
  - Daker has 3 separate submission types (기획서, 웹링크, PPT) each with their own form/section and deadline
  - Our form has all items in one combined form
  - No submission deadline display per item
  - No submission count tracking per type
  - No file upload support (daker supports PDF upload)
  - "이전 제출 내역" is hardcoded Korean -- should use i18n
- **Code quality**:
  - Line 163: Hardcoded Korean string "이전 제출 내역" not using i18n
  - IIFE in JSX (`(() => { ... })()`) at line 158 -- should be a separate component or extracted variable
  - `getSubmissions(slug)` called in render without memoization
- **Accessibility**: Form has proper `htmlFor` labels -- good
- **Suggestions**:
  - Split into tabbed submission types with individual deadlines
  - Extract submission history into its own component
  - Add missing i18n keys

#### `app/src/components/hackathon/hackathon-leaderboard.tsx` (91 lines)
- **Current functionality**: Table with rank, team, score, time, participant score, judge score, artifacts (web/PDF links)
- **What it does well**: Complete score breakdown display, artifact links, empty state
- **Missing vs daker.ai**:
  - No entry count badge (daker shows "138" next to "리더보드")
  - No sorting capability
  - No pagination for large boards
  - No search/filter within leaderboard
- **Code quality**: Good. Proper table structure
- **Suggestions**: Add count badge, sorting, pagination

#### `app/src/components/hackathon/hackathon-teams.tsx` (85 lines)
- **Current functionality**: Shows first 3 teams as preview cards with create/view-all links
- **What it does well**: Preview + link to full camp page, create team shortcut
- **Missing vs daker.ai**:
  - Daker right sidebar shows team list with avatars and member counts in a compact format
  - "팀 만들기" button text is hardcoded Korean (not i18n)
- **Code quality**: Line 33 hardcoded "팀 만들기" should use i18n
- **Suggestions**: Use i18n for all strings

---

### 2.4 Camp Components

#### `app/src/components/camp/team-card.tsx` (117 lines)
- **Current functionality**: Team card with name, status badge, intro, member count, looking-for roles, hackathon link, contact link, edit/delete buttons
- **What it does well**: Full CRUD actions, role badges, external link with proper attributes
- **Missing vs daker.ai**:
  - No team creator avatar + tier badge (Bronze/Silver)
  - No bookmark button
  - No linked hackathon gradient strip (daker cards show hackathon name in gradient banner)
  - No "초대 필요" / "비공개 원정대" labels
  - No deadline display
  - No view count
  - `window.confirm` for delete is basic -- should use a dialog
- **Code quality**:
  - Line 22: `handleDelete` uses `window.confirm` -- not consistent with the dialog pattern used elsewhere
  - Line 28: `handleToggleOpen` calls `onDeleted?.()` which is misleading -- it's really a refresh callback
- **Accessibility**: Edit/delete buttons have `aria-label` -- good. But hardcoded Korean in aria-labels
- **Suggestions**: Add team creator info, replace confirm with dialog, rename `onDeleted` to `onRefresh`

#### `app/src/components/camp/team-form.tsx` (161 lines)
- **Current functionality**: Create/edit team form with hackathon select, name, intro, looking-for (comma-separated), contact URL, member count
- **What it does well**: Edit mode pre-fills, validation (requires slug + name), member count clamping
- **Missing vs daker.ai**:
  - No role-based member slots (daker has specific role slots with icons)
  - No team visibility setting (public/private)
  - No "초대 필요" toggle
  - Line 125: Hardcoded Korean help text "쉼표로 구분"
- **Code quality**:
  - Uses controlled inputs properly
  - `teamCode: `T-${Date.now()}``: Not collision-resistant (two rapid creates could collide), but acceptable for localStorage
- **Accessibility**: All inputs have `htmlFor` labels -- good
- **Suggestions**: Add visibility toggle, replace hardcoded Korean strings with i18n

---

### 2.5 Rankings Component

#### `app/src/components/rankings/ranking-table.tsx` (62 lines)
- **Current functionality**: Table with rank (medals for top 3), team name, total score, hackathon count
- **What it does well**: Medal emojis for top 3, clean table layout
- **Code quality**: Good. Uses `as const` for MEDALS array
- **Accessibility**: Table has proper headers
- **Suggestions**: Add pagination for large datasets

---

### 2.6 UI Components (shadcn + Magic UI)

#### shadcn/ui primitives (14 files)
Files: `button.tsx`, `card.tsx`, `badge.tsx`, `tabs.tsx`, `input.tsx`, `textarea.tsx`, `select.tsx`, `table.tsx`, `separator.tsx`, `avatar.tsx`, `scroll-area.tsx`, `tooltip.tsx`, `dialog.tsx`, `sheet.tsx`

These are standard shadcn/ui components. They are properly installed and provide the design system foundation. **No issues found.**

#### Magic UI components (6 files)
- `animated-gradient-text.tsx` -- Working, used in hero
- `number-ticker.tsx` -- Working, used in stats
- `shimmer-button.tsx` -- Working, used in hero CTA
- `dot-pattern.tsx` -- Working, used in hero background
- `marquee.tsx` -- Working, used for tag display
- `confetti.tsx` -- Working, used in submissions

**Assessment**: Good selection of Magic UI components. Could add more: `bento-grid` for system intro section, `border-beam` for cards, `icon-cloud` for tech stacks.

---

### 2.7 Utility Files

#### `app/src/lib/utils.ts` (7 lines)
- Standard `cn()` utility -- no issues

#### `app/src/lib/format.ts` (98 lines)
- **Current functionality**: Date formatting, relative time, D-day calculation, milestone status, KRW formatting, status color/label helpers
- **What it does well**: Locale-aware date formatting with date-fns, multiple format helpers
- **Missing**:
  - No countdown timer formatter (hours:minutes:seconds)
  - No "X일 X시 X분" countdown format (as shown in daker.ai right sidebar)
  - `getStatusLabel` at line 87 duplicates what the i18n system does
- **Suggestions**: Add countdown formatting, remove duplicate `getStatusLabel`

#### `app/src/lib/storage.ts` (163 lines)
- **Current functionality**: localStorage CRUD for hackathons, details, teams, leaderboards, submissions
- **What it does well**: Type-safe wrappers, clean separation, SSR guard (`typeof window`)
- **Missing**:
  - No data for: community posts, showcase projects, user profiles, adventurers, notifications, bookmarks, likes, comments, views
  - No data versioning/migration strategy
  - `resetAll()` exists but no UI to trigger it
- **Code quality**: Good. Immutable update patterns (spread + filter)
- **Suggestions**: Add storage for missing data types as features are added

#### `app/src/lib/seed.ts` (86 lines)
- **Current functionality**: Fetches 4 JSON seed files, normalizes detail/leaderboard data from nested format to keyed maps
- **What it does well**: Handles `extraDetails` and `extraLeaderboards` normalization cleanly
- **Missing**: No error recovery -- if one fetch fails, all seeding fails silently (Promise.all)
- **Suggestions**: Add individual error handling per fetch, or use `Promise.allSettled`

#### `app/src/types/index.ts` (185 lines)
- **Current functionality**: TypeScript interfaces for all data types
- **What it does well**: Proper `readonly` on all fields (immutability), clean separation by domain
- **Missing types for daker.ai features**:
  - `UserProfile` (avatar, tier, roles, skills, bio)
  - `CommunityPost` (title, content, author, tags, likes, comments, views, media type)
  - `ShowcaseProject` (title, description, author, category, likes, comments, views, thumbnail)
  - `Adventurer` (username, avatar, tier, roles, skills, stats)
  - `Notification`
  - `Bookmark`
  - `Comment`
  - Hackathon is missing: `organizer` field, `prizeTotal`, `teamCount`, `viewCount`, `registrationPeriod`
  - Team is missing: `creatorAvatar`, `tier`, `visibility`, `inviteRequired`

#### `app/src/i18n/context.tsx` (58 lines)
- **Current functionality**: React context providing `locale`, `setLocale`, `t()` with localStorage persistence
- **What it does well**: Proper memoization, SSR guard, document.lang update
- **Code quality**: Good. Uses `useCallback` and `useMemo` correctly
- **Suggestions**: No major issues

#### `app/src/i18n/dictionaries.ts` (333 lines)
- **Current functionality**: 83 translation keys per locale (ko, en, zh, ja)
- **What it does well**: Complete coverage for existing features, all 4 locales
- **Missing keys for new features** (listed in Section 7)
- **Code quality**: `t()` export at line 330 is unused (only context's `t` is used)
- **Suggestions**: Remove standalone `t()` export or keep for server-side use

#### `app/src/app/globals.css` (191 lines)
- **Current functionality**: Tailwind v4 imports, shadcn CSS variables (light + dark), custom animations (fade-in-up, pulse-dot, gradient, shimmer, marquee)
- **What it does well**: Complete light/dark theme variables, clean animation definitions, oklch color space (modern)
- **Missing**: No sidebar-specific responsive utilities
- **Suggestions**: Add custom animations for countdown timer if needed

---

## 3. Component Comparison Matrix

| Our Component | Daker.ai Equivalent | Gap Score (1-10) | Specific Gaps |
|---|---|---|---|
| `page.tsx` (home) | Home page | **7/10** | Missing: mountain bg, stats ticker, 4 system intro cards, combined stats bar, bottom CTA |
| `hackathons/page.tsx` | `/public/hackathons` | **7/10** | Missing: left sidebar, announcement banner, sort/view toggle, pagination, filter counts |
| `hackathons/[slug]/page.tsx` | `/public/hackathons/[slug]` | **9/10** | Missing: left scrollspy, right sidebar with countdown, gallery, forum, data section, agreements, guide modal, share button, organizer info, metrics bar |
| `hackathon-card.tsx` | Hackathon list card | **6/10** | Missing: organizer avatar, prize badge, team count, view count, CTA button, thumbnail image |
| `hackathon-overview.tsx` | 대회 개요 section | **7/10** | Missing: organizer info, key metrics grid, participation CTA, rich description |
| `hackathon-eval.tsx` | 평가 기준 section | **5/10** | Missing: criteria table, phase evaluation visual |
| `hackathon-prize.tsx` | 상금 및 혜택 section | **4/10** | Missing: total prize header, medal emojis, localized labels |
| `hackathon-info.tsx` | 규칙/가이드라인 section | **5/10** | Missing: structured subsections |
| `hackathon-schedule.tsx` | 상세 일정 section | **4/10** | Missing: step numbers, date ranges, category labels, "진행중" badge |
| `hackathon-submit.tsx` | 제출 section | **6/10** | Missing: separate submission types, per-type deadlines, file upload |
| `hackathon-leaderboard.tsx` | 리더보드 section | **4/10** | Missing: entry count, sorting, pagination |
| `hackathon-teams.tsx` | Teams in detail sidebar | **5/10** | Missing: avatar display, compact sidebar format |
| `camp/page.tsx` | `/public/basecamp` | **7/10** | Missing: sidebar, search, sort, pagination, adventurer link |
| `team-card.tsx` | 원정대 card | **6/10** | Missing: creator avatar/tier, hackathon gradient strip, bookmark, visibility labels |
| `team-form.tsx` | Team create form | **4/10** | Missing: role slots, visibility toggle |
| `rankings/page.tsx` | No exact equivalent | **3/10** | Our addition. Works well for what it is |
| `header.tsx` | Top navigation | **6/10** | Missing: 3 nav items, global search, login button, logo image |
| `footer.tsx` | Footer | **9/10** | Missing: all links, social icons, company info, legal text |
| -- (none) | Community page | **10/10** | Entire page missing |
| -- (none) | Showcase page | **10/10** | Entire page missing |
| -- (none) | Adventurers page | **10/10** | Entire page missing |
| -- (none) | Learning page | **10/10** | Entire page missing (daker has 404 too) |
| -- (none) | Right sidebar | **10/10** | Countdown, clock, deadlines, team sidebar |
| -- (none) | Left scrollspy sidebar | **10/10** | Section navigation for detail page |
| -- (none) | Participation guide modal | **10/10** | 3-step onboarding overlay |
| -- (none) | Announcement banner | **10/10** | Marquee-style notice on list pages |

**Average gap score: 6.8/10** (where 10 = completely missing, 1 = near-parity)

---

## 4. Missing Components (Not Yet Created)

### 4.1 Layout Components

#### `SidebarLayout`
- **Purpose**: Reusable sidebar + main content wrapper used on all list pages
- **Props**: `sidebar: ReactNode`, `children: ReactNode`, `sidebarPosition?: 'left' | 'right'`
- **Data**: None (pure layout)
- **Pages**: hackathon list, basecamp, community, showcase, hackathon detail
- **Complexity**: Low

#### `ScrollspySidebar`
- **Purpose**: Left sidebar with section links that highlight based on scroll position
- **Props**: `sections: Array<{id, label, children?}>`, `activeSection: string`
- **Data**: Section metadata from hackathon detail
- **Pages**: Hackathon detail page
- **Complexity**: Medium (needs IntersectionObserver)

#### `RightInfoSidebar`
- **Purpose**: Right sidebar with countdown timer, deadlines, team preview
- **Props**: `deadline: string`, `milestones: Milestone[]`, `teams: Team[]`, `hackathonSlug: string`
- **Data**: Hackathon detail + teams
- **Pages**: Hackathon detail page
- **Complexity**: Medium (countdown needs setInterval)

#### `AnnouncementBanner`
- **Purpose**: Marquee-style scrolling notice bar at top of list pages
- **Props**: `notices: Array<{text, type}>`, `className?: string`
- **Data**: Static or from seed data
- **Pages**: All list pages
- **Complexity**: Low (can use existing Marquee component)

### 4.2 Feature Components

#### `CountdownTimer`
- **Purpose**: Real-time countdown showing days/hours/minutes/seconds + current clock
- **Props**: `targetDate: string`, `showClock?: boolean`
- **Data**: Deadline date from hackathon
- **Pages**: Hackathon detail right sidebar
- **Complexity**: Low

#### `ParticipationGuideModal`
- **Purpose**: 3-step onboarding overlay for hackathon participation
- **Props**: `open: boolean`, `onClose: () => void`
- **Data**: Static step content
- **Pages**: Hackathon detail page
- **Complexity**: Low

#### `HackathonGallery`
- **Purpose**: Project showcase grid within hackathon detail
- **Props**: `hackathonSlug: string`
- **Data**: Gallery items (new data type needed)
- **Pages**: Hackathon detail page
- **Complexity**: Medium

#### `HackathonForum`
- **Purpose**: Discussion board with category tabs within hackathon detail
- **Props**: `hackathonSlug: string`
- **Data**: Forum posts (new data type needed)
- **Pages**: Hackathon detail page
- **Complexity**: High

#### `OrganizerInfo`
- **Purpose**: Organizer card with avatar, name, email
- **Props**: `organizer: {name, avatar, email}`
- **Data**: From hackathon detail (needs new field)
- **Pages**: Hackathon detail overview
- **Complexity**: Low

#### `MetricsBar`
- **Purpose**: Key info grid showing prize, period, team count, submissions, views
- **Props**: `metrics: Record<string, string | number>`
- **Data**: From hackathon detail (needs new fields)
- **Pages**: Hackathon detail overview
- **Complexity**: Low

### 4.3 Entire Missing Pages

#### `CommunityPage` (`/community`)
- **Components needed**: CommunityLayout, PostCard, PostList, CategorySidebar, PinnedPosts, TrendingPosts, TopPosts, UserRanking
- **Data needed**: `CommunityPost[]`, `UserProfile[]`
- **Complexity**: High

#### `ShowcasePage` (`/public/showcase`)
- **Components needed**: ShowcaseLayout, ProjectCard, ProjectGrid, CategoryFilter
- **Data needed**: `ShowcaseProject[]`
- **Complexity**: Medium

#### `AdventurersPage` (`/public/adventurers`)
- **Components needed**: AdventurerCard, AdventurerGrid, RoleFilter, SkillFilter
- **Data needed**: `Adventurer[]`
- **Complexity**: Medium

#### `CommunityPostDetail` (`/community/[slug]`)
- **Components needed**: PostContent, CommentList, CommentForm, LikeButton
- **Data needed**: `CommunityPost`, `Comment[]`
- **Complexity**: High

---

## 5. Route Coverage

| Daker.ai Route | Our Route | Status |
|---|---|---|
| `/` | `/` | Implemented (partial) |
| `/public/hackathons` | `/hackathons` | Implemented (partial) |
| `/public/hackathons/[slug]` | `/hackathons/[slug]` | Implemented (partial) |
| `/public/basecamp` | `/camp` | Implemented (partial) |
| `/public/adventurers` | -- | **MISSING** |
| `/public/showcase` | -- | **MISSING** |
| `/public/showcase/new` | -- | **MISSING** |
| `/community` | -- | **MISSING** |
| `/community/[slug]` | -- | **MISSING** |
| `/public/learn` | -- | **MISSING** (404 on daker too) |
| `/profile/[id]` | -- | **MISSING** |
| `/adventurer/[username]` | -- | **MISSING** |
| `/api/auth/dacon/login` | -- | **MISSING** (auth not implemented) |
| `/login` | -- | **MISSING** |
| -- | `/rankings` | Our addition (not in daker) |

**Route pattern notes**:
- Daker uses `/public/` prefix for public-facing pages; our routes omit this prefix
- Daker uses UUID-style IDs for profiles (`/profile/7aeeb654-...`)
- Daker uses username slugs for adventurers (`/adventurer/daconer`)

---

## 6. State Management Analysis

### Current Approach
- **localStorage** for all persistent data (hackathons, details, teams, leaderboards, submissions)
- **useState** for component-local state (filters, forms, dialogs)
- **React Context** for i18n (locale + translations)
- **next-themes** for dark/light mode

### What Additional State Is Needed

| Feature | State Type | Recommendation |
|---|---|---|
| Community posts | Persistent | localStorage (same pattern as teams) |
| Showcase projects | Persistent | localStorage |
| User bookmarks | Persistent | localStorage with user-scoped keys |
| Likes/views | Persistent | localStorage with counters |
| Notifications | Session | useState + context or localStorage |
| Countdown timers | Transient | useState + setInterval |
| Scroll position (scrollspy) | Transient | useState + IntersectionObserver |
| Global search results | Transient | useState, possibly React Context |
| Auth state (mock) | Persistent | localStorage + context |

### Real-time State Requirements
- Countdown timer: needs `setInterval` updating every second
- Announcement banner: uses CSS animation (no JS state needed)
- Community trending: periodic or manual refresh

### Cross-Component State Sharing Needs
- **Global search**: needs context or URL params for cross-page search
- **Auth state**: if adding login button, needs context accessible by header + all pages
- **Bookmark state**: needs to be accessible by both camp/team cards and a bookmarks page

---

## 7. i18n Coverage

### Existing Keys (83 per locale)
All 83 keys are present in all 4 locales (ko, en, zh, ja). Coverage for existing features is complete.

### Missing Keys for New Features

```
# Navigation
'nav.community'
'nav.showcase'
'nav.learning'
'nav.more'
'nav.login'

# Search
'search.placeholder' (= "원정대, 해커톤, 사용자 검색...")
'search.noResults'

# Home page - missing sections
'home.statsTitle' (= "DAKER 시스템 소개")
'home.statsSubtitle'
'home.profile'
'home.expedition'
'home.hackathon'
'home.badges'
'home.bottomCta'
'home.signup'

# Hackathon detail - missing sections
'tab.gallery'
'tab.forum'
'tab.data'
'tab.agreements'
'detail.organizer'
'detail.prize'
'detail.period'
'detail.registrationPeriod'
'detail.teamCount'
'detail.submissions'
'detail.views'
'detail.participationGuide'
'detail.countdown'
'detail.currentTime'
'detail.deadline'
'detail.share'

# Submission types
'submit.plan'
'submit.weblink'
'submit.ppt'
'submit.history'

# Community
'community.title'
'community.pinned'
'community.trending'
'community.topPosts'
'community.userRanking'
'community.daily'
'community.weekly'
'community.monthly'
'community.feedback'

# Social
'social.like'
'social.comment'
'social.share'
'social.bookmark'
'social.views'

# Adventurers
'adventurer.findTitle'
'adventurer.search'
'adventurer.roles'
'adventurer.skills'

# Showcase
'showcase.title'
'showcase.newProject'
'showcase.categories'

# Footer
'footer.terms'
'footer.hostInquiry'
'footer.serviceIntro'
'footer.eduInquiry'
'footer.hiring'

# Error pages
'error.title'
'error.retry'
'error.notFound'
'error.goHome'
```

### Translation Quality
- Existing translations are accurate and natural-sounding
- ko is the primary language and reads well
- en translations are grammatically correct
- zh and ja translations appear correct (standard terminology)
- Minor: `'team.members': '명'` in ko -- the Korean counter word; en says "members" which works differently grammatically

---

## 8. Styling Analysis

### Current Tailwind Patterns
- Consistent use of `mx-auto max-w-6xl px-4` for page containers
- `space-y-*` for vertical spacing
- `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` for card grids
- shadcn's CSS variable system for theming (oklch colors)
- `animate-fade-in-up` custom animation
- `animate-pulse-dot` for timeline current state

### Inconsistencies
1. **Container width**: All pages use `max-w-6xl` which is correct for single-column but won't work for sidebar layouts (need wider or different approach)
2. **Page padding**: Most pages use `py-8` but home page uses `py-24` for hero -- inconsistent section spacing
3. **Card sizing**: `hackathon-card.tsx` has no explicit height constraint but uses `h-full` -- could cause uneven heights in grid
4. **Button styling**: Some buttons are hardcoded Korean text (hackathon-teams line 33, team-form line 125), some use i18n

### Missing Utility Classes
- No sidebar-specific classes (width, collapse, sticky behavior)
- No scrollspy active indicator styles
- No countdown timer digit styles (flip-clock effect, etc.)
- No marquee announcement-specific styles (the existing marquee is used for tags only)

### Dark Mode Coverage
- **Good**: All CSS variables have dark mode equivalents
- **Good**: Status colors use `dark:` variants (hackathon-card, format.ts)
- **Good**: Chart colors defined for both modes
- **Gap**: No dark mode testing for new components (community cards, etc.)
- **Minor**: `confetti.tsx` console.error calls (line 71, 91, 133) -- not a styling issue but present

---

## 9. Seed Data Completeness

### `public_hackathons.json` (3 hackathons)
- **Present**: slug, title, status, tags, thumbnailUrl, period, links
- **Missing**:
  - `organizer` (name, avatar, email) -- daker shows organizer on cards
  - `prizeTotal` -- daker shows "총 상금: 1,000,000원" on cards
  - `teamCount` -- daker shows team count on cards
  - `viewCount` -- daker shows view count
  - `registrationPeriod` (separate from submissionDeadline)
  - `thumbnailUrl` uses `https://example.com/...` placeholder -- not actual images
- **Improvement**: Add organizer, prizeTotal, teamCount, viewCount fields

### `public_hackathon_detail.json` (3 hackathons via extraDetails)
- **Present**: Complete sections for overview, info, eval, schedule, teams, submit, leaderboard; prize for 2/3 hackathons
- **Missing**:
  - No `gallery` section data
  - No `forum` section data
  - No `agreements` section data
  - No `data` (데이터 설명) section data
  - No organizer info in overview section
  - No view counts, team counts, submission counts
  - Schedule milestones have single dates, not date ranges
- **Structure improvement**: Add `organizer`, `gallery`, `forum`, `agreements`, `dataDescription` to sections type

### `public_teams.json` (4 teams)
- **Present**: teamCode, hackathonSlug, name, isOpen, memberCount, lookingFor, intro, contact, createdAt
- **Missing**:
  - `creatorName`, `creatorAvatar`, `creatorTier` (daker shows creator with tier badge)
  - `visibility` (public/private)
  - `inviteRequired` (boolean)
  - `deadline` (team recruitment deadline)
  - `viewCount`
  - `bookmarkCount`
- **Volume**: Only 4 teams -- daker shows 117 total. Consider adding more seed teams for pagination testing

### `public_leaderboard.json` (3 hackathons via extraLeaderboards)
- **Present**: rank, teamName, score, submittedAt, scoreBreakdown (for handover), artifacts (for handover)
- **Missing**:
  - Entry counts are very low (2, 1, 2) -- daker shows 138 entries. Add more for pagination
  - No `avatarUrl` for team/user
- **Volume**: Too few entries to test pagination

### Missing Seed Files Entirely
- `public_community_posts.json` -- needed for community page
- `public_showcase_projects.json` -- needed for showcase page
- `public_adventurers.json` -- needed for adventurers page
- `public_announcements.json` -- needed for announcement banner on list pages
- `public_users.json` -- needed for user profiles, tier badges

---

## 10. Priority Recommendations

### P0 - Critical (Hackathon evaluation criteria alignment)

These directly affect hackathon scoring (완성도 25점: 사용성, 안정성, 접근성/반응형):

1. **Hackathon detail page overhaul** -- Replace horizontal tabs with 3-column layout (scrollspy + content + right sidebar with countdown). This is the single highest-impact change. Affects: `hackathons/[slug]/page.tsx`
   - Effort: High | Impact: Very High

2. **Footer expansion** -- Match daker.ai footer with all links, social icons, company info. Currently 18 lines, needs ~100 lines.
   - Effort: Low | Impact: Medium (completeness/사용성)

3. **Hackathon card enrichment** -- Add organizer, prize badge, team count, view count, CTA button. Update `hackathon-card.tsx` and `Hackathon` type.
   - Effort: Medium | Impact: High (first impression)

### P1 - High Priority

4. **Left sidebar layout** -- Create reusable `SidebarLayout` component for hackathon list, camp, future pages.
   - Effort: Medium | Impact: High

5. **Countdown timer + right sidebar** -- New component with real-time clock, countdown, deadline list.
   - Effort: Medium | Impact: High (핵심 기능)

6. **Announcement banner** -- Marquee-style notice on all list pages. Can reuse existing `Marquee` component.
   - Effort: Low | Impact: Medium

7. **Header enhancement** -- Add global search, login button, missing nav items.
   - Effort: Medium | Impact: Medium

### P2 - Medium Priority

8. **Home page system intro** -- Add 4 feature cards section matching daker.ai's "DAKER 시스템 소개".
   - Effort: Medium | Impact: Medium

9. **Submission type separation** -- Split submit form into 3 tabbed types with individual deadlines.
   - Effort: Medium | Impact: Medium

10. **Participation guide modal** -- 3-step onboarding overlay.
    - Effort: Low | Impact: Medium

11. **Pagination** -- Add to hackathon list, camp, leaderboard. Reusable component.
    - Effort: Low | Impact: Medium

12. **Sort + view toggle** -- Add to all list pages.
    - Effort: Low | Impact: Medium

13. **Seed data expansion** -- Add more teams/leaderboard entries, add organizer fields, add announcement data.
    - Effort: Low | Impact: Medium

### P3 - Lower Priority (if time permits)

14. **Community page** -- Full forum with categories, pinned posts, trending, user ranking.
    - Effort: High | Impact: Medium

15. **Showcase page** -- Project portfolio with categories.
    - Effort: Medium | Impact: Low

16. **Adventurer profiles** -- User cards with roles, skills, tiers.
    - Effort: Medium | Impact: Low

17. **Gallery tab** -- Project showcase within hackathon detail.
    - Effort: Medium | Impact: Low

18. **Forum tab** -- Discussion board within hackathon detail.
    - Effort: High | Impact: Low

### Quick Wins (< 1 hour each)

- Fix hardcoded Korean strings in `hackathon-teams.tsx:33`, `hackathon-submit.tsx:163`, `team-form.tsx:125`, `team-card.tsx:23-24` aria labels
- Use `Button` component in `error.tsx` and `not-found.tsx`
- Add i18n to error/404 pages
- Add filter counts to filter buttons on hackathon list and camp pages
- Remove unused `t()` export from `dictionaries.ts:330`
- Wrap `getHackathons()` in `useMemo` in `page.tsx` (home)
- Extract submission history IIFE in `hackathon-submit.tsx:158` into a named component

---

## Appendix: File Inventory

| Category | Count | Files |
|---|---|---|
| Pages | 6 | layout, page, hackathons/page, [slug]/page, camp/page, rankings/page, error, not-found |
| Layout components | 3 | header, footer, providers |
| Hackathon components | 8 | card, overview, eval, prize, info, schedule, submit, leaderboard, teams |
| Camp components | 2 | team-card, team-form |
| Rankings components | 1 | ranking-table |
| UI primitives (shadcn) | 14 | button, card, badge, tabs, input, textarea, select, table, separator, avatar, scroll-area, tooltip, dialog, sheet |
| UI effects (Magic) | 6 | animated-gradient-text, number-ticker, shimmer-button, dot-pattern, marquee, confetti |
| Utilities | 4 | utils, format, storage, seed |
| Types | 1 | index.ts |
| i18n | 2 | context, dictionaries |
| CSS | 1 | globals.css |
| Seed data | 4 | hackathons, detail, teams, leaderboard |
| **Total** | **46 files** | |

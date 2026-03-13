# 11. Navigation & Routing Analysis

Exhaustive analysis of daker.ai's navigation system, URL structure, and routing patterns extracted from 6 snapshot files, compared against our current implementation.

---

## 1. Complete URL Map of Daker.ai

### 1.1 Internal Links (Every URL Found in Snapshots)

#### Public Pages (No Auth Required)

| URL Pattern | Found In | Description |
|---|---|---|
| `/` | All snapshots (logo link) | Home page |
| `/public/hackathons` | Home (CTA "지금 시작하기", "회원가입") | Hackathon list |
| `/public/basecamp` | Home (CTA "둘러보기") | Basecamp / team list |
| `/public/adventurers` | Basecamp sidebar, Adventurers page | Adventurer finder list |
| `/public/showcase` | Showcase page (implied) | Showcase project list |
| `/public/showcase/new` | Showcase sidebar link | Create new showcase project |
| `/public/showcase/[slug]` | Showcase page card link | Showcase project detail |
| `/community` | Community page (implied) | Community home |
| `/community/[slug]` | Community sidebar pinned posts | Community post detail |

#### Specific Showcase URLs Found

| URL | Title |
|---|---|
| `/public/showcase/with-goolge-ai-studio-0504b0b0` | "데이콘 리더보드 with Goolge AI Studio" |

#### Specific Community Post URLs Found

| URL | Title |
|---|---|
| `/community/monthly-hackathon-emergency-handover-documents` | "[공지] 월간 해커톤 : 긴급 인수인계 해커톤..." |
| `/community/hackathon-team-switch-event-participation` | "[공지] 해커톤 팀 참가 전환 및 이벤트 참여..." |

#### User Profile URLs (3 Distinct Patterns)

| URL Pattern | Found In | Example |
|---|---|---|
| `/profile/[uuid]` | Community post author links | `/profile/7aeeb654-0621-4c68-80e0-1b1680ae6b03` (DACONIO) |
| `/profile/[uuid]` | Community post author links | `/profile/46cafe6b-0e7e-4cec-9d3d-858dc51782ba` (도비콘) |
| `/user/[uuid]` | Adventurer card name + avatar links | `/user/f70adfd7-3548-46e5-93bd-7b2a9527fb4d` (yuriluv) |
| `/user/[uuid]` | Adventurer card links | `/user/d804b748-dcbc-479e-bc40-c6d978d52cea` (스카스카) |
| `/user/[uuid]` | Adventurer card links | `/user/a95afac4-2e36-43ec-b4ae-bc7643e37085` (닉네임2) |
| `/user/[uuid]` | Adventurer card links | `/user/46cafe6b-0e7e-4cec-9d3d-858dc51782ba` (도비콘) |
| `/user/[uuid]` | Adventurer card links | `/user/91856df1-e9c2-48d3-97a4-5561b4a4a891` (쓰담쓰담해달라고) |
| `/user/[identifier]` | Adventurer card links | `/user/test-admin` (Mather - non-UUID) |
| `/u/[username]` | Adventurer card links | `/u/daconer` (이대권) |
| `/u/[username]` | Adventurer card links | `/u/airim(에이림)` (brink0) |
| `/adventurer/[username]` | Community post author link | `/adventurer/daconer` (이대권) |

**Critical observation:** The same user "도비콘" appears with `/profile/46cafe6b-...` in community and `/user/46cafe6b-...` in adventurers. The same user "이대권" appears as `/adventurer/daconer` in community and `/u/daconer` in adventurers. This indicates at least 4 distinct profile URL patterns in the live system.

#### Auth-Gated Pages

| URL | Found In | Description |
|---|---|---|
| `/login` | Hackathon detail ("로그인하고 참가하기") | Login redirect page |
| `/api/auth/dacon/login` | All snapshots (header login button) | OAuth login endpoint |

#### API Endpoints (Observed or Implied)

| Endpoint | Description |
|---|---|
| `/api/auth/dacon/login` | Dacon OAuth login initiation |
| `/api/auth/current-user` | Current user session (implied) |
| `/api/auth/user` | User info endpoint (implied) |
| `/api/new-content/*` | New content tracking (implied) |
| `/api/rankings/me` | User's own ranking (implied) |

### 1.2 External Links

#### Footer Links (Present on Every Page)

| URL | Label |
|---|---|
| `https://dacon.io/more/notice/89` | 이용약관 |
| `https://about.dacon.io/` | 대회주최문의 |
| `https://about.dacon.io` | 서비스소개 |
| `https://dacon.io/forum/406358` | 교육문의 |
| `https://dacon.io/community/hiring` | 채용 |
| `https://pf.kakao.com/_bmVkxj` | 카카오톡 |
| `https://www.instagram.com/daconio` | 인스타그램 |
| `https://www.youtube.com/@데이콘` | 유튜브 |
| `https://m.blog.naver.com/daconist?tab=1` | 블로그 |
| `mailto:dacon@dacon.io` | 이메일 |

#### Content-Embedded External Links

| URL | Found In |
|---|---|
| `https://cfiles.dacon.co.kr/competitions/daker_202603/data.zip` | Hackathon detail (제공 자료 다운로드) |

---

## 2. URL Pattern Analysis

### 2.1 Daker.ai URL Taxonomy

```
/                                          # Home
/public/
  hackathons                               # Hackathon list
  hackathons/[slug]                        # Hackathon detail (implied, not directly linked)
  basecamp                                 # Team/expedition list
  adventurers                              # Adventurer finder
  showcase                                 # Showcase list
  showcase/new                             # Create showcase (auth-gated?)
  showcase/[slug]                          # Showcase detail
/community                                 # Community home
  /[slug]                                  # Community post detail
/profile/[uuid]                            # User profile (used in community author links)
/user/[uuid-or-identifier]                 # User page (used in adventurer card links)
/u/[username]                              # User page by username (used in adventurer cards)
/adventurer/[username]                     # Adventurer profile (used in community author links)
/login                                     # Login page
/api/
  auth/dacon/login                         # OAuth initiation
```

### 2.2 Slug Format Observations

| Content Type | Slug Example | Pattern |
|---|---|---|
| Showcase | `with-goolge-ai-studio-0504b0b0` | kebab-case + 8-char hex suffix |
| Community Post | `monthly-hackathon-emergency-handover-documents` | kebab-case (English transliteration) |
| Community Post | `hackathon-team-switch-event-participation` | kebab-case (English transliteration) |
| Hackathon | (not directly visible in link form) | Likely kebab-case |

### 2.3 Profile URL Inconsistencies (4 Patterns)

| Pattern | Where Used | ID Type | Example |
|---|---|---|---|
| `/profile/{uuid}` | Community post authors | UUID v4 | `/profile/7aeeb654-0621-4c68-80e0-1b1680ae6b03` |
| `/user/{uuid}` | Adventurer card links | UUID v4 | `/user/f70adfd7-3548-46e5-93bd-7b2a9527fb4d` |
| `/u/{username}` | Adventurer card links | Username string | `/u/daconer` |
| `/adventurer/{username}` | Community post authors | Username string | `/adventurer/daconer` |

**Key finding:** `/user/test-admin` proves the `/user/` pattern also accepts non-UUID identifiers. The system appears to have evolved organically, with profile routing inconsistencies across features.

---

## 3. Navigation Structure Analysis

### 3.1 Primary Navigation (Header)

**Nav items observed across all snapshots:**

| # | Label (Korean) | English | Present in Home? | Present in Other Pages? |
|---|---|---|---|---|
| 1 | 해커톤 | Hackathons | Yes (button) | Yes (button) |
| 2 | 베이스캠프 | Basecamp | Yes (button) | Yes (button) |
| 3 | 커뮤니티 | Community | Yes (button) | Yes (button) |
| 4 | 학습 | Learning | Yes (button) | Yes (button) |
| 5 | 쇼케이스 | Showcase | **NO** (not in home) | Yes (button, in basecamp/showcase/community/adventurers) |
| 6 | 더보기 | More | Yes (dropdown) | Yes (dropdown) |

**Observation 1:** The home page snapshot shows only 4 nav buttons (해커톤, 베이스캠프, 커뮤니티, 학습, 더보기) but NOT 쇼케이스. All other page snapshots show 5 buttons + 더보기. This is likely a snapshot timing difference rather than intentional, but worth noting.

**Observation 2:** Nav items are rendered as `<button>` elements, NOT as `<a>` / `<Link>` elements. This means navigation is likely handled via JavaScript click handlers (client-side routing via Next.js router.push), not direct href links.

**Observation 3:** The 더보기 (More) dropdown contents are never expanded in any snapshot -- its contents are unknown.

**Observation 4:** A global search textbox exists in the header with placeholder "원정대, 해커톤, 사용자 검색..." indicating cross-entity search capability.

**Observation 5:** Right side of header contains: search bar, login button (or user avatar when logged in), theme toggle.

**Observation 6:** The DAKER logo links to `/` (home) in every snapshot.

### 3.2 Sidebar Navigation Patterns

#### Basecamp Sidebar (Left)

```
베이스캠프 (heading)
"다양한 원정대를 탐색하고 팀에 합류하세요." (description)

원정대 탐색 (subheading)
  [전체 117] (button, filter tab with count)
  [해커톤 원정대 35] (button, filter tab with count)
  [오픈 원정대 82] (button, filter tab with count)
  [모험가 찾기 8] (link to /public/adventurers, with icon + count)

[피드백 보내기] (button, bottom of sidebar)
```

**Observation 7:** Filter tabs show real-time counts (117, 35, 82). These are button elements, not links -- filter state is managed in-memory, not via URL query params.

**Observation 8:** "모험가 찾기" is uniquely a `<link>` (not a button) -- it navigates to a different page (`/public/adventurers`) rather than filtering the current view.

#### Community Sidebar (Left)

```
커뮤니티 메뉴 (heading)
  [홈 104] (button, filter)
  [잡담 10] (button, filter)
  [대회 22] (button, filter)
  [바이브코딩 7] (button, filter)
  [기타 6] (button, filter)
  [학습 37] (button, filter)

고정 게시글 (heading, with pin icon)
  "[공지] 월간 해커톤 : 긴급 인수인계 해커톤..." (link)
  "[공지] 해커톤 팀 참가 전환 및 이벤트 참여..." (link)

최근 인기 (collapsible section)
  Tabs: [일간] [주간] [월간]

게시글 TOP (collapsible button)
유저 랭킹 (collapsible button)

[피드백 보내기] (button, bottom)
```

**Observation 9:** Community has 6 category tabs: 홈, 잡담, 대회, 바이브코딩, 기타, 학습 -- all with counts.

**Observation 10:** Pinned posts are links that navigate to `/community/[slug]`.

**Observation 11:** "최근 인기" has sub-tabs (일간/주간/월간) creating a nested tab pattern.

**Observation 12:** "게시글 TOP" and "유저 랭킹" are collapsible/expandable sidebar sections.

#### Showcase Sidebar (Left)

```
쇼케이스 메뉴 (heading)
  [전체 1] (button, filter with count)
  [해커톤 0] (button, filter)
  [레이드 0] (button, filter)
  [개인 1] (button, filter)

프로젝트 등록 (section with icon)
  [새 프로젝트 등록하기] (link to /public/showcase/new)
```

**Observation 13:** Showcase categories are: 전체, 해커톤, 레이드, 개인. The "레이드" category is unique to showcase.

#### Hackathon Detail Sidebar (Left, Scrollspy)

```
대회안내 (collapsible parent)
  > 개요
  > 평가
  > 규칙
  > 일정
  > 상금
  > 데이터
  > 동의사항
제출 (button)
리더보드 138 (button with count)
갤러리 4 (collapsible parent with count)
  > 기획서 제출 4 (with deadline 3/30 10:00)
  > 최종 웹링크 제출 (deadline 4/6 10:00)
  > 최종 솔루션 PPT 제출 (deadline 4/13 10:00)
게시판 (collapsible parent)
  > 전체
  > 공지
  > 업데이트
  > FAQ
  > 일반
```

**Observation 14:** Hackathon detail uses a complex scrollspy sidebar with collapsible sections and nested sub-navigation.

**Observation 15:** Gallery sub-items show submission counts AND deadlines inline.

**Observation 16:** The "게시판" (board) section has its own category filters (전체, 공지, 업데이트, FAQ, 일반).

### 3.3 In-Page Navigation

**Observation 17:** Hackathon detail sidebar also includes a real-time clock and countdown timer widget (current time, days/hours/minutes/seconds until deadline).

**Observation 18:** The hackathon detail has a "참가 가이드 보기" button that opens a dialog/modal with a 3-step guide and pagination dots (step 1/2/3).

**Observation 19:** Community posts use a cursor-pointer on the entire card for navigation (no explicit `<a>` tag on the card wrapper in most cases).

**Observation 20:** Showcase cards wrap the entire card in a `<link>` to `/public/showcase/[slug]`.

### 3.4 Cross-Page Link Map

```
Home
  -> /public/hackathons (CTA "지금 시작하기", "회원가입", stat card)
  -> /public/basecamp (CTA "둘러보기")

Basecamp
  -> /public/adventurers (sidebar "모험가 찾기" link)
  -> /user/[uuid] (adventurer card links)
  -> /u/[username] (adventurer card links)

Community
  -> /community/[slug] (pinned posts, post cards)
  -> /profile/[uuid] (post author avatars)
  -> /adventurer/[username] (post author avatars)

Showcase
  -> /public/showcase/new (sidebar "새 프로젝트 등록하기")
  -> /public/showcase/[slug] (project cards)

Hackathon Detail
  -> /login ("로그인하고 참가하기")
  -> external download URL (제공 자료 다운로드)

Adventurers (sub-page of Basecamp)
  -> /user/[uuid] (adventurer card links)
  -> /u/[username] (adventurer card links)

All Pages
  -> / (logo)
  -> /api/auth/dacon/login (login button)
  -> External footer links
```

**Observation 21:** There is no direct link from Hackathon List to Hackathon Detail in the snapshots -- this is handled by card click, likely using `router.push` or `<Link>` wrapping the card.

**Observation 22:** Basecamp sidebar links to Adventurers, but Adventurers has no back-link to Basecamp in the snapshot (relies on header nav).

### 3.5 Additional Navigation Elements

**Observation 23:** The basecamp page has action buttons "원정대그룹 가기" and "원정대 만들기" in the main content area.

**Observation 24:** Basecamp has recruiting status badges on team cards: "모집중", "팀빌딩완료", "초대 필요" with corresponding icons.

**Observation 25:** Community main content has a banner bar (공지 ribbon) at the top of the content area, separate from pinned sidebar posts.

**Observation 26:** Community has sort controls, view mode toggles (grid/list), and search within the main content header area.

**Observation 27:** Showcase has a tag-based search input ("태그로 검색...") and a sort dropdown ("인기순").

**Observation 28:** Community pagination shows "104개 중 1-20" with numbered page buttons (1-5) and prev/next arrows.

---

## 4. Our Current Route Structure

### 4.1 Current Routes

| Route | File | Description |
|---|---|---|
| `/` | `src/app/page.tsx` | Home page with hero, stats, featured hackathons |
| `/hackathons` | `src/app/hackathons/page.tsx` | Hackathon list with filter (all/ongoing/upcoming/ended) and search |
| `/hackathons/[slug]` | `src/app/hackathons/[slug]/page.tsx` | Hackathon detail with 8 tabs |
| `/camp` | `src/app/camp/page.tsx` | Team list with hackathon filter, create/edit dialog |
| `/rankings` | `src/app/rankings/page.tsx` | Global rankings aggregated from leaderboards |

### 4.2 Current Header Navigation

```typescript
const NAV_ITEMS = [
  { href: '/hackathons', labelKey: 'nav.hackathons', icon: Code2 },
  { href: '/camp', labelKey: 'nav.camp', icon: Users },
  { href: '/rankings', labelKey: 'nav.rankings', icon: Trophy },
]
```

**3 nav items** vs Daker's **6 nav items** (해커톤, 베이스캠프, 커뮤니티, 학습, 쇼케이스, 더보기).

### 4.3 Comparison: Daker vs Our Implementation

| Daker Route | Our Route | Status | Notes |
|---|---|---|---|
| `/` | `/` | IMPLEMENTED | Different layout (ours: hero+stats+cards; theirs: hero+stats+system-intro+CTA) |
| `/public/hackathons` | `/hackathons` | IMPLEMENTED | Different URL prefix (no `/public/`) |
| `/public/hackathons/[slug]` | `/hackathons/[slug]` | IMPLEMENTED | Ours uses tab component; theirs uses scrollspy sidebar |
| `/public/basecamp` | `/camp` | IMPLEMENTED | Different name and URL |
| `/public/adventurers` | -- | MISSING | Adventurer/user directory |
| `/public/showcase` | -- | MISSING | Showcase/project gallery |
| `/public/showcase/new` | -- | MISSING | Create showcase |
| `/public/showcase/[slug]` | -- | MISSING | Showcase detail |
| `/community` | -- | MISSING | Community forum |
| `/community/[slug]` | -- | MISSING | Community post detail |
| `/profile/[uuid]` | -- | MISSING | User profile page |
| `/user/[uuid]` | -- | MISSING | User page |
| `/u/[username]` | -- | MISSING | User page by username |
| `/adventurer/[username]` | -- | MISSING | Adventurer profile |
| `/login` | -- | MISSING | Login page |
| Rankings (no Daker equivalent) | `/rankings` | OUR ADDITION | Not observed in Daker snapshots |

---

## 5. Missing Routes

### 5.1 Routes to Add (Priority Order)

#### P0 - Core for Hackathon Context (Required for Handover)

These are directly relevant to the hackathon submission context:

| Route | Daker Equivalent | Dynamic Params | Purpose |
|---|---|---|---|
| None critical | -- | -- | Our current routes cover the hackathon flow |

#### P1 - High Value Pages

| Route | Daker Equivalent | Dynamic Params | Purpose |
|---|---|---|---|
| `/community` | `/community` | None | Community forum listing |
| `/community/[slug]` | `/community/[slug]` | `slug: string` | Community post detail |
| `/adventurers` | `/public/adventurers` | None | Adventurer directory |
| `/showcase` | `/public/showcase` | None | Project showcase gallery |
| `/showcase/[slug]` | `/public/showcase/[slug]` | `slug: string` | Showcase project detail |

#### P2 - User Profiles

| Route | Daker Equivalent | Dynamic Params | Purpose |
|---|---|---|---|
| `/profile/[id]` | `/profile/[uuid]` | `id: string` (UUID) | User profile page |
| `/u/[username]` | `/u/[username]` | `username: string` | User page by vanity URL |

#### P3 - Auth & Misc

| Route | Daker Equivalent | Purpose |
|---|---|---|
| `/login` | `/login` | Login redirect/page |
| `/showcase/new` | `/public/showcase/new` | Create new showcase project |

### 5.2 URL Naming Convention Decision

**Daker uses `/public/` prefix** for most content pages. Our app does NOT use this prefix. Options:

| Option | Example | Pros | Cons |
|---|---|---|---|
| A: No prefix (current) | `/hackathons`, `/showcase` | Cleaner URLs, shorter | Diverges from Daker's structure |
| B: `/public/` prefix | `/public/hackathons` | Matches Daker exactly | Unnecessary nesting for a public-only app |

**Recommendation:** Continue with Option A (no `/public/` prefix). The `/public/` prefix in Daker likely distinguishes public from admin/dashboard routes. Our app is public-only for the hackathon submission.

### 5.3 Our Naming: `/camp` vs Daker's `/public/basecamp`

Our current `/camp` route maps to Daker's "베이스캠프" (`/public/basecamp`). The naming divergence is intentional shortening but means our URL structure is:

```
Ours:   /camp
Daker:  /public/basecamp
```

This is acceptable for the hackathon context.

---

## 6. Navigation State Management

### 6.1 Filter State

| Page | Daker Approach | Our Approach | Notes |
|---|---|---|---|
| Hackathon List | Button-based filter (no URL params) | `useState` filter + search | Both use client-side state |
| Basecamp | Button tabs (전체/해커톤 원정대/오픈 원정대) | `searchParams.get('hackathon')` | Ours reads initial filter from URL |
| Community | Button category tabs (홈/잡담/대회/...) | -- | Not implemented |
| Showcase | Button category tabs (전체/해커톤/레이드/개인) | -- | Not implemented |
| Adventurers | Search + view toggles | -- | Not implemented |

**Observation:** Daker does NOT appear to use URL query parameters for filter state. All filter tabs are `<button>` elements managing state client-side. The sole exception is our `/camp?hackathon=slug` pattern.

### 6.2 Sort State

| Page | Daker Sort Options | URL Persistence? |
|---|---|---|
| Basecamp | Sort buttons visible (icons only, unclear labels) | No (button state) |
| Community | "정렬" button (dropdown, options not visible) | No |
| Showcase | "인기순" combobox dropdown | No |
| Adventurers | Multiple toggle buttons for sort/view | No |

### 6.3 Search State

| Page | Daker Search | Placeholder Text |
|---|---|---|
| Header (global) | Textbox in header | "원정대, 해커톤, 사용자 검색..." |
| Basecamp | Textbox in content area | "원정대 검색..." |
| Community | Textbox in content area | "게시글 검색..." |
| Showcase | Textbox in content area | "태그로 검색..." |
| Adventurers | Textbox in content area | "모험가 검색..." |

**Key finding:** Every page has its own local search, plus there is a global search in the header. None appear to use URL query params for persistence.

### 6.4 View Mode State

| Page | Toggle Options |
|---|---|
| Basecamp | Grid/List view toggle buttons |
| Community | Grid/List view toggle buttons |
| Adventurers | Multiple view mode toggle buttons (3+ options) |
| Showcase | Not visible in snapshot |

### 6.5 Pagination

| Page | Daker Pagination Pattern |
|---|---|
| Community | Numbered pages (1-5), prev/next arrows, "104개 중 1-20" count |
| Basecamp | Not visible in snapshot (may use infinite scroll) |
| Showcase | Single item visible, not enough data |
| Adventurers | 8 items, all visible, no pagination |

---

## 7. Deep Linking Analysis

### 7.1 Permalink-Capable Content Types

| Content Type | Has Permalink? | URL Format | SEO-Friendly? |
|---|---|---|---|
| Hackathon | Yes (implied) | `/public/hackathons/[slug]` | Yes (slug-based) |
| Community Post | Yes | `/community/[slug]` | Yes (kebab-case English) |
| Showcase Project | Yes | `/public/showcase/[slug]` | Partial (slug + hex suffix) |
| User Profile | Yes | `/profile/[uuid]` or `/u/[username]` | Mixed (UUID not SEO-friendly, username is) |
| Team/Expedition | No visible permalink | Card click only (no URL in snapshot) | No |
| Leaderboard Entry | No | Part of hackathon detail tab | No |

### 7.2 URL Sharing Patterns

**Community posts** use English transliteration slugs (Korean title -> English kebab-case), making them shareable and SEO-indexable.

**Showcase projects** use a slug + 8-char hex suffix pattern (`with-goolge-ai-studio-0504b0b0`), providing uniqueness while remaining somewhat readable.

**User profiles** have the most sharing-friendly option via `/u/[username]` (vanity URLs), but the system inconsistently uses UUID-based URLs elsewhere.

### 7.3 Missing Deep Link Capabilities in Our App

| Content | Can Deep Link? | Notes |
|---|---|---|
| Hackathon specific tab | No | Our tabs use Radix Tabs with `defaultValue="overview"` -- no URL hash/param |
| Camp specific team | No | Teams are rendered in grid, no individual team URL |
| Rankings specific hackathon filter | No | Filter is `useState`, not in URL |

### 7.4 Hackathon Detail Tab Deep Linking Gap

Daker's hackathon detail uses a sidebar scrollspy, meaning all sections are rendered on one page and scrollable. Our implementation uses Radix UI Tabs, which:
- Only renders the active tab content
- Does not reflect tab state in the URL
- Cannot be deep-linked (e.g., `/hackathons/my-hackathon#leaderboard`)

**Recommendation:** Consider adding URL hash or search param support for tab state (e.g., `/hackathons/[slug]?tab=leaderboard`).

---

## 8. Summary of Key Architectural Differences

| Aspect | Daker.ai | Our App |
|---|---|---|
| Layout | Sidebar + main content (2-column) | Full-width single column |
| Navigation pattern | Scrollspy sidebar (hackathon detail) | Horizontal tabs |
| URL prefix | `/public/` for content pages | No prefix |
| Filter persistence | All client-side (buttons) | Mostly client-side, one URL param |
| Search | Per-page + global header search | Per-page only (hackathon list) |
| User profiles | 4 URL patterns (inconsistent) | Not implemented |
| Theme | Toggle in header (dark/light) | Toggle in header (dark/light) - MATCHES |
| i18n | Korean-only (observed) | 4 languages (ko/en/zh/ja) - WE EXCEED |
| Auth | Dacon OAuth (`/api/auth/dacon/login`) | Not implemented |
| Nav items | 6 (해커톤, 베이스캠프, 커뮤니티, 학습, 쇼케이스, 더보기) | 3 (해커톤, 캠프, 랭킹) |
| Sidebar | Present on every list page | Not present |
| Footer | DACON company info + social links | Not analyzed |
| Pagination | Numbered pages (community) | Not implemented |
| View modes | Grid/List toggles | Grid only |

---

## 9. Critical Navigation UX Patterns

### 9.1 Announcement Banner

Every page (basecamp, community, showcase) shows a scrolling announcement banner at the top of the main content area:
```
[공지 icon] 긴급 공지! AI 프로젝트 팀 모집 마감 임박! 지금 DAKER에서 합류하세요!
```
Two instances scroll horizontally. This is a site-wide component rendered within each page's main content area.

### 9.2 Countdown Timer Widget

The hackathon detail sidebar contains a live countdown timer showing:
- Current time (HH:MM:SS)
- Current date (YYYY.MM.DD (요일))
- Countdown to next deadline (DD일 HH시 MM분 SS초)
- Submission progress (3/10 형식)
- Timeline of all submission deadlines

### 9.3 Recruitment Status in Team Cards

Basecamp team cards show status badges that affect card interaction:
- **모집중** (Recruiting) - card is interactive
- **팀빌딩완료** (Team Complete) - shows "자세히" button
- **초대 필요** (Invite Required) - shows lock-like indicator

### 9.4 Hackathon Detail Participation Guide

A modal dialog triggered by "참가 가이드 보기" button provides a 3-step onboarding:
1. 해커톤 선택 & 참가 신청
2. 원정대(팀) 구성
3. 작전실 및 해커톤에서 제출

With pagination dots and next/prev navigation.

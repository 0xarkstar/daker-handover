# 09. Accessibility, Responsive Design, SEO & Performance Analysis

> Comprehensive comparison of daker.ai patterns vs our hackathon-handover implementation.
> Generated from accessibility tree snapshots (5 daker.ai pages) and source code review (all implementation files).

---

## Part 1: Accessibility Analysis

### 1. Semantic HTML in Daker.ai (14 observations)

**A1. Landmark Roles**
Daker.ai uses proper landmark elements consistently across all 5 pages:
- `<navigation>` (ref=e6) -- top-level site navigation on every page
- `<main>` (ref=e31 on home) -- primary content area
- `<contentinfo>` (ref=e191 on home) -- footer landmark on every page
- `<complementary>` (ref=e37 on basecamp/community) -- sidebar content on list pages
- Nested `<main>` inside content area on basecamp/community/adventurers (two `main` landmarks -- the outer page and the inner content region)

**A2. Heading Hierarchy**
- Home: h1 ("AI 서비스개발 히어로의 여정을 시작하세요") -> h2 ("DAKER 시스템 소개", "준비되셨나요?") -> h3 ("프로필", "원정대", "해커톤", "배지 & 랭킹", "AI 해커톤 플랫폼")
- Basecamp: h3 ("베이스캠프") -> h4 ("원정대 탐색") -- note: skips h1 and h2 entirely on list pages
- Community: h3 ("커뮤니티 메뉴", "고정 게시글", post titles) -- also skips h1/h2
- Adventurers: h1 ("모험가 찾기") -> h3 (user names) -- skips h2
- Hackathon Detail: h1 (hackathon title) -> h2 (download link heading) -> h3 ("개요", "평가", "규칙", etc.)
- **Gap in daker.ai**: Basecamp and Community pages have no h1 or h2; headings start at h3. This is a WCAG violation (heading hierarchy should not skip levels).

**A3. Link vs Button Usage**
- Navigation items use `<button>` elements (해커톤, 베이스캠프, 커뮤니티, etc.) -- these trigger in-page navigation/dropdown behavior, which is correct for buttons
- "로그인" uses `<link>` wrapping a `<button>` -- semantically redundant; the link alone would suffice
- "DAKER 로고" correctly uses `<link>` with img alt text
- Filter tabs in basecamp/community correctly use `<button>` (they change view state, not navigate)
- "모험가 찾기" in sidebar uses `<link>` (navigates to new page) -- correct

**A4. List Usage**
- Home feature cards use `<list>` with `<listitem>` for bullet points (e.g., "GitHub 연동으로 포트폴리오 자동화")
- Hackathon detail rules/evaluation use proper `<list>` -> `<listitem>` nesting with nested sublists
- Community sidebar categories use `<navigation>` with buttons, not lists -- acceptable for nav pattern

**A5. Form Labels and Associations**
- Search textbox: `textbox "원정대, 해커톤, 사용자 검색..."` has placeholder text but NO visible label element or aria-label -- relies solely on placeholder
- Adventurers search: `textbox "모험가 검색..."` -- same pattern, placeholder only

**A6. Image Alt Texts**
- Logo: `img "DAKER 로고"` -- good, descriptive alt
- Footer logo: `img "DACON"` -- good
- User avatars: `img "yuriluv"`, `img "도비콘"` -- alt matches username, good
- Tier badges: `img "Silver tier"`, `img "Bronze tier"` -- descriptive alt, good
- Post images: `img "게시글 이미지"` -- generic, could be more descriptive
- Hero image: `img "정상을 향한 여정"` -- descriptive
- Several decorative icons: `img` with no alt -- acceptable if truly decorative, but some may carry meaning (e.g., checkmark icons in feature lists)

**A7. ARIA Attributes Observed**
- Tab components: `tablist`, `tab "일간" [selected]`, `tabpanel "일간"` -- proper ARIA tab pattern
- Notification region: `region "Notifications (F8)"` -- labeled landmark with keyboard shortcut hint
- Dialog: `dialog "해커톤 참가 가이드"` with proper heading and close button
- Buttons with expanded state: `button "최근 인기" [expanded]` -- proper aria-expanded
- Disabled pagination button: `button [disabled]` -- proper disabled state

---

### 2. Keyboard Navigation in Daker.ai (4 observations)

**A8. F8 for Notifications**
- `region "Notifications (F8)"` indicates a keyboard shortcut for the notification panel
- This is a custom shortcut; should be documented/discoverable for users

**A9. Tab Order Implications**
- Navigation follows logical source order: logo -> nav items -> search -> login -> theme toggle
- Sidebar navigation on basecamp/community appears before main content in the DOM (complementary before main) -- this means keyboard users tab through the sidebar first

**A10. Focus Indicators**
- Not directly visible in accessibility tree snapshots, but `[cursor=pointer]` is present on all interactive elements
- No evidence of custom focus styles beyond browser defaults in the snapshot data

**A11. Skip Links**
- No skip-to-content link observed in any daker.ai snapshot. Keyboard users must tab through the entire navigation on every page.

---

### 3. Our Accessibility Status (10 observations)

**A12. Semantic HTML Coverage -- GOOD**
- `<header>` wraps navigation (via sticky header component)
- `<main id="main-content">` wraps page content -- proper landmark
- `<footer>` wraps footer -- proper contentinfo landmark
- `<nav>` used for desktop navigation (`className="hidden md:flex"`)
- `<nav>` used for mobile sheet menu content
- Breadcrumb on detail page uses `<nav>` element -- correct semantic

**A13. ARIA Usage -- GOOD**
- Theme toggle: `<span className="sr-only">Toggle theme</span>` -- screen reader label
- Language buttons: `aria-label="언어: KO"` etc. -- good labeling
- Mobile menu trigger: `aria-label="메뉴"` -- good
- Team card edit/delete buttons: both `aria-label` AND `sr-only` span -- thorough
- `DotPattern`: `aria-hidden="true"` -- correctly hides decorative SVG
- Sheet/Dialog components from shadcn: include built-in ARIA (dialog role, close button sr-only)

**A14. Form Accessibility -- GOOD**
- Submit form: All inputs have `<label htmlFor="submit-teamName">` with matching `id` -- proper association
- Team form: All 6 fields have `<label htmlFor="...">` with matching `id` -- proper association
- Search input on hackathons page: uses `placeholder` but NO `<label>` or `aria-label` -- **GAP**

**A15. Image Alt Texts -- NOT APPLICABLE**
- Our implementation uses zero `<img>` or `<Image>` tags. All icons are Lucide React SVG components.
- No images to require alt text. This is acceptable for the current scope but will need attention when images are added (hackathon banners, user avatars, etc.).

**A16. Skip-to-Content Link -- EXCELLENT (exceeds daker.ai)**
- Layout includes: `<a href="#main-content" className="sr-only focus:not-sr-only ...">Skip to content</a>`
- Links to `<main id="main-content">` -- properly connected
- Becomes visible on focus -- correct pattern

**A17. Heading Hierarchy -- MOSTLY GOOD**
- Home: h1 (hero title) -> h2 ("해커톤", "종료된 해커톤") -> h3 (inside HackathonCard) -- correct cascade
- Hackathons list: h1 ("해커톤") -> h3 (card titles) -- **skips h2**
- Hackathon detail: h1 (title) -> Tab content uses CardTitle which renders h3 by default -- **skips h2**
- Camp page: h1 ("베이스캠프") -> h3 (team names) -- **skips h2**

**A18. Focus Management -- ADEQUATE**
- shadcn/ui components provide `focus-visible` ring styles on all interactive elements
- Button component includes `focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50`
- Input/Textarea include focus-visible styles
- Tab triggers include focus-visible styles
- Skip link uses `focus:not-sr-only` pattern

**A19. Color Contrast Consideration**
- `text-muted-foreground` on light theme: oklch(0.556 0 0) on oklch(1 0 0) -- approximately #8B8B8B on white. This is 3.5:1 ratio, which **fails WCAG AA for normal text** (requires 4.5:1) but passes for large text (3:1).
- Status badge text colors (green/orange) on their respective backgrounds need verification.

**A20. Announcement of Dynamic Content**
- No `aria-live` regions for: filter results changing, form submission success/failure, leaderboard updates
- The "saved" badge after submission appears visually but is not announced to screen readers
- `window.confirm` for delete is accessible (native dialog)

**A21. Table Accessibility -- GOOD**
- Leaderboard uses proper `<Table>`, `<TableHeader>`, `<TableHead>`, `<TableBody>`, `<TableRow>`, `<TableCell>` structure
- Column headers are present for all data columns

---

### 4. Accessibility Gaps (9 observations)

**A22. Where We Fall Short vs Daker.ai**

| Gap | Daker.ai | Our Implementation |
|-----|----------|-------------------|
| Notification region | `region "Notifications (F8)"` with keyboard shortcut | No notification system |
| Tab widget ARIA | Full `tablist`/`tab`/`tabpanel` with `[selected]` state | Uses shadcn Tabs (has ARIA built-in) -- equivalent |
| Search label | Placeholder text (both are weak) | Placeholder only (both are weak) |
| Footer completeness | Full company info, social links, legal notices | Minimal: logo + copyright only |
| Sidebar landmark | `<complementary>` for sidebar | No sidebar layout pattern yet |
| Dialog accessibility | `dialog` with heading + close button | Dialog from shadcn has same pattern -- equivalent |

**A23. Where We Exceed Daker.ai**

| Area | Daker.ai | Our Implementation |
|------|----------|-------------------|
| Skip-to-content link | Not present | Present and functional |
| Form label associations | Placeholder-only on search | Proper `htmlFor`/`id` on all form fields except search |
| sr-only patterns | Minimal usage | Extensive: theme toggle, edit/delete buttons, dialog close |
| Heading start on list pages | Starts at h3 (skips h1/h2) | Starts at h1 on every page |

**A24. Search Input Missing Label**
- Hackathons page `<Input>` has no `<label>`, no `aria-label`, only `placeholder`
- Screen readers may announce this as "edit text" with no context
- Fix: Add `aria-label={t('common.search')}` to the Input component

**A25. Filter Buttons Missing ARIA State**
- Filter buttons (all/ongoing/upcoming/ended) visually indicate selection via `variant` prop
- No `aria-pressed` or `aria-current` attribute to convey state to screen readers
- shadcn Button does not automatically add pressed state
- Fix: Add `aria-pressed={filter === f}` to each filter button

**A26. No `aria-live` for Dynamic Content**
- When filter changes and card grid updates, screen readers get no announcement
- When form submission succeeds and the "saved" badge appears, no announcement
- Fix: Wrap results count in `<div aria-live="polite">` with count text, add `role="status"` to saved badge

**A27. Hardcoded Korean Strings in Accessibility Labels**
- `aria-label="메뉴"` -- should use `t()` for i18n
- `aria-label="연락처"` -- should use `t()`
- `aria-label="수정"` / `aria-label="삭제"` -- should use `t()`
- `window.confirm('정말 삭제하시겠습니까?')` -- hardcoded Korean
- "이전 제출 내역" in hackathon-submit.tsx -- hardcoded Korean
- "팀 만들기" in hackathon-teams.tsx -- hardcoded Korean

**A28. Animation Accessibility -- prefers-reduced-motion Not Respected**
- `animate-fade-in-up`, `animate-pulse-dot`, `AnimatedGradientText`, `ShimmerButton`, `Marquee`, `NumberTicker` -- all animations
- No `@media (prefers-reduced-motion: reduce)` rule in globals.css
- Users with vestibular disorders cannot disable animations
- Fix: Add `@media (prefers-reduced-motion: reduce) { *, ::before, ::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`

**A29. Marquee Accessibility**
- `<Marquee pauseOnHover>` auto-scrolls content -- this can be disorienting
- No pause control beyond hover (keyboard users cannot pause)
- Content in marquee may be clipped or unreadable for screen readers depending on implementation
- WCAG 2.2.2: Moving content must be pausable

**A30. WCAG 2.1 AA Compliance Checklist**

| Criterion | Status | Notes |
|-----------|--------|-------|
| 1.1.1 Non-text Content | PASS (no images) | Will need alt text when images added |
| 1.3.1 Info and Relationships | PARTIAL | Heading hierarchy skips on some pages |
| 1.3.2 Meaningful Sequence | PASS | DOM order matches visual order |
| 1.4.1 Use of Color | PARTIAL | Status badges rely on color + text |
| 1.4.3 Contrast Minimum | NEEDS AUDIT | muted-foreground may fail on some backgrounds |
| 1.4.4 Resize Text | PASS | Relative units used |
| 2.1.1 Keyboard | PASS | All interactive elements are focusable |
| 2.2.2 Pause Stop Hide | FAIL | Marquee cannot be paused by keyboard |
| 2.4.1 Bypass Blocks | PASS | Skip-to-content link present |
| 2.4.2 Page Titled | PARTIAL | Only root layout has title metadata |
| 2.4.3 Focus Order | PASS | Logical tab order |
| 2.4.6 Headings and Labels | PARTIAL | Search input missing label |
| 2.4.7 Focus Visible | PASS | focus-visible styles on all components |
| 3.1.1 Language of Page | PASS | `<html lang="ko">` |
| 3.3.1 Error Identification | PARTIAL | No error messages for invalid form input |
| 3.3.2 Labels or Instructions | PARTIAL | Search input relies on placeholder only |
| 4.1.2 Name, Role, Value | PARTIAL | Filter buttons missing aria-pressed |

---

## Part 2: Responsive Design Analysis

### 5. Daker.ai Breakpoint Analysis (8 observations)

**R1. Desktop Layout (observed)**
- Horizontal top navigation: logo | nav buttons | search | login | theme toggle
- Basecamp/Community: sidebar (complementary) + main content in a two-column layout
- Hackathon detail: sidebar (tabs/countdown) + main content in two-column layout
- Card grids appear to use multi-column layouts
- Footer: three-column layout (logo+links | social | legal info)

**R2. Sidebar Collapse Implications**
- Basecamp sidebar contains: heading, description, filter navigation with counts, "모험가 찾기" link
- Community sidebar contains: menu navigation, pinned posts, popular/ranking sections
- Hackathon detail sidebar: full tab navigation, countdown timer, team list, guide button
- On mobile, these sidebars would need to either: collapse into a drawer/sheet, stack above content, or convert to a bottom navigation

**R3. Navigation Responsive Pattern**
- Desktop: full horizontal button bar with text labels
- Home page has different nav items than inner pages (Home shows "쇼케이스" and "학습" not present on Home nav)
- Mobile: likely collapses to hamburger menu (our Sheet pattern mirrors this)

**R4. Card Grid Patterns**
- Basecamp teams: appear in a multi-column card grid
- Community posts: single-column feed layout with thumbnail + metadata
- Adventurers: card grid with avatar + info pattern
- These suggest 1-col (mobile) -> 2-col (tablet) -> 3-col (desktop) breakpoints

**R5. Search Bar**
- Desktop: integrated in navigation bar with icon prefix
- Likely collapses to icon-only or moves to a dedicated search page on mobile

**R6. Typography Scaling**
- h1 on home: appears large (hero style)
- h3 on cards: appears as card title size
- Body text: standard size
- No evidence of fluid typography (clamp()) in snapshots

**R7. Countdown Timer**
- Hackathon detail has real-time countdown with days/hours/minutes/seconds
- Must remain visible and readable at all viewport sizes
- Complex multi-segment layout needs careful responsive handling

**R8. Table Layout**
- Hackathon detail evaluation has a data table with 3 columns
- Tables on mobile typically need horizontal scroll or card transformation

---

### 6. Our Responsive Status (12 observations)

**R9. Breakpoint Usage by Page**

| Page | Responsive Classes Used | Assessment |
|------|------------------------|------------|
| layout.tsx | None needed (flex column) | OK |
| header.tsx | `hidden md:flex`, `hidden sm:inline`, `md:hidden`, `hidden sm:flex` | GOOD |
| footer.tsx | None (single flex row) | NEEDS WORK |
| page.tsx (home) | `sm:text-6xl lg:text-7xl`, `sm:text-xl`, `sm:grid-cols-3`, `sm:grid-cols-2 lg:grid-cols-3` | GOOD |
| hackathons/page.tsx | `sm:grid-cols-2 lg:grid-cols-3` | ADEQUATE |
| hackathons/[slug]/page.tsx | `overflow-x-auto flex-nowrap` on tabs | MINIMAL |
| camp/page.tsx | `sm:grid-cols-2 lg:grid-cols-3`, `sm:max-w-md` (dialog) | ADEQUATE |

**R10. Header Mobile Menu -- GOOD**
- Desktop: horizontal nav with `hidden md:flex`
- Mobile: Sheet/drawer with `md:hidden` trigger
- Language switcher: desktop shows inline, mobile shows in sheet
- DAKER brand text: hidden on small (`hidden sm:inline`), icon always visible

**R11. Card Grid Behavior**
- All grids use: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- This provides: 1 column (mobile) -> 2 columns (>=640px) -> 3 columns (>=1024px)
- Gap is consistent at `gap-4`
- Cards use `h-full` for equal height in grid

**R12. Hero Section Typography Scaling -- GOOD**
- h1: `text-5xl sm:text-6xl lg:text-7xl` -- three breakpoints
- Subtitle: `text-lg sm:text-xl` -- two breakpoints
- CTA buttons use `size="lg"` which has fixed padding -- adequate

**R13. Tab List on Detail Page -- NEEDS WORK**
- Uses `overflow-x-auto flex-nowrap` which enables horizontal scroll
- But: no visual scroll indicator (no gradient fade, no scroll shadow)
- 8 tabs will definitely overflow on mobile
- Users may not realize the tab list is scrollable

**R14. Leaderboard Table -- ADEQUATE**
- Wrapped in `overflow-x-auto` container
- 7 columns will overflow on mobile but can scroll
- No responsive transformation to card layout for mobile

**R15. Footer -- MINIMAL**
- Single `flex items-center justify-between` row
- No responsive breakpoints at all
- Will stack awkwardly if text wraps on very small screens
- Daker.ai footer has 3-column grid with rich content; ours is minimal

**R16. Max Width Container**
- All pages use `max-w-6xl` (1152px) with `px-4` padding
- Consistent and appropriate for content width
- No `xl:` or `2xl:` breakpoints used anywhere -- layout stops adapting above 1024px

**R17. Dialog Responsiveness**
- Team form dialog: `sm:max-w-md` -- adapts width on mobile
- Sheet (mobile menu): `w-64` fixed width -- appropriate for side drawer

**R18. Filter Buttons Wrapping**
- Hackathon filters: `flex gap-2` -- buttons will wrap naturally on small screens
- Camp filters: `flex flex-wrap gap-2` -- explicitly handles wrapping
- Hackathon page filters are **missing `flex-wrap`** -- could overflow on mobile with many filters

**R19. Stats Cards on Home**
- `grid-cols-1 sm:grid-cols-3` -- jumps from 1 to 3 columns
- Missing intermediate `sm:grid-cols-2` step -- on narrow tablets, 3 columns may be too cramped
- Consider: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

**R20. Touch Target Sizes**
- Language switcher buttons: `h-7 px-2 text-xs` -- approximately 28px height. **Below 44px minimum** recommended by WCAG 2.5.5
- Theme toggle: `h-8 w-8` -- 32px. Also below 44px minimum
- Filter buttons use `size="sm"` -- approximately 32px height. Below recommendation
- Card clickable areas are large (full card) -- good for touch

---

### 7. Responsive Gaps (8 observations)

**R21. Pages That Would Break on Mobile**

| Issue | Page | Severity |
|-------|------|----------|
| Tab overflow not discoverable | hackathons/[slug] | HIGH |
| 7-column table overflow | hackathons/[slug] leaderboard | MEDIUM |
| Stats grid 1->3 jump | home | LOW |
| Filter buttons no wrap | hackathons list | MEDIUM |
| Footer text wrapping | all pages | LOW |

**R22. Components Needing Responsive Updates**

1. **TabsList**: Add scroll indicators (gradient overlay or arrows) for mobile
2. **Leaderboard Table**: Consider card-based layout below `sm:` breakpoint
3. **HackathonCard colored strip**: `h-32` is fixed -- on very small cards this wastes space
4. **Breadcrumb**: No truncation strategy for long hackathon titles
5. **Schedule timeline**: Fixed `pl-6` left padding -- timeline dots/lines need testing at narrow widths

**R23. Typography That Does Not Scale**
- `text-3xl font-bold` on h1 of hackathons, camp, rankings pages -- fixed size, no responsive variant
- `text-2xl font-bold` on section headings -- fixed
- `text-lg font-semibold` on sub-section headings -- fixed
- Only the home hero has responsive typography (`text-5xl sm:text-6xl lg:text-7xl`)
- Fix: Add `text-2xl sm:text-3xl` pattern to page h1 elements

**R24. Touch Target Sizes Below WCAG Recommendation**
- Language buttons: 28px (need 44px)
- Theme toggle: 32px (need 44px)
- Filter buttons: ~32px (need 44px)
- Pagination would need similar treatment if added
- Fix: Increase to at least `h-10 w-10` (40px) or use proper spacing with `min-h-[44px]`

**R25. Spacing That Does Not Adapt**
- `py-24` on hero section is fixed -- 96px vertical padding. On mobile this is excessive.
- `space-y-16` between home sections -- 64px. Could be reduced on mobile.
- `mb-8`, `py-8` on list pages -- fixed but reasonable
- Fix: Use responsive spacing `py-12 sm:py-24` and `space-y-8 sm:space-y-16`

**R26. Missing `xl:` Breakpoint Adaptation**
- All layouts max out at `lg:` (1024px)
- On wide screens (1440px+), content is centered in `max-w-6xl` but no layout changes occur
- This is acceptable for content sites but could use wider grids on very large screens

**R27. Mobile Menu Missing Language Toggle Visibility**
- Language switcher desktop: `hidden sm:flex` -- hidden below 640px
- Language switcher in mobile sheet: present and visible -- good
- But: there is no visual separator or label for the language section in the sheet

**R28. Marquee Not Tested for Narrow Viewports**
- Marquee tag badges have fixed `px-3 py-1` sizing
- On very narrow screens, the marquee may show only 1-2 badges at a time
- `pauseOnHover` does not work on touch devices -- need `pauseOnTouch` or tap-to-pause

---

## Part 3: SEO Analysis

### 8. Page Titles and Meta (5 observations)

**S1. Only Root Metadata Defined**
- `layout.tsx` defines: `title: "DAKER - 해커톤 플랫폼"` and `description: "도전하고, 협업하고, 성장하세요. 해커톤 플랫폼 DAKER"`
- No page-level metadata on `/hackathons`, `/hackathons/[slug]`, `/camp`, `/rankings`
- All pages share the same title -- bad for SEO and browser tab identification
- Fix: Add `generateMetadata()` to each page, or use `metadata` export with unique titles

**S2. Missing Open Graph Tags**
- No `openGraph` property in metadata
- Shared links on social media will have no image, no custom description
- Hackathon detail pages especially need OG tags (title, description, image)
- Fix: Add `openGraph: { title, description, type: 'website', images: [...] }` to metadata

**S3. Missing Twitter Card Tags**
- No `twitter` property in metadata
- Fix: Add `twitter: { card: 'summary_large_image', title, description }`

**S4. No Structured Data**
- No JSON-LD structured data for events (hackathons are events)
- Schema.org `Event` type would improve search visibility
- Fix: Add `<script type="application/ld+json">` with Event schema to hackathon detail pages

**S5. URL Patterns -- GOOD**
- `/hackathons` -- clean collection URL
- `/hackathons/[slug]` -- semantic slug-based detail URL
- `/camp` -- clean, short
- `/rankings` -- clean
- All lowercase, no query parameters for primary navigation

### 9. Internal Linking and Crawlability (5 observations)

**S6. Internal Linking -- GOOD**
- Home links to: `/hackathons`, `/camp`, `/rankings` (via nav and stats cards)
- Hackathon cards link to: `/hackathons/[slug]`
- Detail page breadcrumb links back to: `/hackathons`
- Team cards link to: `/hackathons/[slug]`
- Camp button links from detail to: `/camp?hackathon=[slug]`

**S7. Client-Side Rendering Concern**
- All pages are `'use client'` components
- Content is rendered client-side from localStorage (`getHackathons()`, etc.)
- Search engines may not index dynamically rendered content
- Fix: For the hackathon competition, this is acceptable (localStorage data). For production, would need SSR or ISR with real data source.

**S8. No robots.txt or sitemap.xml Observed**
- Standard SEO files not present in the analysis scope
- Fix: Add `app/robots.ts` and `app/sitemap.ts` for Next.js automatic generation

**S9. No Canonical URLs**
- No `<link rel="canonical">` -- could cause duplicate content issues if deployed to multiple domains
- Fix: Add `metadataBase` in root layout and canonical in metadata

**S10. Language Alternates Missing**
- App supports ko/en/zh/ja but no `hreflang` tags
- Search engines cannot discover language variants
- Fix: Add `alternates: { languages: { ko: '/ko/...', en: '/en/...' } }` or handle via i18n routing

---

## Part 4: Performance Patterns

### 10. Image Optimization (3 observations)

**P1. No Images Used Currently**
- Zero `<img>` or `next/image` usage across entire codebase
- All visual elements are SVG icons (Lucide) and CSS gradients
- When images are added (hackathon banners, user avatars), must use `next/image` for automatic optimization

**P2. Decorative SVG Patterns**
- `DotPattern` renders an SVG pattern with `aria-hidden="true"` -- correctly excluded from accessibility tree
- SVG is rendered inline, not as an external file -- no additional HTTP request

**P3. Lucide Icons**
- Tree-shakeable icon imports (`import { Code2, Trophy, Users } from 'lucide-react'`)
- Only used icons are bundled -- good for bundle size

### 11. Loading and Code Splitting (4 observations)

**P4. No Loading States**
- No `loading.tsx` files in any route directory
- No skeleton/placeholder components during data fetching
- Since data is from localStorage (synchronous), this is currently acceptable
- But: if data source changes to API, loading states will be needed immediately

**P5. No Suspense Boundaries (except Camp)**
- Camp page wraps content in `<Suspense>` for `useSearchParams()` -- correct
- No other pages use Suspense boundaries
- No lazy-loaded components (`React.lazy()` or `next/dynamic`)

**P6. Client Components Throughout**
- Every page is `'use client'` -- entire page tree is client-rendered
- No Server Components utilized
- This means: full JS bundle sent to client, no streaming SSR benefits
- For hackathon scope: acceptable. For production: significant optimization opportunity

**P7. Animation Performance**
- CSS animations used (`fade-in-up`, `pulse-dot`, `gradient`, `shimmer-slide`, `marquee`)
- All use `transform` and `opacity` -- GPU-accelerated, good
- `NumberTicker` and `Marquee` components run continuously -- minor CPU cost
- No `will-change` hints used (not needed for simple transforms)

### 12. Data Loading Patterns (3 observations)

**P8. Synchronous localStorage Reads**
- `getHackathons()`, `getTeams()`, `getLeaderboard()` -- all synchronous
- Called directly in render functions -- no caching layer
- Multiple components may call `getHackathons()` redundantly
- Fix: Consider a React context or cache layer if data source changes

**P9. No Pagination**
- All hackathons, teams, leaderboard entries loaded at once
- Daker.ai has pagination (`104개 중 1-20`, page buttons)
- For small datasets (hackathon scope): acceptable
- For production: need virtual scrolling or pagination for large lists

**P10. No Optimistic Updates**
- Form submission (`handleSubmit`) writes to localStorage then re-reads
- Delete (`handleDelete`) writes then calls `onDeleted()` which triggers full re-render via `refreshKey`
- For localStorage: acceptable latency
- For API: would need optimistic UI updates

---

## Summary: Priority Matrix

### Critical (must fix for hackathon submission -- affects evaluation score under "접근성/반응형")

| # | Issue | Component | Fix Effort |
|---|-------|-----------|------------|
| A28 | No `prefers-reduced-motion` support | globals.css | 5 min |
| A24 | Search input missing label | hackathons/page.tsx | 2 min |
| R21 | Tab overflow not discoverable on mobile | hackathons/[slug]/page.tsx | 15 min |
| R23 | Page h1 typography not responsive | hackathons, camp pages | 5 min |
| R25 | Hero spacing excessive on mobile | page.tsx | 5 min |
| A25 | Filter buttons missing aria-pressed | hackathons/page.tsx, camp/page.tsx | 5 min |

### High (improves quality score significantly)

| # | Issue | Component | Fix Effort |
|---|-------|-----------|------------|
| S1 | No per-page metadata/titles | All page files | 20 min |
| A26 | No aria-live for dynamic content | hackathons, camp pages | 10 min |
| A27 | Hardcoded Korean in aria-labels | header, team-card, submit | 10 min |
| R18 | Filter buttons missing flex-wrap | hackathons/page.tsx | 1 min |
| R24 | Touch targets below 44px | header.tsx | 10 min |
| A17 | Heading hierarchy skips h2 | hackathons, camp, detail pages | 10 min |

### Medium (production quality improvements)

| # | Issue | Component | Fix Effort |
|---|-------|-----------|------------|
| S2 | Missing Open Graph tags | layout.tsx + pages | 15 min |
| R14 | Leaderboard table mobile layout | hackathon-leaderboard.tsx | 30 min |
| R19 | Stats grid 1->3 column jump | page.tsx | 2 min |
| A29 | Marquee not pausable by keyboard | page.tsx | 15 min |
| A19 | Color contrast audit needed | globals.css | 30 min |
| R22 | Multiple components need responsive polish | Various | 60 min |

### Low (nice-to-have)

| # | Issue | Component | Fix Effort |
|---|-------|-----------|------------|
| S4 | No structured data (JSON-LD) | hackathon detail | 20 min |
| S10 | No hreflang tags | layout.tsx | 15 min |
| R15 | Footer minimal content | footer.tsx | 20 min |
| R26 | No xl: breakpoint adaptation | All pages | 30 min |
| P4 | No loading.tsx skeleton states | Route directories | 30 min |

# Home Page Deep Dive: Daker.ai vs Our Implementation

## Analyst Review: Home Page Parity Analysis

> 50+ element-by-element observations comparing the daker.ai production home page
> (from accessibility tree snapshot) against our current `page.tsx` implementation.

---

## Part 1: Daker.ai Home Page Element-by-Element Analysis

### 1. Hero Section (18 observations)

#### 1.1 Mountain Illustration
- **Element**: `img "정상을 향한 여정"` (alt text: "Journey to the summit")
- **Placement**: Top of hero, inside a wrapper `generic` div above the text content
- **Observation 1**: The illustration sits ABOVE the text block, not behind it — it is a standalone visual element, not a background
- **Observation 2**: Alt text "정상을 향한 여정" implies a mountain/summit themed illustration — brand-specific artwork, not a stock image
- **Observation 3**: The image is inside the same parent container as the text block (`ref=e32`), suggesting it is full-width within the hero section
- **Observation 4**: No `DotPattern` or generative background — the illustration IS the visual treatment

#### 1.2 Stats Ticker Bar
- **Element**: `"DAKER: 39개 해커톤 · 80개 원정대 · 103명 모험가"`
- **Observation 5**: Preceded by an `img` icon (`ref=e36`) — likely a small brand icon or sparkle
- **Observation 6**: Text format uses middle-dot (`·`) as separator between three stats
- **Observation 7**: Stats are REAL platform numbers (39 hackathons, 80 expeditions, 103 adventurers), not vanity metrics
- **Observation 8**: This bar sits BETWEEN the illustration and the H1 — it acts as a social proof strip
- **Observation 9**: The entire bar is inside a single `generic` div (`ref=e35`), suggesting it is styled as a pill/badge, not a full-width banner
- **Observation 10**: No animation attributes visible in the accessibility tree — likely static or simple CSS animation (not a scrolling ticker)

#### 1.3 H1 Heading
- **Element**: `heading "AI 서비스개발 히어로의 여정을 시작하세요" [level=1]`
- **Observation 11**: Explicitly split into TWO `generic` spans:
  - Line 1: "AI 서비스개발 히어로의" (`ref=e40`)
  - Line 2: "여정을 시작하세요" (`ref=e41`)
- **Observation 12**: The line break is intentional (two `<span>` or `<div>` elements inside `<h1>`), not natural text wrapping
- **Observation 13**: No "AnimatedGradientText" or shimmer effect mentioned in the tree — this is likely plain bold text with standard foreground color

#### 1.4 Description Paragraph
- **Element**: `paragraph [ref=e42]` with two text nodes
- **Observation 14**: Two lines of text:
  - "DAKER는 AI·데이터 전문가들이 모여 도전하고, 성장하며,"
  - "함께 성과를 만들어가는 플랫폼입니다."
- **Observation 15**: The text uses muted/secondary color (standard paragraph styling)

#### 1.5 CTA Buttons
- **Observation 16**: TWO buttons side by side:
  - Primary: `link "지금 시작하기"` → `/public/hackathons` (wrapped in a link, likely solid/filled button)
  - Secondary: `link "둘러보기"` → `/public/basecamp` (outline or ghost style)
- **Observation 17**: Primary CTA says "지금 시작하기" (Start Now), NOT "해커톤 둘러보기" (Browse Hackathons) — action-oriented, not browse-oriented
- **Observation 18**: Secondary CTA links to `/public/basecamp` (the expedition/team system), not `/camp` — different URL structure

---

### 2. Stats Section (12 observations)

#### 2.1 Layout
- **Observation 19**: Three stat cards in a horizontal row inside `generic [ref=e50]`
- **Observation 20**: Each card follows identical structure: `img` + number + label + subtitle

#### 2.2 Card 1: Submissions
- **Observation 21**: Image (`ref=e53`) — custom illustration icon, not a Lucide icon
- **Observation 22**: Number: `98.4만+` — Korean number formatting using `만` (ten-thousand) unit
- **Observation 23**: Label: `제출` (Submissions)
- **Observation 24**: Subtitle: `DACON + DAKER` — indicates these are combined platform stats

#### 2.3 Card 2: Team Participation
- **Observation 25**: Number: `23.1만+` — same `만+` formatting
- **Observation 26**: Label: `팀 참여` (Team Participation)
- **Observation 27**: Subtitle: `DACON + DAKER` — same combined branding

#### 2.4 Card 3: Competitions Hosted
- **Observation 28**: Number: `423개` — uses `개` counter suffix, no `만` (smaller number)
- **Observation 29**: Label: `대회 개최` (Competitions Hosted)
- **Observation 30**: Subtitle: `DACON + DAKER` — consistent across all three

#### 2.5 Stat Card Patterns
- **Observation 31**: Numbers use LARGE font size (the `generic` containing the number is a separate div — likely `text-3xl` or `text-4xl`)
- **Observation 32**: The `+` suffix on numbers implies these are "and growing" — dynamic feel even if static
- **Observation 33**: Each card uses a CUSTOM ILLUSTRATION (`img` tag), not Lucide/icon-font icons — these are likely hand-drawn or branded SVG illustrations

---

### 3. System Introduction Section (17 observations)

#### 3.1 Section Header
- **Observation 34**: H2: "DAKER 시스템 소개" — clear section title
- **Observation 35**: Subtitle paragraph split across two lines:
  - "AI히어로로 성장하기 위한"
  - "모든 도구가 준비되어 있습니다."
- **Observation 36**: Section has its own wrapper (`ref=e82`) with inner content wrapper (`ref=e83` for header, `ref=e86` for cards)

#### 3.2 Feature Card Grid
- **Observation 37**: Four feature cards inside `generic [ref=e86]` — likely a 2x2 grid on desktop, 1-column on mobile

#### 3.3 Card 1: Profile (프로필)
- **Observation 38**: Custom illustration image (`ref=e89`)
- **Observation 39**: H3: "프로필"
- **Observation 40**: Description: "나만의 데이터 히어로 프로필을 만들고 성장 기록을 관리하세요."
- **Observation 41**: Three bullet items, each with an icon (`img`) + text:
  - "GitHub 연동으로 포트폴리오 자동화"
  - "활동 히트맵 시각화"
  - "보유 기술 스택 관리"

#### 3.4 Card 2: Expedition (원정대)
- **Observation 42**: H3: "원정대"
- **Observation 43**: Description: "데이콘 데이터 경진대회를 위한 팀 빌딩. 함께할 팀원을 찾고 원정대에 참여하세요."
- **Observation 44**: Three bullets:
  - "역할 기반 팀원 모집"
  - "해커톤 원정대 자동 연동"
  - "실시간 팀 커뮤니케이션"

#### 3.5 Card 3: Hackathon (해커톤)
- **Observation 45**: H3: "해커톤"
- **Observation 46**: Description: "다양한 AI·데이터 해커톤에 참가하고 실력을 증명하세요."
- **Observation 47**: Three bullets:
  - "원클릭 대회 참가"
  - "코드/결과물 제출 관리"
  - "전문가 심사 및 피드백"

#### 3.6 Card 4: Badges & Ranking (배지 & 랭킹)
- **Observation 48**: H3: "배지 & 랭킹"
- **Observation 49**: Description: "성과를 인정받고 커뮤니티에서 명성을 쌓아가세요."
- **Observation 50**: Three bullets:
  - "다양한 업적 배지 획득"
  - "경험치 기반 레벨 시스템"
  - "실시간 리더보드 경쟁"

#### 3.7 Card Design Patterns
- **Observation 51**: Every card has identical structure: illustration + h3 + paragraph + 3-item bullet list
- **Observation 52**: Bullet list items use `img` icons (not Lucide) — likely small colored SVG icons (checkmarks, arrows, or feature-specific icons)
- **Observation 53**: Cards are content-heavy (title + description + 3 bullets each) — much more informational than our current stat cards

---

### 4. Bottom CTA Section (6 observations)

- **Observation 54**: H2 split into two lines:
  - "준비되셨나요?" (`ref=e186`)
  - "지금 바로 데이터 모험을 떠나보세요." (`ref=e187`)
- **Observation 55**: Single CTA button: `link "회원가입"` → `/public/hackathons`
- **Observation 56**: Button text is "회원가입" (Sign Up), not "Browse" or "Start" — conversion-focused
- **Observation 57**: This is a dedicated section (`ref=e184`) — not crammed into another section
- **Observation 58**: No secondary button — single clear action
- **Observation 59**: The CTA links to `/public/hackathons` (same as primary hero CTA), creating a consistent conversion funnel

---

### 5. Footer (8 observations)

- **Observation 60**: DACON logo image (not DAKER logo) — parent company branding
- **Observation 61**: Five footer links: 이용약관, 대회주최문의, 서비스소개, 교육문의, 채용
- **Observation 62**: "AI 해커톤 플랫폼" subtitle heading
- **Observation 63**: Four social media links with icons: 카카오톡, 인스타그램, 유튜브, 블로그
- **Observation 64**: Company information: 데이콘(주), CEO name, business registration numbers
- **Observation 65**: Physical address: 서울특별시 영등포구 은행로 3 익스콘벤처타워 901호
- **Observation 66**: Contact: dacon@dacon.io, 070-4102-0545
- **Observation 67**: Copyright: "Copyright c DACON Inc. All rights reserved"

---

### 6. Overall Page Flow (5 observations)

- **Observation 68**: Page flow is: Hero (illustration + ticker + H1 + CTA) → Stats (3 cards) → System Intro (4 feature cards) → Bottom CTA → Footer
- **Observation 69**: NO hackathon listing cards on the home page — the home page is purely a marketing/landing page
- **Observation 70**: NO tag marquee on the home page
- **Observation 71**: NO "ended hackathons" section on the home page
- **Observation 72**: The page is a focused conversion funnel: inspire → prove (stats) → educate (features) → convert (CTA)

---

## Part 2: Our Home Page Analysis

### What We Currently Have

| Element | Implementation | Daker Equivalent |
|---------|---------------|------------------|
| Background | `DotPattern` with radial mask, opacity-20 | Mountain illustration (standalone image) |
| Title | `AnimatedGradientText` "해커톤 플랫폼" | Plain text "AI 서비스개발 히어로의 여정을 시작하세요" |
| Subtitle | "도전하고, 협업하고, 성장하세요" | "DAKER는 AI·데이터 전문가들이...플랫폼입니다." |
| Primary CTA | `ShimmerButton` "해커톤 둘러보기" → `/hackathons` | "지금 시작하기" → `/public/hackathons` |
| Secondary CTA | Outline button "팀원 모집" → `/camp` | "둘러보기" → `/public/basecamp` |
| Stats ticker | None | "39개 해커톤 · 80개 원정대 · 103명 모험가" pill |
| Tag Marquee | `Marquee` with `Badge` tags | None (does not exist on daker.ai) |
| Stats section | 3 cards with Lucide icons + `NumberTicker` | 3 cards with custom illustrations + Korean number formatting |
| Feature cards | None | 4 detailed cards with illustrations + bullet lists |
| Hackathon list | Featured + Ended `HackathonCard` grids | None on home page |
| Bottom CTA | None | "준비되셨나요?" section with "회원가입" button |
| Footer | Minimal: icon + "DAKER Hackathon Platform" + year | Full: DACON logo, 5 links, social media, company info |

### What Is Different vs Daker.ai (Structural)

1. **Our page is a hackathon listing page disguised as a home page.** Daker.ai's home page has ZERO hackathon cards. It is a pure landing/marketing page. The hackathon listing lives at `/public/hackathons`.
2. **We have no hero illustration.** Daker.ai uses a mountain/summit illustration as the hero visual. We use a `DotPattern` background, which is generic and lacks brand identity.
3. **We have no stats ticker bar.** The "39개 해커톤 · 80개 원정대 · 103명 모험가" pill badge is a social proof element that daker.ai places prominently above the H1.
4. **Our H1 is too short and generic.** "해커톤 플랫폼" (4 characters) vs "AI 서비스개발 히어로의 여정을 시작하세요" (21 characters). Daker's is aspirational; ours is descriptive.
5. **We have a tag marquee that daker.ai does not.** This is an element we added that does not exist in the reference design.
6. **We lack the "System Introduction" section entirely.** Daker.ai's 4-card feature showcase (Profile, Expedition, Hackathon, Badges & Ranking) is the largest section on their page. We have nothing equivalent.
7. **We lack a bottom CTA section.** The closing conversion prompt with "준비되셨나요?" does not exist in our implementation.
8. **Our footer is skeletal.** 1 line vs daker.ai's full company info, links, social media, and legal information.

### What Is Different vs Daker.ai (Visual/Animation)

9. **AnimatedGradientText**: We use a gradient shimmer on the H1. Daker.ai uses plain text. Our treatment is flashier but less readable.
10. **ShimmerButton**: We use a shimmer effect on the primary CTA. Daker.ai uses standard buttons. This is a stylistic choice we can keep but should evaluate for readability.
11. **DotPattern**: We use a dot grid background. Daker.ai uses an illustration. These are fundamentally different visual strategies.
12. **NumberTicker**: We animate stat numbers counting up. Daker.ai's numbers appear static in the accessibility tree. Our animation is a nice touch we should keep.
13. **Staggered fade-in-up**: We animate cards with delayed fade-in. This is not visible in daker.ai's tree. A reasonable enhancement to keep.

---

## Part 3: Specific Improvements Needed

### 3.1 Hero Section

| Aspect | Keep | Change | Add | Remove |
|--------|------|--------|-----|--------|
| `DotPattern` background | - | Replace with hero illustration or keep as subtle secondary | - | If illustration added, remove or reduce opacity further |
| `AnimatedGradientText` | Consider keeping for flair | Change text content entirely | - | - |
| H1 text | - | Rewrite: "해커톤 플랫폼" → "AI 서비스개발 히어로의 여정을 시작하세요" | Add intentional line break (two spans) | - |
| Subtitle text | - | Rewrite: current → "DAKER는 AI·데이터 전문가들이 모여 도전하고, 성장하며, 함께 성과를 만들어가는 플랫폼입니다." | - | - |
| Primary CTA text | `ShimmerButton` component | Change text: "해커톤 둘러보기" → "지금 시작하기" | - | `ArrowRight` icon (daker.ai has no icon in CTA) |
| Secondary CTA text | Outline button | Change text: "팀원 모집" → "둘러보기", Change href: `/camp` → appropriate basecamp route | - | `Users` icon |
| Stats ticker | - | - | ADD: pill/badge above H1 showing "DAKER: N개 해커톤 · N개 원정대 · N명 모험가" with small icon | - |
| Hero illustration | - | - | ADD: mountain/summit themed illustration above text content | - |

### 3.2 Tag Marquee Section

| Aspect | Keep | Change | Add | Remove |
|--------|------|--------|-----|--------|
| Marquee component | - | - | - | REMOVE entire section (not in daker.ai reference) |

**Decision needed**: The marquee is a nice touch but does not exist in the reference. It could be repurposed elsewhere or removed for parity.

### 3.3 Stats Section

| Aspect | Keep | Change | Add | Remove |
|--------|------|--------|-----|--------|
| 3-card grid layout | Keep | - | - | - |
| `NumberTicker` animation | Keep (our enhancement) | - | - | - |
| Lucide icons | - | Replace with custom SVG illustrations | - | Remove Lucide icons |
| Stat values | - | Change to meaningful platform-wide stats: submissions count, team participation count, competitions count | - | Remove navigation-style labels ("해커톤", "팀원 모집", "랭킹") |
| Stat labels | - | Change: current nav labels → "제출", "팀 참여", "대회 개최" | - | - |
| "DACON + DAKER" subtitle | - | - | ADD subtitle line to each card | - |
| Korean number formatting | - | - | ADD: `만+` formatting for large numbers (98.4만+, 23.1만+) | - |
| Link wrapping | Keep clickable cards | Evaluate: daker.ai stats may not be clickable links | - | - |

### 3.4 System Introduction Section (NEW — does not exist)

| Aspect | Action |
|--------|--------|
| Section header | ADD: H2 "DAKER 시스템 소개" + subtitle paragraph |
| Card 1: Profile | ADD: illustration + "프로필" + description + 3 bullet points |
| Card 2: Expedition | ADD: illustration + "원정대" + description + 3 bullet points |
| Card 3: Hackathon | ADD: illustration + "해커톤" + description + 3 bullet points |
| Card 4: Badges & Ranking | ADD: illustration + "배지 & 랭킹" + description + 3 bullet points |
| Grid layout | ADD: 2x2 grid on desktop, 1-col on mobile |
| Card styling | ADD: consistent card height, icon + h3 + p + ul structure |

### 3.5 Featured Hackathons Section

| Aspect | Keep | Change | Add | Remove |
|--------|------|--------|-----|--------|
| Featured hackathon grid | - | - | - | REMOVE from home page (move to `/hackathons` route) |
| Ended hackathons grid | - | - | - | REMOVE from home page |
| "전체 보기" link | - | - | - | REMOVE (no longer needed on home) |

**Decision needed**: Daker.ai's home page has NO hackathon listings. Our `/hackathons` page should be the listing page. The home page should be a marketing/landing page only.

### 3.6 Bottom CTA Section (NEW — does not exist)

| Aspect | Action |
|--------|--------|
| H2 heading | ADD: "준비되셨나요? 지금 바로 데이터 모험을 떠나보세요." (split into 2 lines) |
| CTA button | ADD: "회원가입" button linking to `/hackathons` (or sign-up flow) |
| Section styling | ADD: distinct background treatment to separate from feature cards |

### 3.7 Footer

| Aspect | Keep | Change | Add | Remove |
|--------|------|--------|-----|--------|
| DAKER branding | Keep | - | - | - |
| Year copyright | Keep | Expand to full format | - | - |
| Footer links | - | - | ADD: 이용약관, 서비스소개, etc. (or appropriate equivalents) | - |
| Social media links | - | - | ADD: social media icons section | - |
| Company info | - | - | ADD: company details, address, contact | - |
| "AI 해커톤 플랫폼" subtitle | - | - | ADD | - |

---

## Part 4: Content Gap Analysis

### 4.1 Missing Translation Keys

The following i18n keys need to be added to `dictionaries.ts` for all 4 locales (ko, en, zh, ja):

```
# Hero section (revised)
hero.ticker             → "DAKER: {hackathons}개 해커톤 · {expeditions}개 원정대 · {adventurers}명 모험가"
hero.title.line1        → "AI 서비스개발 히어로의"
hero.title.line2        → "여정을 시작하세요"
hero.description        → "DAKER는 AI·데이터 전문가들이 모여 도전하고, 성장하며, 함께 성과를 만들어가는 플랫폼입니다."
hero.cta.primary        → "지금 시작하기"
hero.cta.secondary      → "둘러보기"

# Stats section (revised)
stats.submissions       → "제출"
stats.teamParticipation → "팀 참여"
stats.competitions      → "대회 개최"
stats.source            → "DACON + DAKER"

# System Introduction section (NEW)
system.title            → "DAKER 시스템 소개"
system.subtitle.line1   → "AI히어로로 성장하기 위한"
system.subtitle.line2   → "모든 도구가 준비되어 있습니다."

system.profile.title    → "프로필"
system.profile.desc     → "나만의 데이터 히어로 프로필을 만들고 성장 기록을 관리하세요."
system.profile.bullet1  → "GitHub 연동으로 포트폴리오 자동화"
system.profile.bullet2  → "활동 히트맵 시각화"
system.profile.bullet3  → "보유 기술 스택 관리"

system.expedition.title   → "원정대"
system.expedition.desc    → "데이콘 데이터 경진대회를 위한 팀 빌딩. 함께할 팀원을 찾고 원정대에 참여하세요."
system.expedition.bullet1 → "역할 기반 팀원 모집"
system.expedition.bullet2 → "해커톤 원정대 자동 연동"
system.expedition.bullet3 → "실시간 팀 커뮤니케이션"

system.hackathon.title    → "해커톤"
system.hackathon.desc     → "다양한 AI·데이터 해커톤에 참가하고 실력을 증명하세요."
system.hackathon.bullet1  → "원클릭 대회 참가"
system.hackathon.bullet2  → "코드/결과물 제출 관리"
system.hackathon.bullet3  → "전문가 심사 및 피드백"

system.badges.title     → "배지 & 랭킹"
system.badges.desc      → "성과를 인정받고 커뮤니티에서 명성을 쌓아가세요."
system.badges.bullet1   → "다양한 업적 배지 획득"
system.badges.bullet2   → "경험치 기반 레벨 시스템"
system.badges.bullet3   → "실시간 리더보드 경쟁"

# Bottom CTA section (NEW)
cta.ready               → "준비되셨나요?"
cta.adventure           → "지금 바로 데이터 모험을 떠나보세요."
cta.signup              → "회원가입"

# Footer (expanded)
footer.terms            → "이용약관"
footer.hostInquiry      → "대회주최문의"
footer.serviceIntro     → "서비스소개"
footer.eduInquiry       → "교육문의"
footer.careers          → "채용"
footer.tagline          → "AI 해커톤 플랫폼"
```

**Total new keys**: ~40 keys x 4 locales = ~160 translation entries needed.

### 4.2 Images/Illustrations Needed

| Asset | Description | Priority |
|-------|-------------|----------|
| Hero mountain illustration | "정상을 향한 여정" themed artwork, full-width | CRITICAL |
| Stats ticker icon | Small icon/sparkle before the ticker text | HIGH |
| Profile card illustration | Custom artwork for the profile feature | HIGH |
| Expedition card illustration | Custom artwork for the expedition/team feature | HIGH |
| Hackathon card illustration | Custom artwork for the hackathon feature | HIGH |
| Badges card illustration | Custom artwork for the badges/ranking feature | HIGH |
| Bullet point icons (x12) | Small icons for each bullet item in feature cards | MEDIUM |
| DACON logo (footer) | Parent company logo for footer | MEDIUM |
| Social media icons (x4) | KakaoTalk, Instagram, YouTube, Blog | LOW |

**Decision needed**: Are custom illustrations being designed, or should we use placeholder SVGs / Lucide icons as interim?

### 4.3 Copy That Needs Writing (for non-ko locales)

All the Korean copy exists in the daker.ai snapshot. English, Chinese, and Japanese translations need to be written for every new key. Examples of non-trivial translations:

- "AI 서비스개발 히어로의 여정을 시작하세요" → English should capture the "hero's journey" metaphor
- "원정대" → "Expedition" vs "Squad" vs "Team" — needs consistent terminology decision
- "만+" number formatting → English uses "K+" or "M+", Chinese uses "万+", Japanese uses "万+"

---

## Part 5: Analyst Findings

### Missing Questions
1. **Should the home page remain a hackathon listing page or become a marketing landing page?** — Daker.ai clearly separates these. This is the single most impactful architectural decision for the home page.
2. **Where do the hero and feature card illustrations come from?** — Custom artwork vs stock vs AI-generated vs placeholder. This blocks visual parity.
3. **Are the large stats (98.4만+, 23.1만+, 423개) real or aspirational?** — Our platform likely does not have 984,000 submissions. Should we show real counts or target figures?
4. **What is the URL structure: `/hackathons` vs `/public/hackathons`?** — Daker.ai uses `/public/hackathons` for unauthenticated access. Our routes use `/hackathons`. This affects all CTA hrefs.
5. **Is "원정대" (Expedition) the same concept as our "Camp" / "팀원 모집"?** — Terminology mismatch between our implementation and daker.ai needs resolution.

### Undefined Guardrails
1. **Number formatting rules** — When to use `만+` vs raw numbers. Suggested: numbers >= 10,000 use `만+` in ko/zh/ja; numbers >= 1,000 use `K+` in en.
2. **Hero illustration responsive behavior** — Full-bleed on mobile? Scaled down? Hidden? Needs breakpoint definitions.
3. **Feature card grid breakpoints** — 2x2 on desktop, 2x1 on tablet, 1x1 on mobile? Exact breakpoints undefined.
4. **Animation budget** — We currently use 5 animation types (gradient, shimmer, dot-pattern, number-ticker, fade-in-up, marquee). Daker.ai appears to use fewer. What is the performance budget?

### Scope Risks
1. **Illustration dependency** — If custom illustrations are not available, the entire hero and feature card sections will look incomplete. Mitigation: define a "no-illustration" fallback design.
2. **Footer scope creep** — The daker.ai footer includes company registration numbers, social media links, and legal info. Adding all of this is a significant content effort. Mitigation: implement in phases (Phase 1: links + copyright, Phase 2: full legal).
3. **i18n explosion** — ~160 new translation entries across 4 locales. Risk of inconsistent or missing translations. Mitigation: complete ko first, then batch-translate.

### Unvalidated Assumptions
1. **Assumption: The home page should match daker.ai 1:1** — Validate: is this a pixel-perfect clone or a "spiritually similar" implementation?
2. **Assumption: Hackathon cards should be removed from home** — Validate: the current home page serves as both landing and listing. Removing cards requires the `/hackathons` page to be fully functional.
3. **Assumption: `NumberTicker` and `ShimmerButton` enhancements are acceptable** — Validate: are these considered improvements over daker.ai or unnecessary additions?
4. **Assumption: The `/public/` URL prefix is not needed** — Validate: daker.ai uses `/public/hackathons` and `/public/basecamp`. Are these authenticated-vs-public route distinctions?

### Missing Acceptance Criteria
1. **Hero section renders with illustration above text, ticker bar, two-line H1, description, and two CTA buttons** — Measurable: all 5 sub-elements visible on page load.
2. **Stats section shows 3 cards with Korean number formatting (만+ where applicable)** — Measurable: numbers render with correct suffix per locale.
3. **System Introduction section shows 4 feature cards in 2x2 grid with illustration + h3 + description + 3 bullets each** — Measurable: 4 cards x 3 bullets = 12 bullet items visible.
4. **Bottom CTA section shows two-line heading and single signup button** — Measurable: button links to correct route.
5. **No hackathon listing cards appear on the home page** — Measurable: zero `HackathonCard` components rendered on `/`.
6. **All text is i18n-driven, not hardcoded** — Measurable: switching locale changes all visible text.

### Edge Cases
1. **Zero hackathons in database** — Stats ticker should still display (with 0 or hide gracefully). Currently our stats depend on `hackathons.length`.
2. **Very long translated text** — Japanese and Chinese translations may be shorter or longer than Korean, breaking the intentional two-line H1 layout.
3. **Dark mode** — Hero illustration must work in both light and dark themes. Mountain illustration colors may clash with dark backgrounds.
4. **Mobile viewport** — Stats ticker text "39개 해커톤 · 80개 원정대 · 103명 모험가" may overflow on narrow screens. Needs truncation or wrapping strategy.
5. **No JavaScript** — `NumberTicker` and `AnimatedGradientText` require JS. Static fallback values needed for SSR/no-JS.
6. **Feature card illustration loading** — If 5+ illustrations (hero + 4 cards) load simultaneously, LCP may be impacted. Consider lazy loading non-hero images.

### Open Questions

- [ ] Should the home page be restructured from a hackathon-listing page to a marketing landing page (matching daker.ai)? — This is a fundamental architecture decision that changes the entire page structure.
- [ ] Where will hero and feature card illustrations come from (custom design, AI-generated, placeholder SVG)? — Blocks implementation of 5+ visual elements.
- [ ] What stats should the platform-wide numbers show (real data vs aspirational targets)? — Determines whether stats are dynamic (from DB) or static (hardcoded).
- [ ] Is "원정대" (Expedition) = "Camp" (팀원 모집) or a different concept? — Affects terminology across all i18n keys and navigation.
- [ ] Should we keep our Magic UI enhancements (AnimatedGradientText, ShimmerButton, NumberTicker, DotPattern) or match daker.ai's plainer style? — Affects visual identity direction.
- [ ] Is the `/public/` URL prefix pattern needed in our routing? — Affects all CTA link targets.

### Recommendations

**Priority 1 (Critical — blocks planning)**:
1. Decide: marketing landing page vs hackathon listing page for `/`
2. Decide: illustration source and timeline
3. Decide: keep or remove Magic UI enhancements

**Priority 2 (High — blocks implementation)**:
4. Write all ~40 new i18n keys for Korean
5. Create the System Introduction section component
6. Create the Bottom CTA section component
7. Revise hero copy (H1, subtitle, CTA text)

**Priority 3 (Medium — can be phased)**:
8. Translate new keys to en/zh/ja
9. Expand footer to match daker.ai
10. Add Korean number formatting utility (`만+`)
11. Create/source all illustration assets

**Priority 4 (Low — polish)**:
12. Remove tag marquee (or justify keeping it)
13. Tune animation performance budget
14. Add dark mode variants for illustrations

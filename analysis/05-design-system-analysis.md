# DAKER Design System Analysis

**Source:** daker.ai (Dacon AI Hackathon Platform)
**Framework detected in target project:** Next.js 16 + React 19 + Tailwind CSS v4 + shadcn/ui + Lucide React
**Analysis date:** 2026-03-12

---

## 1. Visual Design Language

### 30+ Observations on Daker's Visual Personality

**1. Aesthetic category: Energetic community platform**
Daker sits at the intersection of a gaming achievement system and a professional developer portal. It is not corporate-minimal (no Swiss-grid sterility), not maximalist-loud (no heavy drop shadows or busy backgrounds). The closest analogy is "Discord meets Notion with Korean mobile-app sensibility."

**2. Mountain / hero-journey visual metaphor — executed literally and symbolically**
The hero image on the home page is described as "정상을 향한 여정" (journey to the summit). Every page concept maps to the expedition metaphor: 원정대 (expedition team), 모험가 (adventurer), 베이스캠프 (base camp). This metaphor is not decorative — it structures navigation, content labels, and the reward system vocabulary.

**3. Card-heavy, content-dense layout style**
Every listing page (basecamp, community, adventurers) uses a dense card grid. Cards are the primary unit of information. The page background recedes completely — it exists only to make cards pop.

**4. Light-mode dominant**
All screenshots show a white/very-light-gray default. Dark mode is available (테마 전환 button present) but light is the primary design language.

**5. Page background is near-white (#F8F9FA or similar)**
The page canvas is not pure white. It is a subtle warm-gray/cool-gray that creates depth against white card surfaces.

**6. White cards on light-gray canvas — the foundation depth layer**
Cards are white (`#FFFFFF`) sitting on the light-gray page background. This 2-level depth system (page → card) is the entire structural logic.

**7. Blue as the singular dominant accent**
One blue dominates everything: nav active states, primary buttons, badge counts, tag highlights, filter active states. It is a mid-saturated blue — not a vibrant royal blue, not a desaturated slate. Estimated: `#4F8EF7` to `#3B82F6` range (Tailwind blue-500 family).

**8. Gradient banner headers on hackathon/basecamp cards**
The most visually striking element: hackathon cards have full-bleed colorful gradient banners as their cover images. Colors range from orange-to-red, blue-to-teal, purple-to-blue, green gradients. These are not decorative borders — they are the entire card image area, roughly 40% of card height.

**9. Gradient variety is intentional and diverse**
No two cards share the same gradient direction or color pair. This creates visual energy in the card grid without being chaotic. Each hackathon has a unique identity. Some gradients are horizontal, some diagonal.

**10. Text overlaid directly on gradients**
On hackathon cards in the basecamp view, text (titles, dates, participant counts) appears white-on-gradient. The gradients are dark enough to maintain contrast.

**11. Sidebar navigation — fixed left panel on listing pages**
All listing pages (basecamp, showcase, community, adventurers) share the same left-sidebar + right-main-content layout. Sidebar width is approximately 250–280px. The sidebar has its own white card background, separated from both the page background and the main content area.

**12. Sidebar tab navigation uses pill/filled active state**
Active filter tabs in the sidebar use a filled blue background with white text. Inactive tabs have no background. The count badge is right-aligned within the tab button.

**13. Announcement marquee banner at top of content area**
A horizontally scrolling marquee banner appears in the showcase and community pages. It uses a high-contrast colored background (orange/red gradient or solid color) with white emoji + text. This creates urgency without permanent space cost.

**14. Rounded corners are consistent and moderate — not sharp, not pill-shaped**
Cards, buttons, badges, and inputs all use a consistent border radius. Estimated: 8px for cards, 6px for buttons and inputs, 4px for small badges. Nothing is fully pill-shaped except the primary CTA buttons.

**15. Illustration style: 3D render / icon-like illustrations**
The home page feature section uses small 3D-style illustrated icons (profile, expedition, hackathon, badge sections). These are not flat icon-style illustrations — they have depth and color. Think Notion-style 3D emoji illustrations.

**16. Avatar overlapping in team cards**
Adventurer cards and team sections show circular avatars that slightly overlap each other (negative margin stacking). This is the standard "team members" pattern used in Figma, Linear, etc.

**17. Tier badge overlaid on avatar**
User avatars have a small tier badge (Silver/Bronze) displayed as an overlay in the bottom-right corner of the avatar. The tier badge is a small colored circle or shield icon.

**18. Gradient colored adventurer cards**
On the adventurers page, each user card has a colorful gradient background for the header area. Blue-to-teal gradients dominate, with some green and orange variants. This mirrors the hackathon card gradient treatment.

**19. Visual density is HIGH on listing pages, LOW on detail pages**
Basecamp (list of teams) is very dense — many cards packed tightly. Hackathon detail pages are spacious with clear section separation and generous whitespace around content blocks.

**20. Section headers use an icon + bold label pattern**
On the hackathon detail page, each section (대회 개요, 평가 기준, 상세 일정, etc.) is introduced by a small icon and a bold section label. The icon is functional, not decorative — it categorizes the content type.

**21. Countdown timer with flipping digit animation**
The hackathon detail sidebar shows a live countdown (18일 04시 36분 56초). The digits appear to be in individual boxes, suggesting a flip-card or slot animation for the seconds digit.

**22. Progress bar / evaluation ratio visualization**
The evaluation section shows horizontal bar charts for phase-based scoring ratios (30%/70% split bars). These use color fills (blue for one party, gray/orange for another) in a stacked bar format.

**23. Timeline / numbered step list for hackathon schedule**
The schedule section uses numbered circles (1, 2, 3... 8) connected by a vertical line — a standard vertical timeline pattern. Active/current steps have a different color from completed/upcoming steps.

**24. Modal / dialog for guided flows**
The "hackathon participation guide" appears as a modal dialog with numbered steps (1, 2, 3), dot pagination, and a "next" button. The modal has a white background with generous internal padding.

**25. Pill-shaped CTA buttons at hero level**
The primary "지금 시작하기" and "둘러보기" buttons on the home page are likely pill-shaped (border-radius: 9999px) filled blue and outlined respectively.

**26. Stats bar on homepage uses icon + large number + label**
Three stats are displayed: 98.4만+ 제출, 23.1만+ 팀 참여, 423개 대회 개최. Each stat uses a large bold number, a smaller label, and a source label ("DACON + DAKER"). These are arranged horizontally.

**27. Filter/sort controls positioned above content, right-aligned**
On the showcase and community pages, search input + sort dropdown are positioned in a single row above the card grid. The sort dropdown uses a small chevron icon.

**28. Pagination at bottom of listing pages**
Numbered pagination (1, 2, 3, 4, 5) with prev/next arrows. Numbers are compact and evenly spaced. Active page number uses blue text or filled blue background. Count label shows "104개 중 1-20" style text.

**29. Footer: three-column layout, DACON branding**
Footer uses a three-column layout: left (logo + nav links), center (social media icons), right (legal/business info). The DACON logo at the footer is a separate wordmark from the DAKER logo in the header.

**30. Dark card variants exist alongside light cards**
In the community page, some post cards appear with dark/video thumbnail backgrounds. The card content box is always white but media preview areas can be dark.

**31. "동영상" / "PDF" / "링크" type badges on community cards**
Content type indicators appear as small colored pill badges overlaid on the card thumbnail. These use distinct colors: video might be blue/purple, PDF might be red/orange.

**32. Bookmark / share action icons on cards**
Each community card has an action row at the bottom with like (heart), comment (speech bubble), and view (eye) counts, plus a bookmark button. Icons are small (16px) and muted gray.

---

## 2. Color Palette Deep Dive

### 20+ Color Observations

**Primary Blue:**
- Estimated value: `#4285F4` to `#3B82F6` (Google blue / Tailwind blue-500)
- Used for: nav active states, primary buttons, active tab fill, badge count bubbles, links, focus rings
- This is a confident mid-blue, not too electric, not too navy. It reads as "trustworthy tech platform."

**Secondary / Support Colors:**

1. **Page background:** `#F5F6F8` or `#F8F9FA` — a very subtle cool-gray, not white, not gray. Like Notion's page background.

2. **Card background:** `#FFFFFF` — pure white. Creates the foundational depth layer against the page bg.

3. **Sidebar background:** `#FFFFFF` — same as cards, set apart from page bg by a thin border.

4. **Sidebar border:** `#E5E7EB` or `#EDEDEF` — a light separator between sidebar and main content, and between sidebar sections.

5. **Body text primary:** `#111827` or `#1A1A1A` — near-black, high contrast. Used for card titles (H3) and body text.

6. **Body text secondary:** `#6B7280` — medium gray. Used for metadata: author names, timestamps, view counts, subtitles.

7. **Body text tertiary/caption:** `#9CA3AF` — lighter gray for placeholder text, labels, and disabled states.

8. **Active nav item text:** `#FFFFFF` on blue background — white text on the blue-filled active tab.

9. **Inactive nav item text:** `#374151` — dark gray for inactive nav labels.

**Gradient Color System (Hackathon / Adventurer Cards):**

10. **Gradient A — Orange to Red:** `#FF6B35` → `#E91E63` (warm, energetic) — used frequently for hackathon covers.

11. **Gradient B — Blue to Teal:** `#2196F3` → `#00BCD4` (cool, professional) — used for adventurer card headers.

12. **Gradient C — Purple to Blue:** `#7C3AED` → `#3B82F6` (creative, tech) — seen on several hackathon cards.

13. **Gradient D — Green to Teal:** `#10B981` → `#06B6D4` (fresh, growth) — used as an accent gradient variant.

14. **Gradient E — Red to Orange:** `#EF4444` → `#F97316` (urgent, competitive) — used for time-sensitive hackathons.

15. **Gradient F — Dark Blue to Navy:** `#1E40AF` → `#1E3A5F` (authoritative, stable) — used for some banner gradients.

**Status Colors:**

16. **Active/In-progress status:** Green dot or green text — `#10B981` or `#22C55E`.

17. **Closed/ended status:** Gray text — `#6B7280`.

18. **Urgent / 모집중 (recruiting):** Orange badge or red badge — likely `#F97316` background.

19. **D-day countdown highlight:** Blue text `#3B82F6` for the "D-18" style labels.

**Badge / Tag Colors:**

20. **Category tags (e.g., "#공지", "#해커톤"):** Light blue background `#EFF6FF` with blue text `#2563EB` — similar to Tailwind's `blue-50` / `blue-600` pairing.

21. **"+ N more" overflow badges:** Same light blue pill, e.g., "+7" or "+11".

22. **Announcement marquee background:** A bright orange or red-orange gradient — high contrast with white text, draws immediate attention.

23. **Border color for cards:** `#F3F4F6` or no border (shadow only). Cards may rely on subtle box shadow rather than border for definition.

24. **Input border:** `#D1D5DB` (gray-300 equivalent) with blue `#3B82F6` on focus.

---

## 3. Typography Scale

### 15+ Typography Observations

**Font family detection:**
From the Korean-language interface and modern look, the primary font is likely **Pretendard** (the standard choice for Korean-language SaaS/platform products in 2023–2026) or **Noto Sans KR** as a fallback. Pretendard is the Korean equivalent of Inter — it is variable, highly legible, and extremely clean at all weights. The rendering quality and tight letter-spacing visible in the screenshots strongly suggests Pretendard.

For our implementation we should use: `Pretendard` primary (with `@font-face` from CDN), fallback to `'Noto Sans KR', sans-serif`.

**1. H1 — Hero page title:**
- Size: ~40–48px (2.5rem–3rem)
- Weight: 800 (ExtraBold) or 700 (Bold)
- Color: `#111827`
- Line height: 1.2–1.3 (tight, heading-style)
- Example: "AI 서비스개발 히어로의 여정을 시작하세요"

**2. H1 — Page/section title (non-hero):**
- Size: ~28–32px (1.75rem–2rem)
- Weight: 700 (Bold)
- Example: "모험가 찾기" on the adventurers page with an icon prefix

**3. H2 — Section headers:**
- Size: ~22–26px (1.375rem–1.625rem)
- Weight: 700
- Example: "DAKER 시스템 소개", "준비되셨나요?"

**4. H3 — Card titles, sidebar section titles:**
- Size: ~16–18px (1rem–1.125rem)
- Weight: 600 (SemiBold)
- Color: `#111827`
- Example: Post titles in community, card titles in basecamp

**5. H4 — Sidebar subsection labels:**
- Size: ~14px (0.875rem)
- Weight: 600
- Color: `#374151`
- Example: "원정대 탐색", "고정 게시글"

**6. Body text — paragraph content:**
- Size: 14px (0.875rem)
- Weight: 400 (Regular)
- Color: `#374151`
- Line height: 1.6–1.7 (comfortable reading)

**7. Small text — metadata row (author, timestamp):**
- Size: 13px (0.8125rem)
- Weight: 400
- Color: `#6B7280`
- Example: "도비콘 • 약 12시간 전"

**8. Caption — stat counts, view counts:**
- Size: 12px (0.75rem)
- Weight: 400
- Color: `#9CA3AF`
- Example: "1", "0", "19" with icon prefixes in the like/comment/view row

**9. Large stat number — homepage stats:**
- Size: ~32–40px (2rem–2.5rem)
- Weight: 800 (ExtraBold)
- Color: `#111827`
- Example: "98.4만+", "23.1만+"

**10. Stat label — below large number:**
- Size: 14px
- Weight: 500 (Medium)
- Color: `#6B7280`
- Example: "제출", "팀 참여"

**11. Badge / tag text:**
- Size: 12px (0.75rem)
- Weight: 500 (Medium)
- Example: "#공지", "#해커톤" category pills

**12. Button text:**
- Size: 14px (0.875rem)
- Weight: 600 (SemiBold)
- Letter spacing: Slightly tighter than body — approximately normal or -0.01em

**13. Nav button text:**
- Size: 14–15px
- Weight: 500
- Color: inactive `#374151`, active white-on-blue

**14. Countdown digit:**
- Size: ~28–36px (1.75rem–2.25rem)
- Weight: 800 (ExtraBold) or Tabular/Monospace variant
- The digit boxes appear monospaced to prevent layout shift

**15. Table header text:**
- Size: 13px
- Weight: 600
- Color: `#6B7280` (slightly muted from body)
- Background: Light gray table header

**16. Line heights:**
- Headings: 1.2–1.3
- Body: 1.6–1.7
- Cards short descriptions: 1.5
- Captions/metadata: 1.4

**17. Letter spacing:**
- Headings: -0.02em to -0.03em (slight negative tracking — modern, tight)
- Body: 0 (default)
- All-caps labels: +0.05em to +0.08em (if any)

---

## 4. Spacing System

### 15+ Spacing Observations

**1. Base spacing unit:** 4px (consistent with Tailwind's default 4px base)

**2. Page outer padding:**
- Horizontal: 24–32px on desktop (responsive)
- The content area appears to have a max-width container approximately 1200–1280px centered

**3. Max content width:**
- Approximately 1200px (`max-w-5xl` or `max-w-6xl` in Tailwind terms)

**4. Header height:**
- Approximately 56–64px
- Compact but not cramped. Enough for logo + nav + search + login

**5. Sidebar width:**
- Approximately 240–280px
- Sidebar content has internal padding of ~16–20px on each side

**6. Gap between sidebar and main content:**
- Approximately 24px

**7. Card internal padding:**
- Top/bottom: 16–20px
- Left/right: 16–20px
- Cards feel "airy" inside — content doesn't press against edges

**8. Card grid gap:**
- Between cards: 16px (compact grid on basecamp page)
- On adventurers page with larger cards: 20–24px gap

**9. Card grid columns:**
- Basecamp listing: 2-column grid on desktop (hackathon cards)
- Community: 2-column or single-column feed
- Adventurers: 2-column grid

**10. Section spacing (between major sections on homepage):**
- 64–80px vertical gap between sections (generous whitespace for section breathing)

**11. Within-card element spacing:**
- Title to metadata row: 8px
- Metadata row to tags: 8px
- Tags to action bar: 12–16px

**12. Badge/tag spacing (internal):**
- Horizontal padding: 8–10px
- Vertical padding: 3–4px
- Gap between tags: 4–6px

**13. Button padding:**
- Primary large button: 12px top/bottom, 24px left/right
- Secondary/outline button: same
- Small button (sidebar tabs): 8px top/bottom, 12px left/right

**14. Avatar sizes:**
- Small (metadata row): 24–28px
- Medium (card): 36–40px
- Large (profile): 64–80px
- Overlap amount in stacked avatars: negative margin of about -8px

**15. Sidebar tab row spacing:**
- Each tab: 8–10px top/bottom, full sidebar width
- Between tab items: 2–4px gap

**16. Pagination button spacing:**
- Each number button: 32×32px or 36×36px
- Gap between buttons: 4px

**17. Footer column gap:**
- Approximately 48–64px between the three footer columns

---

## 5. Component Design Tokens

### 20+ Component Specifications

**BUTTON:**
- Primary (filled blue): `bg-blue-500 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-blue-600 transition`
- Secondary (outline): `border border-blue-500 text-blue-500 bg-transparent font-semibold text-sm px-6 py-3 rounded-lg hover:bg-blue-50`
- Ghost/nav: `text-gray-700 text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100`
- Active nav: `bg-blue-500 text-white text-sm font-medium px-3 py-2 rounded-md`
- Radius: `rounded-lg` (8px) for standard, `rounded-full` (9999px) for hero CTAs
- Disabled: `opacity-50 cursor-not-allowed`

**BADGE / TAG:**
- Category tag: `bg-blue-50 text-blue-600 text-xs font-medium px-2 py-0.5 rounded`
- Count badge (on sidebar tabs): `bg-blue-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center`
- Overflow badge ("+7"): Same as category tag, blue variant
- Status "모집중": `bg-green-50 text-green-600 text-xs font-semibold px-2 py-0.5 rounded`
- Status "마감": `bg-gray-100 text-gray-500 text-xs font-semibold px-2 py-0.5 rounded`
- Content type (동영상/PDF): `bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded` (or red for PDF)

**CARD:**
- Background: `bg-white`
- Border: `border border-gray-100` or `border-0` with shadow
- Shadow: `shadow-sm` (subtle) on default, `shadow-md` on hover
- Border radius: `rounded-xl` (12px) for main content cards, `rounded-lg` (8px) for smaller cards
- Padding: `p-4` or `p-5`
- Hover: `hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`

**HACKATHON CARD (specialized):**
- Has gradient cover area: full-width, ~160–200px height, `rounded-t-xl overflow-hidden`
- Cover gradient applied as `background: linear-gradient(135deg, colorA, colorB)`
- Text on gradient is white with optional text-shadow
- Card body below gradient: white background, padding 16px

**INPUT / SEARCH:**
- Height: approximately 40px (`h-10`)
- Border: `border border-gray-200 rounded-lg`
- Background: `bg-white` (inputs inside cards) or `bg-gray-50` (search bars)
- Placeholder color: `text-gray-400`
- Focus: `focus:ring-2 focus:ring-blue-500 focus:border-transparent`
- With icon: left-padded to accommodate 16px icon + 8px margin

**AVATAR:**
- Shape: always circular `rounded-full`
- Sizes: `w-6 h-6` (small), `w-8 h-8` (medium), `w-10 h-10` (large)
- Border: none or `ring-2 ring-white` when stacked
- Tier badge: absolute positioned bottom-right, approximately 14×14px

**SIDEBAR NAV TABS:**
- Container: `flex flex-col gap-1`
- Tab: `flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium`
- Active: `bg-blue-500 text-white`
- Inactive: `text-gray-700 hover:bg-gray-100`
- Count: right-aligned badge

**ANNOUNCEMENT MARQUEE:**
- Background: orange/red gradient `from-orange-500 to-red-500`
- Text: white, font-medium, with emoji
- Animation: CSS `@keyframes marquee` infinite scroll
- Speed: approximately 30–40 seconds per full cycle

**COUNTDOWN TIMER:**
- Each digit block: approximately 40×52px, dark background (near-black or dark navy), white bold digit
- Label below digit: small gray text ("일", "시", "분", "초")
- Layout: horizontal row of 4 digit groups
- Animation: CSS flip-card or slot animation for changing digits

**TABLE:**
- Header row: `bg-gray-50` with `text-gray-500 text-xs font-semibold uppercase`
- Row: `border-b border-gray-100`
- Row height: approximately 48px
- Cell padding: `px-4 py-3`
- Hover: `hover:bg-gray-50`

**LIKE / COMMENT / VIEW ROW:**
- Icon size: 14–16px
- Icon color: `text-gray-400`
- Count text: 12px `text-gray-500`
- Gap between icon+count pairs: 12–16px

**PROGRESS / EVALUATION BAR:**
- Height: approximately 8px
- Border radius: `rounded-full`
- Background: `bg-gray-200`
- Fill: blue `bg-blue-500` or split fills
- Label: percentage text above/beside bar

**TIMELINE (schedule):**
- Number circle: 32×32px, border `border-2 border-blue-500 text-blue-500 font-bold`, current step has `bg-blue-500 text-white`
- Connecting line: 2px gray vertical line
- Step title: H3 with `font-semibold`
- Step badge ("진행중"): small green badge

**MODAL / DIALOG:**
- Overlay: `bg-black/50 backdrop-blur-sm`
- Container: `bg-white rounded-2xl p-6 max-w-md w-full shadow-xl`
- Step number: large bold number in a colored circle
- Dot pagination: small circles, active = filled blue

---

## 6. Page Layout Measurements

### Per-Page Analysis

**HOME PAGE:**
- Max content width: ~1200px
- Hero section: full-width background image + centered text overlay
- Stats row: 3-column flex, roughly equal width columns
- Feature grid: 2×2 grid of feature cards
- CTA section: centered, single column

**BASECAMP (Team Listing):**
- Layout: `flex` with fixed-width sidebar + fluid main
- Sidebar: ~260px wide, `sticky top-0 h-screen overflow-y-auto`
- Main area: fluid, 2-column card grid
- Card grid: `grid grid-cols-2 gap-4`
- Card width: approximately 400–480px each
- Page horizontal padding: 24px each side

**SHOWCASE (Project Gallery):**
- Same sidebar + main layout as basecamp
- Main area: 1-column card list (cards are wider/horizontal layout) OR 2-column grid
- Single card visible in screenshot appears to be ~640px wide in 1-column mode

**COMMUNITY (Posts):**
- Same sidebar + main layout
- Posts are displayed as a vertical list (single column feed)
- Each post card: full width of main area, ~160px height for posts with thumbnails
- Thumbnail: left-aligned, approximately 160×120px
- Post content: takes remaining width

**ADVENTURERS (User Listing):**
- Same sidebar + main layout
- Main area: 2-column card grid
- User cards are tall/portrait orientation: approximately 300–340px tall
- User card header: gradient area, approximately 80–100px height with avatar positioned at bottom

**HACKATHON DETAIL PAGE:**
- Layout: right sidebar + left main content (inverted from listing pages)
- Right sidebar: approximately 300–320px, contains countdown, team list, submission tabs
- Main content: fluid, contains all hackathon info sections
- Section dividers: clear horizontal rules or significant vertical whitespace (40–48px)

---

## 7. Iconography Analysis

**Icon library: Lucide React** (confirmed — the target project already has `lucide-react: ^0.577.0` in package.json)

Daker's icon usage patterns:

**1. Nav icons:**
- Size: 16×16px when used inline with nav text
- The "더보기" button uses a chevron-down icon (Lucide `ChevronDown`)

**2. Search icon:**
- Lucide `Search` at 16px inside the search input field

**3. Card action icons:**
- Heart/like: Lucide `Heart` at 14–16px
- Comment: Lucide `MessageCircle` or `MessageSquare` at 14–16px
- Views: Lucide `Eye` at 14–16px
- Bookmark: Lucide `Bookmark` at 16px

**4. Section header icons on hackathon detail:**
- Trophy or similar for prizes: Lucide `Trophy` at 18px
- Calendar for schedule: Lucide `Calendar` at 18px
- Users for team: Lucide `Users` at 18px
- File for rules: Lucide `FileText` at 18px
- Color: matches section accent color or blue

**5. Sidebar navigation icons:**
- Pin for fixed posts: Lucide `Pin` at 16px
- Trophy/chart for rankings: Lucide `BarChart2` or `Trophy` at 16px
- Alert/feedback: Lucide `MessageCircle` at 16px

**6. Status icons:**
- Clock for countdown: Lucide `Clock` at 16px
- CheckCircle for completed steps: Lucide `CheckCircle2` at 16px (green)

**7. Avatar fallback:**
- Lucide `User` or `UserCircle` at whatever the avatar size is

**8. Icon + text alignment:**
- Always `flex items-center gap-2` — icon vertically centered with text
- Icons never float; always inline with accompanying text

**9. Decorative vs functional:**
- No purely decorative icons — every icon communicates something
- Section header icons function as content-type indicators
- The adventure/mountain metaphor icons on homepage are illustrated (3D renders), not icon-library icons

**10. Icon colors:**
- Functional icons in action rows: `text-gray-400`
- Active/important icons: `text-blue-500`
- Section header icons: blue accent or custom color
- Status icons: color matches status (green for active, gray for inactive)

---

## 8. Micro-animation Patterns

**1. Card hover transform:**
- Lift: `-translate-y-0.5` or `-translate-y-1` (2–4px upward shift)
- Shadow: `shadow-sm` → `shadow-md` or `shadow-lg`
- Duration: 150–200ms
- Easing: `ease-out` (fast start, decelerates at peak)

**2. Button hover states:**
- Color: `bg-blue-500` → `bg-blue-600` (one shade darker)
- Scale: possibly `scale-[1.02]` on primary CTA buttons only
- Duration: 100–150ms

**3. Button active/press states:**
- `scale-[0.98]` on click (slight press-down feel)
- Duration: 75ms

**4. Sidebar tab transitions:**
- Background color transition from transparent to blue
- Duration: 150ms, ease
- No transform — purely color change

**5. Announcement marquee scroll:**
- CSS animation: `@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`
- Duration: approximately 30–40 seconds
- `animation-timing-function: linear`
- Content duplicated to create seamless loop

**6. Countdown timer digit change:**
- Likely CSS flip animation or simple opacity fade between digit values
- Duration: 300ms
- If flip: rotates on X axis, card-flip metaphor

**7. Modal/dialog enter:**
- Likely `scale(0.95)` → `scale(1)` + `opacity(0)` → `opacity(1)`
- Duration: 200ms ease-out
- Overlay fade: 150ms

**8. Expandable sidebar sections ("최근 인기" dropdown):**
- Accordion-style height animation
- ChevronDown icon rotates 180° when expanded
- Content slides down: `max-height: 0` → `max-height: auto` with transition
- Duration: 200ms ease

**9. Page load stagger:**
- Cards likely stagger-animate into view on first load
- Using `opacity(0)` → `opacity(1)` + `translateY(8px)` → `translateY(0)`
- Stagger delay: 50–100ms between cards
- The project uses `motion` (Framer Motion) which supports this natively

**10. Focus ring animation:**
- Tab/keyboard focus: `ring-2 ring-blue-500 ring-offset-2`
- Appears immediately on focus (no animation needed)

**11. Loading states:**
- Skeleton screens likely used (pulsing gray placeholders)
- `animate-pulse` on placeholder blocks

**12. Navigation active indicator:**
- The active nav item transition from inactive to active is a background color fill
- Duration: 150ms

---

## 9. Design Strengths to Replicate

**1. Gradient card covers create instant visual identity for each hackathon**
Rather than generic thumbnail images, colorful programmatic gradients make each card memorable and visually distinct without relying on real imagery.

**2. Consistent depth hierarchy (page bg → sidebar bg → card bg)**
The three-level background system creates genuine spatial depth without heavy shadows. The eye naturally understands the layering.

**3. The expedition/adventure vocabulary applied consistently throughout**
"베이스캠프", "원정대", "모험가" — the metaphor is never broken. It gives the platform a distinct personality that a generic "competitions" platform lacks.

**4. Count badges on sidebar tabs are instantly informative**
Users immediately see which category has the most content without having to click through. This reduces friction for discovery.

**5. Countdown timer as primary engagement driver on hackathon detail**
The large, prominent countdown creates urgency and emotional investment. It is positioned in the sticky sidebar so it's always visible while scrolling.

**6. Adventure/tier badge overlaid on avatar**
The Silver/Bronze tier overlay on avatars makes user expertise visible at a glance without requiring separate "level" UI. It's economical design.

**7. Announcement marquee for platform-wide notices**
The scrolling banner is attention-grabbing without permanently consuming vertical space. Far better than a static alert box.

**8. Section header icon + label pattern on detail pages**
Each section (overview, rules, schedule, prizes) uses an icon + bold label. This makes long-form content navigable at a glance.

**9. Numbered timeline for hackathon schedule**
The vertical numbered timeline is more scannable than a bullet list and conveys sequential progress. Users can immediately see where they are in the process.

**10. 3D illustrated icons for feature sections on homepage**
The homepage feature cards use rich 3D-style illustrations rather than flat icons. This communicates "premium product" without heavy design cost.

**11. Participation guide modal with step pagination**
Breaking the onboarding guide into paginated steps (with dot indicators and Next button) is less intimidating than showing all steps at once.

**12. Team avatar stacking on expedition cards**
The overlapping circular avatars for team members is immediately intuitive — you can see at a glance how full a team is.

**13. Muted icon-based action row (like/comment/view)**
Rather than labeled buttons, the action row uses icon + count. This is space-efficient and internationally legible.

**14. Dark countdown digit boxes against light page**
The dark digit containers for the countdown create strong visual contrast and draw the eye. They read as "important information."

**15. Filter tabs in sidebar with active state clearly distinguished**
The filled blue background on the active sidebar tab is unambiguous. Users always know where they are in the filter hierarchy.

**16. The "+ N more" overflow pattern for tags**
Rather than wrapping unlimited tags, cards truncate to 2–3 visible tags and show "+7" for overflow. Keeps card height consistent.

---

## 10. Design Weaknesses / Opportunities to Exceed Daker

**1. Typography is competent but not distinctive**
Daker uses Pretendard (or Noto Sans KR) which is the baseline expectation for Korean tech products. There is no font personality. Opportunity: pair Pretendard with a distinctive display typeface for headlines — perhaps **Plus Jakarta Sans**, **Sora**, or **DM Sans** for non-Korean display text. This gives our implementation a memorable typographic voice.

**2. Color palette is conservative — one blue, many grays**
Daker's palette is safe. A single accent color on a white/gray canvas is readable but unmemorable. Opportunity: introduce a secondary accent (warm amber or electric teal) used strategically for interactive states and celebrations. This creates more visual interest without chaos.

**3. Homepage hero is unclear from screenshots — likely text-heavy and static**
The hero section description mentions a mountain image with text overlay. This is a very standard treatment. Opportunity: create an animated hero — particles, a subtle gradient shift, or an SVG mountain silhouette with parallax motion. Use Framer Motion (already in the project) for a 5-second hero entrance animation.

**4. Card hover states are generic (shadow lift)**
Shadow-lift on hover is the universal default and feels unremarkable. Opportunity: add a subtle border color transition on hover — when a card is hovered, a thin colored border appears (matching the card's gradient accent color). This creates a "glow" effect that ties the card's color identity to its interaction.

**5. No dark mode visual differentiation**
Daker's dark mode appears to be a straightforward color inversion. Opportunity: design a genuinely distinct dark mode — not just dark backgrounds, but a different card treatment (semi-transparent frosted glass cards over a starfield or subtle grid background).

**6. Gradient cards could have more depth**
The gradient covers on hackathon cards are flat gradients — color A to color B. Opportunity: add a subtle noise/grain texture over gradients (CSS `filter: contrast()` + SVG turbulence) for a richer, more analog feel. This is a differentiating detail.

**7. The sidebar feels utilitarian compared to the card-heavy main content**
The sidebar is functional but visually boring — white box with gray text. Opportunity: give the sidebar a subtle visual treatment — perhaps a very light dotted or grid pattern background, or a thin colored left-border accent.

**8. Stats on homepage have no animation**
Static stat numbers are wasted potential. Opportunity: animate stat numbers counting up on page enter (0 → 98.4만+) using a number ticker component. This is high-impact, memorable, and directly available in Magic UI.

**9. Footer is purely legal/informational**
The Daker footer is standard compliance information. Opportunity: add a mini-hero element to the footer — a brief tagline, a gradient accent, or a subtle CTA section above the legal text. Make the footer a destination, not a dead end.

**10. No skeleton/loading state sophistication visible**
Loading states are not visible in screenshots. Opportunity: implement beautiful, content-aware skeleton screens that mirror the exact card shapes (including the gradient banner placeholder), creating a polished perceived performance.

**11. Community page has inconsistent card heights**
Posts with thumbnails and posts without thumbnails create jagged visual rhythm in the feed. Opportunity: enforce consistent card heights with a fixed aspect ratio on thumbnail areas (and a branded placeholder for posts without images).

**12. No micro-celebration animations visible**
No confetti, no achievement unlock animation, no success feedback beyond standard toasts. The project already has `canvas-confetti` installed. Opportunity: trigger confetti on key moments (first hackathon join, tier upgrade, submission success).

---

## 11. Design Token Specification

### Complete Tailwind CSS v4 Compatible Tokens

This specification captures Daker's essence while asserting our own creative interpretation. Key differences from Daker: we use a richer accent system (blue primary + amber secondary), add a genuine gradient vocabulary, and use a more expressive typographic scale.

```css
/* === DAKER-INSPIRED DESIGN TOKENS === */
/* Place in your CSS :root / globals.css */

:root {
  /* ──────────────────────────────────────
     COLOR: BASE PALETTE
  ────────────────────────────────────── */

  /* Backgrounds — 3-level depth system */
  --color-page-bg:       #F5F6F8;  /* Cool near-white page canvas */
  --color-surface:       #FFFFFF;  /* Card / panel surface */
  --color-surface-alt:   #F9FAFB;  /* Subtle alt surface (table rows, hover) */
  --color-surface-inset: #F3F4F6;  /* Inset areas (input backgrounds) */

  /* ──────────────────────────────────────
     COLOR: TEXT HIERARCHY
  ────────────────────────────────────── */
  --color-text-primary:   #111827;  /* H1, H2, H3, strong body */
  --color-text-secondary: #374151;  /* Body text, nav labels */
  --color-text-muted:     #6B7280;  /* Metadata, subtitles, captions */
  --color-text-subtle:    #9CA3AF;  /* Placeholders, disabled */
  --color-text-inverse:   #FFFFFF;  /* Text on dark/colored backgrounds */

  /* ──────────────────────────────────────
     COLOR: BRAND PRIMARY — Blue
     Interpretation: confident, trustworthy, platform-blue
  ────────────────────────────────────── */
  --color-primary-50:  #EFF6FF;
  --color-primary-100: #DBEAFE;
  --color-primary-200: #BFDBFE;
  --color-primary-300: #93C5FD;
  --color-primary-400: #60A5FA;
  --color-primary-500: #3B82F6;  /* PRIMARY — default */
  --color-primary-600: #2563EB;  /* Hover state */
  --color-primary-700: #1D4ED8;  /* Active/pressed */
  --color-primary-800: #1E40AF;
  --color-primary-900: #1E3A8A;

  /* ──────────────────────────────────────
     COLOR: BRAND SECONDARY — Amber
     Our creative addition: energy, celebration, achievement
  ────────────────────────────────────── */
  --color-secondary-50:  #FFFBEB;
  --color-secondary-100: #FEF3C7;
  --color-secondary-200: #FDE68A;
  --color-secondary-300: #FCD34D;
  --color-secondary-400: #FBBF24;
  --color-secondary-500: #F59E0B;  /* SECONDARY — default */
  --color-secondary-600: #D97706;
  --color-secondary-700: #B45309;

  /* ──────────────────────────────────────
     COLOR: STATUS SYSTEM
  ────────────────────────────────────── */
  --color-success-light: #DCFCE7;
  --color-success:       #22C55E;
  --color-success-dark:  #16A34A;

  --color-warning-light: #FEF3C7;
  --color-warning:       #F59E0B;
  --color-warning-dark:  #D97706;

  --color-error-light:   #FEE2E2;
  --color-error:         #EF4444;
  --color-error-dark:    #DC2626;

  --color-info-light:    #EFF6FF;
  --color-info:          #3B82F6;
  --color-info-dark:     #2563EB;

  /* ──────────────────────────────────────
     COLOR: BORDERS
  ────────────────────────────────────── */
  --color-border:        #E5E7EB;  /* Default card / section borders */
  --color-border-light:  #F3F4F6;  /* Very subtle separators */
  --color-border-strong: #D1D5DB;  /* Input borders, stronger dividers */
  --color-border-focus:  #3B82F6;  /* Focus ring color */

  /* ──────────────────────────────────────
     COLOR: GRADIENT VOCABULARY
     6 named gradients matching Daker card system
  ────────────────────────────────────── */
  --gradient-fire:    linear-gradient(135deg, #FF6B35 0%, #E91E63 100%);
  --gradient-ocean:   linear-gradient(135deg, #2196F3 0%, #00BCD4 100%);
  --gradient-cosmic:  linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%);
  --gradient-forest:  linear-gradient(135deg, #10B981 0%, #06B6D4 100%);
  --gradient-sunset:  linear-gradient(135deg, #F97316 0%, #EF4444 100%);
  --gradient-night:   linear-gradient(135deg, #1E40AF 0%, #1E1B4B 100%);

  /* Utility gradient: primary to primary-dark (for CTAs, hero elements) */
  --gradient-primary: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);

  /* ──────────────────────────────────────
     TYPOGRAPHY SCALE
  ────────────────────────────────────── */

  /* Font families */
  --font-sans:    'Pretendard Variable', 'Pretendard', 'Noto Sans KR',
                   -apple-system, BlinkMacSystemFont, sans-serif;
  --font-display: 'Plus Jakarta Sans', var(--font-sans);  /* Our creative addition */
  --font-mono:    'JetBrains Mono', 'Fira Code', monospace;

  /* Type scale — fluid sizing approach */
  --text-xs:   0.75rem;    /* 12px — captions, badges */
  --text-sm:   0.875rem;   /* 14px — body, buttons, metadata */
  --text-base: 1rem;       /* 16px — body default */
  --text-lg:   1.125rem;   /* 18px — card titles, H3 */
  --text-xl:   1.25rem;    /* 20px — sub-headings */
  --text-2xl:  1.5rem;     /* 24px — H2 section headers */
  --text-3xl:  1.875rem;   /* 30px — H1 page titles */
  --text-4xl:  2.25rem;    /* 36px — H1 hero, stat numbers */
  --text-5xl:  3rem;       /* 48px — Hero H1 maximum */

  /* Font weights */
  --weight-regular:    400;
  --weight-medium:     500;
  --weight-semibold:   600;
  --weight-bold:       700;
  --weight-extrabold:  800;

  /* Line heights */
  --leading-tight:     1.2;   /* Headings */
  --leading-snug:      1.375; /* Large body, card descriptions */
  --leading-normal:    1.5;   /* Default body */
  --leading-relaxed:   1.625; /* Long-form reading */

  /* Letter spacing */
  --tracking-tight:    -0.025em;  /* Large headings */
  --tracking-normal:    0em;      /* Body text */
  --tracking-wide:      0.025em;  /* Small caps, labels */

  /* ──────────────────────────────────────
     SPACING SCALE
     4px base unit, following Tailwind
  ────────────────────────────────────── */
  --space-1:  0.25rem;   /* 4px */
  --space-2:  0.5rem;    /* 8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-5:  1.25rem;   /* 20px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */

  /* Layout-specific spacing */
  --layout-page-px:        clamp(16px, 3vw, 32px);  /* Responsive page padding */
  --layout-max-width:      1200px;
  --layout-sidebar-width:  264px;
  --layout-sidebar-gap:    24px;
  --layout-header-height:  60px;
  --layout-section-gap:    var(--space-16);    /* 64px between major sections */
  --layout-card-gap:       var(--space-4);     /* 16px between cards in grid */
  --layout-card-padding:   var(--space-5);     /* 20px internal card padding */

  /* ──────────────────────────────────────
     SHADOW SCALE
  ────────────────────────────────────── */
  --shadow-xs:  0 1px 2px 0 rgb(0 0 0 / 0.04);
  --shadow-sm:  0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06);
  --shadow-md:  0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.06);
  --shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.06);
  --shadow-xl:  0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.05);
  --shadow-card: var(--shadow-sm);      /* Default card shadow */
  --shadow-card-hover: var(--shadow-md); /* Card shadow on hover */

  /* ──────────────────────────────────────
     BORDER RADIUS SCALE
  ────────────────────────────────────── */
  --radius-sm:   4px;    /* Tiny: small badges, table cells */
  --radius-md:   6px;    /* Small: buttons (standard), inputs */
  --radius-lg:   8px;    /* Medium: compact cards, dropdowns */
  --radius-xl:   12px;   /* Standard: main content cards */
  --radius-2xl:  16px;   /* Large: modal containers, feature cards */
  --radius-full: 9999px; /* Pill: CTA buttons, avatar circles, count badges */

  /* ──────────────────────────────────────
     BREAKPOINTS (for reference in CSS media queries)
  ────────────────────────────────────── */
  /* sm:  640px — mobile landscape, small tablet */
  /* md:  768px — tablet */
  /* lg:  1024px — desktop (sidebar layout activates here) */
  /* xl:  1280px — wide desktop */
  /* 2xl: 1536px — ultra-wide */

  /* ──────────────────────────────────────
     ANIMATION / TRANSITION TOKENS
  ────────────────────────────────────── */
  --duration-fast:    100ms;
  --duration-base:    150ms;
  --duration-slow:    200ms;
  --duration-slower:  300ms;
  --ease-out:         cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-in-out:      cubic-bezier(0.4, 0.0, 0.2, 1);
  --ease-spring:      cubic-bezier(0.175, 0.885, 0.32, 1.275);

  /* ──────────────────────────────────────
     Z-INDEX SCALE
  ────────────────────────────────────── */
  --z-base:    0;
  --z-raised:  10;
  --z-dropdown: 100;
  --z-sticky:  200;
  --z-overlay: 300;
  --z-modal:   400;
  --z-toast:   500;
}

/* ──────────────────────────────────────
   DARK MODE TOKENS
   Applied via [data-theme="dark"] or .dark class
────────────────────────────────────── */
[data-theme="dark"],
.dark {
  --color-page-bg:        #0F1117;   /* Near-black page canvas */
  --color-surface:        #1A1D27;   /* Dark card surface */
  --color-surface-alt:    #1F2330;   /* Alt dark surface */
  --color-surface-inset:  #151822;   /* Deepest inset */

  --color-text-primary:   #F9FAFB;
  --color-text-secondary: #E5E7EB;
  --color-text-muted:     #9CA3AF;
  --color-text-subtle:    #6B7280;

  --color-border:         #2D3142;
  --color-border-light:   #252837;
  --color-border-strong:  #374151;

  --shadow-card:       0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.2);
  --shadow-card-hover: 0 4px 12px 0 rgb(0 0 0 / 0.4);
}
```

### Tailwind CSS v4 Config Supplement

```css
/* In your tailwind.css / main CSS file — extend with these utilities */

@theme {
  /* Custom colors referencing CSS variables */
  --color-page: var(--color-page-bg);
  --color-surface: var(--color-surface);

  /* Custom spacing for layout */
  --spacing-sidebar: var(--layout-sidebar-width);
  --spacing-header: var(--layout-header-height);

  /* Custom shadows */
  --shadow-card: var(--shadow-card);
  --shadow-card-hover: var(--shadow-card-hover);

  /* Custom border radii */
  --radius-card: var(--radius-xl);
  --radius-modal: var(--radius-2xl);
}
```

### Component Class Patterns (Tailwind utility conventions)

```
Card (default):       bg-white rounded-xl shadow-sm border border-gray-100 p-5
Card (hover):         + hover:shadow-md hover:-translate-y-0.5 transition-all duration-200
Hackathon card cover: w-full h-40 rounded-t-xl object-cover [background:var(--gradient-fire)]
Sidebar:              w-64 bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-4
Button primary:       bg-blue-500 hover:bg-blue-600 active:scale-[0.98] text-white
                      font-semibold text-sm px-5 py-2.5 rounded-lg transition-all duration-150
Button secondary:     border border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold
                      text-sm px-5 py-2.5 rounded-lg transition-all duration-150
Badge category:       bg-blue-50 text-blue-600 text-xs font-medium px-2 py-0.5 rounded
Badge count:          bg-blue-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full
Status active:        bg-green-50 text-green-600 text-xs font-semibold px-2 py-0.5 rounded
Nav tab active:       bg-blue-500 text-white rounded-lg
Nav tab inactive:     text-gray-700 hover:bg-gray-100 rounded-lg
Input:                border border-gray-200 bg-white rounded-lg h-10 px-3 text-sm
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent
Avatar sm:            w-7 h-7 rounded-full object-cover
Avatar md:            w-9 h-9 rounded-full object-cover
Avatar stack:         -ml-2 ring-2 ring-white
```

---

*Analysis based on visual inspection of 4 full-page screenshots and 6 DOM snapshot files from daker.ai. All color values are estimated from visual observation — exact values should be confirmed via browser devtools inspection of the live site.*

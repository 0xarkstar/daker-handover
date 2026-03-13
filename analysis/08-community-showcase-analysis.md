# 08 - DAKER Community & Showcase Page Deep Analysis

> Analyst: Ultra-deep reverse-engineering of daker.io community and showcase pages.
> Sources: Playwright accessibility snapshots + full-page screenshots (2026-03-12)
> Current codebase state: NO community or showcase pages exist in the hackathon-handover app.

---

## Part 1: Community Page Analysis

### 1.1 Overall Page Layout (5 observations)

| # | Element | Detail |
|---|---------|--------|
| 1 | **Two-column layout** | Left sidebar (`<aside>` / `complementary`) + main content area (`<main>`) inside a parent flex container |
| 2 | **Sidebar width** | Approximately 280-300px fixed width, does not scroll independently from main |
| 3 | **Main content width** | Fills remaining space, max-width constrained, centered |
| 4 | **Announcement banner** | Spans full width of main content area, sits between sidebar top and post list |
| 5 | **Footer** | Full-width DACON corporate footer with links, social icons, legal info (shared across all pages) |

### 1.2 Global Navigation Bar (8 observations)

| # | Element | Detail |
|---|---------|--------|
| 1 | **Logo** | "DAKER" text logo (link to `/`), left-aligned |
| 2 | **Primary nav buttons** | `해커톤`, `베이스캠프`, `커뮤니티`, `학습`, `쇼케이스` -- 5 top-level sections |
| 3 | **Overflow menu** | `더보기` button with dropdown arrow icon for additional nav items |
| 4 | **Global search** | Textbox with placeholder "원정대, 해커톤, 사용자 검색..." -- searches across expeditions, hackathons, users |
| 5 | **Login button** | `로그인` link pointing to `/api/auth/dacon/login` (OAuth/SSO with DACON) |
| 6 | **Theme toggle** | `테마 전환` button with sun/moon icon for dark/light mode |
| 7 | **Active state** | `커뮤니티` button appears visually highlighted (current page) |
| 8 | **No language switcher** | Unlike our implementation, DAKER has no multi-language toggle in nav |

### 1.3 Sidebar Components (22 observations)

#### 1.3.1 Category Menu (7 observations)

| # | Element | Detail |
|---|---------|--------|
| 1 | **Section heading** | `h3` "커뮤니티 메뉴" (Community Menu) |
| 2 | **Category buttons** | Each is a `<button>` with text label + count badge |
| 3 | **Categories** | `홈(104)`, `잡담(10)`, `대회(22)`, `바이브코딩(7)`, `기타(6)`, `학습(37)` |
| 4 | **Count display** | Numeric count in a separate styled `<span>` (appears as pill/badge) |
| 5 | **Active state** | `홈` button has distinct background color (blue/primary) when selected |
| 6 | **Vertical stack** | Buttons stacked vertically, full-width within sidebar |
| 7 | **Counts are live** | Total across categories (104+10+22+7+6+37 = 186) exceeds "홈" count (104), suggesting "홈" is filtered or "홈" shows all + categories overlap |

#### 1.3.2 Pinned Posts (3 observations)

| # | Element | Detail |
|---|---------|--------|
| 1 | **Section heading** | `h3` "고정 게시글" with a pin icon (`<img>`) |
| 2 | **Pinned links** | Two announcement links with `[공지]` prefix, truncated with `...` |
| 3 | **Link URLs** | `/community/monthly-hackathon-emergency-handover-documents`, `/community/hackathon-team-switch-event-participation` -- slug-based community post URLs |

#### 1.3.3 Trending Section (5 observations)

| # | Element | Detail |
|---|---------|--------|
| 1 | **Collapsible header** | `button` "최근 인기" with expand/collapse icon, `[expanded]` attribute |
| 2 | **Fire icon** | Image icon next to "최근 인기" text (trending/fire emoji style) |
| 3 | **Tab bar** | `tablist` with three `tab` elements: `일간` (daily, selected), `주간` (weekly), `월간` (monthly) |
| 4 | **Tab panel** | `tabpanel` "일간" showing "해당 기간에 게시글이 없습니다" (empty state message) |
| 5 | **Accordion behavior** | Uses `expanded` attribute; clicking toggles visibility of content below |

#### 1.3.4 Post TOP Section (2 observations)

| # | Element | Detail |
|---|---------|--------|
| 1 | **Collapsible header** | `button` "게시글 TOP" with icon, collapsed by default |
| 2 | **Crown/trophy icon** | Image icon next to label |

#### 1.3.5 User Ranking Section (2 observations)

| # | Element | Detail |
|---|---------|--------|
| 1 | **Collapsible header** | `button` "유저 랭킹" with icon, collapsed by default |
| 2 | **User icon** | Image icon next to label |

#### 1.3.6 Feedback Button (2 observations)

| # | Element | Detail |
|---|---------|--------|
| 1 | **Position** | Bottom of sidebar, below all accordion sections |
| 2 | **Style** | `button` "피드백 보내기" with icon -- likely opens a modal or external form |

#### 1.3.7 Sidebar Summary

Total sidebar widgets: 6 (category menu, pinned posts, trending, post TOP, user ranking, feedback button). Three of these are collapsible accordions.

### 1.4 Announcement Banner (8 observations)

| # | Element | Detail |
|---|---------|--------|
| 1 | **Dual-track marquee** | Two side-by-side announcement strips, each with icon + badge + scrolling text |
| 2 | **Badge types** | `공지` (notice, blue/default) and `긴급 공지` (urgent notice, red -- visible in showcase screenshot) |
| 3 | **Marquee content** | Identical text in both tracks: "긴급 공지! AI 프로젝트 팀 모집 마감 임박! 지금 DAKER에서 합류하세요!" |
| 4 | **Speaker icon** | `<img>` megaphone/speaker icon before badge |
| 5 | **Auto-scroll** | Text appears to marquee/scroll horizontally (CSS animation or JS) |
| 6 | **Background** | Distinct background color (yellow/warning tone in screenshot) making it visually prominent |
| 7 | **Full width** | Spans the entire main content area width |
| 8 | **Shared component** | Same banner appears on showcase page -- reusable component |

### 1.5 Post List Controls (10 observations)

| # | Element | Detail |
|---|---------|--------|
| 1 | **Search input** | `textbox` with placeholder "게시글 검색..." and search icon |
| 2 | **Sort button** | `button` "정렬" (sort) -- likely opens dropdown with sort options |
| 3 | **Filter button** | Unnamed `button` with filter icon (funnel) |
| 4 | **View toggle** | Two unnamed buttons with icons (list view / grid view toggle) |
| 5 | **Layout** | Search on left, sort + filter + view toggle on right, single row |
| 6 | **No "글쓰기" (Write) button visible** | Post creation may require login, or is elsewhere |
| 7 | **Search is local** | Separate from global nav search -- scoped to community posts |
| 8 | **Default sort** | Not explicitly shown, but likely "최신순" (newest) given post ordering |
| 9 | **Grid view** | Screenshot shows list view is default; grid toggle would rearrange cards |
| 10 | **Filter scope** | Filter button likely opens category/tag/date filter panel |

### 1.6 Post Card Types & Anatomy (25 observations)

#### 1.6.1 Image Post Card (e.g., "[공지] 월간 해커톤")

| # | Element | Detail |
|---|---------|--------|
| 1 | **Layout** | Horizontal: thumbnail image (left, ~120x90px) + content (right) |
| 2 | **Thumbnail** | `img "게시글 이미지"` -- square/rectangular preview image |
| 3 | **Title** | `h3` element, single line, truncated if long |
| 4 | **Author row** | Avatar image (linked to `/profile/{uuid}`) + author name + dot separator + relative time |
| 5 | **Author link** | `link "DACONIO"` -> `/profile/7aeeb654-0621-4c68-80e0-1b1680ae6b03` |
| 6 | **Relative time** | "2일 전", "약 2개월 전", "약 12시간 전", "9일 전", etc. |
| 7 | **Tags** | Inline badges: `"#공지"`, `"#해커톤"` with overflow `"+7"` |
| 8 | **Tag overflow** | When tags exceed display space, shows `"+N"` count badge |
| 9 | **Content preview** | Single-line truncated text preview of post body |
| 10 | **Stats row** | Three icon+count pairs: likes, comments, views + share button |
| 11 | **Like icon** | Heart icon + count (e.g., "1") |
| 12 | **Comment icon** | Chat bubble icon + count (e.g., "0") |
| 13 | **View icon** | Eye icon + count (e.g., "529") |
| 14 | **Share button** | Unnamed button with share icon (rightmost in stats row) |
| 15 | **Clickable card** | Entire card has `[cursor=pointer]` -- navigates to post detail |

#### 1.6.2 Video Post Card (e.g., "데이커 플랫폼 소개 영상")

| # | Element | Detail |
|---|---------|--------|
| 16 | **Thumbnail** | Video thumbnail image with overlay badge |
| 17 | **Video badge** | Overlay `<div>` with camera icon + text "동영상" on the thumbnail |
| 18 | **Badge position** | Bottom-right of thumbnail image |
| 19 | **Rest of card** | Same structure as image post (title, author, tags, stats) |

#### 1.6.3 PDF Post Card (e.g., "일론 머스트 투두리스트 엿보기")

| # | Element | Detail |
|---|---------|--------|
| 20 | **Thumbnail** | PDF document preview image (rendered first page) with filename as alt text (e.g., `"Beyond_To-Do_Lists.pdf"`) |
| 21 | **PDF badge** | Overlay `<div>` with document icon + text "PDF" |
| 22 | **Badge style** | Same position/style as video badge but different icon |

#### 1.6.4 Link Post Card (e.g., "교육 MVP")

| # | Element | Detail |
|---|---------|--------|
| 23 | **Thumbnail** | OG image/link preview image |
| 24 | **Domain text** | Shows domain name below thumbnail: `daschool-aistudiio-425v.vercel.app` |
| 25 | **Link badge** | Overlay with link icon + text "링크" |

#### 1.6.5 Text-Only Post Card (e.g., "[공지] 리더보드 페이지 로딩 오류")

| # | Element | Detail |
|---|---------|--------|
| 26 | **No thumbnail** | Card starts directly with title (h3) |
| 27 | **Extended preview** | Longer content preview text since no image takes space |
| 28 | **Same metadata** | Author, time, tags, stats all present |

### 1.7 Post Metadata Patterns (8 observations)

| # | Element | Detail |
|---|---------|--------|
| 1 | **Avatar size** | Small circular avatar (~24px) linked to profile |
| 2 | **Profile URL patterns** | `/profile/{uuid}` (e.g., DACONIO) or `/adventurer/{username}` (e.g., 이대권 -> `/adventurer/daconer`) |
| 3 | **Two URL patterns** | System/official accounts use UUID-based `/profile/` URLs; user accounts use username-based `/adventurer/` URLs |
| 4 | **Time format** | Korean relative time: "약 12시간 전", "2일 전", "9일 전", "16일 전", "27일 전", "약 1개월 전", "약 2개월 전" |
| 5 | **Tag format** | `#tag` with hash prefix, displayed as inline badges |
| 6 | **Double-hash tags** | Some tags use `##` (e.g., `"##고등학생"`, `"##매뉴얼"`) -- possibly a different tag type or formatting artifact |
| 7 | **Tag colors** | Tags appear as muted/outline badges, not color-coded by category |
| 8 | **Dot separator** | Unicode bullet `•` between author name and relative time |

### 1.8 Pagination (6 observations)

| # | Element | Detail |
|---|---------|--------|
| 1 | **Page buttons** | Numbered buttons 1 through 5 |
| 2 | **Previous button** | Arrow icon button, `[disabled]` on first page |
| 3 | **Next button** | Arrow icon button, active |
| 4 | **Count display** | Text "104개 중 1-20" (1-20 of 104) |
| 5 | **Page size** | 20 posts per page (confirmed: 20 posts visible in snapshot) |
| 6 | **Max visible pages** | 5 page buttons shown at once (would need ellipsis for >5 pages) |

### 1.9 Footer (6 observations)

| # | Element | Detail |
|---|---------|--------|
| 1 | **Company logo** | DACON logo image |
| 2 | **Footer links** | 이용약관, 대회주최문의, 서비스소개, 교육문의, 채용 |
| 3 | **Heading** | "AI 해커톤 플랫폼" |
| 4 | **Social links** | 카카오톡, 인스타그램, 유튜브, 블로그 (with icons) |
| 5 | **Legal text** | Company name, representative, business registration, address, email, phone |
| 6 | **Copyright** | "Copyright DACON Inc. All rights reserved" |

---

## Part 2: Showcase Page Analysis

### 2.1 Overall Page Layout (4 observations)

| # | Element | Detail |
|---|---------|--------|
| 1 | **Two-column layout** | Same sidebar + main pattern as community page |
| 2 | **Sidebar is simpler** | Fewer widgets than community sidebar |
| 3 | **Main content** | Card grid layout (not list) for project cards |
| 4 | **Sparse content** | Only 1 project exists -- page is mostly empty |

### 2.2 Showcase Sidebar (8 observations)

| # | Element | Detail |
|---|---------|--------|
| 1 | **Section heading** | `h3` "쇼케이스 메뉴" (Showcase Menu) |
| 2 | **Categories** | `전체(1)`, `해커톤(0)`, `레이드(0)`, `개인(1)` -- 4 categories |
| 3 | **Active state** | `전체` button highlighted (blue background) |
| 4 | **Count badges** | Same pill/badge pattern as community sidebar |
| 5 | **Registration section** | Separate card below categories with lightbulb icon |
| 6 | **Registration heading** | `h4` "프로젝트 등록" |
| 7 | **CTA button** | `link` "새 프로젝트 등록하기" -> `/public/showcase/new` with arrow icon |
| 8 | **Button style** | Full-width button with text + right arrow, distinct from navigation buttons |

### 2.3 Showcase Announcement Banner (3 observations)

| # | Element | Detail |
|---|---------|--------|
| 1 | **Same component** | Identical dual-track marquee banner as community page |
| 2 | **Same content** | Same "긴급 공지" message |
| 3 | **Badge variants visible** | Screenshot clearly shows both `공지` (blue) and `긴급 공지` (red) badges on right side |

### 2.4 Search & Sort Controls (4 observations)

| # | Element | Detail |
|---|---------|--------|
| 1 | **Tag search** | `textbox` "태그로 검색..." with search icon -- searches by tags, not full-text |
| 2 | **Sort dropdown** | `combobox` showing "인기순" (by popularity) with dropdown arrow |
| 3 | **No view toggle** | Unlike community, no list/grid toggle (grid is the only view) |
| 4 | **No filter button** | Simpler controls than community page |

### 2.5 Project Card Anatomy (12 observations)

| # | Element | Detail |
|---|---------|--------|
| 1 | **Card is a link** | Entire card wraps in `<a>` to `/public/showcase/{slug}` (e.g., `/public/showcase/with-goolge-ai-studio-0504b0b0`) |
| 2 | **Large thumbnail** | Prominent image at top (~100% card width, ~200px height) |
| 3 | **Category badge** | Overlay badge on thumbnail: "개인" (positioned top-left or bottom-left of image area) |
| 4 | **Project title** | `h3` below image: "데이콘 리더보드 with Goolge AI Studio" |
| 5 | **Description** | `<p>` paragraph below title, same text as title in this case |
| 6 | **Author section** | Avatar image + name in bottom-left: `img "국진"` + text "국진" |
| 7 | **Stats** | Right-aligned in footer: heart "1", comment "0", eye "19" |
| 8 | **Card proportions** | Vertical card layout (image on top, content below) -- different from community's horizontal list cards |
| 9 | **Grid layout** | Cards appear in a responsive grid (1-3 columns based on viewport) |
| 10 | **No tags visible** | Unlike community posts, project cards don't show tags on the card surface |
| 11 | **No relative time** | No timestamp visible on showcase cards |
| 12 | **Slug format** | URL slug includes title + random hash suffix: `with-goolge-ai-studio-0504b0b0` |

### 2.6 Project Creation Flow (implied) (5 observations)

| # | Element | Detail |
|---|---------|--------|
| 1 | **Entry point** | "새 프로젝트 등록하기" button in sidebar -> `/public/showcase/new` |
| 2 | **Required: category** | Must select from: 해커톤, 레이드, 개인 (based on sidebar categories) |
| 3 | **Required: thumbnail** | All cards show thumbnails -- likely required field |
| 4 | **Required: title** | Visible on all cards |
| 5 | **Optional: description** | Shown as paragraph; could be same as title if left empty |

---

## Part 3: Gap Analysis vs Current Codebase

### 3.1 What Currently Exists

| Feature | Status | Location |
|---------|--------|----------|
| Header/Nav | Partial | `header.tsx` -- has hackathons, camp, rankings; MISSING community, showcase, basecamp, search |
| Footer | Minimal | `footer.tsx` -- only logo + copyright; MISSING links, social, legal info |
| Community page | **NONE** | No `/community` route exists |
| Showcase page | **NONE** | No `/showcase` route exists |
| Sidebar component | **NONE** | No reusable sidebar layout |
| Post types | **NONE** | No post/article data model or components |
| Announcement banner | **NONE** | No marquee banner component (though `marquee.tsx` UI primitive exists) |
| User profiles | **NONE** | No user/profile data model |
| Pagination | **NONE** | No pagination component |
| View toggle | **NONE** | No list/grid toggle component |
| Search (scoped) | **NONE** | No page-level search |
| Sort controls | **NONE** | No sort dropdown |

### 3.2 What Can Be Reused

| Existing Component | Reuse For |
|--------------------|-----------|
| `badge.tsx` | Category counts, tag badges, post type badges (PDF/Video/Link), announcement badges |
| `card.tsx` | Post cards, project cards |
| `tabs.tsx` | Trending section (일간/주간/월간 tabs) |
| `input.tsx` | Search inputs |
| `avatar.tsx` | Author avatars |
| `button.tsx` | Category buttons, sort/filter buttons, view toggles |
| `marquee.tsx` | Announcement banner scrolling text |
| `select.tsx` | Sort dropdown on showcase |
| `separator.tsx` | Dividers between sidebar sections |
| `scroll-area.tsx` | Sidebar scroll if content overflows |
| `tooltip.tsx` | Icon button tooltips |
| `sheet.tsx` | Mobile sidebar drawer |

### 3.3 New Components Required

#### Layout Components
1. **`SidebarLayout`** -- Two-column layout wrapper (sidebar + main)
2. **`CommunitySidebar`** -- Community-specific sidebar with all widgets
3. **`ShowcaseSidebar`** -- Showcase-specific sidebar with categories + registration CTA
4. **`AnnouncementBanner`** -- Dual-track marquee with badge + scrolling text

#### Community Components
5. **`CategoryMenu`** -- Vertical button list with count badges
6. **`PinnedPosts`** -- Pin icon + truncated link list
7. **`TrendingSection`** -- Collapsible accordion with daily/weekly/monthly tabs
8. **`PostTopSection`** -- Collapsible accordion for top posts
9. **`UserRankingSection`** -- Collapsible accordion for user rankings
10. **`FeedbackButton`** -- Sidebar CTA button
11. **`PostCard`** -- Polymorphic card (image/video/PDF/link/text variants)
12. **`PostCardImage`** -- Image variant with thumbnail
13. **`PostCardMedia`** -- Video/PDF variant with badge overlay
14. **`PostCardLink`** -- Link variant with domain text + badge
15. **`PostCardText`** -- Text-only variant (no thumbnail)
16. **`PostMeta`** -- Author avatar + name + time row
17. **`PostTags`** -- Tag badges with overflow "+N"
18. **`PostStats`** -- Like/comment/view counts + share button
19. **`PostListControls`** -- Search + sort + filter + view toggle row
20. **`Pagination`** -- Page numbers + prev/next + count display
21. **`ViewToggle`** -- List/grid view switcher

#### Showcase Components
22. **`ProjectCard`** -- Vertical card with large thumbnail + badge + title + description + author + stats
23. **`ProjectGrid`** -- Responsive grid for project cards
24. **`TagSearch`** -- Tag-specific search input
25. **`SortDropdown`** -- Combobox for sort options
26. **`RegisterProjectCTA`** -- Sidebar card with icon + heading + CTA button

---

## Part 4: Data Model Requirements

### 4.1 Community Post Model

```typescript
interface CommunityPost {
  readonly id: string
  readonly slug: string
  readonly category: 'home' | 'chat' | 'competition' | 'vibe-coding' | 'etc' | 'learning'
  readonly title: string
  readonly content: string           // full post body (markdown/HTML)
  readonly contentPreview: string    // truncated preview text
  readonly author: PostAuthor
  readonly tags: readonly string[]
  readonly mediaType: 'image' | 'video' | 'pdf' | 'link' | 'text'
  readonly media?: PostMedia
  readonly isPinned: boolean
  readonly likeCount: number
  readonly commentCount: number
  readonly viewCount: number
  readonly createdAt: string         // ISO 8601
  readonly updatedAt: string
}

interface PostAuthor {
  readonly id: string
  readonly name: string
  readonly avatarUrl: string
  readonly profileUrl: string        // /profile/{uuid} or /adventurer/{username}
}

interface PostMedia {
  readonly thumbnailUrl: string
  readonly originalUrl?: string      // video URL, PDF URL, or link URL
  readonly fileName?: string         // for PDF: "Beyond_To-Do_Lists.pdf"
  readonly domain?: string           // for link: "daschool-aistudiio-425v.vercel.app"
}
```

### 4.2 Showcase Project Model

```typescript
interface ShowcaseProject {
  readonly id: string
  readonly slug: string
  readonly category: 'hackathon' | 'raid' | 'personal'
  readonly title: string
  readonly description: string
  readonly thumbnailUrl: string
  readonly author: PostAuthor
  readonly tags: readonly string[]
  readonly likeCount: number
  readonly commentCount: number
  readonly viewCount: number
  readonly createdAt: string
}
```

### 4.3 Community Category Model

```typescript
interface CommunityCategory {
  readonly key: string
  readonly label: string
  readonly count: number
}
```

### 4.4 Trending/Ranking Models

```typescript
interface TrendingPost {
  readonly id: string
  readonly title: string
  readonly viewCount: number
  readonly period: 'daily' | 'weekly' | 'monthly'
}

interface UserRanking {
  readonly userId: string
  readonly name: string
  readonly avatarUrl: string
  readonly score: number
  readonly rank: number
}
```

---

## Part 5: Implementation Recommendations

### 5.1 For Community Page

**Component Hierarchy:**
```
/community (page.tsx)
  SidebarLayout
    CommunitySidebar
      CategoryMenu
      PinnedPosts
      TrendingSection (accordion)
        Tabs (일간/주간/월간)
      PostTopSection (accordion)
      UserRankingSection (accordion)
      FeedbackButton
    MainContent
      AnnouncementBanner
      PostListControls
        SearchInput
        SortButton
        FilterButton
        ViewToggle
      PostList
        PostCard (x20, polymorphic)
          PostMeta
          PostTags
          PostStats
      Pagination
```

**Data Flow:**
- All data from localStorage (matching existing pattern in `storage.ts`)
- New storage keys: `communityPosts`, `communityCategories`
- Seed data in `seed.ts` for demo purposes

### 5.2 For Showcase Page

**Component Hierarchy:**
```
/showcase (page.tsx)
  SidebarLayout
    ShowcaseSidebar
      CategoryMenu (reuse)
      RegisterProjectCTA
    MainContent
      AnnouncementBanner (reuse)
      TagSearch + SortDropdown
      ProjectGrid
        ProjectCard (xN)
```

**Relationship to Hackathon Submissions:**
- Showcase projects are SEPARATE from hackathon submissions
- A hackathon submission could be "promoted" to a showcase project, but they are distinct entities
- Showcase has its own categories (해커톤, 레이드, 개인) -- not the same as community categories

### 5.3 Minimum Viable Community (for hackathon scope)

**ESSENTIAL (must have):**
1. Two-column sidebar layout (reusable)
2. Category menu with counts
3. Basic post cards (image + text variants minimum)
4. Post metadata (author, time, tags)
5. Post stats (like, comment, view counts -- read-only display)
6. Pagination
7. Search input (client-side filtering)
8. Seed data with 10-15 realistic posts

**NICE-TO-HAVE:**
9. Pinned posts section
10. Announcement banner
11. Sort + filter controls
12. View toggle (list/grid)
13. Video/PDF/Link card variants
14. Tag overflow (+N)

**CAN SKIP:**
15. Trending section with tabs (complex, needs real-time data)
16. Post TOP accordion
17. User ranking accordion
18. Feedback button
19. Post creation/editing
20. Comment system
21. Like/share interactivity

### 5.4 Minimum Viable Showcase (for hackathon scope)

**ESSENTIAL (must have):**
1. Showcase sidebar with categories + registration CTA
2. Project card with thumbnail + title + description + author + stats
3. Responsive grid layout
4. Seed data with 3-5 sample projects
5. Tag search (client-side)
6. Sort dropdown

**NICE-TO-HAVE:**
7. Project detail page (`/showcase/[slug]`)
8. Project creation form (`/showcase/new`)

**CAN SKIP:**
9. Actual project submission flow
10. File upload (thumbnail, PDF)
11. Link preview generation

---

## Part 6: Priority Assessment & Time Estimates

### Tier 1: ESSENTIAL (12-16 hours)

| Task | Est. Hours | Justification |
|------|-----------|---------------|
| `SidebarLayout` component | 1.5 | Foundation for both pages; responsive breakpoints |
| `CategoryMenu` component | 1.0 | Shared between community + showcase sidebar |
| `PostCard` (image + text) | 2.0 | Core community content display |
| `PostMeta` + `PostTags` + `PostStats` | 1.5 | Shared sub-components for post cards |
| `ProjectCard` + `ProjectGrid` | 1.5 | Core showcase content display |
| `Pagination` component | 1.5 | Essential for community (104 posts = 6 pages) |
| Community page + sidebar | 2.0 | Route, layout, data wiring |
| Showcase page + sidebar | 1.5 | Route, layout, data wiring |
| Data models + storage functions | 1.0 | Types, localStorage CRUD, seed data |
| Seed data (posts + projects) | 1.5 | 15 community posts + 5 showcase projects |
| Nav updates (add community + showcase) | 0.5 | Header component changes |
| i18n keys | 0.5 | New dictionary entries for both pages |
| **Total** | **16.0** | |

### Tier 2: NICE-TO-HAVE (8-10 hours)

| Task | Est. Hours |
|------|-----------|
| `AnnouncementBanner` (dual marquee) | 1.5 |
| `PinnedPosts` sidebar section | 0.5 |
| Video/PDF/Link card variants | 2.0 |
| Sort + filter controls | 1.5 |
| View toggle (list/grid) | 1.5 |
| Tag overflow (+N) | 0.5 |
| Showcase detail page | 2.0 |
| **Total** | **9.5** |

### Tier 3: CAN SKIP (15+ hours)

| Task | Est. Hours |
|------|-----------|
| Trending section with tabs | 3.0 |
| Post TOP / User ranking accordions | 2.0 |
| Post creation/editing | 5.0 |
| Comment system | 4.0 |
| Like/share interactivity | 2.0 |
| Project creation form | 3.0 |
| Feedback button + modal | 1.0 |
| **Total** | **20.0** |

---

## Part 7: Edge Cases & Technical Considerations

### 7.1 Pagination Edge Cases
- Page count changes when category filter is applied (104 -> 10 for "잡담")
- URL should reflect current page + category for shareable links (`/community?category=chat&page=2`)
- Empty page state when navigating beyond available pages
- Count display must update: "10개 중 1-10" not "104개 중 1-20"

### 7.2 Post Card Rendering
- Long titles need `line-clamp-2` truncation
- Content preview needs consistent character limit (~100 chars)
- Missing thumbnails need fallback (gradient placeholder like existing `HackathonCard`)
- Image loading should use `next/image` with blur placeholder

### 7.3 Responsive Design
- Sidebar should collapse to drawer/sheet on mobile (reuse existing `Sheet` component)
- Post cards should stack vertically on mobile
- Project grid: 1 col mobile, 2 col tablet, 3 col desktop
- Announcement banner: single track on mobile, dual on desktop

### 7.4 Data Volume
- 20 posts per page, 104 total in "홈" -- localStorage must handle this
- Client-side search/filter on 100+ items is acceptable performance
- Category counts need to be computed from post data, not stored separately

### 7.5 Relative Time Formatting
- Need a `formatRelativeTime()` utility
- Patterns observed: "약 12시간 전", "2일 전", "9일 전", "약 1개월 전", "약 2개월 전"
- "약" (approximately) prefix for larger intervals
- Must be locale-aware for i18n support

### 7.6 Profile URL Patterns
- Two patterns exist: `/profile/{uuid}` and `/adventurer/{username}`
- For hackathon scope, a single pattern is sufficient
- Profiles do not need to be functional -- just display author info

---

## Part 8: Analyst Observations & Warnings

### 8.1 Scope Creep Risk: HIGH

The community page alone has 6 sidebar widgets, 5 post card variants, search/sort/filter controls, pagination, and an announcement banner. Building all of this to DAKER's quality level would consume 30+ hours. The minimum viable version must be aggressively scoped.

### 8.2 The "Almost There" Trap

Community features have a tendency to expand: "we have posts, let's add comments" -> "we have comments, let's add likes" -> "we have likes, let's add notifications". Each layer is individually small but collectively massive. The implementation plan MUST draw a hard line at read-only display with seed data.

### 8.3 Reusability is Key

The `SidebarLayout`, `CategoryMenu`, `Pagination`, `PostStats`, and `AnnouncementBanner` components are shared between community and showcase. Building these as generic, reusable components will save significant time vs. building page-specific implementations.

### 8.4 Sidebar Collapse Pattern

DAKER's sidebar appears to be fixed (always visible). For mobile, our app should collapse it into a drawer -- this is a common pattern but adds complexity. The existing `Sheet` component can handle this.

### 8.5 Data Modeling Decision

The current app uses localStorage with `storage.ts`. Community posts and showcase projects should follow the same pattern. However, the community data model is significantly more complex than the existing hackathon model (media types, author profiles, tags, stats). This needs careful type design upfront.

---

## Appendix A: Complete Element Inventory from Snapshots

### Community Page Elements (counted from accessibility tree)

| Element Type | Count | Notes |
|-------------|-------|-------|
| Post cards | 20 | Full page of results |
| Image posts | 4 | Thumbnail + content layout |
| Video posts | 2 | With "동영상" badge |
| PDF posts | 7 | With "PDF" badge, showing filename |
| Link posts | 1 | With "링크" badge + domain |
| Text-only posts | 6 | No thumbnail, title + meta only |
| Author profiles | 4 unique | DACONIO (official), 도비콘, 이대권, 국진 |
| Unique tags | 12+ | #공지, #해커톤, #바이브코딩, #클로드코드, #GEMINI, #팔란티어, #DAKER, #매뉴얼, #안내, #고등학생, #입문, #Claude Code |
| Sidebar buttons | 6 categories + 3 accordions + 1 feedback = 10 |
| Pagination buttons | 7 (prev + 1-5 + next) |

### Showcase Page Elements (counted from accessibility tree)

| Element Type | Count | Notes |
|-------------|-------|-------|
| Project cards | 1 | Only one project exists |
| Sidebar categories | 4 | 전체, 해커톤, 레이드, 개인 |
| Sidebar CTA | 1 | "새 프로젝트 등록하기" |
| Sort options | 1 visible | "인기순" (popularity) |

### Appendix B: URL Patterns Observed

| Pattern | Example | Purpose |
|---------|---------|---------|
| `/community/{slug}` | `/community/monthly-hackathon-emergency-handover-documents` | Community post detail |
| `/profile/{uuid}` | `/profile/7aeeb654-0621-4c68-80e0-1b1680ae6b03` | Official/system user profile |
| `/adventurer/{username}` | `/adventurer/daconer` | Regular user profile |
| `/public/showcase/{slug}` | `/public/showcase/with-goolge-ai-studio-0504b0b0` | Showcase project detail |
| `/public/showcase/new` | -- | Project creation form |
| `/api/auth/dacon/login` | -- | OAuth login endpoint |

---

*Analysis complete. Total observations: 130+. Ready for handoff to planner for implementation scoping.*

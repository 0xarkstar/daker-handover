# Search, Filter, Sort & Pagination Analysis

Cross-referencing daker.ai's patterns across all pages against our current implementation.

---

## Part 1: Per-Page Search/Filter/Sort Analysis (daker.ai)

### 1. Global Search (Navigation Bar)

Present on EVERY page (home, basecamp, showcase, community, adventurers, hackathon detail).

| Attribute | Value |
|-----------|-------|
| Element | `textbox` |
| Placeholder | `"원정대, 해커톤, 사용자 검색..."` |
| Icon | Search icon (`img`) to the left of the input |
| Position | Right side of navbar, between nav buttons and login/theme buttons |
| Search scope | Teams (원정대), Hackathons (해커톤), Users (사용자) |
| Behavior | Unknown from snapshots -- likely redirects to a results page or shows an inline dropdown |

**Key observation:** The placeholder explicitly names 3 entity types. This is a cross-entity global search, not a page-scoped search.

---

### 2. Hackathon List (/public/hackathons)

**Note:** The snapshot for `/public/hackathons` returned a 404. The hackathon list may only be accessible through the nav dropdown "해커톤" button. Analysis is based on the home page CTA link pointing to `/public/hackathons` and cross-referencing with patterns from other list pages.

**Sidebar Filters (inferred from consistent layout across basecamp/showcase/community):**
- Likely follows the same sidebar pattern with status-based tabs
- Expected tabs: 전체(N), 모집중(N), 접수대기(N), 종료(N)
- Each tab shows a count badge

**Main Area Controls (inferred):**
- Search bar with placeholder (likely "해커톤 검색...")
- Filter icon buttons (consistent with basecamp/adventurers pattern)
- View toggle: list/grid (2 buttons, consistent across all list pages)

---

### 3. Basecamp (/public/basecamp)

#### Sidebar (complementary landmark)
| Control | Type | Details |
|---------|------|---------|
| 전체 117 | button | Shows all teams; count badge "117" |
| 해커톤 원정대 35 | button | Filters to hackathon teams; count "35" |
| 오픈 원정대 82 | button | Filters to open teams; count "82" |
| 모험가 찾기 8 | link | Navigates to `/public/adventurers`; count "8"; has distinct icon |
| 피드백 보내기 | button | Fixed at sidebar bottom; icon only |

**Sidebar behavior:** Buttons are mutually exclusive filter tabs. "모험가 찾기" is a navigation link (not a filter) -- it leaves the page.

#### Announcement Banner
- 2 scrolling notice banners at top of main content area
- Badge icon + "공지" label + announcement text

#### Main Area Controls
| Control | Element | Details |
|---------|---------|---------|
| Search | `textbox` | Placeholder: `"원정대 검색..."` with search icon |
| Filter button 1 | `button` (icon-only) | Unknown filter (likely sort/filter type) |
| Filter button 2 | `button` (icon-only) | Unknown filter |
| Filter button 3 | `button` (icon-only) | Unknown filter |
| View toggle | 2 `button`s (icon-only) | List view / Grid view |
| 원정대그룹 가기 | `button` | Action: navigate to team groups; has icon |
| 원정대 만들기 | `button` | Action: create new team; has icon |

**Layout:** Search bar on left, 3 icon filter buttons in middle, view toggle on right. Action buttons below in a separate row.

#### Card Content (per team)
- Hackathon name badge with link
- Bookmark button
- Status badge ("모집중")
- Privacy badge ("비공개 원정대")
- Team name (heading)
- Member count ("1/1명"), deadline ("기간 없음"), view count ("4")
- Invite requirement badge ("초대 필요")

---

### 4. Adventurers (/public/adventurers)

**Shares the Basecamp sidebar** -- same navigation tabs (전체 117, 해커톤 원정대 35, 오픈 원정대 82, 모험가 찾기 8).

#### Main Area Header
- Icon + heading "모험가 찾기"
- Subtitle: "팀에 합류할 모험가를 찾아보세요. 총 8명의 모험가가 활동 중입니다."

#### Main Area Controls
| Control | Element | Details |
|---------|---------|---------|
| Search | `textbox` | Placeholder: `"모험가 검색..."` with search icon |
| Filter button 1 | `button` (icon-only) | 3 icon buttons in a group |
| Filter button 2 | `button` (icon-only) | |
| Filter button 3 | `button` (icon-only) | |
| View toggle | 2 `button`s (icon-only) | List view / Grid view |

**Identical control layout to Basecamp** -- same 3 icon filter buttons + view toggle pattern. No action buttons (no "create" equivalent).

#### Adventurer Card Content
- Bookmark button, username link, "원정대 찾기" action button
- Avatar with tier badge (Silver, Bronze)
- Role tags (Backend Developer, ML Engineer, etc.)
- Skill tags (Computer Vision, NLP, VS Code, etc.) with "+N" overflow
- Stat badges (학습 5, 케미 5, 직무 5)
- Bio paragraph

**No pagination visible** -- only 8 adventurers shown.

---

### 5. Showcase (/public/showcase)

#### Sidebar
| Control | Type | Details |
|---------|------|---------|
| 전체 1 | button | Count "1" |
| 해커톤 0 | button | Count "0" |
| 레이드 0 | button | Count "0" |
| 개인 1 | button | Count "1" |

Additional sidebar widget:
- "프로젝트 등록" section with icon
- "새 프로젝트 등록하기" link button -> `/public/showcase/new`

#### Announcement Banner
- Same 2-banner pattern as basecamp/community

#### Main Area Controls
| Control | Element | Details |
|---------|---------|---------|
| Search | `textbox` | Placeholder: `"태그로 검색..."` -- NOTE: tag-based search, not name search |
| Sort | `combobox` (dropdown) | Default value: `"인기순"` with chevron icon |

**No view toggle** on showcase. **No icon filter buttons.** Much simpler control bar than basecamp.

**Layout:** Search input on left, sort dropdown on right, same row.

#### Showcase Card Content
- Cover image with category badge ("개인")
- Title, description
- Author avatar + name
- Stats: likes count, comments count, views count (3 icon+number pairs)

**No pagination visible** -- only 1 item.

---

### 6. Community (/community)

#### Sidebar
**Category Navigation:**
| Control | Type | Count |
|---------|------|-------|
| 홈 | button | 104 |
| 잡담 | button | 10 |
| 대회 | button | 22 |
| 바이브코딩 | button | 7 |
| 기타 | button | 6 |
| 학습 | button | 37 |

**Pinned Posts (고정 게시글):**
- Icon + heading with pin icon
- 2 pinned post links

**Sidebar Widgets (collapsible):**
| Widget | State | Sub-tabs |
|--------|-------|----------|
| 최근 인기 | expanded | 일간 (selected), 주간, 월간 |
| 게시글 TOP | collapsed | N/A |
| 유저 랭킹 | collapsed | N/A |

#### Announcement Banner
- Same 2-banner pattern

#### Main Area Controls
| Control | Element | Details |
|---------|---------|---------|
| Search | `textbox` | Placeholder: `"게시글 검색..."` with search icon (icon is AFTER text, not before) |
| Sort | `button` | Label: `"정렬"` -- opens a dropdown/popover |
| Filter | `button` (icon-only) | Additional filter beyond sidebar categories |
| View toggle | 2 `button`s (icon-only) | List view / Grid view |

**Layout:** Search input on left, then sort button, filter icon button, then view toggle on right.

#### Post Card Content
- Optional thumbnail/attachment preview (image, PDF, video with type badge)
- Title, author avatar+name, relative timestamp
- Tag badges ("#공지", "#해커톤", "+7")
- Excerpt text
- Stats: likes, comments, views (3 icon+number pairs)
- Bookmark button

#### Pagination (CRITICAL -- only page with visible pagination)
| Element | Details |
|---------|---------|
| Prev button | `button [disabled]` -- disabled on first page; has icon (arrow) |
| Page numbers | Buttons: 1, 2, 3, 4, 5 |
| Next button | `button` with icon (arrow) |
| Item count | `"104개 중 1-20"` |
| Items per page | 20 |
| Max visible pages | 5 |

---

### 7. Hackathon Detail (/public/hackathons/[slug])

#### Sidebar Navigation (collapsible sections)
| Section | Type | Sub-items |
|---------|------|-----------|
| 대회안내 | button (expandable) | 개요, 평가, 규칙, 일정, 상금, 데이터, 동의사항 |
| 제출 | button | Single item |
| 리더보드 | button | Count badge "138" |
| 갤러리 | button (expandable) | Shows count "4"; sub-items: 기획서 제출(4), 최종 웹링크 제출, 최종 솔루션 PPT 제출 -- each with deadline |
| 게시판 | button (expandable) | Sub-tabs: 전체, 공지, 업데이트, FAQ, 일반 |

#### Timer/Countdown Widget (sidebar)
- Current time display: "05:23:02 2026.03.12 (목)"
- Countdown: days/hours/minutes/seconds with flip animation
- Deadline stages with dates
- Progress indicator: "3 1/10"

#### Leaderboard
- Count shown in sidebar: "138"
- No visible sort/search controls in snapshot (content area shows overview, not leaderboard tab)

#### Forum (게시판)
| Control | Type |
|---------|------|
| 전체 | button tab |
| 공지 | button tab |
| 업데이트 | button tab |
| FAQ | button tab |
| 일반 | button tab |

**No search/sort controls visible for the forum** -- category tabs only.

#### Team List (sidebar widget)
- "모집 중 (7)" with expand/collapse
- Shows team cards: avatar, name, member count (e.g., "4/5")
- "+2개 더..." overflow link

---

## Part 2: Cross-Cutting Pattern Analysis

### Pattern 1: Sidebar Filter Tabs with Counts
**Used on:** Basecamp, Showcase, Community, Hackathon Detail (sidebar nav)

| Aspect | Consistent Pattern |
|--------|--------------------|
| Structure | `button` containing label `generic` + count `generic` |
| Count format | Number in quotes (string), e.g., "117", "35" |
| Mutual exclusion | One active tab at a time |
| Active styling | Not determinable from accessibility tree (likely bg color change) |
| Count updates | Counts appear static (server-rendered totals), not dynamic on filter |

### Pattern 2: Search Bar
**Used on:** Global nav, Basecamp, Adventurers, Showcase, Community

| Aspect | Details |
|--------|---------|
| Element | `textbox` with placeholder text |
| Icon | Search icon (img) -- position varies (before or after input) |
| Placeholder convention | `"[entity] 검색..."` format |
| Scope varies by page | 원정대 검색, 모험가 검색, 태그로 검색, 게시글 검색 |

**Unique:** Showcase uses "태그로 검색..." (tag-scoped search).

### Pattern 3: Icon Filter Buttons (3-button group)
**Used on:** Basecamp, Adventurers

- 3 `button` elements, each containing only an `img` icon
- No visible labels -- icons convey meaning
- Purpose cannot be determined from accessibility tree alone (likely: filter by status, sort by, or filter by role)

### Pattern 4: View Toggle (List/Grid)
**Used on:** Basecamp, Adventurers, Community

| Aspect | Details |
|--------|---------|
| Structure | 2 `button` elements in a `generic` container |
| Content | Each button contains only an `img` icon |
| Behavior | Toggle between list view and grid view |
| Default | Cannot determine from snapshot |

**NOT used on:** Showcase (single layout), Hackathon Detail

### Pattern 5: Sort Controls
**Three distinct patterns observed:**

| Page | Sort Control | Type |
|------|-------------|------|
| Showcase | `combobox` "인기순" | Dropdown select with chevron |
| Community | `button` "정렬" | Button that opens popover/dropdown |
| Other pages | None visible | N/A |

### Pattern 6: Announcement Banner
**Used on:** Basecamp, Showcase, Community (all list pages with sidebar)

- 2 scrolling/rotating banners
- Each: icon + "공지" badge + announcement text
- Positioned above search/filter controls

### Pattern 7: Pagination
**Only observed on:** Community

| Aspect | Value |
|--------|-------|
| Style | Page number buttons + prev/next arrows |
| Max visible pages | 5 |
| Items per page | 20 |
| Count display | "104개 중 1-20" format |
| Prev disabled | On first page |

**Not observed on:** Basecamp (117 items -- possibly loads all or infinite scroll), Adventurers (8 items), Showcase (1 item)

### Pattern 8: Action Buttons
**Used on:** Basecamp, Showcase

| Page | Buttons |
|------|---------|
| Basecamp | "원정대그룹 가기" (navigate), "원정대 만들기" (create) |
| Showcase | "새 프로젝트 등록하기" (create, in sidebar) |

### Pattern 9: Collapsible Sidebar Widgets
**Used on:** Community, Hackathon Detail

| Widget | Behavior |
|--------|----------|
| 최근 인기 | Expanded by default, has sub-tabs (일간/주간/월간) |
| 게시글 TOP | Collapsed by default |
| 유저 랭킹 | Collapsed by default |

### Pattern 10: Category/Status Tabs in Content Area
**Used on:** Hackathon Detail (forum: 전체/공지/업데이트/FAQ/일반)

- Different from sidebar tabs -- these are within the content area
- No count badges (unlike sidebar filter tabs)

---

## Part 3: Our Implementation Gap Analysis

### Current State Summary

| Page | Search | Sidebar Filters | Status Filters | Sort | View Toggle | Pagination | Action Buttons |
|------|--------|----------------|----------------|------|-------------|------------|----------------|
| `/hackathons` | Text input (max-w-sm) | None | 4 buttons (all/ongoing/upcoming/ended) | None | None | None | None |
| `/camp` | None | None | Hackathon filter buttons | None | None | None | Create team button |
| `/rankings` | None | None | Hackathon filter buttons | None | None | None | None |

### Daker.ai Target State

| Page | Search | Sidebar Filters | Main Filters | Sort | View Toggle | Pagination | Action Buttons |
|------|--------|----------------|--------------|------|-------------|------------|----------------|
| Hackathon list | Yes | Status tabs w/ counts | Icon filters | Unknown | List/Grid | Likely yes | None |
| Basecamp | Yes ("원정대 검색...") | Type tabs w/ counts (3) | 3 icon buttons | Unknown | List/Grid | Likely (117 items) | 2 buttons |
| Adventurers | Yes ("모험가 검색...") | Shared w/ basecamp | 3 icon buttons | Unknown | List/Grid | Unlikely (8 items) | None |
| Showcase | Yes ("태그로 검색...") | Category tabs w/ counts (4) | None | Combobox ("인기순") | None | Yes (if >20) | Create in sidebar |
| Community | Yes ("게시글 검색...") | Category tabs w/ counts (6) | 1 icon button | Button ("정렬") | List/Grid | Yes (page numbers) | None |

### Gap Detail: Missing Features (Prioritized)

#### CRITICAL (Must have for hackathon submission)

**Gap 1: No Sidebar Layout**
- What: None of our pages use the sidebar + main content layout that daker.ai uses consistently
- Where: All list pages (hackathons, camp, rankings)
- How: Create a shared `SidebarLayout` component with `complementary` landmark, filter tabs in sidebar, main content area
- Complexity: HIGH (layout restructure)
- Priority: P0 -- this is the most visible structural difference from daker.ai

**Gap 2: No Filter Tabs with Counts**
- What: Our filter buttons don't show item counts; daker.ai shows counts on every filter tab
- Where: Hackathons page (status filters), Camp page (hackathon filters)
- How: Compute counts per filter category and display as badge inside button
- Complexity: LOW
- Priority: P0 -- easy win, high visual fidelity

**Gap 3: No View Toggle (List/Grid)**
- What: No way to switch between list and grid views
- Where: Camp page, Hackathons page (at minimum)
- How: Create `ViewToggle` component with 2 icon buttons; store preference in state; render different card layouts
- Complexity: MEDIUM (need 2 card layouts per page)
- Priority: P1

**Gap 4: No Pagination**
- What: All items rendered at once; no page controls
- Where: Camp (117 teams on daker), Community (if built), Hackathons
- How: Create `Pagination` component with page buttons, prev/next, item count display
- Complexity: MEDIUM
- Priority: P1 -- critical if data grows beyond 20 items

**Gap 5: Camp Page Missing Search**
- What: Camp page has no search input; daker.ai has "원정대 검색..."
- Where: `/camp`
- How: Add text input with search icon, filter teams by name
- Complexity: LOW
- Priority: P1

**Gap 6: Rankings Page Missing Search**
- What: Rankings page has no search or filtering beyond hackathon buttons
- Where: `/rankings`
- How: Add search input to filter by team name
- Complexity: LOW
- Priority: P2

#### IMPORTANT (Should have)

**Gap 7: No Sort Controls**
- What: No sort options on any page
- Where: All list pages
- How: Create `SortControl` component -- combobox for showcase-style, button+popover for community-style
- Complexity: MEDIUM
- Priority: P2

**Gap 8: No Announcement Banner**
- What: No scrolling announcement banners
- Where: All list pages
- How: Create `AnnouncementBanner` component with rotating notices
- Complexity: LOW
- Priority: P2

**Gap 9: No Global Search**
- What: Navbar has no search input
- Where: Global navigation
- How: Add textbox to navbar with placeholder "원정대, 해커톤, 사용자 검색..."
- Complexity: MEDIUM (cross-entity search logic)
- Priority: P2

**Gap 10: No Icon Filter Buttons (3-button group)**
- What: Basecamp and Adventurers have 3 icon-only filter buttons whose function is unclear
- Where: Camp page
- How: Implement once their purpose is identified (see Open Questions)
- Complexity: LOW (UI) / UNKNOWN (logic)
- Priority: P3

#### NICE TO HAVE

**Gap 11: No Sidebar Widgets (collapsible)**
- What: Community sidebar has collapsible widgets (최근 인기, 게시글 TOP, 유저 랭킹)
- Where: Community page (not yet built)
- How: Collapsible accordion sections in sidebar
- Complexity: MEDIUM
- Priority: P3

**Gap 12: No Tag-Based Search**
- What: Showcase uses "태그로 검색..." -- different from name-based search
- Where: Showcase page (not yet built)
- How: Search that matches against tag arrays instead of title
- Complexity: LOW
- Priority: P3

---

## Part 4: Suggested Reusable Component Design

### Component 1: `<SidebarFilterTabs>`
```
Props:
  items: { label: string; count: number; value: string }[]
  activeValue: string
  onChange: (value: string) => void
  links?: { label: string; count: number; href: string; icon: ReactNode }[]

Renders:
  <nav> with buttons, each showing label + count badge
  Optional link items (like "모험가 찾기" on basecamp)
```
**Used by:** Hackathons, Camp, Showcase, Community

### Component 2: `<SearchBar>`
```
Props:
  placeholder: string
  value: string
  onChange: (value: string) => void
  className?: string

Renders:
  Search icon + textbox input
  Consistent styling across all pages
```
**Used by:** All list pages + global nav

### Component 3: `<ViewToggle>`
```
Props:
  view: 'list' | 'grid'
  onChange: (view: 'list' | 'grid') => void

Renders:
  2 icon buttons (list icon, grid icon)
  Active state styling on selected view
```
**Used by:** Camp, Hackathons, Community

### Component 4: `<SortControl>`
```
Props:
  options: { label: string; value: string }[]
  value: string
  onChange: (value: string) => void
  variant: 'combobox' | 'button'  // showcase vs community style

Renders:
  combobox: Select dropdown with chevron
  button: "정렬" button that opens popover with options
```
**Used by:** Showcase (combobox), Community (button)

### Component 5: `<Pagination>`
```
Props:
  currentPage: number
  totalItems: number
  itemsPerPage: number  // default 20
  maxVisiblePages: number  // default 5
  onChange: (page: number) => void

Renders:
  Prev arrow (disabled on first page)
  Page number buttons (max 5 visible)
  Next arrow (disabled on last page)
  Item count: "N개 중 X-Y"
```
**Used by:** Community, Camp (if >20 items), Hackathons

### Component 6: `<AnnouncementBanner>`
```
Props:
  announcements: { badge: string; text: string; icon?: ReactNode }[]

Renders:
  Scrolling/rotating banner with badge + text
  2 banners visible simultaneously
```
**Used by:** All sidebar-layout pages

### Component 7: `<SidebarLayout>`
```
Props:
  sidebar: ReactNode
  children: ReactNode

Renders:
  <div> with complementary landmark sidebar + main content area
  Responsive: sidebar collapses on mobile
```
**Used by:** All list pages

---

## Part 5: Implementation Recommendations (Prioritized)

### Phase 1: Core Layout (P0)
1. Build `SidebarLayout` component
2. Add count badges to existing filter buttons (easy, high impact)
3. Restructure hackathons page with sidebar

### Phase 2: Essential Controls (P1)
4. Build `SearchBar` component and add to Camp + Rankings
5. Build `ViewToggle` component with list/grid card variants
6. Build `Pagination` component

### Phase 3: Enhanced UX (P2)
7. Build `SortControl` component
8. Add global search to navbar
9. Build `AnnouncementBanner` component

### Phase 4: Polish (P3)
10. Icon filter buttons (once purpose is identified)
11. Collapsible sidebar widgets
12. Tag-based search for showcase

---

### Open Questions

- [ ] What do the 3 icon filter buttons on Basecamp/Adventurers actually filter? (status? role? online status?) -- Need to click them on daker.ai to observe behavior. This determines our filter implementation.
- [ ] Does the hackathon list page (/public/hackathons) actually exist on daker.ai? The snapshot returned 404. Is the hackathon browsing only through the nav dropdown? -- Affects whether we need a dedicated hackathon list with sidebar.
- [ ] What sort options are available on Community's "정렬" button? (최신순, 인기순, 댓글순?) -- Defines our SortControl option set.
- [ ] Does Basecamp use pagination or infinite scroll for 117 items? The snapshot shows items but no pagination controls. -- Determines whether we implement pagination or infinite scroll for camp.
- [ ] What happens when you type in the global search? Does it show an inline dropdown with results, or redirect to a search results page? -- Determines the global search UX architecture.
- [ ] For the Showcase sort combobox, what options besides "인기순" are available? (최신순, 조회순, 추천순?) -- Defines sort options.
- [ ] Should the view toggle preference persist across sessions (localStorage) or reset on each visit? -- Affects state management approach.
- [ ] What is the default view (list or grid) for each page on daker.ai? -- Determines our default rendering mode.

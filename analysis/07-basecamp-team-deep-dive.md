# 07. Basecamp / Team System Deep-Dive Analysis

> Ultra-deep analyst review of daker.ai's basecamp (베이스캠프) and adventurer (모험가) system.
> Source: Playwright accessibility snapshots + full-page screenshots + our current `/camp` implementation.

---

## 1. Basecamp Page Layout (12 observations)

### 1.1 Overall Page Structure
The page uses a **two-column layout**: a persistent left sidebar (complementary landmark) and a scrollable main content area.

| # | Observation | Detail |
|---|-------------|--------|
| 1 | **Left sidebar heading** | h3 "베이스캠프" with subtitle paragraph: "다양한 원정대를 탐색하고 팀에 합류하세요." |
| 2 | **Sidebar section heading** | h4 "원정대 탐색" groups the filter navigation |
| 3 | **Filter tabs with counts** | Four tabs in a `<nav>` element: 전체(117), 해커톤 원정대(35), 오픈 원정대(82), 모험가 찾기(8). Each tab shows label + count badge |
| 4 | **"모험가 찾기" is a link, not a button** | Unlike the other three filters (buttons), "모험가 찾기" is an `<a>` linking to `/public/adventurers` -- it navigates to a separate page. It also has a distinctive icon (img ref=e57) |
| 5 | **Feedback button** | "피드백 보내기" button with icon, positioned below the sidebar nav |
| 6 | **Announcement banner** | Scrolling/marquee-style announcement at the top of main content: "공지" badge + urgent text about team recruitment deadline. Appears duplicated (two generic containers with identical content), suggesting a horizontal scroll/marquee effect |
| 7 | **Search bar** | Text input with placeholder "원정대 검색..." and a search icon, positioned above the grid |
| 8 | **Three filter/sort icon buttons** | Three unnamed icon buttons (ref=e91, e93, e95) likely for filtering by status, sorting, or advanced filters |
| 9 | **View toggle** | Two icon buttons (ref=e98, e99) in a separate group -- likely grid/list view toggle |
| 10 | **Action buttons row** | Two prominent action buttons: "원정대그룹 가기" (Go to expedition group) and "원정대 만들기" (Create expedition), each with an icon prefix |
| 11 | **Pagination** | Bottom pagination with "이전"(disabled on page 1), page number buttons (1,2,3,4), "다음" button. Text: "전체 117개 팀 중 1~32번째 표시" -- 32 items per page |
| 12 | **Grid layout** | Cards arranged in a responsive grid; from the screenshot, appears to be 2 columns on the visible viewport width |

### 1.2 Sidebar Anatomy

```
Left Sidebar (complementary)
├── h3: "베이스캠프"
├── p: "다양한 원정대를 탐색하고 팀에 합류하세요."
├── h4: "원정대 탐색"
├── nav:
│   ├── button: "전체 117"
│   ├── button: "해커톤 원정대 35"
│   ├── button: "오픈 원정대 82"
│   └── link: "모험가 찾기 8" → /public/adventurers
└── button: "피드백 보내기"
```

---

## 2. Team Card Anatomy (28 observations)

### 2.1 Card Structure Overview

Two distinct card variants exist based on team status:

**Variant A: "모집중" (Recruiting) / Private cards** -- no creator info shown, shows "초대 필요" footer
**Variant B: "팀빌딩완료" (Team Building Complete) / "완료" (Complete) cards** -- shows creator avatar + tier + name, shows "자세히" button

### 2.2 Element-by-Element Breakdown

| # | Element | Location | Detail |
|---|---------|----------|--------|
| 1 | **Hackathon badge strip** | Top of card, full-width gradient bar | Contains hackathon icon (img) + hackathon title text (e.g., "월간 해커톤 : 긴급 인수인계 해커톤 - 문서만 남기고 사라졌다"). Uses a colored gradient background visible in screenshot (blue-to-red, purple, teal gradients vary by hackathon) |
| 2 | **Bookmark/save button** | Top-right corner, overlapping the hackathon badge | Icon button (img ref) -- likely a heart or bookmark icon for saving/favoriting the team |
| 3 | **Status badge** | Below hackathon badge, right-aligned | Text values observed: "모집중" (recruiting), "팀빌딩완료" (team building complete), "완료" (complete). Visually distinct badge styling per status |
| 4 | **Visibility label** | Left side, below hackathon badge | Icon (lock img) + "비공개 원정대" text. Present on most cards -- indicates private expedition |
| 5 | **Creator section (Variant B only)** | Below status, left side | Composite element: Avatar image (circular, named e.g. "쉬운하나") + Tier badge overlay (e.g., "Bronze tier", "Silver tier") + Creator icon + Creator name text |
| 6 | **Avatar image** | Within creator section | Named img (e.g., `img "EmperorChan"`, `img "트랩전사김고란"`) -- user's profile picture |
| 7 | **Tier badge** | Overlaid on avatar | Named img (e.g., `img "Bronze tier"`, `img "Silver tier"`) -- gamification tier indicator |
| 8 | **Creator name** | Next to avatar | Text with icon prefix (e.g., "쉬운하나", "EmperorChan", "rladhEKd", "태셔", "프미나화이팅") |
| 9 | **Team name (h3)** | Prominent heading below creator/visibility | Examples: "wow", "파댕이", "와다다", "team01", "수제쿠키", "MIO(Max It Out)", "개코파", "클로드 신봉자", "바이브코딩" |
| 10 | **Member count** | Stats row, first item | Icon (people img) + "X/Y명" format (e.g., "1/1명", "2/2명", "3/3명", "1/4명", "2/3명", "4/5명") -- current/max members |
| 11 | **Deadline display** | Stats row, second item | Icon (calendar img) + text. Most show "기간 없음" (no deadline). One shows "마감" (closed). One shows a date "03.11" |
| 12 | **View count** | Stats row, third item | Icon (eye img) + number in quotes (e.g., "4", "5", "9", "7", "14", "44", "26", "34") -- page view counter |
| 13 | **Access type indicator (Variant A)** | Card footer | Icon (lock img) + "초대 필요" (invitation required) text -- shown on recruiting/private cards |
| 14 | **"자세히" button (Variant B)** | Card footer, right-aligned | Plain text button "자세히" (View details) -- shown on completed team cards |
| 15 | **Date display (rare)** | Footer area, left of "자세히" | One card shows "03.11" as a date stamp, visible on the 팀빌딩완료 card for "우에알아 AI" |
| 16 | **Card clickability** | Entire card | All cards have `[cursor=pointer]` on the outer generic container -- entire card is clickable |
| 17 | **Card border/shadow** | Visual from screenshot | Light border with subtle shadow, rounded corners. White background in light theme |
| 18 | **Gradient colors on hackathon badge** | Varies per hackathon | From screenshot: red, blue, green, purple, teal gradient strips at card top. All cards in this view link to the same hackathon but use the same gradient scheme |
| 19 | **No description/intro text visible** | Card body | Unlike our implementation, the daker.ai team card does NOT show a team description/intro on the card surface -- only in detail view |
| 20 | **No "looking for" roles on card** | Card body | The card does not surface what roles the team is seeking -- this is detail-level information |
| 21 | **No contact link on card** | Card body | Contact information is not shown on the card -- privacy-first design, only accessible after interaction |
| 22 | **No edit/delete buttons on card** | Card body | Administrative actions are not visible on public-facing cards -- likely in a detail view or owner-only context |
| 23 | **Status color coding** | Badge area | "모집중" appears with one color, "팀빌딩완료" with another, "완료" with a third -- three-state lifecycle |
| 24 | **Compact card height** | Overall | Cards are vertically compact because they omit description, roles, and contact. Focus is on: hackathon link, status, creator, name, stats |
| 25 | **First card anomaly** | Card "wow" | The first card (ref=e106) shows "모집중" status with "비공개 원정대" label but NO creator section -- appears to be a different creator-hidden variant |
| 26 | **Stats row icon consistency** | Stats section | Each stat (members, deadline, views) uses the same pattern: icon + value. Icons are imgs, not SVG components |
| 27 | **Hackathon badge is a link target** | Top strip | The hackathon badge strip appears to be part of the clickable card, not a separate link to the hackathon page |
| 28 | **Card responsive sizing** | Grid | From the screenshot, cards fill approximately 50% width each in a 2-column grid, with consistent spacing |

### 2.3 Card Variant Matrix

| Status | Creator Shown | Footer | Visibility Label | Access |
|--------|--------------|--------|-----------------|--------|
| 모집중 (Recruiting) | No | "초대 필요" | "비공개 원정대" | Invitation required |
| 팀빌딩완료 (Team Built) | Yes (avatar + tier + name) | date + "자세히" | None | View details |
| 완료 (Complete) | No | "초대 필요" | "비공개 원정대" | Invitation required |

**Key insight:** The "팀빌딩완료" status cards are the only ones that expose the creator's identity and provide a "자세히" button. This incentivizes completing team building to gain visibility.

---

## 3. Team Types (6 observations)

| # | Observation | Detail |
|---|-------------|--------|
| 1 | **해커톤 원정대 (Hackathon Expedition)** | 35 teams. Linked to a specific hackathon. Shows a gradient hackathon badge at card top with the hackathon title |
| 2 | **오픈 원정대 (Open Expedition)** | 82 teams. Independent of any hackathon. Based on the filter count (82 of 117), this is the majority of teams |
| 3 | **All visible cards in snapshot are 해커톤 원정대** | Every card in the basecamp snapshot shows the hackathon badge "월간 해커톤 : 긴급 인수인계 해커톤 - 문서만 남기고 사라졌다" -- the "전체" tab was active, but the first 32 cards all belong to this hackathon |
| 4 | **Open expedition cards likely lack the gradient badge** | Since all 해커톤 원정대 have the gradient hackathon strip, 오픈 원정대 cards presumably lack this strip or show a generic/different top design |
| 5 | **Filter counts are live** | Each tab shows real-time counts: 전체(117), 해커톤 원정대(35), 오픈 원정대(82). 35 + 82 = 117, confirming mutually exclusive categories |
| 6 | **모험가 찾기 is a separate concept** | The 8 "adventurers" are individual users seeking teams, not teams themselves. They live at `/public/adventurers` and are linked from the sidebar but are not mixed into the team grid |

---

## 4. Adventurer Card Anatomy (22 observations)

From the `/public/adventurers` snapshot and screenshot:

| # | Element | Detail |
|---|---------|--------|
| 1 | **Page heading** | Icon + h1 "모험가 찾기" with subtitle: "팀에 합류할 모험가를 찾아보세요. 총 8명의 모험가가 활동 중입니다." |
| 2 | **Search bar** | Text input "모험가 검색..." with icon |
| 3 | **Three filter/sort buttons** | Same pattern as basecamp: three unnamed icon buttons for filtering/sorting |
| 4 | **View toggle** | Two icon buttons for grid/list view toggle |
| 5 | **Grid layout** | 2-column grid layout for adventurer cards |
| 6 | **Gradient background** | Each card has a unique gradient header/background. From screenshot: purple, pink, blue, green, orange, teal gradients. Colors appear to be per-user or randomly assigned |
| 7 | **Share button** | Top-right button with icon (ref=e90/e128 etc.) -- likely a share/external-link icon |
| 8 | **Username heading** | h3 linked to user profile (e.g., "yuriluv" -> `/user/f70adfd7-...`, "닉네임2" -> `/user/a95afac4-...`). Some use `/u/` slug format (e.g., "이대권" -> `/u/daconer`) |
| 9 | **"원정대 찾기" button** | Action button with icon + text "원정대 찾기" (Find expedition) -- lets the adventurer be matched to teams |
| 10 | **Avatar with tier badge** | Circular avatar image (named, e.g., `img "닉네임2"`) with overlaid tier badge (e.g., `img "Silver tier"`, `img "Bronze tier"`). Both linked to user profile |
| 11 | **Role tags** | Predefined role labels: "Frontend Developer", "Backend Developer", "ML Engineer", "Data Analyst", "Data Scientist", "Service 기획자", "발표자". Multiple roles per user. Overflow shown as "+N" (e.g., "+4", "+3", "+1", "+2") |
| 12 | **Skill tags** | Separate from roles. Examples: "VS Code", "Git", "GitHub", "Computer Vision", "NLP (Natural Language Processing)", "Recommendation System", "Notion", "Miro", "Google Sheets", "Excel", "Google Docs", "MS Word". Overflow shown as "+N" (e.g., "+11", "+3", "+8", "+14", "+4", "+2") |
| 13 | **Stat badges** | Numeric rating badges. Three possible stats observed: "학습 X" (learning), "케미 X" (chemistry/teamwork), "직무 X" (professional). Values range 4-5. Not all users show all three stats |
| 14 | **Bio text** | Paragraph of self-description text. Variable length. Some are brief ("빵상~"), others are multi-sentence descriptions of professional background |
| 15 | **Tag overflow with "+N"** | Both role and skill sections use a "+N" overflow indicator when there are more items than display space allows. This prevents card height from exploding |
| 16 | **Three-section layout** | Card body has three distinct sections: (1) Roles, (2) Skills, (3) Stats + Bio |
| 17 | **Card clickability** | Entire card outer container has `[cursor=pointer]` |
| 18 | **Some users have minimal profiles** | "yuriluv" and "스카스카" have very sparse cards -- one shows no roles, no skills. "스카스카" shows only stats (학습 5, 케미 5) and a one-word bio |
| 19 | **Tier distribution** | Of 8 adventurers: 1 has no visible tier (yuriluv -- though snapshot shows Silver), most are Silver, one is Bronze |
| 20 | **User URL format varies** | Two URL patterns: `/user/{uuid}` and `/u/{username-slug}`. This suggests both legacy UUIDs and newer vanity URLs exist |
| 21 | **Card gradient uniqueness** | Each adventurer card has a distinctly different gradient color scheme in the header area. From screenshot: user "yuriluv" has purple-to-pink, "닉네임2" has blue, "도비콘" has green-to-teal, "이대권" has orange, etc. |
| 22 | **No team affiliation shown** | Adventurer cards do not show which teams (if any) the user belongs to. They represent individual availability |

---

## 5. Team Creation Flow (8 observations, implied from data)

| # | Observation | Detail |
|---|-------------|--------|
| 1 | **"원정대 만들기" button** | Prominent button on the basecamp main area, below search. Triggers team creation |
| 2 | **"원정대그룹 가기" button** | Separate action to navigate to expedition groups -- implies teams can be organized into groups |
| 3 | **Required fields (inferred from card data)** | Team name (h3), member capacity (X/Y), hackathon linkage (optional -- only for 해커톤 원정대), visibility setting (비공개/공개), access type (초대 필요/자유 참가) |
| 4 | **Deadline setting** | Most cards show "기간 없음" -- deadline is optional. Some show specific dates or "마감" |
| 5 | **Team type selection** | Must choose between 해커톤 원정대 (requires hackathon link) and 오픈 원정대 (independent) |
| 6 | **Visibility toggle** | "비공개 원정대" (private) is the most common -- implies a public/private toggle during creation |
| 7 | **Access control** | "초대 필요" (invitation required) shown on most cards -- implies an access-level dropdown (invite-only vs open) |
| 8 | **Max team size** | Observed values: 1, 2, 3, 4, 5. Maximum capacity set during creation |

---

## 6. Team Search & Discovery (8 observations)

| # | Observation | Detail |
|---|-------------|--------|
| 1 | **Search input** | "원정대 검색..." placeholder -- free-text search across team names |
| 2 | **Three filter buttons** | Three unnamed icon buttons. Likely: filter by status (모집중/팀빌딩완료/완료), filter by hackathon, filter by access type |
| 3 | **View toggle** | Two icon buttons for switching between grid and list views |
| 4 | **Sidebar filter tabs** | Primary filtering via sidebar: 전체, 해커톤 원정대, 오픈 원정대 |
| 5 | **Pagination** | Server-side pagination: 32 items per page, 4 pages for 117 teams. Previous/Next + page number buttons |
| 6 | **Count display** | "전체 117개 팀 중 1~32번째 표시" -- showing range of currently displayed items out of total |
| 7 | **Sort options** | Implied by filter icon buttons but not explicitly labeled in snapshot |
| 8 | **Cross-page search** | Global nav search bar "원정대, 해커톤, 사용자 검색..." in the top navigation -- searches across all content types |

---

## 7. Adventurer Search & Discovery (5 observations)

| # | Observation | Detail |
|---|-------------|--------|
| 1 | **Search input** | "모험가 검색..." placeholder |
| 2 | **Three filter buttons** | Same pattern as team search. Likely: filter by role, filter by skill, filter by stats |
| 3 | **View toggle** | Grid/list view toggle |
| 4 | **Count display** | "총 8명의 모험가가 활동 중입니다" in the page subtitle |
| 5 | **No pagination visible** | With only 8 adventurers, no pagination is shown -- likely appears when count exceeds page size |

---

## 8. User Profile Elements (10 observations from adventurer cards)

| # | Element | Detail |
|---|---------|--------|
| 1 | **Roles** | Multi-select from predefined list. Observed roles: Frontend Developer, Backend Developer, ML Engineer, Data Analyst, Data Scientist, Service 기획자, 발표자. Mix of English and Korean |
| 2 | **Skills** | Multi-select from predefined list. Observed: VS Code, Git, GitHub, Computer Vision, NLP (Natural Language Processing), Recommendation System, Notion, Miro, Google Sheets, Excel, Google Docs, MS Word |
| 3 | **Learning stat (학습)** | Numeric rating, observed values: 4, 5 |
| 4 | **Chemistry stat (케미)** | Numeric rating, observed values: 4, 5 |
| 5 | **Professional stat (직무)** | Numeric rating, observed values: 5. Not all users have this |
| 6 | **Bio text** | Free-text self-description. Variable length from 2 characters to 200+ |
| 7 | **Tier badge** | Bronze, Silver (Gold not observed but implied). Visual badge overlaid on avatar |
| 8 | **Avatar** | Circular image, supports custom uploads (varied per user) |
| 9 | **Profile URL** | Two formats: `/user/{uuid}` and `/u/{slug}` |
| 10 | **Stats are optional** | Some users show 2 stats, some show 3, some show 0. Not mandatory |

---

## 9. Team-Hackathon Relationship (6 observations)

| # | Observation | Detail |
|---|-------------|--------|
| 1 | **Hackathon badge on team card** | 해커톤 원정대 cards display the linked hackathon title in a gradient strip at the card top. This is the primary visual differentiator from 오픈 원정대 |
| 2 | **One-to-many relationship** | A single hackathon has many teams. All 35 해커톤 원정대 in the snapshot link to "월간 해커톤 : 긴급 인수인계 해커톤" |
| 3 | **Hackathon icon** | Each hackathon badge includes a small icon/image (ref=e111, e163, etc.) representing the hackathon |
| 4 | **Filter by hackathon type** | The sidebar distinguishes "해커톤 원정대" (35) from "오픈 원정대" (82) as primary categories |
| 5 | **Bidirectional linkage** | Teams link to hackathons (badge on card), and hackathon pages presumably list/link to their teams |
| 6 | **Team count per hackathon** | The filter shows 35 hackathon-linked teams. Multiple hackathons could each contribute teams, but the current data shows all from one hackathon |

---

## 10. Gap Analysis: daker.ai Basecamp vs Our /camp Page

### 10.1 Layout Differences

| # | daker.ai | Our Implementation | Gap |
|---|----------|-------------------|-----|
| 1 | Two-column layout with persistent left sidebar | Single column, no sidebar | **CRITICAL** -- Missing sidebar for navigation and context |
| 2 | Sidebar contains filter tabs with live counts | Filter buttons inline in main content, no counts | **HIGH** -- No count badges on filter tabs |
| 3 | h3 "베이스캠프" heading + descriptive subtitle | h1 with nav.camp translation only | **MEDIUM** -- Missing subtitle/description |
| 4 | Announcement/notice banner at top with marquee | No announcement system | **HIGH** -- Missing announcement/notice area |
| 5 | Search bar with "원정대 검색..." | No search functionality | **CRITICAL** -- No search at all |
| 6 | Three filter icon buttons + view toggle | No filter buttons, no view toggle | **HIGH** -- Missing advanced filters and view modes |
| 7 | Two action buttons ("원정대그룹 가기" + "원정대 만들기") | Single "+" create button | **MEDIUM** -- Missing expedition group navigation |
| 8 | Pagination with page numbers + item count | No pagination | **HIGH** -- All teams rendered at once, no pagination |
| 9 | 2-column card grid (from screenshot) | 3-column grid (lg:grid-cols-3) | **LOW** -- Different column count, both valid |
| 10 | Global search in nav: "원정대, 해커톤, 사용자 검색..." | No global search | **MEDIUM** -- Missing cross-content search |
| 11 | "피드백 보내기" button in sidebar | No feedback mechanism | **LOW** -- Nice-to-have |

### 10.2 Card Design Differences

| # | daker.ai | Our Implementation | Gap |
|---|----------|-------------------|-----|
| 12 | Gradient hackathon badge strip at card top | Plain text link to hackathon at card bottom | **CRITICAL** -- Missing the most visually striking element. The gradient strip is a strong brand differentiator |
| 13 | Bookmark/save button on card | No bookmark/save | **HIGH** -- Missing user engagement feature |
| 14 | Status badge with 3 states (모집중/팀빌딩완료/완료) | Binary isOpen toggle (open/closed) | **CRITICAL** -- Only 2 states vs 3. Missing "팀빌딩완료" state |
| 15 | Creator section with avatar + tier badge + name | No creator information | **CRITICAL** -- No user/creator identity on cards |
| 16 | Team name as h3, prominently placed | Team name as h3 in CardHeader | **OK** -- Similar |
| 17 | Member count as "X/Y명" (current/max) | Single number + "명" | **HIGH** -- Missing max capacity. Our model has `memberCount` (single number), not current/max |
| 18 | Deadline display with icon ("기간 없음" / date / "마감") | Created date shown instead | **HIGH** -- No deadline concept at all |
| 19 | View count with eye icon | No view tracking | **HIGH** -- Missing engagement metrics |
| 20 | Access type indicator ("초대 필요") | No access type concept | **HIGH** -- Missing invitation-required vs open distinction |
| 21 | Visibility label ("비공개 원정대" with lock icon) | No visibility concept | **HIGH** -- Missing public/private team distinction |
| 22 | "자세히" detail button (on complete teams) | Edit/Delete buttons always visible | **CRITICAL** -- We show admin actions to all users. daker.ai shows read-only "자세히" |
| 23 | No description text on card surface | Full intro text shown on card | **MEDIUM** -- daker.ai is more compact; description is detail-level |
| 24 | No "looking for" roles on card | lookingFor badges shown on card | **MEDIUM** -- daker.ai keeps this in detail view |
| 25 | No contact link on card | Contact link shown directly | **HIGH** -- Privacy issue. daker.ai gates contact behind interaction |
| 26 | Card is fully clickable (cursor=pointer) | Card is not clickable as a whole | **HIGH** -- Missing card-level click navigation to detail page |
| 27 | Compact card height (no description, no roles) | Taller cards with description and role badges | **MEDIUM** -- Different design philosophy |
| 28 | Tier badge system (Bronze/Silver/Gold) | No gamification/tier system | **HIGH** -- Missing user progression system |

### 10.3 Missing Features

| # | Feature | Priority | Detail |
|---|---------|----------|--------|
| 29 | **Adventurer system entirely missing** | **CRITICAL** | daker.ai has a complete "모험가 찾기" (Find Adventurers) sub-system at `/public/adventurers` with individual user profile cards. We have nothing equivalent |
| 30 | **User profile cards** | **CRITICAL** | Adventurer cards with roles, skills, stats, bio, tier badge. Requires a user profile data model |
| 31 | **Team type distinction** | **HIGH** | 해커톤 원정대 vs 오픈 원정대. Our model only has hackathon-linked teams (`hackathonSlug` is required). No concept of independent "open" teams |
| 32 | **Team status lifecycle** | **HIGH** | Three states (모집중 -> 팀빌딩완료 -> 완료) vs our binary isOpen. Missing intermediate "team building complete" state |
| 33 | **Visibility/privacy control** | **HIGH** | Public vs private teams. Our model has no visibility field |
| 34 | **Access control** | **HIGH** | Invite-only vs open-access. Our model has no access type field |
| 35 | **View counter** | **MEDIUM** | Track and display how many times a team card has been viewed |
| 36 | **Deadline/recruitment period** | **HIGH** | Teams can set recruitment deadlines. Missing from our model |
| 37 | **Bookmark/favorite** | **MEDIUM** | Users can save teams for later. Requires user accounts |
| 38 | **Expedition groups** | **LOW** | "원정대그룹 가기" implies teams can be grouped. Not a core feature |
| 39 | **Theme toggle** | **LOW** | "테마 전환" button in nav -- dark/light theme. Our app may already support this |
| 40 | **Marquee announcement** | **MEDIUM** | Scrolling announcement banner for urgent notices |

### 10.4 Data Model Gaps

| # | Field | daker.ai | Our `Team` type | Gap |
|---|-------|----------|-----------------|-----|
| 41 | Team type | "해커톤 원정대" / "오픈 원정대" | `hackathonSlug: string` (always required) | Need optional hackathonSlug + explicit team type enum |
| 42 | Status | "모집중" / "팀빌딩완료" / "완료" | `isOpen: boolean` | Need `status: 'recruiting' | 'teamBuilt' | 'complete'` |
| 43 | Creator | User object with avatar, tier, name | Not present | Need `creator: { id, name, avatarUrl, tier }` |
| 44 | Max members | Implicit from "X/Y명" | `memberCount: number` (ambiguous single value) | Need `currentMembers: number` + `maxMembers: number` |
| 45 | Deadline | Date or "기간 없음" | Not present | Need `deadline?: string` (ISO date, optional) |
| 46 | View count | Numeric view counter | Not present | Need `viewCount: number` |
| 47 | Visibility | "비공개 원정대" / (public) | Not present | Need `visibility: 'public' | 'private'` |
| 48 | Access type | "초대 필요" / (open) | Not present | Need `accessType: 'invite' | 'open'` |
| 49 | Bookmarked | Bookmark button state | Not present | Need bookmark/favorite relationship (separate model) |
| 50 | Description | Exists but not shown on card | `intro: string` (shown on card) | Our field exists but display strategy differs |

### 10.5 Interaction Gaps

| # | Interaction | daker.ai | Our Implementation | Gap |
|---|-------------|----------|-------------------|-----|
| 51 | **Card click** | Navigates to team detail page | No detail page exists | **CRITICAL** -- No team detail view |
| 52 | **Bookmark click** | Toggles save state | N/A | **HIGH** -- No save/bookmark |
| 53 | **Search** | Filters teams by text query | No search | **CRITICAL** -- No search functionality |
| 54 | **Tab filter** | Switches between team types with counts | Filters by hackathon only | **HIGH** -- No team-type filtering |
| 55 | **View toggle** | Switches grid/list layout | No view toggle | **MEDIUM** -- Single view mode |
| 56 | **Pagination** | Navigates pages of 32 items | No pagination | **HIGH** -- Would fail with many teams |
| 57 | **Status filter** | Filter by 모집중/팀빌딩완료/완료 | No status filter | **HIGH** -- Cannot find recruiting teams |
| 58 | **Adventurer browse** | Navigate to /public/adventurers from sidebar | No adventurer page | **CRITICAL** -- Entire sub-system missing |

### 10.6 Search & Filter Gaps

| # | Filter Capability | daker.ai | Our Implementation |
|---|-------------------|----------|-------------------|
| 59 | Text search | Yes ("원정대 검색...") | No |
| 60 | Team type filter | Yes (전체/해커톤/오픈) | Hackathon-only filter |
| 61 | Status filter | Implied (3 icon buttons) | No |
| 62 | View mode toggle | Yes (grid/list) | No |
| 63 | Sort options | Implied (icon buttons) | No |
| 64 | Pagination | Yes (32/page, numbered) | No |
| 65 | Count display | Yes ("전체 117개 팀 중 1~32번째") | No |

---

## Summary: Prioritized Improvements

### P0 -- Critical (Must Have)

1. **Left sidebar layout** with filter tabs showing counts
2. **Team card redesign**: gradient hackathon badge, status badge (3-state), creator section with avatar/tier, member count as current/max, view count, access type indicator
3. **Team detail page** (card click destination)
4. **Search functionality** for teams
5. **Data model expansion**: team type, 3-state status, creator, maxMembers, deadline, viewCount, visibility, accessType
6. **Remove admin actions from public card** (edit/delete should be owner-only, in detail view)
7. **Adventurer/user profile system** (separate page at minimum)

### P1 -- High Priority

8. Announcement/notice banner
9. Pagination (32 items per page)
10. Bookmark/save functionality
11. View toggle (grid/list)
12. Advanced filter buttons (status, sort)
13. Deadline field on teams
14. Privacy gating of contact information

### P2 -- Medium Priority

15. Marquee animation for announcements
16. Tag overflow with "+N" pattern
17. Gradient color variations per hackathon
18. User tier/gamification badges
19. Global cross-content search
20. Open expedition (independent team) support
21. "원정대그룹" (expedition group) concept

### P3 -- Nice to Have

22. Feedback button
23. Theme toggle
24. Adventurer stat ratings (학습/케미/직무)
25. User profile URL slug system (/u/username)

---

## Analyst Review: Basecamp/Team System

### Missing Questions
1. **What happens when a user clicks a team card?** -- Our implementation has no team detail page. What content should the detail page show? (description, members list, join flow, chat?)
2. **How does the "팀빌딩완료" transition work?** -- Is it manual (team leader marks complete) or automatic (when currentMembers == maxMembers)?
3. **What is the "원정대그룹" feature?** -- The "원정대그룹 가기" button implies a grouping system above teams. Is this a priority?
4. **Are open expeditions in scope?** -- Our current model requires `hackathonSlug`. Should teams exist independently of hackathons?
5. **Who can see edit/delete actions?** -- Our cards show edit/delete to everyone. Should these be owner-only or admin-only?
6. **How does the adventurer "원정대 찾기" button work?** -- Does it match adventurers to teams algorithmically, or just show available teams?
7. **What are the exact status transitions?** -- Can a "완료" team revert to "모집중"? Is the lifecycle strictly linear?

### Undefined Guardrails
1. **Max team size upper bound** -- daker.ai shows up to 5 members. Our form allows up to 10. What is the real cap? Suggested: 10 max.
2. **Deadline enforcement** -- When a deadline passes, does the team auto-close or just show "마감"? Suggested: auto-transition to "마감" status.
3. **View count authenticity** -- How to prevent view count inflation (bots, refresh spam)? Suggested: unique-visitor-per-day counting.
4. **Private team discoverability** -- "비공개 원정대" still appears in the public list. What does "private" actually mean? Suggested: visible but not joinable without invite.

### Scope Risks
1. **Adventurer system scope creep** -- Building a full user profile + skill/role/stat system is a large feature. Risk: could double the implementation effort. Prevention: implement as a separate phase after core team features.
2. **Gamification (tier badges) scope creep** -- Bronze/Silver/Gold tiers imply a scoring/progression system. Prevention: use static tiers for now, defer dynamic tier calculation.
3. **Real-time features** -- View counts, live member counts, status changes could push toward real-time data requirements. Prevention: poll-based updates, not websockets.

### Unvalidated Assumptions
1. **All teams require a hackathon link** -- Our model assumes `hackathonSlug` is required. Daker.ai shows 82 open expeditions without hackathon links. Validate: check if open teams are in scope.
2. **Binary open/closed is sufficient** -- Our model uses `isOpen: boolean`. Daker.ai uses a 3-state lifecycle. Validate: confirm with product whether 3 states are needed.
3. **Contact info should be public** -- Our card shows contact URL directly. Daker.ai hides it. Validate: confirm privacy requirements.
4. **No authentication needed** -- Our implementation has no user accounts. Daker.ai requires login for team creation. Validate: is auth in scope?

### Missing Acceptance Criteria
1. **Team card click navigates to detail page** -- Clicking any team card should navigate to `/camp/{teamCode}` showing full team information.
2. **Search returns matching teams within 200ms** -- Text search on team name should filter the displayed teams with sub-200ms perceived latency.
3. **Pagination shows exactly 32 items per page** -- Page navigation shows correct range text "전체 N개 팀 중 X~Y번째 표시".
4. **Status badge shows correct color per state** -- 모집중=color A, 팀빌딩완료=color B, 완료=color C. Each visually distinct.
5. **Creator info appears only on "팀빌딩완료" cards** -- Recruiting and complete cards show the privacy-first variant without creator details.

### Edge Cases
1. **Team with 0 members** -- Can a team exist with `currentMembers: 0`? The creator should count as member 1.
2. **Deadline in the past** -- What happens when `deadline < now`? Show "마감" status and prevent new joins.
3. **Max capacity reached while recruiting** -- If `currentMembers == maxMembers` and status is still "모집중", should it auto-transition to "팀빌딩완료"?
4. **Hackathon deleted with linked teams** -- If a hackathon is removed, what happens to its 해커톤 원정대 teams?
5. **Very long team name** -- Names like "2026 새원정대 혼자서 진행" and "월간 해커톤 : 긴급 인수인계 해커톤" are long. Card must handle truncation.
6. **Adventurer with no roles/skills/stats** -- "yuriluv" has an almost empty profile. Card should render gracefully with minimal data.

### Open Questions
- [ ] Are open expeditions (오픈 원정대, teams without a hackathon link) in scope for this implementation? -- Determines whether `hackathonSlug` should be optional in the data model.
- [ ] Is a 3-state team lifecycle (모집중/팀빌딩완료/완료) required, or is binary (open/closed) acceptable? -- Affects data model, card variants, and filter tabs.
- [ ] Is the adventurer/user profile system in scope, or deferred? -- This is the second-largest feature area after team cards.
- [ ] Should team creation require authentication? -- Daker.ai requires login. Our current implementation has no auth.
- [ ] What content appears on the team detail page? -- No reference design was captured for the detail view.
- [ ] Is the bookmark/save feature in scope? -- Requires user accounts and a bookmark relationship model.
- [ ] What determines a user's tier (Bronze/Silver/Gold)? -- Needed if we implement creator sections or adventurer cards.

### Recommendations
1. **Expand the `Team` type first** -- Add `type`, `status`, `creator`, `currentMembers`, `maxMembers`, `deadline`, `viewCount`, `visibility`, `accessType` fields before any UI work.
2. **Redesign the team card component** -- The current card shows too much (description, roles, contact, admin actions) and too little (no hackathon badge, no status lifecycle, no creator, no view count). A complete redesign is needed.
3. **Build the sidebar layout** -- The two-column layout with sidebar navigation is foundational to the basecamp experience.
4. **Add search and pagination** -- These are table-stakes features for any listing page with 100+ items.
5. **Defer adventurer system** -- Implement it as a Phase 2 after core team features are solid.
6. **Defer gamification (tiers)** -- Use static placeholder tiers or omit entirely in Phase 1.

# DAKER Platform - Exhaustive User Interaction Flow Analysis

> Analyzed from: home, basecamp, showcase, community, adventurers, and hackathon-detail snapshots + full-page screenshots.
> Date: 2026-03-12

---

## 1. User Journeys

### Journey 1: First-Time Visitor Discovering Hackathons

**Entry Point:** Direct URL `/` (Home page)

1. Visitor lands on home page, sees hero section with stats banner: "DAKER: 39 hackathons, 80 teams, 103 adventurers"
2. Reads headline: "AI service development hero's journey begins here"
3. Reads description: "DAKER is a platform where AI/data experts gather to challenge, grow, and create outcomes together"
4. **Decision Point A:** Click "Start Now" (CTA) -> navigates to `/public/hackathons`
5. **Decision Point B:** Click "Browse" (secondary CTA) -> navigates to `/public/basecamp`
6. Scrolls down to see platform stats: 98.4M+ submissions, 23.1M+ team participations, 423 competitions hosted (DACON + DAKER combined)
7. Scrolls to "DAKER System Introduction" section with 4 feature cards:
   - Profile: GitHub integration, activity heatmap, tech stack management
   - Expedition Teams (원정대): Role-based recruitment, hackathon auto-linkage, real-time team communication
   - Hackathon: One-click participation, code/deliverable submission management, expert judging & feedback
   - Badges & Ranking: Achievement badges, XP-based level system, real-time leaderboard competition
8. Scrolls to bottom CTA: "Ready? Start your data adventure now" -> "Sign Up" link goes to `/public/hackathons` (not an actual signup page)
9. **Exit Points:** Footer links to external DACON properties, or clicks login at `/api/auth/dacon/login`

**Success State:** Visitor clicks "Start Now" and begins browsing hackathons
**Error State:** None observable for anonymous visitors; all pages appear publicly accessible

---

### Journey 2: User Browsing and Filtering Hackathons

**Entry Point:** `/public/hackathons` (via nav button "hackathon" or home CTA)

> Note: The hackathon list page was not directly captured in the snapshots. However, the navigation button "hackathon" exists on all pages, and the home page CTAs point to `/public/hackathons`. The hackathon detail page provides structural evidence of the list.

1. User arrives at hackathon listing page
2. **Implied filters** (based on basecamp pattern and hackathon detail context):
   - Status filter: "모집중" (Recruiting), "팀빌딩완료" (Team Building Complete), etc.
   - Likely sorting options similar to other pages
3. User sees hackathon cards showing: title, description, status badge, prize amount, dates
4. Clicks on a specific hackathon card -> navigates to hackathon detail page (e.g., the "Monthly Hackathon: Emergency Handover" detail)
5. **Decision Point:** Filter by status, search by keyword, or click directly

**Note:** The hackathon list page snapshot was not provided. This journey is partially reconstructed from navigation structure and the detail page.

---

### Journey 3: User Viewing Hackathon Details (Every Tab/Section)

**Entry Point:** Hackathon detail page (captured in `daker-hackathon-detail-snapshot.md`)

The hackathon detail page uses a sidebar navigation with expandable/collapsible sections. The observed hackathon is: "Monthly Hackathon: Emergency Handover - Only Documents Left Behind"

#### Left Sidebar Navigation Structure:
```
- 대회안내 (Competition Info) [expandable]
  - 개요 (Overview)
  - 평가 (Evaluation)
  - 규칙 (Rules)
  - 일정 (Schedule)
  - 상금 (Prizes)
  - 데이터 (Data)
  - 동의사항 (Agreement)
- 제출 (Submission)
- 리더보드 (Leaderboard) [count: 138]
- 갤러리 (Gallery) [expandable, count: 4]
  - 기획서 제출 (Planning Doc Submission) [count: 4, deadline: 3/30 10:00]
  - 최종 웹링크 제출 (Final Web Link Submission) [deadline: 4/6 10:00]
  - 최종 솔루션 PPT 제출 (Final Solution PPT Submission) [deadline: 4/13 10:00]
- 게시판 (Board) [expandable]
  - 전체 (All)
  - 공지 (Announcements)
  - 업데이트 (Updates)
  - FAQ
  - 일반 (General)
```

#### Right Sidebar - Real-time Clock & Countdown:
- **Current time display:** "05:23:02" with date "2026.03.12 (Thu)"
- **Countdown to deadline:** "18 days 04 hours 36 min 56 sec"
- **Phase indicator:** "3" with "1/10" (step 3 of 10 phases)
- **Next deadline:** "March 30, 10:00 deadline"
- **Timeline of all milestones:**
  - 기획서 제출 마감 (Planning Doc deadline): 3/30 10:00
  - 평가 마감 (Evaluation deadline): 3/30 10:01
  - 산출물 제출 마감 (Deliverable deadline): 4/6 10:00
  - 평가 마감: 4/6 10:01
  - 발표자료 제출 마감 (Presentation deadline): 4/13 10:00
  - 평가 마감: 4/17 10:00
  - 대회 마감 (Competition close): 4/13 10:00

#### Right Sidebar - Team List:
- Header: "모집 중 (7)" - 7 teams recruiting
- Each team shows: team logo, team name, member count (e.g., "4/5")
- Teams listed: ONE (4/5), BSSSSSSM (3/4), MIO(Max It Out) (2/3), 바이브코딩 (2/3), 오주임 (2/3), "+2 more..."
- Expandable "+2 more..." link

#### Main Content Area:

**Step 1 - Header:**
- Share button (img + "공유")
- Status badge: "모집중" (Recruiting)
- Title: "월간 해커톤 : 긴급 인수인계 해커톤 - 문서만 남기고 사라졌다"
- Description paragraph
- Host info: 데이콘 / dacon@dacon.io with logo

**Step 2 - Stats Row:**
| Field | Value |
|-------|-------|
| 상금 (Prize) | 1,000,000원 |
| 대회 기간 (Competition Period) | 3/5 14:00 ~ 4/27 10:00 |
| 접수 기간 (Registration Period) | 3/5 14:00 ~ 3/30 10:00 |
| 참가 팀수 (Participating Teams) | 128팀 |
| 제출 / 저장 (Submit / Save) | 4건 / 15건 |
| 조회수 (Views) | 2517 |

**Step 3 - Participation CTA:**
- Icon + "참가 신청 가능" (Registration available)
- "마감까지 D-18 남았습니다" (D-18 until deadline)
- Button: "로그인하고 참가하기" -> `/login` (requires auth)

**Step 4 - Content Tabs (scrollable sections):**

**Tab: 개요 (Overview)**
- Competition introduction: build a web service using vibe coding based on provided documents
- Goal: complete webpage from provided materials + extend with team ideas
- Tech/Environment: any vibe coding tool, Vercel deployment required
- Download link: `https://cfiles.dacon.co.kr/competitions/daker_202603/data.zip`

**Tab: 평가 (Evaluation)**
- Phase 1: Mutual voting by participants + judges
  - Participant weight: 30%
  - Judge weight: 70%
- Phase 2: Top 10 teams get internal judge qualitative evaluation (100%)
- Scoring table:
  | Category | Points | Criteria |
  |----------|--------|----------|
  | Basic Implementation | 30 | Page implementation, data rendering, filter/sort, empty state UI |
  | Extension (Ideas) | 30 | Originality, practicality, service value, consistent flow |
  | Completeness | 25 | Usability, stability, performance, accessibility/responsive |
  | Documentation | 15 | Planning doc clarity, PPT explanation, reproducibility |
- Tiebreaker rules: judge votes > unused vote count > earliest upload time
- Stage-by-stage evaluation ratios displayed visually:
  - 기획서 제출 확인: 100% judges
  - 최종 웹링크 제출 확인: 100% judges
  - 1차 투표평가: 70% judges + 30% submitters

**Tab: 규칙 (Rules)**
- Deliverables: planning doc (1st submission), web page (Vercel URL + GitHub repo), solution PPT (PDF)
- Development rules: externally accessible URL, free tech choice, use provided data only, dummy data/localStorage permitted, external API must work without keys
- Fairness: respect copyright/licenses, no plagiarism, AI tools allowed
- Judging notes: based on deployed URL, hard-to-verify features may be excluded

**Tab: 일정 (Schedule)**
- 8-step timeline with status indicators ("진행중" = in progress):
  1. 접수 (Registration): 3/5 14:00 ~ 3/30 10:00 [진행중]
  2. 기획서 제출 (Planning Doc): 3/9 10:00 ~ 3/30 10:00 [진행중]
  3. 기획서 제출 확인 (Planning Doc Review): 3/30 10:01 ~ 3/30 10:01
  4. 최종 웹링크 제출 (Final Web Link): 3/30 10:02 ~ 4/6 10:00
  5. 최종 웹링크 제출 확인 (Web Link Review): 4/6 10:01 ~ 4/6 10:01
  6. 최종 솔루션 PPT 제출 (Final PPT): 4/6 10:02 ~ 4/13 10:00
  7. 1차 투표평가 (Voting Evaluation): 4/13 12:00 ~ 4/17 10:00
  8. 2차 내부 평가 (Internal Evaluation): 4/17 10:00 ~ 4/24 23:59

**Tab: 상금 (Prizes)**
- Total: 1,000,000원
- 1st place: 500,000원
- 2nd place: 300,000원
- 3rd place: 200,000원

**Tab: 데이터 (Data)**
- "This competition does not provide data" (data download is a separate provided materials zip)

**Tab: 동의사항 (Agreement)**
- Expandable/collapsible section (collapsed in snapshot)

#### Participation Guide Dialog (Modal):
Triggered by "참가 가이드 보기" button. 2-page carousel dialog:

**Page 1: 3-Step Guide**
1. "해커톤 선택 & 참가 신청" - Browse hackathon, check rules/schedule, choose individual or team
2. "원정대(팀) 구성" - Create new team or join existing, team leader confirms
3. "작전실 및 해커톤에서 제출" - Prepare in 작전실 (war room), collaborate real-time, submit before deadline

**Page 2 Note:** "Individual participation is also possible! You can register individually first, then form or join a team later."

**Dialog Controls:** Dot pagination (2 dots), "Next" button, Close (X) button

---

### Journey 4: User Submitting to a Hackathon

The hackathon has 3 distinct submission phases visible in the gallery sidebar:

#### 4a. 기획서 제출 (Planning Document Submission)
**Trigger:** Gallery > 기획서 제출 button (count: 4, deadline: 3/30 10:00)
1. User must be logged in and registered for the hackathon
2. User clicks "기획서 제출" in the gallery sub-navigation
3. **Implied form:** Upload planning document covering: service overview, page structure, system architecture, core feature specs, main user flows, development & improvement plan
4. **Deadline enforcement:** Submission window 3/9 10:00 ~ 3/30 10:00
5. **Success:** Submission counted (4 submissions observed)
6. **Post-deadline:** Automatic review phase 3/30 10:01 (100% judge evaluation)

#### 4b. 최종 웹링크 제출 (Final Web Link Submission)
**Trigger:** Gallery > 최종 웹링크 제출 button (deadline: 4/6 10:00)
1. User provides: Vercel deployment URL (required) + GitHub repository link (required)
2. **Validation implied:** URL must be externally accessible
3. **Submission window:** 3/30 10:02 ~ 4/6 10:00
4. **Post-deadline:** Automatic review phase 4/6 10:01 (100% judge evaluation)

#### 4c. 최종 솔루션 PPT 제출 (Final Solution PPT Submission)
**Trigger:** Gallery > 최종 솔루션 PPT 제출 button (deadline: 4/13 10:00)
1. User uploads PDF file (created from PPT, converted to PDF)
2. **Constraints:** No page limit, no design restrictions
3. **Submission window:** 4/6 10:02 ~ 4/13 10:00
4. **Post-deadline:** Voting evaluation 4/13 12:00 ~ 4/17 10:00

**Auth Gate:** All submissions require login. CTA shows "로그인하고 참가하기" -> `/login` for unauthenticated users.

---

### Journey 5: User Creating a Team (원정대)

**Entry Point:** Basecamp page (`/public/basecamp`)

1. User arrives at Basecamp, sees sidebar with filters: 전체 (117), 해커톤 원정대 (35), 오픈 원정대 (82), 모험가 찾기 (8)
2. In the main content area, two action buttons appear above the team list:
   - **"원정대그룹 가기"** (Go to Team Group) - navigates to team group management
   - **"원정대 만들기"** (Create Team) - triggers team creation flow
3. User clicks "원정대 만들기"
4. **Implied form fields** (based on team card data):
   - Team name (e.g., "wow", "파댕이", "MIO(Max It Out)")
   - Associated hackathon (linked to specific competition)
   - Visibility: 비공개 원정대 (Private team) or public
   - Maximum member count (e.g., 1, 2, 3, 4, 5)
   - Join method: "초대 필요" (Invitation required) or open
   - Team period (all observed: "기간 없음" = No period set)
5. **Success:** Team appears in basecamp list with status "모집중" (Recruiting)
6. **Team states observed:** "모집중" (Recruiting), "팀빌딩완료" (Team Building Complete)

**Alternative entry:** From hackathon detail page, the right sidebar shows recruiting teams with member counts.

---

### Journey 6: User Searching for Team Members (Adventurers)

**Entry Point:** `/public/adventurers` (via Basecamp sidebar "모험가 찾기 8" link)

1. User clicks "모험가 찾기" in Basecamp sidebar navigation
2. Page loads with header: "모험가 찾기" + description "팀에 합류할 모험가를 찾아보세요. 총 8명의 모험가가 활동 중입니다."
3. **Search:** Text search box "모험가 검색..." for filtering by name
4. **View Controls:** 5 buttons in toolbar area:
   - 3 filter/sort buttons (icons only, exact function unclear)
   - 2 layout toggle buttons (likely grid/list view)
5. User browses adventurer cards, each showing:
   - Avatar image with tier badge (Silver, Bronze)
   - Username (link to profile: `/user/{uuid}` or `/u/{username}`)
   - "원정대 찾기" (Find Team) button on each card
   - Role tags: e.g., "Backend Developer", "ML Engineer", "Data Analyst", "Service 기획자", "발표자"
   - Skill tags: e.g., "Computer Vision", "NLP", "VS Code", "Git", "GitHub", "+N" overflow
   - Stat tags: "학습 5" (Learning 5), "케미 5" (Chemistry 5), "직무 5" (Work 5)
   - Bio text paragraph
6. **Decision Point A:** Click username -> profile page `/user/{uuid}` or `/u/{username}`
7. **Decision Point B:** Click "원정대 찾기" -> likely shows available teams for that adventurer
8. **Decision Point C:** Click avatar/tier badge -> profile page

**Observed Adventurers (8 total):**
| Username | Tier | Roles | Profile URL Pattern |
|----------|------|-------|---------------------|
| yuriluv | Silver | (none shown) | `/user/{uuid}` |
| 스카스카 | Bronze | (tags: 학습 5, 케미 5) | `/user/{uuid}` |
| 닉네임2 | Silver | Frontend Dev, Backend Dev | `/user/{uuid}` |
| 도비콘 | Silver | Backend Dev, ML Engineer +4 | `/user/{uuid}` |
| 이대권 | Silver | Data Analyst, Backend Dev +3 | `/u/daconer` |
| 쓰담쓰담해달라고 | Silver | 발표자, Data Scientist +1 | `/user/{uuid}` |
| brink0 | Silver | Service 기획자, 발표자 +2 | `/u/airim(에이림)` |
| Mather | Silver | Data Analyst, ML Engineer +3 | `/user/test-admin` |

**Notable:** Two different profile URL patterns exist: `/user/{uuid}` and `/u/{username}` (inconsistent routing)

---

### Journey 7: User Joining an Existing Team

**Entry Point:** Basecamp team card or hackathon detail sidebar

1. User browses team cards in Basecamp
2. Each team card shows join status:
   - **"초대 필요"** (Invitation required) - user cannot directly join; must be invited
   - **"자세히"** (Details) button on completed teams - view team details only
   - **"모집중"** (Recruiting) badge - team is accepting members
3. For "초대 필요" teams: User must contact team leader externally or through platform messaging (mechanism not visible in snapshots)
4. For teams with open slots (e.g., "2/3명"): Implied join request flow
5. **Team card data structure:**
   - Linked hackathon badge with icon + hackathon name
   - Bookmark button (heart icon on team card header)
   - Visibility badge: "비공개 원정대" (Private team)
   - Team name
   - Member count: "X/Y명"
   - Period: "기간 없음" (No period) or date range
   - Activity count (number)
   - Join method indicator: "초대 필요" or open

**From Hackathon Detail Page:**
- Right sidebar shows "모집 중 (7)" with mini team cards
- Each shows: team logo, team name, member ratio (e.g., "4/5")
- "+2개 더..." expandable link for additional teams

---

### Journey 8: User Checking Leaderboard

**Entry Point:** Hackathon detail page > sidebar navigation > "리더보드" tab

1. User navigates to hackathon detail page
2. Clicks "리더보드" in left sidebar (shows count: 138 entries)
3. **Implied content:** Ranked list of 138 submissions/teams
4. Leaderboard page had a known loading issue (community posts reference: "[공지] 리더보드 페이지 로딩 오류 조치 완료 안내" and "[공지] 리더보드 페이지 로딩 지연 및 오류 안내")
5. **Known issues from community posts:**
   - Loading delay/freeze causing data non-display
   - Root cause: Real-time data aggregation server temporary overload
   - Status: Fixed as of the community announcement

**Note:** Leaderboard content was not directly captured in the snapshots.

---

### Journey 9: User Browsing Community Posts

**Entry Point:** `/community` (via nav button "커뮤니티") - captured in community snapshot

1. User arrives at community page with left sidebar navigation
2. **Category Filters (with counts):**
   - 홈 (Home): 104
   - 잡담 (Chat): 10
   - 대회 (Competition): 22
   - 바이브코딩 (Vibe Coding): 7
   - 기타 (Other): 6
   - 학습 (Learning): 37
3. **Pinned Posts Section ("고정 게시글"):**
   - "[공지] 월간 해커톤 : 긴급 인수인계 해커톤..." -> `/community/monthly-hackathon-emergency-handover-documents`
   - "[공지] 해커톤 팀 참가 전환 및 이벤트 참여..." -> `/community/hackathon-team-switch-event-participation`
4. **Sidebar Widgets (collapsible accordion):**
   - **최근 인기 (Recent Popular)** [expanded]: Tabbed view with 일간/주간/월간 (Daily/Weekly/Monthly). Daily tab shows "해당 기간에 게시글이 없습니다" (No posts in this period)
   - **게시글 TOP (Post TOP)** [collapsed]
   - **유저 랭킹 (User Ranking)** [collapsed]
5. **피드백 보내기 (Send Feedback)** button at bottom of sidebar
6. **Main Content Area:**
   - Announcement banner (scrolling marquee): "긴급 공지! AI 프로젝트 팀 모집 마감 임박!"
   - Search box: "게시글 검색..."
   - Sort button: "정렬"
   - Layout toggle buttons (2 buttons with icons - likely card/list view)
   - Additional view toggle buttons (2 more buttons)
7. **Post Cards** - Each post shows:
   - Thumbnail image (게시글 이미지) or media type indicator:
     - PDF badge (file thumbnail + "PDF" label)
     - Video badge (thumbnail + "동영상" label)
     - Link preview (thumbnail + domain + "링크" label)
     - Regular image
   - Post title (heading level 3)
   - Author info: avatar, username (link to `/profile/{uuid}` or `/adventurer/{username}`), relative time ("2일 전", "약 12시간 전")
   - Tags: "#공지", "#해커톤", "#GEMINI", "#클로드코드", "#바이브코딩", "#DAKER", "#매뉴얼" with "+N" overflow
   - Preview text (truncated content)
   - Engagement metrics: 3 counters with icons (likely: likes, comments, views)
   - Bookmark button (icon)
8. **Pagination:**
   - Previous/Next arrows
   - Page number buttons: 1, 2, 3, 4, 5
   - Count indicator: "104개 중 1-20" (1-20 of 104)
   - 20 posts per page

**Observed Post Types:**
- Official announcements ([공지])
- Video posts (동영상) - embedded or linked
- PDF document shares
- Link shares (external URLs with preview)
- Image posts (게시글 이미지)
- Text-only posts

**Author Profile URL Patterns:**
- `/profile/{uuid}` (e.g., DACONIO)
- `/adventurer/{username}` (e.g., 이대권 -> `/adventurer/daconer`)
- Inconsistent routing between pages

---

### Journey 10: User Creating a Community Post

**Entry Point:** Community page (creation button not visible in snapshot - likely requires auth)

1. **Implied flow:** User must be logged in
2. No "create post" button visible in the unauthenticated community snapshot
3. **Implied form fields** (based on existing post data):
   - Title
   - Content body (rich text supporting: text, images, embedded video, PDF uploads, link embeds)
   - Category selection: 잡담, 대회, 바이브코딩, 기타, 학습
   - Tags (hashtag format: #tag)
   - Media attachments: images, PDFs, videos, external links
4. **Post URL pattern:** `/community/{slug}` where slug is kebab-case of title
   - Example: `/community/monthly-hackathon-emergency-handover-documents`

---

### Journey 11: User Browsing/Creating Showcase Projects

**Entry Point:** `/public/showcase` (via nav button "쇼케이스")

**Browsing:**
1. User sees left sidebar with category filters (with counts):
   - 전체 (All): 1
   - 해커톤 (Hackathon): 0
   - 레이드 (Raid): 0
   - 개인 (Personal): 1
2. **Project Registration CTA** in sidebar:
   - Icon + "프로젝트 등록" heading
   - "새 프로젝트 등록하기" button/link -> `/public/showcase/new`
3. **Main content area:**
   - Announcement banner (same scrolling marquee as other pages)
   - Tag search: "태그로 검색..." textbox
   - Sort dropdown: "인기순" (Popularity) with expand arrow
4. **Project Cards:**
   - Thumbnail image
   - Category badge: "개인" (Personal)
   - Title: "데이콘 리더보드 with Goolge AI Studio"
   - Description text
   - Author: avatar + "국진"
   - Metrics: 3 icons with counts (1 like, 0 comments, 19 views)
5. **Card Link:** `/public/showcase/with-goolge-ai-studio-0504b0b0` (slug + hash pattern)

**Creating:**
1. User clicks "새 프로젝트 등록하기" -> navigates to `/public/showcase/new`
2. **Implied form fields** (based on existing project data):
   - Project title
   - Description
   - Category: 해커톤, 레이드, 개인
   - Thumbnail image upload
   - Tags
   - Project content/details
3. **Auth requirement:** Likely requires login (not explicitly shown)

---

### Journey 12: User Managing Their Profile

**Entry Point:** Not directly captured, but inferred from profile links and home page feature descriptions

1. **Profile URLs observed:**
   - `/profile/{uuid}` - seen in community author links
   - `/user/{uuid}` - seen in adventurer card links
   - `/u/{username}` - seen in some adventurer card links
   - `/adventurer/{username}` - seen in community author links
2. **Profile features advertised on home page:**
   - GitHub integration for portfolio automation
   - Activity heatmap visualization
   - Tech stack management
3. **Profile data observed on adventurer cards:**
   - Avatar image
   - Tier badge (Bronze, Silver)
   - Username
   - Role tags (multiple)
   - Skill/tool tags (multiple with +N overflow)
   - Stat categories: 학습 (Learning), 케미 (Chemistry), 직무 (Work) with numeric ratings (1-5)
   - Bio text
4. **Implied CRUD:** Users likely can edit their profile (roles, skills, bio, avatar)
5. **Auth flow:** Login via `/api/auth/dacon/login` (DACON SSO/OAuth)

---

### Journey 13: Admin/Organizer Flow (Implied)

**Evidence from snapshots:**

1. **Content Management:**
   - Pinned posts in community (marked with pin icon + "고정 게시글")
   - Announcement banners appearing on all pages (same content)
   - Official posts by "DACONIO" account (UUID: `7aeeb654-0621-4c68-80e0-1b1680ae6b03`)
2. **Hackathon Management:**
   - Competition creation with multi-phase schedule
   - Evaluation criteria configuration (scoring table)
   - Prize configuration
   - Data/materials upload (zip file hosting on `cfiles.dacon.co.kr`)
   - Phase status management ("진행중" indicators)
3. **Team Management:**
   - Team status transitions: 모집중 -> 팀빌딩완료
   - Implied approval flow for team join requests
4. **User Management:**
   - Tier badge assignment (Bronze, Silver)
   - User ranking system
5. **Content Moderation:**
   - Category-based organization
   - Post pinning capability
   - Announcement system (marquee banner)

---

## 2. Page Transition Map

### Global Navigation (Present on ALL pages)

```
[DAKER Logo] -> /
[해커톤]     -> /public/hackathons (button, not link)
[베이스캠프]  -> /public/basecamp (button, not link)
[커뮤니티]    -> /community (button, not link)
[학습]       -> (unknown URL, button)
[쇼케이스]    -> /public/showcase (button, appears on non-home pages)
[더보기]      -> dropdown menu (contents unknown)
[Search]     -> global search "원정대, 해커톤, 사용자 검색..."
[로그인]      -> /api/auth/dacon/login
[테마 전환]   -> toggles light/dark theme (client-side)
```

**Note:** Home page nav shows "더보기" instead of "쇼케이스" - the nav items shift between home and inner pages. Home shows: 해커톤, 베이스캠프, 커뮤니티, 학습, 더보기. Inner pages show: 해커톤, 베이스캠프, 커뮤니티, 학습, 쇼케이스, 더보기.

### All Discovered Internal URLs

| URL Pattern | Source | Destination |
|-------------|--------|-------------|
| `/` | Logo link, all pages | Home page |
| `/public/hackathons` | Home CTA "지금 시작하기", Home CTA "회원가입" | Hackathon list |
| `/public/basecamp` | Home CTA "둘러보기" | Basecamp (team browser) |
| `/public/adventurers` | Basecamp sidebar "모험가 찾기" link | Adventurer search |
| `/public/showcase` | Nav button | Showcase project list |
| `/public/showcase/new` | Showcase sidebar "새 프로젝트 등록하기" | New project form |
| `/public/showcase/{slug}-{hash}` | Showcase project card | Project detail |
| `/community` | Nav button | Community home |
| `/community/{post-slug}` | Pinned post links, post cards | Community post detail |
| `/profile/{uuid}` | Community author links | User profile |
| `/user/{uuid}` | Adventurer card links | User profile (alt) |
| `/u/{username}` | Some adventurer links | User profile (alt) |
| `/adventurer/{username}` | Community author links | Adventurer profile (alt) |
| `/login` | Hackathon detail CTA | Login page |
| `/api/auth/dacon/login` | Nav login button | DACON OAuth/SSO |

### External URLs (Footer, all pages)

| URL | Label |
|-----|-------|
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
| `https://cfiles.dacon.co.kr/competitions/daker_202603/data.zip` | 제공 자료 다운로드 |

### Deep Linking Patterns

```
/community/{kebab-case-post-title}
  Examples:
  - /community/monthly-hackathon-emergency-handover-documents
  - /community/hackathon-team-switch-event-participation

/public/showcase/{slug}-{8char-hash}
  Example:
  - /public/showcase/with-goolge-ai-studio-0504b0b0

/profile/{uuid}
  Example:
  - /profile/7aeeb654-0621-4c68-80e0-1b1680ae6b03

/user/{uuid}
  Example:
  - /user/f70adfd7-3548-46e5-93bd-7b2a9527fb4d

/u/{username}
  Example:
  - /u/daconer
  - /u/airim(에이림)  [Note: parentheses in URL]

/adventurer/{username}
  Example:
  - /adventurer/daconer
```

---

## 3. Filter & Search Interactions (Per Page)

### Home Page
- **Search:** Global search bar in nav "원정대, 해커톤, 사용자 검색..." (shared across all pages)
- **No page-specific filters**

### Basecamp (`/public/basecamp`)
**Filters:**
1. **Category tabs** (sidebar navigation buttons with counts):
   - "전체 117" - all teams
   - "해커톤 원정대 35" - hackathon teams only
   - "오픈 원정대 82" - open teams only
   - "모험가 찾기 8" - link to adventurers page (not a filter, a navigation)
2. **Search:** "원정대 검색..." textbox in main content
3. **Sort/Filter buttons:** 3 icon-only buttons (exact functions unclear from snapshot - likely sort order, status filter, view options)
4. **Layout toggle:** 2 icon-only buttons (likely grid/list view)

**Filter State Management:** Likely React state (buttons, not links with URL params). Category tabs appear to be client-side filters updating the team card list without page navigation.

**Combined Filter Behavior:** Category tab + search text likely AND-combined.

**Empty State:** Not observed (all categories have items).

### Adventurers (`/public/adventurers`)
**Filters:**
1. **Search:** "모험가 검색..." textbox
2. **Filter/Sort buttons:** 3 icon-only buttons
3. **Layout toggle:** 2 icon-only buttons (grid/list)

**Filter State:** Client-side state, no URL params visible.

### Community (`/community`)
**Filters:**
1. **Category tabs** (sidebar navigation with counts):
   - 홈 104, 잡담 10, 대회 22, 바이브코딩 7, 기타 6, 학습 37
2. **Search:** "게시글 검색..." textbox in main content
3. **Sort button:** "정렬" button (dropdown, contents not expanded)
4. **View toggle:** button (icon only) + 2 layout buttons

**Trending Widget Filters:**
- "최근 인기" collapsible with tabbed sub-filter: 일간/주간/월간

**Filter State:** Category tabs appear to be client-side state. Pagination buttons (1-5) suggest server-side pagination ("104개 중 1-20").

### Showcase (`/public/showcase`)
**Filters:**
1. **Category tabs** (sidebar navigation with counts):
   - 전체 1, 해커톤 0, 레이드 0, 개인 1
2. **Tag search:** "태그로 검색..." textbox
3. **Sort dropdown:** Combobox defaulting to "인기순" (Popularity)

**Sort Options (implied):** 인기순 (Popularity), possibly 최신순 (Latest), etc.

### Hackathon Detail Page
**Filters within tabs:**
1. **Gallery sub-tabs:** 기획서 제출 (4), 최종 웹링크 제출, 최종 솔루션 PPT 제출
2. **Board sub-tabs:** 전체, 공지, 업데이트, FAQ, 일반

---

## 4. Form Interactions

### Form 1: Global Search
- **Field:** Single textbox "원정대, 해커톤, 사용자 검색..."
- **Behavior:** Likely instant/debounced search (no submit button visible, just a search icon)
- **Scope:** Cross-entity search (teams, hackathons, users)
- **Location:** Navigation bar, all pages

### Form 2: Team Creation (원정대 만들기)
- **Trigger:** "원정대 만들기" button on Basecamp page
- **Implied Fields:**
  - Team name (required, free text)
  - Linked hackathon (dropdown/selector)
  - Visibility (비공개/공개)
  - Max members (number)
  - Join method (초대 필요 / open)
  - Team period (optional date range)
- **Validation:** Name uniqueness unknown, character limits unknown
- **Submit behavior:** Creates team, redirects to team detail or returns to basecamp
- **Success feedback:** Team appears in list with "모집중" badge

### Form 3: Hackathon Registration
- **Trigger:** "로그인하고 참가하기" button on hackathon detail
- **Pre-requisite:** Login (redirects to `/login` if unauthenticated)
- **Implied Fields:**
  - Agreement/consent checkboxes (동의사항 tab exists)
  - Participation type: individual or team
- **Success:** User registered, can access submission forms

### Form 4: Hackathon Submission (3 types)
**4a. 기획서 제출 (Planning Document):**
- File upload (document format)
- Content: service overview, page structure, system architecture, core features, user flows, development plan

**4b. 최종 웹링크 제출 (Web Link):**
- Vercel URL field (required)
- GitHub repository URL field (required)
- Validation: URLs must be externally accessible

**4c. 최종 솔루션 PPT 제출 (Solution PPT):**
- PDF file upload (converted from PPT)
- No page limit

### Form 5: Showcase Project Registration
- **URL:** `/public/showcase/new`
- **Implied Fields:**
  - Project title
  - Description
  - Category: 해커톤 / 레이드 / 개인
  - Thumbnail image upload
  - Tags
  - Content body
- **Success:** Project appears in showcase list

### Form 6: Community Post Creation
- **Trigger:** Not visible in snapshot (likely auth-gated button)
- **Implied Fields:**
  - Title
  - Category: 잡담 / 대회 / 바이브코딩 / 기타 / 학습
  - Content body (rich text: text, images, PDF, video, links)
  - Tags (hashtag format)
  - Media attachments
- **URL slug generation:** Title converted to kebab-case slug

### Form 7: Feedback Form
- **Trigger:** "피드백 보내기" button (visible on Basecamp sidebar)
- **Fields:** Unknown (button with icon only)

### Form 8: Profile Editing
- **Implied Fields:**
  - Avatar upload
  - Username
  - Roles (multi-select from predefined list)
  - Skills/Tools (multi-select)
  - AI specializations
  - Stat preferences (학습, 케미, 직무 ratings)
  - Bio text
  - GitHub connection

---

## 5. Real-time Features

### 5.1 Live Clock Display
- **Location:** Hackathon detail page, right sidebar
- **Format:** "HH:MM:SS" (05:23:02) with date "YYYY.MM.DD (요일)"
- **Label:** "현재 시간" (Current time) with clock icon
- **Behavior:** Ticking seconds counter (the snapshot captured "5" transitioning to "6" in the seconds display, shown as separate digit elements)
- **Implementation clue:** Individual digit elements suggest a flip-clock style animation

### 5.2 Countdown Timer
- **Location:** Hackathon detail page, right sidebar
- **Format:** "DD일 HH시 MM분 SS초" (18일 04시 36분 56초)
- **Label:** "마감까지" (Until deadline)
- **Behavior:** Counts down to next submission deadline
- **Phase indicator:** Shows current phase number and "X/Y" progress (e.g., "3" with "1/10")
- **Dynamic deadline display:** "3월 30일 10:00 마감" changes per current phase
- **Timeline display:** Full milestone list with dates below countdown

### 5.3 Notification System
- **Trigger:** F8 keyboard shortcut
- **Element:** `region "Notifications (F8)"` containing a `list` (observed empty on all pages)
- **Present on:** All pages (confirmed in every snapshot)
- **Behavior:** Likely a slide-out or overlay panel showing notification list
- **Content:** Empty in all snapshots (user not logged in)

### 5.4 Announcement Banner (Marquee)
- **Present on:** Basecamp, Showcase, Community pages (not Home)
- **Content:** "긴급 공지! AI 프로젝트 팀 모집 마감 임박! 지금 DAKER에서 합류하세요!"
- **Behavior:** Scrolling marquee with two identical items (suggesting infinite scroll animation)
- **Badge indicators:** "공지" badge with icon, "긴급 공지" secondary badge

### 5.5 Count Badges on Navigation
- All sidebar category tabs show live counts:
  - Basecamp: 전체 117, 해커톤 원정대 35, 오픈 원정대 82, 모험가 찾기 8
  - Community: 홈 104, 잡담 10, 대회 22, 바이브코딩 7, 기타 6, 학습 37
  - Showcase: 전체 1, 해커톤 0, 레이드 0, 개인 1
  - Hackathon detail: 리더보드 138, 갤러리 4, 기획서 제출 4

### 5.6 Relative Time Display
- Community posts show relative timestamps: "2일 전", "약 12시간 전", "9일 전", "약 1개월 전"
- Likely computed client-side with periodic refresh or on render

---

## 6. CRUD Operations per Entity

### Hackathon
| Operation | Available | Evidence |
|-----------|-----------|----------|
| **Create** | Admin only | Hackathon exists with organizer info |
| **Read (List)** | Yes (public) | Nav link to `/public/hackathons` |
| **Read (Detail)** | Yes (public) | Full detail page captured |
| **Update** | Admin only | Schedule/status management implied |
| **Delete** | Unknown | Not observed |

### Team (원정대)
| Operation | Available | Evidence |
|-----------|-----------|----------|
| **Create** | Yes (auth) | "원정대 만들기" button on Basecamp |
| **Read (List)** | Yes (public) | Basecamp page, hackathon detail sidebar |
| **Read (Detail)** | Partial | "자세히" button on completed team cards |
| **Update** | Implied | Status transitions (모집중 -> 팀빌딩완료), member management |
| **Delete** | Unknown | Not observed |

### Submission (제출물)
| Operation | Available | Evidence |
|-----------|-----------|----------|
| **Create** | Yes (auth + registered) | 3 submission types in gallery |
| **Read** | Yes | Gallery with counts, "제출 / 저장: 4건 / 15건" |
| **Update** | Implied | "저장" (Save) count separate from "제출" (Submit) suggests draft/update |
| **Delete** | Unknown | Not observed |

### Community Post
| Operation | Available | Evidence |
|-----------|-----------|----------|
| **Create** | Yes (auth) | Posts by various users exist |
| **Read (List)** | Yes (public) | Community page with pagination |
| **Read (Detail)** | Yes (public) | Post URLs as links |
| **Update** | Unknown | No edit button visible |
| **Delete** | Unknown | Not observed |
| **Like** | Yes | Like counter with icon on each post |
| **Bookmark** | Yes | Bookmark button on each post |
| **Comment** | Implied | Comment counter with icon (always 0 in snapshot) |

### Showcase Project
| Operation | Available | Evidence |
|-----------|-----------|----------|
| **Create** | Yes | "새 프로젝트 등록하기" -> `/public/showcase/new` |
| **Read (List)** | Yes (public) | Showcase page |
| **Read (Detail)** | Yes (public) | Project detail URL |
| **Update** | Unknown | Not observed |
| **Delete** | Unknown | Not observed |
| **Like** | Yes | Like counter on project cards |
| **Comment** | Implied | Comment counter on project cards |

### User Profile
| Operation | Available | Evidence |
|-----------|-----------|----------|
| **Create** | Via DACON auth | `/api/auth/dacon/login` |
| **Read** | Yes (public) | Profile URLs, adventurer cards |
| **Update** | Implied | Profile data (roles, skills, bio) editable |
| **Delete** | Unknown | Not observed |

### Adventurer (모험가)
| Operation | Available | Evidence |
|-----------|-----------|----------|
| **Create** | Implied | Users opt-in to be discoverable as adventurers |
| **Read (List)** | Yes (public) | `/public/adventurers` page |
| **Read (Detail)** | Via profile link | Links to user profile |
| **Update** | Via profile | Roles, skills, bio updated through profile |
| **Delete** | Unknown | Opt-out mechanism not observed |

---

## 7. Authentication-Gated Features

### Accessible WITHOUT Login (Public)
- Home page (full content)
- Hackathon list browsing
- Hackathon detail viewing (all tabs: overview, evaluation, rules, schedule, prizes, data)
- Basecamp browsing (team list viewing)
- Adventurer browsing
- Community post list and reading
- Showcase project list and viewing
- Theme toggling
- Notification panel access (F8)
- Global search
- Footer links

### Requires Login (Auth-Gated Actions)
- **Hackathon participation:** "로그인하고 참가하기" -> redirects to `/login`
- **Hackathon submissions:** All 3 submission types (기획서, 웹링크, PPT)
- **Team creation:** "원정대 만들기" (button visible but likely redirects/blocks)
- **Team joining:** Join request or invitation acceptance
- **Showcase project creation:** `/public/showcase/new`
- **Community post creation:** Create button not shown to anonymous users
- **Post interaction:** Likes, comments, bookmarks
- **Profile management:** Editing personal profile
- **Adventurer registration:** Opting in to be discoverable

### Content That Changes When Logged In
- Navigation: "로그인" button likely replaced with user avatar/profile dropdown
- Hackathon detail: "로그인하고 참가하기" becomes actual registration/submission buttons
- Team cards: "초대 필요" may show "합류 신청" (Join Request) for eligible users
- Community: Post creation button likely appears
- Sidebar: Personalized content (notifications, team memberships)

### API Endpoints Returning 401
- Not directly observed in snapshots, but any mutation endpoint (POST/PUT/DELETE) likely requires authentication
- `/api/auth/dacon/login` is the OAuth entry point

---

## 8. Error Handling Patterns

### 8.1 Loading States
- Community trending widget shows: "해당 기간에 게시글이 없습니다" (No posts in this period) for daily tab - this is an **empty state**, not a loading error
- "로딩 중..." (Loading...) mentioned in the task but not directly observed in snapshots

### 8.2 Known Error Incidents (from community posts)
- **Leaderboard loading error:**
  - Symptom: Page loading delay/freeze, data not displaying
  - Cause: Real-time data aggregation server overload
  - Resolution: Server-side fix, announcement posted
  - Two separate announcements: error notice + resolution notice

### 8.3 Empty States
- Showcase: Only 1 project total, 0 in 해커톤 and 레이드 categories (cards show count "0")
- Community daily trending: "해당 기간에 게시글이 없습니다"
- Adventurer cards: Some users have no role tags, no skills, no bio (e.g., "yuriluv")

### 8.4 Error Recovery Patterns
- Leaderboard issue: Manual server-side fix + community announcement pattern
- No client-side error retry mechanism observed
- No error boundary UI observed

### 8.5 404 Page
- Not observed in snapshots (would require navigating to invalid URL)

### 8.6 API Error Handling
- 401 responses likely trigger redirect to login page
- No error toast/snackbar pattern observed in snapshots

---

## 9. Keyboard Shortcuts

### Confirmed
- **F8:** Opens/closes Notifications panel (`region "Notifications (F8)"`)

### Implied/Possible
- **Escape:** Closes modal dialogs (participation guide dialog has Close button)
- **Enter:** Submit search queries
- **Tab:** Standard focus navigation (cursor=pointer attributes suggest keyboard accessibility)

### Not Observed
- No other keyboard shortcuts documented in the UI
- No keyboard shortcut help panel or documentation visible

---

## 10. Micro-interactions

### 10.1 Hover Effects on Cards
- **Team cards (Basecamp):** `[cursor=pointer]` on entire card wrapper - click navigates to detail
- **Post cards (Community):** `[cursor=pointer]` on entire card wrapper
- **Adventurer cards:** `[cursor=pointer]` on entire card wrapper
- **Showcase project card:** Entire card is a link with `[cursor=pointer]`
- **Implied:** Hover likely shows subtle elevation/shadow change (common card pattern)

### 10.2 Button Press Feedback
- All interactive elements marked with `[cursor=pointer]`
- **Buttons:** Nav buttons, filter buttons, sort buttons, CTA buttons
- **Links:** Logo, login, footer links, author names, profile links
- **Active state:** Dialog pagination dot shows `[active]` attribute on current page

### 10.3 Transition Animations
- **Announcement marquee:** Scrolling text with two identical messages (infinite scroll loop)
- **Countdown timer:** Individual digit elements for seconds suggest flip animation (digits "5" and "6" shown as separate generic elements)
- **Dialog carousel:** Participation guide has dot indicators and "Next" button suggesting slide transition
- **Theme toggle:** "테마 전환" button likely animates between light/dark modes

### 10.4 Scroll Behaviors
- **Hackathon detail sidebar:** Fixed/sticky sidebar with scrollable content sections
- **Announcement banner:** Horizontal scroll/marquee effect
- **Main content:** Standard vertical scroll with pagination (community, basecamp)
- **Scroll-to-top:** Not observed but commonly expected

### 10.5 Tooltip Patterns
- **Theme toggle:** Has a `generic` child "테마 전환" that likely appears as tooltip on hover
- **Button icons:** Many icon-only buttons without visible labels may have tooltips

### 10.6 Expandable/Collapsible Patterns
- **Hackathon detail sidebar:**
  - "대회안내" section expands to show 7 sub-tabs (개요, 평가, 규칙, 일정, 상금, 데이터, 동의사항)
  - "갤러리" section expands to show 3 submission types
  - "게시판" section expands to show 5 category tabs
  - "동의사항" tab is itself collapsible (chevron icon visible)
- **Community sidebar:**
  - "최근 인기" section: `[expanded]` state with tabbed content
  - "게시글 TOP" section: collapsed (expandable)
  - "유저 랭킹" section: collapsed (expandable)
- **Team sidebar (hackathon detail):** "+2개 더..." shows truncated list with expand option

### 10.7 Badge/Tag Overflow Pattern
- Tags with "+N" overflow indicator:
  - Community post tags: "+7", "+1"
  - Adventurer role tags: "+4", "+3", "+2", "+1"
  - Adventurer skill tags: "+11", "+14", "+3", "+8", "+4", "+2"
- Clicking "+N" likely expands to show all tags

### 10.8 Tier Badge System
- Observed tiers: Bronze, Silver (shown as img badges next to avatars)
- No Gold/Platinum observed in current data
- Tier badges appear on: adventurer cards, team member avatars in basecamp

### 10.9 Bookmark/Favorite Interaction
- **Team cards:** Heart/bookmark button in card header area
- **Community posts:** Bookmark button (icon) at end of metrics row
- **Toggle behavior:** Likely toggles saved/unsaved state with visual feedback

### 10.10 Share Interaction
- **Hackathon detail:** "공유" (Share) button with icon in header area
- **Behavior:** Likely opens share dialog or copies link to clipboard

### 10.11 Media Type Indicators
- **Community posts display media type badges:**
  - Image posts: thumbnail with no badge
  - PDF posts: PDF thumbnail + "PDF" badge with icon
  - Video posts: video thumbnail + "동영상" badge with play icon
  - Link posts: link preview image + domain text + "링크" badge with icon

### 10.12 Relative Time Updates
- Timestamps like "약 12시간 전", "2일 전", "약 1개월 전"
- Likely computed on render, may refresh on page revisit but probably not live-updating

### 10.13 Pagination Controls
- **Community page:** Full pagination with:
  - Previous arrow (disabled on first page)
  - Page number buttons (1-5)
  - Next arrow
  - Count text: "104개 중 1-20"
  - 20 items per page

### 10.14 Dialog/Modal Interactions
- **Participation Guide Dialog:**
  - Title: "해커톤 참가 가이드"
  - Subtitle: "3단계로 쉽게 참가하기"
  - 2-page carousel with dot indicators
  - "다음" (Next) button with arrow icon
  - Close button (X) with "Close" accessible label
  - Likely has backdrop overlay (dialog element)
  - Active dot indicator for current page

---

## Appendix: Component Inventory

### Shared Components (across all pages)
1. **Navigation Bar:** Logo, nav buttons, search, login, theme toggle
2. **Footer:** DACON branding, legal links, social links, company info, copyright
3. **Notification Region:** F8-triggered panel
4. **Announcement Banner:** Scrolling marquee (Basecamp, Showcase, Community)
5. **Feedback Button:** "피드백 보내기" (observed on Basecamp, possibly others)

### Page-Specific Components
| Component | Pages |
|-----------|-------|
| Hero Section | Home only |
| Stats Counter Row | Home only |
| Feature Cards (4) | Home only |
| Sidebar Category Tabs | Basecamp, Community, Showcase |
| Team Cards | Basecamp, Hackathon Detail sidebar |
| Adventurer Cards | Adventurers page |
| Post Cards | Community |
| Project Cards | Showcase |
| Real-time Clock/Countdown | Hackathon Detail |
| Schedule Timeline | Hackathon Detail |
| Evaluation Table | Hackathon Detail |
| Participation Guide Dialog | Hackathon Detail |
| Pinned Posts Section | Community |
| Trending Widget | Community |
| Pagination Controls | Community |
| Tag Search | Showcase |
| Sort Dropdown | Showcase |

---

## Appendix: URL Routing Inconsistencies

The following routing inconsistencies were observed and should be resolved in any clone implementation:

1. **Profile URLs use 4 different patterns:**
   - `/profile/{uuid}` - community author links
   - `/user/{uuid}` - adventurer card links
   - `/u/{username}` - some adventurer links
   - `/adventurer/{username}` - community author links for same user
   - Example: "이대권" links to `/u/daconer` on adventurer page but `/adventurer/daconer` on community page

2. **Public prefix inconsistency:**
   - `/public/hackathons`, `/public/basecamp`, `/public/showcase`, `/public/adventurers` use `/public/` prefix
   - `/community` does NOT use `/public/` prefix
   - Home page `/` has no prefix

3. **Login URL inconsistency:**
   - Nav bar: `/api/auth/dacon/login`
   - Hackathon detail CTA: `/login`

4. **Home page "회원가입" (Sign Up) links to `/public/hackathons`** instead of an actual registration page, suggesting DACON SSO handles user creation externally.

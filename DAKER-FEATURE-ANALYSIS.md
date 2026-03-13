# Daker.ai Comprehensive Feature Analysis

## Navigation Structure

### Top Nav (Sticky)
- **Logo**: DAKER (links to /)
- **Main Nav**: 해커톤 | 베이스캠프 | 커뮤니티 | 학습 | 쇼케이스 | 더보기(dropdown)
- **Global Search**: "원정대, 해커톤, 사용자 검색..." (unified search)
- **Auth**: 로그인 button (links to /api/auth/dacon/login)
- **Theme Toggle**: 테마 전환 (light/dark)

### Footer
- DACON logo + links (이용약관, 대회주최문의, 서비스소개, 교육문의, 채용)
- Social links: 카카오톡, 인스타그램, 유튜브, 블로그
- Company info: 데이콘(주) | 대표 | 사업자번호 | 주소 | 이메일 | 전화

---

## Page-by-Page Feature Breakdown

### 1. Home Page (`/`)
**Hero Section:**
- Mountain illustration background
- Animated stats ticker: "39개 해커톤 · 80개 원정대 · 103명 모험가"
- H1: "AI 서비스개발 히어로의 여정을 시작하세요"
- Description paragraph
- CTA buttons: "지금 시작하기" → /public/hackathons, "둘러보기" → /public/basecamp

**Stats Bar:**
- 3 stat cards with icons: 98.4만+ 제출, 23.1만+ 팀 참여, 423개 대회 개최
- Each labeled "DACON + DAKER"

**System Introduction Section:**
- H2: "DAKER 시스템 소개"
- Subtitle: "AI히어로로 성장하기 위한 모든 도구가 준비되어 있습니다."
- 4 feature cards:
  1. **프로필** - GitHub 연동, 활동 히트맵, 기술 스택 관리
  2. **원정대** - 역할 기반 팀원 모집, 해커톤 연동, 실시간 커뮤니케이션
  3. **해커톤** - 원클릭 참가, 코드/결과물 제출 관리, 전문가 심사
  4. **배지 & 랭킹** - 업적 배지, 경험치 레벨, 실시간 리더보드

**Bottom CTA:**
- "준비되셨나요? 지금 바로 데이터 모험을 떠나보세요."
- "회원가입" button

---

### 2. Hackathon List (`/public/hackathons`)
**Layout:** Left sidebar + Main content

**Left Sidebar:**
- Filter tabs with counts: 전체(2), 모집중(1), 접수대기(0), 종료(1)
- "해커톤 가이드" link

**Main Content:**
- Announcement banner (marquee-style)
- Search bar
- Sort/filter controls + view toggle (list/grid icons)
- **Hackathon Cards:**
  - Gradient thumbnail image
  - Status badge: 모집중 (blue), 종료 (gray)
  - D-day counter (D-18)
  - Organizer avatar + name
  - Title
  - 총 상금 badge (e.g., "1,000,000 원")
  - Team count, View count
  - CTA button: "참가 신청하기" / "종료됨"

---

### 3. Hackathon Detail (`/public/hackathons/[slug]`)
**Layout:** Left sidebar nav + Main content + Right sidebar

**Left Sidebar Navigation (scrollspy):**
- 대회안내
  - 개요
  - 평가
  - 규칙
  - 일정
  - 상금
  - 데이터
  - 동의사항
- 제출
  - 기획서 제출
  - 웹링크 제출
  - PPT 제출
- 리더보드 (count badge: 138)
- 갤러리 (count badge: 4)
- 게시판
  - 전체
  - 공지
  - 업데이트
  - FAQ
  - 일반

**Right Sidebar:**
- Real-time clock (HH:MM:SS)
- Countdown timer (X일 X시 X분)
- Deadline list with dates
- Team list section ("모집 중 7팀")
- "참가 신청하기" CTA button

**Main Content Sections:**

1. **대회 개요 (Overview)**
   - Title with icon
   - Description paragraphs
   - Key info: organizer, prize, period, registration period, teams, submissions, views

2. **평가 기준 (Evaluation)**
   - Table with 4 criteria: 기본구현(30), 확장/아이디어(30), 완성도(25), 문서/설명(15)
   - Detailed description per criterion
   - 단계별 평가 비율: 참가자 투표(30%) + 심사위원(70%)

3. **규칙/가이드라인 (Rules)**
   - Numbered rules list
   - Links to external docs

4. **상세 일정 (Schedule)**
   - 8 numbered timeline steps with dates
   - Visual timeline with connecting lines

5. **상금 및 혜택 (Prizes)**
   - Prize tiers with amounts in KRW

6. **데이터 설명 (Data)**
   - Data description section

7. **동의사항 (Agreements)**
   - Terms and conditions

8. **제출 (Submissions)**
   - 3 separate submission types: 기획서, 웹링크, PPT
   - Each with its own form and submission history
   - Submission count tracking

9. **리더보드 (Leaderboard)**
   - Count badge (138 entries)
   - Sortable table
   - Score breakdown

10. **갤러리 (Gallery)**
    - Project showcase cards (4 items)

11. **게시판 (Forum/Board)**
    - Category tabs: 전체, 공지, 업데이트, FAQ, 일반
    - Post list with author, date, tags, like/comment/view counts

**Participation Guide Modal:**
- 3-step guide overlay for new participants

---

### 4. Basecamp / 원정대 (`/public/basecamp`)
**Layout:** Left sidebar + Main content

**Left Sidebar:**
- H3: "베이스캠프"
- Description: "다양한 원정대를 탐색하고 팀에 합류하세요."
- Filter tabs with counts:
  - 전체 (117)
  - 해커톤 원정대 (35)
  - 오픈 원정대 (82)
  - 모험가 찾기 (8) → links to /public/adventurers
- "피드백 보내기" button

**Main Content:**
- Announcement banner (same marquee as hackathon list)
- Search bar: "원정대 검색..."
- Sort/filter/view controls (3 filter buttons + list/grid toggle)
- Action buttons: "원정대그룹 가기", "원정대 만들기"

**Team Cards (원정대 cards):**
- Linked hackathon badge (gradient strip showing hackathon name)
- Bookmark button
- Status badge: 모집중 / 팀빌딩완료
- Team creator avatar + name with tier badge (Bronze/Silver)
- Team name (heading)
- Stats: X/X명 (members), 기간 없음/deadline, view count
- Access type: "초대 필요" / "자세히" button
- Visibility: "비공개 원정대" label

**Pagination:** Page numbers + total count display

---

### 5. Adventurers / 모험가 찾기 (`/public/adventurers`)
**Layout:** Shares basecamp left sidebar + Main content

**Main Content:**
- H1: "모험가 찾기" with icon
- Description: "팀에 합류할 모험가를 찾아보세요. 총 8명의 모험가가 활동 중입니다."
- Search bar: "모험가 검색..."
- Filter/sort/view controls

**Adventurer Cards:**
- Gradient background (unique per user)
- Share button
- Username + "원정대 찾기" button
- Avatar with tier badge (Bronze/Silver)
- Role tags: Frontend Developer, Backend Developer, ML Engineer, etc.
- Skill tags: VS Code, Git, GitHub, Computer Vision, NLP, etc.
- Stat badges: 학습 X, 케미 X, 직무 X
- Bio/description text

---

### 6. Showcase (`/public/showcase`)
**Layout:** Left sidebar + Main content

**Left Sidebar:**
- H3: "쇼케이스 메뉴"
- Filter tabs with counts: 전체(1), 해커톤(0), 레이드(0), 개인(1)
- "프로젝트 등록" section with "새 프로젝트 등록하기" → /public/showcase/new

**Main Content:**
- Announcement banner
- Search bar: "태그로 검색..."
- Sort dropdown: "인기순"

**Project Cards:**
- Thumbnail image
- Category badge: 개인
- Title
- Description
- Author avatar + name
- Stats: likes, comments, views

---

### 7. Community (`/community`)
**Layout:** Left sidebar + Main content

**Left Sidebar:**
- H3: "커뮤니티 메뉴"
- Category tabs with counts: 홈(104), 잡담(10), 대회(22), 바이브코딩(7), 기타(6), 학습(37)
- **고정 게시글** (Pinned posts): 2 pinned announcements
- **최근 인기** (Trending): Expandable with 일간/주간/월간 tabs
- **게시글 TOP** (Top posts): Expandable
- **유저 랭킹** (User rankings): Expandable
- "피드백 보내기" button

**Main Content:**
- Announcement banner
- Search bar: "게시글 검색..."
- Sort + filter + view controls

**Post Cards:**
- Thumbnail/attachment preview (images, videos, PDFs, links)
- Media type badge: 동영상, PDF, 링크
- Post title
- Author avatar + name + relative time
- Tags: #공지, #해커톤, #바이브코딩, etc.
- Content preview
- Stats: likes, comments, views
- Share button

**Pagination:** Page numbers + "104개 중 1-20"

---

### 8. Learning (`/public/learn`)
- **404 page** - Not yet implemented
- Custom 404: "앗! 페이지를 찾을 수 없어요" + "홈으로 돌아가기"

---

## Cross-Cutting Features

### Authentication
- Login via DACON OAuth (/api/auth/dacon/login)
- User profiles with tiers (Bronze, Silver, etc.)
- Role-based content access

### Notifications
- Real-time WebSocket notifications
- F8 keyboard shortcut
- New content indicators on nav items

### Theme
- Light/Dark mode toggle
- Persistent preference

### Search
- Global unified search across 원정대, 해커톤, 사용자
- Per-page contextual search

### Common UI Patterns
- Announcement banner (marquee) on all list pages
- Left sidebar navigation with filter counts
- List/Grid view toggle
- Sort controls
- Pagination with total count
- Status badges with semantic colors
- Tier badges (Bronze, Silver, Gold)
- Relative time display ("2일 전", "약 1개월 전")
- Like/Comment/View counters on all content
- Share buttons
- "피드백 보내기" floating button

### Responsive Design
- Mobile-optimized layouts
- Collapsible sidebars

---

## Feature Comparison: Daker.ai vs Our Implementation

### Currently Implemented (ours)
| Feature | Status | Notes |
|---------|--------|-------|
| Home page with hero | ✅ | Has AnimatedGradientText, ShimmerButton, stats |
| Hackathon list with search/filter | ✅ | Search + status filter, grid layout |
| Hackathon detail with tabs | ✅ | 8 scrollable tabs |
| Overview section | ✅ | |
| Evaluation section | ✅ | Criteria table |
| Schedule timeline | ✅ | Pulse animation on current |
| Prize display | ✅ | Gold/silver/bronze colors |
| Info/Rules section | ✅ | |
| Submission form + history | ✅ | Dynamic form, confetti, scoring |
| Leaderboard table | ✅ | Score breakdown |
| Team list (camp page) | ✅ | With CRUD |
| Team form create/edit | ✅ | Dialog with validation |
| Global rankings page | ✅ | Aggregated leaderboards |
| Dark mode | ✅ | next-themes |
| i18n (ko/en/zh/ja) | ✅ | Custom context system |
| Error/404 pages | ✅ | |
| Magic UI animations | ✅ | DotPattern, Marquee, NumberTicker |
| localStorage data layer | ✅ | Seed from JSON |

### Missing / Gap Analysis
| Feature | Priority | Complexity | Notes |
|---------|----------|------------|-------|
| **Left sidebar layout** | HIGH | Medium | Daker uses sidebar+main layout on all list pages |
| **Announcement banner/marquee** | HIGH | Low | Scrolling notice bar on all list pages |
| **Hackathon card redesign** | HIGH | Medium | Gradient thumbnail, organizer info, prize badge, D-day, view count |
| **Right sidebar (detail page)** | HIGH | Medium | Real-time clock, countdown, deadline list, team sidebar |
| **Gallery tab (detail page)** | MEDIUM | Medium | Project showcase within hackathon |
| **Forum/Board tab (detail page)** | MEDIUM | High | Category tabs, post CRUD, comments |
| **Showcase page** | MEDIUM | Medium | Project portfolio with categories |
| **Community page** | LOW | High | Full forum with categories, pinned posts, trending, user ranking |
| **Adventurer profiles** | LOW | Medium | User cards with roles, skills, tiers |
| **User tier system** | LOW | Medium | Bronze/Silver/Gold badges |
| **Global search** | MEDIUM | Medium | Unified search across content types |
| **View toggle (list/grid)** | MEDIUM | Low | Switch between list and grid views |
| **Sort controls** | MEDIUM | Low | Multiple sort options per page |
| **Pagination** | MEDIUM | Low | Page numbers with total count |
| **Like/Comment/View counters** | LOW | Medium | Social engagement metrics |
| **Real-time clock/countdown** | HIGH | Low | Live countdown on detail page |
| **Participation guide modal** | MEDIUM | Low | 3-step onboarding overlay |
| **Scrollspy sidebar nav** | HIGH | Medium | Section navigation on detail page |
| **Multiple submission types** | HIGH | Medium | Separate 기획서/웹링크/PPT submissions |
| **Feedback button** | LOW | Low | "피드백 보내기" floating button |

### Recommended Priority Implementation Order
1. **Layout overhaul**: Left sidebar + main content layout
2. **Hackathon detail enhancement**: Right sidebar with countdown, scrollspy nav, multiple submission types
3. **Hackathon card redesign**: Match daker.ai card info density
4. **Announcement banner**: Marquee notice on list pages
5. **View toggle + sort + pagination**: Polish list pages
6. **Showcase page**: Basic project portfolio
7. **Community features**: If time permits

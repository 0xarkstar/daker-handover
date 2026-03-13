# 02 - Data Model Analysis: daker.ai Exhaustive Review

> Generated from 6 daker.ai accessibility-tree snapshots + existing codebase analysis.
> Date: 2026-03-12

---

## 1. Entity Analysis

### 1.1 Hackathon (List Item)

Visible on the hackathon list page and home page stats.

| Field | Type | Required | Display Format | Notes |
|-------|------|----------|----------------|-------|
| slug | string | Y | URL path segment (`/hackathons/{slug}`) | Used for routing |
| title | string | Y | Heading text | e.g. "월간 해커톤 : 긴급 인수인계 해커톤 - 문서만 남기고 사라졌다" |
| status | enum | Y | Badge/pill ("모집중", "접수대기", "종료") | See Enums section |
| tags | string[] | Y | Tag pills | e.g. "VibeCoding", "Web", "Vercel" |
| thumbnailUrl | string | Y | Card image | Hackathon banner/thumbnail |
| hostName | string | Y | Text under "주최" | e.g. "데이콘" |
| hostEmail | string | N | Text under host | e.g. "dacon@dacon.io" |
| hostLogoUrl | string | N | Small image next to host | Organization logo |
| totalPrizeKRW | number | Y | Formatted currency "1,000,000원" | Displayed as "상금" |
| competitionPeriod | string | Y | Date range "3/5 14:00 ~ 4/27 10:00" | Displayed as "대회 기간" |
| registrationPeriod | string | Y | Date range "3/5 14:00 ~ 3/30 10:00" | Displayed as "접수 기간" |
| teamCount | number | Y | "128팀" | Displayed as "참가 팀수" |
| submissionCount | number | Y | "4건" | Displayed as "제출" |
| saveCount | number | Y | "15건" | Displayed as "저장" |
| viewCount | number | Y | "2517" | Displayed as "조회수" |
| daysUntilDeadline | number | N | "D-18" badge | Computed from deadline |

**Relationships:**
- Has many Teams (원정대)
- Has many LeaderboardEntries
- Has many Submissions
- Has many ScheduleItems (milestones)
- Has many PrizeItems
- Has many GalleryItems
- Has many BoardPosts (게시판)

### 1.2 HackathonDetail (Full Detail Page)

The detail page has a tabbed sidebar navigation with these sections:

| Section | Sub-sections | Notes |
|---------|-------------|-------|
| 대회안내 | 개요, 평가, 규칙, 일정, 상금, 데이터, 동의사항 | Main info tabs |
| 제출 | (submission form) | Multi-step: 기획서, 웹링크, PPT |
| 리더보드 | Count badge "138" | Shows entry count |
| 갤러리 | Count badge "4" | Shows submission gallery |
| 게시판 | 전체, 공지, 업데이트, FAQ, 일반 | Discussion board with categories |

#### 1.2.1 Overview (개요)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| summary | string | Y | Rich text description |
| objectives | string[] | N | Goal bullet list |
| techRequirements | string[] | N | "개발 도구", "배포" requirements |
| dataDownloadUrl | string | N | "[제공 자료 다운로드 링크]" |

#### 1.2.2 Evaluation (평가)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| stages | EvalStage[] | Y | Multi-stage evaluation |
| criteria | EvalCriterion[] | Y | Table with 평가항목/배점/평가 포인트 |
| tiebreakers | string[] | N | 동점자 처리 기준 list |
| stageWeights | StageWeight[] | Y | Per-stage 심사위원/제출자 weight percentages |

**EvalCriterion** (from snapshot table):

| Field | Type | Example |
|-------|------|---------|
| name | string | "기본 구현" |
| score | number | 30 |
| description | string | "웹 페이지 구현도, 데이터 기반 렌더링..." |

Visible criteria from snapshot:
- 기본 구현: 30점
- 확장(아이디어): 30점
- 완성도: 25점
- 문서/설명: 15점

**StageWeight** (from snapshot):

| Field | Type | Example |
|-------|------|---------|
| stageName | string | "기획서 제출 확인" |
| judgePercent | number | 100 |
| participantPercent | number | 0 |

Three stages visible:
1. 기획서 제출 확인: 심사위원 100%
2. 최종 웹링크 제출 확인: 심사위원 100%
3. 1차 투표평가 기간: 심사위원 70% + 제출자 30%

#### 1.2.3 Rules (규칙)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| submissionRules | string[] | Y | What to submit per stage |
| developmentRules | string[] | Y | Technical constraints |
| fairnessRules | string[] | Y | 공정성/저작권 rules |
| judgingNotes | string[] | N | 심사 관련 유의사항 |

#### 1.2.4 Schedule (일정)

Each schedule item from the snapshot:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| stepNumber | number | Y | Sequential "1", "2", etc. |
| name | string | Y | e.g. "접수", "기획서 제출" |
| type | enum | Y | "기타", "제출", "평가" |
| status | enum | N | "진행중" badge (only on active items) |
| dateRange | string | Y | "3/5 14:00 ~ 3/30 10:00" |

8 schedule steps visible in the hackathon detail:
1. 접수 (기타) - 3/5 14:00 ~ 3/30 10:00 [진행중]
2. 기획서 제출 (제출) - 3/9 10:00 ~ 3/30 10:00 [진행중]
3. 기획서 제출 확인 (평가) - 3/30 10:01 ~ 3/30 10:01
4. 최종 웹링크 제출 (제출) - 3/30 10:02 ~ 4/6 10:00
5. 최종 웹링크 제출 확인 (평가) - 4/6 10:01 ~ 4/6 10:01
6. 최종 솔루션 PPT 제출 (제출) - 4/6 10:02 ~ 4/13 10:00
7. 1차 투표평가 기간 (평가) - 4/13 12:00 ~ 4/17 10:00
8. 2차 내부 평가 기간 (기타) - 4/17 10:00 ~ 4/24 23:59

#### 1.2.5 Prize (상금)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| totalPrizeDisplay | string | Y | "총 상금: 1,000,000원" |
| items | PrizeItem[] | Y | Array of rank/amount |

PrizeItem from snapshot:
- 1위 - 500,000원
- 2위 - 300,000원
- 3위 - 200,000원

#### 1.2.6 Countdown Timer (Sidebar Widget)

| Field | Type | Notes |
|-------|------|-------|
| currentTime | string | "05:23:02" display |
| currentDate | string | "2026.03.12 (목)" |
| daysRemaining | number | "18" |
| hoursRemaining | number | "04" |
| minutesRemaining | number | "36" |
| secondsRemaining | number | "56" |
| currentStep | string | "3" (step number) |
| totalSteps | string | "1/10" |
| nextDeadlineLabel | string | "3월 30일 10:00 마감" |
| upcomingDeadlines | DeadlineItem[] | List of upcoming deadlines |

DeadlineItem:
| Field | Type | Example |
|-------|------|---------|
| label | string | "기획서 제출 마감" |
| datetime | string | "3/30 10:00" |

6 upcoming deadlines visible:
1. 기획서 제출 마감 - 3/30 10:00
2. 평가 마감 - 3/30 10:01
3. 산출물 제출 마감 - 4/6 10:00
4. 평가 마감 - 4/6 10:01
5. 발표자료 제출 마감 - 4/13 10:00
6. 평가 마감 - 4/17 10:00

#### 1.2.7 Participation Guide (참가 가이드 Modal)

Three-step guide dialog:
1. "해커톤 선택 & 참가 신청" - with bullet items
2. "원정대(팀) 구성" - with bullet items
3. "작전실 및 해커톤에서 제출" - with bullet items

Plus a note: "개인 참가도 가능해요!"

### 1.3 Team/원정대 (from Basecamp)

Teams are displayed as cards in the basecamp. Two types: 해커톤 원정대 (35) and 오픈 원정대 (82), total 117.

| Field | Type | Required | Display Format | Notes |
|-------|------|----------|----------------|-------|
| id/teamCode | string | Y | Not displayed | Internal ID |
| name | string | Y | Card heading | e.g. "wow", "파댕이", "와다다" |
| hackathonTitle | string | N | Link badge at top of card | "월간 해커톤 : 긴급 인수인계..." |
| hackathonSlug | string | N | URL in badge link | For hackathon association |
| status | enum | Y | Status badge | "모집중", "팀빌딩완료", "완료" |
| visibility | enum | Y | Label | "비공개 원정대" (visible on most cards) |
| accessType | enum | Y | Badge at bottom | "초대 필요" or "자유 참가" |
| memberCount | number | Y | "1/1명", "2/3명" | current/max format |
| maxMembers | number | Y | Part of member display | Max team size |
| period | string | N | "기간 없음" | Most show "기간 없음" |
| activityScore | number | Y | Number (e.g. "4", "14") | Displayed with icon |
| leaderName | string | N | Text under avatar | Team leader name |
| leaderAvatarUrl | string | N | Small avatar image | Leader profile picture |
| leaderTier | string | N | Tier badge image | "Bronze tier", "Silver tier" |
| bookmarkIcon | boolean | N | Heart/bookmark button | On each card |

**Additional fields visible on "팀빌딩완료" cards:**
- Leader avatar with tier badge (e.g. "쉬운하나" with "Bronze tier")
- Leader name displayed prominently
- "자세히" (Details) button instead of "초대 필요"

**Sidebar counts:**
- 전체: 117
- 해커톤 원정대: 35
- 오픈 원정대: 82
- 모험가 찾기: 8

### 1.4 Adventurer/User Profile

Visible on the /public/adventurers page. 8 adventurers shown.

| Field | Type | Required | Display Format | Notes |
|-------|------|----------|----------------|-------|
| id | string (UUID) | Y | URL path `/user/{uuid}` or `/u/{username}` | Two URL patterns observed |
| displayName | string | Y | Card heading | e.g. "yuriluv", "도비콘", "이대권" |
| avatarUrl | string | N | Profile image | Circular avatar |
| tier | enum | Y | Badge overlay on avatar | "Bronze tier", "Silver tier" |
| roles | string[] | N | Tag pills (first row) | e.g. "Backend Developer", "ML Engineer", "Service 기획자", "발표자" |
| skills | string[] | N | Tag pills (second row) | e.g. "Computer Vision", "NLP", "VS Code", "Git" |
| interests | string[] | N | Tag pills (third row) | Domain interests |
| stats | StatPair[] | N | Badge pills | e.g. "학습 5", "케미 5", "직무 5" |
| bio | string | N | Paragraph text | Self-description |
| isLookingForTeam | boolean | Y | "원정대 찾기" button | Action button on card |

**StatPair format:** `{label} {value}` pairs like "학습 5", "케미 5", "직무 5"

**URL patterns observed:**
- `/user/{uuid}` - most users
- `/u/{username}` - some users (e.g. `/u/daconer`, `/u/airim(에이림)`)
- `/profile/{uuid}` - in community post author links

### 1.5 Showcase Project

From the showcase page. Categories: 전체(1), 해커톤(0), 레이드(0), 개인(1).

| Field | Type | Required | Display Format | Notes |
|-------|------|----------|----------------|-------|
| slug | string | Y | URL path `/public/showcase/{slug}` | e.g. "with-goolge-ai-studio-0504b0b0" |
| title | string | Y | Card heading | "데이콘 리더보드 with Goolge AI Studio" |
| description | string | N | Card body text | Brief summary |
| thumbnailUrl | string | Y | Card image | Project screenshot |
| category | enum | Y | Badge on card | "개인", "해커톤", "레이드" |
| authorName | string | Y | Text with avatar | "국진" |
| authorAvatarUrl | string | N | Small avatar | Author profile picture |
| likeCount | number | Y | Icon + count | "1" |
| commentCount | number | Y | Icon + count | "0" |
| viewCount | number | Y | Icon + count | "19" |

**Sidebar elements:**
- Category filter tabs with counts
- "새 프로젝트 등록하기" button (links to `/public/showcase/new`)
- Tag search textbox
- Sort dropdown ("인기순")

### 1.6 Community Post

From the community page. Total 104 posts across categories.

| Field | Type | Required | Display Format | Notes |
|-------|------|----------|----------------|-------|
| slug | string | Y | URL path `/community/{slug}` | URL-friendly identifier |
| title | string | Y | Heading | e.g. "[공지] 월간 해커톤 : 긴급 인수인계 해커톤..." |
| excerpt | string | N | Body preview text | Truncated content |
| thumbnailUrl | string | N | Card image | Optional post image |
| mediaType | enum | N | Badge overlay | "동영상", "PDF", "링크" (or none for text/image) |
| mediaFileName | string | N | Alt text on thumbnail | e.g. "Beyond_To-Do_Lists.pdf" |
| mediaUrl | string | N | Not directly visible | Link URL for 링크 type posts |
| mediaDomain | string | N | Text under thumbnail | e.g. "daschool-aistudiio-425v.vercel.app" |
| authorId | string | Y | URL in author link | `/profile/{uuid}` |
| authorName | string | Y | Text next to avatar | "DACONIO", "도비콘", "이대권" |
| authorAvatarUrl | string | N | Small circular image | Author avatar |
| relativeTime | string | Y | Text | "2일 전", "약 12시간 전", "약 1개월 전" |
| tags | string[] | N | Tag pills | "#공지", "#해커톤", "#GEMINI", "#클로드코드" |
| extraTagCount | number | N | "+7" badge | When tags overflow |
| likeCount | number | Y | Icon + count | Heart icon |
| commentCount | number | Y | Icon + count | Chat icon |
| viewCount | number | Y | Icon + count | Eye icon |
| isPinned | boolean | N | Listed in "고정 게시글" section | Pinned posts in sidebar |
| isNotice | boolean | N | "공지" badge on banner | Announcement banner |
| bookmarkButton | boolean | Y | Icon button | Save/bookmark action |

**Community sidebar elements:**
- Category navigation with counts: 홈(104), 잡담(10), 대회(22), 바이브코딩(7), 기타(6), 학습(37)
- 고정 게시글 (Pinned posts) section
- 최근 인기 (Recent popular) accordion with 일간/주간/월간 tabs
- 게시글 TOP accordion
- 유저 랭킹 accordion
- "피드백 보내기" button

**Post layout variants:**
1. Image post: thumbnail on left, content on right
2. Media post (PDF/동영상/링크): thumbnail with media type badge overlay
3. Text-only post: no thumbnail, just title and excerpt

### 1.7 Leaderboard Entry

From the hackathon detail sidebar showing "리더보드 138".

| Field | Type | Required | Display Format | Notes |
|-------|------|----------|----------------|-------|
| rank | number | Y | "#1", "#2" | Position |
| teamName | string | Y | Text | Team identifier |
| score | number | Y | Decimal or integer | e.g. 0.7421, 87.5 |
| submittedAt | string (ISO) | Y | Relative or absolute time | Submission timestamp |
| scoreBreakdown.participant | number | N | Percentage | Participant vote score |
| scoreBreakdown.judge | number | N | Percentage | Judge vote score |
| artifacts.webUrl | string | N | Link | Deployed web URL |
| artifacts.pdfUrl | string | N | Link | Solution PDF |
| artifacts.planTitle | string | N | Text | Plan document title |

### 1.8 Submission (Multi-type)

Three submission types visible in the hackathon detail sidebar:

| Submission Type | Deadline | Count Badge | Notes |
|-----------------|----------|-------------|-------|
| 기획서 제출 | 3/30 10:00 | "4" | First stage |
| 최종 웹링크 제출 | 4/6 10:00 | (none) | Second stage |
| 최종 솔루션 PPT 제출 | 4/13 10:00 | (none) | Third/final stage |

**Submission entity fields:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | string | Y | Unique identifier |
| hackathonSlug | string | Y | Parent hackathon |
| teamCode | string | Y | Submitting team |
| type | enum | Y | "plan" / "web" / "pdf" |
| content | string | Y | Text content, URL, or file URL |
| submittedAt | string (ISO) | Y | Timestamp |
| stepNumber | number | Y | Which step (1, 2, 3) |

### 1.9 Comment

Not directly visible in snapshots (comment counts are shown as "0" on most items), but the data model requires:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | string | Y | Unique identifier |
| parentType | enum | Y | "community_post" / "showcase_project" |
| parentId | string | Y | Post or project ID |
| authorId | string | Y | User who wrote it |
| authorName | string | Y | Display name |
| authorAvatarUrl | string | N | Avatar |
| content | string | Y | Comment text |
| createdAt | string (ISO) | Y | Timestamp |
| likeCount | number | Y | Default 0 |

### 1.10 Badge/Tier

Visible on adventurer cards and team leader avatars.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| tier | enum | Y | "Bronze", "Silver", "Gold", ... |
| tierImageUrl | string | Y | Badge overlay image |

Tiers observed in snapshots:
- **Bronze tier** - seen on team leaders (쉬운하나, EmperorChan, 트랩전사김고란)
- **Silver tier** - seen on adventurers (yuriluv, 스카스카, 닉네임2, 도비콘, 이대권, 쓰담쓰담해달라고, brink0, Mather)

No Gold or higher tiers observed, but the system likely supports more.

### 1.11 Schedule/Timeline Item

Detailed in section 1.2.4 above. Extended fields:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| stepNumber | number | Y | 1-8 |
| name | string | Y | Step title |
| type | enum | Y | "기타" / "제출" / "평가" |
| status | enum | N | "진행중" or absent |
| startAt | string (ISO) | Y | Period start |
| endAt | string (ISO) | Y | Period end |

### 1.12 Prize Item

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| rank | number | Y | 1, 2, 3 |
| label | string | Y | "1위", "2위", "3위" |
| emoji | string | N | Medal emoji |
| amountKRW | number | Y | Prize amount |
| amountDisplay | string | Y | "500,000 원" formatted |

### 1.13 Evaluation Criteria

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| name | string | Y | "기본 구현", "확장(아이디어)", "완성도", "문서/설명" |
| score | number | Y | 30, 30, 25, 15 |
| description | string | Y | Evaluation points |

### 1.14 Gallery Item

Visible as "갤러리 4" badge in sidebar. No detail view in snapshots but implied:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | string | Y | Unique identifier |
| hackathonSlug | string | Y | Parent hackathon |
| teamCode | string | Y | Submitting team |
| title | string | N | Gallery item title |
| thumbnailUrl | string | N | Preview image |
| webUrl | string | N | Deployed URL |
| createdAt | string (ISO) | Y | Timestamp |

### 1.15 Board Post (게시판 - Hackathon-specific)

Separate from community posts. Has categories: 전체, 공지, 업데이트, FAQ, 일반.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | string | Y | Unique identifier |
| hackathonSlug | string | Y | Parent hackathon |
| category | enum | Y | "전체" / "공지" / "업데이트" / "FAQ" / "일반" |
| title | string | Y | Post title |
| content | string | Y | Post body |
| authorId | string | Y | Author |
| createdAt | string (ISO) | Y | Timestamp |

### 1.16 Announcement Banner

Scrolling banner visible on basecamp, showcase, and community pages.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| type | string | Y | "공지" badge |
| message | string | Y | Banner text, can include emoji |
| iconUrl | string | N | Small icon image |

---

## 2. Relationship Map

```
Hackathon (1)
  ├── (*) Team/원정대          [hackathonSlug FK]
  │     ├── (*) TeamMember     [teamCode FK, userId FK]
  │     └── (*) Submission     [teamCode FK, hackathonSlug FK]
  ├── (*) LeaderboardEntry     [hackathonSlug FK]
  ├── (*) ScheduleItem         [hackathonSlug FK]
  ├── (*) PrizeItem            [hackathonSlug FK]
  ├── (*) EvalCriterion        [hackathonSlug FK]
  ├── (*) GalleryItem          [hackathonSlug FK, teamCode FK]
  └── (*) BoardPost            [hackathonSlug FK]

User/Adventurer (1)
  ├── (*) TeamMember           [userId FK]  -- many-to-many via join
  ├── (*) CommunityPost        [authorId FK]
  ├── (*) ShowcaseProject      [authorId FK]
  ├── (*) Comment              [authorId FK]
  └── (1) Badge/Tier           [computed from XP]

CommunityPost (1)
  └── (*) Comment              [parentId FK, parentType="community_post"]

ShowcaseProject (1)
  └── (*) Comment              [parentId FK, parentType="showcase_project"]
```

**Key relationship types:**
- **Hackathon <-> Team**: One-to-many. A hackathon has many teams. Some teams (오픈 원정대) may not be linked to a hackathon.
- **Team <-> User**: Many-to-many. A user can be in multiple teams. Team has a leader (displayed with avatar+tier).
- **Hackathon <-> Submission**: One-to-many via team. Multi-step submissions per team per hackathon.
- **User <-> CommunityPost**: One-to-many. Author relationship.
- **User <-> ShowcaseProject**: One-to-many. Author relationship.
- **Post/Project <-> Comment**: One-to-many. Polymorphic parent.

**Cascade behaviors implied:**
- Deleting a hackathon should cascade to teams, leaderboard, schedule, prizes, gallery, board posts
- Deleting a team should cascade to submissions and gallery items
- Deleting a user should NOT cascade posts (posts should remain with "[deleted user]" attribution)

---

## 3. Enum/Status Values

### 3.1 Hackathon Status
| Value (KR) | Value (EN) | Notes |
|------------|------------|-------|
| 모집중 | recruiting | Active, accepting participants |
| 접수대기 | upcoming | Not yet open for registration |
| 종료 | ended | Competition finished |
| 진행중 | ongoing | Competition in progress (implied) |

**Current types map:** `'ended' | 'ongoing' | 'upcoming'` -- missing "모집중" as distinct from "ongoing"

### 3.2 Team/원정대 Status
| Value (KR) | Notes |
|------------|-------|
| 모집중 | Actively recruiting members |
| 팀빌딩완료 | Team formation complete |
| 완료 | Team activity finished |

**Current types:** Only `isOpen: boolean` -- does not capture 3-state status.

### 3.3 Team Type
| Value (KR) | Notes |
|------------|-------|
| 해커톤 원정대 | Linked to a specific hackathon (35 count) |
| 오픈 원정대 | General/open team not tied to hackathon (82 count) |

**Not in current types at all.**

### 3.4 Team Visibility
| Value (KR) | Notes |
|------------|-------|
| 비공개 원정대 | Private team |
| 공개 원정대 | Public team (implied, not explicitly seen) |

**Not in current types.**

### 3.5 Team Access Type
| Value (KR) | Notes |
|------------|-------|
| 초대 필요 | Invitation required to join |
| 자유 참가 | Open to join freely |

**Not in current types.**

### 3.6 Submission Types
| Value (KR) | Key | Format |
|------------|-----|--------|
| 기획서 | plan | text_or_url |
| 웹링크 | web | url |
| PPT (PDF) | pdf | pdf_url |

### 3.7 Community Categories
| Value (KR) | Count | Notes |
|------------|-------|-------|
| 홈 | 104 | All posts |
| 잡담 | 10 | Casual chat |
| 대회 | 22 | Competition discussion |
| 바이브코딩 | 7 | Vibe coding |
| 기타 | 6 | Miscellaneous |
| 학습 | 37 | Learning |

### 3.8 Showcase Categories
| Value (KR) | Count | Notes |
|------------|-------|-------|
| 전체 | 1 | All projects |
| 해커톤 | 0 | From hackathons |
| 레이드 | 0 | From raids |
| 개인 | 1 | Personal projects |

### 3.9 Post Media Types
| Value (KR) | Notes |
|------------|-------|
| 동영상 | Video content |
| PDF | PDF document |
| 링크 | External link |
| 이미지 | Image (게시글 이미지 alt text) |
| (none) | Text-only post |

### 3.10 User Tiers
| Value | Notes |
|-------|-------|
| Bronze | Entry-level tier |
| Silver | Mid-level tier |
| Gold | High tier (implied, not observed) |
| Platinum | Top tier (implied) |
| Diamond | Highest tier (implied) |

### 3.11 Board Post Categories (Hackathon-specific)
| Value (KR) | Notes |
|------------|-------|
| 전체 | All |
| 공지 | Announcements |
| 업데이트 | Updates |
| FAQ | Frequently asked questions |
| 일반 | General discussion |

### 3.12 Schedule Item Types
| Value (KR) | Notes |
|------------|-------|
| 기타 | General/other |
| 제출 | Submission period |
| 평가 | Evaluation period |

### 3.13 Community Sort Options
| Value (KR) | Notes |
|------------|-------|
| 정렬 | Sort button (default) |

### 3.14 Showcase Sort Options
| Value (KR) | Notes |
|------------|-------|
| 인기순 | By popularity (default) |

### 3.15 Popular Post Periods
| Value (KR) | Notes |
|------------|-------|
| 일간 | Daily |
| 주간 | Weekly |
| 월간 | Monthly |

---

## 4. Current Implementation Gap Analysis

### 4.1 Fields We Have But daker.ai Does Not Show

| Our Field | Type | Notes |
|-----------|------|-------|
| `HackathonPeriod.timezone` | string | Visible indirectly in schedule but not on list card |
| `HackathonLinks.rules` | string | Exists in detail, not on list card |
| `HackathonLinks.faq` | string | Exists in detail, not on list card |
| `EvalSection.limits.maxRuntimeSec` | number | Not visible on handover hackathon |
| `EvalSection.limits.maxSubmissionsPerDay` | number | Not visible on handover hackathon |
| `RankingEntry` (entire type) | - | Cross-hackathon rankings not observed on daker.ai |

### 4.2 Fields daker.ai Shows But We Do NOT Have

**CRITICAL GAPS -- Hackathon List:**

| Missing Field | Shown As | Priority |
|---------------|----------|----------|
| hostName | "주최: 데이콘" | HIGH |
| hostEmail | "dacon@dacon.io" | MEDIUM |
| hostLogoUrl | Organization logo image | MEDIUM |
| totalPrizeKRW | "상금: 1,000,000원" | HIGH |
| competitionPeriodDisplay | "대회 기간: 3/5 14:00 ~ 4/27 10:00" | HIGH |
| registrationPeriodDisplay | "접수 기간: 3/5 14:00 ~ 3/30 10:00" | HIGH |
| teamCount | "참가 팀수: 128팀" | HIGH |
| submissionCount | "제출: 4건" | HIGH |
| saveCount | "저장: 15건" | MEDIUM |
| viewCount | "조회수: 2517" | HIGH |

**CRITICAL GAPS -- Hackathon Detail:**

| Missing Field | Shown As | Priority |
|---------------|----------|----------|
| evalCriteria[] (table) | 평가항목/배점/평가 포인트 table | HIGH |
| stageWeights[] | Per-stage judge/participant weights | HIGH |
| tiebreakers[] | 동점자 처리 기준 | MEDIUM |
| rules.submissionRules | 제출물 rules | HIGH |
| rules.developmentRules | 개발/배포 규칙 | HIGH |
| rules.fairnessRules | 공정성/저작권 | MEDIUM |
| rules.judgingNotes | 심사 관련 유의사항 | MEDIUM |
| dataSection | 데이터 explanation | LOW |
| agreementSection | 동의사항 | LOW |
| countdownTimer fields | Real-time countdown widget | HIGH |
| participationGuide | 3-step guide modal content | MEDIUM |
| dataDownloadUrl | 제공 자료 다운로드 링크 | MEDIUM |

**CRITICAL GAPS -- Team/원정대:**

| Missing Field | Shown As | Priority |
|---------------|----------|----------|
| status (3-state) | "모집중" / "팀빌딩완료" / "완료" | HIGH |
| teamType | "해커톤 원정대" / "오픈 원정대" | HIGH |
| visibility | "비공개 원정대" / "공개 원정대" | HIGH |
| accessType | "초대 필요" / "자유 참가" | HIGH |
| maxMembers | Part of "2/3명" display | HIGH |
| activityScore | Number with icon | MEDIUM |
| leaderAvatarUrl | Team leader avatar | HIGH |
| leaderName | Team leader name | HIGH |
| leaderTier | "Bronze tier" / "Silver tier" | MEDIUM |
| period | "기간 없음" or date range | LOW |

**ENTIRELY MISSING ENTITY TYPES:**

| Entity | Priority | Notes |
|--------|----------|-------|
| User/Adventurer | HIGH | Full user profiles with roles, skills, stats, bio, tier |
| CommunityPost | HIGH | Community section with categories, media, tags |
| ShowcaseProject | HIGH | Showcase section with categories |
| Comment | MEDIUM | For community posts and showcase projects |
| GalleryItem | MEDIUM | Hackathon gallery ("갤러리 4") |
| BoardPost | MEDIUM | Hackathon-specific discussion board |
| AnnouncementBanner | LOW | Scrolling notice banner |
| EvalCriterion (standalone) | HIGH | Evaluation criteria table |
| ScheduleItem (extended) | HIGH | With stepNumber, type, status, dateRange |

### 4.3 Type Mismatches

| Field | Our Type | daker.ai Actual | Issue |
|-------|----------|-----------------|-------|
| Hackathon.status | `'ended' \| 'ongoing' \| 'upcoming'` | Should include `'recruiting'` (모집중) | Missing enum value |
| Team.isOpen | `boolean` | 3-state enum: 모집중/팀빌딩완료/완료 | Wrong type entirely |
| Team.memberCount | `number` | Displayed as "current/max" (e.g. "2/3명") | Missing maxMembers |
| Milestone.at | Single datetime | Shown as date range "start ~ end" | Missing startAt/endAt pair |
| PrizeItem.place | `string` ("1st") | Korean format "1위" with emoji | Display format mismatch |
| Submission.items | `Record<string, string>` | Multi-step typed submissions | Missing step/type structure |

---

## 5. Suggested TypeScript Types

```typescript
// ===== Enums =====

/** Hackathon lifecycle status */
export type HackathonStatus = 'recruiting' | 'upcoming' | 'ongoing' | 'ended'

/** Team recruitment status */
export type TeamStatus = 'recruiting' | 'team_complete' | 'completed'

/** Team category */
export type TeamType = 'hackathon' | 'open'

/** Team visibility */
export type TeamVisibility = 'public' | 'private'

/** Team access control */
export type TeamAccessType = 'invite_only' | 'open_join'

/** User tier based on XP/achievements */
export type UserTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond'

/** Community post category */
export type CommunityCategory = 'home' | 'casual' | 'competition' | 'vibe_coding' | 'etc' | 'learning'

/** Showcase project category */
export type ShowcaseCategory = 'all' | 'hackathon' | 'raid' | 'personal'

/** Media type for community posts */
export type PostMediaType = 'video' | 'pdf' | 'link' | 'image' | 'none'

/** Hackathon board post category */
export type BoardCategory = 'all' | 'notice' | 'update' | 'faq' | 'general'

/** Schedule item type */
export type ScheduleItemType = 'submission' | 'evaluation' | 'other'

/** Submission step type */
export type SubmissionStepType = 'plan' | 'web' | 'pdf'

/** Sort option */
export type SortOption = 'popular' | 'recent' | 'oldest'

/** Popular period filter */
export type PopularPeriod = 'daily' | 'weekly' | 'monthly'

/** Locale */
export type Locale = 'ko' | 'en' | 'zh' | 'ja'


// ===== User/Adventurer =====

/** User stat pair (e.g. "학습 5") */
export interface UserStat {
  /** Stat label in Korean */
  readonly label: string
  /** Stat numeric value */
  readonly value: number
}

/** User/Adventurer profile */
export interface User {
  /** Unique identifier (UUID) */
  readonly id: string
  /** Optional username for URL-friendly profile path */
  readonly username?: string
  /** Display name */
  readonly displayName: string
  /** Profile avatar URL */
  readonly avatarUrl?: string
  /** Achievement tier */
  readonly tier: UserTier
  /** Professional roles (e.g. "Backend Developer", "ML Engineer") */
  readonly roles: readonly string[]
  /** Technical skills (e.g. "Computer Vision", "VS Code", "Git") */
  readonly skills: readonly string[]
  /** Activity stats (e.g. {label: "학습", value: 5}) */
  readonly stats: readonly UserStat[]
  /** Self-introduction text */
  readonly bio?: string
  /** Whether the user is looking for a team */
  readonly isLookingForTeam: boolean
  /** Account creation timestamp */
  readonly createdAt: string
}


// ===== Hackathon List =====

/** Host/organizer information */
export interface HackathonHost {
  /** Organization name */
  readonly name: string
  /** Contact email */
  readonly email?: string
  /** Organization logo URL */
  readonly logoUrl?: string
}

/** Hackathon list item */
export interface Hackathon {
  /** URL-friendly identifier */
  readonly slug: string
  /** Full title */
  readonly title: string
  /** Current lifecycle status */
  readonly status: HackathonStatus
  /** Topic/technology tags */
  readonly tags: readonly string[]
  /** Card thumbnail image URL */
  readonly thumbnailUrl: string
  /** Host/organizer info */
  readonly host: HackathonHost
  /** Total prize pool in KRW */
  readonly totalPrizeKRW: number
  /** Competition period start (ISO 8601) */
  readonly competitionStartAt: string
  /** Competition period end (ISO 8601) */
  readonly competitionEndAt: string
  /** Registration period start (ISO 8601) */
  readonly registrationStartAt: string
  /** Registration period end (ISO 8601) */
  readonly registrationEndAt: string
  /** Timezone for display (e.g. "Asia/Seoul") */
  readonly timezone: string
  /** Number of participating teams */
  readonly teamCount: number
  /** Number of submissions made */
  readonly submissionCount: number
  /** Number of saves/bookmarks */
  readonly saveCount: number
  /** Page view count */
  readonly viewCount: number
}


// ===== Hackathon Detail =====

/** Evaluation criteria row (from the scoring table) */
export interface EvalCriterion {
  /** Criterion name (e.g. "기본 구현") */
  readonly name: string
  /** Score weight (e.g. 30) */
  readonly score: number
  /** Description of what is evaluated */
  readonly description: string
}

/** Per-stage evaluation weight breakdown */
export interface StageWeight {
  /** Stage name (e.g. "기획서 제출 확인") */
  readonly stageName: string
  /** Judge weight percentage (0-100) */
  readonly judgePercent: number
  /** Participant/submitter weight percentage (0-100) */
  readonly participantPercent: number
}

/** Evaluation section */
export interface EvalSection {
  /** Metric name (e.g. "FinalScore") */
  readonly metricName: string
  /** Description of how scoring works */
  readonly description: string
  /** Score source type (e.g. "vote") */
  readonly scoreSource?: string
  /** Score display configuration */
  readonly scoreDisplay?: {
    readonly label: string
    readonly breakdown: readonly ScoreBreakdownItem[]
  }
  /** Evaluation criteria table rows */
  readonly criteria: readonly EvalCriterion[]
  /** Per-stage weight breakdowns */
  readonly stageWeights: readonly StageWeight[]
  /** Tiebreaker rules in order of priority */
  readonly tiebreakers: readonly string[]
  /** Limits on submissions */
  readonly limits?: {
    readonly maxRuntimeSec?: number
    readonly maxSubmissionsPerDay?: number
  }
}

export interface ScoreBreakdownItem {
  readonly key: string
  readonly label: string
  readonly weightPercent: number
}

/** Schedule/timeline item with full date range */
export interface ScheduleItem {
  /** Sequential step number */
  readonly stepNumber: number
  /** Step name (e.g. "접수", "기획서 제출") */
  readonly name: string
  /** Step category */
  readonly type: ScheduleItemType
  /** Period start (ISO 8601) */
  readonly startAt: string
  /** Period end (ISO 8601) */
  readonly endAt: string
}

/** Prize item with Korean display format */
export interface PrizeItem {
  /** Rank number (1, 2, 3) */
  readonly rank: number
  /** Display label (e.g. "1위") */
  readonly label: string
  /** Prize amount in KRW */
  readonly amountKRW: number
}

/** Rules section */
export interface RulesSection {
  /** What to submit at each stage */
  readonly submissionRules: readonly string[]
  /** Technical/deployment constraints */
  readonly developmentRules: readonly string[]
  /** Fairness and copyright rules */
  readonly fairnessRules: readonly string[]
  /** Judging-specific notes */
  readonly judgingNotes: readonly string[]
}

/** Submission item definition (what can be submitted) */
export interface SubmissionItemDef {
  /** Unique key (e.g. "plan", "web", "pdf") */
  readonly key: string
  /** Display title */
  readonly title: string
  /** Expected format */
  readonly format: string
  /** Submission deadline (ISO 8601) */
  readonly deadline?: string
}

/** Team policy for a hackathon */
export interface TeamPolicy {
  readonly allowSolo: boolean
  readonly maxTeamSize: number
}

/** Hackathon overview */
export interface OverviewSection {
  /** Summary description (rich text/markdown) */
  readonly summary: string
  /** Team size policy */
  readonly teamPolicy: TeamPolicy
  /** Goal/objective bullet points */
  readonly objectives?: readonly string[]
  /** Technical requirements */
  readonly techRequirements?: readonly string[]
  /** URL to download provided materials */
  readonly dataDownloadUrl?: string
}

/** Data section */
export interface DataSection {
  /** Description of provided data (or "본 대회의 경우 데이터를 제공하지 않습니다.") */
  readonly description: string
}

/** Submit section */
export interface SubmitSection {
  /** Allowed file/artifact types */
  readonly allowedArtifactTypes: readonly string[]
  /** Submission page URL */
  readonly submissionUrl: string
  /** Step-by-step submission guide */
  readonly guide: readonly string[]
  /** Defined submission items with deadlines */
  readonly items: readonly SubmissionItemDef[]
}

/** Leaderboard section config */
export interface LeaderboardSection {
  /** Public leaderboard URL */
  readonly publicLeaderboardUrl: string
  /** Note about leaderboard behavior */
  readonly note: string
  /** Total entry count for badge display */
  readonly entryCount?: number
}

/** All sections of hackathon detail */
export interface HackathonSections {
  readonly overview: OverviewSection
  readonly eval: EvalSection
  readonly rules: RulesSection
  readonly schedule: readonly ScheduleItem[]
  readonly prizes: readonly PrizeItem[]
  readonly data?: DataSection
  readonly submit: SubmitSection
  readonly leaderboard: LeaderboardSection
  readonly teams: {
    readonly campEnabled: boolean
    readonly listUrl: string
  }
}

/** Full hackathon detail */
export interface HackathonDetail {
  readonly slug: string
  readonly title: string
  readonly host: HackathonHost
  readonly sections: HackathonSections
}


// ===== Team/원정대 =====

/** Team/원정대 entity */
export interface Team {
  /** Unique team identifier */
  readonly teamCode: string
  /** Associated hackathon (null for open teams) */
  readonly hackathonSlug?: string
  /** Associated hackathon title (for display on card) */
  readonly hackathonTitle?: string
  /** Team name */
  readonly name: string
  /** Team type */
  readonly teamType: TeamType
  /** Recruitment status */
  readonly status: TeamStatus
  /** Visibility */
  readonly visibility: TeamVisibility
  /** How to join */
  readonly accessType: TeamAccessType
  /** Current member count */
  readonly memberCount: number
  /** Maximum member capacity */
  readonly maxMembers: number
  /** Activity period display (or "기간 없음") */
  readonly periodDisplay?: string
  /** Activity/engagement score */
  readonly activityScore: number
  /** Roles the team is looking for */
  readonly lookingFor: readonly string[]
  /** Team introduction text */
  readonly intro: string
  /** Team leader user ID */
  readonly leaderId?: string
  /** Team leader display name */
  readonly leaderName?: string
  /** Team leader avatar URL */
  readonly leaderAvatarUrl?: string
  /** Team leader tier */
  readonly leaderTier?: UserTier
  /** Contact method */
  readonly contact: {
    readonly type: string
    readonly url: string
  }
  /** Creation timestamp */
  readonly createdAt: string
}


// ===== Community Post =====

/** Community post entity */
export interface CommunityPost {
  /** URL-friendly slug */
  readonly slug: string
  /** Post title */
  readonly title: string
  /** Content body (may be truncated for list view) */
  readonly content: string
  /** Content excerpt for list display */
  readonly excerpt?: string
  /** Post category */
  readonly category: CommunityCategory
  /** Thumbnail image URL */
  readonly thumbnailUrl?: string
  /** Media type indicator */
  readonly mediaType: PostMediaType
  /** Media file name (for PDF posts) */
  readonly mediaFileName?: string
  /** Media URL (for link-type posts) */
  readonly mediaUrl?: string
  /** Media domain display (e.g. "daschool-aistudiio-425v.vercel.app") */
  readonly mediaDomain?: string
  /** Author user ID */
  readonly authorId: string
  /** Author display name */
  readonly authorName: string
  /** Author avatar URL */
  readonly authorAvatarUrl?: string
  /** Post tags (e.g. "#공지", "#해커톤") */
  readonly tags: readonly string[]
  /** Like count */
  readonly likeCount: number
  /** Comment count */
  readonly commentCount: number
  /** View count */
  readonly viewCount: number
  /** Whether post is pinned */
  readonly isPinned: boolean
  /** Creation timestamp (ISO 8601) */
  readonly createdAt: string
}


// ===== Showcase Project =====

/** Showcase project entity */
export interface ShowcaseProject {
  /** URL-friendly slug */
  readonly slug: string
  /** Project title */
  readonly title: string
  /** Project description */
  readonly description?: string
  /** Thumbnail/screenshot URL */
  readonly thumbnailUrl: string
  /** Project category */
  readonly category: ShowcaseCategory
  /** Author user ID */
  readonly authorId: string
  /** Author display name */
  readonly authorName: string
  /** Author avatar URL */
  readonly authorAvatarUrl?: string
  /** Like count */
  readonly likeCount: number
  /** Comment count */
  readonly commentCount: number
  /** View count */
  readonly viewCount: number
  /** Creation timestamp (ISO 8601) */
  readonly createdAt: string
}


// ===== Comment =====

/** Comment entity (polymorphic parent) */
export interface Comment {
  /** Unique identifier */
  readonly id: string
  /** Parent entity type */
  readonly parentType: 'community_post' | 'showcase_project'
  /** Parent entity identifier (slug or ID) */
  readonly parentId: string
  /** Author user ID */
  readonly authorId: string
  /** Author display name */
  readonly authorName: string
  /** Author avatar URL */
  readonly authorAvatarUrl?: string
  /** Comment text */
  readonly content: string
  /** Like count */
  readonly likeCount: number
  /** Creation timestamp (ISO 8601) */
  readonly createdAt: string
}


// ===== Leaderboard =====

/** Leaderboard entry artifacts */
export interface LeaderboardArtifacts {
  /** Deployed web URL */
  readonly webUrl: string
  /** Solution PDF URL */
  readonly pdfUrl: string
  /** Plan document title */
  readonly planTitle: string
}

/** Single leaderboard entry */
export interface LeaderboardEntry {
  /** Position rank */
  readonly rank: number
  /** Team name */
  readonly teamName: string
  /** Final composite score */
  readonly score: number
  /** Submission timestamp (ISO 8601) */
  readonly submittedAt: string
  /** Optional score breakdown by voter type */
  readonly scoreBreakdown?: {
    readonly participant: number
    readonly judge: number
  }
  /** Optional submitted artifacts */
  readonly artifacts?: LeaderboardArtifacts
}

/** Leaderboard data for a hackathon */
export interface LeaderboardData {
  /** Parent hackathon slug */
  readonly hackathonSlug: string
  /** Last update timestamp (ISO 8601) */
  readonly updatedAt: string
  /** Ranked entries */
  readonly entries: readonly LeaderboardEntry[]
}


// ===== Submission (user-generated) =====

/** Individual submission */
export interface Submission {
  /** Unique identifier */
  readonly id: string
  /** Parent hackathon slug */
  readonly hackathonSlug: string
  /** Submitting team code */
  readonly teamCode: string
  /** Submission step type */
  readonly type: SubmissionStepType
  /** Step number (1=plan, 2=web, 3=pdf) */
  readonly stepNumber: number
  /** Submitted content (text, URL, or file URL) */
  readonly content: string
  /** Optional notes */
  readonly notes?: string
  /** Submission timestamp (ISO 8601) */
  readonly submittedAt: string
}


// ===== Gallery Item =====

/** Gallery item (hackathon submission showcase) */
export interface GalleryItem {
  /** Unique identifier */
  readonly id: string
  /** Parent hackathon slug */
  readonly hackathonSlug: string
  /** Submitting team code */
  readonly teamCode: string
  /** Team name for display */
  readonly teamName: string
  /** Gallery item title */
  readonly title?: string
  /** Preview thumbnail URL */
  readonly thumbnailUrl?: string
  /** Deployed web URL */
  readonly webUrl?: string
  /** Creation timestamp (ISO 8601) */
  readonly createdAt: string
}


// ===== Board Post (Hackathon-specific) =====

/** Hackathon discussion board post */
export interface BoardPost {
  /** Unique identifier */
  readonly id: string
  /** Parent hackathon slug */
  readonly hackathonSlug: string
  /** Post category */
  readonly category: BoardCategory
  /** Post title */
  readonly title: string
  /** Post content body */
  readonly content: string
  /** Author user ID */
  readonly authorId: string
  /** Author display name */
  readonly authorName: string
  /** Creation timestamp (ISO 8601) */
  readonly createdAt: string
}


// ===== Announcement Banner =====

/** Scrolling announcement banner */
export interface AnnouncementBanner {
  /** Unique identifier */
  readonly id: string
  /** Badge type label (e.g. "공지") */
  readonly type: string
  /** Banner message text */
  readonly message: string
  /** Optional icon URL */
  readonly iconUrl?: string
  /** Whether banner is active */
  readonly isActive: boolean
}
```

---

## 6. Seed Data Requirements

### 6.1 Current Seed Files (4 files)

| File | Entity | Count | Status |
|------|--------|-------|--------|
| `public_hackathons.json` | Hackathon[] | 3 | Needs field additions |
| `public_hackathon_detail.json` | HackathonDetail + extras | 3 | Needs major restructuring |
| `public_leaderboard.json` | LeaderboardData + extras | 3 | Adequate |
| `public_teams.json` | Team[] | 4 | Needs field additions |

### 6.2 Additional Seed Files Needed

| File | Entity | Suggested Count | Structure |
|------|--------|-----------------|-----------|
| `public_users.json` | User[] | 8-10 | Match the 8 adventurers from snapshot |
| `public_community_posts.json` | CommunityPost[] | 15-20 | Mix of categories, media types |
| `public_showcase_projects.json` | ShowcaseProject[] | 3-5 | At least 1 per category |
| `public_comments.json` | Comment[] | 10-15 | Spread across posts/projects |
| `public_announcements.json` | AnnouncementBanner[] | 2 | Match the scrolling banners |
| `public_gallery_items.json` | GalleryItem[] | 4 | Match "갤러리 4" count |
| `public_board_posts.json` | BoardPost[] | 5-8 | Mix of hackathon board categories |

### 6.3 Suggested Structures

**public_users.json:**
```json
[
  {
    "id": "f70adfd7-3548-46e5-93bd-7b2a9527fb4d",
    "username": null,
    "displayName": "yuriluv",
    "avatarUrl": "https://example.com/avatars/yuriluv.png",
    "tier": "Silver",
    "roles": [],
    "skills": [],
    "stats": [],
    "bio": null,
    "isLookingForTeam": true,
    "createdAt": "2026-01-15T10:00:00+09:00"
  }
]
```

**public_community_posts.json:**
```json
[
  {
    "slug": "monthly-hackathon-emergency-handover-documents",
    "title": "[공지] 월간 해커톤 : 긴급 인수인계 해커톤...",
    "content": "월간 해커톤 바로가기...",
    "excerpt": "월간 해커톤 바로가기...",
    "category": "home",
    "thumbnailUrl": "https://example.com/post-img/1.png",
    "mediaType": "none",
    "authorId": "7aeeb654-0621-4c68-80e0-1b1680ae6b03",
    "authorName": "DACONIO",
    "authorAvatarUrl": "https://example.com/avatars/daconio.png",
    "tags": ["#공지", "#해커톤"],
    "likeCount": 1,
    "commentCount": 0,
    "viewCount": 529,
    "isPinned": true,
    "createdAt": "2026-03-10T10:00:00+09:00"
  }
]
```

**public_showcase_projects.json:**
```json
[
  {
    "slug": "with-goolge-ai-studio-0504b0b0",
    "title": "데이콘 리더보드 with Goolge AI Studio",
    "description": "데이콘 리더보드 with Goolge AI Studio",
    "thumbnailUrl": "https://example.com/showcase/1.png",
    "category": "personal",
    "authorId": "author-uuid",
    "authorName": "국진",
    "authorAvatarUrl": "https://example.com/avatars/kukjin.png",
    "likeCount": 1,
    "commentCount": 0,
    "viewCount": 19,
    "createdAt": "2026-03-01T10:00:00+09:00"
  }
]
```

---

## 7. localStorage Schema

### 7.1 Complete Key-Value Design

| Key | Type | Description |
|-----|------|-------------|
| `hackathons` | `Hackathon[]` | Hackathon list items |
| `hackathonDetails` | `Record<slug, HackathonDetail>` | Keyed by hackathon slug |
| `teams` | `Team[]` | All teams across all hackathons |
| `leaderboards` | `Record<slug, LeaderboardData>` | Keyed by hackathon slug |
| `submissions` | `Submission[]` | All user submissions |
| `users` | `User[]` | All user/adventurer profiles |
| `communityPosts` | `CommunityPost[]` | All community posts |
| `showcaseProjects` | `ShowcaseProject[]` | All showcase projects |
| `comments` | `Comment[]` | All comments (polymorphic) |
| `galleryItems` | `GalleryItem[]` | Hackathon gallery items |
| `boardPosts` | `BoardPost[]` | Hackathon discussion board posts |
| `announcements` | `AnnouncementBanner[]` | Active announcement banners |
| `currentUser` | `User \| null` | Currently logged-in user (for demo) |
| `bookmarks` | `Record<entityType, string[]>` | User bookmarks by entity type |
| `likes` | `Record<entityType, string[]>` | User likes by entity type |
| `seeded` | `boolean` | Whether initial seed data has been loaded |
| `theme` | `'light' \| 'dark'` | UI theme preference |
| `locale` | `Locale` | Language preference |

### 7.2 Access Patterns

| Operation | Key(s) | Pattern |
|-----------|--------|---------|
| List hackathons | `hackathons` | Read full array, filter/sort client-side |
| Get hackathon detail | `hackathonDetails[slug]` | Direct key lookup |
| List teams for hackathon | `teams` | Filter by `hackathonSlug` |
| List teams by type | `teams` | Filter by `teamType` |
| Get leaderboard | `leaderboards[slug]` | Direct key lookup, entries pre-sorted |
| Submit artifact | `submissions` | Append to array |
| List community posts | `communityPosts` | Filter by `category`, sort by `createdAt` |
| Search posts | `communityPosts` | Filter by title/content/tags match |
| List showcase projects | `showcaseProjects` | Filter by `category` |
| Get comments for post | `comments` | Filter by `parentType` + `parentId` |
| List adventurers | `users` | Filter by `isLookingForTeam` |
| Toggle like | `likes[type]` | Add/remove ID from set |
| Toggle bookmark | `bookmarks[type]` | Add/remove ID from set |

### 7.3 Size Estimation

| Key | Estimated Entries | ~Size per Entry | ~Total |
|-----|-------------------|-----------------|--------|
| hackathons | 3-5 | 500B | 2.5KB |
| hackathonDetails | 3-5 | 3KB | 15KB |
| teams | 20-30 | 400B | 12KB |
| leaderboards | 3 x 10 entries | 200B | 6KB |
| submissions | 5-20 | 300B | 6KB |
| users | 8-15 | 600B | 9KB |
| communityPosts | 20-50 | 800B | 40KB |
| showcaseProjects | 3-10 | 400B | 4KB |
| comments | 10-30 | 200B | 6KB |
| galleryItems | 4-10 | 200B | 2KB |
| boardPosts | 5-15 | 500B | 7.5KB |
| announcements | 2-3 | 150B | 450B |
| **Total** | | | **~110KB** |

Well within the 5-10MB localStorage limit across browsers. No partitioning needed.

---

## Appendix A: Navigation Structure (from all snapshots)

Main navigation tabs (consistent across all pages):
1. **해커톤** - Hackathon list and detail
2. **베이스캠프** - Team/원정대 listing
3. **커뮤니티** - Community posts
4. **학습** - Learning content (not in snapshots)
5. **쇼케이스** - Showcase projects
6. **더보기** - More (dropdown)

Global elements:
- Search bar: "원정대, 해커톤, 사용자 검색..."
- Login button: links to `/api/auth/dacon/login`
- Theme toggle: light/dark mode
- DAKER logo: links to `/`

## Appendix B: Platform Statistics (from Home Page)

| Metric | Value | Source |
|--------|-------|--------|
| 제출 (Submissions) | 98.4만+ | DACON + DAKER |
| 팀 참여 (Team participations) | 23.1만+ | DACON + DAKER |
| 대회 개최 (Competitions hosted) | 423개 | DACON + DAKER |
| 해커톤 | 39개 | DAKER only |
| 원정대 | 80개 | DAKER only |
| 모험가 | 103명 | DAKER only |

## Appendix C: Footer Information

- Company: 데이콘(주)
- CEO: 김국진
- Business registration: 699-81-01021
- Address: 서울특별시 영등포구 은행로 3 익스콘벤처타워 901호
- Email: dacon@dacon.io
- Phone: 070-4102-0545
- Social links: 카카오톡, 인스타그램, 유튜브, 블로그

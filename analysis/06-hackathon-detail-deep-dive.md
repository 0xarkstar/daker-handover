# 06. Hackathon Detail Page - Ultra-Deep Analysis

> Source: daker.ai snapshot (`daker-hackathon-detail-snapshot.md`)
> Target: `/app/src/app/hackathons/[slug]/page.tsx` and child components
> Date: 2026-03-12

---

## 1. Page Layout Architecture

### Observation 1.1 - Three-Column Layout
Daker uses a 3-column layout: left sidebar navigation + center main content + right sidebar with timer/deadlines. Our implementation uses a single-column `max-w-6xl` centered layout with horizontal `Tabs`. This is the **single largest architectural divergence** from the reference.

### Observation 1.2 - Column Proportions
From the DOM tree, the left nav is a `complementary` landmark (roughly 220-240px fixed), the main content area is fluid (takes remaining space), and the right sidebar is roughly 280-320px fixed. Total layout is bounded by a max-width container.

### Observation 1.3 - Sticky Left Sidebar
The left navigation sits inside a `complementary` ARIA role and is sticky-positioned. It stays visible as the user scrolls through the long main content area. Our implementation has no left sidebar at all.

### Observation 1.4 - Sticky Right Sidebar
The right sidebar containing the clock, countdown timer, deadline list, and team recruitment is also sticky. It persists on screen during scroll. We have no right sidebar.

### Observation 1.5 - Main Content Scrolling
The center column is the only scrollable region. Content sections are rendered as vertically-stacked blocks (not tab-swapped), meaning all sections (overview, eval, rules, schedule, prizes, data, consent) are visible on a single scroll. Our `TabsContent` approach hides all sections except the active one.

### Observation 1.6 - Section Anchoring
Each content section has an anchor target. The left sidebar buttons scroll the viewport to the matching section (`#overview`, `#eval`, etc.) via scrollspy. Our implementation uses Radix Tabs which are not anchor-based.

### Observation 1.7 - Content Area Above Sections
Before the sectioned content, daker shows: share button, status badge ("모집중"), h1 title, description paragraph, host info card (logo + name + email), stats bar (prize amount, period, registration period, team count, submission count, view count), and a CTA block. Our page shows only breadcrumb, h1 + badge, then tabs.

### Observation 1.8 - No Horizontal Tab Bar
Daker has zero horizontal tab bars. All navigation is vertical in the left sidebar. Our `TabsList` with 8 horizontal triggers is not present in the reference.

### Observation 1.9 - Footer Visibility
Daker's `contentinfo` footer with company details, social links, and legal info is visible below the 3-column layout. Our layout likely renders whatever the app shell footer is.

### Observation 1.10 - Share Button Placement
A share button with icon sits at the top-right of the content area, above the title. Our implementation has no share functionality.

---

## 2. Left Sidebar Navigation (15+ observations)

### Observation 2.1 - Collapsible Section Groups
"대회안내" is a collapsible group that expands to show 7 sub-items: 개요, 평가, 규칙, 일정, 상금, 데이터, 동의사항. The chevron icon (`img`) next to it indicates expand/collapse. Our tabs are flat with no grouping.

### Observation 2.2 - Sub-Items Under 대회안내
The 7 sub-items are: 개요 (overview), 평가 (eval), 규칙 (rules), 일정 (schedule), 상금 (prize), 데이터 (data), 동의사항 (consent). Our implementation is missing: 규칙 (rules), 데이터 (data), 동의사항 (consent) as dedicated sections.

### Observation 2.3 - 제출 (Submit) as Top-Level Item
"제출" sits at the same level as "대회안내" - it is NOT nested. It is a single button, not a group. Our implementation has it as a tab.

### Observation 2.4 - 리더보드 with Count Badge "138"
The leaderboard nav item shows a numeric badge "138" indicating number of entries. Our implementation has no count badge on tabs.

### Observation 2.5 - 갤러리 with Count Badge "4" and Expandable Sub-Navigation
"갤러리" shows count "4" and has a chevron for expansion. When expanded, it shows 3 submission types as sub-items, each with their own count and deadline:
- 기획서 제출 (4) - 3/30 10:00
- 최종 웹링크 제출 - 4/6 10:00
- 최종 솔루션 PPT 제출 - 4/13 10:00

Our implementation has no gallery section at all.

### Observation 2.6 - Gallery Sub-Items Show Submission Deadlines
Each gallery sub-item displays its deadline date inline (e.g., "3/30 10:00"), providing at-a-glance awareness of upcoming deadlines without navigating to the schedule.

### Observation 2.7 - Gallery Sub-Items Show Submission Counts
"기획서 제출" sub-item shows count "4" as a badge, indicating how many submissions have been made for that artifact type.

### Observation 2.8 - 게시판 (Forum) with Expandable Sub-Categories
"게시판" is a top-level item with chevron. Expands to show 5 category filters: 전체, 공지, 업데이트, FAQ, 일반. Our implementation has no forum section.

### Observation 2.9 - Navigation Item Visual States
Active/current items have distinct styling. The buttons use generic container nesting suggesting background color or text weight changes for the active state.

### Observation 2.10 - Scrollspy Behavior
As the user scrolls the main content, the corresponding left nav item highlights. This is implied by the "navigation" ARIA role and the button-per-section structure.

### Observation 2.11 - Left Sidebar Width and Padding
The sidebar is narrow (approximately 200-240px) to maximize content area. Items are vertically stacked with compact padding.

### Observation 2.12 - Nesting Depth Indication
Sub-items under collapsible groups are indented. The DOM shows deeper nesting for sub-items (additional `generic` wrappers).

### Observation 2.13 - Icon Usage in Gallery Sub-Items
Each gallery submission type sub-item has an `img` icon preceding the text, visually distinguishing submission types.

### Observation 2.14 - "참가 가이드 보기" Button in Left Sidebar Area
Below the navigation tree, there is a "참가 가이드 보기" button with an icon that opens a modal dialog. This is a call-to-action embedded in the sidebar. Our implementation has no participation guide.

### Observation 2.15 - Team Recruitment Section Below Nav
Below the nav and guide button, there is a "모집 중 (7)" section showing recruiting teams with avatars, team names, and member counts (e.g., "4/5", "3/4", "2/3"). This is part of the left sidebar area, not the right sidebar. Our implementation shows teams only inside a tab.

### Observation 2.16 - Team Recruitment Cards Show Avatars
Each recruiting team shows two img elements (likely team leader avatar and a status icon) plus team name and member fraction (current/max).

### Observation 2.17 - "+2개 더..." Overflow Text
When there are more than 5 recruiting teams, a "+2개 더..." text link appears to show more. This is a truncated list with expand capability.

---

## 3. Right Sidebar (15+ observations)

### Observation 3.1 - Real-Time Clock Display
Shows "현재 시간" label with a clock icon, displaying "05:23:02" in HH:MM:SS format, and the date "2026.03.12 (목)" with day of week.

### Observation 3.2 - Countdown Timer - "마감까지"
Large countdown display showing days/hours/minutes/seconds until the next deadline. Format: "18 일 04 시 36 분 56 초" with each digit/unit pair in its own styled container.

### Observation 3.3 - Timer Digit Styling
Each digit is displayed in its own `generic` container with large bold styling. Labels (일, 시, 분, 초) are in smaller text below or beside the digits.

### Observation 3.4 - Seconds Display with Flip Animation
The seconds counter shows two separate digit containers ("5" and "6"), suggesting a flip-clock style animation for the seconds digits. This is a distinctive UI pattern.

### Observation 3.5 - Submission Progress Indicator
Shows "3 1/10" suggesting a progress indicator - possibly the current submission phase (3rd) and submission count (1 out of 10 allowed).

### Observation 3.6 - Countdown Target Label
"3월 30일 10:00 마감" explicitly states what the countdown is counting down to.

### Observation 3.7 - Deadline Information List
A structured list of 7 deadline items:
1. 기획서 제출 마감 - 3/30 10:00
2. 평가 마감 - 3/30 10:01
3. 산출물 제출 마감 - 4/6 10:00
4. 평가 마감 - 4/6 10:01
5. 발표자료 제출 마감 - 4/13 10:00
6. 평가 마감 - 4/17 10:00
7. 대회 마감 - 4/13 10:00

Our implementation has no deadline sidebar at all.

### Observation 3.8 - Deadline List is Context-Aware
The deadlines listed in the sidebar correspond to the hackathon's phases. The countdown dynamically targets the nearest upcoming deadline.

### Observation 3.9 - Sticky Positioning
The right sidebar stays fixed in the viewport as content scrolls. It sits alongside the scrollable content area.

### Observation 3.10 - Information Hierarchy
The right sidebar follows a clear hierarchy: current time (context) -> countdown (urgency) -> deadline list (detail) -> team recruitment (action). Each serves a distinct purpose.

### Observation 3.11 - No CTA Button in Right Sidebar
The "참가 신청하기" CTA is NOT in the right sidebar. Instead, the CTA block appears in the main content area as "로그인하고 참가하기" with a D-18 badge. The right sidebar is purely informational.

### Observation 3.12 - Clock Icon Preceding "현재 시간"
An `img` icon precedes the "현재 시간" label, consistent with the icon + text pattern used throughout the page.

### Observation 3.13 - Date Format with Day of Week
The date "2026.03.12 (목)" includes the Korean day-of-week abbreviation in parentheses, aiding at-a-glance comprehension.

### Observation 3.14 - Timer Units as Separate Styled Elements
"일", "시", "분", "초" are each in their own `generic` container, allowing independent styling (smaller font, different color, etc.).

### Observation 3.15 - Multiple Deadlines Per Phase
The deadline list pairs submission deadlines with evaluation deadlines (e.g., "기획서 제출 마감 3/30 10:00" followed by "평가 마감 3/30 10:01"), showing the complete lifecycle per phase.

---

## 4. Content Sections - Element by Element (50+ observations)

### 4A. Header Area (before sections)

### Observation 4.1 - Share Button
Top-right positioned button with icon + "공유" text. No equivalent in our implementation.

### Observation 4.2 - Status Badge
"모집중" badge with an icon, displayed before the title. Our implementation shows the badge after the title.

### Observation 4.3 - Title as h1
`heading [level=1]` with the full hackathon title: "월간 해커톤 : 긴급 인수인계 해커톤 - 문서만 남기고 사라졌다". Our implementation has this.

### Observation 4.4 - Description Paragraph
A subtitle paragraph below the title explaining the hackathon. Our implementation does not show this in the header area; it is inside the overview tab.

### Observation 4.5 - Host Information Card
Shows host logo (img), "주최" label, "데이콘" name, and "dacon@dacon.io" email. This is a distinct card below the title. Our implementation has no host info display.

### Observation 4.6 - Stats Bar with 6 Data Points
A horizontal bar showing:
- 상금: 1,000,000원
- 대회 기간: 3/5 14:00 ~ 4/27 10:00
- 접수 기간: 3/5 14:00 ~ 3/30 10:00
- 참가 팀수: 128팀
- 제출 / 저장: 4건 / 15건
- 조회수: 2517

Our implementation has none of these stats. This is critical missing context.

### Observation 4.7 - CTA Block with D-Day Badge
A prominent CTA area showing "참가 신청 가능", "마감까지 D-18 남았습니다", and a "로그인하고 참가하기" link button with arrow icon. Our implementation has no CTA block.

### 4B. 개요 (Overview) Section

### Observation 4.8 - Section Heading Format
Each section heading follows the pattern: icon (img) + text label. "대회 개요" uses this pattern. Our implementation uses `CardTitle` text only.

### Observation 4.9 - Nested List Structure for Overview
The overview uses a nested bullet list with categories: 대회소개 (with 3 sub-bullets), 목표 (with 2 sub-bullets), 기술/환경 (with 2 sub-bullets). Our implementation renders a flat `summary` string with `whitespace-pre-wrap`.

### Observation 4.10 - Download Link in Overview
An h2 heading with a link "[제공 자료 다운로드 링크]" pointing to a ZIP file on daker CDN. Our implementation has no download link capability.

### Observation 4.11 - Rich Markdown-like Content
The overview content includes headings (h3), nested lists, bold text, and external links. Our `OverviewSection` type only has `summary: string` which cannot represent this rich structure.

### 4C. 평가 (Evaluation) Section

### Observation 4.12 - Section Heading: "평가 기준"
Uses icon + "평가 기준" text. Our `HackathonEval` uses a Card with `t('eval.metric')` title.

### Observation 4.13 - Two-Phase Evaluation Description
Lists: 1차 평가 (vote-based: 참가팀 30% + 심사위원 70%), then top 10 teams get 2차 내부 심사위원 정성평가 (100%). Our `EvalSection` type has `metricName` and `description` which are flat strings, not structured phase descriptions.

### Observation 4.14 - Evaluation Criteria Table
A full HTML table with columns: 평가항목 | 배점 | 평가 포인트. Four rows:
1. 기본 구현 (30) - web page implementation, data rendering, filter/sort, empty state UI
2. 확장(아이디어) (30) - originality, practical UX improvement
3. 완성도 (25) - usability, stability, performance, accessibility/responsive
4. 문서/설명 (15) - planning clarity, PPT explanation, reproducibility

Our `EvalSection.scoreDisplay.breakdown` only has `key`, `label`, `weightPercent`. It is missing the detailed description column (평가 포인트).

### Observation 4.15 - Tiebreaker Rules
Three tiebreaker criteria listed below the table: judge vote count, unused vote count, earliest upload time. Our type system has no field for tiebreaker rules.

### Observation 4.16 - Phase-Based Evaluation Ratios Section
A separate sub-section "단계별 평가 비율" with visual ratio bars for each phase:
- 기획서 제출 확인: 심사위원 100%
- 최종 웹링크 제출 확인: 심사위원 100%
- 1차 투표평가 기간: 심사위원 70% + 제출자 30%

Each shows a stacked bar with labeled percentages. Our implementation has no visual ratio/bar display.

### 4D. 규칙 (Rules) Section

### Observation 4.17 - Section Heading: "규칙/가이드라인"
Uses icon + "규칙/가이드라인" text. Our implementation has NO rules section at all.

### Observation 4.18 - Rules Content Structure
Three sub-sections with h3 headings:
1. "규칙" - submission requirements (기획서, 웹 페이지, 솔루션 설명 자료 PDF, 개발/배포 규칙)
2. "공정성/저작권" - copyright and fairness rules
3. "심사 관련 유의사항" - judging notes

### Observation 4.19 - Rules Detail Level
The rules section has deeply nested lists. For example, "웹 페이지" sub-item has two requirements: "Vercel 배포 URL(필수)" and "Github 저장소 링크(필수)". This level of detail is not representable in our current types.

### Observation 4.20 - Rules Is a Dedicated Section
Rules is NOT combined with Info. It has its own nav item under 대회안내. Our `HackathonInfo` component shows notices and links but does not contain structured rules.

### 4E. 일정 (Schedule) Section

### Observation 4.21 - Section Heading: "상세 일정" with Subtitle
Heading: icon + "상세 일정" + subtitle text "해커톤의 전체 일정을 확인하세요". Our `HackathonSchedule` has no subtitle.

### Observation 4.22 - Timeline with Numbered Steps
Each milestone has a circled number ("1", "2", ..., "8") as a step indicator, not just a dot. Our implementation uses colored dots.

### Observation 4.23 - Timeline Item Structure
Each item shows: step number | heading (event name) | status badge ("진행중") | category label (기타/제출/평가) | date range (3/5 14:00 ~ 3/30 10:00).

### Observation 4.24 - Status Badges on Timeline Items
Active items show "진행중" badge. Our implementation calculates status (past/current/future) but does not render a text badge.

### Observation 4.25 - Category Labels on Timeline Items
Each milestone has a category: 기타, 제출, 평가. Our `Milestone` type only has `name` and `at`. It lacks `category` and `status` fields.

### Observation 4.26 - Date Ranges Not Single Points
Daker shows date ranges (start ~ end) for each milestone. Our `Milestone.at` is a single ISO string. Milestones with duration need `startAt` and `endAt`.

### Observation 4.27 - 8 Timeline Items
Daker shows 8 steps: 접수, 기획서 제출, 기획서 제출 확인, 최종 웹링크 제출, 최종 웹링크 제출 확인, 최종 솔루션 PPT 제출, 1차 투표평가 기간, 2차 내부 평가 기간.

### 4F. 상금 (Prize) Section

### Observation 4.28 - Section Heading with Total Prize
Heading: icon + "상금 및 혜택" + subtitle "총 상금: 1,000,000원". Our `HackathonPrize` shows just "상금" as CardTitle.

### Observation 4.29 - Prize Content with Emoji Formatting
Uses emoji medals and structured text:
- "수상자 혜택" as bold sub-heading
- 1위 - 500,000 원
- 2위 - 300,000 원
- 3위 - 200,000 원

Our implementation uses `PrizeItem.place` as "1st"/"2nd"/"3rd" with color mapping, which is a different format than daker's Korean emoji style.

### Observation 4.30 - Total Prize in Section Header
The total prize amount appears in the section heading area, not inside the content. Our implementation has no total prize display.

### 4G. 데이터 (Data) Section

### Observation 4.31 - Data Section Exists as Dedicated Section
Daker has a "데이터 설명" section with its own icon. Content: "본 대회의 경우 데이터를 제공하지 않습니다." Our implementation has NO data section.

### Observation 4.32 - Data Section is Always Present
Even when there is no data to provide, the section is still shown with a descriptive message. This is important for consistency.

### 4H. 동의사항 (Consent/Agreement) Section

### Observation 4.33 - Consent Section is Collapsible
The "동의사항" section has a chevron icon indicating it is collapsible/expandable. The actual consent content is not expanded in the snapshot (no child content visible).

### Observation 4.34 - Consent Section Exists
Our implementation has NO consent section. This is a potentially legally-required section for hackathon participation.

---

## 5. Submission System Analysis (15+ observations)

### Observation 5.1 - Three Separate Submission Types
Daker has 3 distinct submission phases visible in the gallery nav:
1. 기획서 제출 (planning document) - deadline 3/30 10:00
2. 최종 웹링크 제출 (web link) - deadline 4/6 10:00
3. 최종 솔루션 PPT 제출 (PPT/PDF) - deadline 4/13 10:00

Our `SubmitSection.submissionItems` array treats these as flat items in a single form.

### Observation 5.2 - Submissions Tied to Gallery
In daker, submission types appear under the "갤러리" nav section, NOT under "제출". The "갤러리" section with count badge "4" contains the 3 submission type sub-items. This implies gallery = showcase of submitted artifacts.

### Observation 5.3 - Per-Submission-Type Deadlines
Each submission type has its own deadline (3/30, 4/6, 4/13). Our `SubmissionItem` type has no deadline field.

### Observation 5.4 - Per-Submission-Type Count
"기획서 제출" shows count "4", meaning 4 teams have submitted their planning documents. Other types show no count, implying zero submissions. Our type has no per-item count.

### Observation 5.5 - Submission Appears Under Both 제출 Nav and 갤러리 Nav
The "제출" nav item is where you submit. The "갤러리" nav item is where you view submitted artifacts. This is a two-sided system: create vs. browse.

### Observation 5.6 - Our Single Submit Form is Oversimplified
Our `HackathonSubmit` renders one form with teamName + notes + generic items. Daker separates each submission type into its own phase with its own form, deadline, and file format requirements.

### Observation 5.7 - File Upload vs Link Input Distinction
"기획서 제출" implies file upload (planning doc), "최종 웹링크 제출" implies URL input, "최종 솔루션 PPT 제출" implies file upload (PDF). Our implementation uses `Input` elements for all, with no file upload capability.

### Observation 5.8 - Submission History Display
Our implementation shows "이전 제출 내역" as a simple list. Daker shows submission count in the gallery navigation badge system. The history UI pattern differs.

### Observation 5.9 - Phase-Gated Submissions
Submission phases have sequential non-overlapping date ranges (기획서: 3/9~3/30, 웹링크: 3/30~4/6, PPT: 4/6~4/13). Only the current phase's submission should be active. Our implementation has no phase gating.

### Observation 5.10 - Our Confetti on Submit
Our implementation fires a confetti animation on submit. Daker shows no evidence of this. This is something we have that daker does not.

### Observation 5.11 - Score Generation on Submit
Our implementation auto-generates a score (`Math.max(50, 100 - existingCount * 5)`) and adds a leaderboard entry on submit. Daker's leaderboard is populated by evaluation results, not auto-generated scores.

### Observation 5.12 - No Team Name Input in Daker Submit
Daker's submission is tied to the logged-in user's team. There is no manual "team name" input. Our implementation has a free-text team name field.

### Observation 5.13 - Submission Count Display "4건 / 15건"
The stats bar shows "제출 / 저장: 4건 / 15건" differentiating between final submissions and draft saves. Our implementation has no save/draft concept.

### Observation 5.14 - Edit/Delete Capabilities
Implied by having separate submission phases - previous submissions can be viewed but the snapshot does not show explicit edit/delete buttons. The phase-based structure suggests resubmission within the deadline window.

### Observation 5.15 - Score/Feedback Display
The evaluation sections show ratio bars with percentages. Feedback appears tied to the evaluation phase, not inline with submissions. Our implementation shows no feedback mechanism.

---

## 6. Leaderboard Analysis (10+ observations)

### Observation 6.1 - Leaderboard Count Badge "138"
The nav shows "138" entries in the leaderboard. Our implementation shows no count.

### Observation 6.2 - Leaderboard Content Not Expanded in Snapshot
The snapshot does not show the leaderboard content area expanded, but the nav structure confirms it exists as a top-level section.

### Observation 6.3 - Our Leaderboard Table Structure
Our implementation has 7 columns: rank, team, score, time, participant score, judge score, artifacts. The artifacts column has Web and PDF links. This structure seems reasonable but may differ from daker's actual table.

### Observation 6.4 - Missing Medal Icons
Our leaderboard renders rank as plain numbers. Daker likely uses medal icons or special styling for top 3 ranks (common pattern).

### Observation 6.5 - Missing Pagination
Our implementation renders all entries in a single table. With 138 entries, pagination or virtual scrolling is necessary.

### Observation 6.6 - Missing Sort Capability
Our table headers are static. Daker likely allows sorting by score, submission time, etc.

### Observation 6.7 - Score Formatting
Our implementation displays `entry.score` as a raw number. Daker may use formatted scores with decimal places or percentage notation.

### Observation 6.8 - Team Name as Link
Our implementation renders team names as plain text. Daker likely links team names to team profiles.

### Observation 6.9 - Artifact Links Match Gallery
The leaderboard's artifact links (Web URL, PDF) correspond to the gallery submission types. Our `LeaderboardArtifacts` type has `webUrl`, `pdfUrl`, `planTitle`.

### Observation 6.10 - No Empty State Differentiation
Our empty state shows a generic "no data" message. Daker may show different messaging based on whether the evaluation phase has started.

---

## 7. Gallery Section Analysis (10+ observations)

### Observation 7.1 - Gallery Section Exists
Daker has a dedicated "갤러리" section with count badge "4". Our implementation has NO gallery section or component.

### Observation 7.2 - Gallery as Submission Showcase
The gallery appears to be where submitted artifacts are publicly viewable. It is the read-side of the submission system.

### Observation 7.3 - Gallery Sub-Navigation by Submission Type
3 sub-categories matching the 3 submission types, each navigable from the left sidebar.

### Observation 7.4 - Card Layout Implied
With 4 items and the "갤러리" label, a card-based layout is expected (project thumbnails, team names, scores).

### Observation 7.5 - Project Metadata
Each gallery item likely shows: team name, project title, submission time, thumbnail (for web submissions), and links.

### Observation 7.6 - Gallery Count Per Type
"기획서 제출" sub-item shows count "4" while others show no count. This suggests gallery items are categorized and countable per type.

### Observation 7.7 - Interaction Options
Gallery items likely have: view, vote (during 1차 투표평가), and possibly comment capabilities.

### Observation 7.8 - Gallery is Missing from Our Types
`HackathonSections` has no `gallery` field. This is a missing type definition.

### Observation 7.9 - Gallery Relates to Voting
The "1차 투표평가 기간" evaluation phase involves participants voting on gallery items. The gallery is the voting surface.

### Observation 7.10 - Empty State by Type
When a submission type has zero entries (웹링크, PPT), the gallery sub-section presumably shows an empty state.

---

## 8. Forum/Board Section Analysis (10+ observations)

### Observation 8.1 - Forum Section Exists
Daker has "게시판" as a top-level nav item with expandable sub-categories. Our implementation has NO forum section.

### Observation 8.2 - Five Category Tabs
전체 (all), 공지 (announcements), 업데이트 (updates), FAQ, 일반 (general). These are filter buttons in the left sidebar.

### Observation 8.3 - Forum is Per-Hackathon
The forum is scoped to the hackathon, not a global community forum. Posts are contextual to this competition.

### Observation 8.4 - Post List Structure
Expected structure: post title, author, date, comment count, category badge. The snapshot does not show expanded forum content.

### Observation 8.5 - Announcements Category
"공지" category implies admin/organizer posts with important notices. This is a one-to-many communication channel.

### Observation 8.6 - FAQ Category
"FAQ" suggests curated Q&A content that may be pre-populated by organizers.

### Observation 8.7 - Updates Category
"업데이트" suggests rule changes, deadline extensions, or clarifications posted during the hackathon.

### Observation 8.8 - General Category
"일반" is for participant-to-participant discussion.

### Observation 8.9 - Forum is Missing from Our Types
`HackathonSections` has no `forum` or `board` field.

### Observation 8.10 - Moderation Features
Admin categories (공지, 업데이트) imply role-based post creation. Only organizers should post announcements.

---

## 9. Participation Guide Modal (observations)

### Observation 9.1 - Modal Dialog
`dialog "해커톤 참가 가이드"` is a proper dialog element with heading and close button. Our implementation has no modal.

### Observation 9.2 - 3-Step Guide
Three numbered steps:
1. "해커톤 선택 & 참가 신청" - select hackathon, agree to terms, choose individual/team
2. "원정대(팀) 구성" - create team or join existing team
3. "작전실 및 해커톤에서 제출" - collaborate in workspace, submit before deadline

### Observation 9.3 - Each Step Has Sub-List
Each step has a heading, description paragraph, and 3-item bulleted list of specific actions.

### Observation 9.4 - "개인 참가도 가능해요!" Note
A highlighted note section with icon explaining that individual participation is possible (join team later).

### Observation 9.5 - Pagination Dots
Two dot indicators (`button [active]` + `button`) suggest the modal has 2 pages/slides. A "다음" (next) button with arrow navigates between them.

### Observation 9.6 - Close Button
Standard modal close button with "Close" text and icon.

---

## 10. Gap Analysis vs Our Implementation

### 10A. `page.tsx` - Page Shell

| # | Gap | Severity |
|---|-----|----------|
| G1 | **Layout: single-column vs 3-column** - Complete architecture mismatch | CRITICAL |
| G2 | **Tab-based vs scroll-based navigation** - Tabs hide content; daker shows all sections on scroll | CRITICAL |
| G3 | **No left sidebar navigation** - Missing scrollspy, collapsible groups, count badges | CRITICAL |
| G4 | **No right sidebar** - Missing clock, countdown timer, deadline list | HIGH |
| G5 | **No stats bar** - Missing prize, period, teams, submissions, views | HIGH |
| G6 | **No host info card** - Missing organizer name, logo, email | MEDIUM |
| G7 | **No description paragraph** in header area | MEDIUM |
| G8 | **No share button** | LOW |
| G9 | **No CTA block** with D-day badge and login button | HIGH |
| G10 | **No participation guide modal** | MEDIUM |
| G11 | **Breadcrumb exists but daker does not show one** - We have extra | LOW |
| G12 | **Status badge placement** - ours is after h1, daker's is before h1 | LOW |

### 10B. `hackathon-overview.tsx`

| # | Gap | Severity |
|---|-----|----------|
| G13 | **Flat summary string vs structured nested lists** - Overview content is markdown-like with headings, nested lists, bold text, links | CRITICAL |
| G14 | **No download link** for provided materials | HIGH |
| G15 | **Team policy shown as separate card** - Daker does not separate team policy; it is part of rules | LOW |
| G16 | **Missing icon in section heading** | MEDIUM |

### 10C. `hackathon-eval.tsx`

| # | Gap | Severity |
|---|-----|----------|
| G17 | **Missing evaluation criteria table** with 3 columns (항목/배점/포인트) | CRITICAL |
| G18 | **Missing phase-based evaluation ratio bars** (visual stacked bars per phase) | HIGH |
| G19 | **Missing tiebreaker rules** | MEDIUM |
| G20 | **Missing multi-phase evaluation description** (1차 vote + 2차 internal) | HIGH |
| G21 | **ScoreBreakdownItem missing description field** for "평가 포인트" | HIGH |
| G22 | **EvalSection type too flat** - needs structured phases, criteria table, tiebreaker | HIGH |

### 10D. `hackathon-schedule.tsx`

| # | Gap | Severity |
|---|-----|----------|
| G23 | **Numbered steps vs dots** - Daker uses circled numbers, we use colored dots | MEDIUM |
| G24 | **Missing status badges** ("진행중") on active milestones | HIGH |
| G25 | **Missing category labels** (기타/제출/평가) per milestone | MEDIUM |
| G26 | **Single date vs date range** - `Milestone.at` is one timestamp; daker shows ranges | HIGH |
| G27 | **Missing section subtitle** "해커톤의 전체 일정을 확인하세요" | LOW |

### 10E. `hackathon-prize.tsx`

| # | Gap | Severity |
|---|-----|----------|
| G28 | **Missing total prize in header** "총 상금: 1,000,000원" | MEDIUM |
| G29 | **English place names** ("1st") vs Korean emoji format (🥇1위) | MEDIUM |
| G30 | **Missing "수상자 혜택" sub-heading** | LOW |

### 10F. `hackathon-info.tsx`

| # | Gap | Severity |
|---|-----|----------|
| G31 | **Info section is a catch-all** - Daker splits into separate rules, data, and consent sections | HIGH |
| G32 | **No structured rules content** with sub-headings and nested lists | HIGH |
| G33 | **Links section not present in daker's equivalent** - daker has rules inline, not as external links | MEDIUM |

### 10G. `hackathon-teams.tsx`

| # | Gap | Severity |
|---|-----|----------|
| G34 | **Teams in sidebar vs tab** - Daker shows recruiting teams in the left sidebar area, not as a tab | HIGH |
| G35 | **Missing avatar images** for teams | MEDIUM |
| G36 | **Missing member fraction display** (e.g., "4/5" current/max) | MEDIUM |
| G37 | **Missing "+N개 더..." overflow** for truncated team lists | LOW |
| G38 | **"팀 만들기" button placement** - ours is in tab header, daker's is contextual | LOW |

### 10H. `hackathon-submit.tsx`

| # | Gap | Severity |
|---|-----|----------|
| G39 | **Single form vs phase-gated multi-form** - Daker has 3 separate submission phases | CRITICAL |
| G40 | **No per-submission-type deadline** | HIGH |
| G41 | **No file upload capability** - only text inputs | HIGH |
| G42 | **Free-text team name vs auth-linked** | MEDIUM |
| G43 | **Auto-score generation is fake** - `100 - count*5` is not realistic | HIGH |
| G44 | **Confetti exists but daker does not have it** - we have extra polish | NOTE |
| G45 | **No draft/save distinction** | MEDIUM |

### 10I. `hackathon-leaderboard.tsx`

| # | Gap | Severity |
|---|-----|----------|
| G46 | **No pagination** for 138+ entries | HIGH |
| G47 | **No sort capability** on columns | MEDIUM |
| G48 | **No medal icons/special styling** for top 3 | MEDIUM |
| G49 | **No team name linking** to team profiles | LOW |
| G50 | **No count badge** on tab/nav | LOW |

### 10J. Entirely Missing Components

| # | Missing Component | Severity |
|---|-------------------|----------|
| G51 | **Gallery section** (갤러리) - submission showcase, voting surface | CRITICAL |
| G52 | **Forum/Board section** (게시판) - with 5 category tabs | HIGH |
| G53 | **Rules section** (규칙) - dedicated, not merged with info | HIGH |
| G54 | **Data section** (데이터) - even if content is "no data provided" | MEDIUM |
| G55 | **Consent/Agreement section** (동의사항) - collapsible | MEDIUM |
| G56 | **Left sidebar navigation component** with scrollspy | CRITICAL |
| G57 | **Right sidebar timer component** with live clock and countdown | CRITICAL |
| G58 | **Participation guide modal** with 3-step walkthrough | MEDIUM |
| G59 | **Stats bar component** showing 6 data points | HIGH |
| G60 | **Host info card component** | MEDIUM |

---

## 11. Type System Gaps

| Current Type | Missing Fields / Concepts |
|---|---|
| `OverviewSection` | Needs rich content (markdown or structured blocks), not just `summary: string` |
| `EvalSection` | Needs: evaluation phases array, criteria table (item + score + description), tiebreaker rules, phase ratio bars data |
| `Milestone` | Needs: `startAt`, `endAt` (range), `category` (기타/제출/평가), `status` (진행중/예정/완료) |
| `PrizeSection` | Needs: `totalAmountKRW`, benefit description text |
| `SubmissionItem` | Needs: `deadline`, `submissionCount`, `format` distinction (file upload vs URL) |
| `HackathonSections` | Missing: `rules`, `data`, `consent`, `gallery`, `forum` sections |
| `Hackathon` | Missing: `description`, `hostName`, `hostEmail`, `hostLogoUrl`, `teamCount`, `submissionCount`, `viewCount`, `registrationPeriod` |
| `LeaderboardEntry` | Missing: pagination metadata, gallery link |
| `Team` | Missing: `avatarUrl`, `maxMembers`, `currentMembers` (fraction display) |

---

## 12. Summary of Critical Gaps (Priority Order)

1. **3-column layout with sticky sidebars** - The entire page architecture must change from single-column tabs to 3-column scrollspy layout
2. **Left sidebar navigation with scrollspy** - Collapsible groups, count badges, active state tracking
3. **Right sidebar with live timer** - Clock, countdown, deadline list
4. **Scroll-based section rendering** - All sections visible on one page, not hidden behind tabs
5. **Gallery section** - Missing entirely, needed for submission showcase and voting
6. **Rules section** - Missing entirely, contains critical competition rules
7. **Phase-gated submission system** - 3 separate phases with deadlines, not one generic form
8. **Rich content in overview** - Markdown/structured content, not flat string
9. **Evaluation criteria table** - Full table with description column, ratio bars
10. **Stats bar** - 6 data points above the fold for at-a-glance context
11. **Forum/Board section** - Missing entirely
12. **Data and Consent sections** - Missing entirely

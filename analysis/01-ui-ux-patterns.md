# DAKER UI/UX Pattern Analysis

Exhaustive analysis of daker.ai across 8 pages: Home, Hackathons (public list), Hackathon Detail, Basecamp, Showcase, Community, Adventurers (모험가 찾기), and 404 error page. Based on accessibility tree snapshots and full-page screenshots captured 2026-03-12.

---

## 1. Layout System (35 observations)

### Global Container
1. **Max-width constraint**: The entire site uses a centered max-width container. From screenshots, the content area appears constrained to approximately 1200px on desktop, with consistent horizontal padding on both sides.
2. **Full-bleed exceptions**: The Home hero section (mountain illustration + headline) spans the full viewport width with a light blue/sky gradient background that bleeds edge-to-edge. The footer also uses a full-bleed light gray background.
3. **Header height**: The global navigation bar is a single fixed-height row, approximately 56-64px tall, containing logo, nav buttons, search, login, and theme toggle. Consistent across all pages.
4. **Header position**: The header appears fixed/sticky at the top of viewport based on its consistent appearance across all screenshots regardless of scroll position.

### Sidebar + Content Layout (Interior Pages)
5. **Two-column layout**: All interior pages (Hackathons, Basecamp, Showcase, Community, Adventurers) use a left sidebar + right main content layout. The sidebar is rendered as a `<complementary>` (aside) landmark and the content as a nested `<main>`.
6. **Sidebar width**: From the screenshots, the sidebar occupies approximately 240-280px (roughly 20-22% of viewport width on desktop). The content area takes the remaining space.
7. **Sidebar sticky behavior**: The sidebar appears to be sticky-positioned -- it remains visible while the main content scrolls. Evidence: the basecamp screenshot shows many cards scrolled below while the sidebar filter tabs remain at the top-left.
8. **Sidebar content structure**: Each sidebar follows a consistent pattern: (a) page title as h3, (b) optional description paragraph, (c) filter navigation tabs with counts, (d) optional CTA card, (e) optional additional widgets.
9. **Sidebar CTA cards**: Both Hackathons and Showcase sidebars include a bottom CTA card with an icon, heading (e.g., "해커톤 가이드", "프로젝트 등록"), and a link/button ("자세히 알아보기", "새 프로젝트 등록하기").

### Home Page Layout
10. **Home is single-column**: Unlike interior pages, the Home page uses a full-width single-column layout with stacked sections.
11. **Hero section**: Full-width mountain illustration as background image, with centered text overlay containing: stats ticker, h1 heading (2 lines), subtitle paragraph, and 2 CTA buttons side by side.
12. **Stats row**: Three stat cards are displayed in a horizontal row below the hero, each containing an icon, large number (e.g., "98.4만+"), label, and sublabel ("DACON + DAKER"). Three equal-width columns.
13. **Feature grid**: The "DAKER 시스템 소개" section uses a 2x2 grid of feature cards (프로필, 원정대, 해커톤, 배지 & 랭킹), each with icon, h3, description, and bullet list.
14. **CTA banner**: The final section before the footer is a full-width dark/gradient banner with centered heading and a single CTA button.

### Content Area Patterns
15. **Announcement banner**: Every interior page (Hackathons, Basecamp, Showcase, Community) has a scrolling announcement banner at the top of the content area, displayed as a horizontal marquee with "공지" badge and emoji-rich text.
16. **Search + controls toolbar**: Below the announcement, each content page has a toolbar row with: search input on the left, filter/sort controls on the right. The exact controls vary per page.
17. **Card grid for hackathons**: The hackathon list page uses a 2-column card grid (visible in the public-hackathons screenshot showing 2 cards side by side).
18. **Card list for basecamp**: The basecamp page uses a single-column card list where each card spans the full content width.
19. **Card list for community**: Community posts are displayed in a single-column list layout with cards spanning full width.
20. **Card grid for showcase**: Showcase uses a card grid -- the single visible card occupies roughly half the content width, suggesting a multi-column grid when more items exist.
21. **Card grid for adventurers**: The adventurers page uses a 2-column grid of profile cards (visible in screenshot showing 2 cards per row).

### Hackathon Detail Layout
22. **Three-panel layout**: The hackathon detail page uses a unique three-panel layout: left sidebar navigation (scrollspy), center main content area, and right sidebar with real-time clock/countdown and team list.
23. **Detail left sidebar**: Contains hierarchical navigation with expandable sections (대회안내 > 개요/평가/규칙/일정/상금/데이터/동의사항, 제출, 리더보드 with count badge "138", 갤러리 with count "4", 게시판 with sub-tabs).
24. **Detail right sidebar**: Contains two widgets stacked vertically: (a) real-time clock display with countdown timer showing days/hours/minutes/seconds, and (b) team recruitment panel ("모집 중 (7)") listing participating teams.
25. **Detail content sections**: Content is organized in collapsible/accordion-style sections, each with an icon + title header and expandable body.

### Spacing Patterns
26. **Section vertical spacing**: Between major home page sections, there is consistent large vertical spacing (approximately 64-80px based on screenshot proportions).
27. **Card gap in grids**: Cards in grid layouts (hackathons, adventurers) have consistent gaps of approximately 16-24px between them.
28. **Card internal padding**: All cards have consistent internal padding, approximately 16-20px on all sides.
29. **Sidebar item spacing**: Sidebar filter buttons are stacked vertically with minimal gap (4-8px) between items.
30. **Toolbar bottom margin**: The search/controls toolbar has a margin-bottom before the content list begins, approximately 16-24px.

### Footer Structure
31. **Three-column footer**: The footer is organized in three sections horizontally: (a) DACON logo + legal links, (b) center "AI 해커톤 플랫폼" heading + social media icons, (c) right-aligned company registration info.
32. **Footer legal links**: Five links in a row: 이용약관, 대회주최문의, 서비스소개, 교육문의, 채용.
33. **Social icons**: Four social media links with icons: 카카오톡, 인스타그램, 유튜브, 블로그 (Naver).
34. **Copyright line**: Separated below the main footer content by a horizontal rule, single centered line: "Copyright (c) DACON Inc. All rights reserved".
35. **Footer is identical**: The footer markup and content are 100% identical across all pages that have it (Home, Hackathons, Basecamp, Showcase, Community, Adventurers).

---

## 2. Navigation Patterns (22 observations)

### Primary Navigation
1. **Top nav bar items**: The primary nav contains 5 visible buttons + 1 overflow: 해커톤, 베이스캠프, 커뮤니티, 학습, and either 쇼케이스 or 더보기. The Home page shows "더보기" where interior pages show "쇼케이스" -- suggesting the nav adapts or the home page has fewer visible items (4 + 더보기).
2. **Active state on nav buttons**: The screenshot of public-hackathons shows "해커톤" button with a filled/highlighted background (dark rounded pill shape), while other nav items have no background. This is the active page indicator.
3. **Nav item rendering**: Nav items are `<button>` elements (not links), suggesting client-side navigation via JavaScript/SPA routing.
4. **"더보기" dropdown**: The "더보기" button includes a chevron/arrow icon, indicating it opens a dropdown menu for additional navigation items.
5. **Logo link**: The DAKER logo links to "/" (root), serving as the home navigation.

### Global Search
6. **Search textbox**: A search input with placeholder "원정대, 해커톤, 사용자 검색..." appears in the header, preceded by a search icon. This is the global search, available on every page.
7. **Search scope**: The placeholder text reveals three search domains: teams (원정대), hackathons (해커톤), and users (사용자).

### Sidebar Navigation (Filter Tabs)
8. **Hackathon sidebar filters**: Vertical button list with counts: 전체 (2), 모집중 (1), 접수대기 (0), 종료 (1). Each button shows label + count badge.
9. **Basecamp sidebar filters**: 전체 (117), 해커톤 원정대 (35), 오픈 원정대 (82), plus a special link "모험가 찾기 (8)" with a person icon that navigates to `/public/adventurers`.
10. **Showcase sidebar filters**: 전체 (1), 해커톤 (0), 레이드 (0), 개인 (1).
11. **Community sidebar filters**: 홈 (104), 잡담 (10), 대회 (22), 바이브코딩 (7), 기타 (6), 학습 (37).
12. **Filter count badges**: All filter tabs display the count as a separate styled element (likely a rounded badge) next to the label text.
13. **Active filter state**: The "전체" filter appears highlighted/selected by default with a blue/primary background color (visible in all sidebar screenshots).

### Hackathon Detail Sidebar Navigation (ScrollSpy)
14. **Accordion-style sections**: The detail sidebar uses expandable sections. "대회안내" is expanded showing sub-items (개요, 평가, 규칙, 일정, 상금, 데이터, 동의사항), while "갤러리" and "게시판" also have sub-navigation.
15. **Section count badges**: "리더보드" shows "138", "갤러리" shows "4" with sub-item "기획서 제출" showing "4".
16. **Gallery sub-navigation**: Under 갤러리, there are submission stages: 기획서 제출 (4) with deadline "3/30 10:00", 최종 웹링크 제출 with deadline "4/6 10:00", 최종 솔루션 PPT 제출 with deadline "4/13 10:00".
17. **Board sub-tabs**: Under 게시판, there are 5 category tabs: 전체, 공지, 업데이트, FAQ, 일반.

### Other Navigation Patterns
18. **Community pinned posts**: The sidebar has a "고정 게시글" section (pinned icon + heading) with navigation links to pinned announcements.
19. **Community trending widgets**: Three collapsible accordion sections: "최근 인기" (expanded, with 일간/주간/월간 tabs), "게시글 TOP" (collapsed), "유저 랭킹" (collapsed).
20. **Pagination**: The community page shows numbered pagination at the bottom: disabled prev arrow, page buttons 1-5, next arrow, and text "104개 중 1-20" showing items per page = 20.
21. **Keyboard shortcut**: Notifications region is labeled "Notifications (F8)", indicating F8 is a keyboard shortcut to access notifications.
22. **Feedback button**: Both Basecamp and Community sidebars include a "피드백 보내기" button with an icon at the bottom of the sidebar, providing a consistent feedback mechanism.

---

## 3. Card Design System (28 observations)

### Hackathon Card (Public List)
1. **Hackathon card structure**: Top gradient header area (approximately 40% of card height) with status badge and action icons, followed by organizer info, title (h3), prize info, participation count, and CTA button at the bottom.
2. **Header gradient**: Each hackathon card has a distinct gradient background in the header area (purple-to-blue for the active one, lighter for the ended one). This is a decorative element, not an image.
3. **Status badge position**: Top-left corner of the card header, with text like "모집중" or "종료".
4. **D-day badge**: "D-18" countdown badge appears in the top-right area of the active card header, alongside a share icon button.
5. **Organizer row**: Below the header, a row shows organizer initial avatar (single character in circle) + organizer name (데이콘/DACON).
6. **Prize display**: "총 상금" label in a small badge + "100만원" in bold text.
7. **Participation count**: "128팀 참가" text + eye icon with view count "0".
8. **CTA button**: Full-width button at card bottom -- "참가 신청하기" (blue, active) or "종료됨" (gray, disabled).
9. **Bookmark icon**: A bookmark/save icon button in the card header area for favoriting.

### Basecamp Team Card (원정대)
10. **Team card structure**: Hackathon reference header (linked hackathon name + bookmark icon) with status badge, team leader info or privacy indicator, team name (h3), metadata row, and access indicator.
11. **Hackathon reference header**: A colored strip at the top showing the linked hackathon icon + name. The color varies per hackathon (blue, red, green, teal, purple -- visible in basecamp screenshot).
12. **Status badges on team cards**: "모집중" (recruiting, blue/green), "팀빌딩완료" (team complete, different color), "완료" (completed).
13. **Privacy indicator**: "비공개 원정대" text with a lock icon for private teams, or team leader avatar + name + tier badge for public/completed teams.
14. **Team leader avatar with tier**: When shown, the leader's avatar has an overlaid tier badge image (e.g., "Bronze tier", "Silver tier") positioned at the bottom-right of the avatar.
15. **Metadata row**: Three items with icons: member count ("1/1명", "2/3명", "1/4명"), duration ("기간 없음"), and a numeric value (likely activity/view count, e.g., "14", "5", "1").
16. **Access indicator**: Either "초대 필요" (invite required) with a lock icon at the bottom, or "자세히" (details) button for teams open to viewing.
17. **Card color coding**: Each card has a colorful gradient strip at the top (the hackathon reference area) that acts as a visual identifier for which hackathon the team belongs to. Colors observed: blue, red, green, purple, teal, orange.

### Adventurer Card (모험가)
18. **Adventurer card structure**: Top section with gradient background + action buttons, avatar with tier overlay in center, username (h3) as link, then content section with role tags, skill tags, stat badges, and bio paragraph.
19. **Gradient card headers**: Each adventurer card has a unique gradient header (pink-purple, blue-teal, green-yellow, orange-red visible in screenshot). This creates visual variety.
20. **Avatar with tier overlay**: Large circular avatar image with a small tier badge image overlaid at bottom-right (e.g., "Silver tier", "Bronze tier").
21. **Action buttons on adventurer card**: A bookmark icon button in the top-left and "원정대 찾기" (find team) button in the top-right area of the card header.
22. **Role tags**: Displayed as pill badges in a row: "Frontend Developer", "Backend Developer", "ML Engineer", "Data Analyst", "발표자", "Service 기획자", with "+N" overflow indicator.
23. **Skill/tool tags**: Second row of pill badges: "VS Code", "Git", "GitHub", "Computer Vision", "NLP", "Notion", etc., with "+N" overflow.
24. **Stat badges**: Pairs like "학습 5", "케미 5", "직무 5" displayed as small labeled badges.
25. **Bio text**: A paragraph of free-form text at the bottom, potentially truncated.

### Community Post Card
26. **Post card structure**: Optional thumbnail/media preview on the left, then text content on the right: title (h3), author row (avatar + name + dot separator + relative time), tag badges, content preview text, and engagement stats row (likes, comments, views, bookmark).
27. **Media type indicators**: Posts with attachments show a media type badge overlay on the thumbnail: "동영상" (video) with film icon, "PDF" with document icon, "링크" (link) with link icon. Each has a distinct icon.
28. **Engagement stats row**: Four metrics in a row: heart/like icon + count, comment icon + count, eye/view icon + count, and a bookmark button icon. Consistent across all post cards.

### Showcase Project Card
- **Showcase card structure**: Large thumbnail image, "개인" (personal) category badge overlaid on image, project title (h3), description text, author row (avatar + name), and engagement stats (heart + count, comment + count, eye + count). Similar to community cards but with a larger image emphasis.

---

## 4. Typography (18 observations)

### Heading Hierarchy
1. **H1 usage**: Used sparingly. Home page has one h1 ("AI 서비스개발 히어로의 여정을 시작하세요"), hackathon detail has one h1 (hackathon title), and adventurers page has one h1 ("모험가 찾기"). Large, bold, likely 28-36px.
2. **H2 usage**: Section headings on the home page ("DAKER 시스템 소개", "준비되셨나요?..."). Also used for the hackathon detail content sections via data download links. Likely 24-28px.
3. **H3 usage**: Most prevalent heading level. Used for: sidebar titles ("베이스캠프", "해커톤 메뉴", "커뮤니티 메뉴"), card titles (hackathon names, team names, post titles, adventurer names), feature card headings, content section headings within detail pages. Likely 16-20px, bold.
4. **H4 usage**: Sub-section titles within sidebars ("원정대 탐색", "해커톤 가이드", "프로젝트 등록"). Likely 14-16px, semi-bold.

### Body Text
5. **Primary body text**: Paragraphs use standard body size, estimated 14-16px. Used for descriptions, content previews, and detail page content.
6. **Small/caption text**: Metadata like relative timestamps ("2일 전", "약 12시간 전"), member counts ("1/4명"), and labels ("총 상금", "대회 기간") use smaller text, estimated 12-13px.
7. **Large stat numbers**: Home page stats ("98.4만+", "23.1만+", "423개") use large bold text, estimated 32-40px.

### Font Weights
8. **Bold**: Used for h1, h2, h3 headings, stat numbers, prize amounts ("100만원"), and primary CTA text.
9. **Semi-bold/Medium**: Used for nav buttons, filter tab labels, card metadata labels.
10. **Regular**: Used for body paragraphs, descriptions, timestamps, footer text.

### Text Patterns
11. **Title truncation**: Hackathon names in team card headers appear to truncate with ellipsis when they exceed the available width. Community post titles also truncate for long content.
12. **Content preview truncation**: Community post content previews are truncated to approximately 2-3 lines of text, suggesting CSS line-clamp or text-overflow handling.
13. **Tag overflow pattern**: When there are more tags than can be displayed, a "+N" badge appears (e.g., "+7", "+11", "+4", "+3", "+2"). This is consistent across community tags, adventurer role tags, and skill tags.
14. **Relative time display**: All timestamps are relative: "2일 전", "약 12시간 전", "9일 전", "약 1개월 전", "약 2개월 전". No absolute dates in list views.
15. **Absolute time in detail**: The hackathon detail page uses absolute dates/times: "3/5 14:00 ~ 4/27 10:00", "3/30 10:00", etc.
16. **Two-line heading break**: The home h1 is explicitly split across two lines using separate elements: "AI 서비스개발 히어로의" on line 1 and "여정을 시작하세요" on line 2.
17. **Korean + English mix**: The platform freely mixes Korean and English. Headings are Korean, but tag/skill labels can be English ("Computer Vision", "NLP", "VS Code"). Tier names are English ("Bronze tier", "Silver tier").
18. **Dot separator**: Author metadata uses a bullet/dot separator pattern: "작성자 . 시간" (e.g., "도비콘 . 약 12시간 전").

---

## 5. Color System (22 observations)

### Brand Colors
1. **Primary blue**: The primary interactive color is a medium blue (approximately #3B82F6 / blue-500). Used for: active nav pill background, active sidebar filter background, primary CTA buttons, links, and the main "참가 신청하기" button.
2. **Light blue background**: The home hero section and the 404 page use a very light blue/sky gradient background.

### Status Colors
3. **모집중 (Recruiting)**: Uses a green/teal badge color (visible in both hackathon cards and team cards).
4. **접수대기 (Waiting)**: Listed as a filter option with count 0, color not directly observed but likely a neutral/yellow tone.
5. **종료 (Ended)**: Uses a gray/muted badge color, with the entire card appearing slightly desaturated.
6. **팀빌딩완료 (Team Complete)**: Uses a distinct badge color (likely blue or purple based on differentiation from 모집중).
7. **완료 (Completed)**: Appears on team cards with a neutral/gray tone.
8. **진행중 (In Progress)**: Used in the hackathon detail timeline, displayed as a small badge next to schedule items.

### Badge Colors
9. **공지 (Notice) badge**: Red/pink background with white text, used in the announcement banner.
10. **D-day badges**: Dark background (black/dark gray) with white text, showing countdown like "D-18".
11. **Tag badges**: Community post tags ("#공지", "#해커톤", "#클로드코드") use light gray/neutral pill backgrounds.
12. **Overflow badges**: "+N" badges use the same light gray pill style as regular tags.
13. **Count badges in sidebar**: Displayed as small rounded numbers, likely using a light gray background to contrast with the filter label text.

### Gradient Patterns
14. **Hackathon card gradients**: Each hackathon card header uses a unique gradient. The active hackathon uses purple-to-blue, the ended one uses a lighter gradient.
15. **Adventurer card gradients**: Each adventurer card has a distinct gradient header: pink-purple, blue-teal, green-yellow, etc. These appear to be generated/assigned per user for visual variety.
16. **Team card header strips**: Colored strips at the top of team cards correspond to the linked hackathon, using blues, reds, greens, teals, and purples.
17. **Home CTA gradient**: The bottom CTA section ("준비되셨나요?") uses a dark gradient background (likely dark blue to black) with white text.

### Background Colors
18. **Page background**: Light gray (#F8FAFC or similar) for the overall page background, visible behind cards and content areas.
19. **Card background**: White (#FFFFFF) for all card surfaces, creating elevation against the gray page background.
20. **Sidebar background**: White or very light gray, slightly differentiated from the main content area.
21. **Footer background**: Light gray section separator, then white/light content area within.

### Tier Colors
22. **Tier badges**: "Bronze tier" and "Silver tier" are displayed as small badge images overlaid on avatars. Based on naming, expected color progression: Bronze (copper/brown), Silver (gray/silver), Gold (gold/yellow) -- though Gold was not observed in the data.

---

## 6. Component Patterns (30 observations)

### Buttons
1. **Primary CTA button**: Solid blue background, white text, full-width in cards ("참가 신청하기"), rounded corners. Used for primary actions.
2. **Secondary/outline button**: Used for "둘러보기" on home page (next to primary "지금 시작하기"), likely white/transparent background with border.
3. **Disabled button**: "종료됨" button on ended hackathon cards is `[disabled]`, rendered in gray with no cursor interaction.
4. **Ghost/icon buttons**: Bookmark, share, and theme toggle buttons are icon-only with no visible background, just the icon image.
5. **Text + icon buttons**: "원정대그룹 가기", "원정대 만들기", "자세히 알아보기", "새 프로젝트 등록하기" -- these have text + trailing arrow/plus icon.
6. **Filter tab buttons**: Sidebar filter buttons act as toggle buttons with text label + count badge, switching active state on click.
7. **Sort button**: Community page has a standalone "정렬" button for sort controls.
8. **View toggle buttons**: Two adjacent icon buttons for switching between list view and grid view (visible in hackathons and community toolbars).
9. **Feedback floating button**: "피드백 보내기" with chat icon, positioned at the bottom of sidebars in Basecamp and Community pages. A separate floating chat icon button is also visible in the bottom-right of the hackathon detail screenshot.

### Badges
10. **Status badge**: Small pill/tag with colored background and white text ("모집중", "종료", "팀빌딩완료", "완료", "진행중").
11. **Count badge**: Numeric count in a small rounded container, used in sidebar filters and navigation items ("117", "35", "138").
12. **Tag badge**: Hash-prefixed text in a pill shape ("#공지", "#해커톤", "#DAKER"). Light background.
13. **Tier badge**: Small image overlay on avatars showing tier level ("Bronze tier", "Silver tier").
14. **Category badge**: Small label like "개인", "해커톤" on showcase/post cards.
15. **Media type badge**: "동영상", "PDF", "링크" badges overlaid on post thumbnails with corresponding icons.
16. **D-day badge**: Countdown badge "D-18" displayed on hackathon cards.
17. **공지 badge**: Red notice badge in the announcement banner marquee.

### Input Fields
18. **Global search input**: Textbox with search icon prefix, placeholder "원정대, 해커톤, 사용자 검색...", located in header.
19. **Contextual search inputs**: Each page has its own search: "해커톤 검색...", "원정대 검색...", "게시글 검색...", "모험가 검색...", "태그로 검색..." -- all with search icon.
20. **Search input styling**: All search inputs appear to have a left-aligned search icon, rounded borders, and placeholder text. Consistent styling across all pages.

### Dropdowns/Combobox
21. **Sort combobox**: Showcase page has a "인기순" dropdown (combobox role) for sort order selection, with a chevron icon.
22. **Filter combobox**: Hackathon search toolbar has a combobox with filter icon for additional filtering options.

### Dialogs/Modals
23. **Participation guide dialog**: The hackathon detail page has a `dialog` element titled "해커톤 참가 가이드" with a multi-step guide (3 steps), close button, pagination dots, and next button. It is opened via "참가 가이드 보기" button.
24. **Dialog structure**: Header with h2 title + subtitle, body with step cards (numbered 1-2-3), tip section with icon, footer with dot indicators + navigation button, and absolute-positioned close button with X icon.

### Avatars
25. **User avatar with tier**: Circular image with tier badge overlay at bottom-right corner. Used in team cards (leader), adventurer cards, and community posts.
26. **Initial avatar**: Single-character circle (e.g., "데", "D") used for organizer display on hackathon cards when no image is available.
27. **Small inline avatar**: Smaller circular avatar (approximately 24-32px) used inline with author names in community posts and showcase cards.

### Icons
28. **Icon-as-image pattern**: All icons in the accessibility tree are rendered as `<img>` elements (not SVG inline or icon fonts), suggesting they are either SVG files served as images or use next/image optimization.
29. **Icon usage categories**: Navigation icons (search, chevron, theme), action icons (bookmark, share, close), metadata icons (people, calendar, eye, heart, comment), media type icons (film, document, link), and decorative icons (mountain, checkmarks in feature lists).

### Error States
30. **404 page**: A centered card on a light blue gradient background. Contains: large "404" text (approximately 120px+, light gray/muted), search/magnifying glass icon in a circle, h1 "앗! 페이지를 찾을 수 없어요", subtitle "URL을 확인해주세요. 오타가 있을 수 있어요.", and a full-width primary blue button "홈으로 돌아가기" with home icon. No header/footer/sidebar present.

---

## 7. Interactive Patterns (18 observations)

### Search Behavior
1. **Global search**: Single input in header with multi-entity search scope. No visible autocomplete/suggestions in snapshots, but the unified placeholder suggests a combined search results page.
2. **Contextual search**: Each page has a dedicated search input scoped to that content type. These are separate from the global search and appear below the announcement banner.

### Filter Patterns
3. **Sidebar filter tabs**: Vertical button list where clicking a tab filters the content area. Each tab shows a count of matching items. Only one tab is active at a time (single-select).
4. **Community sub-filters**: The community sidebar has a "최근 인기" section with horizontal tabs (일간/주간/월간) -- a tablist with tab roles, where "일간" is [selected]. This is a time-range sub-filter within the trending widget.
5. **Filter + sort combination**: The hackathon page toolbar combines a search input, a combobox filter, and view toggle buttons, allowing simultaneous filtering, sorting, and view mode changes.

### Sort Controls
6. **Sort dropdown**: Showcase has an "인기순" combobox dropdown. Other pages have a filter/funnel icon combobox for sort options.
7. **Sort button (community)**: The community page has a standalone "정렬" button, separate from the search input.

### View Toggle
8. **List vs grid toggle**: Two icon buttons side by side in the toolbar area allow switching between list view (horizontal lines icon) and grid view (grid/dots icon). Present on Hackathons, Basecamp, Community, and Adventurers pages.
9. **Default view**: The hackathon list defaults to grid view (2 columns), while community defaults to list view based on the screenshots.

### Real-Time Elements
10. **Live clock**: The hackathon detail right sidebar shows "현재 시간" (current time) as "05:23:02" with date "2026.03.12 (목)", updating in real time.
11. **Countdown timer**: Shows "마감까지" (until deadline) with animated digit boxes for 일(days), 시(hours), 분(minutes), 초(seconds). The seconds display shows individual digits ("5"/"6") suggesting a flip/transition animation.
12. **Countdown sub-label**: Below the timer: "3월 30일 10:00 마감" with a detailed timeline of all upcoming deadlines.
13. **Submission counter**: "3 / 1/10" suggests a progress indicator (3 submissions out of 10 slots or similar).

### Bookmark/Favorite Actions
14. **Bookmark icons**: Present on hackathon cards (top-right of header), team cards (in hackathon reference header area), and adventurer cards (top-left). All are icon-only buttons with heart or bookmark imagery.

### Announcement Marquee
15. **Scrolling announcement**: The announcement banner uses a horizontal scrolling/marquee effect with duplicated content (the same text appears twice in the tree), suggesting infinite scroll animation via CSS/JS.
16. **Multiple announcement badges**: The banner shows two badges on the right side: "공지" and "긴급 공지", suggesting categorized announcements.

### Expandable Sections
17. **Accordion navigation**: The hackathon detail sidebar uses expandable sections with `[expanded]` state tracking. Sections like "대회안내", "갤러리", and "게시판" can be toggled open/closed with chevron icons.
18. **Community trending accordions**: Three sections ("최근 인기", "게시글 TOP", "유저 랭킹") function as accordions -- only "최근 인기" is expanded with `[expanded]`, while the other two are collapsed showing only their header bar.

---

## 8. Content Organization (17 observations)

### Information Hierarchy
1. **Hackathon detail hierarchy**: Title + status + description at top, then metadata grid (주최, 상금, 대회 기간, 접수 기간, 참가 팀수, 제출/저장, 조회수), then participation CTA, then scrollspy-driven content sections (개요, 평가, 규칙, 일정, 상금, 데이터, 동의사항).
2. **Home page hierarchy**: Hero (brand story) > Stats (social proof) > Feature grid (product explanation) > CTA banner (conversion). Classic marketing landing page pattern.
3. **Interior page hierarchy**: Announcement > Search/Filter toolbar > Content count ("총 2개의 해커톤") > Content list/grid > Pagination.

### Content Density
4. **Low density -- Showcase**: Only 1 project visible, lots of white space. The sparsest page.
5. **Medium density -- Hackathons**: 2 cards in a grid with comfortable spacing.
6. **High density -- Basecamp**: Many team cards stacked in a list, each with multiple metadata fields. Approximately 15-20 cards visible in a long scroll.
7. **High density -- Community**: 20 posts per page with rich card content (thumbnails, tags, text previews, engagement stats).
8. **Medium density -- Adventurers**: 8 cards in a 2-column grid, each containing substantial profile information.

### Announcement/Notice Patterns
9. **Global announcement banner**: Identical marquee banner appears on all interior pages (Hackathons, Basecamp, Showcase, Community), anchored to the top of the content area. Contains emoji-heavy urgent text.
10. **Pinned content**: Community sidebar has a dedicated "고정 게시글" section with pin icon, listing 2 pinned announcement links separately from the main feed.
11. **Notice posts in feed**: Posts with "[공지]" prefix appear at the top of the community feed alongside regular posts, identified by their title prefix rather than a separate section.

### Trending/Popular Content
12. **Community trending widget**: "최근 인기" accordion in sidebar with time-range tabs (일간/주간/월간). Shows popular posts for the selected period (currently empty for 일간: "해당 기간에 게시글이 없습니다").
13. **게시글 TOP**: A collapsed widget for top posts by engagement.
14. **유저 랭킹**: A collapsed widget for user rankings.

### Pagination
15. **Numbered pagination**: Community uses traditional numbered pagination with: prev/next arrow buttons, numbered page buttons (1-5 visible), and item count text "104개 중 1-20". The prev button is `[disabled]` on the first page.
16. **Items per page**: Fixed at 20 items per page based on "104개 중 1-20".

### Content Preview Patterns
17. **Media type differentiation**: Community posts visually differentiate content types through thumbnail overlays: image posts show the image directly, video posts have a "동영상" badge with film icon overlay, PDF posts show a PDF preview with "PDF" badge, link posts show a URL preview with "링크" badge and the external URL text (e.g., "daschool-aistudiio-425v.vercel.app"). Text-only posts show no thumbnail.

---

## 9. Additional Patterns (Cross-Cutting Concerns)

### Theme System
1. **Dark mode toggle**: A "테마 전환" button with sun/moon icon is present in the header on every page. This indicates a light/dark theme system. All captured screenshots show light mode.
2. **Theme toggle tooltip**: The button includes a `<generic>` child with text "테마 전환", likely rendered as a tooltip or screen-reader label.

### Authentication
3. **Login via external auth**: The login button links to `/api/auth/dacon/login`, suggesting OAuth/SSO integration with the DACON (parent) platform. Not a native signup form.
4. **Auth-gated actions**: The hackathon detail shows "로그인하고 참가하기" (login to participate) linking to `/login`, indicating participation requires authentication.

### Notification System
5. **Notification region**: Every page includes `region "Notifications (F8)"` with an empty `<list>`, indicating a toast/notification system that pushes items into this list. The F8 keyboard shortcut opens/focuses it.

### URL Structure
6. **Clean URL patterns observed**: `/public/hackathons`, `/public/basecamp`, `/public/adventurers`, `/public/showcase`, `/community`, `/public/showcase/new`, `/public/hackathons/guide`, `/profile/{uuid}`, `/user/{uuid}`, `/u/{slug}`, `/adventurer/{slug}`.
7. **Inconsistent user URLs**: User profile links use three different patterns: `/profile/{uuid}`, `/user/{uuid}`, and `/u/{slug}`. This inconsistency may be intentional (different user states) or a data issue.

### Responsive Hints
8. **View toggle implies responsive design**: The list/grid view toggle suggests the interface adapts to different viewing preferences, which likely extends to responsive breakpoints.
9. **Two-line heading suggests mobile-first**: The home h1 is split into explicit line elements, suggesting careful control of text wrapping for different screen sizes.

### Data Patterns
10. **Real-time data**: The hackathon detail page shows live clock, countdown timer, and dynamic submission counts, suggesting WebSocket or polling for real-time updates.
11. **Multi-stage submission**: The hackathon detail reveals a multi-phase submission process with distinct deadlines: 기획서 제출 (3/30), 최종 웹링크 제출 (4/6), 최종 솔루션 PPT 제출 (4/13), followed by voting and evaluation periods.
12. **Evaluation matrix**: A structured table for evaluation criteria with columns: 평가항목 (item), 배점 (score allocation), 평가 포인트 (evaluation points). Categories: 기본 구현 (30), 확장/아이디어 (30), 완성도 (25), 문서/설명 (15).

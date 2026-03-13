# Scoring & Evaluation System Deep Analysis

> Ultra-deep analysis of daker.ai hackathon scoring, submission, and leaderboard systems
> compared against our current implementation in `hackathon-handover/app`.

---

## 1. Daker.ai Evaluation System (25 Observations)

### 1.1 Two-Phase Evaluation Architecture

The daker.ai hackathon uses a **two-phase elimination** evaluation, not a single scoring pass.

| Phase | Name | Scope | Weight |
|-------|------|-------|--------|
| 1차 | 투표평가 (Vote Evaluation) | All final-submitting teams (~138) | Participant 30% + Judge 70% |
| 2차 | 내부 정성평가 (Internal Qualitative) | Top 10 teams from Phase 1 | Internal judges 100% |

**Observation 1:** Phase 1 is a weighted vote (not a rubric score). Participants and judges each cast votes; the system combines them at 30/70 weighting.

**Observation 2:** Phase 2 only applies to the top 10 teams. It is a completely separate rubric-based evaluation by internal judges, scored out of 100 points.

**Observation 3:** The final prize ranking (1st/2nd/3rd) is determined by Phase 2, not Phase 1. Phase 1 is purely a filter/shortlist mechanism.

### 1.2 Phase 1: Vote-Based Evaluation

**Observation 4:** The "1차 투표평가 기간" runs from `4/13 12:00` to `4/17 10:00` -- a 3.8 day window after all submissions close.

**Observation 5:** Participants who submitted final artifacts are granted voting rights. The snapshot text shows "제출자 30%" explicitly as one of the voter categories.

**Observation 6:** Judge voting weight is 70%. The judges are labeled "심사위원" and their votes carry 2.33x the weight of participant votes.

**Observation 7:** The tiebreaker rules for Phase 1 are explicitly defined in priority order:
1. 심사위원 득표수가 많은 팀이 우선순위 (more judge votes wins)
2. 팀에게 부여된 투표권 중 사용하지 않은 투표수가 적을수록 우선순위 (teams that used more of their allocated votes rank higher -- this incentivizes voting participation)
3. 산출물 최초 업로드 시간이 빠를수록 우선순위 (earlier first upload time wins)

**Observation 8:** Tiebreaker #2 is unusual -- it penalizes teams that did not participate in voting. This is a participation incentive mechanism, not a quality signal.

**Observation 9:** Tiebreaker #3 uses "최초 업로드 시간" (first upload time), not final submission time. This rewards teams who submitted early, even if they updated later.

### 1.3 Phase 2: Rubric-Based Internal Evaluation (100 points)

**Observation 10:** The rubric has exactly 4 criteria totaling 100 points:

| Criterion (Korean) | Criterion (English) | Points | Evaluation Focus |
|---------------------|---------------------|--------|------------------|
| 기본 구현 | Basic Implementation | 30 | Web page implementation, data-driven rendering, filter/sort functionality, empty state UI |
| 확장(아이디어) | Extension/Ideas | 30 | Novelty and practicality of team-specific features/UX improvements, "service value", consistent flow |
| 완성도 | Completeness | 25 | Usability (navigation/readability), stability (error/exception handling), performance (loading/responsiveness), accessibility/responsiveness |
| 문서/설명 | Documentation/Explanation | 15 | Planning doc clarity, PPT design/implementation explanation, execution/verification method (reproducibility) |

**Observation 11:** "기본 구현" (30pts) explicitly checks for: (a) web page implementation quality, (b) data-driven rendering, (c) filter/sort functionality, (d) empty state UI. These are concrete, verifiable features.

**Observation 12:** "확장(아이디어)" (30pts) evaluates novelty AND practicality. The phrase "서비스로서 가치" (value as a service) means judges look for features that make the product feel like a real service, not just a demo.

**Observation 13:** "완성도" (25pts) has four sub-dimensions: usability, stability, performance, accessibility/responsiveness. This is the polish criterion.

**Observation 14:** "문서/설명" (15pts) evaluates across all three submissions: planning doc clarity, PPT explanation quality, and reproducibility (can a judge run/verify it independently).

**Observation 15:** The rubric is only used in Phase 2 (top 10 teams). Phase 1 is pure voting with no rubric.

### 1.4 Pre-Phase Submission Checks

**Observation 16:** Before Phase 1, there are two "제출 확인" (submission verification) steps:
- "기획서 제출 확인" at `3/30 10:01` -- 100% judge weight, binary check
- "최종 웹링크 제출 확인" at `4/6 10:01` -- 100% judge weight, binary check

**Observation 17:** These verification steps have a 1-minute window (e.g., `3/30 10:01 ~ 3/30 10:01`). They are automated checks confirming that a submission exists, not a qualitative evaluation.

**Observation 18:** The stage-by-stage evaluation ratios shown in the snapshot confirm:
- 기획서 제출 확인: 심사위원 100% (pure verification)
- 최종 웹링크 제출 확인: 심사위원 100% (pure verification)
- 1차 투표평가 기간: 심사위원 70% + 제출자 30% (weighted vote)

### 1.5 Scoring Display Behavior

**Observation 19:** The leaderboard shows 138 entries. This represents the number of participating teams, not submissions.

**Observation 20:** From the seed data, scores for the handover hackathon are displayed as aggregate numbers (e.g., 87.5, 84.2), not breakdowns. The `scoreBreakdown` in our data model (participant: 82, judge: 90) suggests these are presented separately.

**Observation 21:** The final displayed score likely follows the formula: `score = (participant_vote_normalized * 0.30) + (judge_vote_normalized * 0.70)` for Phase 1.

**Observation 22:** Phase 2 scores (rubric-based) replace Phase 1 scores for the top 10 teams. The final ranking uses Phase 2 scores exclusively.

### 1.6 Gallery System

**Observation 23:** The snapshot shows a "갤러리" (Gallery) tab with count "4". This is separate from the leaderboard and appears to showcase submitted artifacts visually.

**Observation 24:** Gallery entries (4 items) correspond to the submission count "제출 4건" shown in the hackathon stats. These are completed submissions, not saves.

**Observation 25:** The gallery likely displays deployed web links and planning documents in a visual card format, allowing participants and judges to browse submissions before voting.

---

## 2. Submission System Deep Dive (25 Observations)

### 2.1 Three-Stage Sequential Submission

The daker.ai system enforces **sequential, deadline-gated submissions** -- not a single form.

**Observation 1:** Three distinct submission types with separate deadlines:

| # | Submission Type | Korean | Deadline | Format | Opens |
|---|----------------|--------|----------|--------|-------|
| 1 | Planning Document | 기획서 제출 | 3/30 10:00 | text_or_url | 3/9 10:00 |
| 2 | Web Link | 최종 웹링크 제출 | 4/6 10:00 | url (Vercel URL + GitHub URL) | 3/30 10:02 |
| 3 | Solution PPT | 최종 솔루션 PPT 제출 | 4/13 10:00 | PDF (converted from PPT) | 4/6 10:02 |

**Observation 2:** Each submission opens AFTER the previous one's deadline passes. The 2-minute gap (e.g., 10:00 deadline, 10:02 opens) allows for the automated verification step in between.

**Observation 3:** Submission stages are not parallel -- you cannot submit the web link before the planning doc deadline has passed.

### 2.2 Planning Document (기획서) Details

**Observation 4:** The planning document must cover: 서비스 개요 (service overview), 페이지 구성 (page composition), 시스템 구성 (system architecture), 핵심 기능 명세 (core feature specification), 주요 사용 흐름 (main user flows), 개발 및 개선 계획 (development and improvement plan).

**Observation 5:** Format is "text_or_url" -- teams can either write text directly or provide a link to an external document (e.g., Notion, Google Docs).

**Observation 6:** The planning doc is evaluated in the "문서/설명" criterion (15pts) for "기획서의 명확성" (clarity of planning document).

### 2.3 Web Link Submission Details

**Observation 7:** Two URLs are REQUIRED for web link submission:
1. Vercel 배포 URL (Vercel deployment URL) -- marked 필수 (required)
2. Github 저장소 링크 (GitHub repository link) -- marked 필수 (required)

**Observation 8:** The deployed URL must be publicly accessible and remain live through the evaluation period (through 4/17 minimum, ideally through 4/24).

**Observation 9:** If external APIs or DBs are used, judges must be able to verify without separate API keys. Features requiring keys may be excluded from evaluation.

### 2.4 Solution PPT/PDF Details

**Observation 10:** The PPT must be created as a presentation and then converted to PDF for upload. "PPT로 제작 후, PDF로 변환하여 제출."

**Observation 11:** No restrictions on length or design: "분량 및 디자인의 제한 없음."

**Observation 12:** The PPT is evaluated for "PPT의 설계/구현 설명력" (explanation quality of design/implementation) and "실행/검증 방법(재현성)" (execution/verification method / reproducibility).

### 2.5 Submission Counts and States

**Observation 13:** The snapshot shows two distinct counts: "제출 4건 / 저장 15건" (4 submissions / 15 saves). This means:
- **저장 (Save):** Draft state, not finalized, can be edited
- **제출 (Submit):** Final state, counts toward evaluation

**Observation 14:** The ratio 4:15 (submit:save) at ~128 teams suggests most teams save drafts but far fewer finalize submissions early. Only 4 teams had finalized submissions at snapshot time.

**Observation 15:** Each submission type (기획서/웹링크/PPT) likely has independent save/submit states.

### 2.6 Submission Flow Analysis

**Observation 16:** The submission navigation in the sidebar shows each submission type as a separate clickable button with its own deadline displayed.

**Observation 17:** Submissions appear to have count badges. The "기획서 제출" button shows a "4" badge, corresponding to the 4 completed submissions.

**Observation 18:** The submission counter "3 1/10" in the countdown area likely means: stage 3 of 10 maximum submissions, or submission attempt 1 of 10 allowed.

**Observation 19:** The "참가 가이드" (participation guide) dialog shows a 3-step process:
1. 해커톤 선택 & 참가 신청 (Select hackathon & register)
2. 원정대(팀) 구성 (Form a team/expedition)
3. 작전실 및 해커톤에서 제출 (Submit from war room / hackathon page)

**Observation 20:** Teams submit from the hackathon page directly, but collaboration happens in a "작전실" (war room/operations room), which is daker.ai's team workspace feature.

### 2.7 Submission Validation Requirements

**Observation 21:** Web link submissions require Vercel URLs specifically -- not arbitrary hosting. This is a hard requirement: "Vercel 배포 필수."

**Observation 22:** Planning doc submissions open on 3/9 (4 days after hackathon start on 3/5), giving teams time to register and form teams first.

**Observation 23:** The 접수 (registration) period is `3/5 14:00 ~ 3/30 10:00`, overlapping with the planning doc submission period. Teams can register and submit planning docs simultaneously.

**Observation 24:** Re-submission capability is implied by the save/submit split. Teams can save multiple drafts and then finalize one.

**Observation 25:** Each submission stage has an implicit gate: failing to submit in stage 1 (기획서) likely prevents progression to stage 2 (웹링크), based on the verification steps.

---

## 3. Leaderboard System (18 Observations)

### 3.1 Entry Count and Structure

**Observation 1:** The leaderboard shows "138" entries via the tab badge. This is the total number of registered teams, not just those who submitted.

**Observation 2:** 128 teams are listed as "참가 팀수" (participating teams) in the stats, while the leaderboard shows 138. The difference (10) may include teams that registered but are incomplete or pending.

**Observation 3:** Leaderboard entries for the handover hackathon include: rank, teamName, score, submittedAt, scoreBreakdown (participant/judge split), and artifacts (webUrl, pdfUrl, planTitle).

### 3.2 Ranking Algorithm

**Observation 4:** Primary ranking is by total weighted score: `finalScore = participant * 0.30 + judge * 0.70`.

**Observation 5:** Our current `storage.ts` sorts by score descending, then by `submittedAt` ascending (earlier = better). This matches tiebreaker #3 from daker.ai but misses tiebreakers #1 and #2.

**Observation 6:** The three-tier tiebreaker from daker.ai requires data we do not currently track:
1. Judge vote count (separate from judge score)
2. Unused votes per team (voting participation metric)
3. First upload timestamp (distinct from final submission timestamp)

**Observation 7:** Rankings are recalculated after the voting period ends (4/17 10:00), not in real-time during voting.

### 3.3 Score Display Format

**Observation 8:** Scores in the seed data use decimal values (87.5, 84.2) suggesting the combined weighted score is displayed to one decimal place.

**Observation 9:** The scoreBreakdown shows separate participant and judge scores as integers (e.g., participant: 82, judge: 90). These represent normalized vote counts or average ratings.

**Observation 10:** Our leaderboard component displays participant and judge scores in separate columns, which aligns with daker.ai's breakdown display.

### 3.4 Artifact Display

**Observation 11:** Each leaderboard entry can have artifacts: webUrl (deployed site), pdfUrl (solution PDF), and planTitle (planning doc title).

**Observation 12:** Our component renders "Web" and "PDF" links for entries with artifacts, which aligns with the daker.ai gallery/leaderboard artifact display.

**Observation 13:** The "갤러리" (Gallery) tab (count: 4) likely shows only entries that have complete artifact sets, while the leaderboard shows all teams.

### 3.5 Pagination and Display

**Observation 14:** With 138 entries, pagination is almost certainly used on daker.ai. Our current implementation renders all entries without pagination.

**Observation 15:** The daker.ai leaderboard likely shows a summary row count or "showing X of Y" indicator.

### 3.6 Phase Transitions on Leaderboard

**Observation 16:** Before the voting period (before 4/13), the leaderboard likely shows teams ranked by submission status, not scores.

**Observation 17:** During the voting period (4/13-4/17), scores update as votes come in. After 4/17, Phase 1 scores freeze.

**Observation 18:** After Phase 2 (4/24), the top 10 entries update with Phase 2 rubric scores, and the final ranking for prizes is published.

---

## 4. Current Implementation Analysis

### 4.1 How Our Scoring Works Now

**Current:** Score is calculated as `Math.max(50, 100 - existingCount * 5)` in `hackathon-submit.tsx` (line 52). This means:
- First submission: 100 points
- Second: 95 points
- Third: 90 points
- ...decreasing by 5 until minimum 50

**Gap:** This is a placeholder/dummy scoring mechanism. It has zero relationship to the daker.ai vote-based evaluation system.

### 4.2 How Our Submission Form Works Now

**Current:** A single unified form with:
- Team name (text input)
- Dynamic submission items from config (all rendered as text `<Input>`)
- Notes (textarea)
- Single "Submit" button

**Gap 1:** No stage separation. All three submission types (기획서/웹링크/PPT) are shown simultaneously as fields in one form.

**Gap 2:** No deadline enforcement. The form does not check whether the current date is within the allowed submission window for each stage.

**Gap 3:** No draft/save vs final submit distinction. The system only has "submit" -- no intermediate save state.

**Gap 4:** No file upload capability for PDF submissions. All items are text inputs, but the PPT submission requires PDF file upload.

**Gap 5:** No URL validation for web link submissions (Vercel URL format, GitHub URL format).

**Gap 6:** No submission gating -- users can fill all fields at once rather than unlocking stages sequentially.

### 4.3 How Our Leaderboard Works Now

**Current:** The leaderboard component:
- Reads from localStorage via `getLeaderboard(slug)`
- Sorts by score descending, then submittedAt ascending
- Displays: rank, team, score, time, participant score, judge score, artifacts (Web/PDF links)
- Shows empty state when no entries

**Matches daker.ai:**
- Column structure (rank, team, score, time, participant/judge breakdown, artifacts)
- Score breakdown display (participant + judge columns)
- Artifact links (Web + PDF)

**Gaps:**
- No pagination (daker.ai has 138 entries)
- No phase-aware display (pre-voting vs post-voting vs final)
- Tiebreaker logic only uses score + time (missing judge vote count and unused vote count)
- No "갤러리" (Gallery) view

### 4.4 How Our Eval Display Works Now

**Current:** `hackathon-eval.tsx` shows:
- Metric name and description
- Score display with breakdown (participant/judge weight percentages)
- Limits (max runtime, max submissions per day)

**Matches daker.ai:**
- Participant/judge weight display (30%/70%)

**Gaps:**
- No rubric table showing the 4 criteria (기본구현/확장/완성도/문서) with point allocations
- No tiebreaker rules display
- No phase explanation (Phase 1 vote vs Phase 2 rubric)
- The "limits" section (maxRuntimeSec, maxSubmissionsPerDay) is from the ML competition template and is irrelevant to this hackathon
- No "단계별 평가 비율" (stage-by-stage evaluation ratio) visual

### 4.5 Data Model Gaps

**Missing from `types/index.ts`:**

| What's Missing | Why It Matters |
|----------------|----------------|
| `SubmissionStage` type (planning/weblink/ppt) | Cannot model sequential stage-gated submissions |
| `SubmissionState` enum (draft/submitted) | Cannot distinguish saves from final submissions |
| Stage deadlines per submission type | Cannot enforce or display per-stage deadlines |
| Voting data model (vote counts, used/unused) | Cannot implement tiebreaker rules |
| First upload timestamp (distinct from submittedAt) | Tiebreaker #3 requires this |
| Rubric scores per criterion | Cannot display Phase 2 rubric breakdown |
| Gallery entry type | No gallery feature possible |
| Phase indicator on leaderboard | Cannot show pre-vote vs post-vote state |

---

## 5. Detailed Improvement Recommendations

### 5.1 CRITICAL: Multi-Stage Submission System

**What to change:** Replace single submission form with a stage-aware, deadline-gated submission flow.

**How to implement:**
1. Add `SubmissionStage` type: `'plan' | 'weblink' | 'ppt'`
2. Add `SubmissionState` type: `'draft' | 'submitted'`
3. Create stage configuration with open/close dates per stage
4. Render only the currently active stage's form
5. Show locked/completed states for past/future stages
6. Add countdown timer per active stage

**Data model changes:**
```typescript
interface SubmissionStageConfig {
  readonly key: 'plan' | 'weblink' | 'ppt'
  readonly title: string
  readonly format: 'text_or_url' | 'url' | 'pdf'
  readonly opensAt: string
  readonly closesAt: string
}

interface StageSubmission {
  readonly id: string
  readonly hackathonSlug: string
  readonly teamName: string
  readonly stageKey: 'plan' | 'weblink' | 'ppt'
  readonly state: 'draft' | 'submitted'
  readonly content: string // URL, text, or file reference
  readonly savedAt: string
  readonly submittedAt?: string
  readonly firstUploadedAt: string
}
```

**UI changes:** Replace `hackathon-submit.tsx` with a `HackathonSubmitStages` component that shows a stepper/timeline with three stages, each expanding to a form when active.

**Priority:** CRITICAL -- this is a core hackathon feature that fundamentally mismatches daker.ai.

---

### 5.2 CRITICAL: Evaluation Criteria Display

**What to change:** Add the 4-criterion rubric table and two-phase evaluation explanation to the eval section.

**How to implement:**
1. Add rubric data to the `EvalSection` type
2. Render a table with criterion/points/description columns
3. Add Phase 1 vs Phase 2 explanation
4. Add tiebreaker rules display
5. Add "단계별 평가 비율" visual (stage-by-stage evaluation ratio bars)

**Data model changes:**
```typescript
interface EvalCriterion {
  readonly name: string
  readonly points: number
  readonly description: string
}

interface TiebreakerRule {
  readonly priority: number
  readonly description: string
}

interface EvalSection {
  // ...existing fields...
  readonly rubric?: readonly EvalCriterion[]
  readonly tiebreakers?: readonly TiebreakerRule[]
  readonly phases?: readonly {
    readonly name: string
    readonly scope: string
    readonly weight: string
  }[]
}
```

**Priority:** CRITICAL -- judges evaluate based on this rubric; participants need to see it.

---

### 5.3 HIGH: Scoring Algorithm Fix

**What to change:** Remove the dummy `Math.max(50, 100 - existingCount * 5)` scoring and replace with a vote-based display system.

**How to implement:**
1. Remove auto-scoring from `handleSubmit` in `hackathon-submit.tsx`
2. Leaderboard entries should show "평가 전" (pre-evaluation) until voting period
3. During/after voting, display the weighted score from seed data
4. For demo purposes, allow manual score entry or simulate voting

**Priority:** HIGH -- current scoring is visibly fake and would lose marks under "완성도" (completeness).

---

### 5.4 HIGH: Draft/Save Functionality

**What to change:** Add save-as-draft capability separate from final submission.

**How to implement:**
1. Add "저장" (Save) and "제출" (Submit) buttons
2. Track save count and submission count separately
3. Display "제출 N건 / 저장 M건" in hackathon stats
4. Allow editing drafts but lock final submissions

**Priority:** HIGH -- the save/submit distinction is visible in daker.ai's UI stats.

---

### 5.5 HIGH: Leaderboard Pagination

**What to change:** Add pagination to support 138+ entries.

**How to implement:**
1. Add page state to `HackathonLeaderboard` component
2. Show 20-30 entries per page
3. Add page navigation controls
4. Show "총 N팀" (total N teams) count

**Priority:** HIGH -- 138 entries without pagination degrades usability.

---

### 5.6 MEDIUM: Gallery Feature

**What to change:** Add a Gallery tab/section showing submitted artifacts visually.

**How to implement:**
1. Create `HackathonGallery` component
2. Display cards with: team name, deployed web link (with thumbnail/iframe preview), planning doc title, PDF link
3. Only show entries that have completed submissions (not drafts)
4. Add count badge to Gallery tab

**Data model changes:** Gallery entries can derive from LeaderboardEntry entries that have `artifacts` populated.

**Priority:** MEDIUM -- daker.ai shows this tab; it enhances the showcase experience.

---

### 5.7 MEDIUM: URL Validation

**What to change:** Validate submission URLs for correct format.

**How to implement:**
1. Vercel URL: must match `https://*.vercel.app` pattern
2. GitHub URL: must match `https://github.com/*` pattern
3. Show inline validation errors
4. Optionally: fetch URL to verify it's accessible (HEAD request)

**Priority:** MEDIUM -- helps prevent submission errors.

---

### 5.8 MEDIUM: Countdown Timer Enhancement

**What to change:** Add per-stage countdown timers matching daker.ai's display.

**How to implement:**
1. Show current time and "마감까지" (until deadline) countdown
2. Display D-day format (D-18, etc.)
3. Show the active stage name and its specific deadline
4. List all upcoming deadlines in a mini-timeline

**Priority:** MEDIUM -- improves time awareness for participants.

---

### 5.9 MEDIUM: Submission History Enhancement

**What to change:** Improve the "이전 제출 내역" (previous submission history) display.

**How to implement:**
1. Show stage-specific submission history
2. Display state (draft/submitted) with visual indicator
3. Show score/feedback when available (post-evaluation)
4. Add timestamps for both save and submit actions

**Priority:** MEDIUM -- better traceability for participants.

---

### 5.10 LOW: File Upload for PDF

**What to change:** Add PDF file upload capability for the PPT submission stage.

**How to implement:**
1. Add file input with PDF type restriction
2. Convert to base64 or blob URL for localStorage storage
3. Show file preview (name, size)
4. Note: localStorage has ~5MB limit; consider warning for large files

**Priority:** LOW -- in a localStorage-based demo, file upload is limited. A URL-to-PDF approach (e.g., Google Drive link) may be more practical.

---

### 5.11 LOW: Voting Simulation

**What to change:** Add a simulated voting interface for the demo.

**How to implement:**
1. Create a voting UI that shows all submitted teams
2. Allow users to cast votes (simulating participant voting)
3. Auto-calculate weighted scores
4. Update leaderboard with vote results

**Priority:** LOW -- adds realism but is not core to the submission experience.

---

## 6. Submission Timeline Analysis

### 6.1 Complete Timeline Extracted from Daker.ai Snapshot

| # | Date/Time | Event | Type | Status (as of 3/12) |
|---|-----------|-------|------|---------------------|
| 1 | 3/5 14:00 | 대회 시작 / 접수 시작 (Competition & Registration Opens) | Registration | Complete |
| 2 | 3/9 10:00 | 기획서 제출 시작 (Planning Doc Submission Opens) | Submission | Active |
| 3 | 3/12 05:23 | Snapshot taken | -- | Current |
| 4 | 3/30 10:00 | 접수 마감 / 기획서 제출 마감 (Registration & Planning Doc Deadline) | Deadline | D-18 |
| 5 | 3/30 10:01 | 기획서 제출 확인 / 평가 마감 (Planning Doc Verification) | Evaluation | Pending |
| 6 | 3/30 10:02 | 최종 웹링크 제출 시작 (Web Link Submission Opens) | Submission | Pending |
| 7 | 4/6 10:00 | 최종 웹링크 제출 마감 / 산출물 제출 마감 (Web Link Deadline) | Deadline | Pending |
| 8 | 4/6 10:01 | 최종 웹링크 제출 확인 / 평가 마감 (Web Link Verification) | Evaluation | Pending |
| 9 | 4/6 10:02 | 최종 솔루션 PPT 제출 시작 (PPT Submission Opens) | Submission | Pending |
| 10 | 4/13 10:00 | 최종 솔루션 PPT 제출 마감 / 발표자료 제출 마감 / 대회 마감 (PPT Deadline & Competition Close) | Deadline | Pending |
| 11 | 4/13 12:00 | 1차 투표평가 시작 (Phase 1 Voting Opens) | Evaluation | Pending |
| 12 | 4/17 10:00 | 1차 투표평가 마감 / 평가 마감 (Phase 1 Voting Closes) | Evaluation | Pending |
| 13 | 4/17 10:00 | 2차 내부 평가 시작 (Phase 2 Internal Evaluation Starts) | Evaluation | Pending |
| 14 | 4/24 23:59 | 2차 내부 평가 마감 (Phase 2 Internal Evaluation Ends) | Evaluation | Pending |
| 15 | 4/27 10:00 | 대회 종료 / 최종 결과 발표 (Final Results Announcement) | Announcement | Pending |

### 6.2 Phase Durations

| Phase | Duration | Notes |
|-------|----------|-------|
| Registration | 25 days (3/5 - 3/30) | Overlaps with planning doc period |
| Planning Doc Submission | 21 days (3/9 - 3/30) | 4-day delay after registration opens |
| Web Link Submission | 7 days (3/30 - 4/6) | Opens immediately after planning doc closes |
| PPT Submission | 7 days (4/6 - 4/13) | Opens immediately after web link closes |
| Phase 1 Voting | 3.8 days (4/13 12:00 - 4/17 10:00) | 2-hour gap after PPT deadline |
| Phase 2 Evaluation | 7.6 days (4/17 - 4/24) | Internal judges only, top 10 teams |
| Results Buffer | 2.4 days (4/24 - 4/27) | Preparation for announcement |
| **Total Competition** | **53 days (3/5 - 4/27)** | |

### 6.3 Key Timing Observations

**Observation:** The 2-hour gap between PPT deadline (4/13 10:00) and voting start (4/13 12:00) is for judges to review and prepare the voting interface.

**Observation:** Registration closes at the same time as the planning doc deadline (3/30 10:00). Late registrants cannot submit a planning doc.

**Observation:** The competition "end date" shown as `4/27 10:00` is the final results announcement, not the last day of work. All submission work ends on 4/13.

**Observation:** Our seed data milestone list in `public_hackathon_detail.json` captures 8 milestones but collapses the open/close pairs. The snapshot reveals more granular timing (e.g., the 10:01/10:02 verification windows).

### 6.4 Timeline Gaps in Our Implementation

| Gap | Impact |
|-----|--------|
| No per-stage open/close dates in submission config | Cannot show stage availability or lock expired stages |
| No verification step between stages | Cannot gate stage 2 on stage 1 completion |
| Milestones are flat list without type classification | Cannot distinguish submission vs evaluation vs announcement milestones |
| No "current phase" indicator | Users cannot tell which stage is currently active |
| Schedule section does not highlight active phase | No visual timeline progress indicator |

---

## 7. Summary: Priority Matrix

| Priority | Item | Effort | Impact on Score |
|----------|------|--------|-----------------|
| CRITICAL | Multi-stage submission system | High | Directly affects 기본구현 (30pts) |
| CRITICAL | Evaluation criteria rubric display | Medium | Directly affects 문서/설명 (15pts) |
| HIGH | Remove dummy scoring algorithm | Low | Affects 완성도 (25pts) -- fake scores look broken |
| HIGH | Draft/save vs submit distinction | Medium | Affects 기본구현 (30pts) |
| HIGH | Leaderboard pagination | Low | Affects 완성도 (25pts) -- usability |
| MEDIUM | Gallery feature | Medium | Affects 확장/아이디어 (30pts) |
| MEDIUM | URL validation | Low | Affects 완성도 (25pts) -- stability |
| MEDIUM | Per-stage countdown timers | Low | Affects 완성도 (25pts) -- usability |
| MEDIUM | Submission history enhancement | Low | Affects 완성도 (25pts) |
| LOW | PDF file upload | Medium | Limited by localStorage constraints |
| LOW | Voting simulation | High | Nice-to-have for demo completeness |

---

## Appendix: File Reference

| File | Role |
|------|------|
| `/Users/arkstar/Projects/daker-hackathon-detail-snapshot.md` | Daker.ai snapshot (source of truth for hackathon structure) |
| `/Users/arkstar/Projects/hackathon-handover/app/src/types/index.ts` | Type definitions (data model) |
| `/Users/arkstar/Projects/hackathon-handover/app/src/lib/storage.ts` | localStorage CRUD operations |
| `/Users/arkstar/Projects/hackathon-handover/app/src/lib/seed.ts` | Seed data initialization |
| `/Users/arkstar/Projects/hackathon-handover/app/src/components/hackathon/hackathon-eval.tsx` | Evaluation criteria display |
| `/Users/arkstar/Projects/hackathon-handover/app/src/components/hackathon/hackathon-submit.tsx` | Submission form |
| `/Users/arkstar/Projects/hackathon-handover/app/src/components/hackathon/hackathon-leaderboard.tsx` | Leaderboard display |
| `/Users/arkstar/Projects/hackathon-handover/app/src/app/hackathons/[slug]/page.tsx` | Hackathon detail page (tab layout) |
| `/Users/arkstar/Projects/hackathon-handover/app/public/seed/public_hackathon_detail.json` | Seed: hackathon detail data |
| `/Users/arkstar/Projects/hackathon-handover/app/public/seed/public_leaderboard.json` | Seed: leaderboard data |

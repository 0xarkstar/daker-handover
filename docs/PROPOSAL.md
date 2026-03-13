# DAKER 해커톤 플랫폼 — 기획서

## 1. 프로젝트 개요

Next.js 16 기반 해커톤 플랫폼 클론 프로젝트입니다. daker.ai의 핵심 기능을 **13개 관점, 350건 이상의 관찰 사항**으로 분석한 뒤 재구현했습니다. 클라이언트 사이드 전용(localStorage)으로 동작하며, 4개 국어(KO/EN/ZH/JA) i18n, "Code Forge: Brutal Edition" 독자 디자인 시스템을 적용했습니다.

**핵심 철학**: 단순 클론이 아닌 "분석 → 문서화 → 구현" 순서로 진행. 분석 문서 자체가 인수인계 산출물로 기능합니다.

---

## 2. 경쟁 분석 방법론

이 프로젝트의 **최대 차별점**은 체계적인 플랫폼 분석입니다.

### 분석 파일 목록 (`/analysis/`, 13편)

| 파일 | 내용 | 구현 반영 |
|------|------|-----------|
| `01-ui-ux-patterns.md` | 레이아웃, 카드, 네비게이션 패턴 | → 사이드바+메인 레이아웃, 스크롤스파이 내비게이션 |
| `02-data-model-analysis.md` | 엔티티, 관계, 필드 추론 | → `types/index.ts` TypeScript 인터페이스 |
| `03-interaction-flows.md` | 상태 전이, 팀 라이프사이클 | → 팀 3단계 상태(모집중→활동중→종료) |
| `04-codebase-audit.md` | 파일 구성, 의존성 패턴 | → 컴포넌트 분리 구조 |
| `05-design-system-analysis.md` | 색상, 타이포, 간격 토큰 | → `globals.css` CSS 변수 체계 |
| `06-hackathon-detail-deep-dive.md` | 8개 탭, 평가 기준 구조 | → 평가 루브릭 시각화, 스크롤스파이 섹션 |
| `07-basecamp-team-deep-dive.md` | 팀 생성, 멤버 관리 흐름 | → 팀 상태 필터, 라이프사이클 UI |
| `08-community-showcase-analysis.md` | 게시물, 필터, 정렬 | → 카드 enrichment 패턴 |
| `09-accessibility-responsive.md` | WCAG, 키보드 내비 | → skip-to-content, focus-visible, aria-live |
| `10-scoring-evaluation-system.md` | 심사 기준, 가중치, 투표 | → 투표 가중치 공식 시각화, 피어 투표 UI |
| `11-navigation-routing.md` | URL 구조, 딥링크 | → 스크롤스파이 내비게이션 |
| `12-home-page-deep-dive.md` | 히어로, 섹션 구성 | → 공지 배너, 기능 쇼케이스 재구성 |
| `13-search-filter-sort.md` | 검색 파라미터, 필터 UI | → 해커톤 필터/정렬, 팀 상태 필터 |

### 분석 → 구현 파이프라인

```
분석 문서(350+ 관찰)
    ↓ 패턴 추출
구현 우선순위 결정(9개 갭 식별)
    ↓ 루브릭 기반 ROI 분석
기능 구현(10개 페이즈)
    ↓ 검증
빌드/배포
```

**핵심**: 일반 클론이 "보이는 대로 따라 만들기"에 그치는 반면, 이 프로젝트는 분석에서 발견한 구조적 차이를 체계적으로 해소했습니다.

---

## 3. 구현 하이라이트

### Round 2에서 추가된 핵심 기능

#### 평가 루브릭 시각화 (분석 근거: `10-scoring-evaluation-system.md`)

daker.ai의 채점 시스템을 분석하여 루브릭을 시각적으로 표현합니다:
- 4개 평가 항목별 배점 프로그레스 바 (기본구현 30, 확장 30, 완성도 25, 문서 15)
- 투표 가중치 듀얼 바 시각화 (참가자 30% + 심사위원 70%)
- `scoreDisplay.breakdown` 데이터와 연동

#### 스크롤스파이 내비게이션 (분석 근거: `01-ui-ux-patterns.md`, `11-navigation-routing.md`)

탭 기반 UI를 스크롤스파이 섹션으로 전환:
- 8개 섹션 수직 배치 (Overview → Schedule → Teams → Submit → Evaluation → Leaderboard → Prize → Info)
- IntersectionObserver 기반 활성 섹션 추적
- 모바일: 수평 필 바, 데스크톱: 사이드 내비게이션
- 부드러운 스크롤 + 오프셋 보정

#### 사이드바 레이아웃 (분석 근거: `01-ui-ux-patterns.md`)

daker.ai의 사이드바+메인 콘텐츠 패턴 재현:
- 데스크톱: sticky 사이드바 (w-72) + 메인 콘텐츠 (flex-1)
- 카운트다운 타이머, 핵심 정보 카드, "팀 참가" CTA
- 모바일: 사이드바가 인라인으로 렌더링

#### 해커톤 카드 강화 (분석 근거: `03-interaction-flows.md`, `08-community-showcase-analysis.md`)

- 그라데이션 헤더 스트립 (h-12, 해커톤별 고유 그라데이션)
- 주최자 배지 (hostName 필드)
- 상금 배지 (formatKRW, Trophy 아이콘)
- 참가팀 수 (Users 아이콘)

#### 피어 투표 + 가중치 점수 (분석 근거: `10-scoring-evaluation-system.md`)

실제 대회 채점 방식을 구현:
- `finalScore = (peerVoteScore × 0.3) + (judgeScore × 0.7)`
- 팀별 투표 버튼 (localStorage로 중복 투표 방지)
- 상위 3팀 메달 아이콘 (🥇🥈🥉)
- 점수 공식 설명 카드

#### 팀 라이프사이클 (분석 근거: `07-basecamp-team-deep-dive.md`)

daker.ai의 팀 상태 흐름을 3단계로 구현:
- **모집중** (recruiting): 녹색 글로우, 활성 모집
- **활동중** (active): 블루 보더, 팀 결성 완료
- **종료** (archived): 뮤트 처리, 반투명
- 상태별 필터링, 기존 isOpen과 하위 호환

#### 홈페이지 재구성 (분석 근거: `12-home-page-deep-dive.md`)

- 공지 배너: 활성 해커톤 링크, 그라데이션 배경, 닫기 가능
- 기능 쇼케이스: 4개 카드 (탐색→팀구성→제출→순위) i18n 지원
- 데이터 백업 섹션 i18n화

#### 접근성 (분석 근거: `09-accessibility-responsive.md`)

- Skip-to-content 링크
- `:focus-visible` 포커스 링 스타일
- 카운트다운 타이머에 `aria-live="polite"`, `role="timer"`
- `prefers-reduced-motion` 미디어 쿼리 (기존)
- WCAG AA 대비 비율 준수

### 페이지 (5개)

| 페이지 | 경로 | 주요 기능 |
|--------|------|-----------|
| 홈 | `/` | 공지 배너, 히어로, 기능 쇼케이스, 통계, 해커톤 카드 |
| 해커톤 목록 | `/hackathons` | 검색, 상태/카테고리 필터, 정렬 |
| 해커톤 상세 | `/hackathons/[slug]` | 스크롤스파이 8섹션, 사이드바, 투표, 루브릭 |
| 캠프 (팀) | `/camp` | 팀 목록, 3단계 라이프사이클, 상태 필터, CRUD |
| 랭킹 | `/rankings` | 글로벌 랭킹 테이블 |

### 디자인 시스템: Code Forge — Brutal Edition

daker.ai를 그대로 복제하지 않고 독자적 디자인 시스템을 설계했습니다.

- **Brutal Shell**: 2px offset 그림자, 굵은 테두리, 모노스페이스 외곽
- **Glass Interior**: backdrop-blur, 반투명 배경, 부드러운 내부 UI
- **네온 글로우**: purple/cyan/amber 네온 효과, 호버/포커스 발광
- **다크/라이트 모드**: CSS 변수 기반 일관된 테마 전환

### i18n (4개 국어)

React Context 기반 딕셔너리 패턴. 페이지 전환 없이 즉시 언어 변경.

| 언어 | 코드 | 번역 키 수 |
|------|------|-----------|
| 한국어 | KO | 130+ |
| English | EN | 130+ |
| 中文 | ZH | 130+ |
| 日本語 | JA | 130+ |

---

## 4. 기술 스택

| 구분 | 기술 | 버전 |
|------|------|------|
| 프레임워크 | Next.js (App Router) | 16.1.6 |
| UI | React | 19 |
| 스타일링 | Tailwind CSS | v4 |
| 컴포넌트 | shadcn/ui + Magic UI | latest |
| 언어 | TypeScript | 5.x |
| 애니메이션 | motion + canvas-confetti | — |
| 데이터 | localStorage | — |

### 기술 선택 근거

| 결정 | 선택 | 이유 |
|------|------|------|
| 데이터 저장 | localStorage | 백엔드 구축 대비 시간 절약. `storage.ts`만 교체하면 API 연동 가능 |
| i18n | Context + Dictionary | next-intl 대비 의존성 최소화. 130+ 키 × 4개 언어 |
| 디자인 | 독자적 테마 | 복제보다 창의성 점수 확보에 유리 |
| 컴포넌트 | shadcn/ui | 소스 코드 소유 방식으로 커스터마이징 용이 |
| 내비게이션 | 스크롤스파이 | 탭보다 컨텐츠 가시성 향상, daker.ai 패턴 반영 |

---

## 5. 프로젝트 구조

```
app/src/
├── app/                        # 페이지 (Next.js App Router)
│   ├── page.tsx                # 홈 (공지 배너 + 기능 쇼케이스)
│   ├── layout.tsx              # 루트 레이아웃 (skip-to-content)
│   ├── globals.css             # 디자인 토큰 + 접근성 스타일
│   ├── hackathons/
│   │   ├── page.tsx            # 해커톤 목록
│   │   └── [slug]/page.tsx     # 해커톤 상세 (스크롤스파이 + 사이드바)
│   ├── camp/page.tsx           # 캠프 (팀 라이프사이클)
│   └── rankings/page.tsx       # 랭킹
├── components/
│   ├── hackathon/              # 도메인 컴포넌트
│   │   ├── hackathon-card.tsx      # 그라데이션 + 배지 강화 카드
│   │   ├── hackathon-eval.tsx      # 루브릭 프로그레스 바
│   │   ├── hackathon-sidebar.tsx   # sticky 사이드바
│   │   ├── hackathon-leaderboard.tsx # 투표 + 메달
│   │   ├── scrollspy-nav.tsx       # IntersectionObserver 내비
│   │   └── ...                     # overview, schedule, prize, info, submit, teams
│   ├── camp/                   # TeamCard (3단계 상태), TeamForm
│   ├── layout/                 # Header, Footer
│   ├── ui/                     # shadcn + Magic UI (21+)
│   └── providers.tsx
├── i18n/                       # 130+ 키 × 4 언어
├── lib/                        # storage, format, seed, utils
└── types/                      # readonly 인터페이스
```

---

## 6. 자체 평가

### 채점 기준별 평가

| 항목 | 배점 | 자체 점수 | 근거 |
|------|------|-----------|------|
| 기본구현 | 30 | 26 | 5개 페이지, 8섹션 스크롤스파이, 사이드바, 팀 CRUD, 검색/필터/정렬, 투표 시스템 |
| 확장/아이디어 | 30 | 24 | 13개 분석 문서(350+ 관찰), 자체 디자인 시스템, 4개 국어 i18n, 루브릭 시각화, 피어 투표, 팀 라이프사이클 |
| 완성도 | 25 | 19 | 반응형, 다크/라이트, 접근성(skip-to-content, focus-visible, aria-live), 스크롤스파이. 백엔드 없음 |
| 문서/설명 | 15 | 13 | 분석 13편, 기획서(이 문서), ARCHITECTURE.md, 분석→구현 추적 표 |
| **합계** | **100** | **82** | |

### 항목별 상세 근거

**기본구현 (26/30)**: 5개 페이지, 해커톤 상세의 8개 섹션(스크롤스파이), 사이드바 레이아웃, 팀 CRUD, 검색/필터/정렬, 피어 투표 시스템이 동작합니다. 감점: localStorage 기반, 인증 없음, 멀티유저 미지원.

**확장/아이디어 (24/30)**: 13개 분석 문서는 이 프로젝트 고유의 차별점입니다. 분석에서 도출한 기능 갭을 체계적으로 해소했습니다: 루브릭 시각화, 투표 가중치 공식, 팀 3단계 라이프사이클, 카드 enrichment, 공지 배너. 독자적 디자인 시스템과 4개 국어 i18n도 확장에 해당합니다. 감점: 실시간 채팅, 알림 시스템 등 미구현.

**완성도 (19/25)**: 반응형, 다크/라이트 모드, 접근성(skip-to-content, focus-visible, aria-live, prefers-reduced-motion), 에러 바운더리, 404 페이지. 감점: 백엔드 없음, 로딩 스켈레톤 일부 미흡.

**문서/설명 (13/15)**: 분석 13편, 기획서, ARCHITECTURE.md. 분석→구현 추적 표로 각 기능의 근거를 명시. 감점: 인라인 코드 문서(JSDoc) 최소 수준.

### 주요 제한 사항

- localStorage 전용 (서버 없음, 5MB 제한)
- 인증/회원가입 미구현
- 실시간 업데이트 미지원
- 시드 데이터 의존

---

## 7. 인수인계 적합성

### 분석 문서 = 인수인계 문서

13개 분석 파일은 플랫폼을 인수받는 팀에게 필요한 형태의 문서입니다. "왜 이렇게 만들었는가"라는 인수인계의 핵심 질문에 분석 문서가 답합니다.

### 확장 진입점

| 작업 | 진입점 |
|------|--------|
| 새 페이지 추가 | `app/` 하위 디렉토리 생성 |
| 새 언어 추가 | `i18n/dictionaries.ts`에 딕셔너리 추가 |
| 새 해커톤 | `public/seed/` JSON 수정 + 데이터 리셋 |
| 백엔드 연동 | `lib/storage.ts`의 localStorage → API 교체 |
| 새 평가 항목 | `rubricCriteria` 배열에 항목 추가 |
| 새 팀 상태 | `TeamStatus` union type 확장 |

---

*작성일: 2026-03-13*

# DAKER Hackathon Platform

> 긴급 인수인계 해커톤 — 해커톤 플랫폼 클론

daker.ai 해커톤 플랫폼을 Next.js 16으로 재구현한 클라이언트 사이드 프로젝트입니다. 13개 체계적 분석 문서를 기반으로, "Code Forge: Brutal Edition" 디자인 시스템을 적용했습니다.

## Quick Start

```bash
pnpm install
pnpm dev
```

`http://localhost:3000`에서 확인할 수 있습니다.

## Tech Stack

- Next.js 16.1.6 / React 19 (App Router)
- Tailwind CSS v4 + shadcn/ui + Magic UI
- TypeScript
- motion + canvas-confetti
- 4-language i18n (KO/EN/ZH/JA)
- localStorage (client-side persistence)

## Features

- **5개 페이지**: 홈, 해커톤 목록, 해커톤 상세(8탭), 캠프(팀), 랭킹
- **디자인 시스템**: Brutal Shell(2px offset shadow) + Glass Interior(backdrop-blur)
- **검색/필터/정렬**: 해커톤 목록 필터링, 상태별/카테고리별 필터
- **팀 관리**: 팀 생성, 조회, 멤버 표시
- **다크/라이트 모드**: CSS 변수 기반 테마 전환
- **접근성**: skip-to-content, ARIA, reduced motion, WCAG contrast
- **분석 문서**: `/analysis/`에 13개 플랫폼 분석 파일 (350+ 관찰 사항)

## Project Structure

```
src/
├── app/                  # Pages (App Router)
│   ├── hackathons/       # 목록 + [slug] 상세
│   ├── camp/             # 팀
│   └── rankings/         # 랭킹
├── components/
│   ├── layout/           # Header, Footer
│   ├── hackathon/        # 9 components
│   ├── camp/             # TeamCard, TeamForm
│   ├── rankings/         # RankingTable
│   └── ui/               # 21 shadcn + Magic UI
├── i18n/                 # dictionaries, context
├── lib/                  # utils, storage, seed, format
└── types/                # TypeScript type definitions
```

## i18n Support

| 코드 | 언어 |
|------|------|
| KO | 한국어 |
| EN | English |
| ZH | 中文 |
| JA | 日本語 |

헤더의 언어 선택기로 전환합니다. `i18n/dictionaries.ts`에서 번역을 관리합니다.

## Development

**새 언어 추가**: `i18n/dictionaries.ts`에 새 locale 딕셔너리를 추가합니다.

**새 해커톤 추가**: `lib/seed.ts`의 시드 데이터에 항목을 추가합니다.

**컴포넌트 추가**: `npx shadcn@latest add <component>` 또는 Magic UI 컴포넌트는 `npx shadcn@latest add "https://magicui.design/r/<name>.json"`

## License

MIT

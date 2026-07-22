# Sanbal Studio Design System

## 1. Atmosphere & Identity

Sanbal Studio는 생활 가까이의 작은 문제를 차분하게 다루는 독립 앱 스튜디오다. 화면은 따뜻한 종이와 짙은 식물성 잉크를 연상시키되, 제품 화면은 실제 작업물처럼 선명하게 전면에 놓는다. 시그니처는 **조용한 편집 레이아웃 위에 비스듬히 겹친 앱 화면**이다. 기존의 연녹색 배경, 짙은 초록, 실제 앱 스크린샷을 유지하면서 동일한 흰 카드와 과한 그림자 사용을 줄인다.

현재 UI에서 추출한 기준은 밝은 웜 뉴트럴 배경, 초록 중심 팔레트, 4px 간격 단위, 1180px 안팎의 컨테이너, 앱 아이콘과 스크린샷을 중심으로 한 콘텐츠다. 개선 시 헤더·푸터의 작은 터치 영역, 미지정 이미지 크기, 8px 반경의 획일적 카드, 긴 URL의 모바일 넘침을 해소한다.

## 2. Color

### Palette

| Role | Token | Value | Usage |
|---|---|---:|---|
| Canvas | `--color-canvas` | `#f3f5ef` | 페이지 배경 |
| Surface | `--color-surface` | `#fbfcf8` | 기본 패널, 문서 표면 |
| Surface muted | `--color-surface-muted` | `#e8eee8` | 보조 섹션, 비활성 배경 |
| Surface strong | `--color-surface-strong` | `#dce5dd` | 선택·강조 영역 |
| Ink | `--color-ink` | `#162019` | 제목과 본문 |
| Ink muted | `--color-ink-muted` | `#526057` | 설명과 보조 정보 |
| Ink subtle | `--color-ink-subtle` | `#748078` | 메타데이터 |
| Line | `--color-line` | `#d2dbd3` | 기본 구분선 |
| Line strong | `--color-line-strong` | `#7f8f83` | 컨트롤 외곽선, Surface 대비 3:1 이상 |
| Brand | `--color-brand` | `#2f684d` | CTA, 링크, 현재 상태 |
| Brand strong | `--color-brand-strong` | `#17442f` | CTA hover, 짙은 표면 |
| Brand soft | `--color-brand-soft` | `#dceade` | 상태 태그, 브랜드 틴트 |
| Focus | `--color-focus` | `#c2472d` | 키보드 포커스 전용 |
| Hero | `--color-hero` | `#0d1712` | 홈 히어로 배경 |
| On dark | `--color-on-dark` | `#f6f7f2` | 어두운 표면의 기본 텍스트 |
| On dark muted | `--color-on-dark-muted` | `#c8d2cb` | 어두운 표면의 보조 텍스트 |
| On dark line | `--color-on-dark-line` | `rgba(246, 247, 242, 0.36)` | 어두운 표면의 외곽선, Hero 대비 3:1 이상 |
| On dark surface | `--color-on-dark-surface` | `rgba(246, 247, 242, 0.09)` | 어두운 표면의 컨트롤 |
| Hero scrim | `--color-hero-scrim` | `rgba(7, 14, 10, 0.58)` | 앱 화면 위 텍스트 대비 |
| Success | `--color-success` | `#2f684d` | 공개·성공 상태 |
| Warning | `--color-warning` | `#865b18` | 출시 준비·주의 상태 |
| Error | `--color-error` | `#a33b2d` | 오류·파괴적 상태 |
| Info | `--color-info` | `#315f87` | 정보 상태 |
| Picmory tint | `--color-product-picmory` | `#f1ecdf` | Picmory 미디어 캔버스 |
| Not Todo tint | `--color-product-not-todo` | `#edf0e8` | Not Todo 미디어 캔버스 |
| Walk Bingo tint | `--color-product-walk-bingo` | `#e2ece3` | 산책빙고 미디어 캔버스 |

### Rules

- Brand 색은 링크, CTA, 현재 페이지 등 상호작용과 상태에 우선 사용한다.
- 제품 틴트는 각 앱의 스크린샷을 받치는 미디어 캔버스에만 사용한다.
- Focus 색은 장식에 쓰지 않는다. `:focus-visible`에서만 사용한다.
- 새 색이 필요하면 먼저 이 표에 의미와 용도를 추가한다.

## 3. Typography

### Scale

| Level | Token | Size | Weight | Line height | Tracking | Usage |
|---|---|---:|---:|---:|---:|---|
| Display | `--text-display` | `clamp(3.5rem, 8vw, 7.5rem)` | 650 | 0.94 | `-0.045em` | 홈 히어로 |
| H1 | `--text-h1` | `clamp(2.5rem, 6vw, 5rem)` | 650 | 1.02 | `-0.035em` | 페이지 제목 |
| H2 | `--text-h2` | `clamp(2rem, 4vw, 3.5rem)` | 620 | 1.08 | `-0.025em` | 주요 섹션 |
| H3 | `--text-h3` | `1.375rem` | 700 | 1.25 | `-0.015em` | 카드·문서 하위 제목 |
| Body large | `--text-body-lg` | `clamp(1.0625rem, 2vw, 1.25rem)` | 450 | 1.7 | `-0.01em` | 리드 문장 |
| Body | `--text-body` | `1rem` | 430 | 1.72 | `-0.008em` | 기본 본문 |
| Body small | `--text-body-sm` | `0.875rem` | 500 | 1.55 | `0` | 보조 정보 |
| Label | `--text-label` | `0.8125rem` | 750 | 1.4 | `0.08em` | eyebrow, 상태 |

### Font Stack

- Display, Body/UI, Code: `Wanted Sans Variable`, `Wanted Sans`, `-apple-system`, `BlinkMacSystemFont`, `system-ui`, `Segoe UI`, `Apple SD Gothic Neo`, `Noto Sans KR`, `Malgun Gothic`, `sans-serif`
- 원티드 공식 가변 동적 서브셋을 사용하고, 제목·본문·라벨·코드까지 같은 서체로 통일한다.

### Rules

- 서체는 전 영역에서 원티드 산스로 통일하고, 크기·굵기·행간으로 위계를 구분한다.
- 본문은 16px 미만으로 내려가지 않고, 장문은 약 68자 폭으로 제한한다.
- 큰 제목은 `text-wrap: balance`, 본문은 `text-wrap: pretty`를 사용한다.

## 4. Spacing & Layout

### Base Unit

모든 간격은 4px 단위다.

| Token | Value | Usage |
|---|---:|---|
| `--space-1` | `0.25rem` | 4px, 초밀집 |
| `--space-2` | `0.5rem` | 8px, 아이콘과 라벨 |
| `--space-3` | `0.75rem` | 12px, 인라인 그룹 |
| `--space-4` | `1rem` | 16px, 기본 패딩 |
| `--space-5` | `1.25rem` | 20px, 편안한 간격 |
| `--space-6` | `1.5rem` | 24px, 카드 내부 |
| `--space-8` | `2rem` | 32px, 그룹 사이 |
| `--space-10` | `2.5rem` | 40px, 섹션 내부 |
| `--space-12` | `3rem` | 48px, 큰 그룹 |
| `--space-16` | `4rem` | 64px, 페이지 리듬 |
| `--space-20` | `5rem` | 80px, 섹션 간격 |
| `--space-24` | `6rem` | 96px, 최대 간격 |

### Grid

- Max content width: `--layout-max: 75rem` (1200px)
- Narrow prose width: `--layout-narrow: 48rem` (768px)
- Header height: `--header-height: 4.5rem` (72px)
- Desktop: 12-column grid, 24px gutter
- Tablet: 6-column grid, 24px gutter
- Mobile: 1-column, 20px page margin
- Breakpoints: compact 680px, stacked 900px, wide 1200px

### Radius

- `--radius-control: 0.625rem` (10px): 버튼과 작은 컨트롤
- `--radius-panel: 1.25rem` (20px): 카드와 문서 패널
- `--radius-artifact: 1.75rem` (28px): 앱 아이콘과 스크린샷 프레임
- `--radius-round: 999px`: 상태 태그

### Product image sizes

- `--size-icon-sm: 3.5rem` (56px): 목록 아이콘
- `--size-icon-md: 4.5rem` (72px): 정책 헤더 아이콘
- `--size-icon-lg: 5.5rem` (88px): 카드·지원 헤더 아이콘
- `--size-icon-xl: 6.5rem` (104px): 앱 상세 아이콘

## 5. Components

### Site chrome

- **Structure**: skip link → sticky header with brand/navigation → main → compact footer.
- **Spacing**: `--space-4`, `--space-6`, `--header-height`, `--layout-max`.
- **States**: nav default, hover, active/current, focus.
- **Accessibility**: 모든 링크는 최소 44px 높이, 현재 페이지에 `aria-current`, 두 개의 명명된 `nav`, skip link 제공.
- **Motion**: 색과 배경 전환만 `--motion-fast`.

### Button

- **Variants**: primary, secondary, subtle.
- **Spacing**: 좌우 `--space-5`, 최소 높이 44px.
- **States**: hover는 대비와 `translateY(-1px)`, active는 `translateY(1px)`, focus는 Focus 링, disabled는 55% opacity와 상호작용 제거.
- **Accessibility**: 링크는 실제 목적지 사용, 아이콘 단독 버튼은 접근 가능한 이름 필수.
- **Motion**: `transform`, `background-color`, `border-color`, `color`만 사용.

### Status tag

- **Variants**: published, coming soon.
- **Spacing**: `--space-1`/`--space-3`, pill radius.
- **States**: 비대화형 정보 표시라 hover와 active 없음.
- **Accessibility**: 색만으로 상태를 구분하지 않고 텍스트를 함께 제공.

### App card

- **Structure**: 앱 정보 링크 + 상태/제목/요약 + 실제 앱 화면 미디어 + 스토어/지원 링크.
- **Variants**: standard 6-column, wide 12-column.
- **Spacing**: `--space-6`에서 `--space-8`; 미디어는 제품별 tint 사용.
- **States**: 카드 내부 주 링크 hover/focus 시 제목과 미디어가 함께 반응; 개별 CTA 상태는 Button 규칙 적용.
- **Accessibility**: 의미 있는 아이콘 alt, 스크린샷 alt, 중첩 링크 금지, 모바일에서 읽기 순서 유지.
- **Motion**: 주 링크 hover에서 미디어를 최대 4px 이동. Reduced motion에서는 이동 제거.

### Breadcrumbs

- **Structure**: 홈 / 앱 / 현재 문서의 순서 있는 목록.
- **States**: 링크 default, hover, focus; 현재 항목에 `aria-current="page"`.
- **Accessibility**: `nav[aria-label="현재 위치"]`, 장식 구분자는 숨김 처리.
- **Motion**: 색 전환만 사용.

### Screenshot gallery

- **Structure**: 섹션 제목 + figure 목록.
- **Variants**: desktop 3-column, mobile horizontal snap rail.
- **States**: 키보드 스크롤 가능, hover는 스크린샷이 아니라 프레임의 깊이만 강조.
- **Accessibility**: 명확한 이미지 alt, 고정 `width`/`height`, 모바일 rail에 설명 가능한 영역 이름.
- **Motion**: 프레임의 `transform`과 shadow 전환; reduced motion에서 이동 제거.

### Responsive product image

- **Structure**: WebP `source`의 2단계 `srcset` + 원본 PNG fallback 이미지.
- **Variants**: 앱 아이콘 192/384px, 앱 스크린샷 660/990px.
- **Accessibility**: 의미 있는 이미지에는 구체적인 alt, 중복 장식 이미지에는 빈 alt, 모든 이미지에는 원본 비율의 `width`/`height`를 제공한다.
- **Performance**: 실제 표시 폭을 `sizes`로 명시하고, 첫 화면 핵심 이미지 하나만 `fetchpriority="high"`로 설정한다.
- **Motion**: 이미지 컴포넌트 자체에는 없음. 상위 프리미티브의 transform만 따른다.

### Prose document

- **Structure**: 제목 계층, 문단, 목록, 링크, 표와 코드.
- **Spacing**: 문단 `--space-4`, 섹션 `--space-10`/`--space-12`.
- **States**: 링크 default, hover, focus; 긴 URL은 어느 뷰포트에서도 줄바꿈.
- **Accessibility**: 68자 안팎 measure, 1.7 이상 line-height, 표는 가로 스크롤을 허용하되 페이지 전체 overflow는 만들지 않는다.
- **Motion**: 없음.

## 6. Motion & Interaction

| Type | Token | Duration | Easing | Usage |
|---|---|---:|---|---|
| Fast | `--motion-fast` | 140ms | `ease-out` | 포커스·hover 색 전환 |
| Standard | `--motion-standard` | 220ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | 버튼·카드 이동 |
| Emphasis | `--motion-emphasis` | 480ms | `cubic-bezier(0.16, 1, 0.3, 1)` | 초기 히어로 콘텐츠 진입 |

- 이동은 `transform`, 등장과 상태 변화는 `opacity`만 사용한다.
- 동작은 클릭 가능성, 현재 상태, 계층을 설명할 때만 사용한다.
- `prefers-reduced-motion: reduce`에서는 scroll behavior와 비필수 transform을 제거한다.

## 7. Depth & Surface

### Strategy: mixed, with strict roles

- 기본 레이아웃은 tonal shift와 1px line으로 구분한다.
- 그림자는 앱 아이콘, 스크린샷, sticky 지원 패널처럼 실제로 떠 있는 제품 아티팩트에만 사용한다.
- 모든 그림자는 따뜻한 초록 기운의 같은 광원 방향을 따른다.

| Level | Token | Value | Usage |
|---|---|---|---|
| Subtle | `--shadow-subtle` | `0 1px 2px rgba(22, 32, 25, 0.06), 0 8px 24px rgba(22, 32, 25, 0.05)` | hover 패널 |
| Elevated | `--shadow-elevated` | `0 18px 48px rgba(20, 43, 30, 0.14)` | sticky 지원 패널, 앱 아이콘 |
| Artifact | `--shadow-artifact` | `0 28px 80px rgba(4, 11, 7, 0.34)` | 홈 히어로 스크린샷 |

## 8. Accessibility Constraints & Accepted Debt

### Inclusive personas

- **한 손으로 탐색하는 모바일 방문자**: 375px에서 가로 스크롤 없이 앱과 지원 링크에 도달하고, 주요 터치 대상은 44px 이상이어야 한다.
- **키보드와 확대를 사용하는 저시력 방문자**: 논리적인 탭 순서, 모든 대화형 요소의 명확한 focus ring, 200% 확대에서도 콘텐츠 손실이 없어야 한다.
- **긴 정책 문서를 읽는 방문자**: 제목 계층, 68자 안팎의 본문 폭, 긴 URL 줄바꿈, 충분한 문단 간격으로 현재 위치를 잃지 않아야 한다.

### Constraints

- 목표: WCAG 2.2 AA. 본문 대비 4.5:1, 큰 텍스트와 UI 경계 3:1 이상.
- 모든 상호작용은 키보드로 도달 가능하고, focus indicator를 제거하지 않는다.
- `prefers-reduced-motion`을 존중하며 콘텐츠 이해에 필요하지 않은 애니메이션을 끈다.
- 375px, 768px, 1280px와 200% 확대에서 핵심 콘텐츠와 기능을 유지한다.
- 이미지에는 의미에 맞는 alt와 고정 dimensions를 제공한다. 중복 장식 이미지는 빈 alt를 사용한다.

### Accepted Debt

현재 승인된 디자인 또는 접근성 부채는 없다.

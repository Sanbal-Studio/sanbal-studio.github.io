# sanbal-studio-site

Astro 기반 Sanbal Studio 사이트 프로젝트입니다.

## Environment

- Node.js: v24 (`fnm use`)
- Package manager: pnpm

## Commands

| Command | Action |
| :-- | :-- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start local dev server at `localhost:4321` |
| `pnpm build` | Build production site to `./dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm astro ...` | Run Astro CLI commands |

## Deployment

GitHub Pages는 GitHub Actions를 Source로 사용합니다.

- `main` 브랜치에 push되면 `.github/workflows/pages.yml`이 `pnpm build`를 실행합니다.
- 빌드 산출물인 `dist/`가 Pages artifact로 업로드되고 GitHub Pages에 배포됩니다.

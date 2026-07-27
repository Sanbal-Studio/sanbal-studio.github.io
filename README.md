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

## App listing API

공개 중인 Sanbal Studio 앱 목록은 아래 정적 JSON API로 조회할 수 있습니다. `comingSoon` 상태의 앱은 포함하지 않습니다.

```sh
curl https://sanbal-studio.github.io/api/apps.json
```

```json
{
  "apps": [
    {
      "name": "Picmory",
      "iconUrl": "https://sanbal-studio.github.io/assets/apps/picmory/icon.png",
      "appstoreUrl": "https://apps.apple.com/kr/app/picmory/id6476240673",
      "playstoreUrl": ""
    }
  ]
}
```

## Deployment

GitHub Pages는 GitHub Actions를 Source로 사용합니다.

- `main` 브랜치에 push되면 `.github/workflows/pages.yml`이 `pnpm build`를 실행합니다.
- 빌드 산출물인 `dist/`가 Pages artifact로 업로드되고 GitHub Pages에 배포됩니다.

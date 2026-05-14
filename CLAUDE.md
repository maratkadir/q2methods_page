
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Next.js Version

This project uses **Next.js 16.2.4**, which has breaking changes from prior versions. Before writing any Next.js-specific code, check the relevant guide in `node_modules/next/dist/docs/` — APIs, conventions, and file structure may differ from training data.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint
npm start        # Start production server
```

All commands run from `quant-consulting-site/`.

## Architecture

**Q2Methods marketing site** — a Next.js App Router site for a quantitative consulting firm. All content (team bios, service descriptions, project categories) is hardcoded in page components; there is no CMS or database.

### Key routes

| Route | Purpose |
|---|---|
| `/` | Landing page — hero, capabilities overview |
| `/about-us` | Team profiles and core competencies |
| `/projects` | Service categories (T+1, EMIR, risk, AI) |
| `/contacts` | Contact info |
| `/ai` | AI Twin chat UI (client component) |
| `/api/twin-chat` | POST endpoint for AI Twin; calls OpenRouter API |
| `/impressum` | German legal notice (DDG-required) |

### AI Twin system

`/ai` renders a client-side chat interface. Messages POST to `/api/twin-chat/route.ts`, which calls OpenRouter with a detailed persona system prompt (Marat Kadir's digital twin). Requires `OPENROUTER_API_KEY` in `.env.local` (or the parent `../.env`).

### Styling

Tailwind CSS 4 via PostCSS plugin (`@tailwindcss/postcss`). Theme lives in CSS custom properties in `src/app/globals.css` — edit those variables, not Tailwind config, to change colors. Key vars: `--bg-color`, `--primary-text`, `--navbar-bg`, `--accent-color`.

### Path aliases

`@/*` resolves to `./src/*` (configured in `tsconfig.json`).

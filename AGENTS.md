# AGENTS.md — Digital Resume

A single-page React 19 app (Vite 8 + TypeScript 6 + Tailwind CSS 4) deployed as a Cloudflare Workers static asset site. Glassmorphic personal resume.

## Commands

| Command | Action |
|---|---|
| `pnpm dev` | Vite dev server (localhost:5173, HMR) |
| `pnpm build` | `tsc -b && vite build` — typecheck then bundle |
| `pnpm lint` | `eslint .` |
| `pnpm preview` | `vite preview` (serve built `dist/` locally) |
| `npx wrangler deploy` | Deploy `dist/` to Cloudflare Workers |

Build order matters — `pnpm build` runs `tsc -b` (project references in `tsconfig.json`) then `vite build`.

**No test runner.** No CI workflows (`.github/` does not exist).

## TypeScript quirks

- `verbatimModuleSyntax` → must use `import type` / `import { type Foo }`; never strip imports
- `erasableSyntaxOnly` → no enums, no namespaces, no parameter properties
- `noUnusedLocals` + `noUnusedParameters` → strict unused checking
- `@` import alias maps to `./src` (configured in both `vite.config.ts` and `tsconfig.app.json`)

## Dark mode

`.dark` class on `<html>` toggles theme. Persisted to `localStorage.theme`. Use `useDark()` from `@/hooks/use-dark` (`import { useDark } from "@/context/dark-context"` also works — single source in `src/context/dark-context.tsx`).

## Deployment

Cloudflare **Workers** with static assets (not Cloudflare Pages). Wrangler config at `wrangler.jsonc`:
- SPA fallback via `not_found_handling: "single-page-application"`
- Observability configured but disabled
- Wrangler build step uses `pnpm build` — hardcoded in `wrangler.jsonc`

## Project structure

```
src/
  main.tsx           — ReactDOM entry
  App.tsx            — BrowserRouter + DarkProvider + routes
  pages/Index.tsx    — homepage (assembles all sections)
  pages/NotFound.tsx — 404
  components/sections/ — page sections (Experience, About, TechStack, etc.)
  components/ui/     — shadcn/ui primitives (button, dialog, toggle, etc.)
  context/dark-context.tsx  — dark mode context + provider
  hooks/             — useDark, useIsMobile
  lib/utils.ts       — cn() helper (clsx + tailwind-merge)
  index.css          — Tailwind v4 entry + custom theme tokens + keyframes
```

## Gotchas

- `pnpm-workspace.yaml` exists only to disable `msw` builds — not a real monorepo.
- `shadcn` listed as a regular dependency (not devDep) — from `shadcn@4` CLI use.


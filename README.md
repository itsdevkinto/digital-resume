# Digital Resume

[![Build](https://img.shields.io/badge/build-passing-brightgreen)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-58c4dc)](https://react.dev/)
[![License](https://img.shields.io/badge/license-MIT-blue)]()

A glassmorphic single-page resume for **Andrei Lopez** — full-stack engineer, community builder, and embedded systems tinkerer. Built with React 19, TypeScript 6, Vite 8, and Tailwind CSS 4. Deployed on Cloudflare Workers.

**[→ Live Demo](https://portfolio-site.yo-kinto-x.workers.dev/)**

---

## Pages

| Route | Content |
|---|---|
| `/` | Homepage — profile, about, experience, tech stack, projects, certifications, recommendations, contact |
| `/achievements` | Card-grid Awards, Publications, Speaking with pill navigation, branded org icons, and fade transitions |
| `*` | 404 |

## Features

- **Glassmorphic design** — translucent surfaces, ambient gradient lamps, subtle blur
- **Dark mode** — context-driven toggle on every page, persisted to `localStorage`, respects `prefers-color-scheme`, neutral gray-black palette with layered background hierarchy
- **Scroll-reveal animations** — IntersectionObserver-based blur + translate entrance on section scroll
- **Tabbed Achievements** — section pill navigation with Framer Motion fade transitions, URL hash sync, browser back/forward support
- **Tech stack badges** — brand-color icons on every skill pill (React, TypeScript, Docker, etc.)
- **Fully responsive** — mobile-first layout, adaptive grid, fluid typography
- **SPA routing** — React Router v7 with Cloudflare Workers SPA fallback
- **Type-safe** — strict TypeScript with `verbatimModuleSyntax`, `erasableSyntaxOnly`, no unused locals

## Tech Stack

- **Framework**: React 19, TypeScript 6, Vite 8
- **Styling**: Tailwind CSS 4, CSS variables, `@theme inline` tokens
- **UI**: shadcn/ui, Radix UI primitives (Dialog, Toggle, Toast, Sheet, Separator)
- **Icons**: Lucide React, `react-icons` (Tabler, Simple Icons)
- **Animation**: Framer Motion 12, custom IntersectionObserver `Reveal` component
- **Routing**: React Router v7 (BrowserRouter)
- **Fonts**: Geist Variable (body), DM Serif Display (headings), DM Sans
- **Deployment**: Cloudflare Workers (`wrangler.jsonc`), SPA fallback

## Commands

| Command | Action |
|---|---|
| `pnpm dev` | Dev server at `localhost:5173` with HMR |
| `pnpm build` | `tsc -b && vite build` — typecheck then bundle |
| `pnpm lint` | `eslint .` |
| `pnpm preview` | `vite preview` — serve built `dist/` locally |
| `npx wrangler deploy` | Deploy `dist/` to Cloudflare Workers |

## Project Structure

```
src/
├── main.tsx                        # ReactDOM entry
├── App.tsx                         # BrowserRouter + DarkProvider + routes
├── index.css                       # Tailwind v4 + theme tokens + keyframes
├── pages/
│   ├── Index.tsx                   # Homepage (assembles all sections)
│   ├── Achievements.tsx            # Tabbed awards/publications/speaking
│   └── NotFound.tsx                # 404
├── components/
│   ├── sections/                   # Page sections (Profile, About, Experience, etc.)
│   ├── ui/                         # shadcn/ui primitives
│   ├── ambient-background.tsx      # Gradient lamp layers
│   ├── Reveal.tsx                  # Scroll-entrance animation
│   ├── RevealSequence.tsx          # Staggered reveal wrapper
│   └── Section.tsx                 # Section layout wrapper
├── context/
│   └── dark-context.tsx            # Dark mode context + provider
├── hooks/
│   ├── use-dark.ts                 # Dark mode hook (re-export)
│   └── use-mobile.tsx              # Mobile breakpoint hook
└── lib/
    └── utils.ts                    # cn() helper (clsx + tailwind-merge)
```

## Deployment

The site is served as static assets from **Cloudflare Workers** (not Pages). SPA routing is handled via `not_found_handling: "single-page-application"` in `wrangler.jsonc`.

```bash
npx wrangler deploy
```

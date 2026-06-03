# Digital Resume

[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-58c4dc?logo=react&logoColor=white)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-deployed-f38020?logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![License](https://img.shields.io/badge/license-MIT-blue)]()

A glassmorphic personal portfolio and resume for **Andrei Lopez** — a full-stack software engineer specializing in modern web applications, developer tooling, and embedded systems.

**[View live demo →](https://portfolio-site.yo-kinto-x.workers.dev/)**

---

## Overview

This is a single-page application built with React 19 and TypeScript 6, styled with Tailwind CSS 4 and shadcn/ui primitives. The site is prerendered at build time for SEO and social crawler compatibility, then served as a static asset from Cloudflare Workers with SPA fallback routing.

## Features

- **Glassmorphic design** — translucent UI surfaces with ambient gradient lighting and subtle backdrop blur effects
- **Dark mode** — theme toggle persisted to `localStorage`, respects system `prefers-color-scheme`
- **Scroll-reveal animations** — IntersectionObserver-driven blur and translate transitions as sections enter the viewport
- **Tabbed achievements** — pill navigation with Framer Motion fade transitions, URL hash synchronization, and browser history support
- **Social preview cards** — Open Graph and Twitter Card meta tags with a dedicated preview image for rich link sharing on Messenger, Discord, LinkedIn, and Twitter
- **Responsive layout** — mobile-first design with adaptive grids and fluid typography across all breakpoints
- **Type safety** — strict TypeScript configuration with `verbatimModuleSyntax`, `erasableSyntaxOnly`, and comprehensive unused-variable checking

## Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | React 19, TypeScript 6, Vite 8 |
| **Styling** | Tailwind CSS 4, CSS custom properties, `@theme inline` tokens |
| **UI Components** | shadcn/ui, Radix UI primitives (Dialog, Toggle, Toast, Sheet, Separator) |
| **Animation** | Framer Motion 12, custom IntersectionObserver Reveal component |
| **Routing** | React Router v7 (BrowserRouter) |
| **Fonts** | Geist Variable (body), DM Serif Display (headings), DM Sans |
| **Icons** | Lucide React, react-icons (Tabler, Simple Icons) |
| **Deployment** | Cloudflare Workers (static assets), SSR prerendering via react-dom/server |

## Project Structure

```
src/
├── main.tsx                         # Application entry point
├── App.tsx                          # Router, theme provider, layout
├── index.css                        # Tailwind entry, theme tokens, keyframes
├── pages/
│   ├── Index.tsx                    # Homepage — assembles all sections
│   ├── Achievements.tsx             # Tabbed awards, publications, speaking
│   └── NotFound.tsx                 # 404 page
├── components/
│   ├── sections/                    # Page sections (Profile, About, Experience, etc.)
│   ├── ui/                          # shadcn/ui primitives
│   ├── ambient-background.tsx       # Animated gradient lamp layers
│   ├── Reveal.tsx                   # Scroll-entrance animation component
│   ├── RevealSequence.tsx           # Staggered reveal wrapper
│   └── Section.tsx                  # Section layout wrapper
├── context/
│   └── dark-context.tsx             # Dark mode context and provider
├── hooks/
│   ├── use-dark.ts                  # Dark mode accessor hook
│   └── use-mobile.tsx               # Responsive breakpoint detection
└── lib/
    └── utils.ts                     # cn() utility (clsx + tailwind-merge)
scripts/
└── prerender.mjs                    # Static prerendering script
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server with HMR
pnpm dev

# Typecheck and build for production
pnpm build

# Preview production build locally
pnpm preview

# Deploy to Cloudflare Workers
npx wrangler deploy
```

## Deployment

The site is deployed as a **Cloudflare Workers** static assets application (not Cloudflare Pages). The `wrangler.jsonc` configuration handles SPA routing via `not_found_handling: "single-page-application"`, ensuring client-side routes work correctly on page reload. The build step runs `tsc -b` for type checking, followed by `vite build` for bundling, and finally a prerender script that generates static HTML for each route.

---

<p align="center">
  <sub>Built with React 19 · TypeScript 6 · Tailwind CSS 4 · Cloudflare Workers</sub>
</p>

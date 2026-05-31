# Digital Resume

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]
[![License](https://img.shields.io/badge/license-MIT-blue)]
[![Coverage](https://img.shields.io/badge/coverage-0%25-red)]

A premium, modern, and dynamically animated personal biography web application built with React and TypeScript. It delivers a visually striking, glass‑morphic interface with global dark‑mode support, targeting developers and professionals who require a polished digital presence.

## Live Demo

🚀 **Experience the live preview**: <https://portfolio-site.yo-kinto-x.workers.dev/>

## Key Features

- **Glass‑morphic UI** with gradient backgrounds and subtle micro‑animations.
- **Global dark‑mode** managed via a React Context, ensuring theme consistency across all components.
- **Responsive layout** optimized for mobile, tablet, and desktop viewports.
- **Component‑driven architecture** leveraging Radix UI primitives and custom animations.
- **Type‑safe development** using TypeScript with strict linting and testing configuration.
- **Static site generation** optimized for deployment on Cloudflare Pages.
- **Extensible design system** based on Tailwind CSS and CSS variables for theming.

## Tech Stack

- React 19, TypeScript 6, Vite 8, Tailwind CSS 4
- Radix UI primitives, shadcn/ui components, Lucide icons
- Cloudflare Workers (static assets), Wrangler CLI
- Node.js ≥ 20, pnpm ≥ 9

## Commands

```bash
pnpm dev       # Dev server at localhost:5173 with HMR
pnpm build     # tsc -b && vite build
pnpm lint      # eslint .
pnpm preview   # vite preview (serve dist/)
npx wrangler deploy  # Deploy dist/ to Cloudflare Workers
```


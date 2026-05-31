# Digital Resume

A single-page React 19 application (Vite 8 + TypeScript 6 + Tailwind CSS 4) deployed as a Cloudflare Workers static asset site. Glassmorphic personal resume.

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

## License

MIT

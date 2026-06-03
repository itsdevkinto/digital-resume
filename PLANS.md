# PLANS — Future work

## Projects page at `/projects`

### Page layout
- Full-page route (like Achievements) with `AmbientBackground`, back nav `<Link to="/">` + theme toggle in the top bar
- Serif page heading "Projects" with a subtitle like "Recent work and side projects"
- 2-column grid below (stacks to 1 col on mobile)

### Card design (YouTube-style)
```
┌───────────────────────┐
│                       │
│  [screenshot/thumb]   │  ← whole card clickable → liveUrl
│                       │
├───────────────────────┤
│  Project Name    2026 │  ← card click → liveUrl
│  ───────────────────── │
│  Truncated desc...    │  ← line-clamp-3
│                       │
│  [GitHub icon]  ───── │  ← stops propagation, opens ghUrl
└───────────────────────┘
```

### Data model
```ts
interface Project {
  name: string
  description: string
  year: string
  liveUrl: string
  ghUrl?: string
  img?: string            // path to screenshot, optional
}
```
Data embedded as `const projects: Project[]` in the page file.

### Card behavior
- Card click → `window.open(liveUrl, "_blank")`
- GitHub icon → `e.stopPropagation()` + opens ghUrl
- Description: `line-clamp-3`
- Screenshot: gradient placeholder if no image

### Route
Add `<Route path="/projects" element={<Projects />} />` in `App.tsx` above the catch-all.

### Homepage link
Change `href="#"` → `<Link to="/projects">` in `ProjectsSection.tsx`. Optionally add a badge in `ProfileSection.tsx`.

### Design references
- Follow Achievements card style: `dark:bg-white/4` container with `dark:bg-dark-surface` inner cards, left-aligned org icons with brand colors, entry numbers, hover lift
- Add `orgIcon?: IconType; orgColor?: string` to `Project` interface for project org/brand visual anchors (like Achievements)
- Use the same `hover:-translate-y-0.5 hover:shadow-lg` card interaction pattern

### Out of scope (first pass)
- No modal, no detail page, no sub-routes
- No categorization/tabs/pill nav
- No tech tags on cards (easy to add later)
- No real screenshots yet — placeholder gradients

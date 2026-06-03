# PLANS — Future work

## Status: skeletons built, needs real data

All page layouts, card grids, dark mode styling, and navigation are implemented. Remaining work is filling in real content.

---

## Achievements (`/achievements`) — needs data

- [x] 2-column card grid with branded org icons and colors
- [x] Pill navigation with section filtering
- [x] Dark mode card styling
- **Needs**: real org names, real org icons, real descriptions per entry

## Projects (`/projects`) — needs data

- [x] Full-page route with back nav + theme toggle
- [x] Serif heading with byline and GitHub profile link
- [x] 2-column card grid with gradient placeholders
- [x] Card click → liveUrl, GitHub link with stopPropagation
- [x] Dark mode consistency
- **Needs**: real live URLs, real GitHub URLs, real screenshots (replace gradient placeholders), real project descriptions

## Certifications — needs data

- [ ] Add `issuerIcon` + `issuerColor` fields to certification entries (follow Achievements org icon pattern)
- [ ] Update certification cards to show issuer icons with brand colors
- [ ] Input real cert data (issuer, date, credential URL, etc.)

## Testimonials / Recommendations — needs data

- [ ] Add real testimonial entries with real names, titles, and quotes
- [ ] Optionally add avatar images or org icons per testimonial
- [ ] Review carousel behavior on mobile

## Backlog

- Replace gradient placeholders with real project screenshots
- Add tech stack tags to project cards
- Add `orgIcon` + `orgColor` to Projects interface for project-level brand icons
- Add a Projects badge to ProfileSection on homepage
- Review all placeholder/mock data site-wide before production launch

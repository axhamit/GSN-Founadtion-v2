# GSN Foundation: 

Next.js 14 (App Router) + TypeScript. Dark navy / violet / cyan design system, a lazy-loaded 3D hero (React Three Fiber), five AI course pages, and technical SEO.

## Run
```bash
npm install
cp .env.example .env.local
npm run dev          # http://localhost:3000
npm run build && npm start
```

## IMPORTANT: this is a standalone project
I could not see your existing repository. This zip is a complete, building project that reproduces the live site's programs, plus the new AI courses. To use it:
- **Merge into your repo**: copy `src/data/courses.ts`, `src/components/*`, `src/app/*` and `src/lib/*` over the matching paths, then reconcile with your existing routes, auth and forms.
- **Or deploy it as-is** on Vercel after replacing the placeholders below.

## What to replace or confirm before launch
| Item | Where |
|---|---|
| Sign In / Sign Up URLs | `NEXT_PUBLIC_SIGNIN_URL`, `NEXT_PUBLIC_SIGNUP_URL` |
| Inquiry delivery (form returns an error until set) | `INQUIRY_WEBHOOK_URL`, or point `ContactForm` at your existing handler |
| Existing-course syllabus, fees, schedule | `src/data/courses.ts` (those entries have `placeholder: true`) |
| Header stats (50+ faculty, 10K+ students) | `src/lib/site.ts`. Copied from your current site; verify them |
| Privacy Policy / Terms / Admissions / Results / FAQ pages | Not included; add your real pages and link them in `Footer.tsx` |
| Search Console / Bing tokens | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION` |

## Approving the AI courses
The five AI courses are `status: "proposed"`, `approved: false`. While unapproved they are **noindex** and excluded from the sitemap, and show "Coming soon" and "Register interest" (not "Enroll"). To publish:
1. Review and edit their content in `src/data/courses.ts`.
2. Set `approved: true` per course, or set `INDEX_PROPOSED_COURSES=true` to publish all at once.
3. Add duration, fees and delivery mode only once confirmed.

## Structure
- `src/data/courses.ts`: single source of truth for all courses (add a course = add an object).
- `src/app/courses/[slug]`: one dynamic template, unique content, metadata and JSON-LD per course.
- `src/app/courses/artificial-intelligence`: AI category page. `learning-paths`: suggested orders.
- `src/components/HeroScene.tsx`: 3D network. Loaded dynamically; skipped on small screens, reduced-motion, or no WebGL (CSS orb fallback).
- SEO: Metadata API, canonicals, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, Organization/WebSite/BreadcrumbList/Course JSON-LD (no ratings, prices or reviews).
- `next.config.mjs`: redirects `gsnfoundation.com` to `www`. Also configure the domain redirect in Vercel.

## Verified
`tsc --noEmit` and `next build` pass; all routes return 200 (unknown path returns 404); sitemap, robots and canonicals checked on a running server. Lighthouse and Core Web Vitals were **not** measured. Run them on your deployed preview.

## Not included
Resources/blog section, student progress and auth screens, per-course 3D scenes (each course uses a distinct SVG illustration instead).

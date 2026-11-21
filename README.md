# Menil Patel — Portfolio

Personal portfolio and project case studies. React 19 + TypeScript + Vite, Tailwind CSS v4, Framer Motion, Lucide icons.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
npm run lint     # oxlint
```

## Structure

```
src/
  App.tsx                 route resolution, scroll handling, MotionConfig (respects reduced motion)
  lib/
    site.ts               identity, contact details and every external profile URL
    navigation.ts         tiny History-API router (usePathname, navigate, scrollToHash)
    router.tsx            <Link> for client-side navigation
    usePageMeta.ts        per-route <title> / description
    useActiveSection.ts   navbar active-section tracking
  data/                   all content lives here, typed by data/types.ts
    projects.ts           featured, other and academic projects (drives cards + case-study pages)
    experience.ts  skills.ts  achievements.ts  education.ts
  components/             page sections (Hero, About, Experience, Projects, Skills, Achievements, Education, Contact)
    project/              ProjectVisual, ProjectPanels, ProjectLinks
    ui/                   FlowDiagram, SectionHeading, Reveal, Button, Icons
  pages/                  Home, ProjectDetail (/projects/:slug), NotFound
public/
  resume/Menil_Patel_Resume.pdf
  projects/defi-nexus/    screenshots captured from the live deployment
```

## Updating content

- **Add or edit a project:** add an entry to `src/data/projects.ts`. The card and `/projects/<slug>` page are generated from it.
- **Competitive programming stats** are maintained by hand in `src/data/achievements.ts` — bump `statsLastUpdated` when they change.
- **Resume:** replace `public/resume/Menil_Patel_Resume.pdf` (keep the filename).

## Deployment

`vercel.json` rewrites non-file routes to `index.html` so deep links like `/projects/sealapi` work on refresh.

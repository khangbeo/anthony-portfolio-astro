# Anthony Duong — Portfolio (Astro prototype)

A static-site prototype of [anthonyduong.vercel.app](https://anthonyduong.vercel.app),
rebuilt with [Astro](https://astro.build) to compare stacks against the current
Next.js version. All content (projects, experience, skills, hero/about copy, and
the 8 blog posts) is ported from the Next.js site's real data, not placeholder text.

**Prototype only** — not deployed, and the Next.js repo is untouched.

## Run it

```bash
npm install     # install dependencies
npm run dev     # local dev server at http://localhost:4321
npm run build   # production build into dist/
npm run preview # preview the production build locally
```

## Structure

```
src/
  content/blog/       the 8 blog posts as Markdown files (frontmatter: title, date, slug)
  content.config.ts   blog content collection (glob loader + schema)
  data/userData.js    projects, experience, skills, hero/about copy, socials
  layouts/
    BaseLayout.astro  shared header/nav, footer, socials, ClientRouter
  components/
    ProjectCard.astro project card (hover lift via CSS transition)
    BlogList.astro    blog index rows (hover lift via CSS transition)
    SectionHeading.astro
    Socials.astro     GitHub / LinkedIn / email icons (inline SVG)
  pages/
    index.astro       home: hero, featured projects, experience, skills, latest blogs
    projects.astro    all projects
    blog/index.astro  blog index
    blog/[slug].astro one page per post, generated from the Markdown files
    about.astro
    contact.astro
  styles/global.css   the whole design in plain CSS (no Tailwind, no UI framework)
public/images/        project screenshots, copied from the Next.js site
```

## Routes (13 pages)

`/` · `/projects` · `/blog` · `/about` · `/contact` · and one page per post:
`/blog/web-development`, `/blog/ai-training`, `/blog/technical-support`,
`/blog/passion-in-technology`, `/blog/creative-journey`, `/blog/mindfulness-in-tech`,
`/blog/support-engineer-lessons`, `/blog/building-projects`.

## Next.js version vs this

**What carried over, unchanged:**

- Every word of content: hero headline and description, 9 projects (Pixel Art
  Editor and StudyCarrd featured), 3 experience entries, 4 skill groups, About
  and Contact copy, social links.
- The PR #3 dark modern look: background `#09090b`, surfaces `#18181b`, borders
  white/10, blue accent, centered section headings, clean stacked experience
  entries with no timeline rail.
- Card hover behavior (lift, border glow, image zoom) and smooth page fades.

**What Astro does differently:**

- **Blog = content collections.** Posts are Markdown files in
  `src/content/blog/`, loaded with the glob loader and a typed schema. Adding a
  post is dropping in a `.md` file. The Next.js version hand-rolled this with
  `gray-matter` + `marked` in `lib/posts.js`, plus a separate hand-maintained
  post list in `constants/blogs.js`; here the files are the single source of truth.
- **Page transitions = ClientRouter.** One `<ClientRouter />` in the layout
  gives crossfade navigation via the View Transitions API. The Next.js version
  needed framer-motion's `AnimatePresence` wrapping the app in `_app.js`
  (plus a globals.css fix so card transitions were not overridden).
- **Zero JS by default.** Pages ship as plain HTML/CSS; the only JavaScript is
  Astro's small router script and a tiny inline handler on the contact form.
  No React, no framer-motion, no Tailwind — the design is one hand-written
  `global.css` (~600 lines) instead of utility classes.
- **No backend.** The Next.js contact form posts to a stub `/api/contact`
  route that only logs the submission. A static site has no API routes, so the
  prototype's form opens the visitor's mail app (mailto) instead — functionally
  the same for the visitor. A real deployment would point it at a form service.
- **Known small deltas:** the About page's Font Awesome brand icons are plain
  text chips here (no icon library), the light/dark theme toggle is dropped
  (the design is dark-only, matching PR #3's default), and scroll-triggered
  fade-up animations from framer-motion are not replicated — page crossfades
  and hover transitions are.

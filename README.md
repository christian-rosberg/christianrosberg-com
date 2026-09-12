# christianrosberg.com

One-page CV site for Christian Rosberg. Static, no client-side framework, built with
[Astro](https://astro.build) and deployed to GitHub Pages on every push to `main`.

## Editing content

All copy lives in Markdown files under `src/content/`. Edit, commit, push — the site rebuilds.

| What | Where |
| --- | --- |
| Name, headline, lead paragraph, status bar, contact details, clients, skills, languages, SEO text | `src/content/profile.md` (frontmatter + body) |
| Experience — one file per position | `src/content/experience/*.md` |
| Education | `src/content/education/*.md` |
| Certifications | `src/content/certifications/*.md` |
| Portrait and client logos | `src/assets/` |

Every file is validated against a schema in `src/content.config.ts`; a typo in a field name or a
malformed date fails the build instead of shipping.

### Experience files

```md
---
role: Sr. Solution architect        # omit to use the company name as the title
org: NKT
location: Karlskrona, Sweden        # optional
start: 2021-12                      # YYYY-MM
end: 2023-10                        # YYYY-MM, or `null` for ongoing
highlight: false                    # true = green "own company" treatment
badge: Assignment                   # optional small tag next to the role
parallel: true                      # adds "in parallel with own company"
positions: []                       # nested roles at the same company (see uiq.md)
---
Description in Markdown. Leave empty for no description.
```

Entries are ordered automatically: `highlight: true` entries first, then ongoing roles, then by end date, then by start date.
Durations ("14 yrs 4 mos", "Present") are computed at build time, so they never go stale.

## Development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # type-checks, then builds to dist/
npm run preview  # serve dist/ locally
```

## What the build produces

- `/` — the page. Fonts are self-hosted and subset, CSS is inlined, images are converted and sized at build time.
- `/og.png` — social share image, generated from the content.
- `/cv.md`, `/llms.txt`, `/llms-full.txt` — Markdown / plain-text versions of the CV for AI agents and search.
- `/robots.txt`, `/sitemap-index.xml` — standard crawler files.
- Structured data (schema.org `ProfilePage` + `Person`) is embedded in the page head.

## Deploying and the custom domain

The workflow in `.github/workflows/deploy.yml` builds and publishes on push to `main`.
The public origin is set through `SITE_URL` in that workflow (default `https://christian-rosberg.github.io`).

To move to `christianrosberg.com`:

1. At your DNS provider, add four `A` records for the apex pointing at GitHub Pages:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   (and optionally `AAAA` records: `2606:50c0:8000::153` … `2606:50c0:8003::153`).
2. Add a `CNAME` record for `www` pointing at `christian-rosberg.github.io`.
3. Create `public/CNAME` containing `christianrosberg.com`.
4. Change `SITE_URL` in the workflow to `https://christianrosberg.com`.
5. In the repo settings under Pages, set the custom domain, wait for the DNS check, then enable "Enforce HTTPS".

## Design reference

The original handoff (spec, runnable reference page and source assets) is kept in `design/`.

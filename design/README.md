# Handoff: CV one-pager — Christian Rosberg

## Overview
A single-page freelance-consultant CV site for Christian Rosberg (Rosch Information & Media AB), in English. One scroll: dark hero with portrait, a client logo row, a vertical timeline of experience, education/certifications/languages, and a dark contact footer. Goal is credibility — the reader should get an accurate picture of the person and be able to make contact.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing the intended look and behavior, not production code to copy directly. `CV Website.dc.html` is authored in a proprietary preview format (a custom `<x-dc>` element plus a logic class), so it will not run as-is outside that environment. **Use `reference/index.html` as the runnable, framework-free reference** — plain HTML/CSS/JS, opens in any browser.

The task is to **recreate this design in the target codebase's existing environment** (React/Next, Vue, Astro, plain static HTML — whatever the project uses), following its established patterns. If no codebase exists yet, a static site is the right call: this page has no backend, no data fetching, and no forms. Astro or plain HTML + one CSS file is enough; Next.js is fine if you want React components.

## Fidelity
**High-fidelity.** Final colors, typography, spacing and interactions. Recreate it pixel-accurately. Every value below is exact.

## Screens / Views

Single page, one column, five stacked bands. Page background `#f4f5f6`, body text color `#101418`.

Horizontal page padding is the same everywhere: `clamp(20px, 5vw, 64px)`. No max-width container — the layout is fluid to the viewport.

### 1. Hero (dark)
Background `#0d0f0e`, text `#e6e8e5`.

**Status bar** — flex row, `justify-content: space-between`, `gap: 16px`, `flex-wrap: wrap`, padding `20px <page-padding>`, `border-bottom: 1px solid #232725`. Type: IBM Plex Mono 12px, `letter-spacing: 0.14em`, `text-transform: uppercase`, color `#7d867f`.
- Left: "Christian Rosberg — freelance consultant"
- Right: "Karlskrona · SE — available"

**Hero body** — flex row, `align-items: flex-end`, `gap: clamp(28px,4vw,56px)`, `flex-wrap: wrap`, padding `clamp(48px,7vw,88px) <page-padding> clamp(48px,7vw,80px)`.
- Text column: `flex: 1 1 420px; min-width: 0`.
  - Eyebrow: IBM Plex Mono 12px, `letter-spacing: 0.24em`, uppercase, color `#7fd6a8`, `margin-bottom: 30px`. Text: "Freelance architect / Team lead / Tech lead"
  - H1: Space Grotesk 700, `font-size: clamp(40px,7vw,84px)`, `line-height: 0.98`, `letter-spacing: -0.04em`, `text-wrap: balance`, `margin: 0 0 28px`. Text: "IT architecture, software development and digitalization strategies."
  - Lead paragraph: Space Grotesk 400, `clamp(17px,1.6vw,19px)`, `line-height: 1.65`, color `#a7b0a9`, `max-width: 660px`, `text-wrap: pretty`. Verbatim: "A senior business oriented architect and developer specializing in IT architecture, software development and digitalization strategies to drive business growth. Experienced with all stages of the development cycle for dynamic digitalization projects. Well-versed in numerous programming languages including JavaScript, SQL, and C#. Strong background in product management and user experience."
- Portrait: `flex: 0 1 280px; min-width: 220px; aspect-ratio: 5/6`, image `object-fit: cover`. The bundled portrait has its background masked and faded to `#0d0f0e` so it blends into the hero — see Assets.

### 2. Client logo row (white band)
Background `#fff`, `border-bottom: 1px solid #e3e5e8`, padding `clamp(36px,5vw,56px) <page-padding>`.

Label: IBM Plex Mono 11px, `letter-spacing: 0.22em`, uppercase, color `#78808a`, `margin-bottom: 28px`. Text: "Clients I have worked with"

Row: `display: flex; flex-wrap: nowrap; align-items: center; justify-content: space-between; gap: 44px`. Logo height caps at 42px. Five logos: Kustbevakningen, Försäkringskassan, NKT, Roxtec, Milou.

**Sizing rule (important, and the reason for the JS):** each logo is sized to its own intrinsic aspect ratio, and all five share one computed height, so the *gaps between logos are equal* rather than the cells being equal — and everything stays on one line at any width. Algorithm: read each image's `naturalWidth/naturalHeight`; `h = min(42, floor((rowWidth - 44 * 4) / sum(ratios)))`; each logo gets `height: h`, `width: floor(h * ratio)`. Recompute on resize (ResizeObserver) and on image load/swap. If your framework knows the intrinsic sizes at build time, do this in CSS with `flex-basis` per logo instead and drop the script.

Treatment: `filter: grayscale(1) opacity(0.45)` at rest, `filter: none` on hover, `transition: filter 260ms ease`. Apply the filter to the `<img>` itself, not an ancestor.

### 3. Experience — vertical timeline
Padding `clamp(48px,6vw,72px) <page-padding>`.

Section label: IBM Plex Mono 12px, `letter-spacing: 0.24em`, uppercase, `#78808a`, `margin-bottom: 8px`. Text: "Experience"
Section note: Space Grotesk 15px, `#5b636b`, `margin-bottom: 32px`. Text: "Freelance since 2012 — green marks the years running my own company, which overlap the assignments below it."

Each entry is a grid: `grid-template-columns: 118px 1fr`, `align-items: stretch`.

**Left gutter** (`position: relative`, `padding-right: 26px`, `text-align: right`):
- Start year: Space Grotesk 600, 26px, `letter-spacing: -0.02em`, `line-height: 1`, `padding-top: 14px`. Color `#1a7f52` for the freelance entry, else `#101418`.
- Sub-label under it: IBM Plex Mono 11px, `letter-spacing: 0.12em`, `#98a0a8`, `margin-top: 6px`. Either "ONGOING" or "— <end year>".
- Rail segment: `position: absolute; top: 16px; bottom: 0; right: -1px; width: 3px`, background `#1a7f52` (freelance) or `#101418`. It spans the full height of the entry, so long entries draw a long bar — that is the timeline.
- Dot: `position: absolute; top: 16px; right: -5px; width: 11px; height: 11px; border-radius: 50%`, same color as the segment, `box-shadow: 0 0 0 4px #f4f5f6` to punch it out of the rail.

**Right content** (`padding: 0 0 26px 30px`; inner flex column, `gap: 7px`):
- Role: Space Grotesk 600, `clamp(20px,2.1vw,24px)`, `letter-spacing: -0.02em`, `line-height: 1.15`.
- On the freelance entry only, a badge sits beside the role in a `display:flex; align-items:center; gap:12px; flex-wrap:wrap` row. Badge: IBM Plex Mono 11px, `letter-spacing: 0.16em`, uppercase, color and `1px` border `#1a7f52`, `padding: 5px 10px`, `line-height: 1`. Text: "Assignment"
- Org · location: 14px, `#4d545c`.
- Date range: 12.5px, `#98a0a8`, `letter-spacing: 0.02em`.
- Description: Space Grotesk 15px, `line-height: 1.6`, `#3d444b`, `max-width: 640px`, `margin-top: 2px`.
- Sub-roles (UIQ only): flex column, `gap: 14px`, `margin-top: 8px`, `border-left: 1px solid #e3e5e8`, `padding-left: 20px`. Each: role 17px/600; date 12px `#98a0a8`; description 15px/1.6 `#3d444b`, `max-width: 600px`.

After the last entry, a short tail: 3px × 12px bar `#c8ced4` and a 9px dot `#c8ced4`, in a 118px gutter column — the line trails off.

**Entries, in order, copy verbatim** (all content is from the owner's CV — do not rewrite):

1. **2012 / ONGOING** — Owner and consultant · badge "Assignment" · Rosch Information & Media AB · Karlskrona, Sweden · "June 2012 — Present · 14 yrs 4 mos" · green. Description: "Specializing in software development, IT architecture and digitalization strategies to drive business growth. Assignments include Kustbevakningen and Roxtec."
2. **2021 / — 2023** — Sr. Solution architect · NKT · Karlskrona, Blekinge County, Sweden · "December 2021 — October 2023 · 1 yr 11 mos · in parallel with own company" · no description.
3. **2015 / — 2021** — IT Architect · Försäkringskassan · Karlskrona, Sweden · "September 2015 — November 2021 · 6 yrs 3 mos · in parallel with own company" · "Solution architect and Domain architect (UX/Frontend)."
4. **2010 / — 2015** — Senior developer / interaction designer · Milou Communication AB · "April 2010 — August 2015 · 5 yrs 5 mos" · "Foremost web development in .NET/C# (e.g. ASP.NET MVC, WCF), EPiServer certified developer (ECD). Also working with interaction design and user experience for web applications (desktop and mobile) together with development of social media campaigns, digital strategy and other marketing initiatives for our customers."
5. **2008 / — 2010** — Software developer (consultant) · HiQ · "October 2008 — March 2010 · 1 yr 6 mos" · "Software developer/architect (consultant) focusing on software development in .NET. Areas for assignments included the telecom industry, online gaming, usability as well as traditional industry. Also involved in pre-sales with new customers."
6. **2005 / — 2008** — UIQ Technology · Ronneby, Sweden · "February 2005 — September 2008 · 3 yrs 8 mos" · three sub-roles:
   - System UI Architect, "Oct 2007 — Sep 2008": "Worked as the System UI Architect within the System Design department focusing on system wide UI requirements, overall UI strategy, design guidelines, strategies for localization and internationalization, defining high-level design as well as mentorship for interaction designers. Worked closely together with product management and our customers (SonyEricsson and Motorola) in analyzing and defining new features and requirements for the UIQ product."
   - Lead Interaction Designer, "Apr 2007 — Oct 2007": "Planning and leading the work for a group of five interaction designers within the Development Platform Engineering section. Defined high-level design guidelines, formalized the user experience strategies for the platform, worked in close relation with product management and product planning in defining features and requirements."
   - Interaction Designer, "Feb 2005 — Mar 2007": "Interaction design within the platform/graphics area. Interaction design process improvements."
7. **2004 / — 2005** — Software developer · Nockeby Tryckeri AB · "April 2004 — February 2005 · 11 mos" · "Web development focused on .NET/C#, XML and SQL."
8. **2000 / — 2003** — Teaching Assistant · Blekinge Institute of Technology · "January 2000 — December 2003 · 4 yrs" · "Teaching assistant, mainly with courses concerning object-oriented programming, object-oriented systems development, data structures and algorithms as well as web technologies. The work primarily consisted of supervising exercises, supervising and assisting in the examination of exercises, assisting in course examination, leading seminars and supervising group work."

> Note: the "14 yrs 4 mos" and "Present" strings are static in the design. If you want them to stay true, compute the duration from the start date at build time.

### 4. Skills / Education (two cards)
Grid: `repeat(auto-fit, minmax(300px,1fr))`, `gap: 20px`, `align-items: start`, padding `0 <page-padding> clamp(48px,6vw,72px)`. Cards: `background:#fff; border:1px solid #e3e5e8; padding: clamp(24px,3vw,36px)`. All card labels: IBM Plex Mono 12px, `letter-spacing: 0.24em`, uppercase, `#78808a`.

**Card 1 — Skills & stack.** "TOP SKILLS" label, then three filled chips: `background:#101418; color:#fff; border:1px solid #101418; padding:8px 15px; font-size:13px` — Enterprise Architecture, Non-Functional Requirements, Stakeholder Management. Then "STACK" label and outlined chips `border:1px solid #d7dbe0; padding:8px 15px; font-size:13px` — C#, JavaScript, SQL, .NET, ASP.NET MVC, WCF, EPiServer, UX / Frontend, Product management. Chip rows: `display:flex; flex-wrap:wrap; gap:9px`.

**Card 2 — Education / Certifications / Languages.** Items separated by `border-top: 1px solid #eceef0`, `padding: 18px 0`. Item title Space Grotesk 19px/600; meta 13px `#78808a`; description Space Grotesk 15px/1.6 `#3d444b`.
- Education: "M.Sc., Computer Science" · "Blekinge Institute of Technology · 1999 — 2003" · "Object-oriented programming and systems development, data structures and algorithms, web technologies — the same areas later taught as teaching assistant at the institute, 2000 — 2003."
- Certifications: "Certified SAFe® 4 Architect" · Scaled Agile · "Architecture practice in scaled agile development — the role of the architect across teams, trains and portfolio." / "EPiServer Certified Developer (ECD)" · EPiServer · "Development certification held during the years of .NET/C# and EPiServer web development."
- Languages: three rows, `display:flex; justify-content:space-between; gap:16px`, 15px — Swedish / "Native or bilingual", English / "Full professional", German / "Elementary" (right side `#78808a`).

### 5. Contact footer (dark)
Background `#0d0f0e`, color `#e6e8e5`, padding `clamp(48px,7vw,80px) <page-padding>`. Flex row, `justify-content: space-between`, `align-items: flex-end`, `gap: 36px`, `flex-wrap: wrap`.
- Left: "Let's talk." — Space Grotesk 700, `clamp(34px,5vw,52px)`, `letter-spacing: -0.03em`, `line-height: 1`. Under it, 15px `#7d867f`, `margin-top: 16px`: "Freelance consultant — booking new assignments."
- Right: `text-align: right; min-width: 260px; font-size: 16px; line-height: 2`. Four lines: email (link, color `#7fd6a8`), "+46 72 580 98 34", "rosch.se" (link, `#e6e8e5`), "linkedin.com/in/christianrosberg" (link, `#e6e8e5`).

Contact values in the design: christian.rosberg@gmail.com · +46 72 580 98 34 · https://rosch.se · https://www.linkedin.com/in/christianrosberg. **Confirm with the owner before launch** — he may want a @rosch.se address instead of gmail.

## Interactions & Behavior

**Scroll reveal.** Every element marked `data-reveal` (hero eyebrow/H1/lead, section labels, logo row, each timeline entry, each card, both footer blocks) starts at `opacity: 0; transform: translateY(14px)` and animates to `opacity: 1; transform: none` with `transition: opacity 620ms cubic-bezier(.22,.61,.36,1), transform 620ms cubic-bezier(.22,.61,.36,1)`, triggered by an IntersectionObserver at `threshold: 0.05`, `rootMargin: '0px 0px -8% 0px'`, unobserved after firing. Anything already above the fold is revealed immediately, and there is a safety sweep on scroll/resize plus a hard timeout that reveals everything — nothing may ever stay stuck invisible. Under `prefers-reduced-motion: reduce`, skip the animation entirely and render everything visible.

**Logo hover.** Grayscale/45% opacity → full color, 260ms ease. On touch devices there is no hover, so consider showing them in color there.

**Links.** `a { color: #101418; text-decoration: none }`, `a:hover { text-decoration: underline }`; footer links are recolored inline as noted.

No other interactivity: no nav, no menu, no forms, no modals, no loading or error states, no data fetching, no state management. A single static page.

**Responsive.** Fluid via `clamp()`, no fixed widths. Hero wraps the portrait under the text when the text column can't hold 420px. Cards reflow via `auto-fit`. The logo row never wraps — it scales down. At `max-width: 720px` the timeline gutter tightens: `grid-template-columns: 74px 1fr` and gutter `padding-right: 16px`.

## State Management
None. No client state beyond the reveal observer and the logo-sizing measurement.

## Design Tokens

Colors:
- Ink `#101418` · secondary `#3d444b` · muted `#4d545c` · soft `#5b636b` · label `#78808a` · faint `#98a0a8`
- Page `#f4f5f6` · card `#fff` · card border `#e3e5e8` · hairline `#eceef0` · chip border `#d7dbe0` · rail tail `#c8ced4`
- Dark ground `#0d0f0e` · dark text `#e6e8e5` · dark muted `#a7b0a9` · dark label `#7d867f` · dark hairline `#232725`
- Accent on dark `#7fd6a8` · accent on light `#1a7f52`

Type: **Space Grotesk** 400/500/600/700 for everything set in lower case; **IBM Plex Mono** 400/500/600 *only* for all-caps labels, eyebrows, status bar and year ticks. Both from Google Fonts. This split is a deliberate rule — do not set lower-case body copy in the mono.

Scale: 11, 12, 12.5, 13, 14, 15, 16, 17, 19, 21, 26px, `clamp(20px,2.1vw,24px)`, `clamp(34px,5vw,52px)`, `clamp(40px,7vw,84px)`.
Spacing: 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 22, 26, 28, 30, 32, 36, 44, 56px; page padding `clamp(20px,5vw,64px)`.
Radius: 0 everywhere except the 50% timeline dots. Shadows: none, except `0 0 0 4px #f4f5f6` as a knockout ring on the dots.

## Assets
All in `reference/assets/`.

- `portrait.png` — the owner's photo, background masked and faded to `#0d0f0e` so it blends into the hero. `portrait-original.webp` is the untouched original. The mask is soft, not a true cut-out; a properly cut-out transparent PNG is the better long-term asset and can be dropped in as a straight replacement.
- `logos/*.webp` — the owner's own client logo files: `kustbevakningen.webp`, `forsakringskassan.webp`, `nkt.webp`, `roxtec.webp`, `milou.webp`. Raster, so re-export as SVG if the clients' official vector files are available. Any file with a **white** (non-transparent) background reads as a grey box on the white band once the greyscale filter is applied — transparency fixes it.
- The logo sizing script reads each file's intrinsic dimensions, so swapping in different files needs no code change.
- Client logo usage is the owner's call: confirm permission to display each brand before launch.

## Files
- `reference/index.html` — **start here.** Runnable, dependency-free rebuild of the design, with all copy and assets in place.
- `CV Website.dc.html` — the original design file from the design tool. Not runnable standalone; useful as the source of truth for exact values.
- `CV One-Pager.dc.html` — the earlier exploration board with the rejected directions. Context only; not part of the deliverable.

## Getting this into Claude Code
1. Download this folder and unzip it into (or next to) your repo.
2. Open the repo in Claude Code and point it at the folder, e.g.:
   > Read `design_handoff_cv_website/README.md` and open `reference/index.html` in a browser. Rebuild this page in this project using our existing setup, matching it exactly. Keep all copy verbatim.
3. Copy `reference/assets/` into your project's static/public directory.
4. `reference/index.html` is already deployable as-is if you just want the site live — drop the folder on Netlify, Vercel, Cloudflare Pages or any static host.

# riganb.github.io redesign: design spec

Date: 2026-09-27
Status: draft, awaiting review

## 1. Why

The current site stacks a dozen unrelated effects (loader, custom cursor, mouse glow, meteors,
floating doodles, floating tech icons, a web of floating socials, a typewriter, a 1,000-line
terminal) on pure black and white with default-feeling type. Every effect competes, so nothing
lands, and the result reads as tacky.

The redesign replaces that with one coherent editorial system, a handful of signature
interactions reused with intent, and real case studies.

## 2. Goal and audience

**Goal: founder credibility.** Visitors should leave believing Rigan builds things that ship and
hold up. Craft and shipped work lead; career and clients back it up.

Audience, in order: collaborators and future hires, clients, users of VeraStack products,
recruiters.

**Out of scope:** the VeraStack Labs studio site. It is a separate project with its own spec and a
cinematic direction (WebGL hero, huge type, scroll-driven scenes). This site links to it.

## 3. Visual direction

"Split paper": editorial, with engineered details. Warm paper, a refined serif, hairline rules
like a broadsheet, and blueprint touches (mono labels, a faint grid, a spec sheet) as a supporting
layer, never as a competing theme.

Inspiration studied: minhpham.design (dual polished/honest copy revealed by a cursor lens, huge
type, scroll-filled statements, full-width row hover bands, odometer nav), the 21st.dev Story
Scroll component, and the personal sites of Rauno Freiberg and Emil Kowalski for restraint.

### 3.1 Tokens

All colours, type and spacing live as CSS variables in one token layer. No hex literals in
components.

| Token | Light | Dark |
|---|---|---|
| `--paper` (background) | `#F4F1EA` | `#15130F` |
| `--paper-2` (raised surface) | `#ECE7DC` | `#1D1A15` |
| `--ink` (text) | `#16140F` | `#EDE6D6` |
| `--ink-2` (secondary text) | `#4A463E` | `#A79F8E` |
| `--muted` (labels) | `#6D675D` | `#8D8575` |
| `--rule` (hairlines) | `#DCD5C6` | `#2E2A23` |
| `--grid` (blueprint grid) | `rgba(22,20,15,.05)` | `rgba(237,230,214,.045)` |
| `--accent` (terracotta) | `#A74D27` | `#E8A55A` |
| `--accent-ink` (text on accent) | `#F4F1EA` | `#15130F` |
| `--live` (status dot) | `#3F8F5A` | `#6FBF86` |

Dark mode follows the operating system by default, with a manual toggle in the nav that persists
in `localStorage`.

Every text colour must reach 4.5:1 on the backgrounds it sits on, including small mono labels and
the accent (the 3:1 allowance only covers text 24px and up, which labels are not). Non-text marks
such as the live dot and focus rings need 3:1. `src/styles/tokens.test.ts` enforces this.

### 3.2 Type

Loaded with `next/font/google`, which self-hosts the files at build time.

| Role | Font | Notes |
|---|---|---|
| Display | Instrument Serif (regular, italic) | Headlines, statements, index rows, case study titles. Italic in `--accent` for the one emphasised word |
| Body | Inter Tight (400, 500, 600) | Paragraphs, UI |
| Mono | Geist Mono (400, 500) | Labels (uppercase, tracked), spec sheet values, metadata |

Display sizes use `clamp()` so the hero headline runs from about 48px on phones to about 120px on
wide screens.

### 3.3 Layout

A 12-column grid with hairline rules between major regions, like a newspaper page. Sections are
separated by full-width rules, not by background colour changes. Generous whitespace; content max
width about 1320px, text measure capped at about 65 characters.

## 4. Interaction system

Few effects, reused. Each is listed with where it may appear. Anything not listed here does not
ship.

| # | Effect | Where | Source |
|---|---|---|---|
| I1 | **Ink lens.** A terracotta disc trails the cursor with a spring. Over text marked as having an honest twin, it grows to about 220px and reveals the alternate copy inside it; elsewhere it shrinks to a 12px dot. The reveal tracks the scroll position under a still cursor | Hero, statement, contact | Custom (masked duplicate layer with `clip-path: circle()`), cursor physics from React Bits `BlobCursor` |
| I2 | **Scroll-filled text.** Large statements start at 20% opacity and fill word by word as they scroll through the viewport | Statement, case study intros | React Bits `ScrollReveal` |
| I3 | **Line reveal.** Headlines slide up out of a mask, one line at a time, on first view | Hero, section titles | React Bits `SplitText` |
| I4 | **Row band.** Hovering an index row wipes a full-width accent band in from the edge the cursor entered; the title turns `--accent-ink` and a one-line note appears on the right | Work index | Custom |
| I5 | **Cursor preview.** A small preview image of the hovered project follows the cursor, tilted a few degrees | Work index | Motion Primitives `Cursor` |
| I6 | **Story scroll.** Sections pin; each next one is dealt onto the pile, rotating from about 10° to flat around its bottom-left corner, with a soft shadow on the incoming edge and the covered sheet dimming slightly | Exactly one per page: VeraStack chapter on home, one per case study | 21st.dev Story Scroll by Samira Boudjadja (adapted, credited) |
| I7 | **Odometer.** Labels and digits roll vertically when they change | Nav active section, spec sheet numbers | Motion Primitives `TextRoll`, `SlidingNumber` |
| I8 | **Blueprint ripple.** The faint grid behind the spec sheet ripples away from the cursor | Hero only | Canvas UI `Displacement` |
| I9 | **Dithered objects.** 3D renders of the three product icons, drawn as 1-bit dither, drift slowly in the margin | VeraStack chapter only | Canvas UI `Dithered Object` |
| I10 | **Halftone portrait.** Rigan's photo as newspaper halftone that resolves to the full photo on hover | Journey | React Bits `HalftoneReveal` |
| I11 | **Decrypt label.** Mono labels unscramble once when they enter view | Section labels | React Bits `DecryptedText` |
| I12 | **Peel.** The corner of the contact sheet peels back to reveal the resume PDF | Contact | Canvas UI `Peel` |
| I13 | **Before/after slider.** Drag to compare old and new builds | Case studies | Motion Primitives `ImageComparison` |
| I14 | **Magnet.** The email button leans towards the cursor | Contact | React Bits `Magnet` |

Global: **Lenis** smooth scrolling, connected to GSAP ScrollTrigger so pins do not jitter.

### 4.1 Motion rules

- At most **two WebGL effects** on screen at once. I8 and I9 never share a viewport.
- Effects run only while their section is in view (IntersectionObserver), and WebGL canvases pause
  when off screen.
- `prefers-reduced-motion: reduce` turns off I1, I2 (text shows filled), I3, I6 (sections stack
  normally), I8, I9 and Lenis. Everything stays readable and usable.
- Touch devices get no cursor effects (I1, I4's directional wipe becomes a tap-to-open, I5, I14).
  Honest copy is reachable with a "Show the honest version" toggle beside each honest block.
- Durations sit between 200ms and 700ms; eases are custom cubic-beziers, never the defaults.

## 5. Home page

Order, top to bottom. Sections 01 to 08 sit on one scrolling page.

### 00. Nav (pinned)

Left: "Rigan Burnwal". Centre (mono): a green dot and "Building VeraStack Labs · Bangalore".
Right: Work, Studio, Journey, Contact, and the theme toggle. The active section label rolls (I7).
On phones the links collapse into a full-screen menu set in serif.

### 01. Hero, split paper

Left column (about 60%):
- Label: `FOUNDER · ENGINEER · 2026`
- Headline (I3): **"I build software people *keep* using."**
- Honest twin (I1): "I build software, then rebuild it until people keep using it."
- Lede: "Founder of VeraStack Labs, where we make rigseed, Riggit and Mehfil. Before that, I shipped
  the X-47 configurator and a typed monorepo at Ultraviolette."

Right column (about 40%), on the blueprint grid (I8), a spec sheet in mono with rolling digits
(I7). Each row has an honest footnote revealed by the lens:

| Row | Value | Honest footnote |
|---|---|---|
| Products shipped | 03 | "and two more in a folder called `later`" |
| Production PRs governed | 2,800+ | "some of them were renames" |
| Client launches | 07 | "one of them is still loading" (PixelStack, in progress) |
| Spark Award | 2025 | "for a week I would not recommend" |

### 02. Statement

Large serif paragraph, scroll-filled (I2), with an honest twin (I1):

- Polished: "I care about the parts nobody screenshots: the migration that stops the next outage,
  the checkout that loads before the customer gives up, the CMS a marketing team can actually use."
- Honest: "I care about the parts nobody screenshots, mostly because I am the one who gets paged
  when they break."

### 03. Selected work, the index

Mono label `// SELECTED WORK`, then a numbered list with a 1px ink top rule. Each row: number,
title in serif, discipline and year in mono. Row band (I4) and cursor preview (I5). Rows marked
"case study" open their page with a view transition (the row grows into the case study header).

| # | Title | Discipline | Year | Link |
|---|---|---|---|---|
| 01 | Cold Stone Creamery Arabia | Website and CMS | 2026 | Case study |
| 02 | E3 Electric.AI, TRION launch | Website, configurator, booking | 2026 | Case study |
| 03 | Ultraviolette, X-47 | Configurator and platform | 2025 | Case study |
| 04 | Suggaa Ventures | Payments and pricing data | 2023 | Inline note |
| 05 | Maven Consultancy Services | Event QR pipeline | 2024 | Inline note |
| 06 | Pee Empro Exports | Android attendance app | 2023 | Inline note |
| 07 | PixelStack Studio | Website, in progress | 2026 | "In progress" tag, no link |

Row notes (shown in the band on hover):
- Cold Stone: "76 stores, six countries, one CMS. First paint 716 ms to 264 ms."
- E3: "Launch site for India's first AI-powered scooter, with booking and Razorpay."
- Ultraviolette: "The configurator behind the X-47 launch, on a monorepo of 2,800+ PRs."
- Suggaa: "Checkout that got 40% lighter, and fares trained on four ride-hailing apps."
- Maven: "Register, get a QR by email, scan it at the counter. Every attendee, one record."
- Pee Empro: "QR attendance on Android, exported to CSV whenever they need it."
- PixelStack: "A design and development studio's site. Currently on the workbench."

Years for Maven (2024) and Pee Empro (2023) come from the resume and must be confirmed.

### 04. VeraStack Labs (story scroll, I6)

The one pinned story on the home page. Four sheets dealt onto the pile:

1. **Intro sheet** (paper): label `// THE STUDIO`, serif headline "VeraStack Labs", one line: "A
   small lab for software that respects its users. Three products so far."
2. **rigseed** (its own warm-neutral palette from the Cozy Terminal design system): "A desktop
   client for qBittorrent that brings its own daemon." Screenshot, stack line (Tauri · React ·
   Rust), links to the landing page and repo.
3. **Riggit**: "Commit at any date and time." Screenshot, stack line, landing page link.
4. **Mehfil**: "Rally friends for chai, dinner or cards in a couple of taps." Screenshot, stack
   line (Next.js PWA), landing page link.

After the last sheet the pin releases into a full-width link: "Visit the studio →". Dithered
product objects (I9) drift in the margin of the intro sheet only.

### 05. Side projects and open source

Two columns, quiet:
- **Autom8r**: "AI workflow builder. Chain Stripe, forms, Claude, OpenAI or Gemini and Slack into
  reusable flows, executed in dependency order by an Inngest engine." Links: GitHub, live demo.
- **use-content**: "A React hook that gives marketing a live copy editor in dev, and weighs less
  than 1 kB in production." Links: GitHub, npm.

### 06. Journey

A spec-sheet timeline replacing the old Experience, Companies and Education sections. The halftone
portrait (I10) sits beside it.

| When | What |
|---|---|
| 2026 | Founder, VeraStack Labs |
| 2024 to now | Software Engineer, Ultraviolette Automotive. Spark Award, June 2025 |
| 2023 to 2026 | Freelance: Pee Empro, Maven, Cold Stone Arabia, E3 Electric.AI |
| 2023 to 2024 | Contract Software Engineer, Suggaa Ventures |
| 2020 to 2024 | B.E. Information Science, JSSATE Bangalore |

Rows draw in on scroll with a hairline that extends left to right.

### 07. Toolbox

Four mono columns (Frameworks, Languages, Cloud, Tools) listing skills from the resume. No logos,
no marquee, no terminal.

### 08. Contact

- Serif sign-off: **"Let's build something that *outlasts* its launch."**
- Honest twin (I1): "Let's build something. I will over-engineer it slightly."
- Email button with magnet (I14). Links with witty captions (mono):
  - Email: "therealriganb@gmail.com. I actually read it."
  - GitHub: "Where the commits live, at every date and time."
  - LinkedIn: "The version of me that wears a collar."
  - Resume: revealed by the peel (I12), plus a plain link for keyboard and touch users.
- Footer line: "Built in Bangalore. Set in Instrument Serif and Geist Mono."

The phone number from the resume is deliberately not published.

## 6. Case study pages

Routes: `/work/cold-stone`, `/work/e3-trion`, `/work/ultraviolette`. Shared template:

1. Header: client, title, year, role, stack, live link (grown from the index row by view
   transition).
2. Intro statement (I2).
3. Story scroll (I6), three sheets: **Before**, **Build**, **Result**.
4. Highlights: three to five short blocks.
5. Next case study link.

### 6.1 Cold Stone Creamery Arabia

- Before sheet: the 2020 WordPress site, full-page capture.
- Build sheet: the new Next.js 16 site, with the before/after slider (I13) for home, menu and
  loyalty on desktop and mobile.
- Result sheet: metrics table with rolling digits.

| Metric | Before | After |
|---|---|---|
| DOM nodes (home) | 1,254 | 310 |
| Requests (home) | 179 | 87 |
| Third-party hosts (home) | 18 | 2 |
| First paint (home) | 716 ms | 264 ms |
| Stores listed | 1 | 76 across 6 countries |
| Enquiry forms writing to a database | 0 | 3 |

Highlights: store directory, forms that become records, uploads verified by their real bytes, a CMS
the marketing team uses, signed sessions.

Source assets: `Documents/cold-stone-showcase/` (comparisons, shots, `optimised-media/intro.mp4`).

**Blockers before publishing:**
- The "after" hero banner reads "EXPERIENCEEE". Use a capture taken after the typo is fixed.
- `metrics.json` records the new home page at 86,594 KB against about 10 MB before. Re-measure with
  the optimised video. Until then, the page makes no page-weight claim, and "leaner" is not used.
- Confirm Cold Stone is happy to be named and shown before the new site goes live.

### 6.2 E3 Electric.AI, TRION

- Before sheet: the brief (launch of TRION, pre-bookings opening).
- Build sheet: the site, the configurator (screenshots, since it has been taken down) and the
  booking flow with Razorpay.
- Result sheet: launch facts (three variants, pre-bookings live at launch) and a link to
  e3electric.ai.
- Needs from Rigan: configurator screenshots, and any launch numbers he is allowed to share.

### 6.3 Ultraviolette, X-47

- Before sheet: a legacy JavaScript codebase.
- Build sheet: the TurboRepo monorepo migration, and the configurator for the X-47 launch
  (live at ultraviolette.com/configure).
- Result sheet: 2,800+ PRs governed, serverless AWS pieces, the auth vulnerability fix, and the
  Spark Award (Isle of Man project in under a week).
- Written as work done as an employee. No confidential detail beyond what the resume states.
- Needs from Rigan: configurator screenshots or a screen recording.

## 7. Content model

All copy lives in typed files under `src/content/` (`site.ts`, `work.ts`, `studio.ts`,
`journey.ts`, `case-studies/*.ts`). An honest twin is a field on the content object, not markup:

```ts
type Copy = { text: string; honest?: string }
```

Components never contain copy. Images live under `public/work/<slug>/`, converted to AVIF and
WebP at build time or before commit.

## 8. Stack

A fresh app inside the same repo. Nearly every component is being replaced, so upgrading in
place buys nothing.

| Piece | Choice |
|---|---|
| Framework | Next.js 16 (App Router), `output: 'export'` for GitHub Pages |
| UI | React 19, TypeScript strict |
| Styling | Tailwind CSS 4, tokens as CSS variables |
| Motion | `motion` 13, GSAP 3.15 with ScrollTrigger and `@gsap/react`, Lenis |
| WebGL | Canvas UI components (WebGL build, `three` only where required) |
| Components | Copied in as source via the shadcn CLI registries (Canvas UI, React Bits, Motion Primitives), then restyled to tokens |
| Page transitions | The View Transitions API, with a plain navigation fallback |

Removed: `@fontsource/*`, `react-icons`, `react-intersection-observer`, the devicon and tabler
CDN stylesheets, and every component under `src/components/ui/` that exists today.

Licences: Canvas UI is MIT with the Commons Clause (fine for use on this site). React Bits and
Motion Primitives are MIT. Story Scroll is credited to its author in the file header.

Deploy: the existing GitHub Actions Pages workflow, with Node bumped from 20 to 22.

## 9. Quality bar

- Lighthouse on the home page, mobile profile: Performance 90+, Accessibility 100, Best Practices
  100, SEO 100.
- Home page JavaScript under 250 KB gzipped, excluding lazily loaded WebGL chunks.
- WebGL effects load lazily, after first paint, only on devices with a fine pointer and no
  reduced-motion preference.
- Fully keyboard navigable, with visible focus rings in `--accent`.
- Works at 320px wide with no horizontal scroll.
- Open Graph image per page (the hero headline set in serif on paper).
- `npm run build` and `npm run lint` pass in CI before deploy.

## 10. Testing

- `npm run lint` and `npm run build` (static export) on every PR.
- A contrast check script over the token pairs.
- Manual passes in Chrome, Safari and Firefox, at 1440, 768 and 375 widths, in light and dark,
  and with reduced motion on.
- Lighthouse run against the exported build served locally.

## 11. Open items

1. Confirm Maven (2024) and Pee Empro (2023) years.
2. E3 configurator screenshots and shareable launch numbers.
3. Ultraviolette configurator screenshots or recording.
4. Cold Stone: fixed-typo capture, re-measured page weight, permission to publish.
5. A portrait photo suitable for the halftone treatment (the current `public/riganb.png` may do).
6. Rigan's review of all draft copy in sections 5 and 6, especially the honest lines.

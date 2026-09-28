# Portfolio status

The single place to catch up on riganb.github.io. Update it in the same PR as any change that
finishes, adds or drops an item. Last updated 2026-09-28.

- Design spec: [superpowers/specs/2026-09-27-portfolio-redesign-design.md](superpowers/specs/2026-09-27-portfolio-redesign-design.md)
- Phase plans: [superpowers/plans/](superpowers/plans/)
- Live: https://riganb.github.io (deploys on every push to `main`)

## Where things stand

The redesign is live: home page, two published case studies, SEO and AEO groundwork.

| PR | What landed |
| --- | --- |
| #2 | Design spec |
| #3 | Foundation: Next.js 16 static export, design tokens with a contrast test, content guards, theme, nav, Lenis smooth scroll |
| #4 | Hero, statement, ink lens (hover mode and press-and-hold mode), line-paired honest copy |
| #5 | Work index with direction-aware row band and cursor preview |
| #6 | VeraStack Labs chapter: story scroll with per-product palettes |
| #7 | Side projects, journey with halftone portrait, toolbox, contact, footer |
| #8 | Case study pages with the index-to-header view transition |
| #9 | Header follows product palettes, rigseed image recapture, resume card, sitemap, robots, JSON-LD, llms.txt, share image |
| #10 | E3 custom-code copy, Cold Stone held as a draft, lens zone on the spec sheet, deploy on push |
| #11 | Mobile menu: curtain and staggered link transitions, header mirrored so opening no longer shifts the layout |
| #12 | Press lens tints the page instead of covering it; spec sheet lens zone limited to the label half |
| #13 | Light is the default theme (system dark ignored); sun and moon toggle with a circular theme reveal |
| #14 | Current GitHub Actions majors; Maven and Pee Empro years confirmed |
| #15 | Decrypting section labels, letter-roll nav labels, current-section dot in the nav |
| #16 | Share images in Instrument Serif, one per case study |
| #17 | Dithered product object on the studio sheet (Canvas UI Dithered Object, lazy three.js) |

## Names used in this project

- **Ink lens**: the accent disc that trails the cursor and swells over text to reveal the alternate
  copy (`src/components/lens/lens-provider.tsx`). On touch, narrow screens and reduced motion it
  becomes the **press-and-hold button** at the bottom of the screen.
- **Honest copy**: the alternate line under the lens. Every polished line has an honest pair of
  similar length (`LinePair`), enforced by `src/content/content.test.ts`.
- **Lens zone**: a wrapper that keeps the lens swollen across an area wider than the text itself,
  such as the label half of the spec sheet (`src/components/lens/lens-zone.tsx`). Areas with no
  honest copy stay out of zones.
- **Press mode tint**: holding the button tints the page (multiply in light, difference in dark)
  so unpaired text stays readable; paired lines fade and their honest copy shows.
- **Story scroll**: pinned sheets dealt onto a pile (`src/components/motion/story-scroll.tsx`),
  used once per page.
- **Spec sheet**: the numbers card in the hero. **Work index**: the numbered client list.

## Waiting on Rigan

- [ ] E3 configurator and booking screenshots (placeholder on `/work/e3-trion/`, Build sheet).
- [ ] UV "before" material, as diagrams rather than code (placeholder on `/work/ultraviolette/`).
- [ ] Cold Stone launch. When it is live and Cold Stone is happy to be shown:
  1. Move its study from `draftCaseStudies` to `caseStudies` in `src/content/case-studies.ts`.
  2. Set `caseStudy: true` and remove `status` on its row in `src/content/work.ts`.
  3. Put it back in the `next` chain (currently E3 → UV → E3).
  4. Replace the "The new site" placeholder with real screens.
  5. Consider a cursor preview image for its work row.
- [ ] The new resume. The contact section shows a "Soon" card with no link until then
  (`src/components/contact/resume-corner.tsx`, copy in `src/content/about.ts`).

## Planned, not started

- [ ] Main-thread cost on load. Lighthouse mobile simulation shows about 0.5 s total blocking time,
  mostly GSAP and ScrollTrigger setup. Real LCP is about 0.24 s and CLS is 0.

## Known trade-offs

- The studio's floating object (spec I9) is one object that cycles rigseed, Riggit and Mehfil,
  not three, to keep to one WebGL context. three.js is a 172 KB (gzip) chunk fetched only on
  desktop when the studio nears the viewport.
- `public/studio/icons/mehfil.svg` is a stand-in mark drawn for the portfolio. Replace it when
  Mehfil has its own.

- Maven (2024) and Pee Empro (2023) years are confirmed.

- E3 stack is listed as "Framer · React code components · Razorpay".
- `public/work/cold-stone/before.webp` ships with the build but nothing links to it while the
  study is a draft.
- Share images are drawn at build time from Instrument Serif TTFs in `src/assets/fonts` (OFL).

## Working rules

See `../CLAUDE.md` in the workspace. In short: one branch per phase, PR and merge when done,
no AI attribution, no em dashes, never rewrite `main`.

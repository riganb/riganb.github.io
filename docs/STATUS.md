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
| #18 | Lighthouse results recorded |
| #19 | Halftone portrait hover: gravitational lens instead of the photo reveal |
| #20 | Softer portrait lens |
| #21 | Come say hi nudge pointing at the portrait |
| #22 | Portrait hover becomes a gravity well with spring physics |
| #23 | Darker hero grid; floating blueprint glyphs that warp it |
| #24-27 | Search Console tag, X-47 and Tesseract copy, Framer and Webflow in the toolbox |
| #28 | Contact note form via Web3Forms (form 'Portfolio contact') |
| #29 | Origan added as the first VeraStack Labs product |
| #30 | Products shipped 04 |
| #31 | Links move to verastack.dev and product subdomains; Mehfil gets its website link |
| #32 | Claude Code mods (secret-guard, session-meter, repo-board) under side projects |
| #33 | Oinkbuns added as the fifth VeraStack Labs product; products shipped 05 |
| #34 | Shorter case study search titles; Article images |
| #35 | Services section: coaching first (free 15-minute sessions via LinkedIn), six studio services, product film reel |
| #36 | Interactive CTAs (ink band, letter roll, accent spotlight, magnetic arrow, ticker); film overlay player; email now rigan@verastack.dev |
| #37 | Larger ink lens |
| #38 | Spotlight glow on the lens, work rows, service rows and side projects; CTAs wrap between words; story scroll re-measures when a sheet grows |
| #39 | Ultraviolette booking numbers (70,000+ across X-47, Tesseract and Shockwave) on the home page, work row, journey and case study; press links on the UV and E3 case studies; UV dates now 2024 to 2026 |
| #40 | Resume: `/resume/` (three numbers, then proof, with the honest lens) and a one-page `resume.pdf` printed from it; contact card and footer link to it; Journey moves E3 and Cold Stone under the studio |
| #41 | Resume gains Selected builds, Skills (for recruiter keyword matching) and a verastack.dev Lighthouse line; PDF still one page (coaching line is web-only) |
| #42 | Resume PDF: larger type (10pt body, bigger numerals) fills the page; print drops the body padding kept for the lens button; coaching line back in print |
| #43 | Resume PDF rebalanced: roomier rows, 9.5pt body with large numerals, education two to a row in print, a clear bottom margin |
| #44 | Cloudflare Web Analytics beacon (cookieless, production builds only; token in `site.analyticsToken`) |
| #45 | E3 TRION and Cold Stone worded as "Independent client work" under the founder row (resume, PDF, Journey), matching verastack.dev |
| #46 | Resume share image `/resume/og.png` led by 70,000+; resume is in the LinkedIn Featured section |
| #47 | Contact form warnings: alert colour token, warning triangle, role=alert and aria-invalid; email checked on blur; failed sends shown the same way. No hCaptcha on the portfolio, so the popup captcha fix does not apply |
| #48 | Page fade-and-rise on first load (and on the resume), home sections fade up as they scroll in (`data-enter`); opacity and transform only, off under reduced motion, never in print |
| #49 | Questions section on the home page with FAQPage JSON-LD (also in llms.txt); VeraStack Labs Organization gains a logo. Brings the verastack.dev AI search check from 86 to 100 |
| #50 | Android address-bar shift: body uses `min-h-svh` instead of `min-h-dvh`; a test keeps `dvh` to the mobile menu |
| #51 | Origan Open Shelf under Coaching: Oxidise (DSA in Rust), Filter Coffee (Java Collections), The Switch (JS to TS); also in the FAQ answer and llms.txt. The Origan demo stays unlinked (private) |
| #52 | Writing section (four bylined verastack.dev posts, plus the founder page); the two AI search studies as proof on the AI search service; founder page in Person sameAs and llms.txt |
| #53 | Writing gains the YC Summer 2026 study; The Switch card now reads 13 lessons (course complete), shelf note counts 46 lessons |
| #54 | Writing gains "Funded this fortnight: six AI agents for the back office" (18 Oct) |
| #55 | Writing gains "GEO is the new SEO"; the AI search service and FAQ say "AEO and GEO" to match verastack.dev |
| #56 | SaaS Launch Kit as the headline package in Services ($9,500 fixed, 4 weeks), linked to verastack.dev/launch-kit, and in llms.txt |
| #57 | Dark is now the default theme (a stored light choice still wins; print stays light); resume band captions wrap inside their column under the honest lens |

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

- [ ] Scroll down and up on Android Chrome (home, a case study, the resume) to confirm nothing shifts when the address bar hides and shows.
- [ ] One real contact-note submission from your phone, to confirm delivery to verastack.labs@gmail.com after the warning changes.
- [ ] E3 configurator and booking screenshots (placeholder on `/work/e3-trion/`, Build sheet).
- [ ] UV "before" material, as diagrams rather than code (placeholder on `/work/ultraviolette/`).
- [ ] Cold Stone launch. When it is live and Cold Stone is happy to be shown:
  1. Move its study from `draftCaseStudies` to `caseStudies` in `src/content/case-studies.ts`.
  2. Set `caseStudy: true` and remove `status` on its row in `src/content/work.ts`.
  3. Put it back in the `next` chain (currently E3 → UV → E3).
  4. Replace the "The new site" placeholder with real screens.
  5. Consider a cursor preview image for its work row.
- [ ] A cal.com link. "Get on a call" on the resume opens WhatsApp until then; swap `site.call` in `src/content/site.ts`.
- [ ] E3 TRION booking count, if E3 ever shares one (no public figure exists).

## Planned, not started

Nothing planned right now. Add ideas here as they come up.

## Known trade-offs

- **Theme default.** Dark unless the visitor picked light (stored in localStorage). Print always uses the light palette, so the resume PDF is unaffected. Pages are paired line for line under the honest lens; copy that wraps freely (the resume band captions) uses `HonestText wrap` so the overlay wraps too.

- **Viewport units.** `dvh` changes as Android Chrome's address bar moves, so only the mobile menu uses it (enforced by `src/styles/viewport.test.ts`). Full-height sheets use `min-h-screen` (100vh, which mobile Chrome holds at the large viewport); the body uses `min-h-svh`. ScrollTrigger keeps `ignoreMobileResize`.

- **Section reveals use `data-enter`, not `data-reveal`.** `data-reveal` already belongs to the line-reveal headings (`reveal-lines.tsx`). The resume has no section reveals, so the PDF prints from a settled page.

- **The resume PDF is regenerated by hand.** After editing `src/content/resume.ts` or the resume print styles, run `npm run build && npm run resume:pdf` and commit `public/resume.pdf`. `src/content/resume-pdf.test.ts` checks it is one page and, where `pdftotext` exists, that its text reads in order.
- **The resume publishes the WhatsApp number** (+91 93806 54730), approved by Rigan on 2026-10-16.

- The site shows rigan@verastack.dev; the Web3Forms 'Portfolio contact' form delivers to verastack.labs@gmail.com.
- Spotlight surfaces are marked `data-spotlight` with a `.spot` layer; `src/components/spotlight-tracker.tsx` feeds the pointer position. Add both to light up another surface.

- Films in the services reel are 1080p web copies (2 to 6 MB) of the masters in `Videos\videonalyzer`; re-export them there and re-transcode if a film changes. The Firecracker draft, the Hook experiment and the vertical cuts are left out.

- Lighthouse, mobile simulation, home page (2026-09-28): performance 88, accessibility 96,
  best practices 100, SEO 100. Total blocking time 170 ms, CLS 0. Simulated LCP is 3.5 s (observed
  1.4 s); what remains is React hydration and GSAP setup.
- The accessibility deduction is the scroll-filled statement: words start at 18% opacity and fill
  in as you scroll. Screen readers get the full text; the faint state is the effect.

- The studio's floating object (spec I9) is one object that cycles Origan, rigseed, Riggit, Mehfil and Oinkbuns,
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

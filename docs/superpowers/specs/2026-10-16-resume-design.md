# Resume: design

Date: 2026-10-16. Status: awaiting Rigan's approval.

## Intent

A resume that makes the reader think "I need to talk to this guy, give him our work, or get him a
job at our firm at the very least. Man executes." Impact matters more than clarity: the first two
seconds should land a number, not a summary.

Readers are founders looking for a builder, recruiters, and college placement heads. They meet the
resume in two places, roughly equally, so both forms are first-class:

1. A page on the portfolio, `https://riganb.github.io/resume/`.
2. A one-page PDF, `https://riganb.github.io/resume.pdf`, attached to cold emails and placement
   forms.

## Chosen direction: "Three numbers, then proof"

Picked by Rigan from three mockups (front page, spec sheet, three numbers). The mockup lives in
`.superpowers/brainstorm/` in the workspace (not in this repo).

Top to bottom:

1. **Header.**
   - Left: the name in Instrument Serif, with "Founder, VeraStack Labs · Bengaluru" in mono beneath.
   - Right: two pill buttons. "Get on a call ↗" is filled in the accent colour. "PDF ↓" is
     outlined.
   - A mono "Updated Oct 2026" stamp sits near the header.
2. **The band.** Three oversized facts in a row on desktop, stacked on phones, with hairline rules
   between them. Each fact is a big serif numeral with a short caption. Only the first numeral is
   accent-coloured.
   - **70,000+**: "EV bookings through the configurators and booking flows I built at
     Ultraviolette."
   - **< 1 wk**: "To ship the Isle of Man project, every phase. Sole Spark Award recipient."
   - **05**: "Products shipped from my own studio." (Call: no client-launch count on the resume.
     The site's 07 includes Cold Stone, which is not live, and employers. The home page keeps its
     own row.)
   - Each fact links down to the timeline entry that earned it.
3. **Press line** under the band: "In the press:" with links to Autocar India, Team-BHP, BikeWale
   and Mobility Outlook. Use the same URLs as the Ultraviolette case study in
   `src/content/case-studies.ts`.
4. **Timeline.** One row per role. A mono date gutter on the left; on the right, a bold role line
   and one or two short lines. Inline numbers are in the accent colour, the only colour on the
   page besides ink. Rows:
   - **2026 →, VeraStack Labs, founder.**
     - Products: Origan, rigseed, Riggit, Mehfil, Oinkbuns.
     - Client work, 2026, framed as on verastack.dev (studio work, labelled freelance):
       - E3 TRION: took paid bookings on launch day.
       - Cold Stone Arabia: 76 stores, six countries, worded as launching, not as a live result.
   - **2024 → 26, Ultraviolette Automotive, software engineer.**
     - The X-47, Tesseract and Shockwave configurators and booking flows.
     - A typed monorepo of 2,800+ PRs.
     - A critical session auth fix.
     - Spark Award, June 2025.
   - **2023 → 24, Suggaa Ventures, contract engineer.**
     - Checkout 40% lighter.
     - Fares trained on four ride-hailing apps.
   - **2023 → 24, freelance.**
     - Pee Empro: attendance app, data entry cut by 90%.
     - Maven: QR event registration.
   - **Also:**
     - NASA Ideathon 2022, first of 83 teams.
     - JSSATE, B.E. 2024.
     - Vice President, GeeksforGeeks chapter, JSSATE.
     - Free 15-minute coaching sessions, on LinkedIn.
5. **Footer row.**
   - Email rigan@verastack.dev.
   - LinkedIn, GitHub, riganb.github.io and verastack.dev.

## The honest-version lens stays

Rigan chose to keep it. The resume uses the site's existing `HonestText` / lens system, as the home
page does. Lens copy, line-paired the way the content tests require:

- **Band caption, 70,000+:** "They were Ultraviolette's bookings. I built where they happened."
- **Band caption, < 1 wk:** "One very long week."
- **Band caption, 05:** "One of them is a pig game."
- **Page heading** (if the page has a visible heading): an honest pair in the same spirit.

The builder may tune the exact wording, but each honest line must still pass the length-ratio test
in `src/content/content.test.ts`. The PDF has no lens and prints only the polished copy.

## Contact actions

- **"Get on a call" opens WhatsApp.** The link is `https://wa.me/919380654730`, with a prefilled
  message such as "Hi Rigan, saw your resume." Rigan approved publishing this number on 2026-10-16.
  This reverses the redesign spec's line 244 ("deliberately not published") for the resume only.
- **Store the call link once.** Put it in `src/content/site.ts` as `site.call` (`{ label, href }`) so
  it can later switch to a cal.com link in one place. Rigan will send that link.
- **The PDF shows the number as text** next to the email, because buttons do nothing on paper.

## The PDF

- **One A4 page, single column, standard section names** ("Experience", "Education") in the visible
  text. Applicant tracking systems, the software that parses resumes, scramble multi-column layouts
  and drop text drawn as images.
- **Every number is live text.** There are no SVG or image numerals and no text in headers or
  footers.
- **It is generated from the page itself**, using a print stylesheet (`@media print`) and headless
  Chrome's print-to-PDF. That way the page and the PDF cannot drift apart.
  - The output is committed as `public/resume.pdf`.
  - An npm script `resume:pdf` regenerates it from the static build.
  - It is not generated in CI. It changes rarely, and committing it keeps the deploy workflow
    untouched.
- **Links in the PDF are clickable**: email, LinkedIn, WhatsApp, the site and the press links.
- **Check**: copying all text out of the PDF must produce readable lines in reading order, with
  "70,000+" intact. Add a test that extracts the PDF text and asserts this, if it can be done
  without heavy dependencies. Otherwise, verify by hand and note it in the PR.

## Where it plugs into the site

- **Journey section** (`src/content/about.ts`), a content-only fix so the site does not contradict
  the resume: E3 TRION and Cold Stone Arabia move from the "Freelance, 2023 – 2026" row to the
  VeraStack Labs founder row as client work, and the freelance row becomes "2023 – 2024" with Pee
  Empro and Maven. Rigan confirmed both were 2026 founder work, freelance in form.

- **New route** `src/app/resume/page.tsx`, with content in a new `src/content/resume.ts`.
  - Reuse numbers from the existing content files where they already exist (`home.ts` spec sheet,
    `case-studies.ts`), so a number changes in one place.
- **The contact section's resume card** (`src/components/contact/resume-corner.tsx`) stops being a
  "Soon" placeholder.
  - It becomes a link to `/resume/`.
  - The folded corner reveals "Open" or similar, as originally planned in the redesign spec (I12
    "Peel").
  - A plain secondary link to `resume.pdf` covers keyboard and touch users.
  - Update its copy in `src/content/about.ts`.
- **Search and AI readers.**
  - Add `/resume/` to the sitemap and to `llms.txt`.
  - Give it page metadata (title, description, canonical, share image), and keep its search title
    within 65 characters like the case studies.
  - It needs no new JSON-LD type beyond linking from the existing Person graph if that is cheap.
- **Nav.** Not added to the main nav (it is already full). It is reached from the contact card,
  the footer and the hero spec sheet if one fits naturally. This is the builder's call within that.

## Goals

- A hiring reader understands the headline outcome within two seconds, on both phone and paper.
- The web page and the PDF carry the same facts, from one source.
- Every claim is backed: press links for bookings, case studies for client work.

## Non-goals

- No cal.com integration yet; that comes later as a swap of `site.call`.
- No separate "long" CV or downloadable variants per audience.
- No redesign of other sections.

## Anti-goals (a failure even if it works)

- **Overclaiming.**
  - The bookings were Ultraviolette's; the copy says flows "I built", never "I sold".
  - The 2,800+ PRs are "governed", not written.
  - Cold Stone figures are not shown as live results (the site is not launched).
  - Origan has no users or metrics, so none are claimed.
  - E3 has no public booking count, so none is given.
- **Decorative fake data**: skill bars, percentages for skills, invented stats.
- **A PDF that a parser reads as garbage**, or that spills onto a second page.
- **Em dashes anywhere.**
- **Using any internal Origan facts.** Only public ones are allowed.

## Constraints

- Next.js 16 static export, GitHub Pages, trailing slashes. The existing design tokens, fonts and
  lens system apply.
- No AI attribution in commits, PRs or docs. Branch per phase, PR and merge, and update
  `docs/STATUS.md` in the same PR.
- Reduced motion: any reveal on the band must respect `prefers-reduced-motion`, which is the
  operating system setting some people turn on to minimise animation.

## If the PDF overflows one page

Call: cut in this order, print only, until it fits.

1. The coaching line.
2. The press line, down to one link (Autocar India).
3. The freelance row, down to one line.

The band, the Ultraviolette row and the contact line are never cut.

## Left to the builder

- Exact motion: for example, the odometer roll already used for the spec sheet on the band
  numerals, and how the band links scroll to roles.
- How the print stylesheet hides the nav, footer, lens and buttons.
- Exact typography sizes, within the mockup's proportions.
- Whether the PDF script uses the locally installed Chrome or another headless browser already
  available. Avoid adding a heavy dependency.

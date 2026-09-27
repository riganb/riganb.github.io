# Phase 5: Side Projects, Journey, Toolbox and Contact Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish the home page (spec 5.05 to 5.08): side projects, the journey timeline with a halftone portrait (I10), the toolbox, and contact with its lens sign-off, magnetic email button (I14), captioned links, resume corner (I12) and footer.

**Architecture:** Copy in `src/content/about.ts`. Two pure, tested helpers: `src/lib/halftone.ts` (dot radius from luminance, theme-aware) and `src/lib/magnet.ts` (pull offset toward the pointer). Small client components render on top of them; everything else is server-rendered.

**Tech Stack:** Next.js 16, React 19, Canvas 2D, CSS, Vitest, sharp (one-off image conversion, not a dependency).

## Global Constraints

- Everything in earlier phases' Global Constraints still applies.
- Branch `feat/about-contact`; the phase ends with a PR merged into `main`.
- The contact sign-off is a line pair and uses the lens.
- The phone number is never published.
- Portrait: `public/portrait.webp` (display, 900 wide) and `public/portrait-sample.webp` (halftone source, 180 wide). `public/riganb.png` (a 448 KB JPEG with a .png name) is removed.

## Deviations from the spec (recorded in Task 5)

- I10: custom 2D canvas halftone instead of React Bits `HalftoneReveal` (WebGL via `ogl` with fixed colours); ours reads the live tokens and inverts correctly in dark mode.
- I12: a CSS corner fold instead of Canvas UI `Peel`.
- I14: custom magnet over the lens easing instead of React Bits `Magnet`.
- I11 decrypt labels: deferred; not needed for the section to work.

---

### Task 1: Content, halftone and magnet maths

**Files:** Create `src/content/about.ts`, `src/lib/halftone.ts`, `src/lib/magnet.ts`; Test `src/lib/halftone.test.ts`, `src/lib/magnet.test.ts`; Modify `src/content/content.test.ts`.

**Interfaces:**
- `luminance(r: number, g: number, b: number): number` (0 to 1, Rec. 709 weights on 0 to 255 channels)
- `dotRadius(lum: number, cell: number, inkIsDark: boolean): number` (dark ink grows with darkness, light ink grows with brightness; max radius is `cell * 0.62`)
- `magnetOffset(pointer: Point, center: Point, radius: number, strength: number): Point` (zero outside `radius`; inside, `(pointer - center) * strength * (1 - distance / radius)`)

- [ ] **Step 1: Failing tests**

```ts
// src/lib/halftone.test.ts
import { describe, expect, it } from 'vitest'
import { dotRadius, luminance } from '@/lib/halftone'

describe('luminance', () => {
  it('is 0 for black and 1 for white', () => {
    expect(luminance(0, 0, 0)).toBe(0)
    expect(luminance(255, 255, 255)).toBeCloseTo(1, 5)
  })
})

describe('dotRadius', () => {
  it('draws the biggest dark dots on the darkest pixels', () => {
    expect(dotRadius(0, 10, true)).toBeCloseTo(6.2, 5)
    expect(dotRadius(1, 10, true)).toBe(0)
  })

  it('draws the biggest light dots on the brightest pixels', () => {
    expect(dotRadius(1, 10, false)).toBeCloseTo(6.2, 5)
    expect(dotRadius(0, 10, false)).toBe(0)
  })
})
```

```ts
// src/lib/magnet.test.ts
import { describe, expect, it } from 'vitest'
import { magnetOffset } from '@/lib/magnet'

describe('magnetOffset', () => {
  it('does nothing outside the radius', () => {
    expect(magnetOffset({ x: 300, y: 0 }, { x: 0, y: 0 }, 100, 0.4)).toEqual({ x: 0, y: 0 })
  })

  it('pulls toward the pointer, less the further away it is', () => {
    expect(magnetOffset({ x: 50, y: 0 }, { x: 0, y: 0 }, 100, 0.4)).toEqual({ x: 10, y: 0 })
  })

  it('does not move when the pointer is dead centre', () => {
    expect(magnetOffset({ x: 0, y: 0 }, { x: 0, y: 0 }, 100, 0.4)).toEqual({ x: 0, y: 0 })
  })
})
```

Run: `npm test -- src/lib/halftone.test.ts src/lib/magnet.test.ts`. Expected: FAIL, modules missing.

- [ ] **Step 2: Implement**

```ts
// src/lib/halftone.ts
export function luminance(r: number, g: number, b: number): number {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
}

// Dark ink on paper grows with darkness; light ink on a dark page grows with brightness,
// so the portrait never turns into a photographic negative in dark mode.
export function dotRadius(lum: number, cell: number, inkIsDark: boolean): number {
  const amount = inkIsDark ? 1 - lum : lum
  return cell * 0.62 * Math.max(0, Math.min(1, amount))
}
```

```ts
// src/lib/magnet.ts
import type { Point } from '@/lib/lens'

export function magnetOffset(pointer: Point, center: Point, radius: number, strength: number): Point {
  const dx = pointer.x - center.x
  const dy = pointer.y - center.y
  const distance = Math.hypot(dx, dy)
  if (distance >= radius) return { x: 0, y: 0 }
  const pull = strength * (1 - distance / radius)
  return { x: dx * pull, y: dy * pull }
}
```

Run the tests: PASS (6).

- [ ] **Step 3: Write `src/content/about.ts`**

```ts
import type { LinePair } from '@/lib/pairs'

type Link = { label: string; href: string }

export const sideProjects = {
  label: '// Side projects and open source',
  items: [
    {
      name: 'Autom8r',
      kind: 'AI workflow builder',
      body: 'Chain Stripe, Google Forms, Claude, OpenAI or Gemini, and Slack or Discord into reusable flows, run in dependency order by an Inngest engine.',
      stack: ['Next.js', 'tRPC', 'Prisma', 'Inngest'],
      links: [
        { label: 'GitHub', href: 'https://github.com/riganb/autom8r' },
        { label: 'Live', href: 'https://autom8r.vercel.app' },
      ] satisfies Link[],
    },
    {
      name: 'use-content',
      kind: 'Open-source React hook',
      body: 'Gives marketing a live copy editor in dev and staging, then disappears from production builds, adding less than 1 kB.',
      stack: ['React', 'TypeScript', 'npm'],
      links: [
        { label: 'GitHub', href: 'https://github.com/riganb/use-content' },
        { label: 'npm', href: 'https://www.npmjs.com/package/@riganb/use-content' },
      ] satisfies Link[],
    },
  ],
}

export const journey = {
  label: '// Journey',
  title: 'How I *got* here',
  portraitAlt: 'Rigan Burnwal in a white hoodie against a dark background',
  rows: [
    { when: '2026', what: 'Founder, VeraStack Labs', detail: 'rigseed, Riggit and Mehfil' },
    {
      when: '2024 – now',
      what: 'Software Engineer, Ultraviolette Automotive',
      detail: 'The X-47 configurator, a typed monorepo, 2,800+ PRs. Spark Award, June 2025.',
    },
    { when: '2023 – 2026', what: 'Freelance', detail: 'Pee Empro, Maven, Cold Stone Arabia, E3 Electric.AI' },
    { when: '2023 – 2024', what: 'Contract Software Engineer, Suggaa Ventures', detail: 'Payments, cancellation flows, pricing data' },
    { when: '2020 – 2024', what: 'B.E. Information Science', detail: 'JSSATE, Bangalore' },
  ],
}

export const toolbox = {
  label: '// Toolbox',
  columns: [
    { title: 'Frameworks', items: ['React', 'Next.js', 'Node.js', 'tRPC', 'Prisma', 'Jotai', 'Tailwind CSS', 'Tauri'] },
    { title: 'Languages', items: ['TypeScript', 'JavaScript', 'Rust', 'SQL', 'Python', 'Java'] },
    { title: 'Cloud', items: ['AWS Lambda', 'API Gateway', 'S3', 'DynamoDB', 'PostgreSQL', 'Supabase'] },
    { title: 'Tools', items: ['TurboRepo', 'Vercel', 'GitHub Actions', 'Inngest', 'GSAP', 'Figma'] },
  ],
}

export const contact = {
  label: '// Contact',
  signOff: {
    lines: ["Let's build something", 'that *outlasts* its launch.'],
    honest: ["Let's build something.", "I'll over-engineer it."],
  } satisfies LinePair,
  emailCaption: 'I actually read it.',
  resume: { label: 'Resume', caption: 'One page. I checked.' },
  footer: 'Built in Bangalore. Set in Instrument Serif and Geist Mono.',
}
```

Register `about` in `src/content/content.test.ts`. Run `npm test`: PASS. Commit: `feat: add about and contact copy with halftone and magnet maths`.

---

### Task 2: Portrait assets

- [ ] Convert `public/riganb.png` with sharp into `public/portrait.webp` (900 wide, quality 80) and `public/portrait-sample.webp` (180 wide, quality 90); `git rm public/riganb.png`. Commit: `chore: replace the portrait with sized WebP files`.

---

### Task 3: Side projects, journey with halftone portrait, toolbox

**Files:** Create `src/components/about/side-projects.tsx`, `src/components/about/journey.tsx`, `src/components/about/halftone-portrait.tsx`, `src/components/about/toolbox.tsx`; Modify `src/app/page.tsx`.

- [ ] **Step 1: `halftone-portrait.tsx`** (client). Loads `/portrait-sample.webp` into an offscreen canvas, samples one pixel per cell, and draws a dot per cell on a visible canvas sized to its container (cell 7px, DPR capped at 2) in `--ink`, with `inkIsDark` true in the light theme and false in the dark theme (read from the computed `--paper` luminance). Redraws on resize and on theme change (MutationObserver on `data-theme`, `prefers-color-scheme` listener). Under it sits `<img src="/portrait.webp">`; on hover or focus (fine pointer) the canvas fades out to reveal the photo. Reduced motion: no fade transition. The `img` carries the alt text; the canvas is `aria-hidden`.

- [ ] **Step 2: `journey.tsx`**: `id="journey"`, label, serif title with emphasis, a two-column layout (timeline left, portrait right at `lg`): each row is a grid of mono `when`, serif `what`, muted `detail`, separated by hairlines.

- [ ] **Step 3: `side-projects.tsx`** (two columns, each project: mono kind, serif name, body, mono stack, pill links opening in a new tab) and `toolbox.tsx` (four mono columns with serif column titles).

- [ ] **Step 4:** Mount after `StudioChapter`: `SideProjects`, `Journey`, `Toolbox`. Verify in Chrome in both themes (portrait dots invert correctly; hover reveals the photo) and at phone width. Run all checks. Commit: `feat: add side projects, journey with halftone portrait, and toolbox`.

---

### Task 4: Contact, magnet, resume corner and footer

**Files:** Create `src/components/contact/contact.tsx`, `src/components/contact/magnet.tsx`, `src/components/contact/resume-corner.tsx`, `src/components/site-footer.tsx`; Modify `src/app/page.tsx`, `src/app/globals.css`.

- [ ] **Step 1: `magnet.tsx`** (client): wraps a child; on fine pointers, listens for pointer movement within `radius` (140px) of its centre and eases its `translate` toward `magnetOffset(..., strength 0.35)` with `approach()`, returning to rest on leave. No effect on touch or with reduced motion.

- [ ] **Step 2: `resume-corner.tsx`**: a paper card link to `site.resume` with a folded bottom-right corner (a triangle via `clip-path` plus a darker fold); on hover or focus the fold grows and reveals "PDF ↓". Pure CSS; the link text and caption stay readable without the effect.

- [ ] **Step 3: `contact.tsx`**: `id="contact"`, label, the sign-off as `HonestText` + `RevealLines` (same pattern as the hero), the email as a large pill inside `Magnet` with its caption, a list of socials with captions from `site.socials`, and the resume corner.

- [ ] **Step 4: `site-footer.tsx`**: hairline, `contact.footer`, "© 2026 Rigan Burnwal", and a "Back to top" link to `#main`. Mount `Contact` after `Toolbox`, and the footer after `</main>` in `page.tsx`.

- [ ] **Step 5:** Verify in Chrome: the lens on the sign-off, the magnet pull, the resume fold, keyboard focus on every link. Phone width: press mode covers the sign-off; no magnet. Run all checks. Commit: `feat: add contact with lens sign-off, magnetic email, resume corner and footer`.

---

### Task 5: Spec notes and phase PR

- [ ] Record the I10, I12, I14 source changes and the I11 deferral in the spec table. Commit, push, open the PR, wait for CI, merge, pull `main`.

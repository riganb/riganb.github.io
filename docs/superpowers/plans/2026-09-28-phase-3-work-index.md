# Phase 3: Work Index Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the "Selected work" index (spec section 5.03): seven numbered client rows with a direction-aware accent band (I4) and a preview that follows the cursor (I5).

**Architecture:** Work content lives in `src/content/work.ts`. A server `WorkIndex` renders an ordered list; a small client `WorkRow` records which edge the pointer entered and left through, and CSS animates the band from that edge. One client `WorkPreview` per list follows the pointer with the lens easing and a velocity tilt, showing the hovered row's screenshot or a typographic card. Media-query subscriptions move into a shared hook.

**Tech Stack:** Next.js 16, React 19, CSS transitions, `requestAnimationFrame`, Vitest.

## Global Constraints

- Everything in Phase 1 and 2 Global Constraints still applies.
- Branch `feat/work-index`; the phase ends with a PR merged into `main`.
- Band and preview only with a fine hovering pointer and motion allowed. Otherwise each row shows its note under the title and there is no band or preview.
- Case study pages arrive in Phase 4. Until then rows are not links; they are focusable so keyboard users can reveal notes.
- Preview images: `public/work/<slug>/preview.webp`, 960×600, generated from 1440×900 captures (Cold Stone uses the typo-free menu page).

## Deviation from the spec (recorded in Task 4)

- I5 cursor preview: custom, reusing the lens's `approach()` easing, instead of Motion Primitives `Cursor`, to avoid adding `motion` for one follower.

## File map

| Path | Responsibility |
|---|---|
| `src/content/work.ts` | Section copy and the seven work items |
| `src/lib/hover.ts` | Entry-edge and tilt maths |
| `src/components/use-media-query.ts` | Shared `matchMedia` subscription hook and queries |
| `src/components/work/work-index.tsx` | Section and list |
| `src/components/work/work-row.tsx` | One row with the band |
| `src/components/work/work-preview.tsx` | Cursor-following preview |

---

### Task 1: Work content and hover maths

**Files:**
- Create: `src/content/work.ts`, `src/lib/hover.ts`
- Test: `src/lib/hover.test.ts`
- Modify: `src/content/content.test.ts`

**Interfaces:**
- Produces: `type WorkItem = { slug; client; discipline; year; note; caseStudy?: boolean; status?: 'in-progress'; preview?: { src; alt } }`, `work { label; title; items: WorkItem[] }`, `type Edge = 'top' | 'bottom'`, `entryEdge(pointerY: number, rect: { top: number; height: number }): Edge`, `tiltFromVelocity(vx: number, maxDeg = 8): number`.

- [ ] **Step 1: Write the failing test `src/lib/hover.test.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { entryEdge, tiltFromVelocity } from '@/lib/hover'

describe('entryEdge', () => {
  it('is top when the pointer is in the upper half', () => {
    expect(entryEdge(110, { top: 100, height: 80 })).toBe('top')
  })

  it('is bottom when the pointer is in the lower half', () => {
    expect(entryEdge(175, { top: 100, height: 80 })).toBe('bottom')
  })

  it('treats the exact middle as top', () => {
    expect(entryEdge(140, { top: 100, height: 80 })).toBe('top')
  })
})

describe('tiltFromVelocity', () => {
  it('leans with horizontal movement', () => {
    expect(tiltFromVelocity(2)).toBeCloseTo(3, 5)
    expect(tiltFromVelocity(-2)).toBeCloseTo(-3, 5)
  })

  it('never exceeds the maximum', () => {
    expect(tiltFromVelocity(400)).toBe(8)
    expect(tiltFromVelocity(-400)).toBe(-8)
  })
})
```

Run: `npm test -- src/lib/hover.test.ts`
Expected: FAIL, cannot find `@/lib/hover`.

- [ ] **Step 2: Implement `src/lib/hover.ts`**

```ts
export type Edge = 'top' | 'bottom'

export function entryEdge(pointerY: number, rect: { top: number; height: number }): Edge {
  return pointerY - rect.top <= rect.height / 2 ? 'top' : 'bottom'
}

// Degrees of lean for a horizontal velocity in px per frame.
export function tiltFromVelocity(vx: number, maxDeg = 8): number {
  return Math.max(-maxDeg, Math.min(maxDeg, vx * 1.5))
}
```

Run: `npm test -- src/lib/hover.test.ts`
Expected: PASS, 5 tests.

- [ ] **Step 3: Write `src/content/work.ts`**

```ts
export type WorkItem = {
  slug: string
  client: string
  discipline: string
  year: string
  note: string
  caseStudy?: boolean
  status?: 'in-progress'
  preview?: { src: string; alt: string }
}

export const work = {
  label: '// Selected work',
  title: 'Selected *work*',
  items: [
    {
      slug: 'cold-stone',
      client: 'Cold Stone Creamery Arabia',
      discipline: 'Website and CMS',
      year: '2026',
      note: '76 stores, six countries, one CMS. First paint 716 ms to 264 ms.',
      caseStudy: true,
      preview: { src: '/work/cold-stone/preview.webp', alt: 'The rebuilt Cold Stone Creamery Arabia menu page' },
    },
    {
      slug: 'e3-trion',
      client: 'E3 Electric.AI, TRION',
      discipline: 'Website, configurator, booking',
      year: '2026',
      note: "Launch site for India's first AI-powered scooter, with booking and Razorpay.",
      caseStudy: true,
      preview: { src: '/work/e3-trion/preview.webp', alt: 'The E3 TRION product page' },
    },
    {
      slug: 'ultraviolette',
      client: 'Ultraviolette, X-47',
      discipline: 'Configurator and platform',
      year: '2025',
      note: 'The configurator behind the X-47 launch, on a monorepo of 2,800+ PRs.',
      caseStudy: true,
      preview: { src: '/work/ultraviolette/preview.webp', alt: 'The Ultraviolette X-47 configurator' },
    },
    {
      slug: 'suggaa',
      client: 'Suggaa Ventures',
      discipline: 'Payments and pricing data',
      year: '2023',
      note: 'Checkout that got 40% lighter, and fares trained on four ride-hailing apps.',
    },
    {
      slug: 'maven',
      client: 'Maven Consultancy Services',
      discipline: 'Event QR pipeline',
      year: '2024',
      note: 'Register, get a QR by email, scan it at the counter. Every attendee, one record.',
    },
    {
      slug: 'pee-empro',
      client: 'Pee Empro Exports',
      discipline: 'Android attendance app',
      year: '2023',
      note: 'QR attendance on Android, exported to CSV whenever they need it.',
    },
    {
      slug: 'pixelstack',
      client: 'PixelStack Studio',
      discipline: 'Website',
      year: '2026',
      note: "A design and development studio's site. Currently on the workbench.",
      status: 'in-progress',
    },
  ] satisfies WorkItem[],
}
```

- [ ] **Step 4: Register the module in `src/content/content.test.ts`**

Add `import * as workContent from '@/content/work'` and change the modules line to `const modules: Record<string, unknown> = { site, home, work: workContent }`.

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/hover.ts src/lib/hover.test.ts src/content public/work
git commit -m "feat: add work index content, previews and hover maths"
```

---

### Task 2: Shared media query hook

**Files:**
- Create: `src/components/use-media-query.ts`
- Modify: `src/components/lens/lens-provider.tsx`

**Interfaces:**
- Produces: `HOVER_LENS_QUERY`, `FINE_POINTER_QUERY`, `useMediaQuery(query: string): boolean` (false during server render).

- [ ] **Step 1: Write `src/components/use-media-query.ts`**

```ts
'use client'

import { useCallback, useSyncExternalStore } from 'react'

// A precise pointer on a wide screen with motion allowed: the ink lens trails the cursor.
export const HOVER_LENS_QUERY =
  '(hover: hover) and (pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)'

// A precise pointer with motion allowed: hover effects such as the work index band and preview.
export const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    [query],
  )
  return useSyncExternalStore(subscribe, () => matchMedia(query).matches, () => false)
}
```

- [ ] **Step 2: Use it in `src/components/lens/lens-provider.tsx`**

Delete `HOVER_QUERY`, `subscribeHover`, `getHover` and `getServerHover`, remove `useSyncExternalStore` from the React import, add `import { HOVER_LENS_QUERY, useMediaQuery } from '@/components/use-media-query'`, and replace the `hover` line with:

```ts
  const hover = useMediaQuery(HOVER_LENS_QUERY)
```

- [ ] **Step 3: Verify and commit**

Run: `npm run lint && npm run typecheck && npm test`
Expected: all pass.

```bash
git add src/components/use-media-query.ts src/components/lens/lens-provider.tsx
git commit -m "refactor: share media query subscriptions"
```

---

### Task 3: Index, rows, band and preview

**Files:**
- Create: `src/components/work/work-index.tsx`, `src/components/work/work-row.tsx`, `src/components/work/work-preview.tsx`
- Modify: `src/app/globals.css`, `src/app/page.tsx`

**Interfaces:**
- Consumes: `work`, `WorkItem`, `entryEdge`, `tiltFromVelocity`, `approach`, `useMediaQuery`, `FINE_POINTER_QUERY`, `Emphasis`.
- Produces: `<WorkIndex />` with `id="work"`; `<WorkRow item index onActive(slug | null)>`; `<WorkPreview items activeSlug>`.

- [ ] **Step 1: Write `src/components/work/work-row.tsx`**

```tsx
'use client'

import { useRef, type PointerEvent } from 'react'
import type { WorkItem } from '@/content/work'
import { entryEdge } from '@/lib/hover'

type WorkRowProps = {
  item: WorkItem
  index: number
  onActive: (slug: string | null) => void
}

export function WorkRow({ item, index, onActive }: WorkRowProps) {
  const ref = useRef<HTMLLIElement>(null)

  // The band grows from the edge the pointer came through and retreats through the edge it leaves by.
  const setEdge = (event: PointerEvent<HTMLLIElement>) => {
    const el = ref.current
    if (el) el.dataset.edge = entryEdge(event.clientY, el.getBoundingClientRect())
  }

  return (
    <li
      ref={ref}
      tabIndex={0}
      data-edge="top"
      aria-label={`${item.client}, ${item.discipline}, ${item.year}. ${item.note}`}
      onPointerEnter={(event) => {
        setEdge(event)
        onActive(item.slug)
      }}
      onPointerLeave={(event) => {
        setEdge(event)
        onActive(null)
      }}
      onFocus={() => onActive(item.slug)}
      onBlur={() => onActive(null)}
      className="work-row relative border-b border-rule outline-none"
    >
      <span aria-hidden="true" className="work-band absolute inset-0 bg-accent" />
      <div
        aria-hidden="true"
        className="relative mx-auto grid max-w-[1320px] grid-cols-[2.5rem_1fr] items-baseline gap-x-4 px-6 py-5 md:px-10 lg:grid-cols-[3rem_1fr_minmax(0,22rem)_4rem] lg:py-6"
      >
        <span className="work-meta font-mono text-[11px] text-muted">{String(index + 1).padStart(2, '0')}</span>
        <span className="work-title font-display text-[clamp(1.75rem,4vw,3.5rem)] leading-none tracking-[-0.01em]">
          {item.client}
          {item.status === 'in-progress' && (
            <span className="work-meta ml-3 align-middle font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
              In progress
            </span>
          )}
        </span>
        <span className="work-note col-start-2 mt-2 text-sm leading-snug text-ink-2 lg:col-start-3 lg:row-start-1 lg:mt-0">
          {item.note}
        </span>
        <span className="work-facts work-meta col-start-2 mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted lg:col-span-2 lg:col-start-3 lg:row-start-1 lg:mt-0 lg:grid lg:grid-cols-[minmax(0,22rem)_4rem] lg:text-right">
          <span className="lg:text-left">{item.discipline}</span>
          <span className="ml-3 lg:ml-0">{item.year}</span>
        </span>
      </div>
    </li>
  )
}
```

- [ ] **Step 2: Write `src/components/work/work-preview.tsx`**

```tsx
'use client'

import { useEffect, useRef } from 'react'
import type { WorkItem } from '@/content/work'
import { tiltFromVelocity } from '@/lib/hover'
import { approach } from '@/lib/lens'

const OFFSET_X = 36
const WIDTH = 320
const HEIGHT = 200

export function WorkPreview({ items, activeSlug }: { items: WorkItem[]; activeSlug: string | null }) {
  const ref = useRef<HTMLDivElement>(null)
  const active = useRef(activeSlug)

  useEffect(() => {
    active.current = activeSlug
  }, [activeSlug])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const target = { x: 0, y: 0 }
    const pos = { x: 0, y: 0 }
    let placed = false
    let tilt = 0
    let last = performance.now()
    let frame = 0

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX + OFFSET_X
      target.y = event.clientY - HEIGHT / 2
      if (!placed) {
        pos.x = target.x
        pos.y = target.y
        placed = true
      }
    }

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64)
      last = now
      const before = pos.x
      pos.x = approach(pos.x, target.x, dt, 0.18)
      pos.y = approach(pos.y, target.y, dt, 0.18)
      tilt = approach(tilt, tiltFromVelocity(pos.x - before), dt, 0.2)
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${tilt}deg)`
      el.dataset.visible = active.current ? 'true' : 'false'
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-visible="false"
      className="work-preview pointer-events-none fixed left-0 top-0 z-40 overflow-hidden rounded-md border border-rule bg-paper-2 shadow-[0_24px_48px_-24px_rgb(0_0_0/0.5)]"
      style={{ width: WIDTH, height: HEIGHT }}
    >
      {items.map((item) =>
        item.preview ? (
          // eslint-disable-next-line @next/next/no-img-element -- static export serves pre-sized WebP files
          <img
            key={item.slug}
            src={item.preview.src}
            alt=""
            width={960}
            height={600}
            decoding="async"
            data-active={item.slug === activeSlug}
            className="work-preview-item absolute inset-0 size-full object-cover"
          />
        ) : (
          <div
            key={item.slug}
            data-active={item.slug === activeSlug}
            className="work-preview-item absolute inset-0 flex flex-col justify-between p-5"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted">{item.discipline}</span>
            <span className="font-display text-3xl leading-none text-ink">{item.client}</span>
          </div>
        ),
      )}
    </div>
  )
}
```

- [ ] **Step 3: Write `src/components/work/work-index.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { FINE_POINTER_QUERY, useMediaQuery } from '@/components/use-media-query'
import { Emphasis } from '@/components/typography/emphasis'
import { WorkPreview } from '@/components/work/work-preview'
import { WorkRow } from '@/components/work/work-row'
import { work } from '@/content/work'

export function WorkIndex() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const fine = useMediaQuery(FINE_POINTER_QUERY)

  return (
    <section id="work" aria-labelledby="work-title" className="border-b border-rule">
      <div className="mx-auto max-w-[1320px] px-6 pb-10 pt-24 md:px-10 md:pt-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{work.label}</p>
        <h2 id="work-title" className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-[-0.02em]">
          <Emphasis text={work.title} />
        </h2>
      </div>
      <ol className="border-t border-ink">
        {work.items.map((item, index) => (
          <WorkRow key={item.slug} item={item} index={index} onActive={setActiveSlug} />
        ))}
      </ol>
      {fine && <WorkPreview items={work.items} activeSlug={activeSlug} />}
    </section>
  )
}
```

- [ ] **Step 4: Styles** (append to `src/app/globals.css`)

```css
/* Work index. Without a fine hovering pointer, notes sit under each title and nothing animates. */
.work-band {
  transform: scaleY(0);
  transform-origin: top;
}

.work-row[data-edge='bottom'] .work-band {
  transform-origin: bottom;
}

.work-preview {
  opacity: 0;
  transition: opacity 0.25s;
}

.work-preview[data-visible='true'] {
  opacity: 1;
}

.work-preview-item {
  opacity: 0;
  transition: opacity 0.2s;
}

.work-preview-item[data-active='true'] {
  opacity: 1;
}

@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .work-band {
    transition: transform 0.45s cubic-bezier(0.65, 0, 0.35, 1);
  }

  .work-title,
  .work-meta,
  .work-note {
    transition:
      color 0.3s,
      opacity 0.3s;
  }
}

@media (hover: hover) and (pointer: fine) and (min-width: 1024px) {
  .work-note {
    opacity: 0;
  }

  .work-row:hover .work-band,
  .work-row:focus-visible .work-band {
    transform: scaleY(1);
  }

  .work-row:hover .work-title,
  .work-row:hover .work-meta,
  .work-row:hover .work-note,
  .work-row:focus-visible .work-title,
  .work-row:focus-visible .work-meta,
  .work-row:focus-visible .work-note {
    color: var(--accent-ink);
  }

  .work-row:hover .work-note,
  .work-row:focus-visible .work-note {
    opacity: 1;
  }

  .work-row:hover .work-facts,
  .work-row:focus-visible .work-facts {
    opacity: 0;
  }
}
```

On wide screens with a mouse, the note fades in where discipline and year were, as the band covers the row. Everywhere else the note stays visible under the title.

- [ ] **Step 5: Replace the spacer in `src/app/page.tsx`**

```tsx
import { Hero } from '@/components/home/hero'
import { Statement } from '@/components/home/statement'
import { WorkIndex } from '@/components/work/work-index'

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Statement />
      <WorkIndex />
    </main>
  )
}
```

- [ ] **Step 6: Verify in Chrome and at phone width**

Desktop: rows show number, serif client, discipline and year. Entering a row from above grows the band downward; from below, upward; leaving retracts it toward the exit edge. The note replaces discipline and year. The preview follows the cursor with lag and leans with horizontal movement; Suggaa, Maven, Pee Empro and PixelStack show typographic cards. Tab reaches each row and shows its band. Phone width: notes under each title, no band, no preview.

- [ ] **Step 7: Run all checks and commit**

Run: `npm test && npm run lint && npm run typecheck && npm run build`
Expected: all pass.

```bash
git add src/components/work src/app/globals.css src/app/page.tsx
git commit -m "feat: add the work index with direction-aware band and cursor preview"
```

---

### Task 4: Spec note and phase PR

- [ ] **Step 1:** In the spec's section 4 table, set I5's source to `Custom, reusing the lens easing (avoids adding motion for one follower)`, and note in section 5.03 that rows become links to case studies in Phase 4.
- [ ] **Step 2:** Commit, push `feat/work-index`, open the PR with what shipped and how it was verified, wait for CI, merge, pull `main`.

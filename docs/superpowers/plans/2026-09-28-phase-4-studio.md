# Phase 4: VeraStack Labs Chapter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the home page's VeraStack Labs chapter (spec 5.04) as the page's one story scroll (I6): an intro sheet, then rigseed, Riggit and Mehfil dealt onto the pile, each in its own palette, released into a link to the studio. Also swap Cold Stone's preview for its typographic card until the new site launches.

**Architecture:** `StoryScroll` adapts Samira Boudjadja's 21st.dev component (reference copy in the workspace `references/story-scroll.tsx`) with the fixes recorded in the spec: a `div` wrapper, `overflow: clip`, a configurable angle, an edge shadow and a shade that darkens the covered sheet. Product palettes live in `src/styles/products.ts`, are applied by redefining the site's CSS variables on each sheet, and are held to the same contrast rules as the site palette.

**Tech Stack:** Next.js 16, React 19, GSAP ScrollTrigger with `@gsap/react`, Lenis (already wired), Vitest.

## Global Constraints

- Everything in earlier phases' Global Constraints still applies.
- Branch `feat/studio`; the phase ends with a PR merged into `main`.
- Exactly one story scroll on the home page.
- Riggit copy follows its PRODUCT.md: positioned as "Own your GitHub timeline"; never name the mechanism behind it.
- Mehfil has no public page yet: its sheet shows an invite card built in its own design language (cream, ink, saffron, 3px borders, hard shadows) instead of a screenshot.
- `prefers-reduced-motion: reduce`: sheets stack normally, no pinning or rotation.
- Studio images: `public/studio/<slug>.webp`, 1200×750, from 1440×900 landing page captures.

## File map

| Path | Responsibility |
|---|---|
| `src/styles/products.ts` | Product palettes and their contrast rules |
| `src/content/studio.ts` | Chapter copy, products, links |
| `src/components/motion/story-scroll.tsx` | `StoryScroll` and `StorySheet` |
| `src/components/studio/product-sheet.tsx` | One product's sheet |
| `src/components/studio/mehfil-invite.tsx` | Mehfil's invite card mock |
| `src/components/studio/studio-chapter.tsx` | Section composition |

---

### Task 1: Cold Stone typographic card

- [ ] Remove the `preview` property from the `cold-stone` item in `src/content/work.ts`, delete `public/work/cold-stone/`, run `npm test`, and commit `fix: show Cold Stone as a typographic card until its new site launches`. Files in `public/` are published even when nothing links to them, so the capture must leave the repo, not just the content.

---

### Task 2: Product palettes with enforced contrast

**Files:**
- Create: `src/styles/products.ts`
- Test: `src/styles/products.test.ts`

**Interfaces:**
- Produces: `type ProductSlug = 'rigseed' | 'riggit' | 'mehfil'`, `type ProductPalette = { paper; 'paper-2'; ink; 'ink-2'; muted; rule; accent; 'accent-ink'; fill }`, `productPalettes: Record<ProductSlug, ProductPalette>`, `PRODUCT_CONTRAST_RULES`, `paletteStyle(slug): CSSProperties` (returns `--paper` and friends for inline use).

- [ ] **Step 1: Write the failing test `src/styles/products.test.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { contrastRatio } from '@/lib/contrast'
import { PRODUCT_CONTRAST_RULES, paletteStyle, productPalettes, type ProductSlug } from '@/styles/products'

const slugs = Object.keys(productPalettes) as ProductSlug[]

describe('product palettes', () => {
  const cases = slugs.flatMap((slug) => PRODUCT_CONTRAST_RULES.map((rule) => ({ slug, ...rule })))

  it.each(cases)('$slug: $fg on $bg reaches $min:1', ({ slug, fg, bg, min }) => {
    expect(contrastRatio(productPalettes[slug][fg], productPalettes[slug][bg])).toBeGreaterThanOrEqual(min)
  })

  it('exposes a palette as CSS variables', () => {
    const style = paletteStyle('riggit') as Record<string, string>
    expect(style['--paper']).toBe(productPalettes.riggit.paper)
    expect(style['--accent']).toBe(productPalettes.riggit.accent)
  })
})
```

Run: `npm test -- src/styles/products.test.ts`
Expected: FAIL, cannot find `@/styles/products`.

- [ ] **Step 2: Implement `src/styles/products.ts`**

```ts
import type { CSSProperties } from 'react'

export type ProductSlug = 'rigseed' | 'riggit' | 'mehfil'

type Key = 'paper' | 'paper-2' | 'ink' | 'ink-2' | 'muted' | 'rule' | 'accent' | 'accent-ink' | 'fill'
export type ProductPalette = Record<Key, string>

// Sampled from each product's own site or design system. Each sheet redefines the site's
// variables with these, so every component inside it takes on the product's colours.
export const productPalettes: Record<ProductSlug, ProductPalette> = {
  rigseed: {
    paper: '#0A0E15',
    'paper-2': '#121923',
    ink: '#F1F4F8',
    'ink-2': '#B8C3CF',
    muted: '#8794A3',
    rule: '#222C38',
    accent: '#8FB0CB',
    'accent-ink': '#0A0E15',
    fill: '#7393AC',
  },
  riggit: {
    paper: '#0B140F',
    'paper-2': '#111C16',
    ink: '#EEF0EC',
    'ink-2': '#B7C0B9',
    muted: '#86938A',
    rule: '#1E2B24',
    accent: '#34D399',
    'accent-ink': '#0B140F',
    fill: '#32C785',
  },
  mehfil: {
    paper: '#F3E9DA',
    'paper-2': '#FAF4EA',
    ink: '#1C120B',
    'ink-2': '#4A3B2E',
    muted: '#5E4E40',
    rule: '#1C120B',
    accent: '#B93E29',
    'accent-ink': '#F3E9DA',
    fill: '#E8A33D',
  },
}

export const PRODUCT_CONTRAST_RULES: Array<{ fg: Key; bg: Key; min: number }> = [
  { fg: 'ink', bg: 'paper', min: 4.5 },
  { fg: 'ink', bg: 'paper-2', min: 4.5 },
  { fg: 'ink-2', bg: 'paper', min: 4.5 },
  { fg: 'muted', bg: 'paper', min: 4.5 },
  { fg: 'accent', bg: 'paper', min: 4.5 },
  { fg: 'accent-ink', bg: 'accent', min: 4.5 },
  { fg: 'ink', bg: 'fill', min: 4.5 },
]

export function paletteStyle(slug: ProductSlug): CSSProperties {
  const palette = productPalettes[slug]
  return Object.fromEntries(Object.entries(palette).map(([key, value]) => [`--${key}`, value])) as CSSProperties
}
```

- [ ] **Step 3: Run it, adjust any failing shade, commit**

Run: `npm test -- src/styles/products.test.ts`
Expected: PASS for all 21 contrast cases. If one fails, darken or lighten only that value until it passes, keeping its hue.

```bash
git add src/styles/products.ts src/styles/products.test.ts
git commit -m "feat: add product palettes with enforced contrast"
```

---

### Task 3: Story scroll

**Files:**
- Create: `src/components/motion/story-scroll.tsx`

**Interfaces:**
- Produces: `<StoryScroll label: string; angle?: number>` wrapping `<StorySheet label: string; className?; style?>` children.

- [ ] **Step 1: Write `src/components/motion/story-scroll.tsx`**

```tsx
'use client'

// Adapted from Story Scroll by Samira Boudjadja:
// https://21st.dev/@boudjadjasamira/components/story-scroll
// Changes: a div wrapper (the page already has a <main>), overflow clip instead of a horizontal
// scrollbar, a gentler configurable angle, an edge shadow and a shade that darkens the covered sheet.

import { useRef, type CSSProperties, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type StoryScrollProps = { label: string; angle?: number; children: ReactNode }

export function StoryScroll({ label, angle = 10, children }: StoryScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root || matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const sheets = gsap.utils.toArray<HTMLElement>('[data-sheet]', root)

      sheets.forEach((sheet, index) => {
        gsap.set(sheet, { zIndex: index + 1 })
        const inner = sheet.querySelector<HTMLElement>('[data-sheet-inner]')
        if (index > 0 && inner) {
          const covered = sheets[index - 1].querySelector<HTMLElement>('[data-sheet-shade]')
          const deal = gsap.timeline({
            scrollTrigger: { trigger: sheet, start: 'top bottom', end: 'top 25%', scrub: true },
          })
          deal.fromTo(inner, { rotation: angle }, { rotation: 0, ease: 'none' }, 0)
          if (covered) deal.fromTo(covered, { opacity: 0 }, { opacity: 1, ease: 'none' }, 0)
        }
        if (index < sheets.length - 1) {
          ScrollTrigger.create({
            trigger: sheet,
            start: 'bottom bottom',
            end: 'bottom top',
            pin: true,
            pinSpacing: false,
          })
        }
      })
    },
    { scope: ref, dependencies: [angle] },
  )

  return (
    <div ref={ref} role="group" aria-label={label} className="[overflow:clip]">
      {children}
    </div>
  )
}

type StorySheetProps = { label: string; className?: string; style?: CSSProperties; children: ReactNode }

export function StorySheet({ label, className = '', style, children }: StorySheetProps) {
  return (
    <section data-sheet="" aria-label={label} className="relative">
      <div
        data-sheet-inner=""
        style={style}
        className={`relative min-h-screen origin-bottom-left bg-paper text-ink shadow-[0_-30px_60px_-30px_rgb(0_0_0/0.5)] will-change-transform ${className}`}
      >
        {children}
        <div data-sheet-shade="" aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/35 opacity-0" />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify and commit**

Run: `npm run lint && npm run typecheck`
Expected: no errors.

```bash
git add src/components/motion/story-scroll.tsx
git commit -m "feat: adapt the story scroll component"
```

---

### Task 4: Studio content, sheets and chapter

**Files:**
- Create: `src/content/studio.ts`, `src/components/studio/product-sheet.tsx`, `src/components/studio/mehfil-invite.tsx`, `src/components/studio/studio-chapter.tsx`, `public/studio/rigseed.webp`, `public/studio/riggit.webp`
- Modify: `src/content/content.test.ts`, `src/app/page.tsx`

**Interfaces:**
- Consumes: `StoryScroll`, `StorySheet`, `paletteStyle`, `ProductSlug`, `Emphasis`.
- Produces: `studio { label; title; line; productsLabel; link; products: StudioProduct[] }`, `<StudioChapter />` with `id="studio"`.

- [ ] **Step 1: Write `src/content/studio.ts`**

```ts
import type { ProductSlug } from '@/styles/products'

export type StudioProduct = {
  slug: ProductSlug
  name: string
  kind: string
  pitch: string
  body: string
  stack: string[]
  status?: string
  links: Array<{ label: string; href: string }>
  image?: { src: string; alt: string }
}

export const studio = {
  label: '// The studio',
  title: 'VeraStack *Labs*',
  line: 'A small lab for software that respects the people using it. Three products so far, each with its own look and a reason to exist.',
  productsLabel: 'On the workbench',
  link: { label: 'VeraStack Labs on GitHub', href: 'https://github.com/verastack-labs' },
  products: [
    {
      slug: 'rigseed',
      name: 'rigseed',
      kind: 'Desktop app · qBittorrent client',
      pitch: 'Torrents, finally worth looking at.',
      body: 'A desktop client that brings its own daemon: install it, open it, add a torrent. Three layouts, eight accents, and every screen prints the API calls it makes.',
      stack: ['Tauri', 'React', 'Rust'],
      links: [
        { label: 'Website', href: 'https://verastack-labs.github.io/rigseed/' },
        { label: 'Source', href: 'https://github.com/verastack-labs/rigseed-app' },
      ],
      image: { src: '/studio/rigseed.webp', alt: 'The rigseed landing page, with the torrent list under the headline' },
    },
    {
      slug: 'riggit',
      name: 'Riggit',
      kind: 'Desktop app · GitHub timeline',
      pitch: 'Own your GitHub timeline.',
      body: 'Commit at any date and time. Backfill the week you worked offline, the project you imported late, the day you forgot to push.',
      stack: ['Tauri', 'React', 'Rust'],
      links: [{ label: 'Website', href: 'https://verastack-labs.github.io/riggit/' }],
      image: { src: '/studio/riggit.webp', alt: 'The Riggit landing page, with a filled-in contribution graph' },
    },
    {
      slug: 'mehfil',
      name: 'Mehfil',
      kind: 'Phone app · Group plans',
      pitch: 'Chai in ten? Everyone in.',
      body: 'A quick way to rally people for informal plans: a chai break, dinner in ten minutes, a cards outing. Phone first, installable, and deliberately loud.',
      stack: ['Next.js', 'Supabase', 'PWA'],
      status: 'In development',
      links: [],
    },
  ] satisfies StudioProduct[],
}
```

Register it in `src/content/content.test.ts` (`import * as studioContent from '@/content/studio'`, add `studio: studioContent` to `modules`).

- [ ] **Step 2: Generate the images**

Resize the 1440×900 landing captures to 1200×750 WebP (quality 80) into `public/studio/rigseed.webp` and `public/studio/riggit.webp` with sharp.

- [ ] **Step 3: Write `src/components/studio/mehfil-invite.tsx`**

```tsx
// An invite as Mehfil draws it: cream surfaces, ink borders, a hard offset shadow and saffron for the yes.
export function MehfilInvite() {
  return (
    <div aria-hidden="true" className="mx-auto w-full max-w-sm -rotate-2">
      <div className="rounded-xl border-[3px] border-ink bg-paper-2 p-5 shadow-[6px_6px_0_0_var(--ink)]">
        <div className="flex items-center justify-between">
          <span className="rounded-full border-[3px] border-ink bg-accent px-3 py-0.5 text-xs font-bold uppercase tracking-wide text-accent-ink">
            Live
          </span>
          <span className="font-mono text-xs text-ink-2">in 10 min</span>
        </div>
        <p className="mt-4 text-3xl font-black leading-none tracking-tight">Chai break</p>
        <p className="mt-1 text-sm font-semibold text-ink-2">Canteen, ground floor</p>
        <div className="mt-5 flex -space-x-2">
          {['A', 'R', 'S', 'K'].map((initial) => (
            <span
              key={initial}
              className="grid size-9 place-items-center rounded-full border-[3px] border-ink bg-paper text-sm font-bold"
            >
              {initial}
            </span>
          ))}
          <span className="grid size-9 place-items-center rounded-full border-[3px] border-ink bg-fill text-xs font-bold">
            +3
          </span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <span className="rounded-lg border-[3px] border-ink bg-fill py-2 text-center text-sm font-bold shadow-[3px_3px_0_0_var(--ink)]">
            I&apos;m in
          </span>
          <span className="rounded-lg border-[3px] border-ink bg-paper py-2 text-center text-sm font-bold">
            Can&apos;t today
          </span>
        </div>
      </div>
    </div>
  )
}
```

Add `--color-fill: var(--fill);` to the `@theme inline` block in `src/app/globals.css`, and `fill` to the site palettes in `src/styles/tokens.ts` (`light: '#E8A55A'`, `dark: '#E8A55A'`) plus `'fill'` in `TOKEN_NAMES`, so `bg-fill` exists everywhere.

- [ ] **Step 4: Write `src/components/studio/product-sheet.tsx`**

```tsx
import type { StudioProduct } from '@/content/studio'
import { MehfilInvite } from '@/components/studio/mehfil-invite'

export function ProductSheet({ product, index }: { product: StudioProduct; index: number }) {
  return (
    <div className="mx-auto grid min-h-screen max-w-[1320px] items-center gap-12 px-6 py-24 md:px-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
          {String(index + 1).padStart(2, '0')} / {product.kind}
        </p>
        <h3 className="mt-6 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] tracking-[-0.02em]">
          {product.name}
        </h3>
        <p className="mt-6 font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight text-accent">{product.pitch}</p>
        <p className="mt-5 max-w-[46ch] leading-relaxed text-ink-2">{product.body}</p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
          {product.stack.join(' · ')}
          {product.status ? ` · ${product.status}` : ''}
        </p>
        {product.links.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-3">
            {product.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-rule px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors hover:border-accent hover:text-accent"
                >
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        {product.image ? (
          <figure className="overflow-hidden rounded-lg border border-rule bg-paper-2 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)]">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export serves pre-sized WebP files */}
            <img
              src={product.image.src}
              alt={product.image.alt}
              width={1200}
              height={750}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </figure>
        ) : (
          <MehfilInvite />
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Write `src/components/studio/studio-chapter.tsx`**

```tsx
import { StoryScroll, StorySheet } from '@/components/motion/story-scroll'
import { ProductSheet } from '@/components/studio/product-sheet'
import { Emphasis } from '@/components/typography/emphasis'
import { studio } from '@/content/studio'
import { paletteStyle } from '@/styles/products'

export function StudioChapter() {
  return (
    <section id="studio" aria-labelledby="studio-title">
      <StoryScroll label="VeraStack Labs products">
        <StorySheet label="VeraStack Labs">
          <div className="mx-auto flex min-h-screen max-w-[1320px] flex-col justify-center px-6 py-24 md:px-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{studio.label}</p>
            <h2
              id="studio-title"
              className="mt-6 font-display text-[clamp(3.5rem,11vw,10rem)] leading-[0.88] tracking-[-0.03em]"
            >
              <Emphasis text={studio.title} />
            </h2>
            <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-ink-2">{studio.line}</p>
            <div className="mt-14 border-t border-ink pt-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{studio.productsLabel}</p>
              <ol className="mt-3 grid gap-2 sm:grid-cols-3">
                {studio.products.map((product, index) => (
                  <li key={product.slug} className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] text-muted">{String(index + 1).padStart(2, '0')}</span>
                    <span className="font-display text-3xl">{product.name}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </StorySheet>
        {studio.products.map((product, index) => (
          <StorySheet key={product.slug} label={product.name} style={paletteStyle(product.slug)}>
            <ProductSheet product={product} index={index} />
          </StorySheet>
        ))}
      </StoryScroll>
      <div className="border-y border-rule">
        <a
          href={studio.link.href}
          target="_blank"
          rel="noreferrer"
          className="group mx-auto flex max-w-[1320px] items-center justify-between px-6 py-10 md:px-10"
        >
          <span className="font-display text-[clamp(2rem,5vw,4rem)] leading-none tracking-[-0.02em]">
            {studio.link.label}
          </span>
          <span aria-hidden="true" className="text-3xl transition-transform group-hover:translate-x-2">
            →
          </span>
        </a>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Mount it after the work index in `src/app/page.tsx`**

- [ ] **Step 7: Verify in Chrome and at phone width**

Desktop: the intro sheet pins; rigseed slides up tilted about 10° from its bottom-left corner and settles flat while the intro darkens underneath; Riggit and Mehfil follow; after Mehfil the page scrolls on to the studio link. No horizontal scrollbar at any point. Each product sheet is fully in its palette (rigseed slate, Riggit green, Mehfil cream with the invite card). Phone width: same deal, with taller sheets pinning only once their bottom reaches the viewport. Reduced motion: plain stacked sections.

- [ ] **Step 8: Run all checks and commit**

Run: `npm test && npm run lint && npm run typecheck && npm run build`

```bash
git add src/content src/components/studio src/app public/studio src/styles src/app/globals.css
git commit -m "feat: add the VeraStack Labs chapter as the home page story scroll"
```

---

### Task 5: Phase PR

- [ ] Record in the spec (5.04) that Mehfil shows an invite mock until it has a public page and that the studio link points at GitHub until the studio site exists. Commit, push `feat/studio`, open the PR, wait for CI, merge, pull `main`.

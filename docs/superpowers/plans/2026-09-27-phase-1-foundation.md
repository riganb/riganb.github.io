# Phase 1: Cleanup and Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the legacy site with a clean Next.js 16 static-export foundation: design tokens, fonts, theme switching, a typed content model, the site nav, smooth scrolling, tests and CI, rendering a placeholder home page.

**Architecture:** A fresh App Router app in `src/`. Colour tokens live in one TypeScript module that both generates the CSS variables (injected in the root layout) and feeds a contrast unit test, so the palette cannot drift out of WCAG AA. All copy lives in `src/content/`, guarded by a test that bans em dashes and unbalanced `*emphasis*` markers. Lenis drives smooth scrolling and feeds GSAP ScrollTrigger so later pinned sections do not jitter.

**Tech Stack:** Next.js 16.3.6, React 19.2.8, TypeScript 5, Tailwind CSS 4, GSAP 3.15 with `@gsap/react`, Lenis 1.3, Vitest 5, ESLint 9 with `eslint-config-next`.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-09-27-portfolio-redesign-design.md`.
- `output: 'export'` static site for GitHub Pages; no server features.
- No hex colour literals in components; colours come from tokens only.
- No em dashes (U+2014) anywhere: copy, comments, docs, commit messages.
- No AI attribution in commits, PRs, branch names, comments or docs.
- Any text colour must reach 4.5:1 contrast on its background; non-text marks (live dot, focus ring) 3:1.
- `prefers-reduced-motion: reduce` disables smooth scrolling.
- Node 22 in CI.
- Work happens on branch `chore/foundation`; the phase ends with a PR merged into `main`.
- Until the redesign launches, CI deploys to GitHub Pages only on manual dispatch, so the old live site stays up.

## File map

| Path | Responsibility |
|---|---|
| `package.json`, `package-lock.json` | Dependencies and scripts |
| `next.config.ts` | Static export, trailing slashes |
| `eslint.config.mjs`, `postcss.config.mjs`, `tsconfig.json`, `vitest.config.mts` | Tooling |
| `src/lib/contrast.ts` | WCAG contrast maths |
| `src/styles/tokens.ts` | Palettes, contrast rules, CSS variable generation |
| `src/lib/theme.ts` | Theme resolution, toggle logic, no-flash script |
| `src/lib/emphasis.ts` | Splits `*word*` markers into segments |
| `src/content/site.ts` | Site-wide copy and links |
| `src/components/typography/emphasis.tsx` | Renders emphasis segments |
| `src/components/theme/theme-toggle.tsx` | Theme toggle button |
| `src/components/site-nav.tsx` | Pinned top nav |
| `src/components/smooth-scroll.tsx` | Lenis + ScrollTrigger wiring |
| `src/app/globals.css` | Tailwind import, theme mapping, base styles |
| `src/app/layout.tsx` | Fonts, tokens, theme script, nav, skip link |
| `src/app/page.tsx` | Placeholder home |
| `.github/workflows/nextjs.yml` | CI checks on PRs, manual deploy |

---

### Task 1: Replace the legacy app with a Next.js 16 scaffold

**Files:**
- Delete: `src/` (entire tree), `.eslintrc.json`, `.npmrc`, `tailwind.config.ts`, `next.config.mjs`, `package-lock.json`
- Create: `next.config.ts`, `eslint.config.mjs`, `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`
- Modify: `package.json`, `postcss.config.mjs`, `tsconfig.json`, `.gitignore`

**Interfaces:**
- Produces: scripts `dev`, `build`, `lint`, `typecheck`, `test`; path alias `@/*` to `src/*`; a building static export in `out/`.

- [ ] **Step 1: Remove the legacy app and obsolete config**

```bash
git rm -r -q src .eslintrc.json .npmrc tailwind.config.ts next.config.mjs package-lock.json
rm -rf node_modules .next out
```

- [ ] **Step 2: Write `package.json`**

```json
{
  "name": "riganb.github.io",
  "version": "2.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "eslint",
    "typecheck": "next typegen && tsc --noEmit",
    "test": "vitest run"
  },
  "dependencies": {
    "@gsap/react": "^2.1.2",
    "gsap": "^3.15.0",
    "lenis": "^1.3.26",
    "next": "16.3.6",
    "react": "19.2.8",
    "react-dom": "19.2.8"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.3.3",
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.3.6",
    "tailwindcss": "^4.3.3",
    "typescript": "^5",
    "vitest": "^5.0.2"
  }
}
```

- [ ] **Step 3: Write `next.config.ts`**

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig
```

`trailingSlash` makes routes export as `route/index.html`, which GitHub Pages serves without extra rules.

- [ ] **Step 4: Write `eslint.config.mjs`**

```js
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
])
```

- [ ] **Step 5: Write `postcss.config.mjs`**

```js
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
```

- [ ] **Step 6: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 7: Write `.gitignore`**

```gitignore
# dependencies
/node_modules
/.pnp
.pnp.*

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*

# env files
.env*

# typescript
*.tsbuildinfo
next-env.d.ts

# local tooling
.claude
.agents
.playwright
```

- [ ] **Step 8: Write a minimal `src/app/globals.css`**

```css
@import 'tailwindcss';
```

- [ ] **Step 9: Write a minimal `src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rigan Burnwal',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 10: Write a minimal `src/app/page.tsx`**

```tsx
export default function Home() {
  return <main id="main">I build software people keep using.</main>
}
```

- [ ] **Step 11: Install and verify the toolchain**

Run: `npm install`
Expected: completes with no `ERESOLVE` peer dependency errors.

Run: `npm run lint && npm run typecheck && npm run build`
Expected: lint and typecheck print no errors; build ends with a route table listing `/` as static (`○`).

Run: `grep -c "I build software" out/index.html`
Expected: `1`

`npm install` and `next dev` may create `AGENTS.md` and `CLAUDE.md` (`@AGENTS.md`). Next re-adds them on every dev run, so commit them.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "chore: replace legacy app with a Next.js 16 static export scaffold"
```

---

### Task 2: Test harness and WCAG contrast maths

**Files:**
- Create: `vitest.config.mts`, `src/lib/contrast.ts`
- Test: `src/lib/contrast.test.ts`

**Interfaces:**
- Produces: `parseHex(hex: string): { r: number; g: number; b: number }`, `relativeLuminance(hex: string): number`, `contrastRatio(a: string, b: string): number`.

- [ ] **Step 1: Write `vitest.config.mts`**

```ts
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
```

- [ ] **Step 2: Write the failing test `src/lib/contrast.test.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { contrastRatio, parseHex, relativeLuminance } from '@/lib/contrast'

describe('parseHex', () => {
  it('parses #RRGGBB in any case', () => {
    expect(parseHex('#F4f1eA')).toEqual({ r: 244, g: 241, b: 234 })
  })

  it('rejects anything that is not #RRGGBB', () => {
    expect(() => parseHex('red')).toThrow('Expected #RRGGBB')
    expect(() => parseHex('#FFF')).toThrow('Expected #RRGGBB')
  })
})

describe('relativeLuminance', () => {
  it('is 0 for black and 1 for white', () => {
    expect(relativeLuminance('#000000')).toBe(0)
    expect(relativeLuminance('#FFFFFF')).toBeCloseTo(1, 5)
  })
})

describe('contrastRatio', () => {
  it('is 21 for black on white', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 5)
  })

  it('is 1 for a colour on itself', () => {
    expect(contrastRatio('#B4532A', '#B4532A')).toBeCloseTo(1, 5)
  })

  it('is symmetric', () => {
    expect(contrastRatio('#16140F', '#F4F1EA')).toBeCloseTo(contrastRatio('#F4F1EA', '#16140F'), 10)
  })

  it('matches a known WCAG value', () => {
    expect(contrastRatio('#767676', '#FFFFFF')).toBeCloseTo(4.54, 2)
  })
})
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL, `Failed to resolve import "@/lib/contrast"`.

- [ ] **Step 4: Implement `src/lib/contrast.ts`**

```ts
export type Rgb = { r: number; g: number; b: number }

export function parseHex(hex: string): Rgb {
  const match = /^#([0-9a-f]{6})$/i.exec(hex)
  if (!match) throw new Error(`Expected #RRGGBB, got ${hex}`)
  const value = parseInt(match[1], 16)
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 }
}

function linearise(channel: number): number {
  const s = channel / 255
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}

export function relativeLuminance(hex: string): number {
  const { r, g, b } = parseHex(hex)
  return 0.2126 * linearise(r) + 0.7152 * linearise(g) + 0.0722 * linearise(b)
}

export function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a)
  const lb = relativeLuminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test`
Expected: PASS, 8 tests.

- [ ] **Step 6: Commit**

```bash
git add vitest.config.mts src/lib/contrast.ts src/lib/contrast.test.ts
git commit -m "test: add vitest and WCAG contrast maths"
```

---

### Task 3: Design tokens with enforced contrast

**Files:**
- Create: `src/styles/tokens.ts`
- Test: `src/styles/tokens.test.ts`
- Modify: `docs/superpowers/specs/2026-09-27-portfolio-redesign-design.md` (section 3.1)

**Interfaces:**
- Consumes: `contrastRatio` from Task 2.
- Produces: `TOKEN_NAMES`, `type TokenName`, `type ThemeName = 'light' | 'dark'`, `palettes: Record<ThemeName, Record<TokenName, string>>`, `CONTRAST_RULES: ContrastRule[]`, `tokensToCss(): string`.

- [ ] **Step 1: Write the failing test `src/styles/tokens.test.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { contrastRatio } from '@/lib/contrast'
import { CONTRAST_RULES, TOKEN_NAMES, palettes, tokensToCss, type ThemeName } from '@/styles/tokens'

const themes: ThemeName[] = ['light', 'dark']

describe('palettes', () => {
  it.each(themes)('%s defines every token', (theme) => {
    expect(Object.keys(palettes[theme]).sort()).toEqual([...TOKEN_NAMES].sort())
  })
})

describe('contrast rules', () => {
  const cases = themes.flatMap((theme) =>
    CONTRAST_RULES.map((rule) => ({ theme, ...rule })),
  )

  it.each(cases)('$theme: $fg on $bg reaches $min:1', ({ theme, fg, bg, min }) => {
    expect(contrastRatio(palettes[theme][fg], palettes[theme][bg])).toBeGreaterThanOrEqual(min)
  })
})

describe('tokensToCss', () => {
  const css = tokensToCss()

  it('declares light tokens on :root', () => {
    expect(css).toContain(':root{--paper:#F4F1EA;')
    expect(css).toContain('color-scheme:light;')
  })

  it('declares dark tokens for an explicit choice and for the system preference', () => {
    expect(css).toContain(':root[data-theme="dark"]{--paper:#15130F;')
    expect(css).toContain('@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--paper:#15130F;')
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/styles/tokens.test.ts`
Expected: FAIL, `Failed to resolve import "@/styles/tokens"`.

- [ ] **Step 3: Implement `src/styles/tokens.ts`**

```ts
export const TOKEN_NAMES = [
  'paper',
  'paper-2',
  'ink',
  'ink-2',
  'muted',
  'rule',
  'grid',
  'accent',
  'accent-ink',
  'live',
] as const

export type TokenName = (typeof TOKEN_NAMES)[number]
export type ThemeName = 'light' | 'dark'
export type Palette = Record<TokenName, string>

export const palettes: Record<ThemeName, Palette> = {
  light: {
    paper: '#F4F1EA',
    'paper-2': '#ECE7DC',
    ink: '#16140F',
    'ink-2': '#4A463E',
    muted: '#6D675D',
    rule: '#DCD5C6',
    grid: 'rgba(22, 20, 15, 0.05)',
    accent: '#A74D27',
    'accent-ink': '#F4F1EA',
    live: '#3F8F5A',
  },
  dark: {
    paper: '#15130F',
    'paper-2': '#1D1A15',
    ink: '#EDE6D6',
    'ink-2': '#A79F8E',
    muted: '#8D8575',
    rule: '#2E2A23',
    grid: 'rgba(237, 230, 214, 0.045)',
    accent: '#E8A55A',
    'accent-ink': '#15130F',
    live: '#6FBF86',
  },
}

export type ContrastRule = { fg: TokenName; bg: TokenName; min: number }

// Text needs 4.5:1 at any size we use; non-text marks need 3:1.
export const CONTRAST_RULES: ContrastRule[] = [
  { fg: 'ink', bg: 'paper', min: 4.5 },
  { fg: 'ink', bg: 'paper-2', min: 4.5 },
  { fg: 'ink-2', bg: 'paper', min: 4.5 },
  { fg: 'ink-2', bg: 'paper-2', min: 4.5 },
  { fg: 'muted', bg: 'paper', min: 4.5 },
  { fg: 'muted', bg: 'paper-2', min: 4.5 },
  { fg: 'accent', bg: 'paper', min: 4.5 },
  { fg: 'accent', bg: 'paper-2', min: 4.5 },
  { fg: 'accent-ink', bg: 'accent', min: 4.5 },
  { fg: 'live', bg: 'paper', min: 3 },
]

function declarations(theme: ThemeName): string {
  const palette = palettes[theme]
  const vars = TOKEN_NAMES.map((name) => `--${name}:${palette[name]};`).join('')
  return `${vars}color-scheme:${theme};`
}

export function tokensToCss(): string {
  return [
    `:root{${declarations('light')}}`,
    `:root[data-theme="dark"]{${declarations('dark')}}`,
    `@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){${declarations('dark')}}}`,
  ].join('')
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS. The 20 contrast cases all pass (lowest: light `muted` on `paper-2` at 4.54).

- [ ] **Step 5: Amend spec section 3.1 to match**

In `docs/superpowers/specs/2026-09-27-portfolio-redesign-design.md`, change the `--muted` light value `#7A7468` to `#6D675D`, change the `--accent` light value `#B4532A` to `#A74D27`, and add this row after `--accent-ink`:

```markdown
| `--live` (status dot) | `#3F8F5A` | `#6FBF86` |
```

Replace the sentence starting "Every token pair must pass WCAG AA contrast" with:

```markdown
Every text colour must reach 4.5:1 on the backgrounds it sits on, including small mono labels and
the accent (the 3:1 allowance only covers text 24px and up, which labels are not). Non-text marks
such as the live dot and focus rings need 3:1. `src/styles/tokens.test.ts` enforces this.
```

- [ ] **Step 6: Commit**

```bash
git add src/styles docs/superpowers/specs/2026-09-27-portfolio-redesign-design.md
git commit -m "feat: add design tokens with enforced WCAG contrast"
```

---

### Task 4: Content model and copy guards

**Files:**
- Create: `src/lib/emphasis.ts`, `src/content/site.ts`, `src/components/typography/emphasis.tsx`
- Test: `src/lib/emphasis.test.ts`, `src/content/content.test.ts`

**Interfaces:**
- Produces: `type Segment = { text: string; em: boolean }`, `splitEmphasis(input: string): Segment[]`, `type Copy = { text: string; honest?: string }`, `site` (shape below), `<Emphasis text={string} />`.

- [ ] **Step 1: Write the failing test `src/lib/emphasis.test.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { splitEmphasis } from '@/lib/emphasis'

describe('splitEmphasis', () => {
  it('returns one plain segment when there are no markers', () => {
    expect(splitEmphasis('Plain words.')).toEqual([{ text: 'Plain words.', em: false }])
  })

  it('marks the text between asterisks as emphasis', () => {
    expect(splitEmphasis('I build software people *keep* using.')).toEqual([
      { text: 'I build software people ', em: false },
      { text: 'keep', em: true },
      { text: ' using.', em: false },
    ])
  })

  it('handles emphasis at the start', () => {
    expect(splitEmphasis('*Hello* there')).toEqual([
      { text: 'Hello', em: true },
      { text: ' there', em: false },
    ])
  })

  it('throws on unbalanced markers', () => {
    expect(() => splitEmphasis('one *two three')).toThrow('Unbalanced emphasis')
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/lib/emphasis.test.ts`
Expected: FAIL, `Failed to resolve import "@/lib/emphasis"`.

- [ ] **Step 3: Implement `src/lib/emphasis.ts`**

```ts
export type Segment = { text: string; em: boolean }

// Copy marks emphasis with *asterisks*; odd-indexed parts are emphasised.
export function splitEmphasis(input: string): Segment[] {
  const parts = input.split('*')
  if (parts.length % 2 === 0) throw new Error(`Unbalanced emphasis markers in: ${input}`)
  return parts
    .map((text, index) => ({ text, em: index % 2 === 1 }))
    .filter((segment) => segment.text.length > 0)
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npm test -- src/lib/emphasis.test.ts`
Expected: PASS, 4 tests.

- [ ] **Step 5: Write `src/content/site.ts`**

```ts
export type Copy = { text: string; honest?: string }

export type NavLink = { label: string; href: string }
export type Social = { label: string; href: string; caption: string }

export const site = {
  name: 'Rigan Burnwal',
  url: 'https://riganb.github.io',
  title: 'Rigan Burnwal: founder and engineer',
  description:
    'Founder of VeraStack Labs. I build software people keep using, from desktop apps to revenue-critical web.',
  status: 'Building VeraStack Labs · Bangalore',
  email: 'therealriganb@gmail.com',
  resume: '/rigan_burnwal_resume_2026_v1.pdf',
  nav: [
    { label: 'Work', href: '/#work' },
    { label: 'Studio', href: '/#studio' },
    { label: 'Journey', href: '/#journey' },
    { label: 'Contact', href: '/#contact' },
  ] satisfies NavLink[],
  socials: [
    {
      label: 'GitHub',
      href: 'https://github.com/riganb',
      caption: 'Where the commits live, at every date and time.',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/rigan-burnwal/',
      caption: 'The version of me that wears a collar.',
    },
  ] satisfies Social[],
  hero: {
    label: 'Founder · Engineer · 2026',
    headline: {
      text: 'I build software people *keep* using.',
      honest: 'I build software, then rebuild it until people keep using it.',
    } satisfies Copy,
    lede: 'Founder of VeraStack Labs, where we make rigseed, Riggit and Mehfil. Before that, I shipped the X-47 configurator and a typed monorepo at Ultraviolette.',
  },
} as const
```

- [ ] **Step 6: Write the failing guard test `src/content/content.test.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { splitEmphasis } from '@/lib/emphasis'
import { site } from '@/content/site'

// Built from its code point so this file never contains the character itself.
const EM_DASH = String.fromCodePoint(0x2014)

// Add every content module here as it is created.
const modules: Record<string, unknown> = { site }

function collectStrings(value: unknown, path: string): Array<[string, string]> {
  if (typeof value === 'string') return [[path, value]]
  if (Array.isArray(value)) return value.flatMap((item, i) => collectStrings(item, `${path}[${i}]`))
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) => collectStrings(item, `${path}.${key}`))
  }
  return []
}

const strings = Object.entries(modules).flatMap(([name, value]) => collectStrings(value, name))

describe('content', () => {
  it('has strings to check', () => {
    expect(strings.length).toBeGreaterThan(10)
  })

  it.each(strings)('%s has no em dash', (_path, text) => {
    expect(text).not.toContain(EM_DASH)
  })

  it.each(strings)('%s has balanced emphasis markers', (_path, text) => {
    expect(() => splitEmphasis(text)).not.toThrow()
  })
})
```

- [ ] **Step 7: Run it**

Run: `npm test -- src/content/content.test.ts`
Expected: PASS. To confirm the guard bites, temporarily append `String.fromCodePoint(0x2014)` to `status`, rerun and see one failure naming `site.status`, then revert.

- [ ] **Step 8: Write `src/components/typography/emphasis.tsx`**

```tsx
import { splitEmphasis } from '@/lib/emphasis'

export function Emphasis({ text }: { text: string }) {
  return (
    <>
      {splitEmphasis(text).map((segment, index) =>
        segment.em ? (
          <em key={index} className="text-accent italic">
            {segment.text}
          </em>
        ) : (
          <span key={index}>{segment.text}</span>
        ),
      )}
    </>
  )
}
```

- [ ] **Step 9: Verify types and lint**

Run: `npm run lint && npm run typecheck`
Expected: no errors.

- [ ] **Step 10: Commit**

```bash
git add src/lib/emphasis.ts src/lib/emphasis.test.ts src/content src/components/typography
git commit -m "feat: add typed site content with em dash and emphasis guards"
```

---

### Task 5: Root layout, fonts, tokens and theme switching

**Files:**
- Create: `src/lib/theme.ts`, `src/components/theme/theme-toggle.tsx`
- Test: `src/lib/theme.test.ts`
- Modify: `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`

**Interfaces:**
- Consumes: `ThemeName`, `tokensToCss` (Task 3); `site`, `Emphasis` (Task 4).
- Produces: `THEME_STORAGE_KEY`, `resolveTheme(stored: string | null, prefersDark: boolean): ThemeName`, `nextTheme(current: ThemeName): ThemeName`, `themeScript: string`, `<ThemeToggle />`; Tailwind utilities `bg-paper`, `text-ink`, `text-ink-2`, `text-muted`, `text-accent`, `border-rule`, `bg-live`, `font-display`, `font-body`, `font-mono`.

- [ ] **Step 1: Write the failing test `src/lib/theme.test.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { THEME_STORAGE_KEY, nextTheme, resolveTheme, themeScript } from '@/lib/theme'

describe('resolveTheme', () => {
  it('prefers a stored choice', () => {
    expect(resolveTheme('dark', false)).toBe('dark')
    expect(resolveTheme('light', true)).toBe('light')
  })

  it('falls back to the system preference', () => {
    expect(resolveTheme(null, true)).toBe('dark')
    expect(resolveTheme(null, false)).toBe('light')
  })

  it('ignores garbage in storage', () => {
    expect(resolveTheme('purple', true)).toBe('dark')
  })
})

describe('nextTheme', () => {
  it('flips between light and dark', () => {
    expect(nextTheme('light')).toBe('dark')
    expect(nextTheme('dark')).toBe('light')
  })
})

describe('themeScript', () => {
  it('reads the storage key and only applies valid values', () => {
    expect(themeScript).toContain(`localStorage.getItem("${THEME_STORAGE_KEY}")`)
    expect(themeScript).toContain(`t==='light'||t==='dark'`)
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- src/lib/theme.test.ts`
Expected: FAIL, `Failed to resolve import "@/lib/theme"`.

- [ ] **Step 3: Implement `src/lib/theme.ts`**

```ts
import type { ThemeName } from '@/styles/tokens'

export const THEME_STORAGE_KEY = 'theme'

export function resolveTheme(stored: string | null, prefersDark: boolean): ThemeName {
  if (stored === 'light' || stored === 'dark') return stored
  return prefersDark ? 'dark' : 'light'
}

export function nextTheme(current: ThemeName): ThemeName {
  return current === 'dark' ? 'light' : 'dark'
}

// Runs before first paint so a stored choice never flashes the wrong theme.
// Without a stored choice, the CSS media query in tokensToCss() decides.
export const themeScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}})()`
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npm test -- src/lib/theme.test.ts`
Expected: PASS, 5 tests.

- [ ] **Step 5: Write `src/components/theme/theme-toggle.tsx`**

```tsx
'use client'

import { THEME_STORAGE_KEY, nextTheme, resolveTheme } from '@/lib/theme'

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const next = nextTheme(resolveTheme(root.dataset.theme ?? null, prefersDark))
    root.dataset.theme = next
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Storage can be unavailable (private mode); the choice then lasts for this page only.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      className="grid size-8 place-items-center rounded-full border border-rule text-ink transition-colors hover:border-ink"
    >
      <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4">
        <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" />
      </svg>
    </button>
  )
}
```

- [ ] **Step 6: Replace `src/app/globals.css`**

```css
@import 'tailwindcss';

@theme inline {
  --color-paper: var(--paper);
  --color-paper-2: var(--paper-2);
  --color-ink: var(--ink);
  --color-ink-2: var(--ink-2);
  --color-muted: var(--muted);
  --color-rule: var(--rule);
  --color-accent: var(--accent);
  --color-accent-ink: var(--accent-ink);
  --color-live: var(--live);

  --font-display: var(--font-instrument-serif), Georgia, serif;
  --font-body: var(--font-inter-tight), system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
}

@layer base {
  html {
    background: var(--paper);
    color: var(--ink);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  body {
    font-family: var(--font-body);
  }

  ::selection {
    background: var(--accent);
    color: var(--accent-ink);
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }
}
```

- [ ] **Step 7: Replace `src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Geist_Mono, Instrument_Serif, Inter_Tight } from 'next/font/google'
import { site } from '@/content/site'
import { themeScript } from '@/lib/theme'
import { tokensToCss } from '@/styles/tokens'
import './globals.css'

const display = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

const body = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
})

const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: tokensToCss() }} />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh bg-paper text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
```

`suppressHydrationWarning` is needed because the theme script sets `data-theme` on `<html>` before React hydrates.

- [ ] **Step 8: Replace `src/app/page.tsx` with the placeholder home**

```tsx
import { Emphasis } from '@/components/typography/emphasis'
import { site } from '@/content/site'

export default function Home() {
  return (
    <main id="main" className="mx-auto max-w-[1320px] px-6 pb-24 pt-40 md:px-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{site.hero.label}</p>
      <h1 className="mt-4 max-w-[14ch] font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.92] tracking-[-0.02em]">
        <Emphasis text={site.hero.headline.text} />
      </h1>
      <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-2">{site.hero.lede}</p>
    </main>
  )
}
```

- [ ] **Step 9: Verify in the browser**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: warm paper background, the serif headline with "keep" in italic terracotta, a mono label above, Inter Tight lede below. Set the OS to dark mode and reload: charcoal background, bone text, amber "keep". Press Tab once: a "Skip to content" link appears top left with a terracotta focus ring.

- [ ] **Step 10: Run all checks**

Run: `npm test && npm run lint && npm run typecheck && npm run build`
Expected: all pass; `grep -c "font-instrument-serif" out/index.html` prints a number of 1 or more.

- [ ] **Step 11: Commit**

```bash
git add src/lib/theme.ts src/lib/theme.test.ts src/components/theme src/app
git commit -m "feat: add root layout with fonts, tokens and no-flash theme switching"
```

---

### Task 6: Site nav and smooth scrolling

**Files:**
- Create: `src/components/site-nav.tsx`, `src/components/smooth-scroll.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `site` (Task 4), `ThemeToggle` (Task 5).
- Produces: `<SiteNav />` with `viewTransitionName: 'site-header'` (used by later view transitions), `<SmoothScroll />` which registers `ScrollTrigger` and feeds it Lenis scroll events.

- [ ] **Step 1: Write `src/components/site-nav.tsx`**

```tsx
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { site } from '@/content/site'

export function SiteNav() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur-sm"
      style={{ viewTransitionName: 'site-header' }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-6 py-4 md:px-10"
      >
        <Link href="/" className="text-sm font-semibold tracking-tight">
          {site.name}
        </Link>
        <p className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted md:flex">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-live" />
          {site.status}
        </p>
        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 font-mono text-[11px] uppercase tracking-[0.08em] sm:flex">
            {site.nav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-ink-2 transition-colors hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
```

The full-screen phone menu from spec section 5.00 is built in a later phase; on phones this phase shows the name and theme toggle only.

- [ ] **Step 2: Write `src/components/smooth-scroll.tsx`**

```tsx
'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll() {
  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true })
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ anchors: true })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return null
}
```

- [ ] **Step 3: Mount both in `src/app/layout.tsx`**

Add the imports below the existing `@/content/site` import:

```tsx
import { SiteNav } from '@/components/site-nav'
import { SmoothScroll } from '@/components/smooth-scroll'
```

Replace `{children}` inside `<body>` with:

```tsx
        <SmoothScroll />
        <SiteNav />
        {children}
```

- [ ] **Step 4: Verify in the browser**

Run: `npm run dev` and open `http://localhost:3000`. Temporarily add `<div className="h-[300vh]" />` after the lede in `page.tsx` to have something to scroll.
Expected:
- The nav stays pinned with a hairline under it and the paper showing through slightly blurred.
- "Building VeraStack Labs · Bangalore" with a green dot is centred at 768px and wider, and hidden below.
- Wheel scrolling glides (Lenis) instead of stepping.
- The theme toggle flips light and dark instantly, and the choice survives a reload.
- With OS reduced motion on, scrolling is native.
- Clicking "Work" jumps to `/#work` without errors in the console (the section does not exist yet).

Remove the temporary spacer.

- [ ] **Step 5: Run all checks**

Run: `npm test && npm run lint && npm run typecheck && npm run build`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add src/components/site-nav.tsx src/components/smooth-scroll.tsx src/app/layout.tsx
git commit -m "feat: add pinned site nav and Lenis smooth scrolling wired to ScrollTrigger"
```

---

### Task 7: CI, README and phase PR

**Files:**
- Modify: `.github/workflows/nextjs.yml`, `README.md`

**Interfaces:**
- Consumes: scripts from Task 1.

- [ ] **Step 1: Replace `.github/workflows/nextjs.yml`**

```yaml
name: Build and deploy

on:
  pull_request:
  push:
    branches: [main]
  # Deploys run only when triggered by hand until the redesign launches,
  # so the current live site stays up while phases merge into main.
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
      - uses: actions/cache@v4
        with:
          path: .next/cache
          key: ${{ runner.os }}-nextjs-${{ hashFiles('package-lock.json') }}-${{ hashFiles('src/**') }}
          restore-keys: ${{ runner.os }}-nextjs-${{ hashFiles('package-lock.json') }}-
      - run: npm run build
      - if: github.event_name == 'workflow_dispatch'
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    if: github.event_name == 'workflow_dispatch'
    needs: build
    runs-on: ubuntu-latest
    concurrency:
      group: pages
      cancel-in-progress: false
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v5
```

- [ ] **Step 2: Replace `README.md`**

```markdown
# riganb.github.io

The personal site of Rigan Burnwal, founder of VeraStack Labs.

Editorial by design: warm paper, a serif that means it, and a few interactions used with intent.
The design spec lives in `docs/superpowers/specs/`, implementation plans in `docs/superpowers/plans/`.

## Stack

Next.js 16 (static export) · React 19 · TypeScript · Tailwind CSS 4 · GSAP · Lenis

## Working on it

    npm install
    npm run dev

Checks, all run in CI on every pull request:

    npm run lint
    npm run typecheck
    npm test
    npm run build

`npm run build` writes the static site to `out/`.

## Where things live

- `src/content/`: every word on the site. Components never hold copy.
- `src/styles/tokens.ts`: the colour palette. A test fails if any text colour drops below WCAG AA.
- `src/components/`: UI, one responsibility per file.

## Deploying

GitHub Pages, via the "Build and deploy" workflow. During the redesign, deploys run only when the
workflow is started by hand from the Actions tab.
```

- [ ] **Step 3: Verify workflow syntax and a clean install**

Run: `rm -rf node_modules && npm ci && npm test && npm run lint && npm run typecheck && npm run build`
Expected: all pass from a clean install, matching what CI will run.

- [ ] **Step 4: Commit and push**

```bash
git add .github/workflows/nextjs.yml README.md
git commit -m "ci: check every PR, deploy by hand until launch; rewrite README"
git push -u origin chore/foundation
```

- [ ] **Step 5: Open the phase PR**

```bash
gh pr create --title "Phase 1: cleanup and foundation" --body "$(cat <<'EOF'
## What

Replaces the legacy site with the redesign foundation.

- Removed the old app, its dozen effect components, CDN icon stylesheets and obsolete config (`.npmrc` with `legacy-peer-deps`, `.eslintrc.json`, Tailwind 3 config).
- Next.js 16 static export with React 19, Tailwind 4, TypeScript and ESLint 9 flat config.
- Design tokens in one module, generating the CSS variables and checked by a WCAG contrast test. Light `--muted` and `--accent` darkened to reach 4.5:1 (spec amended).
- Instrument Serif, Inter Tight and Geist Mono via `next/font`.
- Light and dark themes following the OS, with a toggle that persists and never flashes.
- Typed content in `src/content/`, with a test that bans em dashes and unbalanced emphasis markers.
- Pinned nav, skip link, Lenis smooth scrolling wired to GSAP ScrollTrigger, reduced motion respected.
- CI runs lint, typecheck, tests and build on every PR. Deploys are manual until launch, so the current live site stays up.

## Verified

- `npm test`, `npm run lint`, `npm run typecheck`, `npm run build` pass from a clean install.
- Checked in the browser in light and dark, with keyboard focus and with reduced motion on.
EOF
)"
```

- [ ] **Step 6: Wait for CI, then merge**

Run: `gh pr checks --watch`
Expected: the `build` check passes; `deploy` is skipped.

```bash
gh pr merge --merge --delete-branch
git checkout main && git pull
```

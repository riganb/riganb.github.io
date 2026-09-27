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

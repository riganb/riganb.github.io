# Phase 6: Case Study Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `/work/cold-stone/`, `/work/e3-trion/` and `/work/ultraviolette/` (spec section 6), link them from the work index, and connect index and case study with a view transition that morphs the client name between them.

**Architecture:** All case study copy lives in `src/content/case-studies.ts` as typed data (`CaseStudy`, `Sheet`, `Media`, `Metric`). One dynamic route, `src/app/work/[slug]/page.tsx`, renders every study statically via `generateStaticParams` with `dynamicParams = false`. Each page has a header, a scroll-filled intro, one story scroll of three sheets (Before, Build, Result), highlights and a link to the next study. Missing screenshots render as a `MediaPlaceholder` on the blueprint grid, stating what will go there. React's `<ViewTransition>` gives the client name a shared name on both pages; `Link transitionTypes` adds directional slides, and the nav stays anchored.

**Tech Stack:** Next.js 16 App Router (static export), React 19 `ViewTransition`, GSAP story scroll from Phase 4, Vitest.

## Global Constraints

- Everything in earlier phases' Global Constraints still applies.
- Branch `feat/case-studies`; the phase ends with a PR merged into `main`.
- Exactly one story scroll per case study page.
- No invented numbers. Metrics come from the resume or the Cold Stone case study.
- Cold Stone: the new build is not public yet, so no capture of it is published; "Before" shows the old public site, "Build" uses a placeholder, and no page-weight claim is made.
- E3: the site is built in Framer; the stack line says "Framer · Razorpay" and nothing more. The configurator is no longer online, so its sheet uses a placeholder.
- Reduced motion: view transitions resolve instantly (CSS from the Next.js view transitions guide).

## Tasks

1. **Content and guard.** Write `src/content/case-studies.ts` with the three studies and register it in `src/content/content.test.ts`. Add `src/lib/case-studies.test.ts`: every `caseStudy: true` work item has a study with the same slug, every study's `next` slug exists, and every image `src` exists under `public/`.
2. **Route.** `src/app/work/[slug]/page.tsx` with `generateStaticParams`, `dynamicParams = false` and `generateMetadata`. Components under `src/components/case-study/`: `case-header.tsx`, `case-sheet.tsx`, `media.tsx` (image or placeholder), `metrics.tsx`, `highlights.tsx`, `next-case.tsx`.
3. **Index links and transitions.** Case-study rows in `WorkRow` get a stretched `Link` (`transitionTypes={['nav-forward']}`) and a `ViewTransition` named `case-<slug>` around the client name; the case header uses the same name. The back link uses `nav-back`. Page wrappers and CSS follow the Next.js guide, with `site-header` anchored and `::view-transition { pointer-events: none }`. Focus styles move to `:has(:focus-visible)` so the band shows when the link is focused.
4. **Verify.** Chrome: each study renders, the story scroll deals Before, Build and Result, placeholders read clearly, the client name morphs from the index row into the header, back returns to `/#work`. Build output contains `work/<slug>/index.html` for all three. Phone width: no overflow.
5. **Spec note and phase PR.**

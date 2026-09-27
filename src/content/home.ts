import type { Copy } from '@/content/site'

export type SpecRow = { label: string; value: string; honest: string }

export const hero = {
  label: 'Founder · Engineer · 2026',
  headline: {
    text: 'I build software people *keep* using.',
    honest: 'I build software, then rebuild it until people keep using it.',
  } satisfies Copy,
  lede: 'Founder of VeraStack Labs, where we make rigseed, Riggit and Mehfil. Before that, I shipped the X-47 configurator and a typed monorepo at Ultraviolette.',
}

export const specSheet = {
  label: '// Spec sheet',
  rows: [
    { label: 'Products shipped', value: '03', honest: 'and two more in a folder called later' },
    { label: 'Production PRs governed', value: '2,800+', honest: 'some of them were renames' },
    { label: 'Client launches', value: '07', honest: 'one of them is still loading' },
    { label: 'Spark Award', value: '2025', honest: 'for a week I would not recommend' },
  ] satisfies SpecRow[],
}

export const statement = {
  text: 'I care about the parts *nobody screenshots*: the migration that stops the next outage, the checkout that loads before the customer gives up, the CMS a marketing team can actually use.',
  honest:
    'I care about the parts nobody screenshots, mostly because I am the one who gets paged when they break.',
} satisfies Copy

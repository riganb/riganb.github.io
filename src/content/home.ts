import type { LinePair } from '@/lib/pairs'

export type SpecRow = LinePair & { value: string }

export const hero = {
  label: 'Founder · Engineer · 2026',
  headline: {
    lines: ['I build software', 'people *keep* using.'],
    honest: ['I rebuild software', 'until people use it.'],
  } satisfies LinePair,
  lede: 'Founder of VeraStack Labs, where we make Origan, rigseed, Riggit and Mehfil. Before that, I shipped the X-47 and Tesseract configurators and a typed monorepo at Ultraviolette.',
}

export const specSheet = {
  label: '// Spec sheet',
  rows: [
    { lines: ['Products shipped'], honest: ['Plus two in /later'], value: '04' },
    { lines: ['Production PRs'], honest: ['Some were renames'], value: '2,800+' },
    { lines: ['Client launches'], honest: ['One still loading'], value: '07' },
    { lines: ['Spark Award'], honest: ['One long week'], value: '2025' },
  ] satisfies SpecRow[],
}

export const statement = {
  lines: ['I care about the parts', '*nobody screenshots*.', 'Migrations. Checkouts.', 'A CMS people can use.'],
  honest: ['I care about the parts', 'nobody screenshots,', 'mostly because I get', 'paged when they break.'],
} satisfies LinePair

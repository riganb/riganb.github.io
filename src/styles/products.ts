import type { CSSProperties } from 'react'

export type ProductSlug = 'rigseed' | 'riggit' | 'mehfil'

type Key = 'paper' | 'paper-2' | 'ink' | 'ink-2' | 'muted' | 'rule' | 'accent' | 'accent-ink' | 'fill' | 'fill-ink'
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
    'fill-ink': '#0A0E15',
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
    'fill-ink': '#0B140F',
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
    'fill-ink': '#1C120B',
  },
}

export const PRODUCT_CONTRAST_RULES: Array<{ fg: Key; bg: Key; min: number }> = [
  { fg: 'ink', bg: 'paper', min: 4.5 },
  { fg: 'ink', bg: 'paper-2', min: 4.5 },
  { fg: 'ink-2', bg: 'paper', min: 4.5 },
  { fg: 'muted', bg: 'paper', min: 4.5 },
  { fg: 'accent', bg: 'paper', min: 4.5 },
  { fg: 'accent-ink', bg: 'accent', min: 4.5 },
  { fg: 'fill-ink', bg: 'fill', min: 4.5 },
]

export function paletteStyle(slug: ProductSlug): CSSProperties {
  const palette = productPalettes[slug]
  return Object.fromEntries(Object.entries(palette).map(([key, value]) => [`--${key}`, value])) as CSSProperties
}

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

  it('declares dark tokens only for an explicit choice, so light is the default', () => {
    expect(css).toContain(':root[data-theme="dark"]{--paper:#15130F;')
    expect(css).not.toContain('prefers-color-scheme')
  })
})

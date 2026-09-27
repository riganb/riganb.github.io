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

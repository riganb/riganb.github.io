import { describe, expect, it } from 'vitest'
import { dotRadius, luminance } from '@/lib/halftone'

describe('luminance', () => {
  it('is 0 for black and 1 for white', () => {
    expect(luminance(0, 0, 0)).toBe(0)
    expect(luminance(255, 255, 255)).toBeCloseTo(1, 5)
  })
})

describe('dotRadius', () => {
  it('draws the biggest dark dots on the darkest pixels', () => {
    expect(dotRadius(0, 10, true)).toBeCloseTo(6.2, 5)
    expect(dotRadius(1, 10, true)).toBe(0)
  })

  it('draws the biggest light dots on the brightest pixels', () => {
    expect(dotRadius(1, 10, false)).toBeCloseTo(6.2, 5)
    expect(dotRadius(0, 10, false)).toBe(0)
  })
})

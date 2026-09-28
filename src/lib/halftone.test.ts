import { describe, expect, it } from 'vitest'
import { dotRadius, gravityPull, luminance } from '@/lib/halftone'

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

describe('gravityPull', () => {
  const c = { x: 100, y: 100 }
  const dist = (p: { x: number; y: number }) => Math.hypot(p.x - c.x, p.y - c.y)

  it('leaves every dot in place without mass', () => {
    expect(gravityPull({ x: 130, y: 90 }, c, 50, 0)).toEqual({ x: 130, y: 90, scale: 1 })
  })

  it('pulls dots toward the centre along their own direction', () => {
    const p = gravityPull({ x: 140, y: 100 }, c, 50, 0.6)
    expect(p.y).toBeCloseTo(100, 5)
    expect(p.x).toBeLessThan(140)
    expect(p.x).toBeGreaterThan(100)
  })

  it('never pulls a dot past the centre, so order is kept', () => {
    const near = gravityPull({ x: 110, y: 100 }, c, 50, 0.6)
    const far = gravityPull({ x: 140, y: 100 }, c, 50, 0.6)
    expect(dist(near)).toBeLessThan(dist(far))
    expect(near.x).toBeGreaterThan(100)
  })

  it('pulls hardest near the well and fades with distance', () => {
    const pulled = (x: number) => x - 100 - dist(gravityPull({ x, y: 100 }, c, 50, 0.6))
    expect(pulled(600)).toBeLessThan(pulled(150))
    expect(pulled(1000)).toBeLessThan(2)
  })

  it('sinks dots near the well by shrinking them', () => {
    expect(gravityPull({ x: 105, y: 100 }, c, 50, 0.6).scale).toBeLessThan(0.8)
    expect(gravityPull({ x: 1000, y: 100 }, c, 50, 0.6).scale).toBeCloseTo(1, 2)
  })
})

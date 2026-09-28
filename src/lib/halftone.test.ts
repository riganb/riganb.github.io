import { describe, expect, it } from 'vitest'
import { dotRadius, lensPoint, luminance } from '@/lib/halftone'

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

describe('lensPoint', () => {
  const c = { x: 100, y: 100 }

  it('leaves every dot in place when there is no mass', () => {
    expect(lensPoint({ x: 130, y: 90 }, c, 0, 0)).toEqual({ x: 130, y: 90, scale: 1 })
  })

  it('pushes dots outward along their own direction, never inward', () => {
    const p = lensPoint({ x: 110, y: 100 }, c, 20, 0)
    expect(p.y).toBeCloseTo(100, 5)
    expect(p.x).toBeGreaterThan(110)
  })

  it('clears a hole: nothing lands inside the Einstein radius', () => {
    for (const d of [0.5, 5, 19, 40]) {
      const p = lensPoint({ x: 100 + d, y: 100 }, c, 20, 0)
      expect(Math.hypot(p.x - c.x, p.y - c.y)).toBeGreaterThanOrEqual(20)
    }
  })

  it('barely moves distant dots', () => {
    const p = lensPoint({ x: 600, y: 100 }, c, 20, 0)
    expect(p.x - 600).toBeLessThan(1)
    expect(p.scale).toBeCloseTo(1, 1)
  })

  it('stretches dots near the ring', () => {
    expect(lensPoint({ x: 105, y: 100 }, c, 20, 0).scale).toBeGreaterThan(1.3)
  })

  it('twists near dots more than far ones', () => {
    const angle = (p: { x: number; y: number }) => Math.atan2(p.y - c.y, p.x - c.x)
    const near = lensPoint({ x: 130, y: 100 }, c, 20, 0.5)
    const far = lensPoint({ x: 400, y: 100 }, c, 20, 0.5)
    expect(Math.abs(angle(near))).toBeGreaterThan(Math.abs(angle(far)))
  })
})

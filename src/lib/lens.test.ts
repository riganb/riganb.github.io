import { describe, expect, it } from 'vitest'
import { approach, coverRadius, lensClipPath } from '@/lib/lens'

describe('coverRadius', () => {
  it('reaches the farthest corner of the viewport', () => {
    expect(coverRadius({ x: 100, y: 700 }, 400, 800)).toBeCloseTo(Math.hypot(300, 700), 5)
  })

  it('is half the diagonal from the centre', () => {
    expect(coverRadius({ x: 200, y: 400 }, 400, 800)).toBeCloseTo(Math.hypot(200, 400), 5)
  })
})

describe('approach', () => {
  it('covers `rate` of the distance in one 60fps frame', () => {
    expect(approach(0, 100, 1000 / 60, 0.18)).toBeCloseTo(18, 5)
  })

  it('does not move when no time passes', () => {
    expect(approach(40, 100, 0)).toBe(40)
  })

  it('gets close to the target over a long gap without overshooting', () => {
    const value = approach(0, 100, 2000)
    expect(value).toBeGreaterThan(99)
    expect(value).toBeLessThanOrEqual(100)
  })
})

describe('lensClipPath', () => {
  it('positions the circle relative to the element', () => {
    expect(lensClipPath({ x: 150, y: 80 }, { left: 100, top: 50 }, 110)).toBe(
      'circle(110.0px at 50.0px 30.0px)',
    )
  })

  it('handles a pointer above and left of the element', () => {
    expect(lensClipPath({ x: 10, y: 5 }, { left: 100, top: 50 }, 6)).toBe(
      'circle(6.0px at -90.0px -45.0px)',
    )
  })
})

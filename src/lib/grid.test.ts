import { describe, expect, it } from 'vitest'
import { displace, warp } from '@/lib/grid'

describe('displace', () => {
  it('leaves points outside the radius alone', () => {
    expect(displace({ x: 300, y: 0 }, { x: 0, y: 0 }, 100, 10)).toEqual({ x: 300, y: 0 })
  })

  it('leaves the point under the cursor alone', () => {
    expect(displace({ x: 5, y: 5 }, { x: 5, y: 5 }, 100, 10)).toEqual({ x: 5, y: 5 })
  })

  it('pushes nearby points directly away from the cursor', () => {
    const moved = displace({ x: 50, y: 0 }, { x: 0, y: 0 }, 100, 10)
    expect(moved.y).toBe(0)
    expect(moved.x).toBeCloseTo(52.5, 5)
  })

  it('never moves a point further than the strength', () => {
    const moved = displace({ x: 1, y: 0 }, { x: 0, y: 0 }, 100, 10)
    expect(moved.x - 1).toBeLessThanOrEqual(10)
  })
})

describe('warp', () => {
  it('returns the point untouched with no bodies', () => {
    expect(warp({ x: 10, y: 20 }, [])).toEqual({ x: 10, y: 20 })
  })

  it('pulls toward a body with negative strength', () => {
    const p = warp({ x: 120, y: 100 }, [{ x: 100, y: 100, radius: 60, strength: -8 }])
    expect(p.x).toBeLessThan(120)
    expect(p.x).toBeGreaterThan(100)
  })

  it('adds up several bodies', () => {
    const one = warp({ x: 120, y: 100 }, [{ x: 100, y: 100, radius: 60, strength: -8 }])
    const two = warp({ x: 120, y: 100 }, [
      { x: 100, y: 100, radius: 60, strength: -8 },
      { x: 90, y: 100, radius: 60, strength: -8 },
    ])
    expect(two.x).toBeLessThan(one.x)
  })

  it('never pulls a point across its body', () => {
    const p = warp({ x: 103, y: 100 }, [{ x: 100, y: 100, radius: 60, strength: -20 }])
    expect(p.x).toBeGreaterThanOrEqual(100)
  })
})

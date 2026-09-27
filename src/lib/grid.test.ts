import { describe, expect, it } from 'vitest'
import { displace } from '@/lib/grid'

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

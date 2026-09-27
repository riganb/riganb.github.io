import { describe, expect, it } from 'vitest'
import { entryEdge, tiltFromVelocity } from '@/lib/hover'

describe('entryEdge', () => {
  it('is top when the pointer is in the upper half', () => {
    expect(entryEdge(110, { top: 100, height: 80 })).toBe('top')
  })

  it('is bottom when the pointer is in the lower half', () => {
    expect(entryEdge(175, { top: 100, height: 80 })).toBe('bottom')
  })

  it('treats the exact middle as top', () => {
    expect(entryEdge(140, { top: 100, height: 80 })).toBe('top')
  })
})

describe('tiltFromVelocity', () => {
  it('leans with horizontal movement', () => {
    expect(tiltFromVelocity(2)).toBeCloseTo(3, 5)
    expect(tiltFromVelocity(-2)).toBeCloseTo(-3, 5)
  })

  it('never exceeds the maximum', () => {
    expect(tiltFromVelocity(400)).toBe(8)
    expect(tiltFromVelocity(-400)).toBe(-8)
  })
})

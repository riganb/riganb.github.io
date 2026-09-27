import { describe, expect, it } from 'vitest'
import { magnetOffset } from '@/lib/magnet'

describe('magnetOffset', () => {
  it('does nothing outside the radius', () => {
    expect(magnetOffset({ x: 300, y: 0 }, { x: 0, y: 0 }, 100, 0.4)).toEqual({ x: 0, y: 0 })
  })

  it('pulls toward the pointer, less the further away it is', () => {
    expect(magnetOffset({ x: 50, y: 0 }, { x: 0, y: 0 }, 100, 0.4)).toEqual({ x: 10, y: 0 })
  })

  it('does not move when the pointer is dead centre', () => {
    expect(magnetOffset({ x: 0, y: 0 }, { x: 0, y: 0 }, 100, 0.4)).toEqual({ x: 0, y: 0 })
  })
})

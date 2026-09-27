import { describe, expect, it } from 'vitest'
import { toGlyphs } from '@/lib/odometer'

describe('toGlyphs', () => {
  it('numbers digits in order and keeps other characters static', () => {
    expect(toGlyphs('2,800+')).toEqual([
      { kind: 'digit', value: 2, order: 0 },
      { kind: 'static', char: ',' },
      { kind: 'digit', value: 8, order: 1 },
      { kind: 'digit', value: 0, order: 2 },
      { kind: 'digit', value: 0, order: 3 },
      { kind: 'static', char: '+' },
    ])
  })

  it('keeps leading zeros as digits', () => {
    expect(toGlyphs('03').map((g) => g.kind)).toEqual(['digit', 'digit'])
  })
})

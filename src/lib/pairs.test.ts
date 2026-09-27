import { describe, expect, it } from 'vitest'
import { isLinePair, pairProblems } from '@/lib/pairs'

describe('pairProblems', () => {
  it('accepts pairs with matching line counts and similar lengths', () => {
    expect(
      pairProblems({
        lines: ['I build software', 'people *keep* using.'],
        honest: ['I rebuild software', 'until people use it.'],
      }),
    ).toEqual([])
  })

  it('flags a different number of lines', () => {
    expect(pairProblems({ lines: ['one', 'two'], honest: ['one'] })).toEqual([
      '2 polished lines but 1 honest line',
    ])
  })

  it('flags a line whose honest twin is much longer', () => {
    expect(pairProblems({ lines: ['Spark Award'], honest: ['Worst week, best week'] })).toEqual([
      'line 1: honest is 191% of the polished length',
    ])
  })

  it('ignores emphasis markers when measuring', () => {
    expect(pairProblems({ lines: ['*keep* it'], honest: ['held it'] })).toEqual([])
  })
})

describe('isLinePair', () => {
  it('recognises objects with lines and honest arrays', () => {
    expect(isLinePair({ lines: ['a'], honest: ['b'], value: '03' })).toBe(true)
    expect(isLinePair({ text: 'a' })).toBe(false)
    expect(isLinePair('a')).toBe(false)
  })
})

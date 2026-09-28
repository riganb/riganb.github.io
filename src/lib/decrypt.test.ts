import { describe, expect, it } from 'vitest'
import { SCRAMBLE_CHARS, scrambleFrame } from '@/lib/decrypt'

const zero = () => 0

describe('scrambleFrame', () => {
  it('is fully scrambled at the start and keeps the length', () => {
    const frame = scrambleFrame('Selected work', 0, zero)
    expect(frame).toHaveLength('Selected work'.length)
    expect(frame).not.toContain('S')
  })

  it('is the real text at the end', () => {
    expect(scrambleFrame('Selected work', 1, zero)).toBe('Selected work')
  })

  it('resolves left to right', () => {
    expect(scrambleFrame('abcd', 0.5, zero).slice(0, 2)).toBe('ab')
    expect(scrambleFrame('abcd', 0.5, zero).slice(2)).not.toContain('c')
  })

  it('never scrambles spaces or punctuation, so word shapes hold', () => {
    const frame = scrambleFrame('// Spec sheet', 0, zero)
    expect(frame.slice(0, 3)).toBe('// ')
    expect(frame[7]).toBe(' ')
  })

  it('draws scrambled characters from the charset', () => {
    const frame = scrambleFrame('abc', 0, () => 0.999)
    for (const char of frame) expect(SCRAMBLE_CHARS).toContain(char)
  })
})

import { describe, expect, it } from 'vitest'
import { splitEmphasis } from '@/lib/emphasis'

describe('splitEmphasis', () => {
  it('returns one plain segment when there are no markers', () => {
    expect(splitEmphasis('Plain words.')).toEqual([{ text: 'Plain words.', em: false }])
  })

  it('marks the text between asterisks as emphasis', () => {
    expect(splitEmphasis('I build software people *keep* using.')).toEqual([
      { text: 'I build software people ', em: false },
      { text: 'keep', em: true },
      { text: ' using.', em: false },
    ])
  })

  it('handles emphasis at the start', () => {
    expect(splitEmphasis('*Hello* there')).toEqual([
      { text: 'Hello', em: true },
      { text: ' there', em: false },
    ])
  })

  it('throws on unbalanced markers', () => {
    expect(() => splitEmphasis('one *two three')).toThrow('Unbalanced emphasis')
  })
})

import { describe, expect, it } from 'vitest'
import { toWords } from '@/lib/words'

describe('toWords', () => {
  it('splits on whitespace', () => {
    expect(toWords('one two')).toEqual([
      { text: 'one', em: false, glue: false },
      { text: 'two', em: false, glue: false },
    ])
  })

  it('keeps emphasis per word', () => {
    expect(toWords('the *nobody screenshots* bit').map((w) => [w.text, w.em])).toEqual([
      ['the', false],
      ['nobody', true],
      ['screenshots', true],
      ['bit', false],
    ])
  })

  it('glues punctuation that directly follows an emphasised run', () => {
    const words = toWords('parts *nobody screenshots*: the')
    expect(words[3]).toEqual({ text: ':', em: false, glue: true })
    expect(words[4]).toEqual({ text: 'the', em: false, glue: false })
  })
})

import { describe, expect, it } from 'vitest'
import { isEmail, noteMailto, notePayload, noteProblems } from '@/lib/note'

const good = { name: 'Asha', email: 'asha@studio.in', message: 'Loved the portfolio. Want to talk about a configurator?' }

describe('isEmail', () => {
  it('accepts ordinary addresses and rejects the rest', () => {
    expect(isEmail('asha@studio.in')).toBe(true)
    expect(isEmail(' asha@studio.in ')).toBe(true)
    expect(isEmail('asha@studio')).toBe(false)
    expect(isEmail('asha studio.in')).toBe(false)
    expect(isEmail('')).toBe(false)
  })
})

describe('noteProblems', () => {
  it('has none for a complete note', () => {
    expect(noteProblems(good)).toEqual({})
  })

  it('flags a missing name, a bad email and an empty message', () => {
    expect(noteProblems({ name: ' ', email: 'nope', message: '' })).toEqual({
      name: true,
      email: true,
      message: true,
    })
  })
})

describe('notePayload', () => {
  it('builds the Web3Forms body with trimmed fields and a subject naming the sender', () => {
    const body = notePayload(' key ', { ...good, name: '  Asha ' }, 'Rigan Burnwal')
    expect(body).toMatchObject({
      access_key: 'key',
      subject: 'Portfolio note from Asha',
      from_name: 'Rigan Burnwal',
      name: 'Asha',
      email: 'asha@studio.in',
      message: good.message,
    })
  })
})

describe('noteMailto', () => {
  it('carries the message in an encoded mailto link as a fallback', () => {
    const href = noteMailto('me@example.com', good)
    expect(href.startsWith('mailto:me@example.com?')).toBe(true)
    expect(href).toContain(encodeURIComponent('Portfolio note from Asha'))
    expect(href).toContain(encodeURIComponent(good.message))
    expect(href).not.toContain(' ')
  })
})

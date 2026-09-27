import { describe, expect, it } from 'vitest'
import { splitEmphasis } from '@/lib/emphasis'
import { site } from '@/content/site'

// Built from its code point so this file never contains the character itself.
const EM_DASH = String.fromCodePoint(0x2014)

// Add every content module here as it is created.
const modules: Record<string, unknown> = { site }

function collectStrings(value: unknown, path: string): Array<[string, string]> {
  if (typeof value === 'string') return [[path, value]]
  if (Array.isArray(value)) return value.flatMap((item, i) => collectStrings(item, `${path}[${i}]`))
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) => collectStrings(item, `${path}.${key}`))
  }
  return []
}

const strings = Object.entries(modules).flatMap(([name, value]) => collectStrings(value, name))

describe('content', () => {
  it('has strings to check', () => {
    expect(strings.length).toBeGreaterThan(10)
  })

  it.each(strings)('%s has no em dash', (_path, text) => {
    expect(text).not.toContain(EM_DASH)
  })

  it.each(strings)('%s has balanced emphasis markers', (_path, text) => {
    expect(() => splitEmphasis(text)).not.toThrow()
  })
})

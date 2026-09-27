import { describe, expect, it } from 'vitest'
import { splitEmphasis } from '@/lib/emphasis'
import { isLinePair, pairProblems, type LinePair } from '@/lib/pairs'
import { site } from '@/content/site'
import * as home from '@/content/home'
import * as workContent from '@/content/work'
import * as studioContent from '@/content/studio'
import * as about from '@/content/about'
import * as cases from '@/content/case-studies'

// Built from its code point so this file never contains the character itself.
const EM_DASH = String.fromCodePoint(0x2014)

// Add every content module here as it is created.
const modules: Record<string, unknown> = { site, home, work: workContent, studio: studioContent, about, cases }

function collectStrings(value: unknown, path: string): Array<[string, string]> {
  if (typeof value === 'string') return [[path, value]]
  if (Array.isArray(value)) return value.flatMap((item, i) => collectStrings(item, `${path}[${i}]`))
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) => collectStrings(item, `${path}.${key}`))
  }
  return []
}

function collectPairs(value: unknown, path: string): Array<[string, LinePair]> {
  if (isLinePair(value)) return [[path, value]]
  if (Array.isArray(value)) return value.flatMap((item, i) => collectPairs(item, `${path}[${i}]`))
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) => collectPairs(item, `${path}.${key}`))
  }
  return []
}

const strings = Object.entries(modules).flatMap(([name, value]) => collectStrings(value, name))
const pairs = Object.entries(modules).flatMap(([name, value]) => collectPairs(value, name))

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

  it('has honest pairs to check', () => {
    expect(pairs.length).toBeGreaterThan(0)
  })

  it.each(pairs)('%s pairs polished and honest copy line for line', (_path, pair) => {
    expect(pairProblems(pair)).toEqual([])
  })
})

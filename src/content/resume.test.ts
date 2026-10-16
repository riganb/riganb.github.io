import { describe, expect, it } from 'vitest'
import { resume } from '@/content/resume'
import { site } from '@/content/site'

function allStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap(allStrings)
  if (value && typeof value === 'object') return Object.values(value).flatMap(allStrings)
  return []
}

describe('resume', () => {
  it('leads with the bookings figure', () => {
    expect(resume.facts[0].value).toBe('70,000+')
  })

  it('points every fact at a role on the page', () => {
    const ids = resume.roles.map((role) => role.id)
    for (const fact of resume.facts) expect(ids).toContain(fact.target)
  })

  it('backs the bookings with four press links', () => {
    expect(resume.press).toHaveLength(4)
    for (const link of resume.press) expect(link.href).toMatch(/^https:\/\//)
  })

  it('never claims sales or a client launch count', () => {
    for (const text of allStrings(resume)) {
      expect(text.toLowerCase()).not.toContain('sold')
      expect(text.toLowerCase()).not.toContain('client launches')
    }
  })

  it('books calls on WhatsApp for now', () => {
    expect(site.call.href.startsWith('https://wa.me/919380654730')).toBe(true)
  })
})

describe('resume extras', () => {
  it('names the stack for keyword matching', () => {
    const skills = resume.skills.flatMap((group) => group.items)
    for (const skill of ['TypeScript', 'React', 'Next.js', 'AWS Lambda', 'Rust']) expect(skills).toContain(skill)
  })

  it('lists selected builds with a number where one exists', () => {
    expect(resume.builds).toHaveLength(4)
    expect(resume.builds[0]).toContain('18.8 MB')
  })
})

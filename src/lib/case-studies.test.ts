import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { caseStudies, draftCaseStudies } from '@/content/case-studies'
import { work } from '@/content/work'

const slugs = caseStudies.map((study) => study.slug)

describe('case studies', () => {
  it('has a study for every work row marked as a case study', () => {
    const expected = work.items.filter((item) => item.caseStudy).map((item) => item.slug)
    expect([...slugs].sort()).toEqual([...expected].sort())
  })

  it.each(caseStudies)('$slug points its next link at a real study', (study) => {
    expect(slugs).toContain(study.next)
    expect(study.next).not.toBe(study.slug)
  })

  it.each(caseStudies)('$slug has exactly three sheets', (study) => {
    expect(study.sheets).toHaveLength(3)
  })

  it('keeps drafts off the index', () => {
    for (const draft of draftCaseStudies) {
      expect(slugs).not.toContain(draft.slug)
      expect(work.items.find((item) => item.slug === draft.slug)?.caseStudy).toBeFalsy()
    }
  })

  const images = [...caseStudies, ...draftCaseStudies].flatMap((study) =>
    study.sheets.flatMap((sheet) => (sheet.media?.kind === 'image' ? [[study.slug, sheet.media.src] as const] : [])),
  )

  it.each(images)('%s image %s exists in public/', (_slug, src) => {
    expect(existsSync(join(process.cwd(), 'public', src))).toBe(true)
  })
})

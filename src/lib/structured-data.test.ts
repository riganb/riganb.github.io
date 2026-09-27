import { describe, expect, it } from 'vitest'
import { caseStudies } from '@/content/case-studies'
import { site } from '@/content/site'
import { caseStudyGraph, homeGraph, jsonLd, llmsText, sitemapEntries } from '@/lib/structured-data'

describe('homeGraph', () => {
  const graph = homeGraph()['@graph'] as Array<Record<string, unknown>>

  it('describes the person, the site and the profile page', () => {
    expect(graph.map((node) => node['@type'])).toEqual(['Person', 'Organization', 'WebSite', 'ProfilePage'])
  })

  it('links the person to their profiles and the studio they founded', () => {
    const person = graph[0]
    expect(person.sameAs).toEqual(site.socials.map((social) => social.href))
    expect(person.worksFor).toEqual({ '@id': `${site.url}/#verastack` })
  })
})

describe('caseStudyGraph', () => {
  it.each(caseStudies.map((study) => [study.slug, study] as const))('%s is an article with breadcrumbs', (slug, study) => {
    const graph = caseStudyGraph(study)['@graph'] as Array<Record<string, unknown>>
    const article = graph.find((node) => node['@type'] === 'Article')
    expect(article?.url).toBe(`${site.url}/work/${slug}/`)
    expect(article?.headline).not.toContain('*')
    expect(graph.some((node) => node['@type'] === 'BreadcrumbList')).toBe(true)
  })
})

describe('jsonLd', () => {
  it('escapes a closing script tag so the payload cannot break out', () => {
    expect(jsonLd({ a: '</script><script>' })).not.toContain('</script>')
  })
})

describe('sitemapEntries', () => {
  it('lists home and every case study with trailing slashes', () => {
    const urls = sitemapEntries().map((entry) => entry.url)
    expect(urls[0]).toBe(`${site.url}/`)
    expect(urls).toHaveLength(caseStudies.length + 1)
    expect(urls.every((url) => url.endsWith('/'))).toBe(true)
  })
})

describe('llmsText', () => {
  it('opens with an H1 and a summary, and links every case study', () => {
    const text = llmsText()
    expect(text.startsWith(`# ${site.name}\n\n> `)).toBe(true)
    for (const study of caseStudies) expect(text).toContain(`${site.url}/work/${study.slug}/`)
    expect(text).not.toContain('*')
  })
})

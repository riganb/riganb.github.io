import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { services, type ServiceProof } from '@/content/services'
import { caseStudies } from '@/content/case-studies'
import { faq } from '@/content/faq'
import { site } from '@/content/site'
import { caseSearchTitle, caseStudyGraph, homeGraph, jsonLd, llmsText, resumeSearchTitle, sitemapEntries } from '@/lib/structured-data'

describe('homeGraph', () => {
  const graph = homeGraph()['@graph'] as Array<Record<string, unknown>>

  it('describes the person, the site and the profile page', () => {
    expect(graph.map((node) => node['@type'])).toEqual(['Person', 'Organization', 'WebSite', 'ProfilePage', 'FAQPage'])
  })

  it('links the person to their profiles and the studio they founded', () => {
    const person = graph[0]
    expect(person.sameAs).toEqual([...site.socials.map((social) => social.href), 'https://verastack.dev/founder/'])
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

describe('caseSearchTitle', () => {
  it.each(caseStudies.map((study) => [study.slug, study] as const))('%s stays within 65 characters', (_slug, study) => {
    expect(caseSearchTitle(study).length).toBeLessThanOrEqual(65)
  })
})

describe('jsonLd', () => {
  it('escapes a closing script tag so the payload cannot break out', () => {
    expect(jsonLd({ a: '</script><script>' })).not.toContain('</script>')
  })
})

describe('sitemapEntries', () => {
  it('lists home, every case study and the resume with trailing slashes', () => {
    const urls = sitemapEntries().map((entry) => entry.url)
    expect(urls[0]).toBe(`${site.url}/`)
    expect(urls).toHaveLength(caseStudies.length + 2)
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

describe('services', () => {
  it('lists every service in llms.txt, with the coaching offer and the studio hand-off', () => {
    const text = llmsText()
    expect(text).toContain('## Services')
    for (const service of services.items) expect(text).toContain(service.name)
    expect(text).toContain('Free 15-minute sessions')
    expect(text).toContain(services.cta.href)
  })

  it('offers coaching as the person and the rest as the studio', () => {
    const graph = homeGraph()['@graph'] as Array<Record<string, unknown>>
    const offers = (node: Record<string, unknown>) =>
      (node.makesOffer as Array<{ itemOffered: { name: string } }>).map((offer) => offer.itemOffered.name)
    expect(offers(graph[0])).toEqual(['Coaching & counselling'])
    expect(offers(graph[1])).toContain('Product videos')
    expect(offers(graph[1])).not.toContain('Coaching & counselling')
  })

  it('points every proof link at a real case study, a file or a studio post', () => {
    const slugs = caseStudies.map((study) => `/work/${study.slug}/`)
    for (const service of services.items)
      for (const proof of service.proof as ServiceProof[])
        if (proof.href && !proof.href.startsWith('https://verastack.dev/blog/')) expect([...slugs, '/llms.txt']).toContain(proof.href)
  })

  it('ships every film, poster and caption file it shows', () => {
    for (const film of services.films)
      for (const file of [film.src, film.poster, film.captions])
        expect(existsSync(join(process.cwd(), 'public', file))).toBe(true)
  })
})

describe('resume discovery', () => {
  it('lists the resume in the sitemap', () => {
    expect(sitemapEntries().map((entry) => entry.url)).toContain(`${site.url}/resume/`)
  })

  it('gives answer engines the resume and its headline number', () => {
    expect(llmsText()).toContain(`${site.url}/resume/`)
    expect(llmsText()).toContain('70,000+')
  })

  it('keeps the resume search title within 65 characters', () => {
    expect(resumeSearchTitle().length).toBeLessThanOrEqual(65)
  })
})

describe('FAQ markup', () => {
  it('marks up every visible question as FAQPage', () => {
    const graph = homeGraph()['@graph'] as Array<Record<string, unknown>>
    const page = graph.find((node) => node['@type'] === 'FAQPage') as { mainEntity: Array<{ name: string }> }
    expect(page.mainEntity.map((q) => q.name)).toEqual(faq.items.map((item) => item.q))
  })

  it('gives the studio a logo', () => {
    const graph = homeGraph()['@graph'] as Array<Record<string, unknown>>
    expect(graph.find((node) => node['@type'] === 'Organization')?.logo).toMatch(/^https:\/\//)
  })
})

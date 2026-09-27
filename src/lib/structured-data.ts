import { journey, sideProjects, toolbox } from '@/content/about'
import { caseStudies, type CaseStudy } from '@/content/case-studies'
import { hero } from '@/content/home'
import { site } from '@/content/site'
import { studio } from '@/content/studio'
import { work } from '@/content/work'

type Node = Record<string, unknown>

const plain = (text: string) => text.replaceAll('*', '')
const caseUrl = (slug: string) => `${site.url}/work/${slug}/`
const ids = {
  person: `${site.url}/#person`,
  studio: `${site.url}/#verastack`,
  website: `${site.url}/#website`,
}

function person(): Node {
  return {
    '@type': 'Person',
    '@id': ids.person,
    name: site.name,
    url: `${site.url}/`,
    image: `${site.url}/portrait.webp`,
    jobTitle: 'Founder and software engineer',
    description: site.description,
    email: `mailto:${site.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressCountry: 'IN' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'JSS Academy of Technical Education, Bangalore' },
    award: 'Spark Award, Ultraviolette Automotive, 2025',
    knowsAbout: toolbox.columns.flatMap((column) => column.items),
    worksFor: { '@id': ids.studio },
    sameAs: site.socials.map((social) => social.href),
  }
}

function organization(): Node {
  return {
    '@type': 'Organization',
    '@id': ids.studio,
    name: 'VeraStack Labs',
    url: studio.link.href,
    description: studio.line,
    founder: { '@id': ids.person },
    makesOffer: studio.products.map((product) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'SoftwareApplication',
        name: product.name,
        applicationCategory: product.kind,
        description: product.body,
      },
    })),
  }
}

export function homeGraph(): Node {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      person(),
      organization(),
      { '@type': 'WebSite', '@id': ids.website, url: `${site.url}/`, name: site.name, author: { '@id': ids.person } },
      {
        '@type': 'ProfilePage',
        url: `${site.url}/`,
        name: site.title,
        isPartOf: { '@id': ids.website },
        mainEntity: { '@id': ids.person },
      },
    ],
  }
}

export function caseStudyGraph(study: CaseStudy): Node {
  const url = caseUrl(study.slug)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        url,
        mainEntityOfPage: url,
        headline: `${study.client}: ${plain(study.title)}`,
        description: study.intro.join(' '),
        datePublished: `${study.year}-01-01`,
        author: { '@type': 'Person', '@id': ids.person, name: site.name, url: `${site.url}/` },
        about: { '@type': 'Organization', name: study.client },
        keywords: study.stack.join(', '),
        articleBody: study.sheets.flatMap((sheet) => [sheet.title, ...sheet.body]).join(' '),
        isPartOf: { '@id': ids.website },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: site.name, item: `${site.url}/` },
          { '@type': 'ListItem', position: 2, name: 'Selected work', item: `${site.url}/#work` },
          { '@type': 'ListItem', position: 3, name: study.client, item: url },
        ],
      },
    ],
  }
}

// JSON for a <script type="application/ld+json">. Escaping "<" keeps any "</script>" in the
// content from ending the tag early.
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replaceAll('<', '\\u003c')
}

export function sitemapEntries(): Array<{ url: string; priority: number }> {
  return [
    { url: `${site.url}/`, priority: 1 },
    ...caseStudies.map((study) => ({ url: caseUrl(study.slug), priority: 0.8 })),
  ]
}

// llms.txt: a plain markdown summary for answer engines and language model crawlers
// (https://llmstxt.org). Built from the same content modules as the pages, so it never drifts.
export function llmsText(): string {
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    plain(hero.lede),
    '',
    `Based in Bangalore, India. Contact: ${site.email}.`,
    '',
    '## Case studies',
    '',
    ...caseStudies.map(
      (study) =>
        `- [${study.client}: ${plain(study.title)}](${caseUrl(study.slug)}): ${study.year}, ${study.role}. ${study.intro.join(' ')}`,
    ),
    '',
    '## Selected work',
    '',
    ...work.items.map((item) => `- ${item.client} (${item.year}, ${item.discipline}): ${item.note}`),
    '',
    '## VeraStack Labs',
    '',
    `${studio.line} ${studio.link.href}`,
    '',
    ...studio.products.map((product) => `- ${product.name} (${product.kind}): ${product.pitch} ${product.body}`),
    '',
    '## Side projects',
    '',
    ...sideProjects.items.map(
      (project) => `- ${project.name} (${project.kind}): ${project.body} ${project.links.map((link) => link.href).join(' ')}`,
    ),
    '',
    '## Journey',
    '',
    ...journey.rows.map((row) => `- ${row.when}: ${row.what}. ${row.detail}`),
    '',
    '## Skills',
    '',
    ...toolbox.columns.map((column) => `- ${column.title}: ${column.items.join(', ')}`),
    '',
    '## Profiles',
    '',
    ...site.socials.map((social) => `- ${social.label}: ${social.href}`),
    '',
  ]
  return plain(lines.join('\n'))
}

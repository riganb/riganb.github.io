import type { LinePair } from '@/lib/pairs'
import { site } from '@/content/site'

const linkedin = site.socials.find((social) => social.label === 'LinkedIn')?.href ?? 'https://www.linkedin.com/in/rigan-burnwal/'

export type ServiceProof = { text: string; href?: string }

export type Service = {
  id: string
  name: string
  blurb: string
  proof: ServiceProof[]
  /** Coaching is one-to-one with Rigan, so it carries its own offer and call to action. */
  offer?: { line: string; cta: { label: string; href: string } }
  /** Free courses that back the coaching: shown as a small shelf of links under the row. */
  courses?: Shelf
  /** Shows the film reel under the row. */
  films?: boolean
}

export type Course = { name: string; topic: string; detail: string; href: string }
export type Shelf = { label: string; href: string; note: string; items: Course[] }

export type Film = {
  id: string
  title: string
  length: string
  src: string
  poster: string
  captions: string
  note?: string
}

// Mirrors the VeraStack Labs services (verastack.dev), copied rather than imported so the two
// repos stay independent. Coaching comes first and is the one offer that is Rigan's own.
export const services = {
  label: '// Services',
  heading: {
    lines: ['Things I *take on*', 'for other people.'],
    honest: ['Things I say yes to', 'and then overbuild.'],
  } satisfies LinePair,
  note: 'Coaching is one-to-one with me. Everything else runs through VeraStack Labs, the studio I founded.',
  items: [
    {
      id: 'coaching',
      name: 'Coaching & counselling',
      blurb:
        'One-to-one sessions for developers and students: getting better at building, reaching out to the right people, and focused prep for interviews and placements.',
      proof: [{ text: 'Founder of Origan, a four-year prep programme for colleges' }],
      offer: {
        line: 'Free 15-minute sessions',
        cta: { label: 'Message me on LinkedIn', href: linkedin },
      },
      // Origan's free courses (VeraStack Labs work). Free, no sign-up.
      courses: {
        label: "Free courses on Origan's Open Shelf",
        href: 'https://origan.verastack.dev/resources/',
        note: '46 lessons, all free with no sign-up. Every code sample compiles and passes tests in CI before a lesson goes live.',
        items: [
          {
            name: 'Oxidise',
            topic: 'DSA in Rust',
            detail: '20 lessons, from Vec and union-find to dynamic programming.',
            href: 'https://origan.verastack.dev/learn/rust-dsa/',
          },
          {
            name: 'Filter Coffee',
            topic: 'Java Collections',
            detail: '13 lessons, from ArrayList to choosing the right collection.',
            href: 'https://origan.verastack.dev/learn/java-collections/',
          },
          {
            name: 'The Switch',
            topic: 'JavaScript to TypeScript',
            detail: '13 lessons with a type-stripping toggle and a narrowing stepper, ending in a printable cheat sheet.',
            href: 'https://origan.verastack.dev/learn/js-to-ts/',
          },
        ],
      },
    },
    {
      id: 'experiences',
      name: 'Web experiences & 3D',
      blurb: 'Distinctive, motion-rich sites and 3D on the web: configurators, product stories, interactive pieces.',
      proof: [
        { text: 'Ultraviolette: 70,000+ bookings', href: '/work/ultraviolette/' },
        { text: 'E3 TRION', href: '/work/e3-trion/' },
      ],
    },
    {
      id: 'web-apps',
      name: 'Web apps & CMS',
      blurb: 'Custom CMS, bookings, payments, dashboards and the internal tools behind a business.',
      proof: [
        { text: 'Cold Stone Creamery Arabia CMS' },
        { text: 'TRION pre-booking', href: '/work/e3-trion/' },
        { text: 'Suggaa · Maven' },
      ],
    },
    {
      id: 'sites',
      name: 'Websites & launches',
      blurb: 'Marketing sites, rebuilds and launch pages, in code or in Framer and Webflow when your team wants to edit it themselves.',
      proof: [{ text: 'E3 TRION launch', href: '/work/e3-trion/' }, { text: 'PixelStack Studio' }],
    },
    {
      id: 'search',
      name: 'AI search & SEO',
      blurb:
        "Get named when people ask ChatGPT, Perplexity or Google's AI answers: structured data, llms.txt and pages written to be quoted, on solid SEO foundations.",
      proof: [
        { text: 'This site · structured data and llms.txt', href: '/llms.txt' },
        { text: 'Study: 96 Indian D2C sites', href: 'https://verastack.dev/blog/ai-search-indian-d2c-brands/' },
        { text: 'Study: 26 SaaS homepages', href: 'https://verastack.dev/blog/ai-search-saas-homepages/' },
      ],
    },
    {
      id: 'videos',
      name: 'Product videos',
      blurb:
        'Launch films, explainers and ad cuts for SaaS products and startups. Fast to make and priced to test: ship a few versions, keep the one that works.',
      proof: [{ text: 'rigseed launch film' }, { text: 'Origan explainer' }, { text: 'Bruno launch film' }],
      films: true,
    },
    {
      id: 'apps',
      name: 'Desktop & mobile apps',
      blurb: 'Small, fast apps for desktop and Android, from internal tools to our own products.',
      proof: [{ text: 'rigseed · Riggit' }, { text: 'Pee Empro attendance app' }],
    },
  ] satisfies Service[],
  films: [
    {
      id: 'rigseed',
      title: 'rigseed launch film',
      length: '0:51',
      src: '/videos/rigseed.mp4',
      poster: '/videos/rigseed-poster.jpg',
      captions: '/videos/rigseed.vtt',
    },
    {
      id: 'origan',
      title: 'Origan explainer',
      length: '1:22',
      src: '/videos/origan.mp4',
      poster: '/videos/origan-poster.jpg',
      captions: '/videos/origan.vtt',
    },
    {
      id: 'bruno',
      title: 'Bruno launch film',
      length: '0:50',
      src: '/videos/bruno.mp4',
      poster: '/videos/bruno-poster.jpg',
      captions: '/videos/bruno.vtt',
      note: 'Independent film, not made for the Bruno team',
    },
  ] satisfies Film[],
  cta: { label: 'Start a project with VeraStack Labs', href: 'https://verastack.dev/#contact' },
}

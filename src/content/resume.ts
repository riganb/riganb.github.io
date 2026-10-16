import type { LinePair } from '@/lib/pairs'
import { caseStudies } from '@/content/case-studies'
import { specSheet } from '@/content/home'

export type ResumeFact = { id: string; value: string; caption: LinePair; target: string }
export type ResumeRole = { id: string; when: string; what: string; lines: string[] }
export type PressLink = { label: string; href: string }

// The Ultraviolette case study's result sheet carries the coverage that backs the bookings figure.
const ultraviolettePress: PressLink[] =
  caseStudies.find((study) => study.slug === 'ultraviolette')?.sheets.find((sheet) => sheet.press)?.press ?? []

// Three numbers, then proof (docs/superpowers/specs/2026-10-16-resume-design.md). The page and the
// PDF are printed from this one module. Numbers inside *emphasis* render in the accent colour.
export const resume = {
  role: 'Founder, VeraStack Labs · Bengaluru',
  updated: 'Updated Oct 2026',
  phone: '+91 93806 54730',
  facts: [
    {
      id: 'bookings',
      value: '70,000+',
      caption: {
        lines: ['EV bookings through the configurators and booking flows I built at Ultraviolette.'],
        honest: ["They were Ultraviolette's bookings. I built the place where they happened."],
      },
      target: 'ultraviolette',
    },
    {
      id: 'speed',
      value: '< 1 wk',
      caption: {
        lines: ['To ship the Isle of Man project, every phase. Sole Spark Award recipient.'],
        honest: ['One very long week, a lot of chai, and a team that let me take the bow.'],
      },
      target: 'ultraviolette',
    },
    {
      id: 'products',
      value: specSheet.rows[0].value,
      caption: {
        lines: ['Products shipped from my own studio.'],
        honest: ['One of them is a game about pigs.'],
      },
      target: 'verastack',
    },
  ] satisfies ResumeFact[],
  press: ultraviolettePress,
  roles: [
    {
      id: 'verastack',
      when: '2026 – now',
      what: 'VeraStack Labs, founder',
      lines: [
        'Origan, rigseed, Riggit, Mehfil and Oinkbuns, built and shipped.',
        'Client work: E3 TRION, *paid bookings on launch day*. Cold Stone Arabia, *76 stores* in six countries, launching.',
      ],
    },
    {
      id: 'ultraviolette',
      when: '2024 – 2026',
      what: 'Ultraviolette Automotive, software engineer',
      lines: [
        'Configurators and booking flows for the X-47, Tesseract and Shockwave: *70,000+ bookings*.',
        'A typed monorepo of *2,800+ PRs* governed. A critical session auth flaw fixed. Spark Award, June 2025.',
      ],
    },
    {
      id: 'suggaa',
      when: '2023 – 2024',
      what: 'Suggaa Ventures, contract engineer',
      lines: ['Checkout *40% lighter*. Fares trained on live data from *four* ride-hailing apps.'],
    },
    {
      id: 'freelance',
      when: '2023 – 2024',
      what: 'Freelance',
      lines: ['Pee Empro: an attendance app that cut data entry by *90%*. Maven: QR event registration.'],
    },
  ] satisfies ResumeRole[],
  also: [
    'NASA Ideathon 2022, *first of 83 teams*',
    'B.E. Information Science, JSSATE, 2024',
    'Vice President, GeeksforGeeks chapter, JSSATE',
    'Free 15-minute coaching sessions, on LinkedIn',
  ],
}

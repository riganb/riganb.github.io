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
        'Client work: E3 TRION, *paid bookings on launch day*. Cold Stone Arabia, *76 stores*, launching.',
        'verastack.dev: Lighthouse *100* for SEO and best practices, all *20 pages* indexed by Google.',
      ],
    },
    {
      id: 'ultraviolette',
      when: '2024 – 2026',
      what: 'Ultraviolette Automotive, software engineer',
      lines: [
        'Configurators and booking flows for the X-47, Tesseract and Shockwave: *70,000+ bookings*.',
        'A typed monorepo of *2,800+ PRs* governed. Critical session auth flaw fixed. Spark Award, 2025.',
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
  builds: [
    'rigseed: a desktop torrent client in Tauri and Rust, an *18.8 MB* installer, about *6x smaller* than an empty Electron app.',
    'Autom8r: an AI workflow builder with a topological-sort engine, running OpenAI, Anthropic and Gemini models.',
    'use-content: an open-source React hook for live copy editing that ships *under 1 kB* to production.',
    'Three open-source Claude Code mods: secret-guard, session-meter and repo-board.',
  ],
  // Named in full so applicant tracking software finds the keywords.
  skills: [
    { title: 'Languages', items: ['TypeScript', 'JavaScript', 'Rust', 'SQL', 'Python', 'Java'] },
    { title: 'Frameworks', items: ['React', 'Next.js', 'Node.js', 'Tauri', 'tRPC', 'Prisma', 'Tailwind CSS'] },
    { title: 'Cloud and data', items: ['AWS Lambda', 'API Gateway', 'S3', 'DynamoDB', 'PostgreSQL', 'Supabase'] },
    { title: 'Tools', items: ['TurboRepo', 'GitHub Actions', 'Framer', 'Webflow', 'Figma', 'GSAP'] },
  ],
  also: [
    'NASA Ideathon 2022, *first of 83 teams*',
    'B.E. Information Science, JSSATE, 2024',
    'Vice President, GeeksforGeeks chapter, JSSATE',
    'Free 15-minute coaching sessions, on LinkedIn',
  ],
  // First to go when the PDF runs long (the spec's cut order). Still shown on the web page.
  screenOnly: [] as string[],
}

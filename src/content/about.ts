import type { LinePair } from '@/lib/pairs'

type Link = { label: string; href: string }

export const sideProjects = {
  label: '// Side projects and open source',
  items: [
    {
      name: 'Autom8r',
      kind: 'AI workflow builder',
      body: 'Chain Stripe, Google Forms, Claude, OpenAI or Gemini, and Slack or Discord into reusable flows, run in dependency order by an Inngest engine.',
      stack: ['Next.js', 'tRPC', 'Prisma', 'Inngest'],
      links: [
        { label: 'GitHub', href: 'https://github.com/riganb/autom8r' },
        { label: 'Live', href: 'https://autom8r.vercel.app' },
      ] satisfies Link[],
    },
    {
      name: 'use-content',
      kind: 'Open-source React hook',
      body: 'Gives marketing a live copy editor in dev and staging, then disappears from production builds, adding less than 1 kB.',
      stack: ['React', 'TypeScript', 'npm'],
      links: [
        { label: 'GitHub', href: 'https://github.com/riganb/use-content' },
        { label: 'npm', href: 'https://www.npmjs.com/package/@riganb/use-content' },
      ] satisfies Link[],
    },
  ],
}

export const journey = {
  label: '// Journey',
  title: 'How I *got* here',
  nudge: 'Come say hi',
  portraitAlt: 'Rigan Burnwal in a white hoodie against a dark background',
  rows: [
    { when: '2026', what: 'Founder, VeraStack Labs', detail: 'rigseed, Riggit and Mehfil' },
    {
      when: '2024 – now',
      what: 'Software Engineer, Ultraviolette Automotive',
      detail: 'The X-47 and Tesseract configurators, a typed monorepo, 2,800+ PRs. Spark Award, June 2025.',
    },
    { when: '2023 – 2026', what: 'Freelance', detail: 'Pee Empro, Maven, Cold Stone Arabia, E3 Electric.AI' },
    { when: '2023 – 2024', what: 'Contract Software Engineer, Suggaa Ventures', detail: 'Payments, cancellation flows, pricing data' },
    { when: '2020 – 2024', what: 'B.E. Information Science', detail: 'JSSATE, Bangalore' },
  ],
}

export const toolbox = {
  label: '// Toolbox',
  columns: [
    { title: 'Frameworks', items: ['React', 'Next.js', 'Node.js', 'tRPC', 'Prisma', 'Jotai', 'Tailwind CSS', 'Tauri'] },
    { title: 'Languages', items: ['TypeScript', 'JavaScript', 'Rust', 'SQL', 'Python', 'Java'] },
    { title: 'Cloud', items: ['AWS Lambda', 'API Gateway', 'S3', 'DynamoDB', 'PostgreSQL', 'Supabase'] },
    { title: 'Tools', items: ['TurboRepo', 'Vercel', 'GitHub Actions', 'Inngest', 'GSAP', 'Figma'] },
  ],
}

export const contact = {
  label: '// Contact',
  signOff: {
    lines: ["Let's build something", 'that *outlasts* its launch.'],
    honest: ["Let's build something.", "I'll over-engineer it."],
  } satisfies LinePair,
  emailCaption: 'I actually read it.',
  resume: { label: 'Resume', caption: 'Being rewritten into something better.', tag: 'Soon' },
  footer: 'Built in Bangalore. Set in Instrument Serif and Geist Mono.',
}

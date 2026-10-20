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
  mods: {
    label: 'Claude Code mods',
    note: 'Open source under VeraStack Labs. Each installs as a plugin from its own repo.',
    items: [
      {
        name: 'secret-guard',
        body: 'Stops Claude from writing, running or committing API keys, tokens and private keys, and asks it to read them from the environment instead.',
        trigger: 'Always on',
        href: 'https://github.com/verastack-labs/secret-guard',
      },
      {
        name: 'session-meter',
        body: 'Usage limits, context and session totals in a pane and the status line, with a warning before you hit the wall.',
        trigger: '/meter',
        href: 'https://github.com/verastack-labs/session-meter',
      },
      {
        name: 'repo-board',
        body: 'Every repo you own in one pane: unpushed work, commits to pull, and the pull requests that need you.',
        trigger: '/repos',
        href: 'https://github.com/verastack-labs/repo-board',
      },
    ],
  },
}

export const journey = {
  label: '// Journey',
  title: { lines: ['How I *got* here'], honest: ['Took the long way'] } satisfies LinePair,
  nudge: 'Come say hi',
  portraitAlt: 'Rigan Burnwal in a white hoodie against a dark background',
  rows: [
    {
      when: '2026',
      what: 'Founder, VeraStack Labs',
      detail: 'Origan, rigseed, Riggit, Mehfil and Oinkbuns. Independent client work for E3 Electric.AI and Cold Stone Arabia.',
    },
    {
      when: '2024 – 2026',
      what: 'Software Engineer, Ultraviolette Automotive',
      detail: 'The X-47, Tesseract and Shockwave configurators: 70,000+ bookings. A typed monorepo, 2,800+ PRs. Spark Award, June 2025.',
    },
    { when: '2023 – 2024', what: 'Freelance', detail: 'Pee Empro, Maven' },
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
    { title: 'Tools', items: ['TurboRepo', 'Vercel', 'GitHub Actions', 'Inngest', 'GSAP', 'Figma', 'Framer', 'Webflow'] },
  ],
}

export const contact = {
  label: '// Contact',
  signOff: {
    lines: ["Let's build something", 'that *outlasts* its launch.'],
    honest: ["Let's build something.", "I'll over-engineer it."],
  } satisfies LinePair,
  emailCaption: 'I actually read it.',
  note: {
    label: 'Or leave a note here',
    placeholder: 'What are you building, or what can I help with?',
    send: 'Send it',
    idle: 'Lands straight in my inbox.',
    incomplete: 'Fill the underlined blanks and a message.',
    badEmail: "That email doesn't look right. Check for a typo, like a missing @ or dot.",
    sending: 'Sending...',
    sent: 'Sent. I will reply soon.',
    failed: 'That did not go through.',
    fallback: 'Email it instead',
  },
  resume: { label: 'Resume', caption: 'Three numbers, then proof.', tag: 'Open', pdf: 'Or the PDF' },
  footer: 'Built in Bangalore. Set in Instrument Serif and Geist Mono.',
}

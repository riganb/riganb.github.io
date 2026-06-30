export const personalInfo = {
  name: 'Rigan Burnwal',
  role: 'Full-Stack Engineer',
  email: 'therealriganb@gmail.com',
  location: 'India',
  logoName: 'Rigan/>',
  logoSub: 'Full-Stack Engineer',
  mbti: {
    type: 'INTJ',
    description: 'Systems over shortcuts. Long-term thinking, deliberate  execution, and a constant drive to build products that outlast trends.'
  },
  socials: [
    { label: 'GitHub', href: 'https://github.com/riganb' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/riganb' }
  ]
}

// Animation Configurations
export const animationConfig = {
  statsDuration: 2000,
  socials: {
    layoutRadius: 250,
    maxConnectionDist: 320,
    maxSimultaneousGlows: 4,
    glowSpawnProbability: 0.03,
    baseLineOpacity: 0.08,
    mouseSegmentThreshold: 150,
    mouseGlowIntensity: 0.40,
    randomGlowIntensity: 0.45,
  }
}

export const heroPhrases = [
  '> Building Revenue-Critical Web Products',
  '> Next.js · TypeScript · AWS',
  '> Shipping at Scale, 2,800+ PRs Merged',
  '> Serverless Architecture & Automation',
  '> From Legacy JS to Typed Monorepos'
]

export const aboutContent = {
  bio: "Full-stack engineer with 2+ years of production experience building consumer web products. I work mostly in Next.js, TypeScript, and AWS — shipping revenue-critical features, leading frontend architecture decisions, and migrating legacy codebases at scale. I like systems that hold up under real traffic and code that's still readable a year later.",
  education: {
    degree: 'Bachelor of Engineering (ISE)',
    major: 'Information Science and Engineering',
    institution: 'JSSATE, Bangalore',
    period: '2020 – 2024'
  },
  stats: [
    { value: 2, label: 'Yrs Experience', suffix: '+' },
    { value: 2800, label: 'PRs Governed', suffix: '+' },
    { value: 4, label: 'Major Projects', suffix: '' },
    { value: 1, label: 'Spark Award', suffix: '' }
  ]
}

export const skills = {
  'Frameworks & Libraries': ['React', 'Next.js', 'Node.js', 'tRPC', 'Prisma', 'Jotai', 'Framer Motion', 'Tailwind CSS'],
  'Languages': ['TypeScript', 'JavaScript', 'SQL', 'Python', 'Java', 'HTML/CSS'],
  'Cloud & Infrastructure': ['AWS Lambda', 'AWS API Gateway', 'AWS S3', 'DynamoDB', 'PostgreSQL'],
  'Tools & Architecture': ['TurboRepo', 'Vercel', 'Git', 'CI/CD', 'Inngest'],
}

export const marqueeItems = [
  'Next.js', 'TypeScript', 'React', 'AWS Lambda', 'DynamoDB', 'tRPC', 'Prisma', 'PostgreSQL', 'Node.js', 'Tailwind CSS', 'TurboRepo', 'Vercel'
]

export const experiences = [
  {
    role: 'Software Engineer',
    company: 'Ultraviolette Automotive',
    period: 'August 2024 – Present',
    type: 'Full-time',
    bullets: [
      'Spearheaded end-to-end migration of a legacy JavaScript codebase into a strictly typed TypeScript monorepo (TurboRepo), introducing compilation constraints, validation schemas, and global state management (Jotai) — governing 2,800+ production Pull Requests',
      'Engineered the core multi-zone Next.js digital configurator for the flagship web presence, directly driving direct-to-consumer revenue pipelines and international customer acquisition flows',
      'Designed and integrated backend serverless components using AWS Lambda, API Gateway, and S3, with scalable DynamoDB single-table design schemas for high-performance normalized data storage',
      'Discovered and patched a critical user session authentication vulnerability, restructuring the core application layer into a modular, secure, and resilient posture',
      'Spark Award (June 2025) — sole recipient on a cross-functional team for delivering the Isle of Man web project across multiple phases under a week of total execution time, unblocking critical auth session management failures and resolving frontend integration issues'
    ]
  },
  {
    role: 'Contract Software Engineer',
    company: 'Suggaa Ventures',
    period: 'May 2023 – March 2024',
    type: 'Contract',
    bullets: [
      'Built core user flows for the primary web platform including high-volume payment processing modules and dynamic cancellation trees using Next.js and server-side state',
      'Reduced payment routing complexity and application bundle size by 40%, improving web performance metrics and reducing conversion drop-offs at checkout',
      'Engineered Node.js automation and scraping scripts to extract, normalize, and cache real-time pricing data from 4 ride-hailing services to train dynamic fare algorithms'
    ]
  }
]

export const projects = [
  {
    title: 'Autom8r',
    stack: ['Next.js', 'tRPC', 'Prisma', 'PostgreSQL', 'Inngest'],
    year: '2026',
    description: 'AI workflow automation platform with a visual, node-based builder. Chain triggers (Stripe, Google Forms), AI models (OpenAI, Anthropic, Gemini), and integrations (Slack, Discord) into reusable workflows. Event-driven execution engine with topological-sort-based node ordering and a pluggable executor registry.',
    links: [
      { label: 'GitHub', href: 'https://github.com/riganb/autom8r' },
      { label: 'Live', href: 'https://autom8r.vercel.app' }
    ],
    terminal: '$ autom8r run --workflow lead-intake\n✓ Trigger: Google Form submission\n✓ Node: Anthropic — classify intent\n✓ Node: Slack — notify #sales\n✓ Workflow complete in 1.4s'
  },
  {
    title: 'use-content',
    stack: ['React', 'TypeScript', 'npm'],
    year: '2025',
    description: 'Open source, type-safe React hook that injects a live content-editing panel in dev/staging environments, letting marketing and design teams iterate on copy directly in the browser with zero engineering intervention. Tree-shaken out of production builds, adding less than 1 kB.',
    links: [
      { label: 'GitHub', href: 'https://github.com/riganb/use-content' },
      { label: 'npm', href: 'https://www.npmjs.com/package/@riganb/use-content' }
    ],
    terminal: '$ npm i @riganb/use-content\n✓ Installed\n✓ Dev panel active on localhost:3000\n✓ Production build: +0.8kB (dev code stripped)'
  },
  {
    title: 'Serverless Notification & Verification Pipeline',
    stack: ['Next.js', 'AWS Lambda', 'API Gateway', 'MailerSend'],
    year: '2024',
    description: 'Freelance project for Maven Consultancy Services. End-to-end dispatch platform decoupling heavy processing loads via AWS API Gateway and asynchronous Lambda functions. Lambda microservice ecosystem computes validation data, generates secure QR codes, and triggers high-volume transactional emails.',
    links: [],
    terminal: '$ deploy verify-pipeline\n✓ Lambda: generate-qr\n✓ Lambda: validate-payload\n✓ MailerSend: dispatch batch (1,200 emails)\n✓ Deployment complete'
  },
  {
    title: 'Workforce Logistics & Analytics Engine',
    stack: ['Java', 'CSV Parsing', 'QR Pipelines'],
    year: '2023',
    description: 'Freelance project for Pee Empro Exports. Low-latency Java logging client for on-site personnel tracking with offline-resilient QR pipelines and optimized CSV parsing. Consolidated fragmented paper-trail metrics into a single-view dashboard, cutting administrative data-entry costs by 90%.',
    links: [],
    terminal: '$ logger scan --site warehouse-3\n✓ QR scan registered (offline cache)\n✓ Synced 142 records on reconnect\n✓ Dashboard updated'
  }
]

export const companies = [
  {
    name: 'Ultraviolette Automotive',
    logo: '/logos/ultraviolette.jpeg',
    role: 'Software Engineer'
  },
  {
    name: 'Suggaa Ventures',
    logo: '/logos/suggaa.jpeg',
    role: 'Contract Software Engineer'
  },
  {
    name: 'Maven Consultancy Services',
    logo: '/logos/maven.png',
    role: 'Freelance'
  },
  {
    name: 'Pee Empro Exports',
    logo: '/logos/pee-empro.jpg',
    role: 'Freelance'
  },
  // {
  //   name: 'Cold Stone Creamery - Arabia',
  //   logo: '/logos/cold-stone-arabia.jpg',
  //   role: 'Freelance'
  // }
];

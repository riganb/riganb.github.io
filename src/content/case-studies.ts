export type Media =
  | { kind: 'image'; src: string; alt: string; width: number; height: number; caption?: string }
  | { kind: 'placeholder'; label: string; caption: string }

export type Metric = { label: string; value: string; before?: string }

export type Sheet = {
  label: string
  title: string
  body: string[]
  media?: Media
  metrics?: Metric[]
  metricsNote?: string
  // Outside coverage that backs the numbers on this sheet.
  press?: Array<{ label: string; href: string }>
}

export type CaseStudy = {
  slug: string
  client: string
  title: string
  year: string
  role: string
  stack: string[]
  live?: { label: string; href: string }
  status?: string
  intro: string[]
  sheets: Sheet[]
  highlights: Array<{ title: string; body: string }>
  next: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'e3-trion',
    client: 'E3 Electric.AI, TRION',
    title: 'A launch site that *took bookings*',
    year: '2026',
    role: 'Solo developer, freelance',
    stack: ['Framer', 'React code components', 'Razorpay'],
    live: { label: 'e3electric.ai', href: 'https://e3electric.ai/' },
    intro: [
      'E3 Electric.AI was launching',
      "India's first AI-powered scooter.",
      'I built the site that met the launch',
      'and took its first pre-bookings.',
    ],
    sheets: [
      {
        label: 'Before',
        title: 'A scooter and a launch date',
        body: [
          'TRION was arriving in three variants with a launch event on the calendar. The site had to tell its story, let people choose their scooter, and take a paid pre-booking on the spot.',
        ],
        media: {
          kind: 'image',
          src: '/work/e3-trion/product.webp',
          alt: 'The TRION product page: a rider on a blue E3 TRION scooter under palm trees',
          width: 1440,
          height: 900,
          caption: 'The TRION product page.',
        },
      },
      {
        label: 'Build',
        title: 'Configurator to checkout',
        body: [
          'The pages are built in Framer. The configurator is custom code: React code components I wrote for choosing the variant and colour, carrying that choice straight into a booking flow.',
          'I integrated Razorpay into that flow, so at the launch event a pre-booking was a few taps from picking a scooter to a paid, confirmed order.',
        ],
        media: {
          kind: 'placeholder',
          label: 'Configurator and booking',
          caption: 'The configurator is no longer online. Screens are on their way.',
        },
      },
      {
        label: 'Result',
        title: 'Still selling TRION',
        body: [
          'The site is live at e3electric.ai. Its savings calculator turns a slider into rupees: daily kilometres in, monthly and yearly savings against petrol out.',
        ],
        media: {
          kind: 'image',
          src: '/work/e3-trion/calculator.webp',
          alt: 'The savings calculator: a daily usage slider set to 50 km with monthly and annual savings',
          width: 1440,
          height: 640,
          caption: 'The savings calculator, live on the product page.',
        },
        press: [
          { label: 'Autocar India', href: 'https://www.autocarindia.com/bike-news/e3-trion-electric-scooter-launched-at-rs-1-lakh-440423' },
          { label: 'Autocar Pro', href: 'https://www.autocarpro.in/news/e3-electricai-launches-e3-trion-electric-scooter-starting-at-rs-99999-133951' },
          { label: 'BikeDekho', href: 'https://www.bikedekho.com/news/category-launch-news/breaking-e3-trion-launched-at-rs-99999-full-details-here-19979' },
          { label: 'EVreporter', href: 'https://evreporter.com/e3-electric-ai-launches-e3-trion-electric-scooter-priced-from-%E2%82%B999999/' },
        ],
      },
    ],
    highlights: [
      { title: 'Custom configurator', body: 'Hand-written code components inside Framer, with variant and colour choices that flow straight into checkout.' },
      { title: 'Razorpay integration', body: 'Paid pre-bookings taken at the launch event, confirmed in the same flow.' },
      { title: 'Savings calculator', body: 'A live petrol-versus-electric comparison that updates as the slider moves.' },
      { title: 'Launch-ready story', body: 'Product pages, specs and imagery ready for launch day traffic.' },
    ],
    next: 'ultraviolette',
  },
  {
    slug: 'ultraviolette',
    client: 'Ultraviolette, three EV launches',
    title: 'The configurators behind *70,000+ bookings*',
    year: '2025',
    role: 'Software Engineer, full-time',
    stack: ['Next.js', 'TypeScript', 'TurboRepo', 'Jotai', 'AWS Lambda', 'DynamoDB'],
    live: { label: 'ultraviolette.com/configure', href: 'https://www.ultraviolette.com/configure' },
    intro: [
      'Ultraviolette builds electric',
      'motorcycles people wait for.',
      '70,000 of them booked one',
      'through the flows I built.',
    ],
    sheets: [
      {
        label: 'Before',
        title: 'Legacy JavaScript',
        body: [
          'The web presence ran on untyped JavaScript, so every change risked the pages that sell motorcycles, and there was little to stop a mistake reaching production.',
        ],
        media: {
          kind: 'placeholder',
          label: 'The old codebase',
          caption: 'Internal work. Diagrams go here rather than code.',
        },
      },
      {
        label: 'Build',
        title: 'A typed monorepo and three launches',
        body: [
          'I led the move to a strictly typed TurboRepo monorepo, with compile-time constraints, validation schemas and Jotai for shared state.',
          'On top of it, the multi-zone Next.js configurators and booking flows for the X-47 crossover, the Tesseract scooter and the Shockwave enduro, backed by AWS Lambda, API Gateway, S3 and a DynamoDB single-table design.',
        ],
        media: {
          kind: 'image',
          src: '/work/ultraviolette/configurator.webp',
          alt: 'The X-47 configurator: an X-47 Desert Wing with range, top speed and torque figures',
          width: 1440,
          height: 900,
          caption: 'The configurator, live at ultraviolette.com/configure.',
        },
      },
      {
        label: 'Result',
        title: '70,000+ bookings, and a Spark Award',
        body: [
          'Each flow took its launch-day rush. Tesseract passed 50,000 bookings in two weeks, Shockwave 7,000 and the X-47 3,000 in its first 24 hours, by the press counts. Along the way I found and fixed a critical session authentication vulnerability.',
          'In June 2025 I received the Spark Award as the sole recipient on a cross-functional team, for delivering the Isle of Man project in under a week.',
        ],
        metrics: [
          { label: 'Bookings, three launches', value: '70,000+' },
          { label: 'X-47, first 24 hours', value: '3,000+' },
          { label: 'Production PRs governed', value: '2,800+' },
          { label: 'Isle of Man project', value: '< 1 week' },
          { label: 'Spark Award', value: '2025' },
        ],
        press: [
          { label: 'Autocar India', href: 'https://www.autocarindia.com/bike-news/ultraviolette-tesseract-electric-scooter-surpasses-50000-bookings-434877' },
          { label: 'Team-BHP', href: 'https://www.team-bhp.com/news/ultraviolette-x-47-surpasses-3000-bookings-24-hours' },
          { label: 'BikeWale', href: 'https://www.bikewale.com/news/ultraviolette-shockwave-garners-over-7000-bookings-since-launch/' },
          { label: 'Mobility Outlook', href: 'https://www.mobilityoutlook.com/news/ultraviolette-tesseract-electric-scooter-garners-60000-bookings-ahead-of-2026-launch/' },
        ],
      },
    ],
    highlights: [
      { title: 'Monorepo migration', body: 'Legacy JavaScript into a strictly typed TurboRepo monorepo, one pull request at a time.' },
      { title: 'Three launch configurators', body: 'Multi-zone Next.js configurators and booking flows for the X-47, Tesseract and Shockwave, 70,000+ bookings between them.' },
      { title: 'Serverless backend', body: 'Lambda, API Gateway and S3 with a single-table DynamoDB design.' },
      { title: 'Security fix', body: 'A critical session authentication flaw found, patched and designed out.' },
    ],
    next: 'e3-trion',
  },
]

// Written but not yet published: Cold Stone waits for the new site to launch. To publish, move a
// study into caseStudies, set caseStudy: true on its work row and fix the next links.
export const draftCaseStudies: CaseStudy[] = [
  {
    slug: 'cold-stone',
    client: 'Cold Stone Creamery Arabia',
    title: 'A franchise site with *76 stores* behind it',
    year: '2026',
    role: 'Solo developer, freelance',
    stack: ['Next.js 16', 'Prisma', 'MariaDB'],
    status: 'Launching soon',
    intro: [
      'Cold Stone Creamery Arabia',
      'ran on a 2020 WordPress theme.',
      'I rebuilt it as one application,',
      'with a CMS their team can use.',
    ],
    sheets: [
      {
        label: 'Before',
        title: 'WordPress, circa 2020',
        body: [
          'Eighteen third-party hosts, a store finder that listed a single outlet, a contact map that rendered as an empty box, and enquiries that disappeared into a plugin with no record behind them.',
        ],
        media: {
          kind: 'image',
          src: '/work/cold-stone/before.webp',
          alt: 'The old Cold Stone Creamery Arabia home page on WordPress',
          width: 1440,
          height: 900,
          caption: 'The WordPress site it replaces.',
        },
      },
      {
        label: 'Build',
        title: 'One app, one CMS',
        body: [
          'A component-driven Next.js front end, a purpose-built CMS for the marketing team, and three validated enquiry pipelines for catering, contact and careers, each writing to MariaDB through Prisma.',
          'Resume uploads are checked in the browser and again on the server against their real leading bytes, so a file merely renamed to .pdf is turned away. Sessions are HMAC-signed and verified in every API route.',
        ],
        media: {
          kind: 'placeholder',
          label: 'The new site',
          caption: 'Screens go here once the new site launches.',
        },
      },
      {
        label: 'Result',
        title: 'Measured, not guessed',
        body: ['Both sites measured on the same connection, at 1440 by 900, with the cache disabled.'],
        metrics: [
          { label: 'DOM nodes (home)', before: '1,254', value: '310' },
          { label: 'Requests (home)', before: '179', value: '87' },
          { label: 'Third-party hosts (home)', before: '18', value: '2' },
          { label: 'First paint (home)', before: '716 ms', value: '264 ms' },
          { label: 'Stores listed', before: '1', value: '76' },
          { label: 'Enquiry forms with a database', before: '0', value: '3' },
        ],
        metricsNote: 'Before on the left, after on the right.',
      },
    ],
    highlights: [
      {
        title: 'A real store directory',
        body: 'Seventy-six outlets across the UAE, Saudi Arabia, Qatar, Bahrain, Oman and Kuwait, each with its address, hours and tap-to-call number.',
      },
      {
        title: 'Enquiries become records',
        body: 'Catering, contact and careers validate on both sides and land in the database, not in an inbox.',
      },
      {
        title: 'Uploads that check themselves',
        body: 'Extension, type and size are verified, then the file is re-read by its first bytes before it is stored.',
      },
      {
        title: 'A CMS the team uses',
        body: 'Sections, items, media and submissions are all editable, with the store directory ready to move in without a migration.',
      },
    ],
    next: 'e3-trion',
  },
]

export function findCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug)
}

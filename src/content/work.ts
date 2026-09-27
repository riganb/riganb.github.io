export type WorkItem = {
  slug: string
  client: string
  discipline: string
  year: string
  note: string
  caseStudy?: boolean
  status?: 'in-progress'
  preview?: { src: string; alt: string }
}

export const work = {
  label: '// Selected work',
  title: 'Selected *work*',
  items: [
    {
      slug: 'cold-stone',
      client: 'Cold Stone Creamery Arabia',
      discipline: 'Website and CMS',
      year: '2026',
      note: '76 stores, six countries, one CMS. First paint 716 ms to 264 ms.',
      caseStudy: true,
      preview: { src: '/work/cold-stone/preview.webp', alt: 'The rebuilt Cold Stone Creamery Arabia menu page' },
    },
    {
      slug: 'e3-trion',
      client: 'E3 Electric.AI, TRION',
      discipline: 'Website, configurator, booking',
      year: '2026',
      note: "Launch site for India's first AI-powered scooter, with booking and Razorpay.",
      caseStudy: true,
      preview: { src: '/work/e3-trion/preview.webp', alt: 'The E3 TRION product page' },
    },
    {
      slug: 'ultraviolette',
      client: 'Ultraviolette, X-47',
      discipline: 'Configurator and platform',
      year: '2025',
      note: 'The configurator behind the X-47 launch, on a monorepo of 2,800+ PRs.',
      caseStudy: true,
      preview: { src: '/work/ultraviolette/preview.webp', alt: 'The Ultraviolette X-47 configurator' },
    },
    {
      slug: 'suggaa',
      client: 'Suggaa Ventures',
      discipline: 'Payments and pricing data',
      year: '2023',
      note: 'Checkout that got 40% lighter, and fares trained on four ride-hailing apps.',
    },
    {
      slug: 'maven',
      client: 'Maven Consultancy Services',
      discipline: 'Event QR pipeline',
      year: '2024',
      note: 'Register, get a QR by email, scan it at the counter. Every attendee, one record.',
    },
    {
      slug: 'pee-empro',
      client: 'Pee Empro Exports',
      discipline: 'Android attendance app',
      year: '2023',
      note: 'QR attendance on Android, exported to CSV whenever they need it.',
    },
    {
      slug: 'pixelstack',
      client: 'PixelStack Studio',
      discipline: 'Website',
      year: '2026',
      note: "A design and development studio's site. Currently on the workbench.",
      status: 'in-progress',
    },
  ] satisfies WorkItem[],
}

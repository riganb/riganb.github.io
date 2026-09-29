import type { ProductSlug } from '@/styles/products'

export type StudioProduct = {
  slug: ProductSlug
  name: string
  kind: string
  pitch: string
  body: string
  stack: string[]
  status?: string
  links: Array<{ label: string; href: string }>
  image?: { src: string; alt: string }
}

export const studio = {
  label: '// The studio',
  title: 'VeraStack *Labs*',
  line: 'A small lab for software that respects the people using it. Four products so far, each with its own look and a reason to exist.',
  productsLabel: 'On the workbench',
  link: { label: 'VeraStack Labs on GitHub', href: 'https://github.com/verastack-labs' },
  products: [
    {
      slug: 'origan',
      name: 'Origan',
      kind: 'Campus partnership · Placement preparation',
      pitch: 'Four years is a distance. We mark the ground the whole way.',
      body: 'Software placement preparation for engineering colleges, from first semester to final drive: a consultant on campus, a platform students use every week, and a record of everything covered in between.',
      stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      links: [{ label: 'Website', href: 'https://verastack-labs.github.io/origan/' }],
      image: { src: '/studio/origan.webp', alt: "The Origan landing page: four years is a distance, over a surveyor's contour map" },
    },
    {
      slug: 'rigseed',
      name: 'rigseed',
      kind: 'Desktop app · qBittorrent client',
      pitch: 'Torrents, finally worth looking at.',
      body: 'A desktop client that brings its own daemon: install it, open it, add a torrent. Three layouts, eight accents, and every screen prints the API calls it makes.',
      stack: ['Tauri', 'React', 'Rust'],
      links: [
        { label: 'Website', href: 'https://verastack-labs.github.io/rigseed/' },
        { label: 'Source', href: 'https://github.com/verastack-labs/rigseed-app' },
      ],
      image: { src: '/studio/rigseed.webp', alt: 'The rigseed app: a sidebar of torrent filters beside a grid of downloads with speeds and progress' },
    },
    {
      slug: 'riggit',
      name: 'Riggit',
      kind: 'Desktop app · GitHub timeline',
      pitch: 'Own your GitHub timeline.',
      body: 'Commit at any date and time. Backfill the week you worked offline, the project you imported late, the day you forgot to push.',
      stack: ['Tauri', 'React', 'Rust'],
      links: [{ label: 'Website', href: 'https://verastack-labs.github.io/riggit/' }],
      image: { src: '/studio/riggit.webp', alt: 'The Riggit landing page, with a filled-in contribution graph' },
    },
    {
      slug: 'mehfil',
      name: 'Mehfil',
      kind: 'Phone app · Group plans',
      pitch: 'Chai in ten? Everyone in.',
      body: 'A quick way to rally people for informal plans: a chai break, dinner in ten minutes, a cards outing. Phone first, installable, and deliberately loud.',
      stack: ['Next.js', 'Supabase', 'PWA'],
      status: 'In development',
      links: [],
    },
  ] satisfies StudioProduct[],
}

import { hero } from '@/content/home'
import { site } from '@/content/site'
import { ogCard } from '@/lib/og-card'

export const dynamic = 'force-static'

// The site-wide share image, rendered once at build time and served as /og.png.
export function GET() {
  return ogCard({
    top: ['Founder · Engineer', site.url.replace('https://', '')],
    title: site.name,
    line: hero.headline.lines.join(' '),
    bottom: ['Founder of VeraStack Labs', 'Bangalore'],
  })
}

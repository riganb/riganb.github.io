import { resume } from '@/content/resume'
import { site } from '@/content/site'
import { ogCard } from '@/lib/og-card'

export const dynamic = 'force-static'

// The resume's share image, served as /resume/og.png: the headline number leads, as on the page.
export function GET() {
  const [lead] = resume.facts
  return ogCard({
    top: ['Resume', resume.updated.replace('Updated ', '')],
    title: lead.value,
    line: 'EV bookings through the booking flows I *built*',
    bottom: [site.name, 'riganb.github.io/resume'],
  })
}

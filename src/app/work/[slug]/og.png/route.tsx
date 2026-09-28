import { notFound } from 'next/navigation'
import { caseStudies, findCaseStudy } from '@/content/case-studies'
import { site } from '@/content/site'
import { ogCard } from '@/lib/og-card'

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

// Each case study's share image, served as /work/<slug>/og.png.
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const study = findCaseStudy((await params).slug)
  if (!study) notFound()
  return ogCard({
    top: ['Case study', study.year],
    title: study.client,
    line: study.title,
    bottom: [site.name, study.role],
  })
}

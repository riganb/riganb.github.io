import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ViewTransition } from 'react'
import { CaseHeader } from '@/components/case-study/case-header'
import { CaseSheet } from '@/components/case-study/case-sheet'
import { Highlights } from '@/components/case-study/highlights'
import { NextCase } from '@/components/case-study/next-case'
import { ScrollFill } from '@/components/motion/scroll-fill'
import { StoryScroll, StorySheet } from '@/components/motion/story-scroll'
import { caseStudies, findCaseStudy } from '@/content/case-studies'
import { site } from '@/content/site'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = findCaseStudy(slug)
  if (!study) return {}
  const title = `${study.client}: ${study.title.replaceAll('*', '')} · ${site.name}`
  return { title, description: study.intro.join(' '), openGraph: { title, description: study.intro.join(' ') } }
}

const intro = 'font-display text-[clamp(2rem,4.6vw,4rem)] leading-[1.08] tracking-[-0.01em]'

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const study = findCaseStudy(slug)
  const next = study && findCaseStudy(study.next)
  if (!study || !next) notFound()

  return (
    <ViewTransition
      enter={{ 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' }}
      exit={{ 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' }}
      default="none"
    >
      <main id="main">
        <CaseHeader study={study} />
        <section aria-label="Overview" className="border-b border-rule">
          <div className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-32">
            <ScrollFill lines={study.intro} className={intro} />
          </div>
        </section>
        <StoryScroll label={`${study.client}: before, build and result`}>
          {study.sheets.map((sheet, index) => (
            <StorySheet key={sheet.label} label={sheet.label}>
              <CaseSheet sheet={sheet} index={index} />
            </StorySheet>
          ))}
        </StoryScroll>
        <Highlights items={study.highlights} />
        <NextCase study={next} />
      </main>
    </ViewTransition>
  )
}

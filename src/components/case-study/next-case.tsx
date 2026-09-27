import Link from 'next/link'
import type { CaseStudy } from '@/content/case-studies'

export function NextCase({ study }: { study: CaseStudy }) {
  return (
    <nav aria-label="Next case study" className="border-b border-rule">
      <Link
        href={`/work/${study.slug}/`}
        transitionTypes={['nav-forward']}
        className="group mx-auto flex max-w-[1320px] items-end justify-between gap-6 px-6 py-16 md:px-10 md:py-24"
      >
        <span>
          <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-muted">Next case study</span>
          <span className="mt-4 block font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-none tracking-[-0.02em] transition-colors group-hover:text-accent">
            {study.client}
          </span>
        </span>
        <span aria-hidden="true" className="text-4xl transition-transform group-hover:translate-x-2">
          →
        </span>
      </Link>
    </nav>
  )
}

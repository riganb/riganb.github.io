import Link from 'next/link'
import { ViewTransition } from 'react'
import { Emphasis } from '@/components/typography/emphasis'
import type { CaseStudy } from '@/content/case-studies'

export function CaseHeader({ study }: { study: CaseStudy }) {
  const facts = [
    { label: 'Role', value: study.role },
    { label: 'Year', value: study.year },
    { label: 'Stack', value: study.stack.join(' · ') },
  ]

  return (
    <header className="border-b border-rule">
      <div className="mx-auto max-w-[1320px] px-6 pb-16 pt-32 md:px-10 md:pt-40">
        <Link
          href="/#work"
          transitionTypes={['nav-back']}
          className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted transition-colors hover:text-ink"
        >
          ← Selected work
        </Link>
        <ViewTransition name={`case-${study.slug}`} share="morph" default="none">
          <h1 className="mt-10 font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] tracking-[-0.02em]">
            {study.client}
          </h1>
        </ViewTransition>
        <p className="mt-6 max-w-[24ch] font-display text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.05] text-ink-2">
          <Emphasis text={study.title} />
        </p>
        <dl className="mt-12 grid gap-6 border-t border-ink pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{fact.label}</dt>
              <dd className="mt-2 text-sm leading-relaxed">{fact.value}</dd>
            </div>
          ))}
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
              {study.live ? 'Live' : 'Status'}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed">
              {study.live ? (
                <a
                  href={study.live.href}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-rule underline-offset-4 transition-colors hover:text-accent"
                >
                  {study.live.label} ↗
                </a>
              ) : (
                study.status
              )}
            </dd>
          </div>
        </dl>
      </div>
    </header>
  )
}

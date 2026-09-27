'use client'

import Link from 'next/link'
import { ViewTransition, useRef, type PointerEvent } from 'react'
import type { WorkItem } from '@/content/work'
import { entryEdge } from '@/lib/hover'

const STATUS_LABELS: Record<NonNullable<WorkItem['status']>, string> = {
  'in-progress': 'In progress',
  'case-study-soon': 'Case study soon',
}

type WorkRowProps = {
  item: WorkItem
  index: number
  onActive: (slug: string | null) => void
}

export function WorkRow({ item, index, onActive }: WorkRowProps) {
  const ref = useRef<HTMLLIElement>(null)
  const label = `${item.client}, ${item.discipline}, ${item.year}.${item.status ? ` ${STATUS_LABELS[item.status]}.` : ''} ${item.note}`

  // The band grows from the edge the pointer came through and retreats through the edge it leaves by.
  const setEdge = (event: PointerEvent<HTMLLIElement>) => {
    const el = ref.current
    if (el) el.dataset.edge = entryEdge(event.clientY, el.getBoundingClientRect())
  }

  return (
    <li
      ref={ref}
      // Rows with a case study are reached through their link; the rest are focusable so notes can be revealed.
      tabIndex={item.caseStudy ? undefined : 0}
      data-edge="top"
      aria-label={item.caseStudy ? undefined : label}
      onPointerEnter={(event) => {
        setEdge(event)
        onActive(item.slug)
      }}
      onPointerLeave={(event) => {
        setEdge(event)
        onActive(null)
      }}
      onFocus={() => onActive(item.slug)}
      onBlur={() => onActive(null)}
      className="work-row relative border-b border-rule outline-none"
    >
      <span aria-hidden="true" className="work-band absolute inset-0 bg-accent" />
      {item.caseStudy && (
        <Link
          href={`/work/${item.slug}/`}
          transitionTypes={['nav-forward']}
          aria-label={`${label} Read the case study.`}
          className="absolute inset-0 z-10"
        />
      )}
      <div
        aria-hidden="true"
        className="relative mx-auto grid max-w-[1320px] grid-cols-[2.5rem_1fr] items-baseline gap-x-4 px-6 py-5 md:px-10 lg:grid-cols-[3rem_1fr_minmax(0,22rem)_4rem] lg:py-6"
      >
        <span className="work-meta font-mono text-[11px] text-muted">{String(index + 1).padStart(2, '0')}</span>
        <span className="work-title font-display text-[clamp(1.75rem,4vw,3.5rem)] leading-none tracking-[-0.01em]">
          {item.caseStudy ? (
            <ViewTransition name={`case-${item.slug}`} share="morph" default="none">
              <span className="inline-block">{item.client}</span>
            </ViewTransition>
          ) : (
            item.client
          )}
          {item.status && (
            <span className="work-meta ml-3 align-middle font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
              {STATUS_LABELS[item.status]}
            </span>
          )}
        </span>
        <span className="work-note col-start-2 mt-2 text-sm leading-snug text-ink-2 lg:col-start-3 lg:row-start-1 lg:mt-0">
          {item.note}
        </span>
        <span className="work-facts work-meta col-start-2 mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted lg:col-span-2 lg:col-start-3 lg:row-start-1 lg:mt-0 lg:grid lg:grid-cols-[minmax(0,22rem)_4rem] lg:text-right">
          <span className="lg:text-left">{item.discipline}</span>
          <span className="ml-3 lg:ml-0">{item.year}</span>
        </span>
      </div>
    </li>
  )
}

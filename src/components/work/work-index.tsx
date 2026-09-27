'use client'

import { useState } from 'react'
import { FINE_POINTER_QUERY, useMediaQuery } from '@/components/use-media-query'
import { Emphasis } from '@/components/typography/emphasis'
import { WorkPreview } from '@/components/work/work-preview'
import { WorkRow } from '@/components/work/work-row'
import { work } from '@/content/work'

export function WorkIndex() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const fine = useMediaQuery(FINE_POINTER_QUERY)

  return (
    <section id="work" aria-labelledby="work-title" className="border-b border-rule">
      <div className="mx-auto max-w-[1320px] px-6 pb-10 pt-24 md:px-10 md:pt-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{work.label}</p>
        <h2 id="work-title" className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-[-0.02em]">
          <Emphasis text={work.title} />
        </h2>
      </div>
      <ol className="border-t border-ink">
        {work.items.map((item, index) => (
          <WorkRow key={item.slug} item={item} index={index} onActive={setActiveSlug} />
        ))}
      </ol>
      {fine && <WorkPreview items={work.items} activeSlug={activeSlug} />}
    </section>
  )
}

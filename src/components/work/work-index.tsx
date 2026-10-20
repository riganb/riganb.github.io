'use client'

import { DecryptText } from '@/components/motion/decrypt-text'

import { useState } from 'react'
import { FINE_POINTER_QUERY, useMediaQuery } from '@/components/use-media-query'
import { HonestText } from '@/components/lens/honest-text'
import { Emphasis } from '@/components/typography/emphasis'
import { WorkPreview } from '@/components/work/work-preview'
import { WorkRow } from '@/components/work/work-row'
import { work } from '@/content/work'

const heading = 'font-display text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-[-0.02em]'

export function WorkIndex() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const fine = useMediaQuery(FINE_POINTER_QUERY)

  return (
    <section data-enter="" id="work" aria-labelledby="work-title" className="border-b border-rule">
      <div className="mx-auto max-w-[1320px] px-6 pb-10 pt-24 md:px-10 md:pt-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted"><DecryptText text={work.label} /></p>
        <HonestText honest={work.title.honest} layerClassName={heading} toggle={false} className="mt-4">
          <h2 id="work-title" className={heading}>
            <Emphasis text={work.title.lines[0]} />
          </h2>
        </HonestText>
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

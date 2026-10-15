'use client'

import { useRef, type CSSProperties, type PointerEvent } from 'react'
import { Magnet } from '@/components/contact/magnet'
import { entryEdge } from '@/lib/hover'

type BigLinkProps = {
  href: string
  label: string
  /** Words for the slow ticker under the label (products, services). */
  ticker: string[]
}

// A full-width call to action. On hover an ink band sweeps in from the edge the pointer came
// through, each letter rolls up into its italic twin, a soft accent light follows the pointer,
// and the arrow fills and tilts towards where it is going. The ticker runs underneath throughout.
// Styles live in globals.css (.big-link).
export function BigLink({ href, label, ticker }: BigLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  const track = (event: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.dataset.edge = entryEdge(event.clientY, rect)
    el.style.setProperty('--x', `${event.clientX - rect.left}px`)
    el.style.setProperty('--y', `${event.clientY - rect.top}px`)
  }

  const words = [...ticker, ...ticker]

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      data-edge="top"
      onPointerEnter={track}
      onPointerMove={track}
      onPointerLeave={track}
      className="big-link group relative block overflow-hidden border-y border-rule"
    >
      <span aria-hidden="true" className="big-link-band absolute inset-0 bg-ink" />
      <span aria-hidden="true" className="big-link-light absolute inset-0" />
      <span className="relative mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-6 pb-6 pt-10 md:px-10 md:pt-12">
        <span className="big-link-title font-display text-[clamp(2.25rem,6vw,5rem)] leading-none tracking-[-0.02em]">
          <span className="sr-only">{label}</span>
          {/* Touch screens have no hover to roll the letters, so they get the plain words, kerned. */}
          <span aria-hidden="true" className="big-link-plain">
            {label}
          </span>
          {/* Letters are grouped by word, so a line only ever breaks between words. */}
          <span aria-hidden="true" className="big-link-rolling flex-wrap gap-x-[0.26em]">
            {label.split(' ').map((word, w, words) => {
              const start = words.slice(0, w).join(' ').length + (w > 0 ? 1 : 0)
              return (
                <span key={w} className="inline-flex whitespace-nowrap">
                  {[...word].map((char, i) => (
                    <span key={i} className="big-link-char" style={{ '--i': start + i } as CSSProperties}>
                      <span className="block">{char}</span>
                      <span className="block italic">{char}</span>
                    </span>
                  ))}
                </span>
              )
            })}
          </span>
        </span>
        {/* Leans toward a nearby pointer, like the email button in the contact section. */}
        <Magnet className="shrink-0">
          <span
            aria-hidden="true"
            className="big-link-arrow grid size-14 place-items-center rounded-full border border-ink text-2xl md:size-20 md:text-3xl"
          >
            →
          </span>
        </Magnet>
      </span>
      <span aria-hidden="true" className="big-link-ticker relative block overflow-hidden pb-8">
        <span className="big-link-track flex w-max gap-10 font-mono text-[11px] uppercase tracking-[0.12em]">
          {words.map((word, index) => (
            <span key={index} className="flex items-center gap-10">
              {word}
              <span className="size-1 rounded-full bg-current opacity-50" />
            </span>
          ))}
        </span>
      </span>
    </a>
  )
}

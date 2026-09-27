'use client'

// Adapted from Story Scroll by Samira Boudjadja:
// https://21st.dev/@boudjadjasamira/components/story-scroll
// Changes: a div wrapper (the page already has a <main>), overflow clip instead of a horizontal
// scrollbar, a gentler configurable angle, an edge shadow and a shade that darkens the covered sheet.

import { useRef, type CSSProperties, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type StoryScrollProps = { label: string; angle?: number; children: ReactNode }

export function StoryScroll({ label, angle = 10, children }: StoryScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root || matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const sheets = gsap.utils.toArray<HTMLElement>('[data-sheet]', root)

      sheets.forEach((sheet, index) => {
        gsap.set(sheet, { zIndex: index + 1 })
        const inner = sheet.querySelector<HTMLElement>('[data-sheet-inner]')
        if (index > 0 && inner) {
          const covered = sheets[index - 1].querySelector<HTMLElement>('[data-sheet-shade]')
          const deal = gsap.timeline({
            scrollTrigger: { trigger: sheet, start: 'top bottom', end: 'top 25%', scrub: true },
          })
          deal.fromTo(inner, { rotation: angle }, { rotation: 0, ease: 'none' }, 0)
          if (covered) deal.fromTo(covered, { opacity: 0 }, { opacity: 1, ease: 'none' }, 0)
        }
        if (index < sheets.length - 1) {
          ScrollTrigger.create({
            trigger: sheet,
            start: 'bottom bottom',
            end: 'bottom top',
            pin: true,
            pinSpacing: false,
          })
        }
      })
    },
    { scope: ref, dependencies: [angle] },
  )

  return (
    <div ref={ref} role="group" aria-label={label} className="[overflow:clip]">
      {children}
    </div>
  )
}

type StorySheetProps = { label: string; className?: string; style?: CSSProperties; children: ReactNode }

export function StorySheet({ label, className = '', style, children }: StorySheetProps) {
  return (
    <section data-sheet="" aria-label={label} className="relative">
      <div
        data-sheet-inner=""
        data-palette={style ? '' : undefined}
        style={style}
        className={`relative min-h-screen origin-bottom-left bg-paper text-ink shadow-[0_-30px_60px_-30px_rgb(0_0_0/0.5)] will-change-transform ${className}`}
      >
        {children}
        <div data-sheet-shade="" aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/35 opacity-0" />
      </div>
    </section>
  )
}

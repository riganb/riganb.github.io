'use client'

import { useRef, type ElementType } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Emphasis } from '@/components/typography/emphasis'

gsap.registerPlugin(useGSAP)

type RevealLinesProps = {
  as?: ElementType
  id?: string
  lines: string[]
  className?: string
}

// Each authored line slides up out of its own mask. The mask's padding and matching negative
// margin leave room for descenders without moving the line, so honest overlays still align.
export function RevealLines({ as: Tag = 'div', id, lines, className }: RevealLinesProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      gsap.set(el, { autoAlpha: 1 })
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.from(el.querySelectorAll('[data-line]'), {
        yPercent: 110,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.09,
      })
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} id={id} data-reveal="" className={className}>
      {lines.map((line, index) => (
        <span key={index} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
          <span data-line="" className="pair-line block">
            <Emphasis text={line} />
          </span>
        </span>
      ))}
    </Tag>
  )
}

'use client'

import { useRef, type ElementType, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(SplitText, useGSAP)

type SplitLinesProps = {
  as?: ElementType
  id?: string
  className?: string
  delay?: number
  children: ReactNode
}

export function SplitLines({ as: Tag = 'div', id, className, delay = 0, children }: SplitLinesProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(el, { autoAlpha: 1 })
        return
      }
      let split: SplitText | undefined
      let cancelled = false
      document.fonts.ready.then(() => {
        if (cancelled) return
        split = SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { autoAlpha: 1 })
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              ease: 'expo.out',
              stagger: 0.09,
              delay,
            })
          },
        })
      })
      return () => {
        cancelled = true
        split?.revert()
      }
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} id={id} data-split="" className={className}>
      {children}
    </Tag>
  )
}

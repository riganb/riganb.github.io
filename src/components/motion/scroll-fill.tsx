'use client'

import { Fragment, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { toWords } from '@/lib/words'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function ScrollFill({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const words = ref.current?.querySelectorAll('[data-word]')
      if (!words?.length) return
      gsap.fromTo(
        words,
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.06,
          scrollTrigger: { trigger: ref.current, start: 'top 85%', end: 'bottom 45%', scrub: true },
        },
      )
    },
    { scope: ref },
  )

  return (
    <p ref={ref} className={className}>
      {toWords(text).map((word, index) => (
        <Fragment key={index}>
          {index > 0 && !word.glue ? ' ' : null}
          <span data-word="" className={word.em ? 'italic text-accent' : undefined}>
            {word.text}
          </span>
        </Fragment>
      ))}
    </p>
  )
}

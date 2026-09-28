'use client'

import { useEffect, useRef } from 'react'
import { scrambleFrame } from '@/lib/decrypt'

const DURATION_MS = 700
const FRAME_MS = 40

// A mono label that unscrambles once as it enters view. The server renders the real text, so it
// reads correctly without JavaScript; screen readers get the real text throughout.
export function DecryptText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let timer = 0

    const run = () => {
      const start = performance.now()
      const step = () => {
        const progress = (performance.now() - start) / DURATION_MS
        el.textContent = scrambleFrame(text, progress)
        if (progress < 1) timer = window.setTimeout(step, FRAME_MS)
      }
      step()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        run()
      },
      { threshold: 1 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
      el.textContent = text
    }
  }, [text])

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
    </span>
  )
}

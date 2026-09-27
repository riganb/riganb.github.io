'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { toGlyphs } from '@/lib/odometer'

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

export function Odometer({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [rolled, setRolled] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRolled(true)
          observer.disconnect()
        }
      },
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <span ref={ref} className={`odometer inline-flex tabular-nums ${className}`} data-rolled={rolled || undefined}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="inline-flex">
        {toGlyphs(value).map((glyph, index) =>
          glyph.kind === 'static' ? (
            <span key={index}>{glyph.char}</span>
          ) : (
            <span key={index} className="inline-block h-[1em] overflow-hidden leading-none">
              <span
                className="odometer-strip block"
                style={{ '--n': glyph.value, transitionDelay: `${glyph.order * 90}ms` } as CSSProperties}
              >
                {DIGITS.map((digit) => (
                  <span key={digit} className="block h-[1em] leading-none">
                    {digit}
                  </span>
                ))}
              </span>
            </span>
          ),
        )}
      </span>
    </span>
  )
}

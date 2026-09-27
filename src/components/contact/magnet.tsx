'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { FINE_POINTER_QUERY, useMediaQuery } from '@/components/use-media-query'
import { approach } from '@/lib/lens'
import { magnetOffset } from '@/lib/magnet'

const REACH = 90
const STRENGTH = 0.28

// Leans its child toward a nearby pointer and settles back when the pointer leaves.
export function Magnet({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const fine = useMediaQuery(FINE_POINTER_QUERY)

  useEffect(() => {
    const el = ref.current
    if (!el || !fine) return
    const target = { x: 0, y: 0 }
    const pos = { x: 0, y: 0 }
    let frame = 0
    let last = 0

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 64) : 16
      last = now
      pos.x = approach(pos.x, target.x, dt, 0.2)
      pos.y = approach(pos.y, target.y, dt, 0.2)
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      if (Math.abs(pos.x - target.x) > 0.1 || Math.abs(pos.y - target.y) > 0.1) frame = requestAnimationFrame(tick)
      else {
        frame = 0
        last = 0
      }
    }

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      // Measure from the resting centre, not the displaced one, so the pull does not feed itself.
      const center = { x: rect.left + rect.width / 2 - pos.x, y: rect.top + rect.height / 2 - pos.y }
      const radius = Math.max(rect.width, rect.height) / 2 + REACH
      const offset = magnetOffset({ x: event.clientX, y: event.clientY }, center, radius, STRENGTH)
      target.x = offset.x
      target.y = offset.y
      if (!frame) frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      el.style.transform = ''
    }
  }, [fine])

  return (
    <div ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  )
}

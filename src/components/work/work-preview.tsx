'use client'

import { useEffect, useRef } from 'react'
import type { WorkItem } from '@/content/work'
import { tiltFromVelocity } from '@/lib/hover'
import { approach } from '@/lib/lens'

const OFFSET_X = 36
const WIDTH = 320
const HEIGHT = 200
const NOTE_GAP = 24

// On wide screens each row's note appears on the right; keep the preview from covering it.
function rightLimit(): number {
  if (!matchMedia('(min-width: 1024px)').matches) return Infinity
  const note = document.querySelector('.work-note')
  return note ? note.getBoundingClientRect().left - NOTE_GAP - WIDTH : Infinity
}

export function WorkPreview({ items, activeSlug }: { items: WorkItem[]; activeSlug: string | null }) {
  const ref = useRef<HTMLDivElement>(null)
  const active = useRef(activeSlug)

  useEffect(() => {
    active.current = activeSlug
  }, [activeSlug])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const target = { x: 0, y: 0 }
    const pos = { x: 0, y: 0 }
    let placed = false
    let tilt = 0
    let last = performance.now()
    let frame = 0

    const onMove = (event: PointerEvent) => {
      target.x = Math.min(event.clientX + OFFSET_X, rightLimit())
      target.y = event.clientY - HEIGHT / 2
      if (!placed) {
        pos.x = target.x
        pos.y = target.y
        placed = true
      }
    }

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64)
      last = now
      const before = pos.x
      pos.x = approach(pos.x, target.x, dt, 0.18)
      pos.y = approach(pos.y, target.y, dt, 0.18)
      tilt = approach(tilt, tiltFromVelocity(pos.x - before), dt, 0.2)
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${tilt}deg)`
      el.dataset.visible = active.current ? 'true' : 'false'
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-visible="false"
      className="work-preview pointer-events-none fixed left-0 top-0 z-40 overflow-hidden rounded-md border border-rule bg-paper-2 shadow-[0_24px_48px_-24px_rgb(0_0_0/0.5)]"
      style={{ width: WIDTH, height: HEIGHT }}
    >
      {items.map((item) =>
        item.preview ? (
          // eslint-disable-next-line @next/next/no-img-element -- static export serves pre-sized WebP files
          <img
            key={item.slug}
            src={item.preview.src}
            alt=""
            width={960}
            height={600}
            decoding="async"
            data-active={item.slug === activeSlug}
            className="work-preview-item absolute inset-0 size-full object-cover"
          />
        ) : (
          <div
            key={item.slug}
            data-active={item.slug === activeSlug}
            className="work-preview-item absolute inset-0 flex flex-col justify-between p-5"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted">{item.discipline}</span>
            <span className="font-display text-3xl leading-none text-ink">{item.client}</span>
          </div>
        ),
      )}
    </div>
  )
}

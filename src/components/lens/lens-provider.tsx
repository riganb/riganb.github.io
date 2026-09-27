'use client'

import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from 'react'
import { LENS_ACTIVE_RADIUS, LENS_IDLE_RADIUS, approach, lensClipPath } from '@/lib/lens'

type LensApi = {
  register: (el: HTMLElement) => () => void
  setActive: (active: boolean) => void
}

const LensContext = createContext<LensApi | null>(null)

export function useLens() {
  return useContext(LensContext)
}

export function LensProvider({ children }: { children: ReactNode }) {
  const discRef = useRef<HTMLDivElement>(null)
  const layers = useRef(new Set<HTMLElement>())
  const activeCount = useRef(0)

  const api = useMemo<LensApi>(
    () => ({
      register(el) {
        layers.current.add(el)
        return () => {
          layers.current.delete(el)
        }
      },
      setActive(active) {
        activeCount.current = Math.max(0, activeCount.current + (active ? 1 : -1))
      },
    }),
    [],
  )

  useEffect(() => {
    const disc = discRef.current
    const root = document.documentElement
    const enabled =
      matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!disc || !enabled) return

    root.dataset.lens = 'on'
    const target = { x: 0, y: 0 }
    const pos = { x: 0, y: 0 }
    let radius = LENS_IDLE_RADIUS
    let visible = false
    let last = performance.now()
    let frame = 0

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX
      target.y = event.clientY
      if (!visible) {
        pos.x = target.x
        pos.y = target.y
        visible = true
      }
    }
    const onLeave = () => {
      visible = false
    }

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64)
      last = now
      pos.x = approach(pos.x, target.x, dt, 0.24)
      pos.y = approach(pos.y, target.y, dt, 0.24)
      const goal = activeCount.current > 0 ? LENS_ACTIVE_RADIUS : LENS_IDLE_RADIUS
      radius = approach(radius, goal, dt, 0.16)

      const scale = radius / LENS_ACTIVE_RADIUS
      disc.style.transform = `translate3d(${pos.x - LENS_ACTIVE_RADIUS}px, ${pos.y - LENS_ACTIVE_RADIUS}px, 0) scale(${scale})`
      disc.style.opacity = visible ? '1' : '0'
      for (const layer of layers.current) {
        layer.style.clipPath = lensClipPath(pos, layer.getBoundingClientRect(), visible ? radius : 0)
      }
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    root.addEventListener('pointerleave', onLeave)
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
      delete root.dataset.lens
    }
  }, [])

  return (
    <LensContext.Provider value={api}>
      {children}
      <div
        ref={discRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[45] size-[220px] rounded-full bg-accent opacity-0 transition-opacity duration-200"
      />
    </LensContext.Provider>
  )
}

'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react'
import {
  LENS_ACTIVE_RADIUS,
  LENS_IDLE_RADIUS,
  approach,
  coverRadius,
  lensClipPath,
  type Point,
} from '@/lib/lens'
import { HOVER_LENS_QUERY, useMediaQuery } from '@/components/use-media-query'

type LensApi = {
  register: (el: HTMLElement) => () => void
  setActive: (active: boolean) => void
}

const LensContext = createContext<LensApi | null>(null)

export function useLens() {
  return useContext(LensContext)
}

// The disc is a fixed 2 × LENS_ACTIVE_RADIUS circle, scaled to the current radius.
function paint(disc: HTMLElement, layers: Iterable<HTMLElement>, center: Point, radius: number) {
  const scale = radius / LENS_ACTIVE_RADIUS
  disc.style.transform = `translate3d(${center.x - LENS_ACTIVE_RADIUS}px, ${center.y - LENS_ACTIVE_RADIUS}px, 0) scale(${scale})`
  for (const layer of layers) {
    layer.style.clipPath = lensClipPath(center, layer.getBoundingClientRect(), radius)
  }
}

export function LensProvider({ children }: { children: ReactNode }) {
  const discRef = useRef<HTMLDivElement>(null)
  const pressRef = useRef<HTMLButtonElement>(null)
  const layers = useRef(new Set<HTMLElement>())
  const activeCount = useRef(0)
  const hover = useMediaQuery(HOVER_LENS_QUERY)

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

  // Hover mode: the disc trails the pointer and swells over honest copy.
  useEffect(() => {
    const disc = discRef.current
    if (!hover || !disc) return
    const root = document.documentElement
    root.dataset.lens = 'hover'
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
      disc.style.opacity = visible ? '1' : '0'
      paint(disc, layers.current, pos, visible ? radius : 0)
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
      disc.style.opacity = '0'
    }
  }, [hover])

  // Press mode: holding the button grows the disc from it until it covers the screen.
  useEffect(() => {
    const disc = discRef.current
    const button = pressRef.current
    if (hover || !disc || !button) return
    const root = document.documentElement
    root.dataset.lens = 'press'
    const rate = matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 0.14
    let held = false
    let radius = 0
    let frame = 0
    let last = 0

    const center = (): Point => {
      const rect = button.getBoundingClientRect()
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    }

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 64) : 16
      last = now
      const c = center()
      const goal = held ? coverRadius(c, window.innerWidth, window.innerHeight) : 0
      radius = approach(radius, goal, dt, rate)
      if (Math.abs(goal - radius) < 0.5) radius = goal
      disc.style.opacity = radius > 0 ? '1' : '0'
      paint(disc, layers.current, c, radius)
      // Keep painting while held so honest copy stays aligned if the page scrolls.
      if (held || radius !== goal) frame = requestAnimationFrame(tick)
      else {
        frame = 0
        last = 0
      }
    }
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const press = () => {
      held = true
      root.dataset.honest = 'on'
      wake()
    }
    const release = () => {
      held = false
      delete root.dataset.honest
      wake()
    }
    const onPointerDown = (event: PointerEvent) => {
      button.setPointerCapture(event.pointerId)
      press()
    }
    const isHoldKey = (event: KeyboardEvent) => event.key === ' ' || event.key === 'Enter'
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isHoldKey(event)) return
      event.preventDefault()
      if (!event.repeat) press()
    }
    const onKeyUp = (event: KeyboardEvent) => {
      if (isHoldKey(event)) release()
    }
    const releaseEvents = ['pointerup', 'pointercancel', 'lostpointercapture', 'blur'] as const

    button.addEventListener('pointerdown', onPointerDown)
    for (const type of releaseEvents) button.addEventListener(type, release)
    button.addEventListener('keydown', onKeyDown)
    button.addEventListener('keyup', onKeyUp)

    return () => {
      cancelAnimationFrame(frame)
      button.removeEventListener('pointerdown', onPointerDown)
      for (const type of releaseEvents) button.removeEventListener(type, release)
      button.removeEventListener('keydown', onKeyDown)
      button.removeEventListener('keyup', onKeyUp)
      delete root.dataset.lens
      delete root.dataset.honest
      disc.style.opacity = '0'
    }
  }, [hover])

  return (
    <LensContext.Provider value={api}>
      {children}
      <div
        ref={discRef}
        aria-hidden="true"
        className="lens-disc pointer-events-none fixed left-0 top-0 z-[45] size-[220px] rounded-full bg-accent opacity-0 transition-opacity duration-200"
      />
      <button
        ref={pressRef}
        type="button"
        aria-label="Hold to read the honest version"
        onContextMenu={(event) => event.preventDefault()}
        className="lens-press fixed bottom-5 left-1/2 z-[47] size-[76px] -translate-x-1/2 touch-none select-none rounded-full border border-rule bg-paper text-ink shadow-[0_6px_24px_-12px_rgb(0_0_0/0.45)]"
      >
        <svg aria-hidden="true" viewBox="0 0 76 76" className="lens-press-ring absolute inset-0 size-full">
          <defs>
            <path id="lens-press-ring" d="M38,38 m-27,0 a27,27 0 1,1 54,0 a27,27 0 1,1 -54,0" />
          </defs>
          <text className="fill-current font-mono text-[7.5px] uppercase" letterSpacing="1.6">
            <textPath href="#lens-press-ring">Hold · the honest version ·</textPath>
          </text>
        </svg>
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        />
      </button>
    </LensContext.Provider>
  )
}

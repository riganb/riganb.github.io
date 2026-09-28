'use client'

import { useEffect, useRef, useState, type ComponentType } from 'react'
import type { DitheredObjectProps } from '@/components/canvasui/DitheredObject'
import { HOVER_LENS_QUERY, useMediaQuery } from '@/components/use-media-query'

const SWAP_FADE_MS = 250

// A product icon floating as a 1-bit dithered 3D object (Canvas UI Dithered Object, three.js).
// Desktop only (fine pointer, wide screen, motion allowed), and the three.js chunk is fetched only
// when the object nears the viewport. Swapping `src` fades the old icon out before loading the new one.
export function ProductObject({ src, className = '' }: { src: string; className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const enabled = useMediaQuery(HOVER_LENS_QUERY)
  const [Dithered, setDithered] = useState<ComponentType<DitheredObjectProps> | null>(null)
  const [shown, setShown] = useState(src)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!enabled || !host || Dithered) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        import('@/components/canvasui/DitheredObject').then((mod) => setDithered(() => mod.DitheredObject))
      },
      { rootMargin: '400px 0px' },
    )
    observer.observe(host)
    return () => observer.disconnect()
  }, [enabled, Dithered])

  // A new src fades the current icon out first (adjusting state during render, not in an effect)...
  const [requested, setRequested] = useState(src)
  if (src !== requested) {
    setRequested(src)
    setVisible(false)
  }

  // ...then loads once the fade has played; onLoad fades the new one in.
  useEffect(() => {
    if (requested === shown) return
    const timer = window.setTimeout(() => setShown(requested), SWAP_FADE_MS)
    return () => window.clearTimeout(timer)
  }, [requested, shown])

  if (!enabled) return null

  return (
    <div ref={hostRef} aria-hidden="true" className={`product-object pointer-events-none ${className}`}>
      {Dithered && (
        <Dithered
          src={shown}
          method="halftone"
          gridSize={4}
          grayscale
          invert
          orbit={false}
          zoom={false}
          scale={3.4}
          environmentIntensity={0.25}
          floatIntensity={1.4}
          rotationIntensity={1.2}
          floatSpeed={1.4}
          onLoad={() => setVisible(true)}
          className="size-full transition-opacity duration-300"
          style={{ opacity: visible ? 1 : 0 }}
        />
      )}
    </div>
  )
}

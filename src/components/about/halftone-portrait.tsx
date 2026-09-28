'use client'

import { useEffect, useRef } from 'react'
import { relativeLuminance } from '@/lib/contrast'
import { approach } from '@/lib/lens'
import { dotRadius, lensPoint, luminance } from '@/lib/halftone'

const CELL = 7
const SAMPLE_SRC = '/portrait-sample.webp'
// Einstein radius at full mass, as a share of the portrait's shorter side.
const EINSTEIN_SHARE = 0.15

// The portrait as newsprint dots in the current ink, drawn from a small sample image. On hover
// (fine pointers, motion allowed) the pointer becomes a mass: dots are redrawn through a
// gravitational lens, clearing a hole, piling into a ring and swirling as if space were dragged
// round. The real photograph is never shown.
export function HalftonePortrait({ alt, className = '' }: { alt: string; className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!host || !canvas || !ctx) return
    let pixels: ImageData | null = null
    // Dots as flat [x, y, radius] triples, rebuilt on resize and theme change.
    let dots = new Float32Array(0)
    let width = 0
    let height = 0
    let ink = ''
    let paper = ''

    const build = () => {
      if (!pixels) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = host.clientWidth
      height = host.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const styles = getComputedStyle(canvas)
      ink = styles.getPropertyValue('--ink').trim()
      paper = styles.getPropertyValue('--paper').trim()
      const inkIsDark = relativeLuminance(ink) < relativeLuminance(paper)

      const list: number[] = []
      const scaleX = pixels.width / width
      const scaleY = pixels.height / height
      // The field runs past the frame, repeating the edge pixels, so the swirl near an edge pulls
      // in dots from off-canvas instead of opening paper-coloured gaps.
      const margin = Math.ceil((EINSTEIN_SHARE * Math.min(width, height)) / CELL) * CELL
      const clampX = (x: number) => Math.min(pixels!.width - 1, Math.max(0, Math.floor(x * scaleX)))
      const clampY = (y: number) => Math.min(pixels!.height - 1, Math.max(0, Math.floor(y * scaleY)))
      for (let y = CELL / 2 - margin; y < height + margin; y += CELL) {
        for (let x = CELL / 2 - margin; x < width + margin; x += CELL) {
          const px = clampX(x)
          const py = clampY(y)
          const i = (py * pixels.width + px) * 4
          const radius = dotRadius(luminance(pixels.data[i], pixels.data[i + 1], pixels.data[i + 2]), CELL, inkIsDark)
          if (radius >= 0.3) list.push(x, y, radius)
        }
      }
      dots = new Float32Array(list)
    }

    // Lens state: the mass eases in and out; its centre trails the pointer.
    const center = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    let mass = 0
    let hovering = false
    let frame = 0
    let last = 0

    const render = (time: number) => {
      ctx.fillStyle = paper
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = ink
      const einstein = mass * EINSTEIN_SHARE * Math.min(width, height)
      // A slow breathing in the twist, so the warp never sits still while held.
      const twist = mass * (0.9 + 0.25 * Math.sin(time / 900))
      ctx.beginPath()
      for (let i = 0; i < dots.length; i += 3) {
        const p = lensPoint({ x: dots[i], y: dots[i + 1] }, center, einstein, twist)
        const r = dots[i + 2] * p.scale
        ctx.moveTo(p.x + r, p.y)
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
      }
      ctx.fill()
    }

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 64) : 16
      last = now
      mass = approach(mass, hovering ? 1 : 0, dt, 0.12)
      center.x = approach(center.x, target.x, dt, 0.2)
      center.y = approach(center.y, target.y, dt, 0.2)
      if (!hovering && mass < 0.002) mass = 0
      render(now)
      if (hovering || mass > 0) frame = requestAnimationFrame(tick)
      else {
        frame = 0
        last = 0
      }
    }
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const redraw = () => {
      build()
      if (dots.length) render(performance.now())
      host.dataset.ready = 'true'
    }

    const image = new Image()
    image.decoding = 'async'
    image.onload = () => {
      const sample = document.createElement('canvas')
      sample.width = image.naturalWidth
      sample.height = image.naturalHeight
      const sampleCtx = sample.getContext('2d')
      if (!sampleCtx) return
      sampleCtx.drawImage(image, 0, 0)
      pixels = sampleCtx.getImageData(0, 0, sample.width, sample.height)
      redraw()
    }
    // Load and draw only as the portrait nears the viewport, keeping the work off the page load.
    const nearObserver = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        nearObserver.disconnect()
        image.src = SAMPLE_SRC
      },
      { rootMargin: '600px 0px' },
    )
    nearObserver.observe(host)

    const resizeObserver = new ResizeObserver(redraw)
    resizeObserver.observe(host)
    const themeObserver = new MutationObserver(redraw)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const canWarp = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    const locate = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect()
      target.x = event.clientX - rect.left
      target.y = event.clientY - rect.top
    }
    const onEnter = (event: PointerEvent) => {
      if (!canWarp.matches || !dots.length) return
      locate(event)
      // Start the mass where the pointer came in, rather than sliding over from the last exit.
      if (mass === 0) {
        center.x = target.x
        center.y = target.y
      }
      hovering = true
      wake()
    }
    const onMove = (event: PointerEvent) => {
      if (hovering) locate(event)
    }
    const onLeave = () => {
      hovering = false
    }
    host.addEventListener('pointerenter', onEnter)
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(frame)
      image.onload = null
      nearObserver.disconnect()
      resizeObserver.disconnect()
      themeObserver.disconnect()
      host.removeEventListener('pointerenter', onEnter)
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={hostRef}
      role="img"
      aria-label={alt}
      className={`halftone relative aspect-[900/928] overflow-hidden rounded-md border border-rule ${className}`}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 size-full" />
    </div>
  )
}

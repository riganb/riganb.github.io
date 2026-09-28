'use client'

import { useEffect, useRef } from 'react'
import { relativeLuminance } from '@/lib/contrast'
import { approach } from '@/lib/lens'
import { dotRadius, gravityPull, luminance } from '@/lib/halftone'

const CELL = 7
const SAMPLE_SRC = '/portrait-sample.webp'
// Reach of the well, as a share of the portrait's shorter side, and how hard it pulls at the centre.
const WELL_SHARE = 0.26
const WELL_STRENGTH = 0.55
// Dots run past the frame by this share, so the pull drags in dots from outside, not paper.
const MARGIN_SHARE = 0.12
// Each dot chases its pulled position on a spring: it lags, overshoots a touch and settles.
const STIFFNESS = 0.012
const DAMPING = 0.84

// The portrait as newsprint dots in the current ink, drawn from a small sample image. On hover
// (fine pointers, motion allowed) the pointer becomes a mass sinking into the page, like the
// rubber-sheet picture of spacetime: dots slide toward it and shrink as they fall in, each on its
// own spring, so the fabric trails the pointer and wobbles back when it leaves.
export function HalftonePortrait({ alt, className = '' }: { alt: string; className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!host || !canvas || !ctx) return
    let pixels: ImageData | null = null
    // Rest positions and radii as [x, y, radius] triples; live offsets and velocities alongside.
    let dots = new Float32Array(0)
    let offset = new Float32Array(0)
    let velocity = new Float32Array(0)
    let scales = new Float32Array(0)
    let width = 0
    let height = 0
    let ink = ''
    let paper = ''

    const build = () => {
      const source = pixels
      if (!source) return
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
      const scaleX = source.width / width
      const scaleY = source.height / height
      const margin = Math.ceil((MARGIN_SHARE * Math.min(width, height)) / CELL) * CELL
      const sampleX = (x: number) => Math.min(source.width - 1, Math.max(0, Math.floor(x * scaleX)))
      const sampleY = (y: number) => Math.min(source.height - 1, Math.max(0, Math.floor(y * scaleY)))
      for (let y = CELL / 2 - margin; y < height + margin; y += CELL) {
        for (let x = CELL / 2 - margin; x < width + margin; x += CELL) {
          const i = (sampleY(y) * source.width + sampleX(x)) * 4
          const radius = dotRadius(luminance(source.data[i], source.data[i + 1], source.data[i + 2]), CELL, inkIsDark)
          if (radius >= 0.3) list.push(x, y, radius)
        }
      }
      dots = new Float32Array(list)
      const count = dots.length / 3
      offset = new Float32Array(count * 2)
      velocity = new Float32Array(count * 2)
      scales = new Float32Array(count).fill(1)
    }

    // The mass eases in and out; its centre trails the pointer.
    const center = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    let mass = 0
    let hovering = false
    let frame = 0
    let last = 0

    const render = () => {
      ctx.fillStyle = paper
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = ink
      ctx.beginPath()
      for (let d = 0, i = 0; i < dots.length; d += 1, i += 3) {
        const x = dots[i] + offset[d * 2]
        const y = dots[i + 1] + offset[d * 2 + 1]
        const r = dots[i + 2] * scales[d]
        ctx.moveTo(x + r, y)
        ctx.arc(x, y, r, 0, Math.PI * 2)
      }
      ctx.fill()
    }

    // Steps every dot's spring toward its pulled position; returns the largest motion left.
    const step = (dt: number) => {
      const radius = WELL_SHARE * Math.min(width, height)
      const strength = WELL_STRENGTH * mass
      const k = STIFFNESS * dt
      const damping = Math.pow(DAMPING, dt / 16)
      let motion = 0
      for (let d = 0, i = 0; i < dots.length; d += 1, i += 3) {
        const goal = gravityPull({ x: dots[i], y: dots[i + 1] }, center, radius, strength)
        const o = d * 2
        velocity[o] = (velocity[o] + (goal.x - dots[i] - offset[o]) * k) * damping
        velocity[o + 1] = (velocity[o + 1] + (goal.y - dots[i + 1] - offset[o + 1]) * k) * damping
        offset[o] += velocity[o]
        offset[o + 1] += velocity[o + 1]
        scales[d] += (goal.scale - scales[d]) * Math.min(1, k * 4)
        motion = Math.max(
          motion,
          Math.abs(velocity[o]) + Math.abs(velocity[o + 1]),
          Math.abs(offset[o]) + Math.abs(offset[o + 1]),
        )
      }
      return motion
    }

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 48) : 16
      last = now
      mass = approach(mass, hovering ? 1 : 0, dt, 0.1)
      center.x = approach(center.x, target.x, dt, 0.18)
      center.y = approach(center.y, target.y, dt, 0.18)
      const motion = step(dt)
      render()
      if (hovering || mass > 0.002 || motion > 0.05) frame = requestAnimationFrame(tick)
      else {
        // Settled: snap the last fraction of a pixel back to rest and stop the loop.
        mass = 0
        offset.fill(0)
        velocity.fill(0)
        scales.fill(1)
        render()
        frame = 0
        last = 0
      }
    }
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const redraw = () => {
      build()
      if (dots.length) render()
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
      // Start the well where the pointer came in, rather than sliding over from the last exit.
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

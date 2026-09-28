'use client'

import { useEffect, useRef } from 'react'
import { warp, type Body } from '@/lib/grid'
import { approach } from '@/lib/lens'

const CELL = 24
const STEP = 8
const RADIUS = 140
const STRENGTH = 14

// Blueprint marks that drift around the empty parts of the panel. Each is a small mass that pulls
// the grid toward it. `at` is the rest position as a share of the panel; `sway` how far it wanders.
const GLYPHS = [
  { text: '</>', at: [0.14, 0.84], sway: [26, 18], speed: 0.00021, phase: 0.4, accent: false },
  { text: '{ }', at: [0.55, 0.92], sway: [34, 12], speed: 0.00017, phase: 2.1, accent: false },
  { text: 'λ', at: [0.84, 0.78], sway: [18, 26], speed: 0.00024, phase: 4.2, accent: true },
  { text: '⌘', at: [0.86, 0.17], sway: [14, 12], speed: 0.00019, phase: 1.3, accent: false },
  { text: '✦', at: [0.32, 0.72], sway: [22, 16], speed: 0.00015, phase: 5.6, accent: false },
] as const
const GLYPH_RADIUS = 90
const GLYPH_PULL = -9
const RING = 15

export function BlueprintGrid({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const host = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !host || !ctx) return

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    const interactive = matchMedia('(hover: hover) and (pointer: fine)').matches && !still
    const cursor = { x: -9999, y: -9999 }
    let width = 0
    let height = 0
    let strength = 0
    let target = 0
    let frame = 0
    let last = 0
    let inView = false
    let colors = { grid: '', rule: '', muted: '', accent: '', paper: '', font: 'monospace' }

    const readColors = () => {
      const styles = getComputedStyle(canvas)
      const value = (name: string) => styles.getPropertyValue(name).trim()
      colors = {
        grid: value('--grid'),
        rule: value('--rule'),
        muted: value('--muted'),
        accent: value('--accent'),
        paper: value('--paper'),
        font: value('--font-mono') || 'monospace',
      }
    }

    // Glyph centres at time t: a slow Lissajous drift around each rest position.
    const glyphsAt = (t: number) =>
      GLYPHS.map((glyph) => ({
        ...glyph,
        x: glyph.at[0] * width + Math.sin(t * glyph.speed + glyph.phase) * glyph.sway[0],
        y: glyph.at[1] * height + Math.cos(t * glyph.speed * 1.3 + glyph.phase) * glyph.sway[1],
        tilt: Math.sin(t * glyph.speed * 0.7 + glyph.phase) * 0.18,
      }))

    const draw = (t: number) => {
      const glyphs = glyphsAt(t)
      const bodies: Body[] = glyphs.map((g) => ({ x: g.x, y: g.y, radius: GLYPH_RADIUS, strength: GLYPH_PULL }))
      if (strength > 0.05) bodies.push({ ...cursor, radius: RADIUS, strength })

      ctx.clearRect(0, 0, width, height)
      ctx.strokeStyle = colors.grid
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let x = 0; x <= width; x += CELL) {
        for (let y = 0; y <= height + STEP; y += STEP) {
          const p = warp({ x, y }, bodies)
          if (y === 0) ctx.moveTo(p.x + 0.5, p.y)
          else ctx.lineTo(p.x + 0.5, p.y)
        }
      }
      for (let y = 0; y <= height; y += CELL) {
        for (let x = 0; x <= width + STEP; x += STEP) {
          const p = warp({ x, y }, bodies)
          if (x === 0) ctx.moveTo(p.x, p.y + 0.5)
          else ctx.lineTo(p.x, p.y + 0.5)
        }
      }
      ctx.stroke()

      // Each glyph sits in a small paper disc with a hairline ring, like a blueprint callout.
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = `13px ${colors.font}`
      for (const g of glyphs) {
        ctx.save()
        ctx.translate(g.x, g.y)
        ctx.rotate(g.tilt)
        ctx.beginPath()
        ctx.arc(0, 0, RING, 0, Math.PI * 2)
        ctx.fillStyle = colors.paper
        ctx.fill()
        ctx.strokeStyle = g.accent ? colors.accent : colors.rule
        ctx.stroke()
        ctx.fillStyle = g.accent ? colors.accent : colors.muted
        ctx.fillText(g.text, 0, 1)
        ctx.restore()
      }
    }

    // Glyphs drift whenever the panel is on screen (and motion is allowed); the cursor ripple
    // eases in and out on top.
    const running = () => inView && !still
    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 64) : 16
      last = now
      strength = approach(strength, target, dt, 0.12)
      draw(now)
      if (running() || target > 0 || strength > 0.05) frame = requestAnimationFrame(tick)
      else {
        strength = 0
        frame = 0
        last = 0
      }
    }
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = host.clientWidth
      height = host.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      readColors()
      draw(performance.now())
    }

    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect()
      cursor.x = event.clientX - rect.left
      cursor.y = event.clientY - rect.top
      target = STRENGTH
      wake()
    }
    const onLeave = () => {
      target = 0
      wake()
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)
    // Redraw when the theme changes so the grid and glyphs pick up the new colours.
    const themeObserver = new MutationObserver(() => {
      readColors()
      draw(performance.now())
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    const viewObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (running()) wake()
    })
    viewObserver.observe(host)
    if (interactive) {
      host.addEventListener('pointermove', onMove)
      host.addEventListener('pointerleave', onLeave)
    }

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      themeObserver.disconnect()
      viewObserver.disconnect()
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`} />
}

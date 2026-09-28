'use client'

import { useEffect, useRef } from 'react'
import { displace } from '@/lib/grid'
import { approach } from '@/lib/lens'

const CELL = 24
const STEP = 8
const RADIUS = 140
const STRENGTH = 14

export function BlueprintGrid({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const host = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !host || !ctx) return

    const interactive =
      matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !matchMedia('(prefers-reduced-motion: reduce)').matches
    const cursor = { x: -9999, y: -9999 }
    let width = 0
    let height = 0
    let strength = 0
    let target = 0
    let frame = 0
    let last = 0

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.strokeStyle = getComputedStyle(canvas).getPropertyValue('--grid').trim()
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let x = 0; x <= width; x += CELL) {
        for (let y = 0; y <= height + STEP; y += STEP) {
          const p = displace({ x, y }, cursor, RADIUS, strength)
          if (y === 0) ctx.moveTo(p.x + 0.5, p.y)
          else ctx.lineTo(p.x + 0.5, p.y)
        }
      }
      for (let y = 0; y <= height; y += CELL) {
        for (let x = 0; x <= width + STEP; x += STEP) {
          const p = displace({ x, y }, cursor, RADIUS, strength)
          if (x === 0) ctx.moveTo(p.x, p.y + 0.5)
          else ctx.lineTo(p.x, p.y + 0.5)
        }
      }
      ctx.stroke()
    }

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 64) : 16
      last = now
      strength = approach(strength, target, dt, 0.12)
      draw()
      if (target > 0 || strength > 0.05) frame = requestAnimationFrame(tick)
      else {
        strength = 0
        frame = 0
        last = 0
        draw()
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
      draw()
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
    // Redraw when the theme changes so the grid picks up the new --grid colour.
    const themeObserver = new MutationObserver(draw)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    if (interactive) {
      host.addEventListener('pointermove', onMove)
      host.addEventListener('pointerleave', onLeave)
    }

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      themeObserver.disconnect()
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`} />
}

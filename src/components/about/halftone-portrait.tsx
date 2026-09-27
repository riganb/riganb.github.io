'use client'

import { useEffect, useRef } from 'react'
import { relativeLuminance } from '@/lib/contrast'
import { dotRadius, luminance } from '@/lib/halftone'

const CELL = 7
const SAMPLE_SRC = '/portrait-sample.webp'

// The portrait as newsprint dots in the current ink, drawn from a small sample image.
// On hover (fine pointers) the dots fade to reveal the photograph underneath.
export function HalftonePortrait({ alt, className = '' }: { alt: string; className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!host || !canvas || !ctx) return
    let pixels: ImageData | null = null

    const draw = () => {
      if (!pixels) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = host.clientWidth
      const height = host.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const styles = getComputedStyle(canvas)
      const ink = styles.getPropertyValue('--ink').trim()
      const paper = styles.getPropertyValue('--paper').trim()
      const inkIsDark = relativeLuminance(ink) < relativeLuminance(paper)
      ctx.fillStyle = paper
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = ink

      const scaleX = pixels.width / width
      const scaleY = pixels.height / height
      for (let y = CELL / 2; y < height; y += CELL) {
        for (let x = CELL / 2; x < width; x += CELL) {
          const px = Math.min(pixels.width - 1, Math.floor(x * scaleX))
          const py = Math.min(pixels.height - 1, Math.floor(y * scaleY))
          const i = (py * pixels.width + px) * 4
          const radius = dotRadius(luminance(pixels.data[i], pixels.data[i + 1], pixels.data[i + 2]), CELL, inkIsDark)
          if (radius < 0.3) continue
          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fill()
        }
      }
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
      draw()
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

    const resizeObserver = new ResizeObserver(draw)
    resizeObserver.observe(host)
    const themeObserver = new MutationObserver(draw)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    const scheme = matchMedia('(prefers-color-scheme: dark)')
    scheme.addEventListener('change', draw)

    return () => {
      image.onload = null
      nearObserver.disconnect()
      resizeObserver.disconnect()
      themeObserver.disconnect()
      scheme.removeEventListener('change', draw)
    }
  }, [])

  return (
    <div
      ref={hostRef}
      className={`halftone relative aspect-[900/928] overflow-hidden rounded-md border border-rule ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static export serves a pre-sized WebP file */}
      <img
        src="/portrait.webp"
        alt={alt}
        width={900}
        height={928}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />
      <canvas ref={canvasRef} aria-hidden="true" className="halftone-canvas absolute inset-0 size-full" />
    </div>
  )
}

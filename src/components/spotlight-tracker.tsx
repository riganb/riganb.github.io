'use client'

import { useEffect } from 'react'

// Feeds the pointer position to whichever [data-spotlight] surface it is over, as --x and --y,
// so its .spot layer (globals.css) can light up under the cursor. One listener for the page.
export function SpotlightTracker() {
  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const onMove = (event: PointerEvent) => {
      const surface = (event.target as Element | null)?.closest?.<HTMLElement>('[data-spotlight]')
      if (!surface) return
      const rect = surface.getBoundingClientRect()
      surface.style.setProperty('--x', `${event.clientX - rect.left}px`)
      surface.style.setProperty('--y', `${event.clientY - rect.top}px`)
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => document.removeEventListener('pointermove', onMove)
  }, [])

  return null
}

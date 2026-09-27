'use client'

import { useEffect } from 'react'

// Lets the fixed header take on the palette of a product sheet scrolling beneath it,
// so it never sits as a pale strip over a dark sheet. Sheets opt in with data-palette
// and carry their palette as inline custom properties.
export function NavPalette() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>('[data-site-header]')
    if (!header) return
    let applied: HTMLElement | null = null
    let frame = 0

    const update = () => {
      frame = 0
      const probeY = header.offsetHeight / 2
      const sheet =
        document
          .elementsFromPoint(window.innerWidth / 2, probeY)
          .find((el) => !header.contains(el))
          ?.closest<HTMLElement>('[data-palette]') ?? null
      if (sheet === applied) return
      if (applied) for (const name of Array.from(applied.style)) if (name.startsWith('--')) header.style.removeProperty(name)
      if (sheet)
        for (const name of Array.from(sheet.style))
          if (name.startsWith('--')) header.style.setProperty(name, sheet.style.getPropertyValue(name))
      applied = sheet
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return null
}

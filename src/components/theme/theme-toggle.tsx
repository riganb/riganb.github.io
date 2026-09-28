'use client'

import type { MouseEvent } from 'react'
import { coverRadius } from '@/lib/lens'
import { THEME_STORAGE_KEY, nextTheme, resolveTheme } from '@/lib/theme'

const RAYS = [0, 45, 90, 135, 180, 225, 270, 315]

export function ThemeToggle() {
  function toggle(event: MouseEvent<HTMLButtonElement>) {
    const root = document.documentElement
    const next = nextTheme(resolveTheme(root.dataset.theme ?? null))
    const apply = () => {
      root.dataset.theme = next
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next)
      } catch {
        // Storage can be unavailable (private mode); the choice then lasts for this page only.
      }
    }

    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      apply()
      return
    }

    // The new theme spreads from the button as a growing circle. Named transitions (the header,
    // case study titles) are switched off for the swap so the whole page reveals as one.
    const rect = event.currentTarget.getBoundingClientRect()
    const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    const radius = coverRadius(center, window.innerWidth, window.innerHeight)
    root.classList.add('theme-switching')
    const transition = document.startViewTransition(apply)
    transition.ready.then(() => {
      root.animate(
        {
          clipPath: [
            `circle(0px at ${center.x}px ${center.y}px)`,
            `circle(${radius}px at ${center.x}px ${center.y}px)`,
          ],
        },
        { duration: 650, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
    transition.finished.finally(() => root.classList.remove('theme-switching'))
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      className="theme-toggle relative grid size-8 place-items-center rounded-full border border-rule text-ink transition-colors hover:border-ink"
    >
      {/* Sun in light mode, moon in dark; they swap with a turn and a scale (globals.css). */}
      <svg aria-hidden="true" viewBox="0 0 16 16" className="theme-sun absolute size-4">
        <circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.25" />
        {RAYS.map((angle) => (
          <line
            key={angle}
            x1="8"
            y1="1.25"
            x2="8"
            y2="2.75"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            transform={`rotate(${angle} 8 8)`}
          />
        ))}
      </svg>
      <svg aria-hidden="true" viewBox="0 0 16 16" className="theme-moon absolute size-4">
        <path
          d="M13.5 9.6A5.75 5.75 0 1 1 6.4 2.5a4.6 4.6 0 0 0 7.1 7.1Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

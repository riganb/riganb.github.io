'use client'

import { THEME_STORAGE_KEY, nextTheme, resolveTheme } from '@/lib/theme'

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const next = nextTheme(resolveTheme(root.dataset.theme ?? null, prefersDark))
    root.dataset.theme = next
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Storage can be unavailable (private mode); the choice then lasts for this page only.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      className="grid size-8 place-items-center rounded-full border border-rule text-ink transition-colors hover:border-ink"
    >
      <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4">
        <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" />
      </svg>
    </button>
  )
}

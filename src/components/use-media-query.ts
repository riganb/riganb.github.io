'use client'

import { useCallback, useSyncExternalStore } from 'react'

// A precise pointer on a wide screen with motion allowed: the ink lens trails the cursor.
export const HOVER_LENS_QUERY =
  '(hover: hover) and (pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)'

// A precise pointer with motion allowed: hover effects such as the work index band and preview.
export const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    [query],
  )
  return useSyncExternalStore(subscribe, () => matchMedia(query).matches, () => false)
}

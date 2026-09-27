'use client'

import type { ReactNode } from 'react'
import { useLens } from '@/components/lens/lens-provider'

// Keeps the ink lens swollen anywhere inside the zone, not just over each honest line,
// so it does not pulse between rows of a card. Enter and leave nest with HonestText's own.
export function LensZone({ className = '', children }: { className?: string; children: ReactNode }) {
  const lens = useLens()
  return (
    <div className={className} onPointerEnter={() => lens?.setActive(true)} onPointerLeave={() => lens?.setActive(false)}>
      {children}
    </div>
  )
}

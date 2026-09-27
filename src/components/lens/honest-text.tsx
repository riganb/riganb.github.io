'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useLens } from '@/components/lens/lens-provider'

type HonestTextProps = {
  /** Honest copy, one entry per line of the polished child. */
  honest: string[]
  /** Typography shared by the polished child and the honest overlay, so their lines coincide. */
  layerClassName: string
  /** Spacing and layout for the wrapper. Keep margins off the child so the overlay lines up. */
  className?: string
  /** A screen-reader and keyboard toggle; off for short labels such as spec rows. */
  toggle?: boolean
  children: ReactNode
}

function HonestLines({ lines }: { lines: string[] }) {
  return lines.map((line, index) => (
    <span key={index} className="pair-line block">
      {line}
    </span>
  ))
}

export function HonestText({
  honest,
  layerClassName,
  className = '',
  toggle = true,
  children,
}: HonestTextProps) {
  const lens = useLens()
  const layerRef = useRef<HTMLDivElement>(null)
  const [showHonest, setShowHonest] = useState(false)

  useEffect(() => {
    const el = layerRef.current
    if (!el || !lens) return
    return lens.register(el)
  }, [lens])

  return (
    <div
      className={`relative ${className}`}
      onPointerEnter={() => lens?.setActive(true)}
      onPointerLeave={() => lens?.setActive(false)}
    >
      <div hidden={showHonest}>{children}</div>
      {showHonest && (
        <p className={layerClassName} aria-live="polite">
          <HonestLines lines={honest} />
        </p>
      )}
      <div
        ref={layerRef}
        aria-hidden="true"
        className={`honest-layer pointer-events-none absolute inset-x-0 top-0 z-[46] text-accent-ink ${layerClassName}`}
        style={{ clipPath: 'circle(0px at 0px 0px)' }}
      >
        <HonestLines lines={honest} />
      </div>
      {toggle && (
        <button
          type="button"
          onClick={() => setShowHonest((value) => !value)}
          className="honest-toggle mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-muted underline decoration-rule underline-offset-4 transition-colors hover:text-ink"
        >
          {showHonest ? 'Show the polished version' : 'Show the honest version'}
        </button>
      )}
    </div>
  )
}

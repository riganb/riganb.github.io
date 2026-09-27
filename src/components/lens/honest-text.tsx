'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useLens } from '@/components/lens/lens-provider'

type HonestTextProps = {
  honest: string
  layerClassName: string
  className?: string
  fallback?: 'toggle' | 'inline'
  children: ReactNode
}

export function HonestText({
  honest,
  layerClassName,
  className = '',
  fallback = 'toggle',
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
          {honest}
        </p>
      )}
      <div
        ref={layerRef}
        aria-hidden="true"
        className={`honest-layer pointer-events-none absolute inset-x-0 top-0 z-[46] text-accent-ink ${layerClassName}`}
        style={{ clipPath: 'circle(0px at 0px 0px)' }}
      >
        {honest}
      </div>
      {fallback === 'toggle' ? (
        <button
          type="button"
          onClick={() => setShowHonest((value) => !value)}
          className="honest-toggle mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-muted underline decoration-rule underline-offset-4 transition-colors hover:text-ink"
        >
          {showHonest ? 'Show the polished version' : 'Show the honest version'}
        </button>
      ) : (
        <p className="honest-inline mt-1 text-xs italic text-muted">{honest}</p>
      )}
    </div>
  )
}

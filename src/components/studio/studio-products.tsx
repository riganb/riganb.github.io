'use client'

import { useEffect, useState } from 'react'
import { ProductObject } from '@/components/studio/product-object'
import type { StudioProduct } from '@/content/studio'

const CYCLE_MS = 4500

// The product list on the studio's opening sheet, with the floating object beside it. The object
// cycles through the products on its own; hovering a name holds it on that product.
export function StudioProducts({ products }: { products: StudioProduct[] }) {
  const [index, setIndex] = useState(0)
  const [held, setHeld] = useState(false)

  useEffect(() => {
    if (held) return
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % products.length), CYCLE_MS)
    return () => window.clearInterval(timer)
  }, [held, products.length])

  const hold = (next: number | null) => {
    setHeld(next !== null)
    if (next !== null) setIndex(next)
  }

  return (
    <>
      <ol className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, i) => (
          <li
            key={product.slug}
            onPointerEnter={() => hold(i)}
            onPointerLeave={() => hold(null)}
            data-active={i === index || undefined}
            className="studio-product flex items-baseline gap-3"
          >
            <span className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, '0')}</span>
            <span className="font-display text-3xl">{product.name}</span>
          </li>
        ))}
      </ol>
      <ProductObject
        src={`/studio/icons/${products[index].slug}.svg`}
        className="absolute right-[5%] top-[14%] size-[min(24vw,340px)]"
      />
    </>
  )
}

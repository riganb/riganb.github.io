'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, type CSSProperties } from 'react'
import { site } from '@/content/site'

// Each letter sits in a one-line mask with a copy beneath it; on hover the letters roll up to
// their copies one after another (after Motion Primitives TextRoll, done in CSS: .roll in globals.css).
function RollLabel({ text }: { text: string }) {
  return (
    <span className="roll inline-flex">
      <span className="sr-only">{text}</span>
      {[...text].map((char, index) => (
        <span key={index} aria-hidden="true" className="roll-char" style={{ '--i': index } as CSSProperties}>
          <span className="block">{char}</span>
          <span className="block">{char}</span>
        </span>
      ))}
    </span>
  )
}

// On the home page, the link for the section in the middle of the viewport is marked current.
function useActiveSection(ids: string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
          else setActive((current) => (current === entry.target.id ? null : current))
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    for (const section of sections) observer.observe(section)
    return () => observer.disconnect()
  }, [ids, enabled])

  return enabled ? active : null
}

const SECTION_IDS = site.nav.map((link) => link.href.split('#')[1]).filter(Boolean)

export function NavLinks() {
  const active = useActiveSection(SECTION_IDS, usePathname() === '/')

  return (
    <ul className="hidden items-center gap-6 font-mono text-[11px] uppercase tracking-[0.08em] sm:flex">
      {site.nav.map((link) => {
        const current = active !== null && link.href.endsWith(`#${active}`)
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={current ? 'location' : undefined}
              className="nav-link relative inline-flex items-center text-ink-2 transition-colors hover:text-ink aria-[current]:text-ink"
            >
              <span aria-hidden="true" className="nav-dot absolute -left-3 size-1 rounded-full bg-accent" />
              <RollLabel text={link.label} />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

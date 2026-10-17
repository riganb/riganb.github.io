'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

// Page and section entrances (styles in globals.css, all inside prefers-reduced-motion:
// no-preference, so reduced motion and no-JS visitors get the plain page).
// - Page rise: <main> fades up on the first load. Once the visitor navigates, data-navigated turns
//   it off, so it never doubles the view-transition slides between the work index and case studies.
//   The resume opts back in with .page-rise.
// - Section reveal: [data-reveal] sections fade up as they scroll in. Sections already on screen
//   are marked shown before data-reveal-ready is set, so nothing above the fold blinks.
export function PageMotion() {
  const pathname = usePathname()
  const first = useRef(pathname)

  useEffect(() => {
    if (pathname !== first.current) document.documentElement.dataset.navigated = ''
  }, [pathname])

  // The rise moves <main> while scroll-pinned sections measure themselves; a resize event makes
  // ScrollTrigger re-measure once it settles.
  useEffect(() => {
    const main = document.querySelector('main')
    if (!main) return
    const settle = (event: AnimationEvent) => {
      if (event.target === main) window.dispatchEvent(new Event('resize'))
    }
    main.addEventListener('animationend', settle)
    return () => main.removeEventListener('animationend', settle)
  }, [pathname])

  useEffect(() => {
    const root = document.documentElement
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const sections = [...document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])')]
    const show = (el: HTMLElement) => {
      el.dataset.revealed = ''
    }
    for (const el of sections) if (el.getBoundingClientRect().top < innerHeight) show(el)
    root.dataset.revealReady = ''

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          show(entry.target as HTMLElement)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    for (const el of sections) if (!('revealed' in el.dataset)) observer.observe(el)
    return () => observer.disconnect()
  }, [pathname])

  return null
}

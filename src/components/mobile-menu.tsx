'use client'

import Link from 'next/link'
import { useEffect, useRef, type CSSProperties } from 'react'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { site } from '@/content/site'

// Longest close transition in globals.css (.mobile-menu); the dialog closes once it has played.
const CLOSE_MS = 450

// The toggle keeps one width for both labels, so "Menu" and "Close" share a right edge.
const toggleClass = 'w-12 text-right font-mono text-[11px] uppercase tracking-[0.08em]'

export function MobileMenu() {
  const ref = useRef<HTMLDialogElement>(null)
  const closing = useRef<number>(0)

  const open = () => {
    const dialog = ref.current
    if (!dialog || dialog.open) return
    window.clearTimeout(closing.current)
    dialog.showModal()
    document.documentElement.classList.add('menu-open')
    // Reading layout commits the closed styles first, so switching to open runs the curtain.
    void dialog.offsetHeight
    dialog.dataset.state = 'open'
  }

  const close = () => {
    const dialog = ref.current
    if (!dialog?.open || dialog.dataset.state === 'closing') return
    dialog.dataset.state = 'closing'
    // Unlock scrolling straight away so an in-page link can scroll while the curtain lifts.
    document.documentElement.classList.remove('menu-open')
    closing.current = window.setTimeout(() => {
      dialog.close()
      delete dialog.dataset.state
    }, CLOSE_MS)
  }

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    // Escape fires "cancel"; animate out instead of vanishing.
    const onCancel = (event: Event) => {
      event.preventDefault()
      close()
    }
    dialog.addEventListener('cancel', onCancel)
    return () => {
      dialog.removeEventListener('cancel', onCancel)
      window.clearTimeout(closing.current)
      document.documentElement.classList.remove('menu-open')
    }
  }, [])

  return (
    <>
      <button type="button" onClick={open} aria-haspopup="dialog" className={`${toggleClass} text-ink sm:hidden`}>
        Menu
      </button>
      <dialog
        ref={ref}
        aria-label="Menu"
        data-lenis-prevent=""
        className="mobile-menu m-0 h-dvh max-h-none w-screen max-w-none bg-paper p-0 text-ink backdrop:bg-transparent"
      >
        <div className="flex h-full flex-col">
          {/* Mirrors the site header box for box, so opening swaps only the toggle's label. */}
          <div className="border-b border-rule">
            <div className="grid grid-cols-[1fr_auto] items-center gap-6 px-6 py-4">
              <Link href="/" onClick={close} className="justify-self-start text-sm font-semibold tracking-tight">
                {site.name}
              </Link>
              <div className="flex items-center gap-6 justify-self-end">
                <button type="button" onClick={close} className={toggleClass}>
                  Close
                </button>
                <ThemeToggle />
              </div>
            </div>
          </div>
          <nav aria-label="Mobile" className="px-6 pt-12">
            <ul className="space-y-3">
              {site.nav.map((link, index) => (
                <li key={link.href} className="overflow-hidden pb-[0.12em]">
                  <Link
                    href={link.href}
                    onClick={close}
                    style={{ '--i': index } as CSSProperties}
                    className="mobile-menu-link block font-display text-6xl leading-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="mobile-menu-foot mt-auto flex items-center gap-2 px-6 py-6 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-live" />
            {site.status}
          </p>
        </div>
      </dialog>
    </>
  )
}

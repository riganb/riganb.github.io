'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { site } from '@/content/site'

export function MobileMenu() {
  const ref = useRef<HTMLDialogElement>(null)
  const close = () => ref.current?.close()

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        aria-haspopup="dialog"
        className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink sm:hidden"
      >
        Menu
      </button>
      <dialog
        ref={ref}
        aria-label="Menu"
        data-lenis-prevent=""
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-paper p-0 text-ink backdrop:bg-transparent"
      >
        <div className="flex h-full flex-col px-6 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold tracking-tight">{site.name}</span>
            <button
              type="button"
              onClick={close}
              className="font-mono text-[11px] uppercase tracking-[0.08em]"
            >
              Close
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-16">
            <ul className="space-y-3">
              {site.nav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={close} className="font-display text-6xl leading-none">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="mt-auto flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-live" />
            {site.status}
          </p>
        </div>
      </dialog>
    </>
  )
}

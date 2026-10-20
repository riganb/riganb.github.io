'use client'

import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import { lenisRef } from '@/components/smooth-scroll'
import type { Film } from '@/content/services'

// Matches the longest close transition on .film-player in globals.css.
const CLOSE_MS = 420

// Posters until pressed, then the film plays in a dialog with controls, sound and captions while
// the page holds still underneath (after the VeraStack Labs reel). The player grows out of the
// poster that was pressed and shrinks back into it on the way out. Nothing loads before a press.
export function FilmReel({ films, className = 'mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4' }: { films: Film[]; className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const closing = useRef(0)
  const [film, setFilm] = useState<Film | null>(null)
  const [origin, setOrigin] = useState({ x: 0, y: 0 })

  const release = useCallback(() => {
    lenisRef.current?.start()
    document.documentElement.classList.remove('film-open')
    setFilm(null)
  }, [])

  // Every way out (close button, backdrop, Escape) animates first, then closes the dialog.
  const shut = useCallback(() => {
    const d = dialog.current
    if (!d?.open || d.dataset.state === 'closing') return
    video.current?.pause()
    d.dataset.state = 'closing'
    window.clearTimeout(closing.current)
    closing.current = window.setTimeout(() => {
      d.close()
      delete d.dataset.state
      release()
    }, CLOSE_MS)
  }, [release])

  const open = (next: Film, event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
    setFilm(next)
  }

  useEffect(() => {
    const d = dialog.current
    if (!film || !d) return
    window.clearTimeout(closing.current)
    if (!d.open) d.showModal()
    // Grow from the pressed poster: its centre, relative to the dialog's own box.
    // Measured with the closed-state scale switched off for a moment, so the box is the real one.
    d.style.transition = 'none'
    d.style.transform = 'none'
    const box = d.getBoundingClientRect()
    d.style.transformOrigin = `${origin.x - box.left}px ${origin.y - box.top}px`
    d.style.transform = ''
    void d.offsetHeight
    d.style.transition = ''
    void d.offsetHeight
    d.dataset.state = 'open'
    lenisRef.current?.stop()
    document.documentElement.classList.add('film-open')
    void video.current?.play().catch(() => {})

    const onCancel = (event: Event) => {
      event.preventDefault()
      shut()
    }
    d.addEventListener('cancel', onCancel)
    return () => d.removeEventListener('cancel', onCancel)
  }, [film, origin, shut])

  useEffect(() => () => window.clearTimeout(closing.current), [])

  return (
    <>
      <ul className={className}>
        {films.map((item) => (
          <li key={item.id}>
            <figure>
              <button
                type="button"
                onClick={(event) => open(item, event)}
                aria-label={`Play ${item.title}, ${item.length}`}
                className="group relative block aspect-video w-full overflow-hidden rounded-md border border-rule bg-ink"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- static export serves a pre-sized JPEG */}
                <img
                  src={item.poster}
                  alt=""
                  width={1280}
                  height={720}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-ink">
                  {item.length}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 left-3 grid size-11 place-items-center rounded-full bg-accent text-accent-ink transition-transform duration-300 group-hover:scale-110"
                >
                  <svg viewBox="0 0 16 16" className="ml-0.5 size-4" fill="currentColor">
                    <path d="M4 2.5v11l9-5.5z" />
                  </svg>
                </span>
              </button>
              <figcaption className="mt-3">
                <span className="block text-sm text-ink">{item.title}</span>
                {item.note && (
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.08em] text-muted">{item.note}</span>
                )}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={film?.title}
        data-lenis-prevent=""
        onClick={(event) => event.target === event.currentTarget && shut()}
        className="film-player m-auto w-[min(1100px,94vw)] max-w-none overflow-hidden rounded-2xl border border-white/10 bg-[#0d0c0a] p-0 text-[#f4f1ea]"
      >
        {film && (
          <div>
            <video
              ref={video}
              key={film.id}
              src={film.src}
              poster={film.poster}
              controls
              playsInline
              preload="metadata"
              className="block aspect-video max-h-[80vh] w-full bg-black"
            >
              <track kind="captions" src={film.captions} srcLang="en" label="English" default />
            </video>
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 font-mono text-xs">
              <span>
                {film.title} <span className="text-white/50">· {film.length}</span>
                {film.note && <span className="ml-3 text-white/50">{film.note}</span>}
              </span>
              <button
                type="button"
                onClick={shut}
                className="rounded-full border border-white/20 px-3.5 py-1.5 transition-colors hover:border-accent hover:text-accent"
              >
                close <span aria-hidden="true">✕</span>
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}

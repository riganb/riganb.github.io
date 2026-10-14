'use client'

import { useState } from 'react'
import type { Film } from '@/content/services'

// Posters until pressed: nothing autoplays, and each film's video only loads once someone asks
// for it, so the reel costs three small JPEGs on page load.
export function FilmReel({ films }: { films: Film[] }) {
  const [playing, setPlaying] = useState<string | null>(null)

  return (
    <ul className="mt-8 grid gap-5 sm:grid-cols-3">
      {films.map((film) => (
        <li key={film.id}>
          <figure>
            <div className="relative aspect-video overflow-hidden rounded-md border border-rule bg-ink">
              {playing === film.id ? (
                <video
                  src={film.src}
                  poster={film.poster}
                  controls
                  autoPlay
                  playsInline
                  preload="none"
                  className="size-full"
                >
                  <track kind="captions" src={film.captions} srcLang="en" label="English" default />
                </video>
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(film.id)}
                  aria-label={`Play ${film.title}, ${film.length}`}
                  className="group absolute inset-0 block"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export serves a pre-sized JPEG */}
                  <img
                    src={film.poster}
                    alt=""
                    width={1280}
                    height={720}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-ink">
                    {film.length}
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
              )}
            </div>
            <figcaption className="mt-3">
              <span className="block text-sm text-ink">{film.title}</span>
              {film.note && (
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.08em] text-muted">{film.note}</span>
              )}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  )
}

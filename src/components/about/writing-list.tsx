'use client'

import { useRef, useState } from 'react'
import { lenisRef } from '@/components/smooth-scroll'
import type { Article } from '@/content/writing'

const mono = 'font-mono text-[11px] uppercase tracking-[0.08em]'
export const ARTICLES_PER_PAGE = 4

// Every article stays in the markup so crawlers and readers without JavaScript see the full list;
// the pages only hide rows that are off the current page.
export function WritingList({ items }: { items: Article[] }) {
  const [page, setPageState] = useState(0)
  const list = useRef<HTMLUListElement>(null)

  // A shorter page shrinks the list, so bring its top back into view if it has scrolled off.
  const setPage = (next: number) => {
    setPageState(next)
    requestAnimationFrame(() => {
      const el = list.current
      if (!el || el.getBoundingClientRect().top > 80) return
      if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -140 })
      else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140 })
    })
  }
  const pages = Math.ceil(items.length / ARTICLES_PER_PAGE)
  const control = `${mono} rounded-full px-3 py-1.5 transition-colors disabled:pointer-events-none disabled:opacity-35`

  return (
    <>
      <ul ref={list} id="writing-list" className="mt-8 border-t border-ink">
        {items.map((article, index) => (
          <li
            key={article.href}
            hidden={pages > 1 && Math.floor(index / ARTICLES_PER_PAGE) !== page}
            className="border-b border-rule"
          >
            <a
              href={article.href}
              target="_blank"
              rel="noreferrer"
              className="group grid gap-x-10 gap-y-2 py-6 lg:grid-cols-[8rem_minmax(0,1fr)_minmax(0,0.8fr)_auto] lg:items-baseline"
            >
              <span className={`${mono} text-muted`}>
                {article.kind} · {article.date}
              </span>
              <span className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.1] tracking-[-0.01em] transition-colors group-hover:text-accent">
                {article.title}
              </span>
              <span className="text-sm leading-relaxed text-ink-2">{article.line}</span>
              <span aria-hidden="true" className="hidden text-xl transition-colors group-hover:text-accent lg:block">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
      {pages > 1 && (
        <nav aria-label="Writing pages" className="mt-6 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
            aria-controls="writing-list"
            className={`${control} border border-rule hover:border-accent hover:text-accent`}
          >
            <span aria-hidden="true">←</span> Newer
          </button>
          {Array.from({ length: pages }, (_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setPage(index)}
              aria-current={index === page ? 'page' : undefined}
              aria-label={`Page ${index + 1}`}
              aria-controls="writing-list"
              className={`${control} ${index === page ? 'bg-ink text-paper' : 'text-muted hover:text-accent'}`}
            >
              {String(index + 1).padStart(2, '0')}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage(page + 1)}
            disabled={page === pages - 1}
            aria-controls="writing-list"
            className={`${control} border border-rule hover:border-accent hover:text-accent`}
          >
            Older <span aria-hidden="true">→</span>
          </button>
        </nav>
      )}
    </>
  )
}

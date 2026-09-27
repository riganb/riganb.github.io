import type { CaseStudy } from '@/content/case-studies'

export function Highlights({ items }: { items: CaseStudy['highlights'] }) {
  return (
    <section aria-labelledby="highlights-title" className="border-b border-rule">
      <div className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-28">
        <h2 id="highlights-title" className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
          {'// Highlights'}
        </h2>
        <ul className="mt-8 grid gap-x-8 gap-y-10 border-t border-ink pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.title}>
              <h3 className="font-display text-2xl leading-tight md:text-3xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

import { DecryptText } from '@/components/motion/decrypt-text'
import { writing } from '@/content/writing'

const mono = 'font-mono text-[11px] uppercase tracking-[0.08em]'

// Bylined posts on the studio blog: one row each, opening on verastack.dev.
export function WritingSection() {
  return (
    <section data-enter="" aria-labelledby="writing-title" className="border-b border-rule">
      <div className="mx-auto max-w-[1320px] px-6 pb-4 pt-24 md:px-10 md:pt-28">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 id="writing-title" className={`${mono} text-muted`}>
            <DecryptText text={writing.label} />
          </h2>
          <p className={`${mono} text-muted`}>{writing.note}</p>
        </div>
        <ul className="mt-8 border-t border-ink">
          {writing.items.map((article) => (
            <li key={article.href} className="border-b border-rule">
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
        <a
          href={writing.founderPage.href}
          target="_blank"
          rel="noreferrer"
          className={`${mono} mt-6 mb-20 inline-block text-muted underline decoration-rule underline-offset-4 transition-colors hover:text-accent`}
        >
          {writing.founderPage.label} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  )
}

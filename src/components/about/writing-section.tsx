import { DecryptText } from '@/components/motion/decrypt-text'
import { WritingList } from '@/components/about/writing-list'
import { writing } from '@/content/writing'

const mono = 'font-mono text-[11px] uppercase tracking-[0.08em]'

// Bylined posts on the studio blog: one row each, opening on verastack.dev, four to a page.
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
        <WritingList items={writing.items} />
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

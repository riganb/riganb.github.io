import { DecryptText } from '@/components/motion/decrypt-text'
import { faq } from '@/content/faq'

// Plain questions and answers, all in the HTML: the easiest passages for an answer engine to quote.
export function FaqSection() {
  return (
    <section data-enter="" aria-labelledby="faq-title" className="border-b border-rule">
      <div className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-28">
        <h2 id="faq-title" className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
          <DecryptText text={faq.label} />
        </h2>
        <dl className="mt-8 border-t border-ink">
          {faq.items.map((item) => (
            <div key={item.q} className="grid gap-x-10 gap-y-3 border-b border-rule py-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
              <dt className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.1] tracking-[-0.01em]">{item.q}</dt>
              <dd className="max-w-[60ch] leading-relaxed text-ink-2 lg:pt-1">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

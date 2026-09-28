import { DecryptText } from '@/components/motion/decrypt-text'
import { HalftonePortrait } from '@/components/about/halftone-portrait'
import { Emphasis } from '@/components/typography/emphasis'
import { journey } from '@/content/about'

export function Journey() {
  return (
    <section id="journey" aria-labelledby="journey-title" className="border-b border-rule">
      <div className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted"><DecryptText text={journey.label} /></p>
        <h2 id="journey-title" className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-[-0.02em]">
          <Emphasis text={journey.title} />
        </h2>
        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <ol className="border-t border-ink">
            {journey.rows.map((row) => (
              <li
                key={row.what}
                className="grid grid-cols-[6.5rem_1fr] gap-x-5 border-b border-rule py-5 sm:grid-cols-[9rem_1fr]"
              >
                <span className="pt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{row.when}</span>
                <div>
                  <p className="font-display text-2xl leading-tight md:text-3xl">{row.what}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">{row.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <HalftonePortrait alt={journey.portraitAlt} className="w-full max-w-md lg:justify-self-end" />
        </div>
      </div>
    </section>
  )
}

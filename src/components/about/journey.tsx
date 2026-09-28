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
          {/* A hand-drawn nudge toward the portrait, so visitors find its hover. It shows only where the
              hover exists (fine pointers, motion allowed) and steps aside while the portrait is hovered. */}
          <div className="group relative w-full max-w-md lg:justify-self-end">
            <div
              aria-hidden="true"
              className="portrait-nudge pointer-events-none absolute bottom-[calc(100%-0.25rem)] right-[calc(100%-0.25rem)] z-10 flex-col items-start transition-opacity duration-300 group-hover:opacity-0"
            >
              <span className="-rotate-6 whitespace-nowrap font-display text-3xl italic text-accent">{journey.nudge}</span>
              <svg viewBox="0 0 96 72" className="portrait-nudge-arrow -mt-1 ml-16 h-[4.5rem] w-24 text-accent" fill="none">
                <path d="M10 8 C 44 8, 74 26, 86 62" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" pathLength="1" />
                <path d="M74 55 L 86 63 L 90 49" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" pathLength="1" />
              </svg>
            </div>
            <HalftonePortrait alt={journey.portraitAlt} className="w-full" />
          </div>
        </div>
      </div>
    </section>
  )
}

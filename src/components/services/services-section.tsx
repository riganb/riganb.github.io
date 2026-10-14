import Link from 'next/link'
import { HonestText } from '@/components/lens/honest-text'
import { DecryptText } from '@/components/motion/decrypt-text'
import { RevealLines } from '@/components/motion/reveal-lines'
import { FilmReel } from '@/components/services/film-reel'
import { services, type ServiceProof } from '@/content/services'

const heading = 'font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em]'
const mono = 'font-mono text-[11px] uppercase tracking-[0.08em]'

function Proof({ proof }: { proof: ServiceProof }) {
  if (!proof.href) return <span>{proof.text}</span>
  const link = 'underline decoration-rule underline-offset-4 transition-colors hover:text-accent'
  // A file such as llms.txt is not a page, so it gets a plain link rather than client navigation.
  if (/\.[a-z]+$/.test(proof.href)) return <a href={proof.href} className={link}>{proof.text}</a>
  // In-site proof (case studies, llms.txt) stays on the portfolio; nothing here leaves the page.
  return (
    <Link href={proof.href} className={link}>
      {proof.text}
    </Link>
  )
}

// What Rigan takes on: coaching one-to-one, and the rest through VeraStack Labs. Sits between
// the work index (the proof) and the studio chapter (who does the work).
export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-title" className="border-b border-rule">
      <div className="mx-auto max-w-[1320px] px-6 pb-10 pt-24 md:px-10 md:pt-32">
        <p className={`${mono} text-muted`}>
          <DecryptText text={services.label} />
        </p>
        <HonestText honest={services.heading.honest} layerClassName={heading} className="mt-4">
          <RevealLines as="h2" id="services-title" lines={services.heading.lines} className={heading} />
        </HonestText>
        <p className="mt-6 max-w-[56ch] leading-relaxed text-ink-2">{services.note}</p>
      </div>

      <ol className="border-t border-ink">
        {services.items.map((service, index) => (
          <li key={service.id} id={`service-${service.id}`} className="border-b border-rule">
            <div className="mx-auto grid max-w-[1320px] grid-cols-[2.5rem_1fr] gap-x-4 px-6 py-8 md:px-10 lg:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-x-10 lg:py-10">
              <span className={`${mono} pt-2 text-muted`}>{String(index + 1).padStart(2, '0')}</span>
              <h3 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.05] tracking-[-0.01em]">
                {service.name}
              </h3>
              <div className="col-start-2 mt-3 lg:col-start-3 lg:row-start-1 lg:mt-0">
                <p className="max-w-[58ch] leading-relaxed text-ink-2">{service.blurb}</p>
                <p className={`${mono} mt-4 text-muted`}>
                  {service.proof.map((proof, i) => (
                    <span key={proof.text}>
                      {i > 0 && <span aria-hidden="true"> · </span>}
                      <Proof proof={proof} />
                    </span>
                  ))}
                </p>
                {service.offer && (
                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                    <span className="rounded-full bg-fill px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-fill-ink">
                      {service.offer.line}
                    </span>
                    <a
                      href={service.offer.cta.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-ink px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
                    >
                      {service.offer.cta.label} <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                )}
              </div>
              {service.films && (
                <div className="col-span-full mt-2 lg:col-span-2 lg:col-start-2">
                  <FilmReel films={services.films} />
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>

      <a
        href={services.cta.href}
        target="_blank"
        rel="noreferrer"
        className="group mx-auto flex max-w-[1320px] items-center justify-between px-6 py-10 md:px-10"
      >
        <span className="font-display text-[clamp(2rem,5vw,4rem)] leading-none tracking-[-0.02em] transition-colors group-hover:text-accent">
          {services.cta.label}
        </span>
        <span aria-hidden="true" className="text-3xl transition-transform group-hover:translate-x-2">
          →
        </span>
      </a>
    </section>
  )
}

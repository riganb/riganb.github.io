import { DecryptText } from '@/components/motion/decrypt-text'
import { Magnet } from '@/components/contact/magnet'
import { NoteForm } from '@/components/contact/note-form'
import { ResumeCorner } from '@/components/contact/resume-corner'
import { HonestText } from '@/components/lens/honest-text'
import { RevealLines } from '@/components/motion/reveal-lines'
import { contact } from '@/content/about'
import { site } from '@/content/site'

const signOff = 'font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.92] tracking-[-0.02em]'

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title">
      <div className="mx-auto max-w-[1320px] px-6 py-28 md:px-10 md:py-40">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted"><DecryptText text={contact.label} /></p>
        <HonestText honest={contact.signOff.honest} layerClassName={signOff} className="mt-6">
          <RevealLines as="h2" id="contact-title" lines={contact.signOff.lines} className={signOff} />
        </HonestText>
        <div className="mt-16 grid items-end gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Magnet>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-4 rounded-full bg-ink px-7 py-4 font-display text-[clamp(1.35rem,2.8vw,2.4rem)] leading-none text-paper transition-colors hover:bg-accent hover:text-accent-ink"
              >
                {site.email}
                <span aria-hidden="true">→</span>
              </a>
            </Magnet>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{contact.emailCaption}</p>
            <NoteForm />
          </div>
          <div className="grid gap-8">
            <ul className="border-t border-ink">
              {site.socials.map((social) => (
                <li key={social.href} className="border-b border-rule py-4">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-baseline justify-between font-display text-3xl leading-none transition-colors hover:text-accent"
                  >
                    {social.label}
                    <span aria-hidden="true" className="text-xl">
                      ↗
                    </span>
                  </a>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{social.caption}</p>
                </li>
              ))}
            </ul>
            <ResumeCorner />
          </div>
        </div>
      </div>
    </section>
  )
}

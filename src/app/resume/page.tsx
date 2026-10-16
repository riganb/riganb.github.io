import type { Metadata } from 'next'
import { Fragment } from 'react'
import { HonestText } from '@/components/lens/honest-text'
import { resume } from '@/content/resume'
import { site } from '@/content/site'
import { splitEmphasis } from '@/lib/emphasis'
import { resumeSearchTitle } from '@/lib/structured-data'

const description = `${site.name}, founder of VeraStack Labs. ${resume.facts.map((fact) => `${fact.value} ${fact.caption.lines.join(' ')}`).join(' ')}`

export const metadata: Metadata = {
  title: resumeSearchTitle(),
  description,
  alternates: { canonical: '/resume/' },
  openGraph: { title: resumeSearchTitle(), description, url: '/resume/', type: 'profile', siteName: site.name, images: [site.ogImage] },
  twitter: { card: 'summary_large_image', title: resumeSearchTitle(), description, images: [site.ogImage] },
}

const mono = 'font-mono text-[11px] uppercase tracking-[0.08em]'
const pill = `${mono} inline-flex items-center gap-2 rounded-full px-4 py-2 transition-colors`
const caption = 'text-[15px] leading-relaxed'
const link = 'underline decoration-rule underline-offset-4 transition-colors hover:text-accent'

// Numbers wrapped in *emphasis* are the proof, so they carry the accent and nothing else does.
function Proof({ text }: { text: string }) {
  return splitEmphasis(text).map((segment, index) =>
    segment.em ? (
      <strong key={index} className="font-semibold text-accent">
        {segment.text}
      </strong>
    ) : (
      <Fragment key={index}>{segment.text}</Fragment>
    ),
  )
}

const profiles = [
  { label: 'LinkedIn', href: site.socials[1].href },
  { label: 'GitHub', href: site.socials[0].href },
  { label: 'riganb.github.io', href: site.url },
  { label: 'verastack.dev', href: 'https://verastack.dev' },
]

export default function ResumePage() {
  return (
    <main id="main" className="resume-page">
      <div className="mx-auto max-w-[1100px] px-6 pb-24 pt-32 md:px-10 md:pt-40">
        <div className="resume-head flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <p className={`${mono} text-muted`}>{resume.updated}</p>
            <h1 className="resume-name mt-3 font-display text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[-0.02em]">
              {site.name}
            </h1>
            <p className={`${mono} mt-4 text-ink-2`}>{resume.role}</p>
            <p className={`${mono} print-only mt-2 text-ink-2`}>
              <a href={`mailto:${site.email}`}>{site.email}</a> · <a href={site.call.href}>{resume.phone}</a> ·{' '}
              <a href={profiles[0].href}>linkedin.com/in/rigan-burnwal</a> · <a href={site.url}>riganb.github.io</a>
            </p>
          </div>
          <div className="print-hide flex flex-wrap gap-3">
            <a href={site.call.href} target="_blank" rel="noreferrer" className={`${pill} bg-accent text-accent-ink hover:bg-ink hover:text-paper`}>
              {site.call.label} <span aria-hidden="true">↗</span>
            </a>
            <a href="/resume.pdf" download className={`${pill} border border-ink hover:border-accent hover:text-accent`}>
              PDF <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <section aria-label="Three numbers" className="resume-band mt-14 grid border-y border-ink md:grid-cols-[1.4fr_1fr_1fr]">
          {resume.facts.map((fact, index) => (
            <div key={fact.id} className="resume-fact border-rule py-7 max-md:[&+&]:border-t md:px-7 md:first:pl-0 md:[&+&]:border-l">
              <a href={`#${fact.target}`} className={`resume-num block font-display text-[clamp(4rem,9vw,6.5rem)] leading-[0.85] tracking-[-0.03em]${index === 0 ? ' text-accent' : ' hover:text-accent'} transition-colors`}>
                {fact.value}
              </a>
              <HonestText honest={fact.caption.honest} layerClassName={caption} toggle={false} className="resume-caption mt-4 max-w-[34ch]">
                <p className={`${caption} text-ink-2`}>{fact.caption.lines[0]}</p>
              </HonestText>
            </div>
          ))}
        </section>

        <p className={`${mono} resume-press mt-5 text-muted`}>
          In the press:{' '}
          {resume.press.map((item, i) => (
            <span key={item.href}>
              {i > 0 && <span aria-hidden="true"> · </span>}
              <a href={item.href} target="_blank" rel="noreferrer" className={link}>
                {item.label}
              </a>
            </span>
          ))}
        </p>

        <section aria-labelledby="experience" className="mt-20">
          <h2 id="experience" className={`${mono} border-b border-ink pb-3 text-muted`}>
            Experience
          </h2>
          <ol>
            {resume.roles.map((role) => (
              <li key={role.id} id={role.id} className="resume-role grid scroll-mt-28 gap-x-6 gap-y-1 border-b border-rule py-6 md:grid-cols-[7rem_1fr]">
                <span className={`${mono} pt-1 text-muted`}>{role.when}</span>
                <div>
                  <h3 className="text-lg font-semibold">{role.what}</h3>
                  {role.lines.map((line) => (
                    <p key={line} className="mt-1.5 max-w-[70ch] leading-relaxed text-ink-2">
                      <Proof text={line} />
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="builds" className="mt-14">
          <h2 id="builds" className={`${mono} border-b border-ink pb-3 text-muted`}>
            Selected builds
          </h2>
          <ul className="resume-also">
            {resume.builds.map((item) => (
              <li key={item} className="border-b border-rule py-3 leading-relaxed text-ink-2">
                <Proof text={item} />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="skills" className="mt-14">
          <h2 id="skills" className={`${mono} border-b border-ink pb-3 text-muted`}>
            Skills
          </h2>
          <dl className="resume-skills">
            {resume.skills.map((group) => (
              <div key={group.title} className="grid gap-x-6 gap-y-1 border-b border-rule py-3 md:grid-cols-[9rem_1fr]">
                <dt className={`${mono} pt-1 text-muted`}>{group.title}</dt>
                <dd className="leading-relaxed text-ink-2">{group.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="also" className="mt-14">
          <h2 id="also" className={`${mono} border-b border-ink pb-3 text-muted`}>
            Education and more
          </h2>
          <ul className="resume-also resume-also-pairs">
            {resume.also.map((item) => (
              <li key={item} className={`border-b border-rule py-3 leading-relaxed text-ink-2${resume.screenOnly.includes(item) ? ' print-hide' : ''}`}>
                <Proof text={item} />
              </li>
            ))}
          </ul>
        </section>

        <p className={`${mono} resume-links print-hide mt-12 flex flex-wrap gap-x-6 gap-y-2 text-muted`}>
          <a href={`mailto:${site.email}`} className={link}>
            {site.email}
          </a>
          {profiles.map((profile) => (
            <a key={profile.href} href={profile.href} target="_blank" rel="noreferrer" className={link}>
              {profile.label}
            </a>
          ))}
        </p>
      </div>
    </main>
  )
}

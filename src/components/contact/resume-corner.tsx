import { contact } from '@/content/about'
import { site } from '@/content/site'

// A paper card whose bottom-right corner folds back on hover to show the PDF underneath.
export function ResumeCorner() {
  return (
    <a
      href={site.resume}
      target="_blank"
      rel="noreferrer"
      className="resume-corner relative block overflow-hidden rounded-md border border-rule bg-paper-2 p-6"
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{contact.resume.caption}</span>
      <span className="mt-8 block font-display text-4xl leading-none">{contact.resume.label}</span>
      <span aria-hidden="true" className="resume-fold absolute bottom-0 right-0" />
      <span
        aria-hidden="true"
        className="resume-tag absolute bottom-3 right-3 font-mono text-[11px] uppercase tracking-[0.08em] text-accent-ink"
      >
        PDF ↓
      </span>
    </a>
  )
}

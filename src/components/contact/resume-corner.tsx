import Link from 'next/link'
import { contact } from '@/content/about'

// A paper card whose bottom-right corner folds back on hover to reveal the way in. The PDF sits
// under it as a plain link, for anyone who wants the file rather than the page.
export function ResumeCorner() {
  return (
    <div>
      <Link href="/resume/" className="resume-corner relative block overflow-hidden rounded-md border border-rule bg-paper-2 p-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{contact.resume.caption}</span>
        <span className="mt-8 block font-display text-4xl leading-none">{contact.resume.label}</span>
        <span aria-hidden="true" className="resume-fold absolute bottom-0 right-0" />
        <span aria-hidden="true" className="resume-tag absolute bottom-3 right-3 font-mono text-[11px] uppercase tracking-[0.08em] text-accent-ink">
          {contact.resume.tag}
        </span>
      </Link>
      <a
        href="/resume.pdf"
        download
        className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.08em] text-muted underline decoration-rule underline-offset-4 transition-colors hover:text-accent"
      >
        {contact.resume.pdf} <span aria-hidden="true">↓</span>
      </a>
    </div>
  )
}

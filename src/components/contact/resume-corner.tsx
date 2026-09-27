import { contact } from '@/content/about'

// A paper card whose bottom-right corner folds back on hover. It links nowhere until the new
// resume exists; the fold then reveals a note saying so.
export function ResumeCorner() {
  return (
    <div className="resume-corner relative block overflow-hidden rounded-md border border-rule bg-paper-2 p-6">
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{contact.resume.caption}</span>
      <span className="mt-8 block font-display text-4xl leading-none">{contact.resume.label}</span>
      <span aria-hidden="true" className="resume-fold absolute bottom-0 right-0" />
      <span className="resume-tag absolute bottom-3 right-3 font-mono text-[11px] uppercase tracking-[0.08em] text-accent-ink">
        {contact.resume.tag}
      </span>
    </div>
  )
}

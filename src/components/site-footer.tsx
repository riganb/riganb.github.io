import { contact } from '@/content/about'
import { site } from '@/content/site'

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-3 px-6 py-8 font-mono text-[11px] uppercase tracking-[0.08em] text-muted md:flex-row md:items-center md:justify-between md:px-10">
        <p>{contact.footer}</p>
        <p>© 2026 {site.name}</p>
        <a href="#main" className="transition-colors hover:text-ink">
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}

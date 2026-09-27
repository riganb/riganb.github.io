import Link from 'next/link'
import { MobileMenu } from '@/components/mobile-menu'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { site } from '@/content/site'

export function SiteNav() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur-sm"
      style={{ viewTransitionName: 'site-header' }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto grid max-w-[1320px] grid-cols-[1fr_auto] items-center gap-6 px-6 py-4 md:grid-cols-[1fr_auto_1fr] md:px-10"
      >
        <Link href="/" className="justify-self-start text-sm font-semibold tracking-tight">
          {site.name}
        </Link>
        <p className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted md:flex">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-live" />
          {site.status}
        </p>
        <div className="flex items-center gap-6 justify-self-end">
          <ul className="hidden items-center gap-6 font-mono text-[11px] uppercase tracking-[0.08em] sm:flex">
            {site.nav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-ink-2 transition-colors hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <MobileMenu />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}

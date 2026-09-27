import { sideProjects } from '@/content/about'

export function SideProjects() {
  return (
    <section aria-labelledby="side-projects-title" className="border-b border-rule">
      <div className="mx-auto max-w-[1320px] px-6 pb-4 pt-24 md:px-10 md:pt-32">
        <h2 id="side-projects-title" className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
          {sideProjects.label}
        </h2>
      </div>
      <div className="mx-auto grid max-w-[1320px] border-t border-ink md:grid-cols-2">
        {sideProjects.items.map((project) => (
          <article
            key={project.name}
            className="border-b border-rule px-6 py-10 last:border-b-0 md:border-b-0 md:px-10 md:py-14 md:first:border-r"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{project.kind}</p>
            <h3 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] leading-none tracking-[-0.01em]">
              {project.name}
            </h3>
            <p className="mt-5 max-w-[48ch] leading-relaxed text-ink-2">{project.body}</p>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{project.stack.join(' · ')}</p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-rule px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors hover:border-accent hover:text-accent"
                  >
                    {link.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

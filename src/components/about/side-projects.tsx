import { DecryptText } from '@/components/motion/decrypt-text'
import { sideProjects } from '@/content/about'

export function SideProjects() {
  return (
    <section data-reveal="" aria-labelledby="side-projects-title" className="border-b border-rule">
      <div className="mx-auto max-w-[1320px] px-6 pb-4 pt-24 md:px-10 md:pt-32">
        <h2 id="side-projects-title" className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
          <DecryptText text={sideProjects.label} />
        </h2>
      </div>
      <div className="mx-auto grid max-w-[1320px] border-t border-ink md:grid-cols-2">
        {sideProjects.items.map((project) => (
          <article
            data-spotlight=""
            key={project.name}
            className="spot-surface border-b border-rule px-6 py-10 last:border-b-0 md:border-b-0 md:px-10 md:py-14 md:first:border-r"
          >
            <span aria-hidden="true" className="spot" />
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
      {/* The Claude Code mods: smaller tools, so a row of compact cards under the two projects. */}
      <div className="mx-auto max-w-[1320px] border-t border-rule">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-6 pt-10 md:px-10">
          <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-none tracking-[-0.01em]">
            {sideProjects.mods.label}
          </h3>
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{sideProjects.mods.note}</p>
        </div>
        <ul className="mt-8 grid border-t border-rule md:grid-cols-3">
          {sideProjects.mods.items.map((mod) => (
            <li key={mod.name} className="border-b border-rule last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
              <a
                href={mod.href}
                data-spotlight=""
                target="_blank"
                rel="noreferrer"
                className="spot-surface group flex h-full flex-col px-6 py-8 transition-colors hover:bg-paper-2 md:px-10"
              >
                <span aria-hidden="true" className="spot" />
                <span className="flex items-center justify-between gap-4">
                  <span className="font-mono text-base tracking-tight transition-colors group-hover:text-accent">
                    {mod.name}
                  </span>
                  <span className="rounded-full border border-rule px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
                    {mod.trigger}
                  </span>
                </span>
                <span className="mt-4 block flex-1 text-sm leading-relaxed text-ink-2">{mod.body}</span>
                <span className="mt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-muted transition-colors group-hover:text-accent">
                  GitHub <span aria-hidden="true">↗</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

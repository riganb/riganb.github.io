import { toolbox } from '@/content/about'

export function Toolbox() {
  return (
    <section aria-labelledby="toolbox-title" className="border-b border-rule">
      <div className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-28">
        <h2 id="toolbox-title" className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
          {toolbox.label}
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-ink pt-8 md:grid-cols-4">
          {toolbox.columns.map((column) => (
            <div key={column.title}>
              <h3 className="font-display text-2xl leading-none md:text-3xl">{column.title}</h3>
              <ul className="mt-5 space-y-2 font-mono text-[12px] uppercase tracking-[0.06em] text-ink-2">
                {column.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

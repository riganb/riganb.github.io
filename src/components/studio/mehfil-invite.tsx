// An invite as Mehfil draws it: cream surfaces, ink borders, a hard offset shadow and saffron for the yes.
export function MehfilInvite() {
  return (
    <div aria-hidden="true" className="mx-auto w-full max-w-sm -rotate-2">
      <div className="rounded-xl border-[3px] border-ink bg-paper-2 p-5 shadow-[6px_6px_0_0_var(--ink)]">
        <div className="flex items-center justify-between">
          <span className="rounded-full border-[3px] border-ink bg-accent px-3 py-0.5 text-xs font-bold uppercase tracking-wide text-accent-ink">
            Live
          </span>
          <span className="font-mono text-xs text-ink-2">in 10 min</span>
        </div>
        <p className="mt-4 text-3xl font-black leading-none tracking-tight">Chai break</p>
        <p className="mt-1 text-sm font-semibold text-ink-2">Canteen, ground floor</p>
        <div className="mt-5 flex -space-x-2">
          {['A', 'R', 'S', 'K'].map((initial) => (
            <span
              key={initial}
              className="grid size-9 place-items-center rounded-full border-[3px] border-ink bg-paper text-sm font-bold"
            >
              {initial}
            </span>
          ))}
          <span className="grid size-9 place-items-center rounded-full border-[3px] border-ink bg-fill text-xs font-bold text-fill-ink">
            +3
          </span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <span className="rounded-lg border-[3px] border-ink bg-fill py-2 text-center text-sm font-bold text-fill-ink shadow-[3px_3px_0_0_var(--ink)]">
            I&apos;m in
          </span>
          <span className="rounded-lg border-[3px] border-ink bg-paper py-2 text-center text-sm font-bold">
            Can&apos;t today
          </span>
        </div>
      </div>
    </div>
  )
}

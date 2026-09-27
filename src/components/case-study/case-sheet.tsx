import { CaseMedia } from '@/components/case-study/case-media'
import { Metrics } from '@/components/case-study/metrics'
import type { Sheet } from '@/content/case-studies'

export function CaseSheet({ sheet, index }: { sheet: Sheet; index: number }) {
  const metrics = sheet.metrics && <Metrics metrics={sheet.metrics} note={sheet.metricsNote} />

  return (
    <div className="mx-auto grid min-h-screen max-w-[1320px] items-center gap-12 px-6 py-24 md:px-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
          {String(index + 1).padStart(2, '0')} / {sheet.label}
        </p>
        <h3 className="mt-6 font-display text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.95] tracking-[-0.02em]">
          {sheet.title}
        </h3>
        {sheet.body.map((paragraph) => (
          <p key={paragraph} className="mt-5 max-w-[50ch] leading-relaxed text-ink-2">
            {paragraph}
          </p>
        ))}
        {sheet.media && metrics && <div className="mt-10">{metrics}</div>}
      </div>
      <div>{sheet.media ? <CaseMedia media={sheet.media} /> : metrics}</div>
    </div>
  )
}

import { Odometer } from '@/components/motion/odometer'
import type { Metric } from '@/content/case-studies'

export function Metrics({ metrics, note }: { metrics: Metric[]; note?: string }) {
  return (
    <div>
      <dl className="border-t border-ink">
        {metrics.map((metric) => (
          <div key={metric.label} className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-rule py-4">
            <dt className="text-sm text-ink-2 md:text-base">{metric.label}</dt>
            <dd className="font-mono text-sm tabular-nums md:text-base">
              {metric.before && (
                <>
                  <span className="text-muted line-through">{metric.before}</span>
                  <span aria-hidden="true" className="mx-3 text-muted">
                    →
                  </span>
                  <span className="sr-only"> to </span>
                </>
              )}
              <Odometer value={metric.value} className="text-accent" />
            </dd>
          </div>
        ))}
      </dl>
      {note && <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{note}</p>}
    </div>
  )
}

import { HonestText } from '@/components/lens/honest-text'
import { LensZone } from '@/components/lens/lens-zone'
import { Odometer } from '@/components/motion/odometer'
import { specSheet } from '@/content/home'

export function SpecSheet() {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{specSheet.label}</p>
      <LensZone className="mt-4">
        <dl className="border border-rule bg-paper">
          {specSheet.rows.map((row) => (
            <div
              key={row.value}
              className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-rule px-4 py-3 last:border-b-0"
            >
              <dt>
                <HonestText honest={row.honest} layerClassName="text-sm" toggle={false}>
                  <span className="pair-line block text-sm">{row.lines[0]}</span>
                </HonestText>
              </dt>
              <dd className="font-mono text-sm">
                <Odometer value={row.value} />
              </dd>
            </div>
          ))}
        </dl>
      </LensZone>
    </div>
  )
}

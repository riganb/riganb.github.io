import { HonestText } from '@/components/lens/honest-text'
import { LensZone } from '@/components/lens/lens-zone'
import { Odometer } from '@/components/motion/odometer'
import { specSheet } from '@/content/home'

export function SpecSheet() {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{specSheet.label}</p>
      <dl className="mt-4 border border-rule bg-paper">
        {specSheet.rows.map((row) => (
          <div key={row.value} className="grid grid-cols-2 items-baseline border-b border-rule last:border-b-0">
            {/* The label half is the lens zone: padded to the row's full height so the zones stack
                edge to edge down the card, while the values half, with no honest copy, is left out. */}
            <dt>
              <LensZone className="py-3 pl-4 pr-2">
                <HonestText honest={row.honest} layerClassName="text-sm" toggle={false}>
                  <span className="pair-line block text-sm">{row.lines[0]}</span>
                </HonestText>
              </LensZone>
            </dt>
            <dd className="py-3 pl-2 pr-4 text-right font-mono text-sm">
              <Odometer value={row.value} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

import { BlueprintGrid } from '@/components/home/blueprint-grid'
import { SpecSheet } from '@/components/home/spec-sheet'
import { HonestText } from '@/components/lens/honest-text'
import { SplitLines } from '@/components/motion/split-lines'
import { Emphasis } from '@/components/typography/emphasis'
import { hero } from '@/content/home'

const headline =
  'max-w-[14ch] text-balance font-display text-[clamp(3rem,8.4vw,7.5rem)] leading-[0.92] tracking-[-0.02em]'

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="border-b border-rule">
      <div className="mx-auto grid max-w-[1320px] md:grid-cols-[1.5fr_1fr]">
        <div className="px-6 pb-16 pt-36 md:border-r md:border-rule md:px-10 md:pb-20 md:pt-44">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{hero.label}</p>
          <HonestText honest={hero.headline.honest} layerClassName={headline} className="mt-5">
            <SplitLines as="h1" id="hero-title" className={headline}>
              <Emphasis text={hero.headline.text} />
            </SplitLines>
          </HonestText>
          <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-ink-2">{hero.lede}</p>
        </div>
        <div className="relative border-t border-rule px-6 py-12 md:border-t-0 md:px-8 md:pb-20 md:pt-44">
          <BlueprintGrid className="absolute inset-0 size-full" />
          <div className="relative">
            <SpecSheet />
          </div>
        </div>
      </div>
    </section>
  )
}

import { HonestText } from '@/components/lens/honest-text'
import { ScrollFill } from '@/components/motion/scroll-fill'
import { statement } from '@/content/home'

const type =
  'max-w-[26ch] text-balance font-display text-[clamp(2rem,4.6vw,4rem)] leading-[1.08] tracking-[-0.01em]'

export function Statement() {
  return (
    <section id="about" aria-label="About" className="border-b border-rule">
      <div className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-36">
        <HonestText honest={statement.honest} layerClassName={type}>
          <ScrollFill text={statement.text} className={type} />
        </HonestText>
      </div>
    </section>
  )
}

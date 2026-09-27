import { Emphasis } from '@/components/typography/emphasis'
import { site } from '@/content/site'

export default function Home() {
  return (
    <main id="main" className="mx-auto max-w-[1320px] px-6 pb-24 pt-40 md:px-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{site.hero.label}</p>
      <h1 className="mt-4 max-w-[14ch] font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.92] tracking-[-0.02em]">
        <Emphasis text={site.hero.headline.text} />
      </h1>
      <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-2">{site.hero.lede}</p>
    </main>
  )
}

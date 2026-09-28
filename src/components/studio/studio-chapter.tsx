import { DecryptText } from '@/components/motion/decrypt-text'
import { StoryScroll, StorySheet } from '@/components/motion/story-scroll'
import { ProductSheet } from '@/components/studio/product-sheet'
import { Emphasis } from '@/components/typography/emphasis'
import { studio } from '@/content/studio'
import { paletteStyle } from '@/styles/products'

export function StudioChapter() {
  return (
    <section id="studio" aria-labelledby="studio-title">
      <StoryScroll label="VeraStack Labs products">
        <StorySheet label="VeraStack Labs">
          <div className="mx-auto flex min-h-screen max-w-[1320px] flex-col justify-center px-6 py-24 md:px-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted"><DecryptText text={studio.label} /></p>
            <h2
              id="studio-title"
              className="mt-6 font-display text-[clamp(3.5rem,11vw,10rem)] leading-[0.88] tracking-[-0.03em]"
            >
              <Emphasis text={studio.title} />
            </h2>
            <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-ink-2">{studio.line}</p>
            <div className="mt-14 border-t border-ink pt-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{studio.productsLabel}</p>
              <ol className="mt-3 grid gap-2 sm:grid-cols-3">
                {studio.products.map((product, index) => (
                  <li key={product.slug} className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] text-muted">{String(index + 1).padStart(2, '0')}</span>
                    <span className="font-display text-3xl">{product.name}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </StorySheet>
        {studio.products.map((product, index) => (
          <StorySheet key={product.slug} label={product.name} style={paletteStyle(product.slug)}>
            <ProductSheet product={product} index={index} />
          </StorySheet>
        ))}
      </StoryScroll>
      <div className="border-y border-rule">
        <a
          href={studio.link.href}
          target="_blank"
          rel="noreferrer"
          className="group mx-auto flex max-w-[1320px] items-center justify-between px-6 py-10 md:px-10"
        >
          <span className="font-display text-[clamp(2rem,5vw,4rem)] leading-none tracking-[-0.02em]">
            {studio.link.label}
          </span>
          <span aria-hidden="true" className="text-3xl transition-transform group-hover:translate-x-2">
            →
          </span>
        </a>
      </div>
    </section>
  )
}

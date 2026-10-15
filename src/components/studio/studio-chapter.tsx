import { DecryptText } from '@/components/motion/decrypt-text'
import { BigLink } from '@/components/motion/big-link'
import { StoryScroll, StorySheet } from '@/components/motion/story-scroll'
import { ProductSheet } from '@/components/studio/product-sheet'
import { StudioProducts } from '@/components/studio/studio-products'
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
              <StudioProducts products={studio.products} />
            </div>
          </div>
        </StorySheet>
        {studio.products.map((product, index) => (
          <StorySheet key={product.slug} label={product.name} style={paletteStyle(product.slug)}>
            <ProductSheet product={product} index={index} />
          </StorySheet>
        ))}
      </StoryScroll>
      <BigLink href={studio.link.href} label={studio.link.label} ticker={studio.products.map((product) => product.name)} />
    </section>
  )
}

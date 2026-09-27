import { describe, expect, it } from 'vitest'
import { contrastRatio } from '@/lib/contrast'
import { PRODUCT_CONTRAST_RULES, paletteStyle, productPalettes, type ProductSlug } from '@/styles/products'

const slugs = Object.keys(productPalettes) as ProductSlug[]

describe('product palettes', () => {
  const cases = slugs.flatMap((slug) => PRODUCT_CONTRAST_RULES.map((rule) => ({ slug, ...rule })))

  it.each(cases)('$slug: $fg on $bg reaches $min:1', ({ slug, fg, bg, min }) => {
    expect(contrastRatio(productPalettes[slug][fg], productPalettes[slug][bg])).toBeGreaterThanOrEqual(min)
  })

  it('exposes a palette as CSS variables', () => {
    const style = paletteStyle('riggit') as Record<string, string>
    expect(style['--paper']).toBe(productPalettes.riggit.paper)
    expect(style['--accent']).toBe(productPalettes.riggit.accent)
  })
})

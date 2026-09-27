import type { StudioProduct } from '@/content/studio'
import { MehfilInvite } from '@/components/studio/mehfil-invite'

export function ProductSheet({ product, index }: { product: StudioProduct; index: number }) {
  return (
    <div className="mx-auto grid min-h-screen max-w-[1320px] items-center gap-12 px-6 py-24 md:px-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
          {String(index + 1).padStart(2, '0')} / {product.kind}
        </p>
        <h3 className="mt-6 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] tracking-[-0.02em]">
          {product.name}
        </h3>
        <p className="mt-6 font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight text-accent">{product.pitch}</p>
        <p className="mt-5 max-w-[46ch] leading-relaxed text-ink-2">{product.body}</p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
          {product.stack.join(' · ')}
          {product.status ? ` · ${product.status}` : ''}
        </p>
        {product.links.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-3">
            {product.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-rule px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors hover:border-accent hover:text-accent"
                >
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        {product.image ? (
          <figure className="overflow-hidden rounded-lg border border-rule bg-paper-2 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)]">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export serves pre-sized WebP files */}
            <img
              src={product.image.src}
              alt={product.image.alt}
              width={1200}
              height={750}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </figure>
        ) : (
          <MehfilInvite />
        )}
      </div>
    </div>
  )
}

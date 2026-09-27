import type { Media } from '@/content/case-studies'

// A screenshot in a frame, or a labelled placeholder on the blueprint grid saying what will go there.
export function CaseMedia({ media }: { media: Media }) {
  if (media.kind === 'image') {
    return (
      <figure>
        <div className="overflow-hidden rounded-lg border border-rule bg-paper-2 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.45)]">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export serves pre-sized WebP files */}
          <img
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
        </div>
        {media.caption && (
          <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
            {media.caption}
          </figcaption>
        )}
      </figure>
    )
  }

  return (
    <figure>
      <div className="relative grid aspect-[16/10] place-items-center overflow-hidden rounded-lg border border-dashed border-rule bg-paper-2">
        <div
          aria-hidden="true"
          className="absolute inset-0 [background-image:linear-gradient(var(--grid)_1px,transparent_1px),linear-gradient(90deg,var(--grid)_1px,transparent_1px)] [background-size:24px_24px]"
        />
        <div className="relative px-6 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">Placeholder</p>
          <p className="mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-none">{media.label}</p>
        </div>
      </div>
      <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{media.caption}</figcaption>
    </figure>
  )
}

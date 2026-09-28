import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { splitEmphasis } from '@/lib/emphasis'
import { palettes } from '@/styles/tokens'

export const OG_SIZE = { width: 1200, height: 630 }

type Card = {
  /** Mono-style labels across the top, left and right. */
  top: [string, string]
  title: string
  /** One line under the title; *starred* words are set in accent italic. */
  line: string
  bottom: [string, string]
}

// Instrument Serif as TTF (OFL, src/assets/fonts): the image renderer cannot read the woff2 files
// next/font serves to the page. It is the only font registered, so labels are set in it too.
const font = (file: string) => readFile(join(process.cwd(), 'src/assets/fonts', file))

// A share card in the site's paper-and-ink style, rendered at build time.
export async function ogCard({ top, title, line, bottom }: Card): Promise<ImageResponse> {
  const { paper, ink, muted, accent, rule } = palettes.light
  const [regular, italic] = await Promise.all([font('InstrumentSerif-Regular.ttf'), font('InstrumentSerif-Italic.ttf')])
  const label = { display: 'flex', justifyContent: 'space-between', fontSize: 20, color: muted, letterSpacing: 3 }
  const titleSize = title.length > 18 ? 104 : 150

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: paper,
          color: ink,
          fontFamily: 'Instrument Serif',
        }}
      >
        <div style={label}>
          <span>{top[0].toUpperCase()}</span>
          <span>{top[1].toUpperCase()}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: titleSize, lineHeight: 0.92, letterSpacing: titleSize / -37 }}>{title}</span>
          {/* Words as separate flex items with an explicit gap, so spacing stays even. */}
          <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: 14, marginTop: 30, fontSize: 60, lineHeight: 1.05 }}>
            {splitEmphasis(line).map((part, index) =>
              part.em ? (
                <span key={index} style={{ color: accent, fontStyle: 'italic' }}>
                  {part.text.trim()}
                </span>
              ) : (
                <span key={index}>{part.text.trim()}</span>
              ),
            )}
          </div>
        </div>
        <div style={{ ...label, borderTop: `1px solid ${rule}`, paddingTop: 24 }}>
          <span>{bottom[0].toUpperCase()}</span>
          <span>{bottom[1].toUpperCase()}</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Instrument Serif', data: regular, style: 'normal', weight: 400 },
        { name: 'Instrument Serif', data: italic, style: 'italic', weight: 400 },
      ],
    },
  )
}

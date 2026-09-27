import { ImageResponse } from 'next/og'
import { site } from '@/content/site'
import { palettes } from '@/styles/tokens'

export const dynamic = 'force-static'
const size = { width: 1200, height: 630 }

// The social share image, rendered once at build time and served as /og.png.
export function GET() {
  const { paper, ink, muted, accent, rule } = palettes.light
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
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, color: muted, letterSpacing: 2 }}>
          <span>FOUNDER · ENGINEER</span>
          <span>{site.url.replace('https://', '')}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 124, lineHeight: 1, letterSpacing: -3 }}>{site.name}</span>
          <span style={{ marginTop: 28, fontSize: 44, lineHeight: 1.15 }}>
            I build software people&nbsp;<span style={{ color: accent, fontStyle: 'italic' }}>keep</span>&nbsp;using.
          </span>
        </div>
        <div style={{ display: 'flex', borderTop: `2px solid ${rule}`, paddingTop: 24, fontSize: 24, color: muted }}>
          Founder of VeraStack Labs · Bangalore
        </div>
      </div>
    ),
    size,
  )
}

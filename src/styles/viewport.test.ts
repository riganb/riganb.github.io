import { describe, expect, it } from 'vitest'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, sep } from 'node:path'

// dvh grows and shrinks as Android Chrome's address bar hides and shows, shifting everything below
// it on each change of scroll direction. Only full-screen overlays may use it.
const ALLOWED = ['src/components/mobile-menu.tsx']

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return files(path)
    return /\.(tsx?|css)$/.test(name) && !/\.test\./.test(name) ? [path.split(sep).join('/')] : []
  })
}

describe('viewport units', () => {
  it('keeps dvh to full-screen overlays', () => {
    const offenders = files('src').filter((path) => !ALLOWED.includes(path) && /\b\d*dvh\b|-dvh\b/.test(readFileSync(path, 'utf8')))
    expect(offenders).toEqual([])
  })
})

import { describe, expect, it } from 'vitest'
import { THEME_STORAGE_KEY, nextTheme, resolveTheme, themeScript } from '@/lib/theme'

describe('resolveTheme', () => {
  it('prefers a stored choice', () => {
    expect(resolveTheme('dark', false)).toBe('dark')
    expect(resolveTheme('light', true)).toBe('light')
  })

  it('falls back to the system preference', () => {
    expect(resolveTheme(null, true)).toBe('dark')
    expect(resolveTheme(null, false)).toBe('light')
  })

  it('ignores garbage in storage', () => {
    expect(resolveTheme('purple', true)).toBe('dark')
  })
})

describe('nextTheme', () => {
  it('flips between light and dark', () => {
    expect(nextTheme('light')).toBe('dark')
    expect(nextTheme('dark')).toBe('light')
  })
})

describe('themeScript', () => {
  it('reads the storage key and only applies valid values', () => {
    expect(themeScript).toContain(`localStorage.getItem("${THEME_STORAGE_KEY}")`)
    expect(themeScript).toContain(`t==='light'||t==='dark'`)
  })

  it('marks the document as having JavaScript', () => {
    expect(themeScript).toContain(`classList.add('js')`)
  })
})

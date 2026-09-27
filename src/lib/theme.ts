import type { ThemeName } from '@/styles/tokens'

export const THEME_STORAGE_KEY = 'theme'

export function resolveTheme(stored: string | null, prefersDark: boolean): ThemeName {
  if (stored === 'light' || stored === 'dark') return stored
  return prefersDark ? 'dark' : 'light'
}

export function nextTheme(current: ThemeName): ThemeName {
  return current === 'dark' ? 'light' : 'dark'
}

// Runs before first paint so a stored choice never flashes the wrong theme.
// Without a stored choice, the CSS media query in tokensToCss() decides.
export const themeScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}})()`

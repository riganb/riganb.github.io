import type { ThemeName } from '@/styles/tokens'

export const THEME_STORAGE_KEY = 'theme'

// Dark is the default; the site goes light only when the visitor chooses it.
export function resolveTheme(stored: string | null): ThemeName {
  return stored === 'light' ? 'light' : 'dark'
}

export function nextTheme(current: ThemeName): ThemeName {
  return current === 'dark' ? 'light' : 'dark'
}

// Runs before first paint so a stored choice never flashes the wrong theme.
// Without a stored choice the page goes dark.
export const themeScript = `(function(){document.documentElement.classList.add('js');try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}})()`

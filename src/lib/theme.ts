import type { ThemeName } from '@/styles/tokens'

export const THEME_STORAGE_KEY = 'theme'

// Light is the default; the site goes dark only when the visitor chooses it.
export function resolveTheme(stored: string | null): ThemeName {
  return stored === 'dark' ? 'dark' : 'light'
}

export function nextTheme(current: ThemeName): ThemeName {
  return current === 'dark' ? 'light' : 'dark'
}

// Runs before first paint so a stored choice never flashes the wrong theme.
// Without a stored choice the page stays light.
export const themeScript = `(function(){document.documentElement.classList.add('js');try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}})()`

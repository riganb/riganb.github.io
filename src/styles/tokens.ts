export const TOKEN_NAMES = [
  'paper',
  'paper-2',
  'ink',
  'ink-2',
  'muted',
  'rule',
  'grid',
  'accent',
  'accent-ink',
  'live',
] as const

export type TokenName = (typeof TOKEN_NAMES)[number]
export type ThemeName = 'light' | 'dark'
export type Palette = Record<TokenName, string>

export const palettes: Record<ThemeName, Palette> = {
  light: {
    paper: '#F4F1EA',
    'paper-2': '#ECE7DC',
    ink: '#16140F',
    'ink-2': '#4A463E',
    muted: '#6D675D',
    rule: '#DCD5C6',
    grid: 'rgba(22, 20, 15, 0.05)',
    accent: '#A74D27',
    'accent-ink': '#F4F1EA',
    live: '#3F8F5A',
  },
  dark: {
    paper: '#15130F',
    'paper-2': '#1D1A15',
    ink: '#EDE6D6',
    'ink-2': '#A79F8E',
    muted: '#8D8575',
    rule: '#2E2A23',
    grid: 'rgba(237, 230, 214, 0.045)',
    accent: '#E8A55A',
    'accent-ink': '#15130F',
    live: '#6FBF86',
  },
}

export type ContrastRule = { fg: TokenName; bg: TokenName; min: number }

// Text needs 4.5:1 at any size we use; non-text marks need 3:1.
export const CONTRAST_RULES: ContrastRule[] = [
  { fg: 'ink', bg: 'paper', min: 4.5 },
  { fg: 'ink', bg: 'paper-2', min: 4.5 },
  { fg: 'ink-2', bg: 'paper', min: 4.5 },
  { fg: 'ink-2', bg: 'paper-2', min: 4.5 },
  { fg: 'muted', bg: 'paper', min: 4.5 },
  { fg: 'muted', bg: 'paper-2', min: 4.5 },
  { fg: 'accent', bg: 'paper', min: 4.5 },
  { fg: 'accent', bg: 'paper-2', min: 4.5 },
  { fg: 'accent-ink', bg: 'accent', min: 4.5 },
  { fg: 'live', bg: 'paper', min: 3 },
]

function declarations(theme: ThemeName): string {
  const palette = palettes[theme]
  const vars = TOKEN_NAMES.map((name) => `--${name}:${palette[name]};`).join('')
  return `${vars}color-scheme:${theme};`
}

export function tokensToCss(): string {
  return [
    `:root{${declarations('light')}}`,
    `:root[data-theme="dark"]{${declarations('dark')}}`,
    `@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){${declarations('dark')}}}`,
  ].join('')
}

export function luminance(r: number, g: number, b: number): number {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
}

// Dark ink on paper grows with darkness; light ink on a dark page grows with brightness,
// so the portrait never turns into a photographic negative in dark mode.
export function dotRadius(lum: number, cell: number, inkIsDark: boolean): number {
  const amount = inkIsDark ? 1 - lum : lum
  return cell * 0.62 * Math.max(0, Math.min(1, amount))
}

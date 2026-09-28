export function luminance(r: number, g: number, b: number): number {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
}

// Dark ink on paper grows with darkness; light ink on a dark page grows with brightness,
// so the portrait never turns into a photographic negative in dark mode.
export function dotRadius(lum: number, cell: number, inkIsDark: boolean): number {
  const amount = inkIsDark ? 1 - lum : lum
  return cell * 0.62 * Math.max(0, Math.min(1, amount))
}

export type LensedPoint = { x: number; y: number; scale: number }

// Gravitational lensing, after the point-lens equation: a dot at distance d from the mass is
// seen at (d + sqrt(d^2 + 4 * einstein^2)) / 2, so everything is pushed outward, nothing is seen
// inside the Einstein radius, and dots pile up into a bright ring around it. Dots are stretched by
// the lens magnification (capped), and `twist` swirls near dots more than far ones, like a
// spinning mass dragging space around with it.
export function lensPoint(
  point: { x: number; y: number },
  center: { x: number; y: number },
  einstein: number,
  twist: number,
): LensedPoint {
  if (einstein <= 0) return { x: point.x, y: point.y, scale: 1 }
  const dx = point.x - center.x
  const dy = point.y - center.y
  const d = Math.max(Math.hypot(dx, dy), 1e-6)
  const seen = (d + Math.sqrt(d * d + 4 * einstein * einstein)) / 2
  const u = d / einstein
  const magnification = (u * u + 2) / (2 * u * Math.sqrt(u * u + 4)) + 0.5
  const angle = Math.atan2(dy, dx) + (twist * einstein) / (d + einstein)
  return {
    x: center.x + Math.cos(angle) * seen,
    y: center.y + Math.sin(angle) * seen,
    scale: Math.min(Math.sqrt(magnification), 2),
  }
}

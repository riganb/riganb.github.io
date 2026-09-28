export function luminance(r: number, g: number, b: number): number {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
}

// Dark ink on paper grows with darkness; light ink on a dark page grows with brightness,
// so the portrait never turns into a photographic negative in dark mode.
export function dotRadius(lum: number, cell: number, inkIsDark: boolean): number {
  const amount = inkIsDark ? 1 - lum : lum
  return cell * 0.62 * Math.max(0, Math.min(1, amount))
}

export type WarpedPoint = { x: number; y: number; scale: number }

// A gravity well, after the rubber-sheet picture of spacetime: each dot slides toward the mass by a
// share of its distance that falls off smoothly beyond `radius` (strength * r^2 / (d^2 + r^2)), so
// the fabric bunches up around the well but a dot never crosses the centre. Dots shrink as they
// near it, as if sinking into the funnel. `strength` runs from 0 (flat) to just below 1.
export function gravityPull(
  point: { x: number; y: number },
  center: { x: number; y: number },
  radius: number,
  strength: number,
): WarpedPoint {
  if (strength <= 0 || radius <= 0) return { x: point.x, y: point.y, scale: 1 }
  const dx = point.x - center.x
  const dy = point.y - center.y
  const pull = (strength * radius * radius) / (dx * dx + dy * dy + radius * radius)
  // Dots shrink faster than they bunch, so even the darkest areas thin out toward the centre and
  // the well reads as depth rather than a dark smudge.
  return { x: point.x - dx * pull, y: point.y - dy * pull, scale: Math.max(0.15, (1 - pull) ** 1.8) }
}

export type Edge = 'top' | 'bottom'

export function entryEdge(pointerY: number, rect: { top: number; height: number }): Edge {
  return pointerY - rect.top <= rect.height / 2 ? 'top' : 'bottom'
}

// Degrees of lean for a horizontal velocity in px per frame.
export function tiltFromVelocity(vx: number, maxDeg = 8): number {
  return Math.max(-maxDeg, Math.min(maxDeg, vx * 1.5))
}

export const LENS_IDLE_RADIUS = 6
export const LENS_ACTIVE_RADIUS = 110

export type Point = { x: number; y: number }

// Frame-rate independent easing: `rate` is the share of the gap closed per 60fps frame.
export function approach(current: number, target: number, dtMs: number, rate = 0.18): number {
  const t = 1 - Math.pow(1 - rate, dtMs / (1000 / 60))
  return current + (target - current) * t
}

export function lensClipPath(
  pointer: Point,
  rect: { left: number; top: number },
  radius: number,
): string {
  const x = (pointer.x - rect.left).toFixed(1)
  const y = (pointer.y - rect.top).toFixed(1)
  return `circle(${radius.toFixed(1)}px at ${x}px ${y}px)`
}

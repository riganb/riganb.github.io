export type Vec = { x: number; y: number }

// Pushes a point away from the cursor with a squared falloff; points beyond `radius` stay put.
export function displace(point: Vec, cursor: Vec, radius: number, strength: number): Vec {
  const dx = point.x - cursor.x
  const dy = point.y - cursor.y
  const distance = Math.hypot(dx, dy)
  if (distance === 0 || distance >= radius) return point
  const push = strength * (1 - distance / radius) ** 2
  return { x: point.x + (dx / distance) * push, y: point.y + (dy / distance) * push }
}

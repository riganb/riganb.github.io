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

export type Body = Vec & { radius: number; strength: number }

// Applies several bodies at once, each displacing from the point's rest position so the result
// does not depend on their order. Negative strength pulls toward a body; a pull never carries a
// point past the body's centre.
export function warp(point: Vec, bodies: Body[]): Vec {
  let x = point.x
  let y = point.y
  for (const body of bodies) {
    const moved = displace(point, body, body.radius, body.strength)
    let mx = moved.x - point.x
    let my = moved.y - point.y
    if (body.strength < 0) {
      const room = Math.hypot(point.x - body.x, point.y - body.y)
      const length = Math.hypot(mx, my)
      if (length > room && length > 0) {
        mx *= room / length
        my *= room / length
      }
    }
    x += mx
    y += my
  }
  return { x, y }
}

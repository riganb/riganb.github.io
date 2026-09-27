import type { Point } from '@/lib/lens'

export function magnetOffset(pointer: Point, center: Point, radius: number, strength: number): Point {
  const dx = pointer.x - center.x
  const dy = pointer.y - center.y
  const distance = Math.hypot(dx, dy)
  if (distance >= radius) return { x: 0, y: 0 }
  const pull = strength * (1 - distance / radius)
  return { x: dx * pull, y: dy * pull }
}

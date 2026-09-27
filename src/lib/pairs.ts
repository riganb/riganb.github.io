import { splitEmphasis } from '@/lib/emphasis'

// Polished copy and its honest twin, authored line for line so the lens reveals whole words in place.
export type LinePair = { lines: string[]; honest: string[] }

export const LINE_LENGTH_TOLERANCE = 0.25

function plainLength(line: string): number {
  return splitEmphasis(line).reduce((total, segment) => total + segment.text.length, 0)
}

export function pairProblems(pair: LinePair): string[] {
  const problems: string[] = []
  if (pair.lines.length !== pair.honest.length) {
    const noun = pair.honest.length === 1 ? 'line' : 'lines'
    problems.push(`${pair.lines.length} polished lines but ${pair.honest.length} honest ${noun}`)
  }
  pair.lines.forEach((line, index) => {
    const honest = pair.honest[index]
    if (honest === undefined) return
    const ratio = plainLength(honest) / plainLength(line)
    if (Math.abs(ratio - 1) > LINE_LENGTH_TOLERANCE) {
      problems.push(`line ${index + 1}: honest is ${Math.round(ratio * 100)}% of the polished length`)
    }
  })
  return problems
}

export function isLinePair(value: unknown): value is LinePair {
  if (!value || typeof value !== 'object') return false
  const record = value as Record<string, unknown>
  return Array.isArray(record.lines) && Array.isArray(record.honest)
}

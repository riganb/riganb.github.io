import { splitEmphasis } from '@/lib/emphasis'

export type Word = { text: string; em: boolean; glue: boolean }

// `glue` marks a word that touches the previous one with no space, such as a colon after emphasis.
export function toWords(input: string): Word[] {
  const words: Word[] = []
  let touching = false
  for (const segment of splitEmphasis(input)) {
    for (const piece of segment.text.split(/(\s+)/)) {
      if (piece === '') continue
      if (/^\s+$/.test(piece)) {
        touching = false
        continue
      }
      words.push({ text: piece, em: segment.em, glue: touching && words.length > 0 })
      touching = true
    }
  }
  return words
}

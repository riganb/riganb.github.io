export type Glyph = { kind: 'digit'; value: number; order: number } | { kind: 'static'; char: string }

export function toGlyphs(value: string): Glyph[] {
  let order = 0
  return [...value].map((char) =>
    /\d/.test(char) ? { kind: 'digit', value: Number(char), order: order++ } : { kind: 'static', char },
  )
}

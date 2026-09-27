export type Segment = { text: string; em: boolean }

// Copy marks emphasis with *asterisks*; odd-indexed parts are emphasised.
export function splitEmphasis(input: string): Segment[] {
  const parts = input.split('*')
  if (parts.length % 2 === 0) throw new Error(`Unbalanced emphasis markers in: ${input}`)
  return parts
    .map((text, index) => ({ text, em: index % 2 === 1 }))
    .filter((segment) => segment.text.length > 0)
}

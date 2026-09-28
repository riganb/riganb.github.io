export const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+<>'

// One frame of a decrypting label: characters before `progress` (0 to 1) show for real, the rest
// are random picks from SCRAMBLE_CHARS. Spaces and punctuation stay put so the words keep their shape.
export function scrambleFrame(text: string, progress: number, random: () => number = Math.random): string {
  const resolved = Math.floor(text.length * Math.min(Math.max(progress, 0), 1))
  return [...text]
    .map((char, index) => {
      if (index < resolved || !/[\p{L}\p{N}]/u.test(char)) return char
      return SCRAMBLE_CHARS[Math.floor(random() * SCRAMBLE_CHARS.length)]
    })
    .join('')
}

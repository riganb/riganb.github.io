// The contact note: a name, an email and a message, sent through Web3Forms.

export type Note = { name: string; email: string; message: string }
export type NoteProblems = Partial<Record<keyof Note, true>>

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function noteProblems(note: Note): NoteProblems {
  const problems: NoteProblems = {}
  if (!note.name.trim()) problems.name = true
  if (!isEmail(note.email)) problems.email = true
  if (!note.message.trim()) problems.message = true
  return problems
}

const subject = (note: Note) => `Portfolio note from ${note.name.trim()}`

// JSON body for https://api.web3forms.com/submit. The access key is public by design.
export function notePayload(accessKey: string, note: Note, siteName: string) {
  return {
    access_key: accessKey.trim(),
    subject: subject(note),
    from_name: siteName,
    name: note.name.trim(),
    email: note.email.trim(),
    message: note.message.trim(),
  }
}

// If sending fails, the same note opens in the visitor's mail app instead.
export function noteMailto(to: string, note: Note): string {
  const params = `subject=${encodeURIComponent(subject(note))}&body=${encodeURIComponent(note.message.trim())}`
  return `mailto:${to}?${params}`
}

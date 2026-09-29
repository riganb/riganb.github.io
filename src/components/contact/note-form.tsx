'use client'

import { useState, type FormEvent } from 'react'
import { contact } from '@/content/about'
import { site } from '@/content/site'
import { noteMailto, notePayload, noteProblems, type Note } from '@/lib/note'

type Status = 'idle' | 'sending' | 'sent' | 'failed'

// Underlined blanks that grow with their text (field-sizing), set in the display serif.
const blank =
  'mx-1 min-w-[7ch] border-b border-ink/35 bg-transparent px-0.5 pb-0.5 text-ink outline-none transition-colors [field-sizing:content] placeholder:text-muted focus:border-accent data-[miss]:border-accent'

// A short note that reads as a sentence, sent through Web3Forms (after the VeraStack Labs
// enquiry form, without its project fields). A honeypot catches bots; if sending fails, the note
// opens in the visitor's mail app instead.
export function NoteForm() {
  const [note, setNote] = useState<Note>({ name: '', email: '', message: '' })
  const [bot, setBot] = useState(false)
  const [tried, setTried] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const problems = noteProblems(note)
  const ready = Object.keys(problems).length === 0
  const locked = status === 'sending' || status === 'sent'
  const miss = (field: keyof Note) => (tried && problems[field] ? '' : undefined)
  const edit = (field: keyof Note) => (value: string) => setNote((current) => ({ ...current, [field]: value }))

  const send = async (event: FormEvent) => {
    event.preventDefault()
    if (locked) return
    setTried(true)
    if (!ready) return
    // People never tick the honeypot; pretend it went and send nothing.
    if (bot) {
      setStatus('sent')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(site.form.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...notePayload(site.form.accessKey, note, site.name), botcheck: false }),
      })
      const body = (await res.json().catch(() => null)) as { success?: boolean } | null
      setStatus(res.ok && body?.success ? 'sent' : 'failed')
    } catch {
      setStatus('failed')
    }
  }

  const hint = tried && !ready ? contact.note.incomplete : status === 'sending' ? contact.note.sending : contact.note.idle

  return (
    // POST, so a submit before the script loads never puts the note in a URL.
    <form method="post" noValidate onSubmit={send} className="mt-14 max-w-xl" data-status={status}>
      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{contact.note.label}</p>
      <p className="mt-4 font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.5] text-ink-2">
        Hi Rigan, I&apos;m
        <label>
          <span className="sr-only">Your name</span>
          <input
            name="name"
            autoComplete="name"
            required
            placeholder="your name"
            readOnly={locked}
            value={note.name}
            onChange={(e) => edit('name')(e.target.value)}
            data-miss={miss('name')}
            className={blank}
          />
        </label>
        , reach me at
        <label>
          <span className="sr-only">Your email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="you@company.com"
            readOnly={locked}
            value={note.email}
            onChange={(e) => edit('email')(e.target.value)}
            data-miss={miss('email')}
            className={blank}
          />
        </label>
        .
      </p>
      <label className="mt-4 block">
        <span className="sr-only">Your message</span>
        <textarea
          name="message"
          required
          rows={3}
          placeholder={contact.note.placeholder}
          readOnly={locked}
          value={note.message}
          onChange={(e) => edit('message')(e.target.value)}
          data-miss={miss('message')}
          className="block w-full resize-none border-b border-ink/35 bg-transparent pb-2 text-base leading-relaxed text-ink outline-none transition-colors [field-sizing:content] placeholder:text-muted focus:border-accent data-[miss]:border-accent"
        />
      </label>

      {/* Hidden from people; bots tick it. */}
      <label aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        Leave this empty
        <input type="checkbox" name="botcheck" tabIndex={-1} checked={bot} onChange={(e) => setBot(e.target.checked)} />
      </label>

      {status === 'sent' ? (
        <p role="status" className="mt-6 font-display text-2xl text-ink">
          {contact.note.sent}
        </p>
      ) : (
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <button
            type="submit"
            aria-disabled={status === 'sending'}
            className="rounded-full border border-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
          >
            {contact.note.send} <span aria-hidden="true">→</span>
          </button>
          <span aria-live="polite" className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
            {status === 'failed' ? (
              <>
                {contact.note.failed}{' '}
                <a href={noteMailto(site.email, note)} className="text-accent underline underline-offset-4">
                  {contact.note.fallback}
                </a>
              </>
            ) : (
              hint
            )}
          </span>
        </div>
      )}
    </form>
  )
}

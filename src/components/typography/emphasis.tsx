import { splitEmphasis } from '@/lib/emphasis'

export function Emphasis({ text }: { text: string }) {
  return (
    <>
      {splitEmphasis(text).map((segment, index) =>
        segment.em ? (
          <em key={index} className="text-accent italic">
            {segment.text}
          </em>
        ) : (
          <span key={index}>{segment.text}</span>
        ),
      )}
    </>
  )
}

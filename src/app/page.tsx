import { Hero } from '@/components/home/hero'
import { Statement } from '@/components/home/statement'

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Statement />
      {/* Room to scroll the statement fully; replaced by the work index in Phase 3. */}
      <div aria-hidden="true" className="h-[50vh]" />
    </main>
  )
}

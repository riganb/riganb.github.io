import { Hero } from '@/components/home/hero'
import { Statement } from '@/components/home/statement'
import { StudioChapter } from '@/components/studio/studio-chapter'
import { WorkIndex } from '@/components/work/work-index'

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Statement />
      <WorkIndex />
      <StudioChapter />
    </main>
  )
}

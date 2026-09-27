import { Journey } from '@/components/about/journey'
import { SideProjects } from '@/components/about/side-projects'
import { Toolbox } from '@/components/about/toolbox'
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
      <SideProjects />
      <Journey />
      <Toolbox />
    </main>
  )
}

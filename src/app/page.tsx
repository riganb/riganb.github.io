import { ViewTransition } from 'react'
import { Journey } from '@/components/about/journey'
import { SideProjects } from '@/components/about/side-projects'
import { Toolbox } from '@/components/about/toolbox'
import { JsonLd } from '@/components/json-ld'
import { Contact } from '@/components/contact/contact'
import { Hero } from '@/components/home/hero'
import { Statement } from '@/components/home/statement'
import { StudioChapter } from '@/components/studio/studio-chapter'
import { WorkIndex } from '@/components/work/work-index'
import { homeGraph } from '@/lib/structured-data'

export default function Home() {
  return (
    <ViewTransition
      enter={{ 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' }}
      exit={{ 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' }}
      default="none"
    >
      <main id="main">
        <JsonLd data={homeGraph()} />
        <Hero />
        <Statement />
        <WorkIndex />
        <StudioChapter />
        <SideProjects />
        <Journey />
        <Toolbox />
        <Contact />
      </main>
    </ViewTransition>
  )
}

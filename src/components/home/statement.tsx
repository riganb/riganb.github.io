import { HonestText } from '@/components/lens/honest-text'
import { ScrollFill } from '@/components/motion/scroll-fill'
import { FilmReel } from '@/components/services/film-reel'
import { statement } from '@/content/home'
import { services } from '@/content/services'

const type = 'font-display text-[clamp(2rem,4.6vw,4rem)] leading-[1.08] tracking-[-0.01em]'

// The portfolio film sits beside the statement as a short introduction; the services reel keeps it
// too, as one of the films the studio has made.
const film = services.films.filter((item) => item.id === 'portfolio')

export function Statement() {
  return (
    <section id="about" aria-label="About" className="border-b border-rule">
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-6 py-24 md:px-10 md:py-36 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <HonestText honest={statement.honest} layerClassName={type}>
          <ScrollFill lines={statement.lines} className={type} />
        </HonestText>
        <FilmReel films={film} className="max-w-[560px]" />
      </div>
    </section>
  )
}

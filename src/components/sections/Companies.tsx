'use client'
import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { companies } from '@/data/content'

export default function Companies() {
  return (
    <section id="companies" className="py-32 px-8 lg:px-16 border-t border-border bg-black">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="inline-flex border border-border px-3 py-1.5 mb-8">
            <span className="font-mono text-xs text-muted tracking-[0.2em] uppercase">[ Companies I&apos;ve Worked With ]</span>
          </div>
          <h2 className="font-display font-semibold text-white text-5xl lg:text-6xl leading-tight mb-16">
            Trusted to build and ship<br />production systems.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-border">
          {companies.map((company, i) => (
            <ScrollReveal key={company.name} delay={i * 0.06}>
              <div className="bg-black p-8 flex flex-col items-center justify-center gap-4 group hover:bg-card transition-colors duration-300 h-full">
                <div className="relative w-16 h-16 grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    sizes="64px"
                    className="object-contain rounded-md"
                  />
                </div>
                <div className="text-center">
                  <p className="font-mono text-xs text-white/80 leading-tight">{company.name}</p>
                  <p className="font-mono text-[10px] text-muted mt-1 uppercase tracking-wide">{company.role}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

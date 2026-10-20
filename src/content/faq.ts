// Questions people ask before they reach out. Shown on the home page as plain answers (what answer
// engines can quote) and marked up as FAQPage as good practice. Answers stay to what the site proves.
export type Question = { q: string; a: string }

export const faq = {
  label: '// Questions',
  items: [
    {
      q: 'Are you open to freelance or full-time work?',
      a: 'Yes. Client projects go through VeraStack Labs, my studio. For roles, the one-page resume is at riganb.github.io/resume, and I am open to on-site, hybrid and remote work.',
    },
    {
      q: 'What have you shipped?',
      a: 'The configurators and booking flows behind 70,000+ EV bookings at Ultraviolette, the E3 TRION launch site, and five products of my own: Origan, rigseed, Riggit, Mehfil and Oinkbuns.',
    },
    {
      q: 'What does VeraStack Labs build?',
      a: 'Web experiences and configurators, web apps, marketing sites, AI search (AEO and GEO) and SEO, product films and apps, from first sketch to launch.',
    },
    {
      q: 'Are the coaching sessions really free?',
      a: 'The first 15 minutes are. One-to-one sessions for students and developers on building, outreach, interviews and placement prep. Book one at cal.com/verastack/quick. Free courses in Rust, Java and TypeScript are on the Origan Open Shelf.',
    },
    {
      q: 'Where are you based?',
      a: 'Bengaluru, India. I work with teams in India and abroad.',
    },
  ] satisfies Question[],
}

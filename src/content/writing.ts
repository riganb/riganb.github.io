// Articles on verastack.dev with Rigan's byline. Listed here as proof of the search and AI
// visibility work; the posts themselves live on the studio site.
export type Article = { title: string; kind: string; date: string; line: string; href: string }

export const writing = {
  label: '// Writing',
  note: 'Studies and notes on the VeraStack Labs blog.',
  founderPage: { label: 'The founder page on verastack.dev', href: 'https://verastack.dev/founder/' },
  items: [
    {
      title: "The cobbler's shoes: AI search scores of 25 software studios",
      kind: 'Study',
      date: '18 Oct 2026',
      line: "Median 81 and 21 of 25 with no FAQ: how 25 software studios' own homepages read to AI answers.",
      href: 'https://verastack.dev/blog/ai-search-software-studios/',
    },
    {
      title: "GEO is the new SEO: what changes and what doesn't",
      kind: 'Guide',
      date: '18 Oct 2026',
      line: 'GEO, AEO and SEO side by side: what stays plain SEO and what changes.',
      href: 'https://verastack.dev/blog/geo-is-the-new-seo/',
    },
    {
      title: 'Funded this fortnight: six AI agents for the back office',
      kind: 'Startups',
      date: '18 Oct 2026',
      line: '$136.8M raised by six startups from 3 to 17 Oct, and how AI search reads their homepages.',
      href: 'https://verastack.dev/blog/funded-this-fortnight-back-office-agents/',
    },
    {
      title: 'AI search scores of YC Summer 2026, by space',
      kind: 'Study',
      date: '17 Oct 2026',
      line: '226 YC S26 homepages checked: median 66, four scored 100.',
      href: 'https://verastack.dev/blog/yc-summer-2026-ai-search/',
    },
    {
      title: 'We ran 96 Indian D2C sites through an AI search check',
      kind: 'Study',
      date: '17 Oct 2026',
      line: 'Median score 75, top score 91.',
      href: 'https://verastack.dev/blog/ai-search-indian-d2c-brands/',
    },
    {
      title: 'AI search scores of 26 SaaS homepages',
      kind: 'Study',
      date: '17 Oct 2026',
      line: 'Four of the 26 scored 100.',
      href: 'https://verastack.dev/blog/ai-search-saas-homepages/',
    },
    {
      title: 'Spot the slop: what an AI-built launch page gets wrong',
      kind: 'Teardown',
      date: '17 Oct 2026',
      line: 'A one-prompt AI page scores 54; the hand-built one scores 100. Both live in the post.',
      href: 'https://verastack.dev/blog/spot-the-slop/',
    },
    {
      title: 'AI search for SaaS: what ChatGPT reads before it recommends you',
      kind: 'Guide',
      date: '17 Oct 2026',
      line: 'The checks behind the score, and why each one matters.',
      href: 'https://verastack.dev/blog/ai-search-for-saas/',
    },
  ] satisfies Article[],
}

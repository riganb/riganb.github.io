export type NavLink = { label: string; href: string }
export type Social = { label: string; href: string; caption: string }

export const site = {
  name: 'Rigan Burnwal',
  url: 'https://riganb.github.io',
  title: 'Rigan Burnwal: founder and engineer',
  description:
    'Founder of VeraStack Labs. I build software people keep using, from desktop apps to revenue-critical web.',
  ogImage: { url: '/og.png', width: 1200, height: 630, alt: 'Rigan Burnwal: founder of VeraStack Labs and software engineer' },
  status: 'Building VeraStack Labs · Bangalore',
  email: 'therealriganb@gmail.com',
  nav: [
    { label: 'Work', href: '/#work' },
    { label: 'Studio', href: '/#studio' },
    { label: 'Journey', href: '/#journey' },
    { label: 'Contact', href: '/#contact' },
  ] satisfies NavLink[],
  socials: [
    {
      label: 'GitHub',
      href: 'https://github.com/riganb',
      caption: 'Where the commits live, at every date and time.',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/rigan-burnwal/',
      caption: 'The version of me that wears a collar.',
    },
  ] satisfies Social[],
} as const

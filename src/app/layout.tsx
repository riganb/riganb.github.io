import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Geist_Mono, Instrument_Serif, Inter_Tight } from 'next/font/google'
import { site } from '@/content/site'
import { LensProvider } from '@/components/lens/lens-provider'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { SmoothScroll } from '@/components/smooth-scroll'
import { themeScript } from '@/lib/theme'
import { tokensToCss } from '@/styles/tokens'
import './globals.css'

const display = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

const body = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
})

const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  // Google Search Console ownership (URL prefix property, HTML tag method).
  verification: { google: 'XaT8Yv1kLl-jrgDTCHtPOv14FHf6ZLYtYLmHnCHAYRU' },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description, images: [site.ogImage] },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: 'website',
    locale: 'en_IN',
    images: [site.ogImage],
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: tokensToCss() }} />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh bg-paper text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <LensProvider>
          <SmoothScroll />
          <SiteNav />
          {children}
          <SiteFooter />
        </LensProvider>
      </body>
    </html>
  )
}

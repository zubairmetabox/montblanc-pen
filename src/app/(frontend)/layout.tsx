import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import React from 'react'
import { ThemeProvider } from '@/context/theme-context'
import { CartProvider } from '@/context/cart-context'
import { Navbar, CartSidebar, Footer, PageTransition, NavigationProgress } from '@/components/layout'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: {
    default: 'Montblanc Fountain Pens | Premium Writing Instruments',
    template: '%s | Montblanc Fountain Pens',
  },
  description:
    'Discover our curated collection of premium Montblanc fountain pens. Hand-selected writing instruments for discerning executives and collectors.',
  keywords: [
    'Montblanc',
    'fountain pen',
    'luxury pen',
    'writing instrument',
    'Meisterstück',
    'executive pen',
  ],
  authors: [{ name: 'Montblanc Pens' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Montblanc Fountain Pens',
  },
}

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <ThemeProvider>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <NavigationProgress />
              <Navbar />
              <main className="flex-1 pt-16">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
              <CartSidebar />
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

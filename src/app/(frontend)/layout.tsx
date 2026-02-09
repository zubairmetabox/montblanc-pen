import React from 'react'
import { ThemeProvider } from '@/context/theme-context'
import { CartProvider } from '@/context/cart-context'
import { Navbar, CartSidebar, Footer } from '@/components/layout'

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <CartProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
          <CartSidebar />
        </div>
      </CartProvider>
    </ThemeProvider>
  )
}

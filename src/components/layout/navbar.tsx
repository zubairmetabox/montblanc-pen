'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useCart } from '@/context/cart-context'

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Pen Collections', href: '/collections' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
]

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { items, toggleCart } = useCart()
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <header className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <nav className="container flex h-16 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="font-serif text-xl font-semibold tracking-tight">
                    MONTBLANC
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <ThemeToggle />

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleCart}
                        className="relative"
                        aria-label="Open cart"
                    >
                        <ShoppingBag className="h-5 w-5" />
                        {itemCount > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                                {itemCount}
                            </span>
                        )}
                    </Button>

                    {/* Mobile menu button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <div
                className={cn(
                    'md:hidden overflow-hidden transition-all duration-300',
                    mobileMenuOpen ? 'max-h-64' : 'max-h-0'
                )}
            >
                <div className="container py-4 space-y-4">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="block text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    )
}

'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { Button } from '@/components/ui/button'
import { formatPrice, cn } from '@/lib/utils'

export function CartSidebar() {
    const { items, isOpen, closeCart, updateQuantity, removeItem, total } = useCart()

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeCart()
        }
        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = ''
        }
    }, [isOpen, closeCart])

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    'fixed inset-0 z-50 bg-black/50 transition-opacity duration-300',
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                )}
                onClick={closeCart}
                aria-hidden="true"
            />

            {/* Sidebar */}
            <div
                className={cn(
                    'fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background shadow-xl transition-transform duration-300 ease-out',
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                )}
            >
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-border px-6 py-4">
                        <h2 className="text-lg font-semibold">Your Cart</h2>
                        <Button variant="ghost" size="icon" onClick={closeCart}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto px-6 py-4">
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <p className="text-muted-foreground mb-4">Your cart is empty</p>
                                <Button variant="outline" onClick={closeCart} asChild>
                                    <Link href="/collections">Browse Collections</Link>
                                </Button>
                            </div>
                        ) : (
                            <ul className="space-y-4">
                                {items.map((item) => (
                                    <li
                                        key={item.productId}
                                        className="flex gap-4 border-b border-border pb-4"
                                    >
                                        {/* Product image placeholder */}
                                        <div className="h-20 w-20 flex-shrink-0 bg-muted rounded-md overflow-hidden">
                                            {item.product?.heroImage && typeof item.product.heroImage === 'object' && (
                                                <Image
                                                    src={item.product.heroImage.url || '/placeholder.jpg'}
                                                    alt={item.product.heroImage.alt}
                                                    width={80}
                                                    height={80}
                                                    className="h-full w-full object-cover"
                                                />
                                            )}
                                        </div>

                                        {/* Product details */}
                                        <div className="flex flex-1 flex-col">
                                            <h3 className="font-medium text-sm line-clamp-2">
                                                {item.product?.name || 'Product'}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {formatPrice(item.product?.price || 0)}
                                            </p>

                                            {/* Quantity controls */}
                                            <div className="mt-auto flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="w-8 text-center text-sm">{item.quantity}</span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 ml-auto text-muted-foreground hover:text-destructive"
                                                    onClick={() => removeItem(item.productId)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="border-t border-border px-6 py-4 space-y-4">
                            <div className="flex items-center justify-between text-lg font-semibold">
                                <span>Total</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                            <div className="space-y-2">
                                <Button className="w-full" size="lg" asChild>
                                    <Link href="/checkout" onClick={closeCart}>
                                        Checkout
                                    </Link>
                                </Button>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href="/cart" onClick={closeCart}>
                                        View Cart
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

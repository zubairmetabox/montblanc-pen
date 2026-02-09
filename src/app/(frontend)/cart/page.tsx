'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'
import { formatPrice } from '@/lib/utils'
import type { Media } from '@/payload-types'

export default function CartPage() {
    const { items, updateQuantity, removeItem, total, clearCart } = useCart()

    if (items.length === 0) {
        return (
            <div className="py-24">
                <div className="container text-center">
                    <h1 className="text-h1 font-serif mb-4">Your Cart</h1>
                    <p className="text-muted-foreground mb-8">Your cart is empty.</p>
                    <Button asChild>
                        <Link href="/collections">Browse Collections</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="py-12">
            <div className="container">
                <h1 className="text-h1 font-serif mb-8">Your Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="border rounded-lg divide-y divide-border">
                            {items.map((item) => {
                                const heroImage = item.product?.heroImage as Media | undefined
                                return (
                                    <div key={item.productId} className="flex gap-4 p-4">
                                        {/* Image */}
                                        <div className="w-24 h-24 flex-shrink-0 bg-muted rounded-md overflow-hidden">
                                            {heroImage && (
                                                <Image
                                                    src={heroImage.url || '/placeholder.jpg'}
                                                    alt={heroImage.alt}
                                                    width={96}
                                                    height={96}
                                                    className="h-full w-full object-cover"
                                                />
                                            )}
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 min-w-0">
                                            <Link
                                                href={`/products/${item.product?.slug}`}
                                                className="font-medium hover:underline line-clamp-2"
                                            >
                                                {item.product?.name || 'Product'}
                                            </Link>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {formatPrice(item.product?.price || 0)} each
                                            </p>

                                            {/* Quantity controls */}
                                            <div className="flex items-center gap-3 mt-3">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="w-8 text-center">{item.quantity}</span>
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

                                        {/* Line total */}
                                        <div className="text-right">
                                            <p className="font-semibold">
                                                {formatPrice((item.product?.price || 0) * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Clear cart */}
                        <Button variant="ghost" className="mt-4" onClick={clearCart}>
                            Clear Cart
                        </Button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="border rounded-lg p-6 sticky top-24">
                            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>Calculated at checkout</span>
                                </div>
                            </div>

                            <div className="border-t pt-4 mb-6">
                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Total</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>

                            <Button className="w-full" size="lg" asChild>
                                <Link href="/checkout">Proceed to Checkout</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

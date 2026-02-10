'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCart } from '@/context/cart-context'
import { formatPrice } from '@/lib/utils'
import type { Media } from '@/payload-types'

const checkoutSchema = z.object({
    customerName: z.string().min(2, 'Name is required'),
    email: z.string().email('Valid email is required'),
    phone: z.string().min(10, 'Valid phone number is required'),
    company: z.string().optional(),
    notes: z.string().optional(),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
    const router = useRouter()
    const { items, total, clearCart } = useCart()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
    })

    if (isSubmitting || isSuccess) {
        return (
            <div className="py-24">
                <div className="container text-center">
                    <h1 className="text-h1 font-serif mb-4">Processing</h1>
                    <p className="text-muted-foreground mb-8">
                        {isSuccess ? 'Redirecting to your order confirmation...' : 'Submitting your inquiry...'}
                    </p>
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="py-24">
                <div className="container text-center">
                    <h1 className="text-h1 font-serif mb-4">Checkout</h1>
                    <p className="text-muted-foreground mb-8">Your cart is empty.</p>
                    <Button asChild>
                        <Link href="/collections">Browse Collections</Link>
                    </Button>
                </div>
            </div>
        )
    }

    const onSubmit = async (data: CheckoutFormData) => {
        setIsSubmitting(true)

        try {
            const orderItems = items.map((item) => ({
                product: item.productId,
                quantity: item.quantity,
                priceAtTime: item.product?.price || 0,
            }))

            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    items: orderItems,
                    totalAmount: total,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to create order')
            }

            const order = await response.json()
            setIsSuccess(true)
            clearCart()
            router.push(`/checkout/success?orderNumber=${order.orderNumber}`)
        } catch (error) {
            console.error('Checkout error:', error)
            alert('There was an error processing your inquiry. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="py-12">
            <div className="container">
                <h1 className="text-h1 font-serif mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="border rounded-lg p-6">
                                <h2 className="text-lg font-semibold mb-6">Contact Information</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Full Name *"
                                        placeholder="John Smith"
                                        error={errors.customerName?.message}
                                        {...register('customerName')}
                                    />
                                    <Input
                                        label="Email *"
                                        type="email"
                                        placeholder="john@example.com"
                                        error={errors.email?.message}
                                        {...register('email')}
                                    />
                                    <Input
                                        label="Phone *"
                                        type="tel"
                                        placeholder="+1 (555) 123-4567"
                                        error={errors.phone?.message}
                                        {...register('phone')}
                                    />
                                    <Input
                                        label="Company"
                                        placeholder="Your company (optional)"
                                        {...register('company')}
                                    />
                                </div>

                                <div className="mt-4">
                                    <Textarea
                                        label="Notes"
                                        placeholder="Any special requests or questions..."
                                        {...register('notes')}
                                    />
                                </div>
                            </div>

                            <p className="text-sm text-muted-foreground">
                                This is an inquiry form. A sales representative will contact you to finalize
                                your order and arrange payment.
                            </p>

                            <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
                                Submit Inquiry
                            </Button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="border rounded-lg p-6 sticky top-24">
                            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                            <ul className="space-y-4 mb-6">
                                {items.map((item) => {
                                    const heroImage = item.product?.heroImage as Media | undefined
                                    return (
                                        <li key={item.productId} className="flex gap-3">
                                            <div className="w-16 h-16 flex-shrink-0 bg-muted rounded-md overflow-hidden">
                                                {heroImage && (
                                                    <Image
                                                        src={heroImage.url || '/placeholder.jpg'}
                                                        alt={heroImage.alt}
                                                        width={64}
                                                        height={64}
                                                        className="h-full w-full object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium line-clamp-1">
                                                    {item.product?.name}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>
                                            <p className="text-sm font-medium">
                                                {formatPrice((item.product?.price || 0) * item.quantity)}
                                            </p>
                                        </li>
                                    )
                                })}
                            </ul>

                            <div className="border-t pt-4">
                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Total</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

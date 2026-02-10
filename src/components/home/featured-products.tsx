'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { formatPrice, cn } from '@/lib/utils'
import { useCart } from '@/context/cart-context'
import type { Product, Media } from '@/payload-types'

interface FeaturedProductsProps {
    products: Product[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
    return (
        <section className="py-24 bg-muted/50">
            <div className="container">
                <motion.div
                    className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div>
                        <h2 className="text-h2 font-serif mb-4">Featured Pens</h2>
                        <p className="text-muted-foreground max-w-xl">
                            Our most sought-after writing instruments, each a masterpiece of craftsmanship.
                        </p>
                    </div>
                    <Button variant="outline" className="mt-4 md:mt-0" asChild>
                        <Link href="/collections">View All</Link>
                    </Button>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function ProductCard({ product, index }: { product: Product; index: number }) {
    const { addItem } = useCart()
    const heroImage = product.heroImage as Media | undefined

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
        >
            <Link
                href={`/products/${product.slug}`}
                className={cn(
                    'block rounded-lg border border-border bg-card overflow-hidden',
                    'transition-all duration-300 hover:shadow-lg hover:-translate-y-1'
                )}
            >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                    {heroImage && (
                        <Image
                            src={heroImage.url || '/placeholder.jpg'}
                            alt={heroImage.alt}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    )}
                </div>

                {/* Content */}
                <div className="p-4">
                    <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
                    {product.shortDescription && (
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                            {product.shortDescription}
                        </p>
                    )}
                    <p className="font-semibold">{formatPrice(product.price)}</p>
                </div>
            </Link>

            {/* Quick add button */}
            <Button
                size="sm"
                className="w-full mt-2"
                onClick={() => addItem(String(product.id), product)}
            >
                Add to Cart
            </Button>
        </motion.div>
    )
}

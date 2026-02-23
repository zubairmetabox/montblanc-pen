'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { formatPrice, cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'
import type { Product, Media } from '@/payload-types'

interface ProductCardProps {
    product: Product
    index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
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
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            placeholder={heroImage.blurDataURL ? 'blur' : 'empty'}
                            blurDataURL={heroImage.blurDataURL ?? undefined}
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

interface ProductGridProps {
    products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No products found.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
            ))}
        </div>
    )
}

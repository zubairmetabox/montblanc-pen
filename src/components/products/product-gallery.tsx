'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Product, Media } from '@/payload-types'

interface ProductGalleryProps {
    product: Product
}

export function ProductGallery({ product }: ProductGalleryProps) {
    const heroImage = product.heroImage as Media | undefined
    const galleryImages = product.images || []

    // Combine hero + gallery images
    const allImages: Media[] = []
    if (heroImage) allImages.push(heroImage)
    galleryImages.forEach((item) => {
        const img = item.image as Media | undefined
        if (img) allImages.push(img)
    })

    const [selectedIndex, setSelectedIndex] = useState(0)
    const currentImage = allImages[selectedIndex]

    if (allImages.length === 0) {
        return (
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">No image</span>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                {currentImage && (
                    <Image
                        src={currentImage.url || '/placeholder.jpg'}
                        alt={currentImage.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        priority
                    />
                )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {allImages.map((image, index) => (
                        <button
                            key={image.id}
                            onClick={() => setSelectedIndex(index)}
                            className={cn(
                                'relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-colors',
                                selectedIndex === index
                                    ? 'border-primary'
                                    : 'border-transparent hover:border-muted-foreground/50'
                            )}
                        >
                            <Image
                                src={image.url || '/placeholder.jpg'}
                                alt={image.alt}
                                fill
                                sizes="80px"
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

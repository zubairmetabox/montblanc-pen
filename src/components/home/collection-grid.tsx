'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Collection, Media } from '@/payload-types'

interface CollectionGridProps {
    collections: Collection[]
}

export function CollectionGrid({ collections }: CollectionGridProps) {
    return (
        <section className="py-24">
            <div className="container">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-h2 font-serif mb-4">Our Collections</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Each collection represents a unique chapter in Montblanc&apos;s heritage of excellence.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {collections.map((collection, index) => (
                        <CollectionCard key={collection.id} collection={collection} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function CollectionCard({ collection, index }: { collection: Collection; index: number }) {
    const image = collection.heroImage as Media | undefined

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link
                href={`/collections/${collection.slug}`}
                className={cn(
                    'group relative block aspect-[3/4] overflow-hidden rounded-lg bg-muted',
                    'transition-all duration-300 hover:shadow-xl'
                )}
            >
                {image && (
                    <Image
                        src={image.url || '/placeholder.jpg'}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-serif text-xl font-semibold mb-2">{collection.name}</h3>
                    {collection.description && (
                        <p className="text-sm text-white/80 line-clamp-2">{collection.description}</p>
                    )}
                </div>
            </Link>
        </motion.div>
    )
}

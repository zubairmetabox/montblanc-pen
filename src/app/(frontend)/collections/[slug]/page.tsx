import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getCollectionBySlug, getProductsByCollection } from '@/lib/queries'
import { ProductGrid } from '@/components/products'
import type { Media } from '@/payload-types'

interface CollectionPageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
    const { slug } = await params
    const collection = await getCollectionBySlug(slug)

    if (!collection) {
        return { title: 'Collection Not Found' }
    }

    return {
        title: collection.name,
        description: collection.description || `Explore the ${collection.name} collection.`,
    }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
    const { slug } = await params
    const collection = await getCollectionBySlug(slug)

    if (!collection) {
        notFound()
    }

    const { products } = await getProductsByCollection(slug)
    const heroImage = collection.heroImage as Media | undefined

    return (
        <div className="py-12">
            {/* Hero section */}
            {heroImage && (
                <div
                    className="relative h-64 md:h-96 mb-12 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroImage.url})` }}
                >
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="container relative h-full flex items-center justify-center text-center text-white">
                        <div>
                            <h1 className="text-h1 font-serif mb-4">{collection.name}</h1>
                            {collection.description && (
                                <p className="text-lg max-w-2xl mx-auto text-white/80">
                                    {collection.description}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {!heroImage && (
                <div className="container mb-12 text-center">
                    <h1 className="text-h1 font-serif mb-4">{collection.name}</h1>
                    {collection.description && (
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            {collection.description}
                        </p>
                    )}
                </div>
            )}

            {/* Products */}
            <div className="container">
                <ProductGrid products={products} />
            </div>
        </div>
    )
}

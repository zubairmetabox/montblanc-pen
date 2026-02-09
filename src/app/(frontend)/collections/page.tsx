import { Metadata } from 'next'
import Link from 'next/link'
import { getCollections } from '@/lib/queries'
import { CollectionGrid } from '@/components/home'

export const metadata: Metadata = {
    title: 'Collections',
    description: 'Explore our curated Montblanc fountain pen collections.',
}

export default async function CollectionsPage() {
    const collections = await getCollections()

    return (
        <div className="py-12">
            <div className="container">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-h1 font-serif mb-4">Collections</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Each collection represents a unique chapter in Montblanc&apos;s heritage of excellence.
                    </p>
                </div>

                {/* Collections grid */}
                {collections.length > 0 ? (
                    <CollectionGrid collections={collections} />
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground mb-4">No collections available yet.</p>
                        <Link href="/" className="text-primary hover:underline">
                            Return Home
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

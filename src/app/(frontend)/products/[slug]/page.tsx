import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getProductBySlug, getRelatedProducts, getProducts } from '@/lib/queries'
import { ProductGallery, ProductInfo, ProductGrid } from '@/components/products'
import type { Collection, Product } from '@/payload-types'

export const dynamic = 'force-dynamic'

/*
export async function generateStaticParams() {
    const { products } = await getProducts(undefined, { limit: 100 })
    return products.map((product: Product) => ({
        slug: product.slug,
    }))
}
*/

interface ProductPageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { slug } = await params
    const product = await getProductBySlug(slug)

    if (!product) {
        return { title: 'Product Not Found' }
    }

    return {
        title: product.name,
        description: product.shortDescription || `Shop the ${product.name} at Montblanc Pens.`,
    }
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params
    const product = await getProductBySlug(slug)

    if (!product) {
        notFound()
    }

    const collection = product.penCollection as Collection | undefined
    const relatedProducts = collection
        ? await getRelatedProducts(String(product.id), String(collection.id))
        : []

    return (
        <div className="py-12">
            <div className="container">
                {/* Product main section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    <ProductGallery product={product} />
                    <ProductInfo product={product} />
                </div>

                {/* Related products */}
                {relatedProducts.length > 0 && (
                    <section className="pt-12 border-t border-border">
                        <h2 className="text-h2 font-serif mb-8">Related Products</h2>
                        <ProductGrid products={relatedProducts} />
                    </section>
                )}
            </div>
        </div>
    )
}

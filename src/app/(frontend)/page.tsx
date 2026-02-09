import { HeroSection, CollectionGrid, FeaturedProducts, UspSection } from '@/components/home'
import { getFeaturedCollections, getFeaturedProducts } from '@/lib/queries'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  // Fetch data in parallel
  const [collections, products] = await Promise.all([
    getFeaturedCollections(),
    getFeaturedProducts(4),
  ])

  return (
    <>
      <HeroSection />

      {collections.length > 0 && <CollectionGrid collections={collections} />}

      {products.length > 0 && <FeaturedProducts products={products} />}

      <UspSection />
    </>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/context/cart-context'
import type { Product, Collection } from '@/payload-types'

interface ProductInfoProps {
    product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
    const { addItem } = useCart()
    const collection = product.penCollection as Collection | undefined
    const specs = product.specifications

    const isInStock = (product.stock || 0) > 0

    return (
        <div className="space-y-6">
            {/* Collection */}
            {collection && (
                <p className="text-sm text-muted-foreground uppercase tracking-wide">
                    {collection.name}
                </p>
            )}

            {/* Title */}
            <h1 className="text-h1 font-serif">{product.name}</h1>

            {/* Price & SKU */}
            <div className="flex items-center gap-4">
                <p className="text-2xl font-semibold">{formatPrice(product.price)}</p>
                {product.sku && (
                    <span className="text-sm text-muted-foreground">SKU: {product.sku}</span>
                )}
            </div>

            {/* Stock status */}
            <Badge variant={isInStock ? 'success' : 'destructive'}>
                {isInStock ? `In Stock (${product.stock})` : 'Out of Stock'}
            </Badge>

            {/* Short description */}
            {product.shortDescription && (
                <p className="text-muted-foreground">{product.shortDescription}</p>
            )}

            {/* Add to cart */}
            <div className="pt-4">
                <Button
                    size="xl"
                    className="w-full md:w-auto"
                    disabled={!isInStock}
                    onClick={() => addItem(product.id, product)}
                >
                    {isInStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
            </div>

            {/* Specifications accordion */}
            {specs && (
                <Accordion type="single" collapsible className="pt-6">
                    <AccordionItem value="specifications">
                        <AccordionTrigger>Specifications</AccordionTrigger>
                        <AccordionContent>
                            <dl className="grid grid-cols-2 gap-4 text-sm">
                                {specs.nibSize && (
                                    <>
                                        <dt className="text-muted-foreground">Nib Size</dt>
                                        <dd>{specs.nibSize}</dd>
                                    </>
                                )}
                                {specs.nibMaterial && (
                                    <>
                                        <dt className="text-muted-foreground">Nib Material</dt>
                                        <dd>{specs.nibMaterial}</dd>
                                    </>
                                )}
                                {specs.material && (
                                    <>
                                        <dt className="text-muted-foreground">Material</dt>
                                        <dd>{specs.material}</dd>
                                    </>
                                )}
                                {specs.trimColor && (
                                    <>
                                        <dt className="text-muted-foreground">Trim</dt>
                                        <dd>{specs.trimColor}</dd>
                                    </>
                                )}
                                {specs.length && (
                                    <>
                                        <dt className="text-muted-foreground">Length</dt>
                                        <dd>{specs.length}</dd>
                                    </>
                                )}
                                {specs.weight && (
                                    <>
                                        <dt className="text-muted-foreground">Weight</dt>
                                        <dd>{specs.weight}</dd>
                                    </>
                                )}
                                {specs.fillingSystem && (
                                    <>
                                        <dt className="text-muted-foreground">Filling System</dt>
                                        <dd>{specs.fillingSystem}</dd>
                                    </>
                                )}
                            </dl>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            )}
        </div>
    )
}

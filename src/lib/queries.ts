import { getPayload } from 'payload'
import * as React from 'react'
import config from '@/payload.config'
import type { Product, Collection, Order } from '@/payload-types'

// Robust cache fallback
const cache = (React as any).cache || ((fn: any) => fn)

// Types for query options
interface QueryOptions {
    limit?: number
    page?: number
    sort?: string
}

interface ProductFilters {
    collection?: string
    nibSize?: string
    trimColor?: string
    minPrice?: number
    maxPrice?: number
    featured?: boolean
}

/**
 * Global cache for the Payload instance to prevent re-initialization in development
 */
const globalWithPayload = global as typeof globalThis & {
    payload: {
        client: any | null
        promise: Promise<any> | null
    }
}

if (!globalWithPayload.payload) {
    globalWithPayload.payload = { client: null, promise: null }
}

export const getPayloadClient = async () => {
    // In production, we don't want to use the global singleton the same way 
    // to avoid potential issues with serverless execution contexts
    if (process.env.NODE_ENV === 'production') {
        return await getPayload({ config })
    }

    if (globalWithPayload.payload.client) {
        return globalWithPayload.payload.client
    }

    if (!globalWithPayload.payload.promise) {
        globalWithPayload.payload.promise = getPayload({ config })
    }

    try {
        globalWithPayload.payload.client = await globalWithPayload.payload.promise
    } catch (e) {
        globalWithPayload.payload.promise = null
        console.error('Payload initialization failed:', e)
        throw e
    }

    return globalWithPayload.payload.client
}

/**
 * Fetch all collections
 */
export const getCollections = cache(async (options?: QueryOptions): Promise<Collection[]> => {
    const payload = await getPayloadClient()

    const result = await payload.find({
        collection: 'collections',
        limit: options?.limit || 100,
        page: options?.page || 1,
        sort: options?.sort || 'name',
    })

    return result.docs as Collection[]
})

/**
 * Fetch a single collection by slug
 */
export const getCollectionBySlug = cache(async (slug: string): Promise<Collection | null> => {
    const payload = await getPayloadClient()

    const result = await payload.find({
        collection: 'collections',
        where: {
            slug: { equals: slug },
        },
        limit: 1,
    })

    return (result.docs[0] as Collection) || null
})

/**
 * Fetch featured collections
 */
export const getFeaturedCollections = cache(async (): Promise<Collection[]> => {
    const payload = await getPayloadClient()

    const result = await payload.find({
        collection: 'collections',
        where: {
            featured: { equals: true },
        },
        limit: 4,
    })

    return result.docs as Collection[]
})

/**
 * Fetch products with optional filters
 */
export const getProducts = cache(async (
    filters?: ProductFilters,
    options?: QueryOptions
): Promise<{ products: Product[]; totalPages: number; totalDocs: number }> => {
    const payload = await getPayloadClient()

    // Build where clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {}

    if (filters?.collection) {
        where['penCollection.slug'] = { equals: filters.collection }
    }
    if (filters?.nibSize) {
        where['specifications.nibSize'] = { equals: filters.nibSize }
    }
    if (filters?.trimColor) {
        where['specifications.trimColor'] = { equals: filters.trimColor }
    }
    if (filters?.minPrice !== undefined) {
        where.price = { ...((where.price as object) || {}), greater_than_equal: filters.minPrice }
    }
    if (filters?.maxPrice !== undefined) {
        where.price = { ...((where.price as object) || {}), less_than_equal: filters.maxPrice }
    }
    if (filters?.featured !== undefined) {
        where.featured = { equals: filters.featured }
    }

    const result = await payload.find({
        collection: 'products',
        where,
        limit: options?.limit || 12,
        page: options?.page || 1,
        sort: options?.sort || '-createdAt',
        depth: 2, // Include related collections and images
    })

    return {
        products: result.docs as Product[],
        totalPages: result.totalPages,
        totalDocs: result.totalDocs,
    }
})

/**
 * Fetch a single product by slug
 */
export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
    const payload = await getPayloadClient()

    const result = await payload.find({
        collection: 'products',
        where: {
            slug: { equals: slug },
        },
        limit: 1,
        depth: 2,
    })

    return (result.docs[0] as Product) || null
})

/**
 * Fetch featured products
 */
export const getFeaturedProducts = cache(async (limit = 4): Promise<Product[]> => {
    const payload = await getPayloadClient()

    const result = await payload.find({
        collection: 'products',
        where: {
            featured: { equals: true },
        },
        limit,
        depth: 2,
    })

    return result.docs as Product[]
})

/**
 * Fetch products in a collection
 */
export const getProductsByCollection = cache(async (
    collectionSlug: string,
    options?: QueryOptions
): Promise<{ products: Product[]; totalPages: number }> => {
    const payload = await getPayloadClient()

    // First get the collection ID
    const collection = await getCollectionBySlug(collectionSlug)
    if (!collection) {
        return { products: [], totalPages: 0 }
    }

    const result = await payload.find({
        collection: 'products',
        where: {
            penCollection: { equals: collection.id },
        },
        limit: options?.limit || 12,
        page: options?.page || 1,
        sort: options?.sort || '-createdAt',
        depth: 2,
    })

    return {
        products: result.docs as Product[],
        totalPages: result.totalPages,
    }
})

/**
 * Create a new order
 */
export const createOrder = async (orderData: {
    customerName: string
    email: string
    phone: string
    company?: string
    items: { product: string; quantity: number; priceAtTime: number }[]
    totalAmount: number
    notes?: string
}): Promise<Order> => {
    const payload = await getPayloadClient()

    // Generate order number
    const timestamp = Date.now().toString(36).toUpperCase()
    const random = Math.random().toString(36).substring(2, 6).toUpperCase()
    const orderNumber = `MB-${timestamp}-${random}`

    try {
        const order = await payload.create({
            collection: 'orders',
            data: {
                ...orderData,
                items: orderData.items.map((item) => ({
                    ...item,
                    // Ensure product ID is correctly formatted (some DBs expect numbers)
                    product: isNaN(Number(item.product)) ? item.product : Number(item.product),
                })),
                orderNumber,
                status: 'pending',
            },
        })
        return order as Order
    } catch (error: any) {
        throw error
    }
}

/**
 * Get related products (same collection, excluding current)
 */
export const getRelatedProducts = cache(async (
    currentProductId: string,
    collectionId: string,
    limit = 4
): Promise<Product[]> => {
    const payload = await getPayloadClient()

    const result = await payload.find({
        collection: 'products',
        where: {
            and: [
                { penCollection: { equals: collectionId } },
                { id: { not_equals: currentProductId } },
            ],
        },
        limit,
        depth: 2,
    })

    return result.docs as Product[]
})

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import fs from 'node:fs'
import path from 'node:path'

const collectionData = [
    {
        name: 'Meisterstück',
        slug: 'meisterstuck',
        description: 'The iconic Meisterstück collection represents the pinnacle of Montblanc craftsmanship since 1924. These writing instruments embody timeless elegance and exceptional quality.',
        featured: true,
        imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1200', // Verified pen
    },
    {
        name: 'StarWalker',
        slug: 'starwalker',
        description: 'A modern interpretation of Montblanc heritage, designed for the contemporary leader. Bold aesthetics meet precision engineering.',
        featured: true,
        imageUrl: 'https://images.unsplash.com/photo-1511108620888-03823769c735?q=80&w=1200', // Verified pen
    },
    {
        name: 'Heritage',
        slug: 'heritage',
        description: 'Drawing inspiration from Montblanc history, this collection pays homage to classic design with modern functionality.',
        featured: true,
        imageUrl: 'https://images.unsplash.com/photo-1569012871812-f38ee6fc052d?q=80&w=1200', // Vintage feel
    },
    {
        name: 'Writers Edition',
        slug: 'writers-edition',
        description: 'Limited edition writing instruments celebrating literary legends. Each pen is a tribute to the world\'s greatest authors.',
        featured: true,
        imageUrl: 'https://images.unsplash.com/photo-1531346680769-a1d79b57ca5e?q=80&w=1200', // Writing focus
    },
]

const productData = [
    {
        name: 'Meisterstück 149 Platinum Fountain Pen',
        slug: 'meisterstuck-149-platinum',
        collectionSlug: 'meisterstuck',
        price: 1110,
        sku: 'MB-149-PT',
        shortDescription: 'The flagship Montblanc fountain pen with handcrafted 18K gold nib and platinum-coated details.',
        stock: 5,
        featured: true,
        imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1000',
        specifications: {
            nibSize: 'M',
            nibMaterial: '18K Gold',
            material: 'Precious Resin',
            trimColor: 'Platinum',
            length: '147mm',
            weight: '32g',
            fillingSystem: 'Piston',
        },
    },
    {
        name: 'Meisterstück 146 LeGrand Fountain Pen',
        slug: 'meisterstuck-146-legrand',
        collectionSlug: 'meisterstuck',
        price: 935,
        sku: 'MB-146-GD',
        shortDescription: 'A slightly more compact version of the iconic 149, perfect for everyday use.',
        stock: 8,
        featured: true,
        imageUrl: 'https://images.unsplash.com/photo-1511108620888-03823769c735?q=80&w=1000',
        specifications: {
            nibSize: 'F',
            nibMaterial: '14K Gold',
            material: 'Precious Resin',
            trimColor: 'Gold',
            length: '140mm',
            weight: '26g',
            fillingSystem: 'Piston',
        },
    },
    {
        name: 'StarWalker Midnight Black Fountain Pen',
        slug: 'starwalker-midnight-black',
        collectionSlug: 'starwalker',
        price: 790,
        sku: 'MB-SW-MN',
        shortDescription: 'Contemporary design with floating Montblanc emblem in the transparent dome.',
        stock: 10,
        featured: true,
        imageUrl: 'https://images.unsplash.com/photo-1585336139118-89ce735213f0?q=80&w=1000',
        specifications: {
            nibSize: 'M',
            nibMaterial: '14K Gold',
            material: 'Black Precious Resin',
            trimColor: 'Platinum',
            length: '141mm',
            weight: '28g',
            fillingSystem: 'Cartridge/Converter',
        },
    },
    {
        name: 'Heritage Rouge et Noir Fountain Pen',
        slug: 'heritage-rouge-noir',
        collectionSlug: 'heritage',
        price: 1020,
        sku: 'MB-HR-RN',
        shortDescription: 'Inspired by the original 1906 design, featuring the coral-colored snake clip.',
        stock: 3,
        featured: true,
        imageUrl: 'https://images.unsplash.com/photo-1569012871812-f38ee6fc052d?q=80&w=1000',
        specifications: {
            nibSize: 'M',
            nibMaterial: '14K Gold',
            material: 'Black Precious Resin',
            trimColor: 'Ruthenium',
            length: '136mm',
            weight: '27g',
            fillingSystem: 'Piston',
        },
    },
    {
        name: 'Meisterstück Classique Fountain Pen',
        slug: 'meisterstuck-classique',
        collectionSlug: 'meisterstuck',
        price: 615,
        sku: 'MB-MC-CL',
        shortDescription: 'The compact Classique model, ideal for those who prefer a lighter writing instrument.',
        stock: 12,
        featured: false,
        imageUrl: 'https://images.unsplash.com/photo-1531346680769-a1d79b57ca5e?q=80&w=1000',
        specifications: {
            nibSize: 'F',
            nibMaterial: '14K Gold',
            material: 'Precious Resin',
            trimColor: 'Gold',
            length: '145mm',
            weight: '20g',
            fillingSystem: 'Cartridge/Converter',
        },
    },
    {
        name: 'StarWalker SpaceBlue Fountain Pen',
        slug: 'starwalker-spaceblue',
        collectionSlug: 'starwalker',
        price: 750,
        sku: 'MB-SW-SB',
        shortDescription: 'Blue lacquer finish with ruthenium-coated fittings for a celestial aesthetic.',
        stock: 6,
        featured: false,
        imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000',
        specifications: {
            nibSize: 'M',
            nibMaterial: '14K Gold',
            material: 'Blue Lacquer',
            trimColor: 'Ruthenium',
            length: '141mm',
            weight: '28g',
            fillingSystem: 'Cartridge/Converter',
        },
    },
]

async function downloadImage(url: string): Promise<Buffer> {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText} (${url})`)
    const arrayBuffer = await response.arrayBuffer()
    return Buffer.from(arrayBuffer)
}

const GIF_FALLBACK = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64')

async function seed() {
    console.log('🌱 Starting seed with real images...')

    const payload = await getPayload({ config })

    // Clear existing data
    console.log('Clearing existing data...')
    await payload.delete({ collection: 'products', where: {} })
    await payload.delete({ collection: 'collections', where: {} })
    await payload.delete({ collection: 'media', where: {} })

    // Helper to upload image from URL
    const uploadImage = async (url: string, prefix: string, alt: string) => {
        console.log(`  Attempting download for ${prefix}...`)
        try {
            const data = await downloadImage(url)
            const filename = `${prefix}-${Date.now()}.jpg`
            const mediaDoc = await payload.create({
                collection: 'media',
                data: { alt },
                file: {
                    data,
                    name: filename,
                    mimetype: 'image/jpeg',
                    size: data.length,
                },
            })
            return mediaDoc.id
        } catch (error) {
            console.error(`  ⚠️ Failed to download ${url}, using fallback.`, error)
            const filename = `${prefix}-fallback-${Date.now()}.gif`
            const mediaDoc = await payload.create({
                collection: 'media',
                data: { alt: `${alt} (Fallback)` },
                file: {
                    data: GIF_FALLBACK,
                    name: filename,
                    mimetype: 'image/gif',
                    size: GIF_FALLBACK.length,
                },
            })
            return mediaDoc.id
        }
    }

    // Create collections
    console.log('Creating collections...')
    const createdCollections: Record<string, string> = {}

    for (const collection of collectionData) {
        const { imageUrl, ...rest } = collection
        const heroImageId = await uploadImage(imageUrl, collection.slug, `${collection.name} Hero`)

        const created = await payload.create({
            collection: 'collections',
            data: {
                ...rest,
                heroImage: heroImageId,
            },
        })
        createdCollections[collection.slug] = created.id
        console.log(`  ✓ Created collection: ${collection.name}`)
    }

    // Create products
    console.log('Creating products...')

    for (const product of productData) {
        const collectionId = createdCollections[product.collectionSlug]
        const { collectionSlug, imageUrl, ...productFields } = product

        const imageId = await uploadImage(imageUrl, product.slug, product.name)

        await payload.create({
            collection: 'products',
            data: {
                ...productFields,
                specifications: {
                    ...productFields.specifications,
                    nibSize: productFields.specifications.nibSize as any,
                    trimColor: productFields.specifications.trimColor as any,
                    fillingSystem: productFields.specifications.fillingSystem as any,
                },
                penCollection: collectionId,
                heroImage: imageId,
                images: [
                    {
                        image: imageId,
                        alt: `${product.name} Gallery Image`,
                    },
                ],
                description: {
                    root: {
                        type: 'root',
                        children: [
                            {
                                type: 'paragraph',
                                children: [{ type: 'text', text: productFields.shortDescription, version: 1 }],
                                version: 1,
                            },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                    },
                },
            },
        })
        console.log(`  ✓ Created product: ${product.name}`)
    }

    console.log('✅ Seed completed with real images!')
    process.exit(0)
}

seed().catch((error) => {
    console.error('Seed error:', error)
    process.exit(1)
})

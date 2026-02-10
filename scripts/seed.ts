import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const collectionData = [
    {
        name: 'Meisterstück',
        slug: 'meisterstuck',
        description: 'The iconic Meisterstück collection represents the pinnacle of Montblanc craftsmanship since 1924. These writing instruments embody timeless elegance and exceptional quality.',
        featured: true,
        imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1200',
    },
    {
        name: 'StarWalker',
        slug: 'starwalker',
        description: 'A modern interpretation of Montblanc heritage, designed for the contemporary leader. Bold aesthetics meet precision engineering.',
        featured: true,
        imageUrl: 'https://images.unsplash.com/photo-1560859251-d563a49c5e4a?q=80&w=1200',
    },
    {
        name: 'Heritage',
        slug: 'heritage',
        description: 'Drawing inspiration from Montblanc history, this collection pays homage to classic design with modern functionality.',
        featured: true,
        imageUrl: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?q=80&w=1200',
    },
    {
        name: 'Writers Edition',
        slug: 'writers-edition',
        description: 'Limited edition writing instruments celebrating literary legends. Each pen is a tribute to the world\'s greatest authors.',
        featured: true,
        imageUrl: 'https://images.unsplash.com/photo-1493217465235-252dd9c0d632?q=80&w=1200',
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
        images: [
            { url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1000', alt: 'Meisterstück 149 Platinum Front View' },
            { url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000', alt: 'Meisterstück 149 Platinum Detail' },
        ],
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
        shortDescription: 'A slightly more compact version of the iconic 149, perfect for everyday use with its refined gold trim.',
        stock: 8,
        featured: true,
        images: [
            { url: 'https://images.unsplash.com/photo-1560859251-d563a49c5e4a?q=80&w=1000', alt: 'Meisterstück 146 LeGrand Front View' },
            { url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000', alt: 'Meisterstück 146 LeGrand Close Up' },
        ],
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
        name: 'Meisterstück Classique Fountain Pen',
        slug: 'meisterstuck-classique',
        collectionSlug: 'meisterstuck',
        price: 615,
        sku: 'MB-MC-CL',
        shortDescription: 'The compact Classique model, ideal for on-the-go writing with impeccable Montblanc style.',
        stock: 12,
        featured: false,
        images: [
            { url: 'https://images.unsplash.com/photo-1493217465235-252dd9c0d632?q=80&w=1000', alt: 'Meisterstück Classique Front View' },
            { url: 'https://images.unsplash.com/photo-1517842264405-72bb906a1936?q=80&w=1000', alt: 'Meisterstück Classique On Desk' },
        ],
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
        name: 'StarWalker Midnight Black Fountain Pen',
        slug: 'starwalker-midnight-black',
        collectionSlug: 'starwalker',
        price: 790,
        sku: 'MB-SW-MN',
        shortDescription: 'Contemporary design with floating Montblanc emblem in the transparent dome, finished in deep black.',
        stock: 10,
        featured: true,
        images: [
            { url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000', alt: 'StarWalker Midnight Black Front View' },
            { url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000', alt: 'StarWalker Midnight Black Side View' },
        ],
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
        name: 'StarWalker SpaceBlue Fountain Pen',
        slug: 'starwalker-spaceblue',
        collectionSlug: 'starwalker',
        price: 750,
        sku: 'MB-SW-SB',
        shortDescription: 'Blue lacquer finish with ruthenium-coated fittings for a celestial aesthetic.',
        stock: 6,
        featured: false,
        images: [
            { url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000', alt: 'StarWalker SpaceBlue Front View' },
            { url: 'https://images.unsplash.com/photo-1501618669935-18b6ecb13d6d?q=80&w=1000', alt: 'StarWalker SpaceBlue With Inkwell' },
        ],
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
    {
        name: 'Heritage Rouge et Noir Fountain Pen',
        slug: 'heritage-rouge-noir',
        collectionSlug: 'heritage',
        price: 1020,
        sku: 'MB-HR-RN',
        shortDescription: 'Inspired by the original 1906 design, featuring the iconic coral-colored snake clip.',
        stock: 3,
        featured: true,
        images: [
            { url: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?q=80&w=1000', alt: 'Heritage Rouge et Noir Front View' },
            { url: 'https://images.unsplash.com/photo-1518826778770-a729fb53327c?q=80&w=1000', alt: 'Heritage Rouge et Noir Detail' },
        ],
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
        name: 'Heritage Egyptomania Fountain Pen',
        slug: 'heritage-egyptomania',
        collectionSlug: 'heritage',
        price: 1280,
        sku: 'MB-HR-EG',
        shortDescription: 'A tribute to ancient Egypt with Art Deco motifs, lacquered in shimmering gold and black.',
        stock: 2,
        featured: false,
        images: [
            { url: 'https://images.unsplash.com/photo-1517842264405-72bb906a1936?q=80&w=1000', alt: 'Heritage Egyptomania Front View' },
            { url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000', alt: 'Heritage Egyptomania Side View' },
        ],
        specifications: {
            nibSize: 'M',
            nibMaterial: '18K Gold',
            material: 'Lacquer',
            trimColor: 'Gold',
            length: '139mm',
            weight: '29g',
            fillingSystem: 'Piston',
        },
    },
    {
        name: 'Writers Edition Homage to Homer',
        slug: 'writers-edition-homer',
        collectionSlug: 'writers-edition',
        price: 1460,
        sku: 'MB-WE-HM',
        shortDescription: 'A limited edition masterpiece celebrating the author of the Odyssey, with hand-engraved cap and barrel.',
        stock: 1,
        featured: true,
        images: [
            { url: 'https://images.unsplash.com/photo-1501618669935-18b6ecb13d6d?q=80&w=1000', alt: 'Writers Edition Homer Front View' },
            { url: 'https://images.unsplash.com/photo-1518826778770-a729fb53327c?q=80&w=1000', alt: 'Writers Edition Homer Nib Detail' },
        ],
        specifications: {
            nibSize: 'B',
            nibMaterial: '18K Gold',
            material: 'Precious Resin with Engraving',
            trimColor: 'Gold',
            length: '148mm',
            weight: '34g',
            fillingSystem: 'Piston',
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
    console.log('🌱 Starting Supabase seed with fresh images...')

    const payload = await getPayload({ config })

    // Clear existing data
    console.log('Clearing existing data...')
    await payload.delete({ collection: 'products', where: {} })
    await payload.delete({ collection: 'collections', where: {} })
    await payload.delete({ collection: 'media', where: {} })

    // Helper to upload image from URL
    const uploadImage = async (url: string, prefix: string, alt: string) => {
        console.log(`  Downloading ${prefix}...`)
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
    const createdCollections: Record<string, number> = {}

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
        createdCollections[collection.slug] = created.id as number
        console.log(`  ✓ Created collection: ${collection.name}`)
    }

    // Create products
    console.log('Creating products (8 products with gallery images)...')

    for (const product of productData) {
        const collectionId = createdCollections[product.collectionSlug]
        const { collectionSlug, images: imageList, ...productFields } = product

        // Upload hero image (first image)
        const heroImageId = await uploadImage(imageList[0].url, `${product.slug}-hero`, imageList[0].alt)

        // Upload gallery images (all images)
        const galleryImages = []
        for (let i = 0; i < imageList.length; i++) {
            const imgId = i === 0
                ? heroImageId
                : await uploadImage(imageList[i].url, `${product.slug}-gallery-${i}`, imageList[i].alt)
            galleryImages.push({
                image: imgId,
                alt: imageList[i].alt,
            })
        }

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
                heroImage: heroImageId,
                images: galleryImages,
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

    console.log('✅ Supabase seed completed with 4 collections and 8 products!')
    process.exit(0)
}

seed().catch((error) => {
    console.error('Seed error:', error)
    process.exit(1)
})

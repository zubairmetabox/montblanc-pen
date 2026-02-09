import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const collections = [
    {
        name: 'Meisterstück',
        slug: 'meisterstuck',
        description: 'The iconic Meisterstück collection represents the pinnacle of Montblanc craftsmanship since 1924. These writing instruments embody timeless elegance and exceptional quality.',
        featured: true,
    },
    {
        name: 'StarWalker',
        slug: 'starwalker',
        description: 'A modern interpretation of Montblanc heritage, designed for the contemporary leader. Bold aesthetics meet precision engineering.',
        featured: true,
    },
    {
        name: 'Heritage',
        slug: 'heritage',
        description: 'Drawing inspiration from Montblanc history, this collection pays homage to classic design with modern functionality.',
        featured: true,
    },
    {
        name: 'Writers Edition',
        slug: 'writers-edition',
        description: 'Limited edition writing instruments celebrating literary legends. Each pen is a tribute to the world\'s greatest authors.',
        featured: true,
    },
]

const products = [
    {
        name: 'Meisterstück 149 Platinum Fountain Pen',
        slug: 'meisterstuck-149-platinum',
        collectionSlug: 'meisterstuck',
        price: 1110,
        sku: 'MB-149-PT',
        shortDescription: 'The flagship Montblanc fountain pen with handcrafted 18K gold nib and platinum-coated details.',
        stock: 5,
        featured: true,
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
] as const

async function seed() {
    console.log('🌱 Starting seed...')

    const payload = await getPayload({ config })

    // Clear existing data
    console.log('Clearing existing data...')
    await payload.delete({ collection: 'products', where: {} })
    await payload.delete({ collection: 'collections', where: {} })

    // Create collections
    console.log('Creating collections...')
    const createdCollections: Record<string, string> = {}

    for (const collection of collections) {
        const created = await payload.create({
            collection: 'collections',
            data: collection,
        })
        createdCollections[collection.slug] = created.id
        console.log(`  ✓ Created collection: ${collection.name}`)
    }

    // Create products
    console.log('Creating products...')

    for (const product of products) {
        const collectionId = createdCollections[product.collectionSlug]
        const { collectionSlug, ...productData } = product

        await payload.create({
            collection: 'products',
            data: {
                ...productData,
                penCollection: collectionId,
                description: {
                    root: {
                        type: 'root',
                        children: [
                            {
                                type: 'paragraph',
                                children: [{ type: 'text', text: productData.shortDescription, version: 1 }],
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

    console.log('✅ Seed completed!')
    process.exit(0)
}

seed().catch((error) => {
    console.error('Seed error:', error)
    process.exit(1)
})

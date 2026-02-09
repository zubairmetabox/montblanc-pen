import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'penCollection', 'price', 'stock', 'featured'],
        description: 'Montblanc fountain pens',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Product Name',
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                description: 'URL-friendly identifier',
            },
        },
        {
            name: 'penCollection',
            type: 'relationship',
            relationTo: 'collections',
            required: true,
            label: 'Collection',
        },
        {
            name: 'price',
            type: 'number',
            required: true,
            min: 0,
            admin: {
                description: 'Price in USD',
            },
        },
        {
            name: 'sku',
            type: 'text',
            required: true,
            unique: true,
            label: 'SKU',
        },
        {
            name: 'description',
            type: 'richText',
            required: true,
        },
        {
            name: 'shortDescription',
            type: 'textarea',
            maxLength: 200,
            admin: {
                description: 'Brief description for product cards (max 200 chars)',
            },
        },
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Specifications',
                    fields: [
                        {
                            name: 'specifications',
                            type: 'group',
                            fields: [
                                {
                                    name: 'nibSize',
                                    type: 'select',
                                    options: [
                                        { label: 'Extra Fine (EF)', value: 'EF' },
                                        { label: 'Fine (F)', value: 'F' },
                                        { label: 'Medium (M)', value: 'M' },
                                        { label: 'Broad (B)', value: 'B' },
                                        { label: 'Stub', value: 'Stub' },
                                    ],
                                    label: 'Nib Size',
                                },
                                {
                                    name: 'nibMaterial',
                                    type: 'text',
                                    label: 'Nib Material',
                                    admin: {
                                        description: 'e.g., 14K Gold, 18K Gold',
                                    },
                                },
                                {
                                    name: 'material',
                                    type: 'text',
                                    label: 'Barrel Material',
                                    admin: {
                                        description: 'e.g., Precious Resin, Lacquer',
                                    },
                                },
                                {
                                    name: 'trimColor',
                                    type: 'select',
                                    options: [
                                        { label: 'Gold', value: 'Gold' },
                                        { label: 'Platinum', value: 'Platinum' },
                                        { label: 'Ruthenium', value: 'Ruthenium' },
                                        { label: 'Rose Gold', value: 'Rose Gold' },
                                    ],
                                    label: 'Trim Color',
                                },
                                {
                                    name: 'length',
                                    type: 'text',
                                    label: 'Length',
                                    admin: {
                                        description: 'e.g., 147mm',
                                    },
                                },
                                {
                                    name: 'weight',
                                    type: 'text',
                                    label: 'Weight',
                                    admin: {
                                        description: 'e.g., 32g',
                                    },
                                },
                                {
                                    name: 'fillingSystem',
                                    type: 'select',
                                    options: [
                                        { label: 'Piston', value: 'Piston' },
                                        { label: 'Cartridge/Converter', value: 'Cartridge/Converter' },
                                        { label: 'Capillary', value: 'Capillary' },
                                    ],
                                    label: 'Filling System',
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Images',
                    fields: [
                        {
                            name: 'heroImage',
                            type: 'upload',
                            relationTo: 'media',
                            required: true,
                            label: 'Hero Image',
                        },
                        {
                            name: 'images',
                            type: 'array',
                            minRows: 1,
                            maxRows: 8,
                            label: 'Gallery Images',
                            fields: [
                                {
                                    name: 'image',
                                    type: 'upload',
                                    relationTo: 'media',
                                    required: true,
                                },
                                {
                                    name: 'alt',
                                    type: 'text',
                                    required: true,
                                    label: 'Alt Text',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: 'stock',
            type: 'number',
            required: true,
            defaultValue: 0,
            min: 0,
            admin: {
                description: 'Available quantity',
            },
        },
        {
            name: 'featured',
            type: 'checkbox',
            defaultValue: false,
            label: 'Featured Product',
            admin: {
                description: 'Show on homepage featured section',
            },
        },
    ],
}

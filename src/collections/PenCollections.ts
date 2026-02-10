import type { CollectionConfig } from 'payload'

export const PenCollections: CollectionConfig = {
    slug: 'collections',
    admin: {
        useAsTitle: 'name',
        description: 'Montblanc pen collections (e.g., Meisterstück, StarWalker)',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Collection Name',
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                description: 'URL-friendly identifier (e.g., meisterstuck)',
            },
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Description',
        },
        {
            name: 'heroImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Hero Image',
            admin: {
                description: 'Banner image for collection page',
            },
        },
        {
            name: 'featured',
            type: 'checkbox',
            defaultValue: false,
            label: 'Featured on Homepage',
        },
    ],
}

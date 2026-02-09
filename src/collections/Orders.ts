import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
    slug: 'orders',
    admin: {
        useAsTitle: 'orderNumber',
        defaultColumns: ['orderNumber', 'customerName', 'email', 'status', 'totalAmount', 'createdAt'],
        description: 'Customer inquiries and orders',
    },
    access: {
        read: () => true,
        create: () => true,
    },
    fields: [
        {
            name: 'orderNumber',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                readOnly: true,
                description: 'Auto-generated order number',
            },
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'customerName',
                    type: 'text',
                    required: true,
                    label: 'Customer Name',
                    admin: {
                        width: '50%',
                    },
                },
                {
                    name: 'email',
                    type: 'email',
                    required: true,
                    admin: {
                        width: '50%',
                    },
                },
            ],
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'phone',
                    type: 'text',
                    required: true,
                    admin: {
                        width: '50%',
                    },
                },
                {
                    name: 'company',
                    type: 'text',
                    admin: {
                        width: '50%',
                    },
                },
            ],
        },
        {
            name: 'items',
            type: 'array',
            required: true,
            minRows: 1,
            label: 'Order Items',
            fields: [
                {
                    name: 'product',
                    type: 'relationship',
                    relationTo: 'products',
                    required: true,
                },
                {
                    name: 'quantity',
                    type: 'number',
                    required: true,
                    min: 1,
                    defaultValue: 1,
                },
                {
                    name: 'priceAtTime',
                    type: 'number',
                    required: true,
                    admin: {
                        readOnly: true,
                        description: 'Price when order was placed',
                    },
                },
            ],
        },
        {
            name: 'totalAmount',
            type: 'number',
            required: true,
            admin: {
                readOnly: true,
                description: 'Total order amount in USD',
            },
        },
        {
            name: 'status',
            type: 'select',
            required: true,
            defaultValue: 'pending',
            options: [
                { label: 'Pending', value: 'pending' },
                { label: 'Confirmed', value: 'confirmed' },
                { label: 'Processing', value: 'processing' },
                { label: 'Completed', value: 'completed' },
                { label: 'Cancelled', value: 'cancelled' },
            ],
        },
        {
            name: 'notes',
            type: 'textarea',
            label: 'Customer Notes',
        },
        {
            name: 'adminNotes',
            type: 'textarea',
            label: 'Admin Notes',
            admin: {
                description: 'Internal notes (not visible to customer)',
            },
        },
    ],
    hooks: {
        beforeChange: [
            async ({ data, operation }) => {
                if (operation === 'create' && !data.orderNumber) {
                    const timestamp = Date.now().toString(36).toUpperCase()
                    const random = Math.random().toString(36).substring(2, 6).toUpperCase()
                    data.orderNumber = `MB-${timestamp}-${random}`
                }
                return data
            },
        ],
    },
}

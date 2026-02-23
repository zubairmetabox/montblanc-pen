import type { CollectionConfig } from 'payload'
import sharp from 'sharp'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 400,
        position: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: 800,
        position: 'centre',
      },
      {
        name: 'product',
        width: 2000,
        height: 2000,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (!req.file?.data) return data
        try {
          const lqipBuffer = await sharp(req.file.data)
            .resize(16, 16, { fit: 'cover' })
            .webp({ quality: 20 })
            .toBuffer()
          data.blurDataURL = `data:image/webp;base64,${lqipBuffer.toString('base64')}`
        } catch (err) {
          console.warn('[Media] LQIP generation failed, skipping blurDataURL:', err)
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
      admin: {
        description: 'Describe the image for accessibility',
      },
    },
    {
      name: 'blurDataURL',
      type: 'text',
      admin: {
        hidden: true,
        readOnly: true,
        description: 'Auto-generated LQIP blur placeholder (Base64 WebP data URI)',
      },
    },
  ],
}

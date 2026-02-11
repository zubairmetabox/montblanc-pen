import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor, HeadingFeature, BoldFeature, ItalicFeature, LinkFeature, UnorderedListFeature, OrderedListFeature } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { PenCollections } from './collections/PenCollections'
import { Products } from './collections/Products'
import { Orders } from './collections/Orders'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // serverURL is inferred in Next.js integration
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' - Montblanc Admin',
    },
  },
  collections: [Users, Media, PenCollections, Products, Orders],
  editor: lexicalEditor({
    features: () => [
      HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
      BoldFeature(),
      ItalicFeature(),
      LinkFeature(),
      UnorderedListFeature(),
      OrderedListFeature(),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      // Neon (Serverless Postgres) handles connections efficiently.
      // We can relax the strict 'max: 1' limit used for Supabase.
      max: process.env.NODE_ENV === 'production' ? 10 : 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 20000,
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }),
  sharp,
  plugins: [],
})

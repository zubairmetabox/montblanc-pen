import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import sharp from 'sharp'
import { readFile } from 'fs/promises'
import { resolve } from 'path'

// Resolve the local media directory relative to project root
const MEDIA_DIR = resolve(process.cwd(), 'media')
// Fallback base URL for fetching remote images (Vercel Blob, etc.)
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

async function getImageBuffer(doc: { url?: string | null; filename?: string | null }): Promise<Buffer> {
  // Prefer reading from local filesystem (fast, no network, works in dev)
  if (doc.filename) {
    try {
      const localPath = resolve(MEDIA_DIR, doc.filename)
      return await readFile(localPath)
    } catch {
      // File not local — fall through to URL fetch (e.g. Vercel Blob in production)
    }
  }

  // Fall back to fetching by URL (absolute or relative)
  if (!doc.url) throw new Error('No url or filename available')
  const url = doc.url.startsWith('http') ? doc.url : `${SERVER_URL}${doc.url}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`)
  return Buffer.from(await res.arrayBuffer())
}

async function backfillBlurDataURLs() {
  const payload = await getPayload({ config })

  const { docs, totalDocs } = await payload.find({
    collection: 'media',
    limit: 1000,
    where: {
      blurDataURL: { exists: false },
    },
  })

  console.log(`Found ${totalDocs} media documents without blurDataURL`)

  if (docs.length === 0) {
    console.log('Nothing to backfill.')
    process.exit(0)
  }

  let success = 0
  let skipped = 0
  let failed = 0

  for (const doc of docs) {
    if (!doc.filename && !doc.url) {
      console.warn(`  ⚠ Skipping ID ${doc.id} — no filename or URL`)
      skipped++
      continue
    }

    try {
      const buffer = await getImageBuffer(doc)

      const lqipBuffer = await sharp(buffer)
        .resize(16, 16, { fit: 'cover' })
        .webp({ quality: 20 })
        .toBuffer()

      const blurDataURL = `data:image/webp;base64,${lqipBuffer.toString('base64')}`

      await payload.update({
        collection: 'media',
        id: doc.id,
        data: { blurDataURL },
      })

      console.log(`  ✓ ${doc.filename || doc.id}`)
      success++
    } catch (err) {
      console.error(`  ✗ ${doc.filename || doc.id}:`, err)
      failed++
    }
  }

  console.log(`\nDone: ${success} updated, ${skipped} skipped, ${failed} failed`)
  process.exit(failed > 0 ? 1 : 0)
}

backfillBlurDataURLs()

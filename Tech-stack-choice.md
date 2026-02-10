# Technical Stack & Implementation Guide

This document outlines the technical stack chosen for the Montblanc E-commerce project and documents the specific issues encountered during setup, along with their final working solutions.

## Core Stack
- **Framework**: Next.js 15 (App Router)
- **CMS**: Payload CMS 3.x (Next.js integrated)
- **Database**: MongoDB Atlas (Cloud)
- **Styling**: Tailwind CSS v4 (Migrated for latest performance and feature set)
- **UI Components**: Shadcn UI (inspired) + Framer Motion
- **Validation**: Zod + React Hook Form

---

## 🛠 Resolved Issues & Lessons Learned

### 1. Missing PostCSS Dependencies
**Issue**: Running the dev server resulted in a `next/font` error: `Error: Cannot find module 'autoprefixer'`.
**Cause**: Next.js 15/Tailwind 4 sometimes expects `autoprefixer` to be explicitly installed in the dev environment depending on the initialization method.
**Resolution**: 
```bash
npm install -D autoprefixer
```

### 2. Tailwind CSS v4 Migration
**Issue**: Initial attempt to use Tailwind CSS v4 caused `unknown utility class` errors and build syntax errors with `@layer`.
**Final Solution**: 
- **PostCSS**: Switched to `@tailwindcss/postcss` for proper integration with Next.js 15.
- **Syntax**: Replaced `@tailwind base/components/utilities` with `@import "tailwindcss";`.
- **Theme Mapping**: Moved all configuration from `tailwind.config.ts` (now removed) to the `@theme` block in `globals.css`.
- **Key Lesson**: In v4, custom utility classes like `text-balance` must use the `@utility` directive instead of `@layer utilities`. Avoid mixing old `@tailwind` directives with new v4 `@import` syntax.

**PostCSS Config (v4)**:
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

### 3. Mongoose Reserved Keyword Conflict
**Issue**: `(node:xxxx) [MONGOOSE] Warning: 'collection' is a reserved schema pathname`.
**Cause**: 
- Using `slug: 'collections'` for the Pen Collections.
- Using a relationship field named `collection` inside the `Products` collection.
**Resolution**:
- Changed the relationship field in `src/collections/Products.ts` from `collection` to `penCollection`.
- Added `dbName: 'pen_collections'` to the PenCollections config to ensure the MongoDB collection name doesn't conflict with internal Mongoose properties.
- **Critical Step**: After renaming fields in Payload, you **must** run:
```bash
npm run generate:types
```

### 5. MongoDB Atlas SSL / IP Whitelist
**Issue**: `MongoServerSelectionError: tlsv1 alert internal error` or `TopologyDescription { type: 'ReplicaSetNoPrimary' }`.
**Cause**: MongoDB Atlas rejects the TLS handshake if the client IP is not whitelisted, often throwing obscure SSL errors in Node.js instead of a clear "IP not allowed" message.
**Resolution**: 
- Retrieve current IP via `curl https://api.ipify.org`.
- Add the IP (or `0.0.0.0/0` for dev-only flexibility) to the **Network Access** tab in MongoDB Atlas.

### 6. Duplicate React Keys in Product Gallery
**Issue**: `Encountered two children with the same key` when rendering thumbnails.
**Cause**: The gallery logic was adding the `heroImage` and then the `product.images` array separately, but often the `heroImage` was already part of the `images` set, leading to duplicate Mongo IDs as React keys.
**Resolution**:
```tsx
const rawImages: Media[] = []
if (heroImage) rawImages.push(heroImage)
galleryImages.forEach((item) => {
    const img = item.image as Media | undefined
    if (img) rawImages.push(img)
})

// Filter for unique IDs
const allImages = rawImages.filter(
    (img, index, self) => index === self.findIndex((t) => t.id === img.id)
)
```

### 7. Unsplash Image Rendering
**Issue**: `next/image` error: "Hostname 'images.unsplash.com' is not configured under images in your `next.config.mjs`".
**Resolution**:
Add the domain to `remotePatterns`:
```javascript
images: {
  remotePatterns: [
    { hostname: 'localhost' },
    { hostname: 'images.unsplash.com', protocol: 'https' }
  ]
}
```

### 8. Payload "Pulling schema" Performance Delay
**Issue**: Development server was extremely slow, with logs repeatedly showing "Pulling schema from database..." on every request.
**Cause**: Payload was re-initializing the database connection and pulling the schema from PostgreSQL on every HMR (Hot Module Replacement) and even individual server requests in development.
**Resolution**:
- **Global Singleton**: Implemented a global singleton pattern for the Payload instance in `src/lib/queries.ts`.
- **Request Caching**: Wrapped all data-fetching functions in `React.cache`.
- **Safety Fallback**: Added a fallback for `React.cache` to ensure compatibility across all environments.

```tsx
const globalWithPayload = global as typeof globalThis & {
    payload: { client: any | null, promise: Promise<any> | null }
}
if (!globalWithPayload.payload) globalWithPayload.payload = { client: null, promise: null }

export const getPayloadClient = async () => {
    if (globalWithPayload.payload.client) return globalWithPayload.payload.client
    if (!globalWithPayload.payload.promise) globalWithPayload.payload.promise = getPayload({ config })
    // ... await and cache client
}
```

### 9. Checkout UX & Validation Errors
**Issue**: Checkout produced a 400 error and flashed an "empty cart" message before the success redirect.
**Cause**: 
- **Type Mismatch**: `product.id` can be a number or string depending on the database adapter, but the API expected a specific format.
- **Race Condition**: `clearCart()` was called before the redirect, triggering the empty cart state in the UI wrapper.
**Resolution**:
- **Type Casting**: Added `String(product.id)` or numeric casting in the `createOrder` logic.
- **Processing State**: Added `isSubmitting` and `isSuccess` states to show a "Processing..." overlay instead of the empty cart.
- **Atomic Success**: `clearCart()` is now called only *after* a successful server response and immediately before `router.push()`.

---

## 🚀 The "Perfect" Starting Point (Quick Start)

When starting a similar project, follow this order to avoid the issues above:

### 1. Dependencies
Always use the v4 PostCSS plugin for clean integration:
```bash
npm install tailwindcss@latest @tailwindcss/postcss autoprefixer
```

### 2. File Naming Convention
**Never** name a field `collection` in Payload if using MongoDB. Use `category`, `group`, or `penCollection`.

### 3. Tailwind v4 Theme & Utilities
All custom design tokens are defined in `@theme`. However, standard utilities like `container` are no longer built-in by default in the same way.
- **Solution**: Manually define a `@utility container` in `globals.css` with responsive padding (1rem to 4rem) and centering.
- **Glassmorphism**: Added `@utility glass` for the premium blurred-background effect.

### 3. Environment Setup
Always start with an Atlas URI to avoid local database management overhead during early development.

```env
DATABASE_URL=mongodb+srv://...
PAYLOAD_SECRET=...
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### 4. Initial Commands
```bash
npm run generate:types   # Sync Payload config with TypeScript
npm run dev              # Start
```

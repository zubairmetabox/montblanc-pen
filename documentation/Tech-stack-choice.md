# Tech Stack & Implementation Guide: Montblanc E-commerce

This document details the **active** technology stack and specific implementation protocols for the Montblanc Pens e-commerce platform. It is designed to allow any developer or agent to replicate the environment exactly.

## 🏗 Core Tech Stack

| Component | Choice | Version | Rationale |
|-----------|--------|---------|-----------|
| **Framework** | Next.js (App Router) | `15.4.11` | Latest stable release with robust Server Actions support. |
| **CMS** | Payload CMS | `3.75.0` | Headless, TypeScript-first, and integrates natively with Next.js. |
| **Database** | Neon (Serverless Postgres) | N/A | Handles connection pooling natively; eliminates "max connection" errors common in serverless. |
| **Storage** | Vercel Blob | `3.75.0`* | Simple, edge-ready storage. *Pinned to match Payload core version.* |
| **Styling** | Tailwind CSS | v4.0+ | Zero-runtime CSS-in-JS, strictly typed via `@tailwindcss/postcss`. |
| **Deployment** | Vercel | N/A | Native Next.js support; Zero-config CI/CD. |

---

## ⚙️ Critical Configurations

### 1. Dependency Pinning (Crucial)
**Observation**: Mixing Payload `3.75.0` with newer plugins (e.g., `@payloadcms/storage-vercel-blob@3.76+`) causes React Context errors (`UploadHandlersProvider`).
**Protocol**: Explicitly **remove carets (`^`)** from `package.json` for all `@payloadcms/*` packages to ensure they match exactly.

```json
// package.json
{
  "dependencies": {
    "payload": "3.75.0",
    "@payloadcms/next": "3.75.0",
    "@payloadcms/storage-vercel-blob": "3.75.0", 
    // ... all other payload modules
  }
}
```

### 2. Layout Architecture (Next.js + Payload)
**Observation**: Wrapping the Admin Panel in a root `layout.tsx` that contains `<html>/<body>` causes "Nested HTML" hydration crashes because the Admin Panel renders its own document structure.
**Protocol**: **Parallel Root Layouts**.
- `src/app/(frontend)/layout.tsx`: Contains `<html>`, `<body>`, global providers, and UI chrome (Navbar/Footer).
- `src/app/(payload)/layout.tsx`: Wraps Admin routes. strictly imports `@payloadcms/next/layouts`.
- `src/app/layout.tsx`: **DO NOT EXIST**.

### 3. Database Connection (Neon)
**Observation**: Serverless environments (Vercel) spin up many isolated instances, rapidly exhausting standard Postgres connection limits (e.g., Supabase's default pool).
**Protocol**: Use **Neon**. It separates compute/storage and manages connection pooling at the infrastructure level.
- **Config**: `src/payload.config.ts`
  ```typescript
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL }
  })
  ```
- **Next.js Page Config**: Force dynamic rendering for pages fetching DB data to prevent build-time timeouts.
  ```typescript
  export const dynamic = 'force-dynamic' // In page.tsx
  ```

### 4. Admin Panel UI Regeneration
**Observation**: When adding UI-affecting plugins (like Vercel Blob), the Admin Panel's client-side map can become stale, leading to `PayloadComponent not found` errors.
**Protocol**: Run `npm run generate:importmap` after any plugin change.

---

## ⚠️ Known Stack-Specific Gotchas

| Error / Symptom | Root Cause (Current Stack) | Solution |
|-----------------|----------------------------|----------|
| **"PayloadComponent not found in importMap"** | Stale Admin UI configuration. | Run `npm run generate:importmap` and restart server. |
| **"Context not found" (UploadHandlers)** | Version mistmatch between Payload Core and Storage Plugin. | Pin `@payloadcms/storage-vercel-blob` to exact Payload version. |
| **"Cannot connect to Postgres" (Build Time)** | Static Generation trying to hit DB with short timeout. | Add `export const dynamic = 'force-dynamic'` to data-fetching pages. |
| **"ENOENT: no such file ... .next/..."** | Corrupted Next.js build cache. | `rm -rf .next` and kill zombie `node.exe` processes. |

---

## 🎨 Design System Standards
- **Font Strategy**: `Inter` (UI) + `Playfair Display` (Headings). Configured via `next/font/google` in `(frontend)/layout.tsx`.
- **Glassmorphism**: Standard class: `backdrop-blur-md bg-white/80`.
- **Animations**: Use `framer-motion` for complex entrances; standard CSS transitions for hover states.

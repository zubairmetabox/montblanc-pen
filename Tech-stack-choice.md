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

### 4. MongoDB Local vs. Cloud
**Issue**: `connect ECONNREFUSED 127.0.0.1:27017`.
**Cause**: Development server attempting to connect to a local MongoDB instance that wasn't running.
**Final Solution**: Switched to MongoDB Atlas.
- **Requirement**: Add `0.0.0.0/0` to Network Access in Atlas.
- **Env**: Use the `mongodb+srv://` connection string in `.env`.

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

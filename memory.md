# Project Memory: Montblanc E-commerce

This file serves as a memory bank and context provider for developers continuing the work on this project. It summarizes the current state, key technical decisions, and roadblocks overcome.

## 🏁 Project Overview
**Goal**: A premium e-commerce platform for Montblanc fountain pens using a headless CMS approach.
**Status**: Stable Checkpoint. Fixed Admin Panel crash via Layout Refactoring. Resolved runtime regression. Codebase is clean and ready for next phase.

## 📜 Documentation Protocol
**Mandatory Process for Developers**:
1. **Issue Tracking**: Every time a technical issue or bug is fixed, it **must** be documented in [Tech-stack-choice.md](file:///c:/dev/Payload-cms/montblanc-pens/Tech-stack-choice.md). Document the error message, the root cause, and the final working code.
2. **Context Persistence**: Every session update should be summarized in this `memory.md` file. Ensure the "Project Progress" and "Remaining Tasks"on slug is `collections`.
- In TypeScript types (`payload-types.ts`), it maps to the `Collection` type.
- The configuration file is `PenCollections.ts` and uses `dbName: 'pen_collections'`.

### 3. Cart Implementation
- **Provider**: `src/providers/cart-provider.tsx`
- **Persistence**: Items are saved to `localStorage` under the key `montblanc-cart`.
- **Checkout**: Currently an "Order Inquiry" system. Submitting checkout creates an entry in the `Orders` collection in Payload.

---

## 🛠 Tech Stack Snapshot
- **Framework**: Next.js 15.4 (App Router)
- **CMS**: Payload CMS 3.75 (Next.js integrated)
- **Database**: MongoDB Atlas (Cloud)
- **Styling**: Tailwind CSS v4 (Migrated for latest performance)
- **Fonts**: Inter (Sans) & Playfair Display (Serif)
- **State**: React Context for Theme and Cart (with `localStorage` persistence)

For detailed technical hurdles and architectural choices, see: [Tech-stack-choice.md](file:///c:/dev/Payload-cms/montblanc-pens/Tech-stack-choice.md)

---

## 🗝 Critical Context & Architectual Decisions

### 1. Field Naming Conflict (Mongoose)
**CRITICAL**: In the `Products` collection, the relationship field to collections is named **`penCollection`**, NOT `collection`.
- **Why**: Mongoose reserved the word `collection`, which caused runtime warnings and potential breaks.
- **Affected Files**: `src/collections/Products.ts`, `src/lib/queries.ts`, `src/app/(frontend)/products/[slug]/page.tsx`, and `scripts/seed.ts`.

### 2. Collection vs PenCollection
- The Payload collection slug is `collections`.
- In TypeScript types (`payload-types.ts`), it maps to the `Collection` type.
- The configuration file is `PenCollections.ts` and uses `dbName: 'pen_collections'`.

### 3. Cart Implementation
- **Provider**: `src/providers/cart-provider.tsx`
- **Persistence**: Items are saved to `localStorage` under the key `montblanc-cart`.
- **Checkout**: Currently an "Order Inquiry" system. Submitting checkout creates an entry in the `Orders` collection in Payload.

---

## 🏗 Project Progress

### Completed Summary
- [x] **Backend**: Users, Media, Collections, Products, and Orders configurations.
- [x] **UI System**: Custom button variants, cards, inputs, and layout components.
- [x] **Pages**: Homepage, Collections Listing, Product Details, About, Contact, Cart, and Checkout.
- [x] **API**: Order submission route (`/api/orders`).
- [x] **Connectivity**: Supabase (Postgres) integration with pooling.
- [x] **Performance**: Implemented Payload Client Singleton & React Caching to eliminate schema-pull delays.
- [x] **UX**: Added processing states to checkout, eliminating flickering and improving feedback.
- [x] **Migrations**: Successful upgrade to **Tailwind CSS v4** with full theme mapping.
- [x] **Media**: High-fidelity Unsplash integration with automated seed script.
- [x] **Stability**: Refactored Layouts to fix Admin crash (Parallel Root Layouts).
- [x] **Runtime**: Resolved `ENOENT` regression by clearing corrupted build cache.
- [x] **Database**: Diagnosed and resolved connection pool exhaustion (zombie processes).
- [x] **Production**: Fixed Vercel crash/timeouts via connection pooling (`max: 1`) and dynamic rendering.

### Remaining Tasks
- [x] **Images**: High-quality assets sourced and automated via seed script.
- [x] **Commit & Push**: Final codebase pushed to GitHub `main` branch.

---

## 📖 Useful Commands
- `npm run dev`: Start the development server.
- `npm run seed`: Populate the database with sample Montblanc products and collections.
- `npm run generate:types`: Regenerate TypeScript interfaces from Payload schemas (run after any field changes).
- `npm run generate:importmap`: Update the admin panel import map.

---

## 🔗 Internal Links
- [Implementation Plan](file:///C:/Users/zubai/.gemini/antigravity/brain/8b9fa184-c366-494c-a85a-54d0cea7b7fe/implementation_plan.md)
- [Project Walkthrough](file:///C:/Users/zubai/.gemini/antigravity/brain/8b9fa184-c366-494c-a85a-54d0cea7b7fe/walkthrough.md)
- [Task Checklist](file:///C:/Users/zubai/.gemini/antigravity/brain/8b9fa184-c366-494c-a85a-54d0cea7b7fe/task.md)

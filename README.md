# Montblanc E-commerce (Next.js 15 + Payload 3.0)

A premium e-commerce template built with the latest stack for high performance and visual impact.

## 🏗 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **CMS**: [Payload CMS 3.0](https://payloadcms.com/) (Serverless)
- **Database**: [Neon](https://neon.tech/) (Serverless Postgres)
- **Storage**: [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: Shadcn/UI + Framer Motion

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- A Neon Database URL
- A Vercel Blob Token

### 1. Setup

Clone the repo and install dependencies:

```bash
git clone <repo-url>
cd montblanc-pens
npm install
```

### 2. Environment Variables

Create a `.env` file in the root:

```env
# Database (Neon)
DATABASE_URL="postgres://user:pass@ep-xyz.region.aws.neon.tech/neondb?sslmode=require"

# Payload
PAYLOAD_SECRET="your-secret-key"

# Vercel Blob (Storage)
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
```

### 3. Run Development Server

```bash
npm run dev
```

- **Website**: `http://localhost:3000`
- **Admin Panel**: `http://localhost:3000/admin`

### 4. Seed Data (Optional)

To populate the database with Montblanc products and collections:

```bash
npm run seed
```

## 🛠 Deployment (Vercel)

1. **Push to GitHub**.
2. **Import Project** in Vercel.
3. **Add Environment Variables**:
   - `DATABASE_URL`
   - `PAYLOAD_SECRET`
   - `BLOB_READ_WRITE_TOKEN`
   - `NEXT_PUBLIC_SERVER_URL` (Set to your Vercel domain)
4. **Deploy**.

> **Note**: This project handles database connections efficiently using Neon's serverless driver, so no extra connection pooling configuration is needed on Vercel side, though `max: 1` is configured in `payload.config.ts` for safety.

## 📂 Project Structure

- `src/app/(frontend)`: Public e-commerce pages.
- `src/app/(payload)`: Admin panel routes.
- `src/collections`: Payload CMS content schemas.
- `src/components`: Reusable UI components.
- `src/lib`: Utilities and database queries.

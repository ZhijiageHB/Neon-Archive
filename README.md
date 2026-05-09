# Neon Archive

A dark, futuristic personal website and technical blog built with Next.js, Supabase, and Framer Motion.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** in your Supabase dashboard
3. Copy the contents of `supabase/schema.sql` and run it
4. Go to **Project Settings → API** and copy your:
   - **Project URL**
   - **anon public** key

### 3. Configure environment variables

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Set the environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

## Project Structure

```
app/                    # Next.js App Router pages
  blog/                 # Blog list and [slug] pages
  guestbook/            # Terminal-style guestbook
  about/                # About page with timeline
components/
  layout/               # Header, footer, background effects
  ui/                   # Reusable UI components
  blog/                 # Blog-specific components
  guestbook/            # Guestbook components
lib/
  supabase/             # Supabase client, queries, actions
  utils.ts              # Utility functions
supabase/
  schema.sql            # Database schema + RLS + RPC
```

## What You'll Need to Customize

- Personal introduction text in `app/about/page.tsx`
- Blog posts — insert via Supabase Table Editor
- Project info — insert into the `projects` table
- Social links in `components/layout/site-footer.tsx`
- Brand name / metadata in `app/layout.tsx`

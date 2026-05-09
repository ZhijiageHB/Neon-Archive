-- Run this in Supabase Dashboard → SQL Editor
-- to create the comments table for blog post comments

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_slug text not null references public.posts(slug) on delete cascade,
  name text not null,
  message text not null,
  created_at timestamptz default now()
);

alter table public.comments enable row level security;

create policy "Public can read comments"
  on public.comments for select using (true);

create policy "Anyone can insert comments"
  on public.comments for insert with check (true);

create index if not exists idx_comments_slug on public.comments (post_slug, created_at desc);

-- =============================================
-- Neon Archive — Supabase Schema
-- =============================================

-- 1. posts
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text not null,
  cover_image text,
  tags text[] default '{}',
  published boolean default false,
  published_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.posts enable row level security;

create policy "Public can read published posts"
  on public.posts for select
  using (published = true);

create policy "Anyone can insert posts"
  on public.posts for insert
  with check (true);

create index if not exists idx_posts_slug on public.posts (slug);
create index if not exists idx_posts_published on public.posts (published, published_at desc);

-- 2. post_metrics
create table if not exists public.post_metrics (
  slug text primary key references public.posts(slug) on delete cascade,
  views integer default 0,
  likes integer default 0,
  updated_at timestamptz default now()
);

alter table public.post_metrics enable row level security;

create policy "Public can read post metrics"
  on public.post_metrics for select
  using (true);

create policy "Anyone can insert post metrics"
  on public.post_metrics for insert
  with check (true);

-- 3. guestbook
create table if not exists public.guestbook (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  created_at timestamptz default now()
);

alter table public.guestbook enable row level security;

create policy "Public can read guestbook"
  on public.guestbook for select
  using (true);

create policy "Anyone can insert guestbook messages"
  on public.guestbook for insert
  with check (true);

create index if not exists idx_guestbook_created on public.guestbook (created_at desc);

-- 4. projects
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  url text,
  github_url text,
  image text,
  tech_stack text[] default '{}',
  featured boolean default false,
  created_at timestamptz default now()
);

alter table public.projects enable row level security;

create policy "Public can read featured projects"
  on public.projects for select
  using (featured = true);

create policy "Anyone can insert projects"
  on public.projects for insert
  with check (true);

-- =============================================
-- RPC Functions
-- =============================================

create or replace function public.increment_post_views(p_slug text)
returns void
language plpgsql
as $$
begin
  insert into public.post_metrics (slug, views)
  values (p_slug, 1)
  on conflict (slug)
  do update set views = public.post_metrics.views + 1,
                updated_at = now();
end;
$$;

create or replace function public.increment_post_likes(p_slug text)
returns void
language plpgsql
as $$
begin
  insert into public.post_metrics (slug, likes)
  values (p_slug, 1)
  on conflict (slug)
  do update set likes = public.post_metrics.likes + 1,
                updated_at = now();
end;
$$;

-- =============================================
-- Triggers
-- =============================================

create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger posts_updated_at
  before update on public.posts
  for each row execute function public.update_updated_at();

create trigger post_metrics_updated_at
  before update on public.post_metrics
  for each row execute function public.update_updated_at();

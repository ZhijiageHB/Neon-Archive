-- Run this in Supabase Dashboard → SQL Editor
-- to allow inserting data via the anon key (for seeding)

create policy "Anyone can insert posts"
  on public.posts for insert
  with check (true);

create policy "Anyone can insert post metrics"
  on public.post_metrics for insert
  with check (true);

create policy "Anyone can insert projects"
  on public.projects for insert
  with check (true);

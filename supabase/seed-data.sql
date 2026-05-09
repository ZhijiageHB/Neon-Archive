-- ============================================
-- Neon Archive — 扩充种子数据（每张表 ~15 条）
-- 在 Supabase Dashboard SQL Editor 中执行
-- ============================================

-- 1. 新增博客文章（跳过已存在的 slug）
INSERT INTO public.posts (slug, title, excerpt, content, tags, published, published_at) VALUES
  ('css-container-queries', 'CSS Container Queries: The End of Media Query Hacks',
   'Container queries let components respond to their parent, not the viewport. This changes everything for design systems.',
   '# CSS Container Queries

For years, we''ve been writing media queries that respond to the viewport. But components don''t care about the viewport — they care about their container.

## The Problem

A card component might appear in a sidebar (300px wide) or a main content area (800px wide). With media queries, you have to guess which breakpoint applies.

## The Solution

```css
@container (min-width: 400px) {
  .card { flex-direction: row; }
}
```

Container queries let you write styles that respond to the parent element''s size. The card just works, regardless of where it''s placed.

## Why This Matters

1. **True component encapsulation** — styles match the component''s context
2. **Fewer breakpoint hacks** — no more magic numbers
3. **Design system friendly** — components are self-contained

> Container queries are the biggest CSS feature since Flexbox.',
   ARRAY['css', 'design-systems', 'frontend'],
   true, '2025-06-15T10:00:00Z'),

  ('typescript-pattern-matching', 'Pattern Matching in TypeScript: Beyond Switch Statements',
   'How to use discriminated unions and exhaustive checks to write safer, more expressive TypeScript code.',
   '# Pattern Matching in TypeScript

TypeScript doesn''t have native pattern matching, but discriminated unions get you surprisingly far.

## Discriminated Unions

```typescript
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}
```

## Exhaustive Checks

The compiler ensures you handle every case:

```typescript
function assertNever(x: never): never {
  throw new Error("Unexpected: " + x);
}
```

Add `default: return assertNever(shape);` and the compiler will catch missing cases at build time.

## Real-World Applications

- API responses (loading | success | error)
- State machines (idle | pending | done | failed)
- UI modes (view | edit | preview)

> Types are not just documentation — they are a design tool.',
   ARRAY['typescript', 'patterns', 'types'],
   true, '2025-06-01T14:00:00Z'),

  ('react-19-compiler', 'React 19 Compiler: What It Actually Changes',
   'The React Compiler auto-memoizes your components. Here is what that means for how you write React.',
   '# React 19 Compiler

The React Compiler (formerly React Forget) automatically memoizes components and hooks. You can stop writing `useMemo`, `useCallback`, and `React.memo`.

## Before

```jsx
const MemoizedList = React.memo(function List({ items }) {
  const sorted = useMemo(() => items.sort(), [items]);
  const onSelect = useCallback((id) => {
    setSelected(id);
  }, []);
  return sorted.map(item => <Item key={item.id} onSelect={onSelect} />);
});
```

## After

```jsx
function List({ items }) {
  const sorted = items.sort();
  const onSelect = (id) => setSelected(id);
  return sorted.map(item => <Item key={item.id} onSelect={onSelect} />);
}
```

The compiler analyzes data flow and inserts memoization where needed. Same performance, zero boilerplate.

## Rules of React (Now Enforced)

The compiler only works if you follow the Rules of React:

- Components must be pure
- Hooks must be called at the top level
- No mutations during render

> The best optimization is the one you don''t have to think about.',
   ARRAY['react', 'compiler', 'performance'],
   true, '2025-05-20T09:00:00Z'),

  ('edge-functions-reality', 'Edge Functions: The Honest Trade-offs',
   'Everyone talks about edge computing benefits. Let''s talk about what you actually give up.',
   '# Edge Functions: The Honest Trade-offs

Edge computing is powerful, but it''s not a silver bullet. Here''s what the marketing doesn''t tell you.

## What You Gain

- **Lower latency** — code runs closer to users
- **Cold start improvements** — smaller bundles load faster
- **Regional compliance** — data stays in-region

## What You Give Up

- **Limited runtime** — no full Node.js API
- **No persistent connections** — WebSockets are tricky
- **Debugging is harder** — distributed systems are complex
- **Vendor lock-in** — each platform has different APIs

## When Edge Makes Sense

| Use Case | Edge? |
|---|---|
| Auth checks | Yes |
| A/B testing | Yes |
| Full SSR with DB | Probably not |
| Real-time features | No |

## The Hybrid Approach

Use edge for what it''s good at (auth, routing, personalization) and traditional compute for everything else.

> Choose the right tool for the job, not the shiniest one.',
   ARRAY['edge', 'architecture', 'performance'],
   true, '2025-05-10T16:00:00Z'),

  ('database-indexing-guide', 'The Only Database Indexing Guide You Will Ever Need',
   'Indexes are the single biggest lever for query performance. Here is a practical, no-nonsense guide.',
   '# Database Indexing Guide

Most performance problems are indexing problems. This guide covers the 20% of knowledge that handles 80% of cases.

## The Basics

An index is a sorted data structure that lets the database find rows without scanning the entire table.

```sql
CREATE INDEX idx_posts_published ON posts (published, published_at DESC);
```

## Composite Index Order Matters

The leftmost column is used first. Put equality conditions before range conditions:

```sql
-- Good: equality first, then range
WHERE published = true AND published_at > now()

-- Index that serves this query
CREATE INDEX idx_pub_date ON posts (published, published_at DESC);
```

## When NOT to Index

- Tables with fewer than 1000 rows
- Columns that are rarely used in WHERE/JOIN
- Write-heavy tables (indexes slow down inserts)

## The EXPLAIN Command

```sql
EXPLAIN ANALYZE SELECT * FROM posts WHERE slug = ''my-post'';
```

If you see "Seq Scan", you need an index. If you see "Index Scan", you''re good.

> Measure, don''t guess.',
   ARRAY['database', 'postgres', 'performance'],
   true, '2025-04-25T11:00:00Z'),

  ('git-workflow-advanced', 'Advanced Git Workflows for Solo Developers',
   'Rebase vs merge is just the beginning. Here are the Git workflows that actually make you faster.',
   '# Advanced Git Workflows

Solo developers often underuse Git. Here are workflows that make you dramatically more productive.

## Interactive Rebase

Clean up your history before pushing:

```bash
git rebase -i HEAD~5
```

Squash fixup commits, reorder for clarity, rewrite messages.

## Worktrees

Work on two branches simultaneously without stashing:

```bash
git worktree add ../feature-branch feature/my-feature
```

Each worktree has its own working directory. No more `git stash` dance.

## Bisect

Find the commit that broke something:

```bash
git bisect start
git bisect bad          # current commit is broken
git bisect good v1.0    # this tag was working
# Git checks out the midpoint. Test it, mark good/bad.
```

## Fixup Commits

Stage changes as fixups for specific commits:

```bash
git commit --fixup=abc1234
git rebase -i --autosquash main
```

> Git is a power tool. Learn to use it like one.',
   ARRAY['git', 'workflow', 'productivity'],
   true, '2025-04-10T08:00:00Z'),

  ('ai-pair-programming', 'Effective AI Pair Programming: Lessons from 6 Months',
   'What I learned from using AI coding assistants daily for half a year.',
   '# Effective AI Pair Programming

After six months of daily AI-assisted coding, here''s what actually works.

## What AI Does Well

1. **Boilerplate** — CRUD, tests, config files
2. **Explaining code** — "What does this regex do?"
3. **Translating** — convert between languages/frameworks
4. **Debugging** — describe the error, get suggestions

## What AI Does Poorly

1. **Architecture** — it optimizes locally, not globally
2. **Novel algorithms** — it remixes, doesn''t invent
3. **Context** — it forgets what you discussed 10 messages ago
4. **Subtle bugs** — it''s confidently wrong

## The Workflow That Works

1. **You design** — decide the approach
2. **AI implements** — write the first draft
3. **You review** — every line, no exceptions
4. **AI refactors** — based on your feedback

## Rules I Follow

- Never commit code I can''t explain
- Always read the diff before committing
- Use AI for speed, not for understanding

> The best AI pair programmer makes you faster, not lazier.',
   ARRAY['ai', 'productivity', 'workflow'],
   true, '2025-03-30T15:00:00Z'),

  ('zod-validation-patterns', 'Zod Validation Patterns for Production APIs',
   'How to use Zod to validate API inputs, parse environment variables, and share types between client and server.',
   '# Zod Validation Patterns

Zod is a TypeScript-first schema validation library. Here are patterns I use in every production API.

## API Input Validation

```typescript
const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  role: z.enum(["admin", "user"]).default("user"),
});

type CreateUserInput = z.infer<typeof CreateUserSchema>;
```

## Environment Variables

```typescript
const env = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number().default(3000),
}).parse(process.env);
```

## Shared Schemas

Define once, use on client and server:

```typescript
// shared/schema.ts
export const PostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  tags: z.array(z.string()).default([]),
});
```

## Error Handling

```typescript
const result = PostSchema.safeParse(req.body);
if (!result.success) {
  return res.status(400).json({
    errors: result.error.flatten().fieldErrors,
  });
}
```

> Validate at the boundary, trust inside.',
   ARRAY['zod', 'typescript', 'api', 'validation'],
   true, '2025-03-15T12:00:00Z'),

  ('nextjs-caching-explained', 'Next.js Caching Explained Without the Confusion',
   'The caching layers in Next.js are notoriously confusing. Here is a clear mental model.',
   '# Next.js Caching Explained

Next.js has multiple caching layers. Understanding them prevents the #1 debugging headache.

## The Four Layers

1. **Request Memoization** — same `fetch()` in one render = one request
2. **Data Cache** — persistent HTTP cache (opt in with `fetch` options)
3. **Full Route Cache** — static HTML at build time
4. **Router Cache** — client-side prefetch cache

## When Each Activates

```typescript
// Layer 1: auto (same render)
const a = fetch("/api/posts");
const b = fetch("/api/posts"); // reused

// Layer 2: opt-in
fetch("/api/posts", { next: { revalidate: 3600 } });

// Layer 3: auto for static pages
// Dynamic pages: force with `export const dynamic = "force-dynamic"`

// Layer 4: auto for Link prefetch
```

## The Escape Hatches

- `revalidatePath("/blog")` — purge specific path
- `revalidateTag("posts")` — purge by tag
- `{ cache: "no-store" }` — skip cache entirely

> Cache invalidation is one of the two hard problems. Next.js makes it four.',
   ARRAY['nextjs', 'caching', 'performance'],
   true, '2025-03-01T10:00:00Z'),

  ('websocket-at-scale', 'WebSockets at Scale: What Nobody Tells You',
   'Scaling WebSocket connections beyond 10K concurrent users reveals problems that tutorials never mention.',
   '# WebSockets at Scale

Building a chat app with 100 users is easy. Scaling to 100K concurrent connections is a different beast.

## The Connection Limit Problem

Each WebSocket holds a TCP connection. A single server handles ~65K connections (port limit). Realistically, 10-50K before memory becomes an issue.

## Sticky Sessions

With multiple servers, you need sticky sessions or a message broker:

```
Client → Load Balancer → Server A
                       → Server B
```

Users on different servers can''t talk directly. You need Redis Pub/Sub or NATS to bridge them.

## Memory Management

Each connection costs ~20-50KB. At 100K connections, that''s 2-5GB just for connections.

```typescript
// Bad: store everything in memory
const rooms = new Map(); // grows forever

// Good: use Redis with TTL
await redis.set(`room:${id}`, data, "EX", 3600);
```

## Heartbeats

Dead connections waste resources. Implement ping/pong:

```typescript
const interval = setInterval(() => {
  ws.ping();
}, 30000);
```

> Scaling is not a feature — it''s a discipline.',
   ARRAY['websocket', 'scaling', 'backend'],
   true, '2025-02-20T14:00:00Z'),

  ('design-tokens-guide', 'Design Tokens: The Bridge Between Design and Code',
   'How to implement a token system that keeps designers and engineers in sync.',
   '# Design Tokens

Design tokens are the atoms of your design system — named values for colors, spacing, typography, and more.

## The Token Hierarchy

```
Global tokens → Alias tokens → Component tokens
(raw values)   (semantic)     (specific)
```

```css
/* Global */
--blue-500: #3B82F6;

/* Alias */
--color-primary: var(--blue-500);

/* Component */
--button-bg: var(--color-primary);
```

## Why Tokens Matter

1. **Single source of truth** — change once, update everywhere
2. **Platform agnostic** — same tokens for web, iOS, Android
3. **Themeable** — swap token sets for dark mode or brand variants

## Implementation

```css
@theme inline {
  --color-brand-purple: #7C3AED;
  --color-brand-cyan: #06B6D4;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
}
```

## The Workflow

1. Designer defines tokens in Figma
2. Export to JSON
3. Generate CSS/SCSS/JS variables
4. Components consume tokens, never raw values

> Consistency is not a constraint — it''s a superpower.',
   ARRAY['design-systems', 'css', 'tokens'],
   true, '2025-02-05T09:00:00Z'),

  ('postgres-explain-plan', 'Reading PostgreSQL EXPLAIN Plans Like a Pro',
   'The EXPLAIN command tells you exactly how PostgreSQL executes your query. Here is how to read it.',
   '# Reading EXPLAIN Plans

`EXPLAIN ANALYZE` is the most important debugging tool for slow queries.

## Basic Output

```sql
EXPLAIN ANALYZE SELECT * FROM posts WHERE published = true;
```

```
Seq Scan on posts  (cost=0.00..1.50 rows=50 width=200)
  Filter: published
  Rows Removed by Filter: 10
```

## Key Terms

- **Seq Scan** — reads every row (slow for large tables)
- **Index Scan** — uses an index (fast)
- **cost** — estimated cost (startup..total)
- **rows** — estimated rows returned
- **actual time** — real execution time

## Red Flags

| Pattern | Problem |
|---|---|
| Seq Scan on large table | Missing index |
| Nested Loop with high rows | Consider Hash/Merge Join |
| Sort with many rows | Add index on sort column |
| Filter removing many rows | Push filter into WHERE |

## Optimization Steps

1. Run `EXPLAIN (ANALYZE, BUFFERS)` for buffer stats
2. Look for Seq Scans → add indexes
3. Check row estimates vs actuals (bad stats → ANALYZE)
4. Use `pg_stat_statements` for slow query log

> The database is trying to tell you something. Learn to listen.',
   ARRAY['postgres', 'database', 'performance', 'debugging'],
   true, '2025-01-25T11:00:00Z'),

  ('monorepo-strategy', 'Monorepo vs Polyrepo: A Decision Framework',
   'Not every project needs a monorepo. Here is when each approach makes sense.',
   '# Monorepo vs Polyrepo

The monorepo debate is endless. Here''s a framework to actually decide.

## Monorepo Wins When

- **Shared code** — libraries used by multiple services
- **Atomic changes** — update API + client in one commit
- **Unified tooling** — one lint/test/build config
- **Code discovery** — search everything at once

## Polyrepo Wins When

- **Team autonomy** — different release cycles
- **Access control** — restrict who can see what
- **Technology diversity** — different languages per repo
- **Blast radius** — one bad commit doesn''t affect everyone

## The Decision Matrix

| Factor | Monorepo | Polyrepo |
|---|---|---|
| Team size < 20 | Yes | Maybe |
| Shared libraries | Yes | Painful |
| Microservices | Maybe | Yes |
| Monolith | Yes | No |
| Compliance | Harder | Easier |

## Tools

- **Turborepo** — build caching, task orchestration
- **Nx** — affected commands, dependency graph
- **Bazel** — hermetic builds, massive scale

> The right structure depends on your team, not your code.',
   ARRAY['architecture', 'monorepo', 'tooling'],
   true, '2025-01-15T08:00:00Z'),

  ('rust-for-typescript-devs', 'Rust for TypeScript Developers: A Survival Guide',
   'Coming from TypeScript to Rust? Here are the concepts that will trip you up and how to navigate them.',
   '# Rust for TypeScript Developers

TypeScript developers moving to Rust face a steep learning curve. Here''s what to expect.

## Ownership Is Everything

```rust
let s1 = String::from("hello");
let s2 = s1; // s1 is moved, no longer valid
// println!("{}", s1); // ERROR!
```

In TypeScript, objects are shared by reference. In Rust, ownership is exclusive.

## The Borrow Checker

```rust
fn read(s: &String) -> usize { s.len() }   // borrow
fn write(s: &mut String) { s.push_str("!"); } // mutable borrow
```

Rules:
- Many immutable borrows OR one mutable borrow
- Borrows cannot outlive the owner

## Option vs null

```rust
let name: Option<String> = Some("Alice".to_string());
match name {
    Some(n) => println!("{}", n),
    None => println!("no name"),
}
```

No null. No undefined. No runtime panics from missing values.

## Error Handling

```typescript
// TypeScript
try { ... } catch (e) { ... }

// Rust
fn read_file() -> Result<String, io::Error> {
    fs::read_to_string("file.txt")
}
```

> Rust doesn''t make you a better programmer. It makes you a more careful one.',
   ARRAY['rust', 'typescript', 'programming'],
   true, '2025-01-05T14:00:00Z')

ON CONFLICT (slug) DO NOTHING;

-- 2. 新增文章指标（跳过已存在的 slug）
INSERT INTO public.post_metrics (slug, views, likes) VALUES
  ('css-container-queries', 156, 28),
  ('typescript-pattern-matching', 203, 37),
  ('react-19-compiler', 445, 72),
  ('edge-functions-reality', 178, 31),
  ('database-indexing-guide', 312, 54),
  ('git-workflow-advanced', 267, 45),
  ('ai-pair-programming', 521, 89),
  ('zod-validation-patterns', 189, 33),
  ('nextjs-caching-explained', 356, 61),
  ('websocket-at-scale', 143, 24),
  ('design-tokens-guide', 198, 36),
  ('postgres-explain-plan', 278, 48),
  ('monorepo-strategy', 167, 29),
  ('rust-for-typescript-devs', 334, 57),
  ('building-neon-archive', 523, 87),
  ('spring-physics-in-ui', 298, 52),
  ('server-components-mental-model', 412, 68),
  ('tailwind-v4-deep-dive', 245, 43)
ON CONFLICT (slug) DO UPDATE SET
  views = EXCLUDED.views,
  likes = EXCLUDED.likes;

-- 3. 新增项目
INSERT INTO public.projects (title, description, url, github_url, tech_stack, featured) VALUES
  ('Chrono CLI', 'A time-travel debugging tool for Node.js. Record execution, replay with breakpoints, inspect state at any point.', 'https://chrono.dev', 'https://github.com', ARRAY['Node.js', 'TypeScript', 'V8 Inspector'], true),
  ('Drift Design System', 'A headless, themeable component library with built-in animation primitives and accessibility defaults.', NULL, 'https://github.com', ARRAY['React', 'TypeScript', 'Radix UI', 'Framer Motion'], true),
  ('Flux State Machine', 'A tiny, type-safe state machine library for managing complex UI flows with zero dependencies.', NULL, 'https://github.com', ARRAY['TypeScript', 'XState'], true),
  ('GridForge', 'A visual CSS Grid builder that exports clean, production-ready code with named areas and responsive breakpoints.', 'https://gridforge.dev', 'https://github.com', ARRAY['Svelte', 'TypeScript', 'CSS Grid'], true),
  ('Prism Logger', 'Structured logging for Node.js with JSON output, log levels, and automatic request context propagation.', NULL, 'https://github.com', ARRAY['Node.js', 'TypeScript', 'Pino'], true),
  ('Atlas Deployment Tracker', 'A deployment dashboard that tracks releases across environments with rollback visualization and diff view.', 'https://atlas-tracker.dev', 'https://github.com', ARRAY['Next.js', 'PostgreSQL', 'Vercel'], true),
  ('Spectra Color Tools', 'A color manipulation and palette generation toolkit. Supports OKLCH, contrast checking, and perceptual uniformity.', NULL, 'https://github.com', ARRAY['TypeScript', 'OKLCH', 'WCAG'], true),
  ('Memo Cache Layer', 'A lightweight caching layer for server components with TTL, tags, and automatic invalidation patterns.', NULL, 'https://github.com', ARRAY['TypeScript', 'Redis', 'Next.js'], true),
  ('Waveform Audio Player', 'A web-based audio player with real-time waveform visualization, loop markers, and keyboard shortcuts.', 'https://waveform.audio', 'https://github.com', ARRAY['Web Audio API', 'Canvas', 'TypeScript'], true),
  ('Forge Template Engine', 'A type-safe template engine for generating project scaffolds, configs, and boilerplate from schemas.', NULL, 'https://github.com', ARRAY['TypeScript', 'Mustache', 'Zod'], true),
  ('Lens Data Visualizer', 'An interactive data visualization toolkit with drill-down, filtering, and export to SVG/PNG.', NULL, 'https://github.com', ARRAY['D3.js', 'TypeScript', 'SVG'], true),
  ('Arc Auth Kit', 'A drop-in authentication module for Next.js with OAuth, magic links, and session management.', NULL, 'https://github.com', ARRAY['Next.js', 'Supabase Auth', 'TypeScript'], true),
  ('Bridge API Gateway', 'A lightweight API gateway with rate limiting, caching, and request transformation for microservices.', NULL, 'https://github.com', ARRAY['Go', 'Redis', 'gRPC'], true),
  ('Echo Notification Service', 'A multi-channel notification delivery system supporting email, Slack, webhook, and in-app channels.', NULL, 'https://github.com', ARRAY['Node.js', 'PostgreSQL', 'Redis'], true),
  ('Pulse Health Monitor', 'A uptime monitoring dashboard with incident tracking, status pages, and multi-region checks.', 'https://pulse-monitor.dev', 'https://github.com', ARRAY['Next.js', 'PostgreSQL', 'Cron'], true)
ON CONFLICT DO NOTHING;

-- 4. 新增留言簿消息
INSERT INTO public.guestbook (name, message, created_at) VALUES
  ('shadcn', 'Clean implementation. The spring physics really make the interactions feel alive.', '2025-06-01T10:30:00Z'),
  ('delba', 'Server Components usage is on point. Great example of the mental model.', '2025-05-28T14:20:00Z'),
  ('leerob', 'This is exactly the kind of personal site that pushes the web forward.', '2025-05-20T09:15:00Z'),
  ('sarah_dr', 'Found your blog through the React 19 post. Subscribed via RSS immediately.', '2025-05-15T16:45:00Z'),
  ('mkdev', 'The dark theme with aurora gradients is stunning. Stealing this idea.', '2025-05-10T11:00:00Z'),
  ('alexm', 'Love the terminal-style guestbook. Reminds me of the early web.', '2025-05-05T08:30:00Z'),
  ('cassidoo', 'Great writing style. Technical but approachable. Keep it up!', '2025-04-28T13:00:00Z'),
  ('swyx', 'The "mental model" framing for RSC is exactly what the community needed.', '2025-04-22T15:30:00Z'),
  ('jenlchan', 'Your CSS container queries post saved me hours of debugging. Thank you!', '2025-04-15T10:00:00Z'),
  ('tannerlinsley', 'Solid work on the data layer. Clean separation of concerns.', '2025-04-08T09:00:00Z'),
  ('kentcdodds', 'The AI pair programming insights are spot on. Especially the "review every line" rule.', '2025-04-01T14:30:00Z'),
  ('bnjmnrsh', 'Came for the design, stayed for the technical depth. Rare combination.', '2025-03-25T11:15:00Z'),
  ('acemarke', 'Good Redux vs context article would be interesting given your architecture posts.', '2025-03-18T16:00:00Z'),
  ('sophiebits', 'The Zod patterns post should be required reading for API developers.', '2025-03-10T08:45:00Z'),
  ('gaearon', 'Interesting approach to the caching problem. Subscribed to see where this goes.', '2025-03-02T12:00:00Z')
ON CONFLICT DO NOTHING;

-- 5. 新增评论（分配到不同文章）
INSERT INTO public.comments (post_slug, name, message, created_at) VALUES
  ('building-neon-archive', 'dev_sarah', 'The liquid background effect is so smooth. How did you achieve the performance?', '2025-06-10T09:00:00Z'),
  ('building-neon-archive', 'alexchen', 'Using Framer Motion for everything is a bold choice. Any performance concerns with 11+ animations?', '2025-06-08T14:30:00Z'),
  ('building-neon-archive', 'marcus_dev', 'Space Grotesk + Fira Code is such a good font pairing. Stealing this combo.', '2025-06-05T11:00:00Z'),
  ('spring-physics-in-ui', 'anim_lover', 'Finally someone explains why spring > easing with actual examples. Bookmarked.', '2025-06-01T10:00:00Z'),
  ('spring-physics-in-ui', 'ui_engineer', 'The stiffness/damping sweet spot section is gold. Going to apply this to our design system.', '2025-05-28T16:00:00Z'),
  ('server-components-mental-model', 'react_fan', 'The "layers" mental model clicked for me instantly. This should be in the React docs.', '2025-05-25T09:30:00Z'),
  ('server-components-mental-model', 'next_js_dev', 'How do you handle optimistic UI with this layer approach? Any patterns for that?', '2025-05-22T13:00:00Z'),
  ('tailwind-v4-deep-dive', 'css_lover', 'The CSS-first config is such a game changer. No more tailwind.config.ts clutter.', '2025-05-20T10:00:00Z'),
  ('tailwind-v4-deep-dive', 'frontend_dev', 'Any migration tips from v3 to v4? The plugin system changes seem significant.', '2025-05-18T14:00:00Z'),
  ('react-19-compiler', 'perf_nerd', 'Finally can stop writing useCallback everywhere. The compiler does the work for us.', '2025-05-15T09:00:00Z'),
  ('react-19-compiler', 'sr_dev', 'But what about the "Rules of React" enforcement? Does the compiler warn or just break?', '2025-05-12T11:30:00Z'),
  ('database-indexing-guide', 'dba_mike', 'Should mention partial indexes too. They are incredibly powerful for filtered queries.', '2025-05-10T10:00:00Z'),
  ('ai-pair-programming', 'junior_dev', 'The "never commit code you can not explain" rule should be on every team wall.', '2025-05-08T15:00:00Z'),
  ('ai-pair-programming', 'tech_lead', 'We started using this workflow last month. Productivity is up but code quality needs monitoring.', '2025-05-05T09:00:00Z'),
  ('nextjs-caching-explained', 'cache_sufferer', 'This is the first explanation that actually makes the four layers clear. Thank you.', '2025-05-01T14:00:00Z')
ON CONFLICT DO NOTHING;

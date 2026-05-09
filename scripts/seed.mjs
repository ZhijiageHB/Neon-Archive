import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://nxhsqkbqjdrddoxolqbs.supabase.co',
  'sb_publishable_RT7mbxnSl3VCj8FaEoekeA_Kh3qbUtR'
);

async function seed() {
  console.log('Seeding database...');

  // Insert posts
  const posts = [
    {
      slug: 'building-neon-archive',
      title: 'Building Neon Archive: A Dark Futuristic Blog',
      excerpt: 'How I designed and built a personal technical archive with Next.js, Supabase, and Framer Motion.',
      content: `# Building Neon Archive

This is the story of how Neon Archive came to life — a personal technical archive designed with a dark, futuristic aesthetic.

## The Vision

I wanted something that wasn't just another black-and-white minimal blog. The goal was to create an experience that felt alive — with aurora gradients, glassmorphism, subtle noise textures, and micro-interactions that reward exploration.

## Tech Stack

- **Next.js 15** with App Router for server-first architecture
- **Tailwind CSS v4** for utility-first styling with custom theme
- **Framer Motion** for spring-physics animations
- **Supabase** for the database and real-time capabilities

## Key Design Decisions

### Color Palette

The palette centers around deep space blacks with electric purple and cyan as accent colors. This creates depth without being monotonous.

### Typography

Space Grotesk for body text gives a technical, geometric feel. Fira Code for code blocks adds the developer aesthetic with programming ligatures.

### Motion Philosophy

Every animation uses spring physics — no easing curves. This makes interactions feel physical and responsive.

\`\`\`typescript
const spring = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};
\`\`\`

## Architecture

The app uses a clear separation between server and client components. Only components that need interactivity are marked with "use client".

> Good architecture is invisible. You don't notice it — you just feel it.

## What's Next

More posts, more experiments, more ideas pushed into the archive. Stay tuned.`,
      tags: ['nextjs', 'design', 'framer-motion'],
      published: true,
      published_at: '2025-05-01T10:00:00Z',
    },
    {
      slug: 'spring-physics-in-ui',
      title: 'Spring Physics in UI: Why Easing Curves Are Overrated',
      excerpt: 'A deep dive into using spring-based animations for more natural, responsive interfaces.',
      content: `# Spring Physics in UI

Traditional CSS animations use easing curves — cubic-bezier functions that describe how a value changes over time. But there's a better way: spring physics.

## The Problem with Easing

Easing curves are time-based. Once you set a duration, the animation runs for exactly that long regardless of context.

## Springs Are Different

Spring animations are physics-based. They describe *how* something moves, not *when* it arrives. This means:

- **Responsive**: Springs adapt to interruption
- **Natural**: The overshoot and settle behavior mimics real-world physics
- **Configurable**: Two parameters — stiffness and damping — give you full control

\`\`\`typescript
// A subtle, professional spring
{ type: "spring", stiffness: 100, damping: 20 }

// A bouncy, playful spring
{ type: "spring", stiffness: 300, damping: 10 }
\`\`\`

## The Sweet Spot

For professional UIs, the sweet spot is:

- **Stiffness**: 100–300 (higher = snappier)
- **Damping**: 15–25 (lower = more bounce)

> The best animation is the one you feel but don't see.`,
      tags: ['animation', 'physics', 'ui'],
      published: true,
      published_at: '2025-04-15T14:30:00Z',
    },
    {
      slug: 'server-components-mental-model',
      title: 'React Server Components: A Mental Model That Actually Works',
      excerpt: 'Stop thinking about client vs server. Start thinking about where data lives.',
      content: `# React Server Components

Server Components are confusing because we keep trying to understand them through the lens of client-side React.

## The Key Insight

Server Components are not about *where code runs*. They're about *where data lives*.

When you write a Server Component, you're saying: "This component's data exists on the server. It doesn't need to be in the JavaScript bundle."

## Think in Layers

Visualize your app as layers:

1. **Static Layer** — Layout, navigation, typography. Ship zero JS.
2. **Data Layer** — Database queries, API calls. Runs on server, sends HTML.
3. **Interactive Layer** — Forms, animations, state. Runs on client.

\`\`\`tsx
// Server Component (default in App Router)
async function PostList() {
  const posts = await db.posts.findMany();
  return <div>{posts.map(...)}</div>;
}

// Client Component
'use client'
function LikeButton() {
  const [liked, setLiked] = useState(false);
  return <button onClick={() => setLiked(!liked)}>...</button>;
}
\`\`\`

## The Rule

- **Data only** → Server Component
- **Interactivity** → Client Component
- **Both** → Server Component that renders a Client Component

> Server Components aren't a new paradigm. They're the natural evolution.`,
      tags: ['react', 'nextjs', 'architecture'],
      published: true,
      published_at: '2025-03-20T09:00:00Z',
    },
    {
      slug: 'tailwind-v4-deep-dive',
      title: 'Tailwind CSS v4: CSS-First Configuration Changes Everything',
      excerpt: 'Tailwind v4 moves configuration from JavaScript to CSS. Here is why that matters.',
      content: `# Tailwind CSS v4

Tailwind v4 is a paradigm shift. Configuration moves from tailwind.config.ts to your CSS file using @theme directives.

## Before (v3)

\`\`\`javascript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        brand: '#7C3AED',
      },
    },
  },
}
\`\`\`

## After (v4)

\`\`\`css
@theme inline {
  --color-brand: #7C3AED;
}
\`\`\`

## Why This Matters

1. **No build step for config**: CSS is the source of truth
2. **Dynamic theming**: Change themes with CSS custom properties
3. **Simpler mental model**: One file, one language
4. **Better DX**: IDE autocomplete works directly in CSS

## The Plugin System

Plugins now use @plugin instead of JS config entries:

\`\`\`css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
\`\`\`

> The future of CSS tooling is CSS.`,
      tags: ['tailwind', 'css', 'tooling'],
      published: true,
      published_at: '2025-02-10T16:00:00Z',
    },
  ];

  const { error: postErr } = await supabase.from('posts').insert(posts);
  console.log('Posts:', postErr ? 'ERROR - ' + postErr.message : 'OK (4 posts)');

  // Insert post_metrics
  const metrics = [
    { slug: 'building-neon-archive', views: 142, likes: 23 },
    { slug: 'spring-physics-in-ui', views: 89, likes: 15 },
    { slug: 'server-components-mental-model', views: 234, likes: 41 },
    { slug: 'tailwind-v4-deep-dive', views: 67, likes: 12 },
  ];

  const { error: metErr } = await supabase.from('post_metrics').insert(metrics);
  console.log('Metrics:', metErr ? 'ERROR - ' + metErr.message : 'OK (4 rows)');

  // Insert projects
  const projects = [
    {
      title: 'Neon Archive',
      description: 'A dark, futuristic personal website and technical blog built with Next.js, Supabase, and Framer Motion.',
      url: 'https://neonarchive.dev',
      github_url: 'https://github.com/ZhijiageHB/Neon-Archive',
      tech_stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Supabase'],
      featured: true,
    },
    {
      title: 'Quantum UI Kit',
      description: 'A collection of reusable, animated UI components with spring physics and glassmorphism effects.',
      github_url: 'https://github.com',
      tech_stack: ['React', 'Framer Motion', 'Tailwind CSS'],
      featured: true,
    },
    {
      title: 'Signal Engine',
      description: 'A real-time data pipeline for processing and visualizing streaming events with sub-second latency.',
      url: 'https://example.com',
      tech_stack: ['Node.js', 'PostgreSQL', 'WebSocket', 'D3.js'],
      featured: true,
    },
  ];

  const { error: projErr } = await supabase.from('projects').insert(projects);
  console.log('Projects:', projErr ? 'ERROR - ' + projErr.message : 'OK (3 projects)');

  // Insert guestbook messages
  const messages = [
    { name: 'rauno', message: 'Incredible design work. The attention to detail in the animations is next level.' },
    { name: 'pacocoursey', message: 'Love the spatial feel of this archive. Clean and intentional.' },
    { name: 'visitor', message: 'Just found this through a friend. The dark theme is gorgeous.' },
  ];

  const { error: gbErr } = await supabase.from('guestbook').insert(messages);
  console.log('Guestbook:', gbErr ? 'ERROR - ' + gbErr.message : 'OK (3 messages)');

  console.log('\nDone!');
}

seed().catch(console.error);

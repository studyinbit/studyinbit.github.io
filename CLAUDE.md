# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a recruitment website for Beijing Institute of Technology (BIT), targeted at Indonesian students. It is an **unofficial** site managed by BIND (BIT Indonesian Community). The site uses Next.js 16 with App Router, React 19, TypeScript, Tailwind CSS v4, and Framer Motion for animations.

The site is configured for **static export** (`output: "export"` in `next.config.ts`), which means it builds as pure static HTML/CSS/JS with no server-side rendering.

## Commands

```bash
# Development
bun run dev        # Start dev server (http://localhost:3000)

# Build & Deploy
bun run build      # Build for production (outputs to `out/` directory)
bun run start      # Preview production build (requires build first)

# Linting
bun run lint       # Run ESLint
```

## Architecture

### Directory Structure

```
app/                    # Next.js App Router pages
├── layout.tsx          # Root layout with fonts (Plus Jakarta Sans, Syne)
├── page.tsx            # Home page
├── globals.css         # Global styles with Tailwind v4 + custom utilities
├── admissions/         # Admissions & scholarships page
├── campus-life/        # Campus life page
├── community/          # Indonesian community page
├── faq/                # FAQ page with search
└── why-bit/            # Why BIT page

components/
├── layout/             # Layout components (Navbar, Footer)
├── features/           # Feature components (e.g., CostCalculator)
└── ui/                 # Reusable UI components (shadcn/base-nova)

lib/
├── content.ts          # Site content, stats, features, scholarships data
└── utils.ts            # Utility functions (cn for className merging)
```

### Content Management

Site content is centralized in `lib/content.ts`:
- `hero` - Hero section content
- `stats` - Statistics displayed on homepage
- `features` - Value proposition cards
- `contact` - WhatsApp and contact info
- `scholarships` - Scholarship data for CostCalculator
- `costs` - Cost basis for calculator (tuition, dorm, living)

When updating content, prefer editing `lib/content.ts` over hardcoding values in components.

### Styling System

**Tailwind CSS v4** with a custom design system defined in `app/globals.css`:

- **Primary color**: Emerald green (`oklch(0.596 0.17 163.7)`)
- **Fonts**: Plus Jakarta Sans (body), Syne (display/headings)
- **Radius**: Base 12px with scale (`--radius-*` CSS variables)
- **Custom utilities**:
  - `.glass` - Frosted glass effect (bg-white/70 + backdrop-blur)
  - `.glass-pill` - Pill-shaped glass navbar
  - `.bg-gradient-warm`, `.bg-gradient-cool` - Gradient backgrounds
  - `.text-gradient-warm`, `.text-gradient-cool` - Gradient text

The site is **light mode primary** but retains dark mode variables for future use.

### Key Components

- **Navbar** (`components/layout/Navbar.tsx`): Floating pill design with scroll-based shrink, mobile menu overlay
- **Footer** (`components/layout/Footer.tsx`): Multi-column layout
- **GradientBlob** (`components/ui/GradientBlob.tsx`): Animated background blobs with variants (cool, warm, accent)
- **WhatsAppButton** (`components/ui/WhatsAppButton.tsx`): Primary CTA linking to WhatsApp consultation

### UI Component Library

Uses **shadcn (base-nova style)** with components in `components/ui/`. To add new components:

```bash
# Use shadcn CLI (configured in components.json)
bunx shadcn add [component-name]
```

Component aliases (from `components.json`):
- `@/components` → components
- `@/lib/utils` → lib/utils
- `@/components/ui` → components/ui

### Animations

**Framer Motion** is used for page animations and micro-interactions:
- Page transitions with `AnimatePresence` and `mode="wait"`
- Scroll-triggered animations with `whileInView` and `viewport`
- Staggered children animations using `staggerChildren`

## Important Notes

1. **Static Export Limitations**: Since `output: "export"` is used, avoid:
   - Dynamic routes with `generateStaticParams`
   - Server Actions
   - Route Handlers (API routes)
   - `headers()`, `cookies()`, or other server-only APIs

2. **Images**: Use `next/image` with `placeholder="blur"` for better UX. See `components/ui/blur-image.tsx`.

3. **Icons**: Lucide React via `lucide-react` package.

4. **Path Alias**: `@/*` maps to project root (configured in `tsconfig.json`).

5. **WhatsApp Contact**: Primary contact method is WhatsApp (`https://wa.me/6281388577873`).

5. Project uses **bun**, not node/npm/npx.
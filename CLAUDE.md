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

6. **Package Manager - BUN ONLY**:
   - This project **EXCLUSIVELY** uses [Bun](https://bun.sh) as the package manager and runtime
   - **NEVER** use `npm`, `yarn`, `pnpm`, `node`, or `npx` commands
   - **NEVER** create or modify `package-lock.json`, `yarn.lock`, or `pnpm-lock.yaml`
   - Only `bun.lock` should exist for dependency locking

   **For Claude Code**:
   - Always use `bun` instead of `npm`/`yarn`/`pnpm`
   - Use `bunx` instead of `npx`
   - Example: `bunx shadcn add button` NOT `npx shadcn add button`

   **For Contributors without Bun**:
   If you don't have Bun installed, install it first:
   ```bash
   # macOS/Linux
   curl -fsSL https://bun.sh/install | bash

   # Windows (PowerShell)
   powershell -c "irm bun.sh/install.ps1 | iex"

   # Or via npm (one-time only to install Bun)
   npm install -g bun
   ```

   Then use these Bun commands:
   ```bash
   bun install              # Instead of: npm install
   bun add <package>        # Instead of: npm install <package>
   bun remove <package>     # Instead of: npm uninstall <package>
   bun run dev              # Instead of: npm run dev
   bunx <command>           # Instead of: npx <command>
   ```

7. **Linting**:
   - Run `bun run lint` after making any code changes
   - Fix all linting errors before considering the task complete
   - Do not finish work with linting errors
   - If lint errors occur, fix them immediately and re-run `bun run lint` to verify

8. **React Best Practices - Avoid useEffect**:
   - Most `useEffect` usage can be replaced with better patterns:
     - **Event handlers**: For user interactions (clicks, form submissions)
     - **Server Components**: For data fetching (when not using static export)
     - **Props/State**: For derived state (calculate during render)
     - **useMemo/useCallback**: For expensive computations
     - **React Query/SWR**: For data fetching and caching
     - **Framer Motion callbacks**: For animation-related side effects
   - Only use `useEffect` as a last resort for:
     - Syncing with external systems (non-React libraries)
     - Browser APIs (localStorage, window listeners) - but prefer event handlers
     - Truly unavoidable imperative operations
   - If you must use `useEffect`, document why it's necessary in a comment
   - Reference: [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
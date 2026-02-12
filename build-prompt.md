# Comprehensive Prompt for BIT Recruitment Website Development

I need you to build a recruitment website for BIT (Beijing Institute of Technology) targeting Indonesian Year 11 students and their parents. All content plans and requirements are documented in the `/content-plan/` directory.

## Project Overview

**Purpose**: Create a distinctive, production-grade recruitment website that convinces Indonesian students to study at BIT and encourages them to contact us via WhatsApp.

**Target Audience**:
- Year 11 Indonesian students
- Parents of Y11 students
- Ambitious students looking for universities

**Primary Goal**: Drive WhatsApp engagement (Timothy Pardin - +6281388577873)

## Technical Stack

- **Framework**: Next.js 14+ (App Router), React 18+, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components (already initialized)
- **Animation**: Framer Motion (motion library - already installed via `bun install motion`)
- **Icons**: Lucide React
- **Fonts**:
  - Plus Jakarta Sans (body text)
  - Clash Display (hero headlines)
  - Import via Google Fonts

## Design Direction

**Aesthetic**: "Modern Tech-Forward with Warmth" - Light Mode

### Key Design Elements:
1. **Navigation**: Pill-shaped blur nav bar with glassmorphism effect (inspired by modern SaaS designs like the reference images in `/content-plan/images/`)
2. **Typography**:
   - Clash Display for hero headlines (bold, distinctive)
   - Plus Jakarta Sans for body text
3. **Color Palette**:
   - Primary: Warm gradient (Amber #F59E0B to Orange #EA580C)
   - Secondary: Cool gradient (Blue #3B82F6 to Purple #8B5CF6)
   - Accent: Emerald #10B981 (CTAs)
   - WhatsApp: Green #25D366
   - Background: White with subtle gradients
   - Text: Slate 900 for primary, Slate 600 for secondary
4. **Theme**: Light mode (icons have white backgrounds, need light theme)
5. **Animations**:
   - Smooth, purposeful animations
   - Staggered reveals (100-200ms delays)
   - Hover effects with gradient blur from bottom
   - Count-up animations for stats
   - Parallax effects (subtle)

### Important Design Notes:
- **NOT generic institutional** - should be bold, memorable, alive
- **Glassmorphism navigation** - pill-shaped with backdrop blur
- **Image hover effects** - gradient blur from bottom showing text/details (make configurable)
- **Generous spacing** - modern, breathable layouts
- **Asymmetric layouts** - avoid rigid grids where appropriate

## Website Structure (7 Pages)

Read the detailed content plans in `/content-plan/`:

1. **Homepage** (`01-homepage.md`)
   - Hero with "Build the Future." headline
   - Stats bar: #9 Employability, #14 Engineering, 400+ Indonesian Students
   - 3 value proposition cards
   - Image gallery (no testimonials)
   - WhatsApp CTA prominent

2. **Why BIT?** (`02-why-bit.md`)
   - "Seven Sons of National Defense" advantage
   - Rankings table
   - 3 differentiation pillars
   - Cost Calculator (NOT ROI calculator)
   - BIND community section

3. **Campus Life** (`03-campus-life.md`)
   - Liangxiang location
   - 4 room types: 2/3/4 person (old building), 4 person with 2 bedrooms (new building)
   - Dining (North Canteen, Muslim Canteen)
   - Campus facilities
   - Photo gallery with hover effects (gradient blur from bottom)

4. **Indonesian Community** (`04-indonesian-community.md`)
   - BIND four pillars (Academic Support, Community & Culture, Arrival Support)
   - Zero-stress arrival system
   - PERMIT Beijing & PPIT Tiongkok connection
   - Photo gallery (NO testimonials, NO forms)

5. **Admissions & Scholarships** (`05-admissions-scholarships.md`)
   - CSCA exam information (prominent)
   - Requirements checklist
   - Scholarship comparison
   - Application timeline
   - Preparation guide

6. **FAQ & Common Worries** (`07-faq-worries.md`)
   - Parent concerns
   - Student questions
   - Search/filter functionality
   - Make configurable for easy updates

7. **Contact & Resources** (`08-contact-resources.md`)
   - WhatsApp contact (primary)
   - Instagram accounts (BIND, PERMIT, PPIT - separate entities)
   - Resource downloads
   - Event calendar

**NOTE**: Career & ROI page was removed (insufficient data)

## Key Data Points

- **Indonesian Students**: 400+ (not 200+)
- **Rankings**: ARWU #102, QS Employability #9, NTU Engineering #14
- **Costs**: 500-900 RMB/month dorms, 30-50 RMB/day food
- **Contact**: Timothy Pardin - +6281388577873 (WhatsApp)
- **Instagram**: @bit_indonesia, @permitbeijing, @ppitiongkok (separate entities, not official recruitment)
- **All statistics**: Use numbers from `docs.md` as placeholders

## Important Requirements & Constraints

### Must-Have Features:
1. **Cost Calculator** (interactive) - NOT ROI calculator
2. **Image hover effects** - gradient blur from bottom showing text (configurable)
3. **Photo galleries** - with lightbox view
4. **Search/filter** - for FAQ page
5. **WhatsApp integration** - prominent CTAs throughout
6. **Configurable content** - especially FAQ and image captions

### Skip These:
- ❌ Live chat integration (have WhatsApp)
- ❌ 360° virtual tours
- ❌ Video testimonials (not available)
- ❌ Email contact for recruitment (only WhatsApp)
- ❌ Social media for recruitment site (only community Instagram links)
- ❌ Newsletter signup
- ❌ "Join BIND" forms

### Content Accuracy Notes:
- Remove "80% hands-on curriculum" (not accurate for CS)
- Add disclaimers for industry partnerships (may not apply to international students)
- Remove "mental health support" from BIND services
- Add: QnA groups, tours, jastip service
- Remove "quiet environment for concentration" (untrue)
- Change "Superior to cramped..." to "Affordable, good value"

## Assets Available

- **Images**: `/public/images/uni/` (campus photos - placeholder, may change)
- **Icons**: BIND, PERMIT, PPIT, BIT logos (white backgrounds)
- **Documents**: PPTs, videos, map PDFs, jastip PDFs (non-essential, for download section)

## Implementation Priority

Build in this order:
1. Design system setup (Tailwind config, components)
2. Navigation component (pill-shaped blur)
3. Homepage (sets the tone)
4. Why BIT? (credibility)
5. Campus Life (visual appeal)
6. Indonesian Community (addresses fears)
7. Admissions & Scholarships
8. FAQ
9. Contact & Resources

## Key Components to Build

1. **Pill-shaped blur navigation**
   - Glassmorphism effect
   - Sticky on scroll
   - Responsive (hamburger on mobile)

2. **Hero sections**
   - Clash Display typography
   - Gradient overlays
   - Staggered animations

3. **Stat counters**
   - Count-up animation on scroll
   - Large, bold numbers

4. **Cost calculator**
   - Input: Scholarship type, living style
   - Output: 4-year cost, monthly breakdown
   - Animated results

5. **Image galleries**
   - Hover effect: gradient blur from bottom with text
   - Lightbox view
   - Configurable captions

6. **WhatsApp CTAs**
   - Floating button (bottom right)
   - Prominent in hero sections
   - QR code for mobile

7. **FAQ accordion**
   - Search functionality
   - Filter by category
   - Expandable Q&A
   - Configurable content

## Design System Specifications

### Spacing
- Base: 4px
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px
- Section padding: 96px (desktop), 48px (mobile)

### Border Radius
- Small: 8px
- Medium: 16px
- Large: 24px
- Full: 9999px (pills)

### Shadows
- Small: `0 1px 3px rgba(0,0,0,0.12)`
- Medium: `0 4px 6px rgba(0,0,0,0.1)`
- Large: `0 10px 25px rgba(0,0,0,0.15)`
- Glow: `0 0 20px rgba(59,130,246,0.3)`

### Animations
- Duration: 200-600ms
- Easing: ease-out
- Stagger delay: 100-200ms
- Respect prefers-reduced-motion

## Reference Files

All detailed content plans are in `/content-plan/`:
- `README-UPDATED.md` - Implementation summary
- `UPDATES.md` - All changes from feedback
- `00-overall-plan.md` - Complete design system
- `01-homepage.md` through `08-contact-resources.md` - Page-by-page content plans
- `docs.md` - Source of truth for BIT information

## Additional Context

### What to Avoid:
- Generic AI aesthetics (Inter font, purple gradients on white, cookie-cutter designs)
- Dark mode (icons have white backgrounds)
- Overly institutional look (should be modern, exciting)
- Unsubstantiated claims (80% hands-on, guaranteed internships for international students)

### What to Emphasize:
- Bold, confident design
- Light mode with warm/cool gradients
- Glassmorphism navigation
- Interactive elements (calculator, hover effects)
- WhatsApp as primary contact
- Community support (400+ Indonesian students)
- Affordability and value

## Success Criteria

1. **Visual Impact**: Bold, memorable, NOT generic
2. **Performance**: Fast load times, smooth animations
3. **Accessibility**: WCAG 2.1 AA compliance
4. **Mobile-First**: Responsive across all devices
5. **Conversion**: Clear path to WhatsApp contact
6. **Configurability**: Easy to update content (especially FAQ, image captions)

## Next Steps

1. Set up Tailwind config with custom colors and fonts
2. Create reusable components (navigation, buttons, cards, sections)
3. Build animation system with Framer Motion
4. Implement pages in priority order
5. Add interactive features (calculator, search, galleries)
6. Test across devices and browsers
7. Optimize for performance and accessibility

Please read all content plan files in `/content-plan/` for complete specifications. Make the website alive, beautiful, and distinctive. Focus on the glassmorphism navigation, image hover effects, and smooth animations. Prioritize WhatsApp conversion throughout.

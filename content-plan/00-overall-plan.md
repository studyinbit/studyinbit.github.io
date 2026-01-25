# Overall Website Plan - Structure & Design System

## Site Structure

### Navigation (Main Menu)
**Pill-shaped blur navigation bar (glassmorphism)**
- Sticky header with backdrop blur
- Rounded pill shape
- Light background with transparency
- Subtle shadow

**Navigation Items:**
1. **Home**
2. **Why BIT?** (Rankings, advantages, differentiation)
3. **Campus Life** (Dorms, food, facilities, daily life)
4. **Community** (BIND, Indonesian support)
5. **Admissions** (Requirements, CSCA, scholarships, timeline)
6. **FAQ** (Common worries, Q&A)
7. **Contact** (WhatsApp CTA, resources, downloads)

**Note:** Career & ROI page removed per user feedback (insufficient data)

**Note:** With 7 pages, consider:
- Desktop: All items visible in pill nav
- Tablet: Condensed with some items in dropdown
- Mobile: Hamburger menu

### Sticky Elements
- **Navigation**: Pill-shaped blur nav (always visible, glassmorphism effect)
- **WhatsApp CTA**: Floating button (bottom right, always visible)
- **Footer**: Quick links, contact info

## Design System

### Typography
**Primary Font: Plus Jakarta Sans**
- Headings: 700-800 weight
- Body: 400-500 weight
- Captions: 300-400 weight

**Display Font (for hero sections):**
- **Clash Display** for hero headlines, Plus Jakarta Sans for everything else

### Color Palette

#### Primary Colors
- **Warm Gradient**:
  - Start: `#F59E0B` (Amber 500)
  - End: `#EA580C` (Orange 600)
  - Use: Hero backgrounds, CTAs, highlights

- **Cool Gradient**:
  - Start: `#3B82F6` (Blue 500)
  - End: `#8B5CF6` (Purple 500)
  - Use: Secondary sections, data visualizations

#### Accent Colors
- **Success/CTA**: `#10B981` (Emerald 500) - for primary buttons
- **WhatsApp**: `#25D366` (WhatsApp green) - for WhatsApp CTAs
- **Warning**: `#F59E0B` (Amber 500) - for important notices
- **Error**: `#EF4444` (Red 500) - for alerts

#### Neutral Colors
- **Background Light**: `#FFFFFF` (White)
- **Background Subtle**: `#F8FAFC` (Slate 50)
- **Surface**: `#FFFFFF` (White with subtle shadow)
- **Border**: `#E2E8F0` (Slate 200)
- **Text Primary**: `#0F172A` (Slate 900)
- **Text Secondary**: `#475569` (Slate 600)
- **Text Muted**: `#94A3B8` (Slate 400)

### Theme Approach
**Light Mode Primary** with subtle gradients and depth
- Hero sections: Light with gradient overlays
- Content sections: White backgrounds with subtle shadows
- Data sections: Light backgrounds with colored accents
- Community sections: Warm, inviting tones
- Navigation: Pill-shaped blur overlay (glassmorphism effect)
- Icons: Work well on light backgrounds (logos have white backgrounds)

### Spacing System
- Base unit: 4px
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px
- Section padding: 96px (desktop), 48px (mobile)
- Container max-width: 1280px
- Content max-width: 768px (for readability)

### Border Radius
- Small: 8px (cards, buttons)
- Medium: 16px (larger cards, images)
- Large: 24px (hero sections, major containers)
- Full: 9999px (pills, badges)

### Shadows
- Small: `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)`
- Medium: `0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)`
- Large: `0 10px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.05)`
- Glow: `0 0 20px rgba(59,130,246,0.3)` (for hover effects)

## Animation Strategy

### Page Load Animations
**Hero Section:**
- Gradient mesh: Slow, organic movement (10s duration, infinite)
- Headline: Fade in + slide up (600ms, ease-out)
- Subheadline: Fade in + slide up (600ms, 200ms delay)
- CTA buttons: Fade in + scale (400ms, 400ms delay)
- Stats bar: Fade in + slide up (600ms, 600ms delay)

**Stagger Pattern:**
- Use 100-200ms delays between elements
- Maximum 5 elements in a stagger sequence
- Keep total animation time under 1.5s

### Scroll Animations
**Trigger: When element enters viewport (50% visible)**
- Fade in + slide up (600ms, ease-out)
- Number counters: Count up animation (1500ms)
- Progress bars: Fill animation (1000ms)
- Images: Fade in + scale (800ms)

### Hover Animations
**Cards:**
- Lift: `translateY(-8px)` (200ms, ease-out)
- Glow: Box shadow expansion (200ms)
- Scale: `scale(1.02)` (200ms)

**Buttons:**
- Primary: Background gradient shift + scale(1.05) (200ms)
- Secondary: Border glow + slight lift (200ms)
- Text links: Underline slide-in (200ms)

**Images:**
- Zoom: `scale(1.1)` on parent container (400ms, ease-out)
- Overlay: Fade in caption/overlay (300ms)

### Micro-interactions
- Form inputs: Focus ring animation (200ms)
- Checkboxes: Check mark draw animation (300ms)
- Toggles: Smooth slide (200ms)
- Tooltips: Fade in + slide (200ms)
- Notifications: Slide in from top (400ms)

### Page Transitions
- Route change: Fade out (200ms) → Fade in (300ms)
- Smooth scroll to sections (800ms, ease-in-out)

## Component Patterns

### Hero Sections
**Structure:**
```
- Full viewport height (min-h-screen)
- Gradient mesh background
- Centered content
- Large headline (text-6xl to text-8xl)
- Subheadline (text-xl to text-2xl)
- CTA buttons (prominent)
- Scroll indicator (animated)
```

### Content Sections
**Structure:**
```
- Section padding (py-24)
- Container (max-w-7xl, mx-auto)
- Section headline (text-4xl to text-5xl)
- Section subheadline (text-lg to text-xl)
- Content grid/flex layout
- Visual elements (images, icons, illustrations)
```

### Cards
**Types:**
1. **Feature Card**: Icon + Headline + Description + Link
2. **Stat Card**: Large number + Label + Context
3. **Testimonial Card**: Quote + Photo + Name + Role
4. **Resource Card**: Icon + Title + Description + Download button
5. **Image Card**: Image + Overlay + Caption

**Common Styles:**
- Background: Surface color or gradient
- Border radius: 16px
- Padding: 24-32px
- Shadow: Medium
- Hover: Lift + glow

### Buttons
**Primary:**
- Background: Emerald gradient
- Text: White, bold
- Padding: 16px 32px
- Border radius: 8px
- Hover: Scale + brightness increase

**Secondary:**
- Background: Transparent
- Border: 2px solid
- Text: Primary color
- Padding: 16px 32px
- Border radius: 8px
- Hover: Background fill + glow

**WhatsApp:**
- Background: WhatsApp green
- Icon: WhatsApp logo
- Text: White, bold
- Padding: 16px 32px
- Border radius: 8px
- Hover: Brightness increase + scale

### Data Visualizations
**Charts:**
- Use Recharts library
- Color palette: Primary/secondary gradients
- Animations: Smooth entry animations
- Tooltips: Hover for details
- Responsive: Stack on mobile

**Tables:**
- Alternating row colors
- Hover highlight
- Sticky headers
- Responsive: Horizontal scroll or card layout on mobile

**Stats:**
- Large numbers (text-5xl to text-7xl)
- Count-up animation
- Context label below
- Icon or visual accent

## Responsive Strategy

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Large: > 1280px

### Mobile Optimizations
- Hamburger menu for navigation
- Stacked layouts (single column)
- Larger touch targets (min 44px)
- Simplified animations (reduce motion)
- Optimized images (smaller sizes)
- Collapsible sections (accordions)

### Tablet Optimizations
- 2-column layouts where appropriate
- Adjusted font sizes
- Maintained animations
- Optimized spacing

### Desktop Optimizations
- Multi-column layouts (3-4 columns)
- Larger images and visuals
- Full animation suite
- Generous spacing
- Parallax effects (subtle)

## Performance Considerations

### Image Optimization
- Use Next.js Image component
- WebP format with fallbacks
- Lazy loading (below fold)
- Responsive images (srcset)
- Blur placeholder (LQIP)

### Code Splitting
- Route-based splitting (automatic with Next.js)
- Component lazy loading (React.lazy)
- Dynamic imports for heavy components

### Animation Performance
- Use CSS transforms (GPU-accelerated)
- Avoid animating layout properties
- Use will-change sparingly
- Reduce motion for accessibility

### Loading Strategy
- Critical CSS inline
- Defer non-critical JavaScript
- Preload key resources
- Optimize fonts (subset, preload)

## Accessibility

### WCAG 2.1 AA Compliance
- Color contrast: Minimum 4.5:1 for text
- Focus indicators: Visible on all interactive elements
- Keyboard navigation: Full site navigable
- Screen reader: Semantic HTML, ARIA labels
- Alt text: All images
- Form labels: Explicit associations
- Skip links: Skip to main content

### Motion Accessibility
- Respect prefers-reduced-motion
- Provide pause/stop for auto-playing content
- Avoid flashing/strobing effects

## SEO Considerations

### Meta Tags
- Title: Unique per page, 50-60 characters
- Description: Unique per page, 150-160 characters
- Open Graph: Images, titles, descriptions
- Twitter Cards: Summary with large image

### Structured Data
- Organization schema
- Educational Organization schema
- FAQ schema (for FAQ page)
- BreadcrumbList schema

### Performance
- Core Web Vitals optimization
- Fast page load (< 3s)
- Mobile-friendly
- HTTPS

## Content Strategy

### Tone of Voice
- **Confident**: We know BIT is excellent
- **Honest**: Transparent about challenges
- **Supportive**: We're here to help
- **Aspirational**: Focus on future success
- **Data-driven**: Back claims with numbers
- **Personal**: Real student stories

### Writing Guidelines
- Short paragraphs (2-3 sentences)
- Bullet points for scannability
- Active voice
- Specific numbers over vague claims
- Student quotes for authenticity
- Clear CTAs

### Visual Content
- High-quality photos (actual campus, students)
- Authentic, not stock photos
- Diverse representation
- Candid moments over posed shots
- Infographics for complex data
- Videos for testimonials and tours

## Technical Stack

### Framework
- **Next.js 14+** (App Router)
- **React 18+**
- **TypeScript**

### Styling
- **Tailwind CSS**
- **shadcn/ui components**
- **CSS Modules** (for complex animations)

### Animation
- **Framer Motion** (motion library)
- **CSS animations** (for simple effects)

### Data Visualization
- **Recharts** (charts and graphs)

### Forms
- **React Hook Form**
- **Zod** (validation)

### Icons
- **Lucide React** (as specified in setup)

### Fonts
- **Plus Jakarta Sans** (Google Fonts)
- **Syne** (Google Fonts, for display)

## File Structure
```
/app
  /page.tsx (Homepage)
  /why-bit/page.tsx
  /campus-life/page.tsx
  /community/page.tsx
  /admissions/page.tsx
  /career/page.tsx
  /faq/page.tsx
  /contact/page.tsx
  /layout.tsx (Root layout)
  /globals.css

/components
  /ui (shadcn components)
  /sections (page sections)
  /layout (header, footer, nav)
  /animations (reusable animation wrappers)
  /data-viz (charts, stats)

/lib
  /utils.ts
  /constants.ts (colors, breakpoints, etc.)
  /animations.ts (animation variants)

/public
  /images
    /uni (campus photos)
  /downloads (PDFs, resources)
```

## Next Steps

1. **Review & Approve Content Plans**
   - Go through each page plan
   - Provide feedback
   - Clarify any questions

2. **Gather Assets**
   - Campus photos
   - Student photos
   - Logos (BIND, PERMIT, BIT)
   - Videos (if available)
   - Documents (PDFs for download)

3. **Finalize Contact Information**
   - WhatsApp numbers
   - Email addresses
   - Phone numbers
   - Social media handles
   - Office locations

4. **Implement Design System**
   - Set up Tailwind config
   - Create component library
   - Build reusable sections

5. **Build Pages**
   - Start with Homepage
   - Then Why BIT, Campus Life, Community
   - Then Admissions, Career, FAQ, Contact

6. **Test & Refine**
   - Cross-browser testing
   - Mobile testing
   - Performance optimization
   - Accessibility audit
   - User feedback

## Questions for You

1. **Content Priorities**: Which pages are most critical to launch first?

2. **Contact Information**: Do you have the actual WhatsApp numbers, emails, and social media handles?

3. **Assets**: Do you have access to campus photos in `/public/images/uni/`? What's available?

4. **Branding**: Are there specific BIT or BIND brand colors/logos I should use?

5. **Timeline**: When do you need this launched? (I won't estimate time, but knowing urgency helps prioritize)

6. **Interactive Features**: Which interactive elements are must-haves vs nice-to-haves?
   - ROI Calculator
   - Cost Calculator
   - Virtual tour
   - Video testimonials
   - Live chat integration

7. **Data**: Do you have actual statistics for:
   - Number of Indonesian students
   - Scholarship success rates
   - Employment rates
   - Salary data
   - Or should I use the numbers from docs.md as placeholders?

8. **Aesthetic Direction**: Any preferences or concerns about the proposed design direction (dark mode with warm/cool gradients, modern tech-forward aesthetic)?

9. **Existing Materials**: Do you have existing PPTs, videos, or documents that should be linked/embedded?

10. **Target Launch**: Is this for a specific recruitment cycle (e.g., 2026 admissions)?

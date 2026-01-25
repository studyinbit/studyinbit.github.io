# BIT Recruitment Website - Content Plan Summary

## Overview
This document summarizes the complete content plan for the BIT (Beijing Institute of Technology) recruitment website targeting Indonesian Year 11 students and their parents.

## Website Structure (8 Pages)

### 1. Homepage (`01-homepage.md`)
**Purpose**: Create an unforgettable first impression
**Key Elements**:
- Bold hero with dynamic gradient mesh animation
- Key stats bar (#9 employability, #14 engineering, 200+ Indonesian students)
- Three value proposition cards (Elite Engineering, Indonesian Community, Unbeatable ROI)
- Featured content (videos, image gallery)
- Quick access to resources
- Prominent WhatsApp CTA

### 2. Why BIT? (`02-why-bit.md`)
**Purpose**: Establish credibility with data and strategic positioning
**Key Elements**:
- "Seven Sons of National Defense" advantage
- Rankings comparison table (ARWU #102, QS Employability #9, NTU Engineering #14)
- Three differentiation pillars (Engineering-First, Industry Integration, Global Mobility)
- Indonesian advantage (BIND support)
- Interactive ROI calculator

### 3. Campus Life (`03-campus-life.md`)
**Purpose**: Show daily life through rich visuals
**Key Elements**:
- Liangxiang location advantages
- Dormitory options (double/quad rooms, costs, facilities)
- Dining experience ("Eating at BIT" - North Canteen, Muslim Canteen)
- Campus facilities (library, sports, study spaces)
- Frequented locations by Y1 students (interactive map)
- "A Day in the Life" timeline
- Extensive photo gallery

### 4. Indonesian Community (`04-indonesian-community.md`)
**Purpose**: Address isolation fears with robust support system
**Key Elements**:
- BIND four pillars (Academic Support, Career Integration, Community & Culture, Arrival Support)
- "Zero-Stress" arrival system (3-step process)
- PERMIT Beijing connection
- Student testimonials (video and written)
- Photo gallery of BIND events
- Join BIND form

### 5. Admissions & Scholarships (`05-admissions-scholarships.md`)
**Purpose**: Demystify admissions process and highlight scholarships
**Key Elements**:
- CRITICAL: CSCA exam information (prominent alert)
- Admission requirements checklist
- Scholarship comparison (CSC Type A/B, Beijing Municipal, BIT Merit)
- Application timeline (September to September)
- Preparation guide (Iron Triangle: Math, Physics, Programming)
- Programs offered
- FAQ section
- Apply now CTAs

### 6. Career & ROI (`06-career-roi.md`)
**Purpose**: Show concrete career outcomes and ROI
**Key Elements**:
- Employability premium (#9 in China)
- Three career pathways (Chinese tech in Indonesia, Work in China, Global opportunities)
- Interactive ROI calculator
- Industry connections (200+ partners)
- Alumni success stories
- Salary progression charts
- Beyond salary benefits

### 7. FAQ & Common Worries (`07-faq-worries.md`)
**Purpose**: Proactively address concerns
**Key Elements**:
- For Parents (6 top worries: Safety, Isolation, Academic Pressure, Language, Cost, Quality)
- For Students (7 top questions: Social Life, Food, Dating, Internet, Weather, Work, After Graduation)
- Practical questions (logistics)
- Search and filter functionality
- Video FAQs
- "Still have questions?" CTAs

### 8. Contact & Resources (`08-contact-resources.md`)
**Purpose**: Make contact easy and provide all resources
**Key Elements**:
- PRIMARY: WhatsApp CTAs (group and direct message)
- Other contact methods (email, WeChat, Instagram, phone)
- Download resources (application materials, videos, data, preparation materials)
- Schedule a call (student chat, admissions, parent session)
- Newsletter signup
- Upcoming events calendar
- Quick links organized by audience
- Emergency contact info

## Design System

### Aesthetic Direction
**"Modern Tech-Forward with Warmth"**
- Bold, confident, memorable
- NOT generic institutional
- Alive with gradients and animations
- Professional yet approachable

### Typography
- **Body**: Plus Jakarta Sans (as specified)
- **Display**: Syne (for hero headlines - distinctive, tech-forward)

### Color Palette
- **Warm Gradient**: Amber (#F59E0B) to Orange (#EA580C)
- **Cool Gradient**: Blue (#3B82F6) to Purple (#8B5CF6)
- **Accent**: Emerald (#10B981) for CTAs
- **WhatsApp**: Green (#25D366)
- **Theme**: Dark mode primary with light sections for contrast

### Animation Strategy
- Hero: Staggered fade-in with slide-up (600ms delays)
- Scroll: Fade in + slide up when 50% visible
- Hover: Lift + glow effects on cards
- Numbers: Count-up animations
- Gradient mesh: Slow, organic movement (10s infinite)

### Key Components
- Hero sections (full viewport, gradient backgrounds)
- Feature cards (icon + headline + description)
- Stat cards (large numbers with context)
- Testimonial cards (quote + photo + name)
- Interactive calculators (ROI, cost)
- Data visualizations (charts, tables)
- Photo galleries (masonry, lightbox)
- Video embeds (testimonials, tours)

## Technical Stack
- **Framework**: Next.js 14+ (App Router), React 18+, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Animation**: Framer Motion (motion library)
- **Data Viz**: Recharts
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## Content Strategy

### Tone of Voice
- Confident (BIT is excellent)
- Honest (transparent about challenges)
- Supportive (we're here to help)
- Aspirational (focus on future success)
- Data-driven (back claims with numbers)
- Personal (real student stories)

### Key Messages
1. **Elite Engineering**: Top 15 global engineering, "Seven Sons" status
2. **Strong Community**: 200+ Indonesian students, BIND support from Day 1
3. **Unbeatable ROI**: Affordable costs, high employability, strong salaries
4. **Career Opportunities**: Three clear pathways (Indonesia, China, Global)
5. **Zero Stress**: Comprehensive support system (arrival, academic, social)

### Primary Goal
**Convince users to chat on WhatsApp** - This is the main conversion goal throughout the site.

## What's Included in Each Plan

Each page plan (`01-homepage.md` through `08-contact-resources.md`) includes:
- **Purpose**: Why this page exists
- **Section-by-section breakdown**: Detailed content for each section
- **Headlines and subheadlines**: Specific copy suggestions
- **Visual descriptions**: What images, graphics, animations to use
- **Interactive elements**: Calculators, forms, filters, etc.
- **Design notes**: Layout, colors, animations specific to that page
- **CTAs**: Clear calls-to-action

## Assets Needed

### Photos (from `/public/images/uni/`)
- Campus buildings and scenery
- Dormitory rooms (double and quad)
- Canteens (North Canteen floors 1 & 2, Muslim Canteen)
- Food (various dishes)
- Library and study spaces
- Sports facilities
- BIND events (study sessions, cultural nights, social gatherings)
- Students in classes and labs
- BBB (group study) sessions
- Student organizations (BIND, PPIT, etc.)
- Maps and campus locations

### Documents (for download)
- Application guide (PDF)
- CSCA preparation pack (sample papers, syllabus)
- Scholarship application guide (PDF)
- BIT overview presentation (PPT/PDF)
- Facts & figures sheet (PDF)
- Cost calculator spreadsheet (XLSX)
- Program catalog (PDF)
- Pre-arrival guide (PDF)
- Academic preparation guide (PDF)
- Chinese language starter pack (PDF)

### Videos
- Campus tour
- BIND introduction
- Student testimonials
- Info session recordings
- "A Day in My Life" vlogs

### Branding
- BIT logo
- BIND logo
- PERMIT Beijing logo
- Indonesian flag
- Chinese flag

## Implementation Approach

### Phase 1: Foundation
1. Set up design system (Tailwind config, color palette)
2. Create reusable components (buttons, cards, sections)
3. Build layout components (header, footer, navigation)
4. Set up animation system (Framer Motion variants)

### Phase 2: Core Pages
1. Homepage (most important - sets the tone)
2. Why BIT? (credibility and differentiation)
3. Campus Life (visual, addresses "where will I live?")
4. Indonesian Community (addresses isolation fears)

### Phase 3: Conversion Pages
1. Admissions & Scholarships (critical for applications)
2. Career & ROI (addresses "what happens after?")
3. FAQ & Common Worries (removes objections)
4. Contact & Resources (conversion and resources)

### Phase 4: Polish
1. Cross-browser testing
2. Mobile optimization
3. Performance optimization
4. Accessibility audit
5. SEO optimization
6. Analytics setup

## Key Questions for You

Before I start building, I need clarification on:

### 1. Content Priorities
Which pages are most critical to launch first? Should I build all 8 pages, or start with a subset?

### 2. Contact Information
- WhatsApp numbers (group and direct)
- Email addresses
- WeChat ID
- Phone numbers
- Instagram handles (I have @bit_indonesia and @permitbeijing)
- Office locations and hours

### 3. Assets Availability
- What photos are currently in `/public/images/uni/`?
- Do you have videos available?
- Do you have existing PPTs or documents?
- Do you have logos (BIT, BIND, PERMIT)?

### 4. Data Accuracy
Should I use the numbers from `docs.md` as actual data, or are they placeholders?
- 200+ Indonesian students
- #9 employability ranking
- #14 engineering ranking
- Scholarship success rates
- Salary ranges

### 5. Interactive Features Priority
Which are must-haves vs nice-to-haves?
- ✅ ROI Calculator
- ✅ Cost Calculator
- ⚠️ Virtual tour (360°)
- ⚠️ Video testimonials
- ⚠️ Live chat integration
- ⚠️ Application portal integration

### 6. Branding Guidelines
- Are there specific BIT or BIND brand colors I must use?
- Any existing brand guidelines?
- Logo usage requirements?

### 7. Aesthetic Approval
Are you comfortable with the proposed design direction?
- Dark mode primary with light sections
- Warm/cool gradient combinations
- Modern, tech-forward aesthetic
- Bold, confident, NOT generic institutional

### 8. Timeline & Urgency
- When do you need this launched?
- Is this for 2026 admissions cycle?
- Are there specific deadlines (application periods, info sessions)?

### 9. Existing Materials
- Do you have existing recruitment materials I should reference?
- Any competitor sites you like/dislike?
- The "greatwall website" you mentioned - what is it, and what should we avoid?

### 10. Functionality Requirements
- Do you need a CMS for updating content?
- Do you need analytics tracking?
- Do you need form submissions to go somewhere specific?
- Do you need multi-language support (English/Indonesian/Chinese)?

## Next Steps

Once you answer these questions, I'll:
1. Finalize the design system
2. Set up the project structure
3. Build the components
4. Implement the pages
5. Add animations and interactions
6. Optimize for performance and accessibility
7. Test across devices and browsers

## Files Created

All content plans are in `/content-plan/`:
- `00-overall-plan.md` - This summary + overall design system
- `01-homepage.md` - Homepage content plan
- `02-why-bit.md` - Why BIT page content plan
- `03-campus-life.md` - Campus Life page content plan
- `04-indonesian-community.md` - Indonesian Community page content plan
- `05-admissions-scholarships.md` - Admissions & Scholarships page content plan
- `06-career-roi.md` - Career & ROI page content plan
- `07-faq-worries.md` - FAQ & Common Worries page content plan
- `08-contact-resources.md` - Contact & Resources page content plan

Review these files and let me know your thoughts, feedback, and answers to the questions above!

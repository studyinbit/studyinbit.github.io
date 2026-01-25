# PRD: BIT Recruitment Website

## Introduction
Develop a high-impact, production-grade recruitment website for Beijing Institute of Technology (BIT) specifically targeting Indonesian Year 11 students and their parents. The website will distinguish BIT from generic institutions by highlighting its "Seven Sons of National Defense" status, employability rankings, and strong Indonesian community support.

## Goals
- **Drive Engagement:** Primary call-to-action is WhatsApp contact (Timothy Pardin).
- **Build Trust:** Showcase rankings (#9 Employability, #14 Engineering) and the BIND support system.
- **Visual Impact:** "Modern Tech-Forward with Warmth" aesthetic using glassmorphism and sophisticated animations.
- **Bilingual Support:** Full English and Indonesian language support, easily configurable via JSON files.
- **Configurability:** All text and key data points managed in external data files for easy updates.

## User Stories

### Core Infrastructure & Design
#### US-001: Project Setup & Design System
**Description:** As a developer, I need the base Next.js environment with Tailwind, Framer Motion, and the specific font/color system configured.
**Acceptance Criteria:**
- [ ] Next.js 14+ (App Router) initialized
- [ ] Tailwind config includes BIT specific gradients (Warm: Amber-Orange, Cool: Blue-Purple)
- [ ] Typography setup: Clash Display (Hero) and Plus Jakarta Sans (Body)
- [ ] Glassmorphism utilities configured
- [ ] Typecheck passes

#### US-002: Bilingual Content Engine
**Description:** As a content maintainer, I want to edit website text in JSON files so I can easily update content in both English and Indonesian without touching code.
**Acceptance Criteria:**
- [ ] i18n routing or state management implementation
- [ ] JSON content files created for all pages (e.g., `content/home.json`)
- [ ] Language toggle component visible in navigation
- [ ] Content falls back gracefully if translation missing
- [ ] Typecheck passes

#### US-003: Navigation & Footer
**Description:** As a user, I want a sticky, pill-shaped glassmorphism navigation to access any part of the site easily.
**Acceptance Criteria:**
- [ ] Pill-shaped navbar with backdrop blur
- [ ] Responsive design (Hamburger menu on mobile)
- [ ] Links to all 7 pages
- [ ] Language switcher integrated
- [ ] Floating WhatsApp button (always visible)
- [ ] Verify in browser using dev-browser skill

### Feature Implementation
#### US-004: Homepage Implementation
**Description:** As a prospective student, I want to see BIT's value proposition immediately upon landing.
**Acceptance Criteria:**
- [ ] Hero section with "Build the Future" headline (animated)
- [ ] Dynamic stats bar (#9 Employability, 400+ Students)
- [ ] 3 Value Prop cards (Elite Engineering, Community, ROI)
- [ ] All text sourced from `content/home.json`
- [ ] Verify in browser using dev-browser skill

#### US-005: "Why BIT" & Data Visualization
**Description:** As a parent, I want to see concrete rankings and advantages to justify the investment.
**Acceptance Criteria:**
- [ ] Rankings table (ARWU #102, QS #9, NTU #14) sourced from `docs.md`
- [ ] "Seven Sons" advantage explanation
- [ ] Interactive Cost Calculator (Tuition + Living - Scholarships)
- [ ] Verify in browser using dev-browser skill

#### US-006: Campus Life & Galleries
**Description:** As a student, I want to see where I will live and eat.
**Acceptance Criteria:**
- [ ] Dorm information (2/4 person suites, pricing)
- [ ] Dining information (North Canteen, Muslim Canteen)
- [ ] Image gallery with "gradient blur from bottom" hover effect
- [ ] Lightbox for viewing images
- [ ] Verify in browser using dev-browser skill

#### US-007: Indonesian Community Page
**Description:** As a parent, I need to know my child won't be isolated.
**Acceptance Criteria:**
- [ ] BIND (BIT Indonesia) information
- [ ] Support services details (Airport transfer, Jastip, Study groups)
- [ ] Partner logos (PERMIT, PPIT)
- [ ] No testimonials (per requirements)
- [ ] Verify in browser using dev-browser skill

#### US-008: Admissions & FAQ
**Description:** As an applicant, I need clear instructions on how to apply and answers to common worries.
**Acceptance Criteria:**
- [ ] CSCA Exam details prominent
- [ ] Scholarship comparison table
- [ ] Searchable/Filterable FAQ section
- [ ] FAQ content loaded from JSON for easy updates
- [ ] Verify in browser using dev-browser skill

## Functional Requirements
- **FR-1:** All content must be separated from presentation (JSON/TS data files).
- **FR-2:** Site must support switching between English and Indonesian instantly.
- **FR-3:** WhatsApp CTA must be persistent and prominent.
- **FR-4:** Cost calculator must allow inputs for scholarship type and living style to estimate 4-year costs.
- **FR-5:** Image galleries must implement the specific "hover reveal" interaction pattern.
- **FR-6:** Navigation must use the pill-shaped glassmorphism design.

## Non-Goals
- No backend database (static content only).
- No user authentication or login.
- No direct "Apply Now" form submission (redirect to WhatsApp).
- No live chat integration (WhatsApp only).
- No ROI calculator (Cost calculator only).

## Technical Considerations
- **Stack:** Next.js 14, React, TypeScript, Tailwind CSS.
- **Animation:** Framer Motion for staggered reveals and page transitions.
- **Components:** shadcn/ui for base components (accordion, dialogs).
- **Data Source:** Statistics from `docs.md` to be hardcoded into JSON configuration files.
- **Images:** Use placeholders from `public/images/uni` but ensure components handle aspect ratios gracefully.

## Success Metrics
- **Performance:** Lighthouse score > 90 for Performance and Accessibility.
- **Configurability:** A non-developer can update the FAQ text by editing a single JSON file.
- **Responsiveness:** Layout works flawlessly on mobile (iPhone SE equivalent) and desktop.

## Open Questions
- Specific Indonesian translations for technical terms (will use English terms or standard translations initially).
- Exact images for each gallery (will use placeholders).

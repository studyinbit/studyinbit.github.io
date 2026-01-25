---
enabled: true
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.

***

I want you to build this site with shadcn+tailwind+nextjs
Make it alive, beautiful, and add nice gradients and animations where possible. You can use `./public/images/uni/` as a placeholder for the images.

Make sure to use typescript, make sure everything is type safe, and keep checking for lint errors.

I have run the following in the current folder
bunx --bun shadcn@latest create --preset "https://ui.shadcn.com/init?base=base&style=nova&baseColor=neutral&theme=emerald&iconLibrary=lucide&font=inter&menuAccent=subtle&menuColor=default&radius=default&template=next" --template next 

bun install motion

Lets use Jakata Sans Plus for the font, feel free to use other import methods
This is just an example

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
</style>

Take your time planning and orchestrating what to do, make sure your plan is detailed and leaves nothing vauge. 

***
How can the site be useful and provide value?
Audience
Y11 Students
Parents of Y11 Students
Those looking for a uni
Likely ambitious student (would choose to study in a local uni or somewhere fun if not)
Provide
Facts & Figures
Scholarships
Direct contact info
Slides, videos
Opinions/opinionated
What can be expected studying here
Images: dormitory, common hangout places, canteen, classes, BBB sessions (group study), organizations (permit, ppit, bind, etc)
Maps (just add placeholder, with images from the camera pictures for now)
Frequented Locations by Y1 students
Solve/bust common worries (student/parents)
Expected costs
International students
Competitions
Preparations

Goals
Convince users to chat with us in whatsapp if they are too busy to look at the website and information we provided (or for those looking for other contact methods or quickly looking for other sources ex: ppt, video)
Refreshing unique homepage with catchy front page
Should not look like the greatwall website
Have a way to access our ppt, videos
Show facts and figures
Remove the worries of students and parents

***

Make a very detailed plan which includes everything down to the details.
Ask me about anything you are unsure of, make suggestions :D

First plan out the website content, what to put, the stats, the graphics.
Make it into md files representing each page.
Please read the `docs.md` file for additional info when needed (it is just a source of truth, but not everything has to make it in)
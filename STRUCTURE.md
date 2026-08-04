# Cozy Tech Workshop Portfolio — Structure

This document outlines the architecture and conventions for the portfolio.

## Directory Tree

```
src/
  main.jsx                     React entry; imports styles/index.css, mounts <App />
  App.jsx                      composition only — imports data + sections, owns nav/theme state
  styles/
    index.css                  font imports, @theme tokens, .night overrides, keyframes
  data/                        ← ALL your real content lives here, and nowhere else
    profile.js                 name, role, location, email, links, hero copy, stats, robot lines
    navigation.js              section ids, emoji, labels — one source for nav + palette + tracking
    notebook.js                the Story tabs
    projects.js                the shelf
    skills.js                  the toolbox drawers
    experience.js              the blueprint wall timeline
  sections/                    one file per page section, in page order
    Hero.jsx
    Story.jsx
    Projects.jsx
    Skills.jsx
    BlueprintWall.jsx          owns its own scroll logic
    Contact.jsx
    Footer.jsx
  components/                  reusable pieces, no page-specific content
    Header.jsx                 sticky nav + mobile rail
    NavPill.jsx                one nav button, including its pinned state
    Pin.jsx                    the brass pushpin
    ThemeToggle.jsx            light/dark switch
    Robot.jsx                  the mascot (reused in 3 places)
    ToolGlyph.jsx              hand-drawn tool marks
    CommandPalette.jsx         ⌘K overlay
    SectionLabel.jsx           the small mono eyebrow above each heading
    Stitch.jsx                 dashed divider
  illustrations/               large decorative SVGs, kept out of section files
    WorkshopScene.jsx          the hero room
    Mailbox.jsx
  hooks/                       reusable behaviour, each with one job
    useActiveSection.js        scroll-probe section tracking
    useTheme.js                light/dark state + persistence
    useScrollProgress.js       0→1 progress through an element
```

## Golden Rule: Data separation
**Content never appears inside a component.**
Sections import from `src/data/`. If you find yourself typing a job title or a paragraph into JSX, it belongs in a data file.

## Design Tokens
The single source of truth for the whole look is `src/styles/index.css`.
Changing the palette means editing only the `@theme` block and the `.night` overrides block.

## How do I...

### Add a project
Edit `src/data/projects.js` and append a new object to the array. Use `var(--color-...)` for the hue.
```js
{
  name: 'New Project',
  year: '2027',
  tag: 'Personal',
  blurb: 'A new thing I built.',
  stack: ['React', 'CSS'],
  metric: 'It works',
  hue: 'var(--color-sky)',
  href: '#',
}
```

### Add a section
1. Create a new file in `src/sections/`.
2. Add a new entry to `src/data/navigation.js` matching the section's DOM `id`.
3. Import and render the section in `src/App.jsx`.

### Add a skill drawer
Edit `src/data/skills.js` and append an object containing `drawer` and `tools` array.

### Change the accent colour
Update `--color-ember` and `--color-ember-soft` in `src/styles/index.css`.

### Add a nav item
Edit `src/data/navigation.js`. The navigation rail, command palette, and scroll tracking will all update automatically.

## Notes on Logic
- **Scroll Tracking**: `useActiveSection.js` uses a precise scroll-probe method against the bottom of the sticky header to determine the active section, avoiding glitches common with `IntersectionObserver` thresholds.
- **Blueprint Wall**: `BlueprintWall.jsx` intentionally does not `unobserve` notes once they intersect. It unpins them when they leave the viewport so they can re-animate every time you scroll past.

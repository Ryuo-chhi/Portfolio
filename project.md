# Cozy Tech Workshop Portfolio — Build Brief

A complete, self-contained spec for building this portfolio from scratch in **React +
JavaScript**. Paste the whole file as your prompt.

Everything in `«angle brackets»` is a placeholder for your real information. All of it lives in
one place — **§15 Your data** — so you never have to hunt through component code to update your
own details.

---

## 0. How to use this file

1. Fill in every `«placeholder»` in **§15 Your data**. That section becomes real files in the
   project, so it stays the one place you edit later.
2. Delete anything you don't want (e.g. drop the command palette or the easter eggs).
3. Paste the whole file as your prompt. Keep §5–§7 (tokens and motion), §12 (interaction logic),
   and §13 (contrast) **verbatim** — those are the parts that make the result actually work.

Anything not specified here is the builder's aesthetic judgment, on purpose.

---

## 1. Theme and emotional goal

A warm, handcrafted digital workshop where software is thoughtfully built. The visitor should
feel like they are stepping into a personal creative workspace rather than browsing another
generic portfolio. They should leave thinking *"I'd love to work with this developer"*, not
*"that was another portfolio"*.

**Personality:** friendly, curious, creative, reliable, calm, passionate about building software.

**Never:** corporate, flashy, futuristic, cyberpunk, hacker-themed, Apple-minimal.

**Inspiration:** somewhere between Animal Crossing, Studio Ghibli, a handmade programming
workshop, and a modern React portfolio.

**Philosophy:** technology should feel human; every component should look handcrafted; the page
should tell a story rather than present information; every animation should have a purpose;
less is more.

---

## 2. Stack and constraints

- **React 19 + JavaScript (JSX).** No TypeScript — use `.jsx` files and document component props
  with JSDoc blocks instead of type annotations.
- Vite + `@vitejs/plugin-react`
- Tailwind CSS v4 via `@tailwindcss/vite`. No `tailwind.config.js`, no PostCSS config — the whole
  theme lives in CSS.
- **No animation library.** All motion is CSS keyframes plus small amounts of React state.
  Framer Motion / GSAP / Three.js add weight here for nothing.
- All illustration is hand-authored inline SVG using theme CSS variables for fills. Never raster
  images. Never hardcoded hex inside components.
- Performance first. Target < 80 kB gzipped JS.
- Every component is a **default export**.
- Use double quotes for strings containing apostrophes (`"We're open"`) — an unescaped apostrophe
  in a single-quoted string breaks the build.

---

## 3. Project structure

Build exactly this shape. Each section of the page is its own component file, and **all content
is separated from all presentation** — that separation is what makes the project maintainable.

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
    useActiveSection.js        scroll-probe section tracking (see §12)
    useTheme.js                light/dark state + persistence
    useScrollProgress.js       0→1 progress through an element
```

**Also generate `STRUCTURE.md` in the project root.** It documents, for a developer opening the
repo for the first time:

- a directory tree with a one-line purpose for every file
- the rule that content lives in `src/data/` and is never hardcoded into components
- where design tokens live, and how to change the palette in one place
- the data shape each `data/*.js` file exports, with a commented example entry
- **"How do I…"** recipes: add a project, add a section, add a skill drawer, change the accent
  colour, add a nav item
- a short note on the two non-obvious algorithms in §12, so nobody "simplifies" them back into
  the broken version

Keep `STRUCTURE.md` accurate if the structure changes.

---

## 4. Code conventions

**Comments — explain *why*, never *what*.**

- A short block comment at the top of every component saying what it is, plus any non-obvious
  constraint it satisfies.
- A JSDoc block on every component that takes props, documenting each one:
  ```jsx
  /**
   * The mascot. Reused on the hero desk, beside the projects heading, and in the footer.
   *
   * @param {object} props
   * @param {number} [props.size]      Pixel width. Omit to let CSS size it.
   * @param {boolean} [props.waving]   Wave three times, then rest.
   * @param {boolean} [props.loopWave] Wave forever (footer goodbye).
   * @param {string}  [props.className]
   */
  ```
- Inline comments only where the code would otherwise read as arbitrary — a magic offset, a
  workaround, a deliberate ordering. Every fix in §12 and §13 gets a comment explaining what
  breaks without it.
- No comments restating the obvious (`// set state`), no commented-out code, no TODOs.

**Maintainability rules**

- **Content never appears inside a component.** Sections import from `src/data/`. If you find
  yourself typing your own job title into JSX, it belongs in a data file.
- **Colour never appears inside a component** as a hex value. Only Tailwind utilities backed by
  tokens (`bg-cream`, `text-forest-deep`) or `var(--color-*)` inside SVG fills. The fixed
  contrast tokens in §13 are the only exception, and they live in CSS too.
- **One concern per file.** A section lays out content; a component renders one thing; a hook
  owns one behaviour. If a section file passes 200 lines, extract a component.
- Derive, don't duplicate: the nav, the command palette, and the scroll tracking all read the
  same `navigation.js` array. Adding a section there should light it up everywhere.
- Name things after what they are in the room (`Stitch`, `Pin`, `plank`, `tack`), consistently
  across CSS, components, and comments.
- No prop drilling deeper than one level. Lift shared state (theme, active section) into `App`
  and pass it down; don't reach for a state library for a single page.

**Scalability**

- Adding a project, tool, tab, or timeline entry must be a **pure data edit** — append an object
  to the relevant array in `src/data/` and the UI absorbs it with no component changes.
- Adding a whole section should be: new file in `sections/`, one entry in `navigation.js`, one
  line in `App.jsx`.
- Sections must not assume a fixed number of items. Grids wrap, the timeline grows, the notebook
  takes any number of tabs.
- Keep sections independent — no section reads another's state. `BlueprintWall` owning its own
  scroll logic is the model.

---

## 5. Typography

Google Fonts, imported at the top of `src/styles/index.css`. **CSS `@import` rules must come
before every other statement, including `@import 'tailwindcss'`** — otherwise the build fails.

```css
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
@import 'tailwindcss';
```

- **Nunito** — headings, buttons, names. Anything that should feel friendly. Weights 700/800.
- **Plus Jakarta Sans** — body copy.
- **JetBrains Mono** — dates, labels, counts, stack tags, keyboard hints. As a label: uppercase,
  10–12px, `tracking-[0.14em]`–`tracking-[0.22em]`.

Headings get `letter-spacing: -0.015em`. Never an aggressive or condensed display face.

---

## 6. Design tokens

The single source of truth for the whole look. Changing the palette should mean editing only
this block.

```css
@theme {
  --font-display: 'Nunito', ui-sans-serif, system-ui, sans-serif;
  --font-sans: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  --color-forest: #355c4d;       /* primary */
  --color-forest-deep: #244136;  /* headings */
  --color-sage: #7aa27a;         /* secondary */
  --color-sage-soft: #a8c6a4;
  --color-ember: #e9a03b;        /* accent — use sparingly */
  --color-ember-soft: #f5cf95;
  --color-cream: #f8f5ed;        /* cards, panels */
  --color-sand: #f5f1e8;         /* page ground */
  --color-ink: #2b2b2b;
  --color-ink-soft: #5d5a52;     /* body copy, captions */
  --color-bark: #8b6b4a;         /* wood */
  --color-bark-light: #b08e66;
  --color-sky: #dcefff;

  /* Fixed in BOTH themes on purpose — see §13. */
  --color-stamp: #2b2b2b;        /* text sitting on ember or other bright fills */
  --color-pin-head: #dc8a1e;
  --color-pin-edge: #3a2a16;
  --color-pin-halo: #fbf8f1;

  --radius-btn: 16px;
  --radius-card: 20px;
  --radius-panel: 24px;

  --shadow-soft: 0 2px 4px rgba(53, 92, 77, 0.04), 0 8px 24px rgba(53, 92, 77, 0.07);
  --shadow-lift: 0 4px 8px rgba(53, 92, 77, 0.05), 0 18px 40px rgba(53, 92, 77, 0.12);
  --shadow-inset: inset 0 1px 0 rgba(255, 255, 255, 0.6);

  --ease-cozy: cubic-bezier(0.33, 0.02, 0.24, 1);
}
```

Nothing has sharp corners. Shadows stay very soft — everything should feel light. `--ease-cozy`
is the easing for essentially every transition; durations run 500–900ms.

### Dark theme ("lamplight")

A genuine second palette, not an inversion. Applied by toggling `.night` on
`document.documentElement`.

```css
.night {
  --color-cream: #26313a;
  --color-sand: #1c242b;
  --color-ink: #eef3f0;
  --color-ink-soft: #a7b7b1;
  --color-forest: #93c4ac;
  --color-forest-deep: #bcdcc8;
  --color-sage: #6f9b83;
  --color-sage-soft: #4d6d5e;
  --color-sky: #2d4256;
  --color-bark: #ba9670;
  --color-bark-light: #cbab84;
  --color-ember: #f0ad4d;

  /* the light-mode green-tinted shadows are invisible on dark grounds */
  --shadow-soft: 0 2px 4px rgba(0, 0, 0, 0.22), 0 10px 26px rgba(0, 0, 0, 0.28);
  --shadow-lift: 0 4px 10px rgba(0, 0, 0, 0.26), 0 20px 46px rgba(0, 0, 0, 0.4);
}

/* the page ground crossfades instead of snapping */
body {
  transition:
    background-color 700ms var(--ease-cozy),
    color 700ms var(--ease-cozy);
}
```

Plus these globals:

```css
.grain {                        /* paper texture for cream panels */
  background-image: radial-gradient(rgba(139, 107, 74, 0.055) 1px, transparent 1px);
  background-size: 5px 5px;
}
html { scrollbar-width: none; }
html::-webkit-scrollbar { width: 0; }
::selection { background-color: var(--color-ember-soft); color: var(--color-forest-deep); }
:focus-visible { outline: 2px solid var(--color-forest); outline-offset: 3px; border-radius: 6px; }
```

---

## 7. Motion

All slow, gentle, relaxing. Nothing moves quickly. Define each as a keyframe plus an `.anim-*`
utility class, so components stay declarative.

| Animation | Duration | Applied to |
|---|---|---|
| `drift` | 52s / 78s | clouds crossing the window, two layers at different speeds |
| `sway` | 7–9s | plant leaves, hanging vine |
| `breathe` | 8s | the letter above the mailbox |
| `steam` | 4.5s (1.8s when clicked) | coffee, 3 wisps at 0.55s offsets |
| `blink` | 6s `steps(1, end)` | robot eyes, and the maker's eye |
| `glow` | 5s | lamp cone, robot antenna |
| `caret` | 1.1s `steps(1, end)` | cursor on the monitor |
| `flap` + `flyby` | 0.9s / 34s | bird crossing the window |
| `leaffall` | 3.4s forwards | clicked plant |
| `wave-hand` | 1.4s ×3, or 2.6s infinite | robot arm, 👋 in the headline |
| `pin-drop` | 0.62s | the active-nav pin (§8) |
| `rise` | 0.9s | section and tab-panel entrances |

**Always** end the stylesheet with a reduced-motion guard:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Navigation and the active-section pin

Workshop labels instead of generic ones: **🏠 Workshop · 📖 Story · 🛠 Projects · ⚡ Skills ·
📐 Bench · 📬 Contact**. All of it comes from `data/navigation.js`.

Sticky header: wordmark left, nav pills right, then the theme toggle and a `⌘K` button. Below
`lg`, the pills move to a **horizontally scrolling rail** under the header row — don't just hide
the nav on mobile, or there's nothing to mark as active. Sections then need
`scroll-mt-36 lg:scroll-mt-20` to clear the taller header.

**The pin.** The pill for the section you're in is literally pinned to the wall:

- A hand-drawn brass pushpin SVG (not the 📌 emoji) at the pill's top-right corner
- It drops in via `pin-drop`: from `translateY(-14px) rotate(24deg) scale(0.75)`, overshooting to
  `rotate(11deg) scale(1.06)`, settling at `rotate(14deg)`
- The pill itself tilts `-1.2deg` and lifts 1px onto its shadow
- The same treatment marks the active notebook tab in §9

**Pin construction** — this is what makes it legible on every ground (see §13): draw a thin pale
halo keyline (1.8px around the head, 4px along the needle) *beneath* the fills, then the head
fill with a dark 2px outline. Rendered at roughly 21×25px.

---

## 9. Sections

Every section is a physical object in the room, not a heading. Each reads its content from
`src/data/`.

### Hero — the room itself

Asymmetric split (`lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]`), copy left, illustration
right in a cream panel with `.grain`.

Headline `Hello 👋` / `I'm «name».` with the emoji on a looping wave, then the positioning line,
a primary **Explore My Workshop** button, a secondary button, and three mono stats.

**The illustration** (`illustrations/WorkshopScene.jsx`) — one inline SVG, roughly 720×440,
containing: a wooden desk with legs; a bark-framed window with layered sage mountains, snow caps,
two drifting cloud layers and a periodic bird; a shelf of coloured project boxes and a hanging
plant; pinned sticky notes; a large monitor showing real syntax-coloured code with a blinking
caret; a second tilted monitor with a chart; a mechanical keyboard with ember keycaps; a lamp
casting a soft gradient cone; the maker in three-quarter view (hair, glasses arm, blinking eye,
one arm reaching to the keyboard); a coffee mug with rising steam; a floor plant and a desk
plant; a row of books.

Three things are clickable, with a hint line beneath: **robot** → waves + random speech bubble;
**plant** → a leaf spirals down; **mug** → steam doubles for a few seconds.

The robot must be a real DOM `<button>` positioned over the SVG so it can own focus and a label —
not an SVG child.

### 📖 Story — a notebook

A cream panel with a spiral binding drawn as a row of bark pills across the top. Left rail of
tabs, content right on faint ruled lines (`border-bottom` in sky). Real `role="tablist"` /
`role="tab"` / `aria-selected`. Active tab gets the pin. The panel re-animates with `rise` on
change via `key={activeTab}`. Takes any number of tabs from `data/notebook.js`.

### 🛠 Projects — the workshop shelf

Grid of cards that look like handcrafted boxes, each sitting on its own **wooden plank** (two
stacked bark divs, the lower inset to ~86% width). Card: coloured initial tile, tag pill, name +
year, blurb, mono stack tags, dashed `Stitch`, ember metric. Hover lifts 1.5px, deepens the
shadow, rotates the initial tile `-6deg`.

The robot stands beside the heading and **points at whichever project you hover**, naming it in a
speech bubble.

### ⚡ Skills — a toolbox

An outer bark-tinted panel with a rounded handle bar on top, containing one card per drawer. Each
tool is a row with a small hand-drawn `ToolGlyph` — geometric, round-joined, **no vendor logos** —
and a hover highlight. Drawers and tools both come from data, so a fifth drawer needs no code
change.

### 📐 Bench — the blueprint wall

Its own component, because it owns scroll logic.

- **Ground:** cyanotype gradient under a two-tier engineer's grid (16px minor + 96px major, four
  layered `linear-gradient`s), plus a large faint radial site-plan SVG ghosted off the right edge
  at 13% opacity.
- A taped-on `rev. 03 · scale 1:1 · drawn by hand` legend, slightly rotated, with a strip of ember
  "tape" over its top edge.
- **Timeline:** roles as notes pinned down a dashed thread. Each has a brass tack, a short thread
  from tack to note, a pencil-sketch diagram on its own pinned corner (request-flow /
  layered-stack / signal-graph), a highlighted takeaway, and a dog-eared bottom corner that folds
  further on hover.
- **The transition:** notes start invisible at `rotate(-7deg) translateY(-22px)` with
  `transform-origin: 2% 8%`, then swing down onto the tack over 900ms — pivoting like paper
  dropping onto a pin — staggered 200ms apart. Exact behaviour in §12.
- **The thread stitches itself** as you scroll: a dashed run whose `scaleY` tracks scroll progress
  through the section, over a faint ghost of the full path.

### 📬 Contact — a letter

Left: the copy and an animated mailbox SVG (flag up, letter hovering on `breathe`). Right: a form
styled as a letter — opens **"Dear «name»,"**, fields labelled *My name is* / *Write back to* /
*Here is what I'm building*, and a **📨 Send Message** button. On submit, an `aria-live` line
confirms delivery in the robot's voice.

### Footer

The robot waving goodbye on a loop, then **"Thanks for visiting my workshop."** / **"Have a
wonderful day."**, a dashed stitch, and a mono row of links plus a text theme toggle.

---

## 10. The robot

One component, three placements (hero desk, projects heading, footer). Rounded sage head with a
dark visor, two sky eyes on a 6s blink, ember cheeks, a glowing antenna, a cream body, and one
arm that waves — three times on click, or forever in the footer.

Props: `size` (omit to let CSS size it), `waving`, `loopWave`, `className`. Set
`height={size && (size * 116) / 100}` so the aspect ratio holds. Real `role="img"` and
`aria-label`. Speech lines rotate randomly from an array in `data/profile.js`.

---

## 11. Light/dark mode

A **desk-lamp switch**, not a generic sun/moon icon button:

- 68×36 rounded track. Day: pale blue gradient with a sage cloud. Night: deep navy gradient with
  three pale stars.
- The knob slides across and swaps: ember disc with retracting sun rays → pale green disc with
  craters fading in. The two states must differ by **shape**, not only colour.
- `role="switch"` with `aria-checked`, and a label naming the target state.

**Wiring, in `hooks/useTheme.js`:** initialise from `localStorage`, falling back to
`matchMedia('(prefers-color-scheme: dark)')`. On change: write `localStorage`, set
`document.documentElement.style.colorScheme` (so form controls and scrollbars follow), and toggle
`.night` on `documentElement` — **not on a wrapper div**, or overscroll areas flash the wrong
colour.

```js
const [theme, setTheme] = useState(() => {
  const saved = window.localStorage.getItem('workshop-theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
})

useEffect(() => {
  window.localStorage.setItem('workshop-theme', theme)
  document.documentElement.style.colorScheme = theme
  document.documentElement.classList.toggle('night', theme === 'dark')
}, [theme])
```

Expose it from the header, the footer, and the Konami code.

---

## 12. Interaction logic that must be built this way

Two places where the obvious implementation is subtly wrong. Comment both in the code so they
don't get "simplified" later.

### Active section tracking — a scroll probe, not intersection ratios

**Do not** use an `IntersectionObserver` and pick the entry with the largest `intersectionRatio`.
It glitches badly: ratios aren't comparable between sections of different heights (a tall section
filling the viewport reports a *smaller* ratio than a short one that's fully visible, so the wrong
link lights up), and the callback only fires when a threshold is crossed, so the answer goes stale
mid-scroll.

In `hooks/useActiveSection.js`, on every scrolled frame (rAF-throttled):

1. Compute a probe line at the sticky header's real `getBoundingClientRect().bottom + 12`
   (measured via a ref, so it stays correct when the header grows its mobile nav row).
2. Walk the sections in order; the active one is the **last** whose `top <= probe`.
3. Special-case the page bottom: if `innerHeight + scrollY >= scrollHeight - 2`, force the last
   section — otherwise a short final section can never become active.

```js
const measure = () => {
  frame = 0
  const probe = (headerRef.current?.getBoundingClientRect().bottom ?? 0) + 12
  const atBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
  if (atBottom) {
    setActive(navigation[navigation.length - 1].id)
    return
  }
  let current = navigation[0].id
  for (const { id } of navigation) {
    const el = document.getElementById(id)
    if (el && el.getBoundingClientRect().top <= probe) current = id
  }
  setActive(current)
}

const onScroll = () => {
  if (!frame) frame = requestAnimationFrame(measure)
}
measure()
window.addEventListener('scroll', onScroll, { passive: true })
window.addEventListener('resize', onScroll)
// cleanup: remove both listeners and cancelAnimationFrame(frame)
```

Always exactly one answer, recomputed from real geometry, never stale.

### The blueprint wall must replay

Don't `unobserve` after a note lands, or the animation plays once and the section is dead on the
way back down. Keep observing and **unpin notes when they leave the viewport** so they reset
off-wall and swing in again next time.

```js
const timers = new Map()
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const i = Number(entry.target.dataset.note)
      // Reversing direction mid-animation would otherwise leave a queued timer
      // that fires late and pins a note you have already scrolled past.
      const pending = timers.get(i)
      if (pending) {
        clearTimeout(pending)
        timers.delete(i)
      }
      if (entry.isIntersecting) {
        timers.set(
          i,
          setTimeout(() => {
            timers.delete(i)
            set(i, true)
          }, i * 200),
        )
      } else {
        set(i, false)
      }
    })
  },
  // the inset margin stops a small scroll near the edge flickering a note in and out
  { threshold: 0, rootMargin: '-12% 0px -12% 0px' },
)
```

---

## 13. Contrast rules

Floor: body text ≥ 4.5:1, large text and interactive affordances ≥ 3:1, state signalled by more
than colour alone. Three specific traps in this palette:

1. **Text on ember.** `forest-deep` is *light* in dark mode, so it fails on an ember fill. That's
   what `--color-stamp` is for — a fixed dark ink for any text sitting on ember, bright accent
   tiles, or the wordmark badge. It deliberately has no `.night` override.

2. **The pin lands on four different grounds** — cream header, forest pill, ember notebook tab,
   and night surfaces. No single colour works on all four, so the pin carries its own contrast via
   fixed `--color-pin-halo` (pale) and `--color-pin-edge` (dark). The dark outline handles light
   and warm grounds (12.2:1 on cream, 6.2:1 on ember); the pale halo handles dark and green ones
   (6.8:1 on forest). Keep the halo a *hairline* — a thick pale ring reads as a white smudge at
   21px.

3. **The theme toggle needs a real border.** A `bark/25` hairline is ~1.3:1 and vanishes against
   the page in dark mode. Use a solid `forest/70` border, give the knob the fixed dark pin-edge
   outline so it can't dissolve into the track, and draw the day cloud in mid-tone sage —
   cream-on-pale-blue is invisible.

Everywhere else: don't put low-opacity ink on a tinted surface and assume it passes.

---

## 14. Accessibility and responsive

- Semantic landmarks, exactly one `<h1>`, real `<button>` / `<form>` / `<ol>` elements.
- `aria-current` on the active nav pill; `role="tablist"` on the notebook; `role="switch"` on the
  toggle; `aria-live` on the form confirmation; `aria-hidden` on every decorative SVG and every
  purely ornamental div.
- Every interactive illustration element is keyboard-reachable with an `Enter` handler.
- Meaningful `role="img"` + `aria-label` on illustrations that carry meaning; the visible hint
  line tells sighted users what's clickable.
- Breakpoint around ~1000px: nav → scrolling rail, project grid → one column, notebook tabs → a
  horizontal row above the content, illustrations scale fluidly via `viewBox`.
- Desktop should feel like entering the full workshop; mobile like a top-down view of the desk.
  Still cosy at every width.

---

## 15. Your data

Everything below becomes the files in `src/data/`. **This is the only place to edit your
content** — now and later. Replace every `«placeholder»`. Use real names, real numbers, real
dates; never lorem ipsum.

Each file should open with a comment explaining its shape and how to add an entry.

### `src/data/profile.js`

```js
export const profile = {
  name: 'Chhunhour',
  role: 'Full-Stack Web Developer',
  tagline: "I build systems that hold up — from the database schema to the button someone taps",
  location: 'Phnom Penh, Cambodia',
  email: 'chhunhourtiek255@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/Ryuo-chhi' },
    { label: 'LinkedIn', href: '«…»' },
  ],
  positioning: "I'm a CS student who likes to know *why* something works before I ship it — I'd rather trace a bug to its root cause than patch around it. Currently splitting my time between coursework and building a real product from scratch.",
  stats: [
    { value: '2024', label: 'started CS @ CADT' },
    { value: 'BAC II', label: 'passed 2024' },
    { value: '10+', label: 'tools in daily use' },
  ],
  robot: {
    name: 'Sequel',
    lines: [
      'Beep. Still normalizing that database.',
      'Have you tried turning the server off and on again?',
      'REST API. Not to be confused with actual rest.',
    ],
  },
  contact: {
    invitation: "Got a project, an idea, or just want to talk full-stack — send it over. I read everything, usually reply within a day.",
    confirmation: 'Sealed and handed to Sequel. Talk soon 🌿',
  },
}
```

### `src/data/navigation.js`

```js
// Single source of truth for the header, the mobile rail, the command palette,
// and scroll tracking. `id` must match the section element's id.
export const navigation = [
  { id: 'workshop', icon: '🏠', label: 'Workshop', command: 'Go to the workshop' },
  { id: 'story',    icon: '📖', label: 'Story',    command: 'Read my notebook' },
  { id: 'projects', icon: '🛠', label: 'Projects', command: 'Browse the shelf' },
  { id: 'skills',   icon: '⚡', label: 'Skills',   command: 'Open the toolbox' },
  { id: 'bench',    icon: '📐', label: 'Bench',    command: 'Look at the blueprint wall' },
  { id: 'contact',  icon: '📬', label: 'Contact',  command: 'Write me a letter' },
]
```

### `src/data/notebook.js`

```js
export const notebook = [
  {
    tab: 'Who I am',
    lines: ['a web developer who treats software the way a woodworker treats a joint: measured twice, sanded smooth, built to hold weight.'],
  },
  {
    tab: 'Journey',
    lines: [
      '2024 — started my CS degree at CADT, walked in knowing HTML and not much else.',
      '2024 — passed BAC II, the same year I started coding seriously.',
      '2025–2026 — moved from static pages to full-stack: Express APIs, Sequelize, auth, real database design.',
    ],
  },
  {
    tab: 'Education',
    lines: [
      'B.Sc. Computer Science, CADT — 2024–2028 (in progress)',
      'Self-taught: React, Express, Sequelize, REST API design, and the parts of MySQL they don\'t always cover in class.',
    ],
  },
  {
    tab: 'Goals',
    lines: [
      'Ship Toub POS as a real, working system other student booths actually use.',
      'Go from full-stack web to mobile — start shipping app-side, not just browser-side.',
      'Get properly good at accessibility — not checklist good, screen-reader-tested good.',
    ],
  },
  {
    tab: 'Interests',
    lines: ['Filter coffee, weighed to the gram. Mechanical keyboards with quiet tactile switches.Growing chillies on a small balcony with too much afternoon sun.Long walks without headphones — that is where most of my architecture gets decided.'],
  },
]
```

### `src/data/projects.js`

```js
// Add a project by appending an object. `hue` is a token, never a hex value.
// src/data/projects.js
export const projects = [
  {
    name: 'Toub POS',
    year: '2026',
    tag: 'Group project',
    blurb: 'A role-based POS for student popup booths — cashiers work from PIN-locked stalls, cash confirmations write audit logs, and paid orders dispatch live to the kitchen over Telegram.',
    stack: ['React', 'Vite', 'Express', 'MySQL', 'Sequelize', 'JWT'],
    metric: 'Owner / Manager / Cashier roles, built for real campus booths',
    hue: 'var(--color-sage)',
    href: 'https://github.com/sothyvan/TOUB_POS',
  },
  {
    name: 'Vehicle Rental Management System',
    year: '2025',
    tag: 'Group project',
    blurb: 'A fleet management system for a rental business — I owned the backend and database: entity modeling, repository layer, and rental logic with snapshot-based history for auditing.',
    stack: ['Java', 'Spring Boot', 'JPA / Hibernate', 'MySQL', 'React'],
    metric: 'Backend + database owner — RBAC, billing, fleet reporting',
    hue: 'var(--color-ember)',
    href: 'https://github.com/Ryuo-chhi/Vehicle-Rental-Management-System-Main-',
  },
  {
    name: 'Self-Planning Travel Planner',
    year: '2024 → 2026',
    tag: 'Group project',
    blurb: 'Started as a static HTML/CSS/JS itinerary planner for a Year 2 web design course. The team later rebuilt it full-stack — I helped shape the direction and feature ideas, including the AI travel assistant, while a teammate led the React/Express rebuild.',
    stack: ['HTML', 'CSS', 'JavaScript', 'React', 'Express', 'Sequelize'],
    metric: 'Evolved from a static site into an AI-powered full-stack app',
    hue: 'var(--color-sky)',
    href: 'https://github.com/thangsaoly/self-planning-react',
  },
]
```

### `src/data/skills.js`

```js
// `glyph` names a shape in ToolGlyph.jsx: atom, triangle, wind, brackets, leaf,
// server, flame, barrel, stack, cloud, box, branch, wrench, flask.
export const skills = [
  {
    drawer: 'Front of house',
    tools: [
      { name: 'HTML', glyph: 'brackets' },
      { name: 'CSS', glyph: 'wind' },
      { name: 'JavaScript', glyph: 'triangle' },
      { name: 'React', glyph: 'atom' },
      { name: 'Tailwind CSS', glyph: 'cloud' },
    ],
  },
  {
    drawer: 'Back of house',
    tools: [
      { name: 'Java', glyph: 'flame' },
      { name: 'Node.js / Express', glyph: 'server' },
      { name: 'REST API design', glyph: 'flask' },
      { name: 'Sequelize', glyph: 'stack' },
    ],
  },
  {
    drawer: 'Storage',
    tools: [{ name: 'MySQL', glyph: 'barrel' }],
  },
  {
    drawer: 'Out the door',
    tools: [
      { name: 'Git', glyph: 'branch' },
      { name: 'GitHub', glyph: 'box' },
    ],
  },
]
```

### `src/data/experience.js`

```js
// Newest first. `diagram`: flow | layers | signal. `tilt` is the resting angle
// in degrees — vary it slightly so no two notes hang straight.
export const experience = [
  {
    when: '2025 — now',
    what: 'Full-Stack Developer (self-directed)',
    where: 'Toub POS, group project',
    detail: 'Own the backend and database design — schema, kitchen ticket lifecycle separate from payment lifecycle, and per-stall device auth.',
    takeaway: 'Designed the data model from scratch',
    diagram: 'layers',
    tilt: -0.8,
  },
  {
    when: '2024 — now',
    what: 'B.Sc. Computer Science',
    where: 'CADT',
    detail: 'Coursework spanning database administration, HCI, and software design, alongside self-directed full-stack development.',
    takeaway: 'Class of 2028',
    diagram: 'flow',
    tilt: 0.6,
  },
  {
    when: '2024',
    what: 'Passed BAC II',
    where: 'Cambodia national exam',
    detail: 'Cleared the national baccalaureate exam the same year I started coding seriously — the launch point for everything since.',
    takeaway: 'Where it started',
    diagram: 'signal',
    tilt: -0.4,
  },
]
```

---

## 16. Easter eggs

Small and discoverable, all optional:

- Click the robot → waves + a random line of dialogue
- Click the plant → a leaf spirals down
- Click the mug → steam intensifies
- Konami code (`↑↑↓↓←→←→ba`) → flips the theme
- `⌘K` / `Ctrl+K` → a filterable command palette built from `navigation.js` `command` strings,
  `Esc` to close, with a mono hint line at the bottom that quietly reveals the Konami code

Sound is out of scope: never autoplay anything.

---

## 17. Verification checklist

Before calling it done:

- [x] `vite build` passes with no warnings; dev server runs clean with no console errors
- [x] `STRUCTURE.md` exists, matches the real tree, and its "How do I…" recipes are accurate
- [x] Grep the components for hex colours and for your own name — both should return **nothing**
      outside `src/data/` and the token block
- [x] Adding a dummy project and a dummy skill to `src/data/` renders correctly with **zero**
      component edits, then remove them
- [x] Fonts load — no fallback sans anywhere; `@import`s are the first statements in the CSS
- [x] Toggle light/dark and scan **every** section: no invisible text, no vanished borders, no
      washed-out pin, shadows still visible on dark grounds
- [x] Scroll the whole page slowly: the pin marks exactly the section you're in, at every width,
      with no jumping ahead or lagging behind
- [x] Scroll past the blueprint wall, back up, and down again — the notes swing in **every** time,
      and reversing mid-animation leaves nothing stuck
- [x] Reload with dark mode active — no flash of the light ground, no wrong overscroll colour
- [x] Tab through the page: visible focus ring everywhere, every clickable illustration element
      reachable, form submittable by keyboard
- [x] Turn on "reduce motion" — everything legible and static, nothing broken
- [x] Resize 320px → 1600px: nothing clips, overflows, or loses its composition
- [x] Every component has its purpose comment; every prop-taking component has a JSDoc block
- [x] make sure this portfolio is responsive and works well on all devices, from mobile to desktop

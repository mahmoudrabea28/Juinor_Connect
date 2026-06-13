# Junior Connect — Home (Vue 3)

The Figma design built as a Vue 3 app: the founders' hero (soft blue blob,
*·From the founders* pill, centered quote) followed by the **Wall of builds**
section with the three project cards (SunPath, Tutorly, Pixel.io).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
```

## What's animated

- **Hero load** — the blob rises/fades in, the pill drops from above with a
  little overshoot, then the quote fades up.
- **Wall of builds** — the three cards fade up in a stagger the first time the
  section scrolls into view.
- **Card hover** — lifts with a soft shadow; the Open button presses on click.
- **Reduced motion** — all of the above is disabled when the OS has
  "reduce motion" on; content just appears.

## Files

```
src/
  App.vue                  Hero + WallOfBuilds
  components/
    Hero.vue               blue blob (wavy bottom) + pill + centered quote
    WallOfBuilds.vue       eyebrow, gradient heading, browse link, card grid
    BuildCard.vue          one project card (image, tag, title, badge, button)
  assets/
    images.js              the 3 card image URLs (swap point — see below)
  styles/global.css        reset + base
```

## ⚠️ Make the images permanent

`src/assets/images.js` points at **live Figma asset URLs**, which Figma expires
about **7 days** after they were generated. To keep them:

1. In Figma, select each card image → **Export** → PNG (2x).
2. Save them into `src/assets/` (e.g. `sunpath.png`, `tutorly.png`, `pixelio.png`).
3. In `images.js`, import the files instead of using the URLs:

   ```js
   import sunpath from './sunpath.png'
   import tutorly from './tutorly.png'
   import pixelio from './pixelio.png'
   export const buildImages = { sunpath, tutorly, pixelio }
   ```

## Design tokens (from Figma)

- Blue / Main `#2563EB` · Blue / Light `#DEE8FC` · background `#FEFEFE`
- Card backgrounds: SunPath `#9EEDFB` · Tutorly `#E3D7FB` · Pixel.io `#FFDC3A`
- Button border `#AEB6FB` · muted text `#6D717F` · browse link `#4E61F6`
- "actually shipped" gradient: `#2563EB → #00C0E8 (69%) → #8A38F5`
- Title: **Montaga** (48 hero / 40 section / 32 card) · UI text: **Inter** Semi Bold

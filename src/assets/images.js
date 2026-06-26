/*
 * Image fills for the "Wall of builds" project cards.
 *
 * These point at live Figma asset URLs (the exact crops used in the design).
 * Figma expires them ~7 days after generation.
 *
 * TO MAKE THEM PERMANENT:
 *   1. In Figma, select each card image -> Export -> PNG (2x).
 *   2. Drop the files into src/assets/ (e.g. sunpath.png, tutorly.png, pixelio.png).
 *   3. Import them here and use the imports instead of the URLs:
 *        import sunpath from './sunpath.png'
 *        export const buildImages = { sunpath, ... }
 */

import sunpath from './images/Card 1.png'
import tutorly from './images/Card 2.png'
import pixelio from './images/Card 3.png'

export const buildImages = {
  sunpath,
  tutorly,
  pixelio,
}

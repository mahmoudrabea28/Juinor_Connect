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

export const buildImages = {
  // SunPath — phone weather mockup
  sunpath: 'https://www.figma.com/api/mcp/asset/6920d0c0-e496-46b9-8c1f-6e91a4e4bbb8',
  // Tutorly — dashboard UI
  tutorly: 'https://www.figma.com/api/mcp/asset/100793b4-1525-4664-ba4d-40fc29b6ac8e',
  // Pixel.io — home-cinema illustration
  pixelio: 'https://www.figma.com/api/mcp/asset/3e642862-5856-492e-9df2-c5502fb5d680',
}

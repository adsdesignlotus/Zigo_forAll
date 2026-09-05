// Single source of truth for Zigo brand colors.
// Do NOT scatter hex values across screens — import from here.

export const BRAND = {
  blue:   '#0E6DFD',  // Primary: CTA, active states, nav indicator
  teal:   '#06B6D4',  // Secondary: "Why it matters", secondary accents
  orange: '#FF8940',  // Warm CTA: Read buttons
  amber:  '#F59E0B',  // "Did you know" accent
  purple: '#7C3AED',  // "Think about it" accent
} as const;

// 3-zone category grouping (not 9 rainbow colors).
// Zone = topic cluster, giving pattern recognition without chaos.
const BLUE_CATS = ['Top Stories', 'Technology', 'Space'];
const TEAL_CATS = ['Science', 'World', 'Nature'];
// Orange zone: India, Sports, Culture

export function getCategoryColor(cat: string): string {
  if (BLUE_CATS.includes(cat)) return BRAND.blue;
  if (TEAL_CATS.includes(cat)) return BRAND.teal;
  return BRAND.orange;
}

export const CUISINE_OPTIONS = [
  "Italian",
  "Chinese",
  "Japanese",
  "Indian",
  "Thai",
  "Mexican",
  "American",
  "Mediterranean",
  "Korean",
  "Vietnamese",
  "Malay",
  "Halal",
  "Western",
  "Fusion",
] as const;

export type CuisineOption = (typeof CUISINE_OPTIONS)[number];

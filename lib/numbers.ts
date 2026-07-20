/**
 * Random number generation utilities
 * Generates unique random numbers within a range (no duplicates)
 */

/**
 * Generate random numbers without duplicates
 * @param min - Minimum number (inclusive)
 * @param max - Maximum number (inclusive)
 * @param count - How many numbers to generate
 * @param seed - Optional seed for reproducibility (for testing)
 * @returns Array of unique random numbers
 */
export function generateRandomNumbers(
  min: number,
  max: number,
  count: number,
  seed?: number
): number[] {
  if (count > max - min + 1) {
    throw new Error('Cannot generate more unique numbers than range allows');
  }

  // Seeded RNG for reproducibility (used in testing/demos)
  let random: () => number;
  if (seed !== undefined) {
    random = mulberry32(seed);
  } else {
    random = () => Math.random();
  }

  const numbers: number[] = [];
  const used = new Set<number>();

  while (numbers.length < count) {
    const num = Math.floor(random() * (max - min + 1)) + min;
    if (!used.has(num)) {
      numbers.push(num);
      used.add(num);
    }
  }

  return numbers.sort((a, b) => a - b);
}

/**
 * Mulberry32 - A simple seeded random number generator
 * Used for reproducible random numbers in testing
 */
function mulberry32(a: number): () => number {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generate a quick pick (random selection) for a game
 * @param min - Minimum number
 * @param max - Maximum number
 * @param count - How many numbers to pick
 * @returns Array of random numbers
 */
export function quickPick(min: number, max: number, count: number): number[] {
  return generateRandomNumbers(min, max, count);
}

/**
 * Compare tickets against drawn numbers
 * Returns count of matched numbers
 */
export function compareNumbers(selected: number[], drawn: number[]): number {
  const drawnSet = new Set(drawn);
  return selected.filter(num => drawnSet.has(num)).length;
}

/**
 * Get the seed based on current date for deterministic daily draws (optional feature)
 */
export function getDailySeed(): number {
  const now = new Date();
  return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
}

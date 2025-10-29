/**
 * Generates a deterministic pseudo-random number between 0 and 1 based on a seed
 * @param seed - The seed number for deterministic randomization
 * @returns A number between 0 and 1
 */
export const seededRandom = (seed: number): number => {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

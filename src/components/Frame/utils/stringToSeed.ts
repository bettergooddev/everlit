/**
 * Converts a string to a numeric seed using a simple hash function
 * @param str - The string to convert to a seed
 * @returns A positive integer that can be used as a seed
 */
export const stringToSeed = (str: string): number => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

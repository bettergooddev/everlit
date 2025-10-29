import { seededRandom } from './seededRandom'
import { stringToSeed } from './stringToSeed'

export const getSeededRotation = (
  url: string | null | undefined,
  rotationRange: number = 2,
): number => {
  if (!url) return 0

  const seed = stringToSeed(url)
  const rotation = (seededRandom(seed) - 0.5) * rotationRange
  return Math.round(rotation * 1000000) / 1000000
}

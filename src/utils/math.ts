/**
 * Generates a random integer within a given range
 * @param min minimum of the range
 * @param max maximum of the range
 * @returns
 */
export function randint(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Normalizes a value between a given range
 * @param value the value to normalize
 * @param min the minimum of the original range
 * @param max the maximum of the original range
 * @param mapMin the minimum of the new range [default = 0]
 * @param mapMax the maximum of the new range [default = 1]
 * @returns value mapped to [mapMin, mapMax]
 */
export function normalize(
  value: number,
  min: number,
  max: number,
  mapMin: number = 0,
  mapMax: number = 1,
): number {
  if (min === max) return mapMin
  return mapMin + ((value - min) / (max - min)) * (mapMax - mapMin)
}

export function isFieldFull(value: unknown): 0 | 1 {
  if (value === undefined || value === null) {
    return 0
  }
  if (typeof value === 'string' && value.trim().length > 0) {
    return 1
  }
  return 0
}

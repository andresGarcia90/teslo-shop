export function substring(text: string, limit: number, suffix = '...'): string {
  return text.length > limit ? text.substring(0, limit) + suffix : text
}
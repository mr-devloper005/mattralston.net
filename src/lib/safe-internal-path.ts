/**
 * Returns a safe same-origin path for post-login redirects (query param `from`).
 */
export function safeInternalPath(raw: string | null | undefined): string {
  if (raw == null || typeof raw !== 'string') return '/'
  const trimmed = raw.trim()
  if (!trimmed.startsWith('/') || trimmed.startsWith('//')) return '/'
  return trimmed
}

/**
 * Small pure helpers used across the app.
 */

/**
 * Time-of-day greeting (PRD §6.5):
 *  < 12:00  -> "Good Morning"
 * 12:00–17:00 -> "Good Afternoon"
 * >= 17:00  -> "Good Evening"
 */
export function greetingFor(hour: number): 'Good Morning' | 'Good Afternoon' | 'Good Evening' {
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  return 'Good Evening'
}

/** "Dr. Sarah" style display name from a full "Dr. Sarah Wilson". */
export function preferredName(fullName: string): string {
  const parts = fullName.replace(/^(Dr\.?|Prof\.?)\s+/, '').split(' ')
  return parts[0] ?? fullName
}

/** Deterministic two-letter initials from a display name. */
export function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const AVATAR_HUES = [
  { bg: '#E0E7FF', fg: '#3B4CC0' },
  { bg: '#D1FAE5', fg: '#0F8A5F' },
  { bg: '#FDE68A', fg: '#A16207' },
  { bg: '#C7D2FE', fg: '#4338CA' },
  { bg: '#FBCFE8', fg: '#BE185D' },
  { bg: '#BFDBFE', fg: '#1D4ED8' },
  { bg: '#E9D5FF', fg: '#7E22CE' },
  { bg: '#CCFBF1', fg: '#0F766E' },
  { bg: '#FED7AA', fg: '#C2410C' },
  { bg: '#D9F99D', fg: '#4D7C0F' },
]

/** A stable, pleasant tint + ink pair for initials avatars (derived from name). */
export function avatarTint(name: string): { bg: string; fg: string } {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0
  return AVATAR_HUES[h % AVATAR_HUES.length]
}

/** Thousands-separated integer, e.g. 1248 -> "1,248". */
export function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}

/** Relative-ish time label for notifications. */
export function timeAgo(date: Date, now: Date = new Date()): string {
  const s = Math.floor((now.getTime() - date.getTime()) / 1000)
  if (s < 60) return 'just now'
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  return `${d}d ago`
}

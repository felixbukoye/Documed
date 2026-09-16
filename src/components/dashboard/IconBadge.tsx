import type { ReactNode } from 'react'

type Tone = 'primary' | 'success' | 'warning' | 'danger' | 'accent'

const tones: Record<Tone, string> = {
  primary: 'bg-primary-100 text-primary-600',
  success: 'bg-success-100 text-success-600',
  warning: 'bg-warning-100 text-warning-600',
  danger: 'bg-danger-100 text-danger-600',
  accent: 'bg-accent-100 text-accent-600',
}

/** Tinted rounded-square icon container (PRD §4.3 Icon badge). */
export default function IconBadge({
  tone = 'primary',
  children,
  size = 46,
}: {
  tone?: Tone
  children: ReactNode
  size?: number
}) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-2xl ${tones[tone]}`}
      style={{ width: size, height: size }}
    >
      {children}
    </span>
  )
}

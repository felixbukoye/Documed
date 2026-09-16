import type { ReactNode } from 'react'

type Tone = 'success' | 'warning' | 'danger' | 'neutral' | 'primary'

const tones: Record<Tone, string> = {
  success: 'bg-success-100 text-success-700',
  warning: 'bg-warning-100 text-warning-700',
  danger: 'bg-danger-100 text-danger-700',
  neutral: 'bg-neutral-100 text-neutral-600',
  primary: 'bg-primary-100 text-primary-700',
}

/**
 * Semantic status chip. Color is ALWAYS paired with a non-color signal
 * (icon/text) per PRD §8 Accessibility.
 */
export default function StatusChip({
  tone,
  children,
  icon,
  className = '',
}: {
  tone: Tone
  children: ReactNode
  icon?: ReactNode
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${tones[tone]} ${className}`}
    >
      {icon}
      {children}
    </span>
  )
}

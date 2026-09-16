import { avatarTint, initials } from '../../lib/format'

interface AvatarProps {
  name: string
  size?: number
  className?: string
  ring?: boolean
}

/**
 * Deterministic initials avatar. Reliable offline (no external image host),
 * stable per name, and consistent with the app's rounded aesthetic.
 */
export default function Avatar({
  name,
  size = 40,
  className = '',
  ring = true,
}: AvatarProps) {
  const { bg, fg } = avatarTint(name)
  return (
    <span
      className={`inline-grid place-items-center rounded-full font-bold select-none ${
        ring ? 'ring-1 ring-black/[0.06]' : ''
      } ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${bg}, ${bg}D9)`,
        color: fg,
        fontSize: Math.round(size * 0.38),
        letterSpacing: '0.01em',
      }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  )
}

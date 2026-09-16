import { useId } from 'react'

interface SparklineProps {
  data: number[]
  color: string
  width?: number
  height?: number
  fill?: boolean
  strokeWidth?: number
}

/** Lightweight inline SVG sparkline used as a per-row data-density device. */
export default function Sparkline({
  data,
  color,
  width = 120,
  height = 34,
  fill = true,
  strokeWidth = 2,
}: SparklineProps) {
  const gid = useId().replace(/[:]/g, '')
  if (data.length < 2) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1
  const pad = 3
  const innerW = width - pad * 2
  const innerH = height - pad * 2
  const step = innerW / (data.length - 1)
  const pts = data.map((d, i) => {
    const x = pad + i * step
    const y = pad + innerH - ((d - min) / span) * innerH
    return [x, y] as const
  })
  // Simple polyline path
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)} ${height - pad} L${pts[0][0].toFixed(1)} ${height - pad} Z`
  const last = pts[pts.length - 1]

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-hidden="true"
      className="overflow-visible"
    >
      <defs>
        <linearGradient id={`sg-${gid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={area} fill={`url(#sg-${gid})`} />}
      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={last[0]} cy={last[1]} r={strokeWidth + 1} fill={color} />
    </svg>
  )
}
